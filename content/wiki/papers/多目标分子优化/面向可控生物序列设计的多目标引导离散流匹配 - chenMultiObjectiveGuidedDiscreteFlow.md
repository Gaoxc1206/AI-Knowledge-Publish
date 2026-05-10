---
type: paper
citekey: "chenMultiObjectiveGuidedDiscreteFlow"
title: "面向可控生物序列设计的多目标引导离散流匹配"
chinese_title: "面向可控生物序列设计的多目标引导离散流匹配"
authors: "Tong Chen, Yinuo Zhang, Sophia Tang, Pranam Chatterjee"
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
  - "面向可控生物序列设计的多目标引导离散流匹配"
  - "Multi-Objective-Guided Discrete Flow Matching for Controllable Biological Sequence Design"
original_title: "Multi-Objective-Guided Discrete Flow Matching for Controllable Biological Sequence Design"
---
## 一句话总结

**Multi-Objective-Guided Discrete Flow Matching for Controllable Biological Sequence Design** 提出 **MOG-DFM**，在预训练 **Discrete Flow Matching** 生成器采样过程中加入多目标引导与自适应超锥过滤，用于生成在多个功能/生物物理指标之间更接近 Pareto 高效折中的肽结合物和 enhancer DNA 序列。

## 研究问题

生物序列设计常常不是单一指标优化问题，而是需要同时满足多个可能冲突的目标。例如：

- 治疗性肽需要高结合亲和力、低溶血性、较好溶解性、较长半衰期和低非特异性污染。
- enhancer DNA 设计需要同时控制 enhancer class 与 DNA shape。
- 这些目标之间可能存在冲突，单目标优化容易导致某一性质提升但其他性质显著恶化。

论文关注的问题是：  
**如何在离散生物序列空间中，利用预训练的离散生成模型进行多目标可控采样，使生成序列朝向 Pareto-efficient trade-offs，而不必把离散序列嵌入连续空间。**

## 背景与动机

已有生物分子设计方法中，许多模型主要针对单一目标优化。单目标方法虽然能在特定指标上取得高分，但在真实药物或生物工程场景中往往不够可靠，因为多个性质之间存在明显 trade-off。

经典多目标优化方法，如 evolutionary algorithms 和 Bayesian optimization，已用于分子库黑箱优化；近期也有将多目标优化嵌入生成模型采样过程的方法，例如 **ParetoFlow**。但 **ParetoFlow** 主要面向连续空间，若应用于离散序列通常需要连续嵌入，可能扭曲离散分布，也会增加基于性质引导的复杂性。

**Discrete Flow Matching** 直接在离散状态空间中建模连续时间马尔可夫链，学习 token-level transition rates。相比 masked diffusion language model，这类模型具有更自然的 token-level velocity / transition-rate 表示，更适合在采样时对候选 token 转移进行重新加权与引导。

论文的动机是：  
在不破坏离散空间结构的前提下，把多目标 Pareto 引导机制加入 **Discrete Flow Matching** 采样过程，从而实现可控生物序列设计。

## 核心思想

MOG-DFM 的核心思想是：  
**不重新训练生成器，而是在预训练 Discrete Flow Matching 模型的采样过程中，根据多个性质评分函数对每一步 token 转移进行重新加权，并用自适应超锥过滤保证转移方向与指定 trade-off 向量一致。**

具体包括三部分：

1. **权重向量指定 trade-off 方向**  
   使用 **Das–Dennis simplex lattice** 生成覆盖 Pareto front 的权重向量，每次采样随机选取一个权重向量，代表本次生成希望偏向的多目标折中方向。

2. **Rank-Directional Scoring**  
   对每个候选 token 替换，计算：
   - 各目标的局部改善排名分数；
   - 多目标改善向量与权重向量的方向一致性；
   - 将二者标准化后组合为候选转移的引导分数。

3. **Adaptive Hypercone Filtering**  
   只接受改善方向位于权重向量附近超锥内的候选转移，并根据拒绝率动态调整超锥角度，在探索和利用之间平衡。

## 方法框架

MOG-DFM 假设已有一个预训练的离散流匹配生成器，其定义了一个连续时间马尔可夫链，具有 factorized velocity field。另有若干预训练的 scalar score functions，用于评价序列在多个目标上的得分。

整体框架如下：

1. 从离散状态空间均匀采样初始序列。
2. 生成一组覆盖 Pareto front 的权重向量，并随机选择一个权重向量。
3. 在每个采样步：
   - 随机选择一个 token 位置；
   - 枚举该位置的候选 token 替换；
   - 根据多目标分数变化计算候选转移分数；
   - 对原始 DFM transition velocity 进行指数重加权；
   - 用 adaptive hypercone filter 过滤方向不一致的转移；
   - 通过 Euler sampling 更新 CTMC 状态。
4. 经过固定采样步数后得到多目标优化后的序列。

![[raw/zotero/images/多目标分子优化/面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow/mineru-figure-01.jpg]]

图 1 展示了 **MOG-DFM** 的算法可视化。它强调 MOG-DFM 并不是直接替换底层生成模型，而是在离散流匹配采样过程中加入多目标评分、方向引导和超锥过滤，从而把采样轨迹推向 Pareto-efficient 区域。

## 算法流程

MOG-DFM 的采样流程可概括为以下步骤。

### Step 0：初始化与权重向量生成

- 初始序列从离散状态空间均匀采样。
- 通过 **Das–Dennis simplex lattice** 生成一组权重向量。
- 每个权重向量表示一种多目标折中方向。
- 每次生成随机选择一个权重向量，用于控制采样方向。

### Step 1：Guided Transition Scoring

对当前序列中的一个随机位置，枚举所有可替换 token。对每个候选替换计算：

- 局部改善：该 token 替换对每个目标分数的增量；
- rank-normalized improvement：把不同目标的改善转为统一排名尺度；
- directional alignment：多目标改善向量与权重向量的内积；
- 综合得分：rank 分数与方向分数标准化后相加，并由超参数控制方向项强度。

随后将综合得分用于重新加权原始 DFM transition rate：

- 高分候选转移的 transition velocity 被放大；
- 低分候选转移被压低；
- 通过构造保证 CTMC rate 的非负性和零和条件仍然成立。

### Step 2：Adaptive Hypercone Filtering

对每个候选转移，计算其多目标改善向量与权重向量之间的夹角。若夹角小于当前超锥角，则认为该转移方向与目标 trade-off 方向一致。

若超锥内没有候选转移，算法区分两种情况：

- 所有候选都导致反向或无效改善：执行 self-transition；
- 有候选朝向大致正确但超锥太窄：选择最接近方向的候选，并允许超锥角后续自适应调整。

超锥角根据候选拒绝率的 EMA 动态更新：

- 拒绝率过高：扩大超锥，增强探索；
- 拒绝率过低：缩小超锥，增强方向一致性。

### Step 3：Euler Sampling

在得到 guided transition rates 和过滤后的候选转移后，使用 CTMC 的 Euler sampling 进行状态更新。每一步根据总 outgoing rate 决定是否发生 token 替换；若发生替换，则更新为选出的最佳候选 token。

论文还给出一个证明草图：在超锥内候选转移方向与权重向量夹角小于阈值时，沿该权重方向的期望改善为正，因此采样过程会在期望意义上朝指定 Pareto trade-off 方向推进。

## 实验设置

论文构建了两个生物序列多目标生成 benchmark，因为作者认为当前没有公开数据集可直接作为生物序列多目标优化算法 benchmark。

### 任务 1：肽结合物多目标设计

目标是生成 peptide binders，同时优化五个治疗相关性质：

- hemolysis，越低越好；
- non-fouling，越高越好；
- solubility，越高越好；
- half-life，越高越好；
- binding affinity，越高越好。

作者训练了无条件肽生成模型 **PepDFM** 作为 MOG-DFM 的 base generator。

**PepDFM 数据来源：**

- **PepNN**
- **BioLip2**
- **PPIRef**

筛选长度为 6–49 aa 的肽序列，训练/验证/测试划分为 80/10/10。

**PepDFM 模型：**

- U-Net-style convolutional architecture；
- sequence embedding 与 time embedding；
- polynomial convex schedule；
- 训练 200 epochs；
- batch size 512；
- Adam，learning rate 1e-4；
- 最终 training loss 3.3134，validation loss 3.1051。

### 任务 2：enhancer DNA 多目标设计

目标是设计 enhancer DNA 序列，同时控制：

- enhancer class；
- DNA shape，例如 HelT 和 Rise。

作者训练了 **EnhancerDFM** 作为无条件 enhancer DNA 生成模型。

**EnhancerDFM 数据来源：**

- Stark et al. 使用的 melanoma enhancer dataset；
- 约 89k human melanoma enhancer sequences；
- 每条长度 500；
- 包含 47 个由 ATAC-seq 数据确定的 cell class labels。

**EnhancerDFM 模型：**

- 与 PepDFM 相同的 U-Net-style 架构；
- batch size 256；
- 训练 1500 epochs；
- Adam，learning rate 1e-3；
- 评价指标使用 **Fréchet Biological Distance (FBD)**。

### 评分模型

肽任务中，性质评分模型包括：

- hemolysis、non-fouling、solubility：基于 ESM-2 embedding 的 XGBoost classifier；
- binding affinity：使用 ESM-2 token-level embedding、CNN 与 cross-attention 的 transformer 模型；
- half-life：先在稳定性数据上预训练，再在 half-life 数据上微调。

DNA 任务中：

- DNA shape 使用 **Deep DNAshape**；
- enhancer class predictor 来源于 Stark et al. 的 enhancer DNA design task。

### 采样超参数

肽结合物任务：

- num_div = 64；
- λ = 1.0；
- β = 1.0；
- αr = 0.5；
- τ = 0.3；
- η = 1.0；
- Φinit = 45°；
- Φmin = 15°；
- Φmax = 75°；
- T = 100。

DNA 任务：

- 大部分超参数同肽任务；
- T = 800。

![[raw/zotero/images/多目标分子优化/面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow/mineru-figure-08.jpg]]

图 3 展示了 **PepDFM** 生成肽与测试集肽之间的 Hamming distance 和 Shannon Entropy。结果用于说明无条件 base generator 既能生成与测试集有距离的新颖序列，又能保持接近真实肽分布的序列多样性与生物合理性。

## 主要结果

### 1. Base generator 的质量

**PepDFM** 在训练后获得较低 generalized KL loss，并且生成肽相对测试集具有较高 Hamming distance，同时 Shannon entropy 接近测试集，说明生成序列具有一定新颖性和生物合理性。

**EnhancerDFM** 在 enhancer DNA 无条件生成上使用 FBD 评价：

| 方法 | FBD | NFE | 训练 epoch |
|---|---:|---:|---:|
| Random Sequence | 622.8 | - | - |
| Dirichlet FM | 5.3 | 100 | 1400 |
| EnhancerDFM | 5.9 | 100 | 20 |

EnhancerDFM 的 FBD 接近 Dirichlet FM，并远优于随机序列。论文还强调 EnhancerDFM 在较少训练 epoch 下达到较好 checkpoint，但原文中一句“best EnhancerDFM is obtained only in around 1400 training epochs”疑似笔误，应为 Dirichlet FM；待补充原文/PDF 后确认。

### 2. 肽结合物五目标优化

MOG-DFM 在 10 个 diverse protein targets 上设计 peptide binders，包括：

- 有已知 binders 的结构化靶标：1B8Q、1E6I、3IDJ、5AZ8、7JVS；
- 无已知 binders 的结构化靶标：AMHR2、OX1R、DUSP12；
- intrinsically disordered targets：EWS::FLI1、MYC。

每个 target 生成 100 条 peptide binders。结果显示：

- hemolysis 约 0.06–0.09；
- non-fouling > 0.78；
- solubility > 0.74；
- half-life 约 28–47 h；
- affinity score 约 6.4–7.6，部分表格中 target 平均 affinity 低于 6.4，例如 1E6I 为 4.9621，具体统计口径待补充原文/PDF 后确认。

![[raw/zotero/images/多目标分子优化/面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow/mineru-figure-02.jpg]]

图 2A/B 对比了 PDB 5AZ8 上 MOG-DFM 设计 binder 与已有 binder 的复合物结构，并展示五个性质分数、AlphaFold3 ipTM 和 AutoDock VINA docking score。该图用于说明 MOG-DFM 设计的序列在保持结合潜力的同时，可以在多个药物相关性质上取得更好的折中。

![[raw/zotero/images/多目标分子优化/面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow/mineru-figure-03.jpg]]

图 2 的另一部分展示了 MOG-DFM 设计 binder 的结构与性质得分。结合图注可知，这些面板用于比较设计 binder 与既有或无既有 binder 靶标上的结构互作与性质表现。

![[raw/zotero/images/多目标分子优化/面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow/mineru-figure-04.jpg]]

图 2C/D 展示了 OX1R、EWS::FLI1 等无已知 binder 靶标与 MOG-DFM 设计 binder 的复合物结构。图中同时给出 ipTM、docking score 与五个性质分数，用于说明模型可用于没有预先已知 binder 的目标设计场景。

![[raw/zotero/images/多目标分子优化/面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow/mineru-figure-05.jpg]]

图 2E 展示了 EWS::FLI1 长度 12 aa binder 设计过程中，五个性质随迭代次数变化的均值曲线。论文报告所有五个性质总体呈改善趋势，其中 solubility 和 non-fouling 从约 0.3 提升到约 0.8，说明采样过程确实被多目标引导逐步推向更优区域。

![[raw/zotero/images/多目标分子优化/面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow/mineru-figure-06.jpg]]

图 2F 对比了 MOG-DFM 设计的 EWS::FLI1 12 aa binders 与 PepDFM 无条件生成肽的性质分布。MOG-DFM 将分布整体推向更优性质区域，说明多目标引导不仅改善个别样本，也改变了采样分布。

![[raw/zotero/images/多目标分子优化/面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow/mineru-figure-07.jpg]]

图 2 的剩余面板进一步补充了结构可视化与性质分布结果。由于 MinerU 将 Figure 2 拆成多张图片且图注重复，具体每张子图对应的 panel 编号待补充原文/PDF 后确认。

### 3. 与传统多目标优化方法比较

论文将 MOG-DFM 与四种多目标优化器比较：

- MOPSO
- NSGA-III
- SMS-EMOA
- SPEA2

在 1B8Q 与 PPP5 两个 target 上，每种方法生成 100 条 peptide binders。论文报告：

- MOG-DFM 运行时间更长；
- 但在 non-fouling、solubility、half-life 等性质上显著优于传统方法；
- affinity 保持竞争性；
- hemolysis 通常也较低。

例如 1B8Q 上，MOG-DFM 的 non-fouling / solubility / half-life 分别为 0.8445 / 0.8455 / 27.227 h，而传统方法 half-life 多在 3–7 h 左右。

论文没有与 **ParetoFlow** 比较，理由是 ParetoFlow 需要 score models 接收连续输入，不适合当前离散序列任务。

### 4. 消融实验：多目标引导必要性

在 7LUL 的 affinity、solubility、hemolysis 三目标任务中，去掉某个目标的 guidance 会导致对应性质退化。例如只优化 affinity 时 affinity 可升高，但 solubility 和 hemolysis 可能明显恶化。

在 CLK1 的 affinity、non-fouling、half-life 三目标任务中：

- 去掉 non-fouling guidance 时，half-life 可超过 80 h，但 non-fouling 接近低值；
- 去掉 half-life guidance 时，non-fouling 可以较好，但 half-life 降到 2 h 以下；
- 全部 guidance 打开时获得更平衡的 profile。

这说明 MOG-DFM 的目标控制确实对应于所给 score functions，而不是单纯随机提升某些性质。

### 5. Adaptive Hypercone Filtering 的作用

论文在 3IDJ、4E-BP2、EWS::FLI1 上比较：

- w/o filtering；
- w/o adaptation；
- full MOG-DFM。

结果显示：

- 完全去掉 hypercone filtering 会使 half-life 显著下降；
- 使用静态 hypercone 可以恢复一部分 half-life，但可能牺牲 non-fouling 与 solubility；
- 完整 MOG-DFM 能更好地平衡 half-life 与其他目标。

作者认为这说明自适应超锥机制对于在不规则、非凸 Pareto landscape 中保持方向一致性很重要，尤其是在 intrinsically disordered targets 上。

### 6. enhancer DNA 多目标设计

MOG-DFM 还用于 enhancer DNA 生成，目标包括 enhancer class 与 DNA shape。

两个任务：

1. Task 1：目标 enhancer class 1，与较高 HelT；
2. Task 2：目标 enhancer class 16，与较高 Rise。

每个设置设计 5 条长度 100 的 enhancer DNA。结果显示：

- 同时使用 class 与 shape guidance 时，目标 class probability 和 shape value 同时较好；
- 去掉其中一种 guidance，会导致对应性质下降；
- 去掉两种 guidance 时，二者均表现较差。

这说明 MOG-DFM 不限于 peptide design，也能迁移到 DNA sequence design。

## 创新点

1. **面向离散序列的多目标 guided flow matching**  
   MOG-DFM 将 Pareto-style 多目标引导引入 **Discrete Flow Matching**，避免将离散序列嵌入连续空间。

2. **Rank-Directional Scoring**  
   同时利用局部 rank-normalized improvement 与全局 trade-off direction alignment，对候选 token 转移进行评分。

3. **Adaptive Hypercone Filtering**  
   用动态超锥约束候选转移方向，拒绝与当前 trade-off 方向不一致的转移，并根据拒绝率调整超锥角度。

4. **可复用的生成器引导框架**  
   MOG-DFM 可作用于任意预训练 discrete flow matching generator，只需提供多个 scalar score functions。

5. **同时覆盖 peptide 与 enhancer DNA**  
   论文训练了 **PepDFM** 和 **EnhancerDFM**，并在两类生物序列任务上验证了方法的通用性。

## 局限性

1. **Pareto 最优性不是严格保证**  
   摘要与方法中明确写到目标是生成接近 Pareto front 的序列，not guaranteed to be Pareto optimal。

2. **依赖评分模型质量**  
   多目标引导完全依赖预训练 scalar score functions。若 score model 有偏差，生成结果可能优化了模型分数而不是真实实验性质。

3. **实验主要是计算验证**  
   论文使用 AlphaFold3、AutoDock VINA、ADMET-AI 等外部工具进行辅助验证，但当前解析文本中未发现湿实验验证。

4. **运行时间相对传统优化器更长**  
   与 NSGA-III、SMS-EMOA、SPEA2、MOPSO 比较时，MOG-DFM 生成单条 binder 的时间更长。

5. **长序列与高维输出仍是未来方向**  
   结论中提到未来会扩展到 longer sequences 和 higher-dimensional outputs，包括 text 和 image generation。

6. **部分表述或数值存在需核对之处**  
   例如 EnhancerDFM 与 Dirichlet FM 的训练 epoch 对比文字可能有笔误；部分 affinity 范围与表格数值略有不一致。待补充原文/PDF 后确认。

## 相关概念

- [[生物序列设计]]
- [[可控生成]]
- [[多目标优化]]
- [[Pareto Front]]
- [[连续时间马尔可夫链]]
- [[DNA Shape]]
- [[肽结合物设计]]
## 相关方法

- [[Multi-Objective-Guided Discrete Flow Matching]]
- [[Discrete Flow Matching]]
- [[Rank-Directional Scoring]]
- [[Adaptive Hypercone Filtering]]
- [[NSGA-III]]
- [[MOPSO]]
- [[SMS-EMOA]]
- [[SPEA2]]
## 相关数据集

- [[肽结合物多目标设计]]
- [[enhancer DNA 多目标设计]]
- [[PepNN]]
- [[BioLip2]]
- [[PPIRef]]
- [[melanoma enhancer dataset]]
## 相关模型

- [[ESM-2]]
- [[AlphaFold3]]
## 相关论文

- [[Discrete Flow Matching]]
- [[ParetoFlow]]
- [[Dirichlet Flow Matching with Applications to DNA Sequence Design]]
- [[PepTune]]
- [[Gumbel-Softmax Flow Matching]]
- [[Unlocking Guidance for Discrete State-Space Diffusion and Flow Models]]

## 源文件

- Zotero citekey：`chenMultiObjectiveGuidedDiscreteFlow`
- 标题：**Multi-Objective-Guided Discrete Flow Matching for Controllable Biological Sequence Design**
- 作者：Tong Chen, Yinuo Zhang, Sophia Tang, Pranam Chatterjee
- 年份：待补充原文/PDF 后确认
- Venue：待补充原文/PDF 后确认
- DOI：待补充原文/PDF 后确认
- Collection：多目标分子优化
- 正文来源：MinerU full.md

## 代码与数据

### 代码

未在当前解析文本中发现明确代码仓库。

### 数据集 / Benchmark

- https://huggingface.co/ChatterjeeLab/MOG-DFM

### 其他链接

未在当前解析文本中发现其他外部资源链接。

## Zotero 原始摘要

Designing biological sequences that satisfy multiple, often conflicting, functional and biophysical criteria remains a central challenge in biomolecule engineering. While discrete flow matching models have recently shown promise for efficient sampling in high-dimensional sequence spaces, existing approaches address only single objectives or require continuous embeddings that can distort discrete distributions. We present Multi-Objective-Guided Discrete Flow Matching (MOG-DFM), a general framework to steer any pretrained discrete flow matching generator toward Pareto-efficient trade-offs across multiple scalar objectives. At each sampling step, MOG-DFM computes a hybrid rank-directional score for candidate transitions and applies an adaptive hypercone filter to enforce consistent multi-objective progression. We also trained two unconditional discrete flow matching models, PepDFM for diverse peptide generation and EnhancerDFM for functional enhancer DNA generation, as base generation models for MOG-DFM. We demonstrate MOG-DFM’s effectiveness in generating peptide binders optimized across five properties (hemolysis, non-fouling, solubility, half-life, and binding affinity), and in designing DNA sequences with specific enhancer classes and DNA shapes. In total, MOG-DFM proves to be a powerful tool for multi-property-guided biomolecule sequence design.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的关键价值在于，它把“多目标优化”从后处理或外部搜索，移到了 **Discrete Flow Matching** 的采样动力学内部。它不是简单对最终样本打分筛选，而是在每个 token 替换步骤中，根据多目标改善方向调整 transition rate。

我认为 MOG-DFM 最值得关注的是 **directional consistency** 这个设计。多目标优化中，仅仅让每个局部转移“看起来有改善”不一定能带来整体 Pareto-efficient 解，因为不同目标的改善可能相互抵消。MOG-DFM 用权重向量指定 trade-off 方向，再用 hypercone 限制转移方向，相当于给离散采样轨迹加了一个局部几何约束。

不过，MOG-DFM 的有效性高度依赖 score models。如果评分模型本身不可靠，或者被生成模型 exploit，那么“多目标优化”可能只是优化预测器而非真实生物性质。因此这类方法后续最关键的验证应该是实验闭环或 uncertainty-aware guidance。

## 后续问题

1. MOG-DFM 在真实湿实验中设计的 peptide binder 是否仍能保持低 hemolysis、高 solubility 和高 affinity？
2. Adaptive Hypercone Filtering 是否可以给出更严格的 Pareto convergence guarantee？
3. 如果多个 score models 的不确定性差异很大，如何在 rank-directional score 中引入 uncertainty？
4. MOG-DFM 对更长蛋白序列、RNA 序列或 full-length regulatory sequence 是否仍然有效？
5. 权重向量随机采样是否足以覆盖 Pareto front？是否需要主动选择未覆盖区域？
6. 若目标之间强冲突，超锥过滤是否会导致过多 self-transition 或采样停滞？
7. MOG-DFM 是否能与实验反馈或 active learning 结合，形成闭环多目标分子设计流程？
