---
type: paper
citekey: "bedrosianSmallMoleculeOptimization"
title: "基于大语言模型的小分子生成性质预测与优化"
chinese_title: "基于大语言模型的小分子生成性质预测与优化"
authors: "Menua Bedrosian, Philipp Guevorguian, Tigran Fahradyan"
year: ""
venue: ""
doi: ""
zotero_collections:
  - "多目标分子优化"
status: imported
reading_status: inbox
tags:
  - paper
aliases:
  - "基于大语言模型的小分子生成性质预测与优化"
  - "Small Molecule Optimization with Large Language Models"
original_title: "Small Molecule Optimization with Large Language Models"
---
## 一句话总结

**Small Molecule Optimization with Large Language Models** 提出在 110M 小分子与约 40B token 的 SMILES/性质语料上继续训练的 Chemlactica-125M、Chemlactica-1.3B 和 Chemma-2B，并用结合遗传算法、拒绝采样思想与 prompt optimization 的群体式分子优化算法，在 PMO 等分子优化 benchmark 上取得强结果。

## 研究问题

本文关注如何利用 large language models 进行小分子性质预测、条件生成与黑盒 oracle 下的分子优化。核心问题包括：

1. 如何构建包含分子结构、计算性质、实验性质与相似分子信息的大规模分子文本语料，使语言模型能够学习分子结构与性质之间的关系。
2. 如何让语言模型既能根据 SMILES 预测性质，又能根据目标性质生成满足条件的分子。
3. 在只能有限次调用黑盒 oracle 的情况下，如何高效搜索离散且巨大的化学空间，找到高分子性质得分的候选分子。
4. 大模型规模、动态 fine-tuning、prompt 设计、数值精度等因素如何影响分子优化效果。

## 背景与动机

分子优化是药物发现中的关键环节，目标是在庞大的化学空间中寻找满足多种约束和性质要求的候选化合物。传统实验方法成本高、周期长；计算方法可以加速搜索，但需要处理离散、组合爆炸且多目标约束的分子空间。

已有分子生成与优化方法包括基于图的遗传算法、Monte Carlo tree search、VAE、GFlowNets、强化学习模型如 REINVENT，以及 SMILES 序列建模方法如 ChemFormer、MolT5、BARTSmiles。本文的动机是：既然 large language models 在自然语言和代码任务中展现出强大的序列建模和条件生成能力，那么可否把 SMILES 与分子性质组织成结构化文本语料，让 LLM 学会分子结构、性质和相似性之间的模式，并进一步用于黑盒分子优化。

## 核心思想

本文的核心思想是把小分子表示成带标签的文本序列，使语言模型在同一自回归建模框架下学习：

- 分子结构：通过 SMILES 表示；
- 分子性质：如 QED、SAS、CLogP、TPSA、molecular weight；
- 分子相似性：通过 `[SIMILAR] molecule similarity [/SIMILAR]` 表示；
- 实验性质与 PubChem 相关信息：作为额外文本监督。

在优化阶段，模型不只是一次性生成分子，而是作为群体式优化器中的生成模块：维护高分子得分分子池，使用相似分子 prompt 生成新候选，通过 oracle 打分，再在停滞时用高分样本继续 fine-tune 模型，使模型逐渐适应当前 oracle。

## 方法框架

本文方法可分为三层：

1. **语料构建层**  
   从 PubChem 构建包含超过 110M 分子的 SQL 数据库，并使用 rdkit 计算 SAS、QED、MW、TPSA、CLogP、氢键供受体、环数等性质。由于 PubChem 与 rdkit 的 SMILES canonicalization 不同，作者使用 rdkit 统一标准化 SMILES。数据 cutoff date 为 2023-01-26；无法被 rdkit `MolFromSmiles` 解析的分子被丢弃。

2. **语言模型训练层**  
   选取三个公开预训练模型继续训练：
   - Chemlactica-125M
   - Chemlactica-1.3B
   - Chemma-2B

   Chemlactica 基于 Galactica 系列，Chemma 基于 Gemma。训练目标为 causal language modeling，使用 cross-entropy loss。上下文长度为 2048。Chemma 使用 bfloat16 训练，训练中使用 FSDP 与 Flash Attention。

3. **分子优化层**  
   维护一个包含 P 个高得分分子的 pool。每轮从 pool 中采样 S 个相似分子构造 prompt，让 LM 生成 N 个新分子，调用 oracle 评分，更新 pool。当最优得分连续 K 轮没有提升时，对 LM 进行额外 fine-tuning，使模型显式学习当前 oracle 的得分模式。

模型校准实验用于检查模型输出概率是否能反映正确性。下图展示 Chemma-2B 与 Chemlactica-125M 在合成多选性质预测题上的 calibration；灰色对角线代表理想校准。

![[raw/zotero/images/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization/mineru-figure-01.jpg]]

图中模型的预测置信度与实际正确率大体接近，说明在训练语料分布内，perplexity/probability 可以作为分子性质预测可靠性的粗略信号。

![[raw/zotero/images/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization/mineru-figure-02.jpg]]

该图同样对应 calibration 结果。由于 MinerU 提取中图注重复，具体子图对应关系需待补充原文/PDF 后确认。

## 算法流程

### 1. 分子文本化模板

每个分子被表示为带标签的 JSONL 文本对象。示例结构包括：

```text
[WEIGHT] 180.16 [/WEIGHT]
[TPSA] 63.60 [/TPSA]
[CLOGP] 1.31 [/CLOGP]
[START_SMILES] CC(=O)OC1=CC=CC=C1C(=O)O [END_SMILES]
[SAS] 1.58 [/SAS]
[QED] 0.92 [/QED]
[SIMILAR] ... 0.59 [/SIMILAR]
[PROPERTY] Vapor Pressure ... [/PROPERTY]
```

作者随机化属性顺序，并以 50% 概率改变主分子 SMILES 的位置，以便模型同时适应性质预测和性质条件生成。

### 2. 性质预测与条件生成

**Property Prediction**：给定 SMILES 和目标性质标签，让模型补全性质值，例如：

```text
[START_SMILES] M_i [END_SMILES] [QED]
```

然后计算预测值与真实值之间的 RMSE。

**Conditional Generation**：给定目标性质值，让模型生成 SMILES，例如：

```text
[QED] v_i [/QED] [START_SMILES]
```

生成后使用 rdkit 计算实际性质，并与目标值计算 RMSE。对于 invalid SMILES，作者用数据集中该性质的均值替代，得到 corrected RMSE。

下图展示 Chemma-2B 在不同性质上的 property prediction 与 conditional generation 误差。散点对应分子，背景直方图表示数据库中的真实性质分布，紫色曲线表示对应区域的 RMSE。

![[raw/zotero/images/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization/mineru-figure-03.jpg]]

该图说明模型在不同性质区间的误差并不均匀，性质分布稀疏区域可能更难预测或生成。具体各子图对应的性质名称需待补充原文/PDF 后确认。

### 3. 分子优化算法

优化目标形式化为：

```text
m* = arg max_{m in M} O(m)
```

其中 `O(m)` 是黑盒 oracle，可代表 docking、实验测量、量子模拟或复合性质函数。

算法包含三个关键机制：

1. **LLM-enhanced genetic algorithm**  
   用语言模型生成与当前高分 pool 中分子相似的新分子，替代传统遗传算法中的 mutation/crossover。prompt 形式为：

   ```text
   [SIMILAR] m1_smiles 0.8 [/SIMILAR]
   ...
   [SIMILAR] mS_smiles 0.8 [/SIMILAR]
   [START_SMILES]
   ```

2. **Explicit oracle modeling**  
   受到 rejection sampling 思想启发，在优化停滞后把高得分分子与 oracle 分数写入训练样本继续 fine-tune：

   ```text
   [PROPERTY] O(m) [/PROPERTY]
   [START_SMILES] m_smiles [END_SMILES]
   ```

3. **动态 fine-tuning**  
   如果连续 K 轮最佳分子没有提升，就用 pool 中高得分分子构造训练样本，对 LM 进行额外 fine-tuning。这样模型会逐步适应当前任务的 oracle。

### 4. 伪代码概括

每轮优化流程：

1. 从当前 pool 中随机采样 S 个分子；
2. 使用 `molecules2prompt` 构造 N 个生成 prompt；
3. LM 生成 N 个新且唯一的候选分子；
4. oracle 对新分子评分；
5. 合并旧 pool 与新分子，保留 top-P；
6. 若最优分数连续 K 轮未提升，则用 pool 中样本 fine-tune LM；
7. 重复直到达到 oracle budget 或其他停止条件。

## 实验设置

### 训练语料与模型

- 数据来源：PubChem dumps。
- 分子规模：超过 110M 小分子。
- token 规模：约 40B tokens。
- 模型：
  - Chemlactica-125M
  - Chemlactica-1.3B
  - Chemma-2B
- 训练目标：causal language modeling。
- 上下文长度：2048。
- 优化器：Adam。
- 训练基础设施：PyTorch FSDP、Flash Attention。
- rdkit 用于 SMILES 解析、标准化和性质计算。

### 性质预测与条件生成任务

计算性质包括：

- QED
- SIM
- SAS
- CLOGP
- TPSA
- WEIGHT

评估指标为 RMSE；条件生成中使用 corrected RMSE 处理 invalid SMILES。

### PMO benchmark

Practical Molecular Optimization benchmark 包含 23 个分子优化任务。每个任务 oracle 调用预算为 10,000。指标为 top-10 average property value 随 oracle calls 变化曲线的 normalized AUC，记作 AUC Top-10。

比较方法包括：

- REINVENT
- Augmented memory
- Genetic-guided GFlowNets
- Chemlactica-125M
- Chemlactica-1.3B
- Chemma-2B

### Docking 多性质优化

该 benchmark 来自 REINVENT 相关工作，目标是在 docking score、QED、分子量限制等约束下生成可行分子。靶点包括：

- DRD2
- MK2
- AChE

指标包括：

- Generative Yield：固定 oracle 调用数下超过 reward threshold 的 unique molecules 数量；
- Oracle burden：生成 N 个超过 reward threshold 的 unique molecules 所需 oracle 调用数。

### QED + similarity constrained molecular design

任务目标：给定 lead molecule `M`，生成 `M'`，满足：

```text
sim(M', M) >= 0.4
qed(M') >= 0.9
```

输入分子为 800 个 QED 在 `[0.7, 0.8]` 范围内的分子。本文使用 Chemlactica-125M，并将最大 QED evaluations 降低到 10,000，而 baseline 使用 50,000。

## 主要结果

### 1. 性质预测与条件生成

在 computed property prediction 上，模型能较好预测 QED、SIM、SAS、CLOGP、TPSA、WEIGHT 等性质。部分结果：

- Chemlactica-1.3B 在 QED property prediction 上 RMSE 为 0.004；
- Chemma-2B-39B 在 SAS property prediction 上 RMSE 为 0.037；
- Chemma-2B-39B 在 WEIGHT property prediction 上 RMSE 为 1.931；
- 条件生成通常比性质预测更难，RMSE 明显更高。

作者还发现 conditional generation 的 sampling 技巧很重要，包括 Chain-of-Thought、repetition penalty、undesired token suppression。消融实验显示，加入 suppression 与适度 repetition penalty 通常能减少 invalid generation 并改善 RMSE。

### 2. PMO benchmark

在 PMO benchmark 上，本文方法超过先前方法。关键结果如下：

| 方法 | sum of 23 AUC Top-10 |
|---|---:|
| REINVENT | 14.196 |
| Augmented memory | 15.002 |
| Genetic-guided GFlowNets | 16.213 |
| Chemlactica-125M | 17.170 ± 0.424 |
| Chemlactica-1.3B | 17.284 ± 0.284 |
| Chemma-2B | 17.534 ± 0.214 |

论文摘要称相对 previous methods 在 Practical Molecular Optimization 上有约 8% improvement。按表中 `17.534` vs `16.213`，提升约为 8.1%。

在 sitagliptin_mpo 上，作者可视化了不同模型、不同 seed 的优化过程。以下四张图对应 Chemlactica-125M 在 sitagliptin_mpo 任务上的四个 seed 优化轨迹。

![[raw/zotero/images/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization/mineru-figure-04.jpg]]

该图展示某个 seed 下分子得分随优化迭代的变化，体现 pool-based 搜索如何逐步发现更高分候选。具体横纵轴细节需待补充原文/PDF 后确认。

![[raw/zotero/images/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization/mineru-figure-05.jpg]]

该图为同一任务的另一 seed，可用于观察随机初始化或采样带来的轨迹差异。图注在 MinerU 中存在重复，精确编号需待补充原文/PDF 后确认。

![[raw/zotero/images/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization/mineru-figure-06.jpg]]

该图继续展示 sitagliptin_mpo 中 Chemlactica-125M 的优化过程。不同 seed 的可视化有助于判断算法是否稳定，而不仅是单次运行成功。

![[raw/zotero/images/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization/mineru-figure-07.jpg]]

该图对应 Chemlactica-125M 的第四个 seed。整体上，作者用这些轨迹支持模型在困难 PMO 任务中的逐步优化能力。

以下四张图对应 Chemlactica-1.3B 在 sitagliptin_mpo 上的四个 seed 优化过程。

![[raw/zotero/images/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization/mineru-figure-08.jpg]]

该图展示更大 Chemlactica 模型在相同任务中的优化轨迹。与 125M 模型相比，1.3B 模型在总 PMO 分数上略高，但在 sitagliptin_mpo 单项上并非最高。

![[raw/zotero/images/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization/mineru-figure-09.jpg]]

该图体现不同 seed 下优化路径可能存在明显差异。论文报告最终指标时采用 5 个 seed 平均值和标准差。

![[raw/zotero/images/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization/mineru-figure-10.jpg]]

该图可用于理解语言模型生成、oracle 筛选与 pool 更新之间的闭环效果。具体图内分子结构或颜色含义需待补充原文/PDF 后确认。

![[raw/zotero/images/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization/mineru-figure-11.jpg]]

该图为 Chemlactica-1.3B 的另一 seed。结合表格结果，模型规模增加不保证每个单项任务都提升，但总体 PMO sum 有改善。

### 3. Fine-tuning 消融

作者比较了优化过程中是否执行动态 fine-tuning。结果显示 fine-tuning 并非对所有任务都稳定提升，但对一些困难任务如 sitagliptin_mpo 有明显帮助。例如：

- Chemlactica-125M 在 sitagliptin_mpo：
  - fine-tuning：0.649 ± 0.051
  - no fine-tuning：0.607 ± 0.051
- Chemma-2B 在 sitagliptin_mpo：
  - fine-tuning：0.613 ± 0.018
  - no fine-tuning：0.563 ± 0.059

以下图展示 Chemlactica-125M 的 generated molecule mean oracle score ± standard deviation，可用于观察有无 fine-tuning 或不同任务中的优化动态。

![[raw/zotero/images/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization/mineru-figure-12.jpg]]

该图展示平均 oracle score 与标准差，帮助判断算法不仅能提高均值，也要关注不同 run 之间的稳定性。具体子任务对应关系需待补充原文/PDF 后确认。

![[raw/zotero/images/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization/mineru-figure-13.jpg]]

该图同属 Chemlactica-125M 的优化轨迹统计。误差带反映不同随机 seed 或运行之间的波动。

![[raw/zotero/images/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization/mineru-figure-14.jpg]]

该图继续展示 mean oracle score ± standard deviation。若曲线在中后期停滞，动态 fine-tuning 可能用于重新引导模型探索高分区域。

![[raw/zotero/images/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization/mineru-figure-15.jpg]]

该图为同组统计图的另一张。由于 MinerU 提取的图注截断为 “Figure 6”，具体对应任务需待补充原文/PDF 后确认。

### 4. Docking 多性质优化

在 DRD2、MK2、AChE 三个靶点上，本文方法在 Generative Yield 和 Oracle burden 上普遍优于 REINVENT Baseline 与 Beam Structure 15。

部分结果：

- Generative Yield 0.8：
  - DRD2：Chemma 2B 为 2985 ± 194，高于 Beam Structure 15 的 1780 ± 439；
  - MK2：Chemlactica 125M 为 2569 ± 1156，高于 Beam Structure 15 的 987 ± 211；
  - AChE：Chemlactica 1.3B 为 3652 ± 349，高于 Beam Structure 15 的 2059 ± 327。
- Oracle burden 0.8 (100)：
  - DRD2：Chemlactica 125M 为 364 ± 119，低于 Beam Structure 15 的 1120 ± 25；
  - MK2：Chemlactica 1.3B 为 486 ± 346，低于 Beam Structure 15 的 2189 ± 181；
  - AChE：Chemlactica 1.3B 为 333 ± 131，低于 Beam Structure 15 的 1110 ± 265。

作者认为较小模型更擅长早期探索，较大模型更擅长利用高 reward 区域，这可能解释了 oracle burden 与 generative yield 之间的差异。

### 5. QED + similarity constrained molecular design

Chemlactica-125M 在该任务上达到 99.0% success rate，优于：

- QMO：92.8%
- RetMol：94.5%

同时，本文方法的最大 QED evaluations 为 10,000，而 baseline 使用 50,000。由于 Chemlactica-125M 已接近完美，作者没有评估更大模型。

### 6. MoleculeNet 与 ADMET 性质预测

在 MoleculeNet 回归任务上，Chemlactica-125M 表现较强：

| 模型 | ESOL RMSE | FreeSolv RMSE | Lipophilicity RMSE | Avg |
|---|---:|---:|---:|---:|
| Chemlactica-125M | 0.270 ± 0.011 | 0.306 ± 0.011 | 0.533 ± 0.009 | 0.369 |
| Chemlactica-1.3B | 0.281 ± 0.005 | 0.356 ± 0.009 | 0.557 ± 0.021 | 0.403 |
| Chemma-2B | 0.298 ± 0.014 | 0.359 ± 0.040 | 0.563 ± 0.004 | 0.406 |

在 ADMET benchmark 上，模型与 MPNN2 基线接近，但并未在所有任务上领先。

## 创新点

1. **大规模分子属性文本语料**  
   不只是 SMILES-only corpus，而是将 110M 小分子的计算性质、实验性质、相似分子、PubChem 标识等组织进结构化文本格式。

2. **面向小分子的 LLM 继续预训练**  
   基于 Galactica 与 Gemma 训练 Chemlactica-125M、Chemlactica-1.3B、Chemma-2B，使其适配 SMILES、性质预测与条件生成。

3. **把 LLM 用作遗传算法中的生成算子**  
   用相似分子 prompt 让 LM 生成候选分子，替代传统分子遗传算法中的显式 crossover/mutation。

4. **显式 oracle 建模与动态 fine-tuning**  
   当优化停滞时，将当前高分分子和 oracle score 写入 prompt 继续 fine-tune，使模型逐步学习当前黑盒目标。

5. **在多个分子优化 benchmark 上获得强结果**  
   在 PMO benchmark、docking 多性质优化和 QED+similarity 约束优化上均取得竞争力或 SOTA 结果。

6. **分析数值精度对优化闭环的影响**  
   作者指出 bfloat16 在多轮生成与 fine-tuning 的闭环优化中可能造成级联误差，FP32 对某些优化任务更可靠。

## 局限性

1. **仅使用 SMILES 表示**  
   模型不支持 3D 原子坐标，因此在构象、立体化学、docking 等强依赖 3D 结构的问题上可靠性受限。

2. **对蛋白质等生物实体理解有限**  
   模型主要围绕小分子语料训练，对蛋白质、靶点、生物通路等信息理解有限，限制了实际药物发现应用。

3. **优化算法未充分调参**  
   作者承认优化算法并未 exhaustively tuned，仍有进一步提升空间。

4. **未充分考虑真实药物设计约束**  
   当前方法不完全纳入 synthetic accessibility、实验可合成性、安全性、ADMET 等真实开发约束。虽然语料中有 SAS 等性质，但优化流程并不总是显式考虑这些因素。

5. **双重用途风险**  
   分子优化模型可能被用于加速药物发现，也可能降低有害化学/生物物质设计门槛。作者建议未来进行生物安全评估与防护机制设计。

6. **图表解析存在不完整和重复**  
   当前 MinerU 提取的部分图注重复或截断，部分图片对应的准确 figure/subfigure 编号需待补充原文/PDF 后确认。

## 相关概念

- [[分子性质预测]]
- [[大语言模型]]
- [[分子优化]]
- [[黑箱优化]]
- [[多目标优化]]
- [[分子生成]]
- [[可控生成]]
- [[SMILES]]
- [[QED]]
- [[Oracle Calls]]
## 相关方法

- [[自回归语言模型]]
- [[遗传算法]]
- [[拒绝采样]]
- [[Prompt Optimization]]
- [[动态 fine-tuning]]
## 相关数据集

- [[MoleculeNet]]
## 相关模型

- [[Galactica]]
- [[Gemma]]
- [[Chemlactica-125M]]
- [[Chemlactica-1.3B]]
- [[Chemma-2B]]
## 相关论文

- [[Sample Efficiency Matters: A Benchmark for Practical Molecular Optimization]]
- [[REINVENT 2.0: An AI Tool for De Novo Drug Design]]
- [[Genetic-guided GFlowNets]]
- [[Chemformer: A Pre-trained Transformer for Computational Chemistry]]
- [[BARTSmiles]]
- [[Retrieval-based Controllable Molecule Generation]]

## 源文件

- citekey：bedrosianSmallMoleculeOptimization
- title：Small Molecule Optimization with Large Language Models
- authors metadata：Menua Bedrosian, Philipp Guevorguian, Tigran Fahradyan
- authors in parsed full text：Menua Bedrosian, Philipp Guevorguian, Tigran Fahradyan, Gayane Chilingaryan, Hrant Khachatrian, Armen Aghajanyan
- year：待补充原文/PDF 后确认
- venue：待补充原文/PDF 后确认
- DOI：待补充原文/PDF 后确认
- collections：多目标分子优化
- 正文来源：MinerU full.md

## 代码与数据

### 代码

未在当前解析文本中发现明确代码仓库。

### 数据集 / Benchmark

未在当前解析文本中发现明确数据集或 benchmark 链接。

### 其他链接

- https://api.semanticscholar.org/CorpusID:257232765
- https://api.semanticscholar.org/CorpusID:2978311
- https://api.semanticscholar.org/CorpusID:250072218
- https://openreview.net/forum?id=uyTL5Bvosj
- https://doi.org/10.1021/acs.jcim.4c00512
- https://openreview.net/forum?id=mZn2Xyh9Ec
- https://api.semanticscholar.org/CorpusID:248376906
- https://api.semanticscholar.org/CorpusID:262012566
- https://api.semanticscholar.org/CorpusID:9567253
- https://api.semanticscholar.org/CorpusID:216078090
- https://doi.org/10.14778/3611540.3611569

## Zotero 原始摘要

The rise of large language models has created an opportunity for practical applications of machine learning algorithms in different areas like life science. In this work, we take advantage of the immense learning abilities of large language models and combine that with a training corpus of 110M small molecules to train a model that can predict molecular properties and more. More specifically, we take three publicly available large language models of 125M, 1B and 2B parameter sizes and train them on roughly 40B tokens comprising of molecules in SMILES format and their respective properties. These models demonstrate strong performance in generating molecules with specified properties and predicting new molecular characteristics from limited samples. We introduce a novel optimization algorithm that leverages our language models to optimize molecules for arbitrary properties given limited access to a black box oracle. Our approach combines ideas from genetic algorithms, rejection sampling, and prompt optimization. It achieves stateof-the-art performance on multiple molecular optimization benchmarks, including an 8% improvement on Practical Molecular Optimization compared to previous methods. We publicly release the language models and the dataset.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的关键不只是“用 LLM 生成 SMILES”，而是把小分子优化任务改写成一种语言模型能处理的序列条件生成问题。它的强处在于统一了三类信息：分子本身、分子性质、分子相似性。这样一来，模型既可以预测性质，也可以根据性质或相似性约束生成分子，还可以在优化过程中通过新得到的 oracle 反馈继续 fine-tune。

从优化角度看，本文方法像是一个用 LLM 替换 mutation/crossover 的进化搜索框架。传统遗传算法需要手工设计分子编辑操作，而这里让语言模型基于相似分子 prompt 自动提出候选分子。由于模型已经在海量分子上预训练，它的 proposal distribution 更接近有效化学空间，因此在有限 oracle budget 下更有优势。

但这种方法也有一个潜在风险：优化闭环高度依赖早期生成质量。如果模型早期生成的高分样本其实只是局部最优，后续 fine-tuning 可能强化这种偏差。论文中关于低精度导致 sub-optimal generations 并产生负反馈的讨论，也说明这类闭环系统容易出现级联效应。

另一个值得注意的点是，模型规模并非单调改善所有任务。Chemlactica-125M 在一些 oracle burden 指标上反而更好，说明小模型可能更容易探索，大模型可能更容易利用。对真实药物发现来说，这提示可以考虑多模型协同：小模型负责探索，大模型负责 exploit 或 rerank。

## 后续问题

1. 本文公开模型和数据集的实际下载地址在哪里？当前解析文本未包含明确链接。
2. Chemlactica 与 Chemma 的基础模型、训练 token 数、数据混合比例是否在原文中有更完整说明？
3. PMO 中 `valsartan_smarts` 全部方法几乎为 0，是否说明该 benchmark 的部分 oracle 对生成式优化不够友好？
4. 动态 fine-tuning 在哪些任务上有负面影响？是否可以用不确定性或 early stopping 自动决定是否 fine-tune？
5. 如果引入 3D conformation、protein sequence 或 binding pocket 信息，本文 prompt 格式该如何扩展？
6. 本文方法在真实 wet-lab feedback 下是否可行？oracle 噪声、延迟和批量评估成本会如何影响算法？
7. 使用额外性质 prompt 会带来不公平比较，但在实际应用中很有价值；如何系统评估“允许使用已知性质”的增强版本？
8. 是否可以把本文的 explicit oracle modeling 与 Bayesian optimization、active learning 或 surrogate model 结合？
