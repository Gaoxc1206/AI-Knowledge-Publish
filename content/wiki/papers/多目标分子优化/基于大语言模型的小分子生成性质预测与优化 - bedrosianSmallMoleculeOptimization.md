---
type: paper
citekey: "bedrosianSmallMoleculeOptimization"
zotero_key: "VIAUR6RC"
title: "基于大语言模型的小分子生成性质预测与优化"
chinese_title: "基于大语言模型的小分子生成性质预测与优化"
authors: "Menua Bedrosian, Philipp Guevorguian, Tigran Fahradyan"
year: ""
venue: ""
doi: ""
zotero_collections:
  - "多目标分子优化"
source_pdf: "raw/zotero/pdfs/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization.pdf"
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

《Small Molecule Optimization with Large Language Models》提出了面向小分子 SMILES 表示的专用大语言模型 **Chemlactica-125M**、**Chemlactica-1.3B** 和 **Chemma-2B**，并结合 遗传算法、拒绝采样 与 提示优化 设计了一个面向黑盒 oracle 的 分子优化 算法，在 Practical Molecular Optimization 等基准上取得强结果。

## 研究问题

本文关注的问题是：如何利用 大语言模型 在有限 oracle 调用预算下高效进行 小分子优化，即在巨大、离散的 化学空间 中找到满足目标性质的候选分子。

形式化地，论文将分子优化定义为：

$$
m^* = \arg\max_{m \in M} O(m)
$$

其中：

- $m$：一个分子；
- $M$：有效分子的约束集合；
- $O: M \rightarrow R$：黑盒 oracle，用于评价分子性质；
- oracle 可以代表实验测量、量子模拟、 docking score 或其他昂贵评价函数。

核心挑战包括：

1. 化学空间 极大且离散；
2. 分子需要满足多个性质约束；
3. oracle 调用预算有限；
4. 传统图搜索、SMILES 搜索或强化学习方法可能样本效率不足；
5. 希望模型能够泛化到任意性质或未知目标函数。

## 背景与动机

分子优化 是 药物发现 中的关键任务，目标是寻找具备期望性质的候选化合物。传统实验筛选成本高、周期长，因此计算方法被广泛用于加速候选分子的发现。

已有方法包括：

- 基于分子图的 遗传算法；
- 基于分子图的 Monte Carlo Tree Search；
- 基于 变分自编码器 的潜空间优化；
- GFlowNets；
- 强化学习 方法，如 **REINVENT**；
- 面向 SMILES 的序列模型，如 **ChemFormer**、**MolT5**、**BARTSmiles**。

近年来，大语言模型 在自然语言、代码和科学文本中展现出强大的序列建模能力。由于 SMILES 本质上是一种字符串表示，分子可以自然地被语言模型处理。本文的动机是：如果将大规模分子结构、计算性质、实验性质和相似分子关系整理为语言模型可学习的文本语料，是否可以训练出既能预测分子性质、又能条件生成和优化分子的专用 化学语言模型。

## 核心思想

本文的核心思想有三层：

1. **构建大规模带性质标签的分子语料**
   - 从 **PubChem** 构建包含超过 110M 小分子的训练语料；
   - 分子以 SMILES 格式表示；
   - 同时包含计算性质、实验性质、相似分子信息等结构化标签；
   - 总训练 token 规模约为 40B。

2. **继续预训练公开大语言模型为化学专用语言模型**
   - 基于公开模型继续训练：
     - **Chemlactica-125M**
     - **Chemlactica-1.3B**
     - **Chemma-2B**
   - 使模型学习分子结构与性质之间的映射关系。

3. **用语言模型替代传统遗传算法中的变异/交叉操作**
   - 维护一个高分分子池；
   - 从池中选取若干相似分子作为 prompt；
   - 让语言模型生成新的候选分子；
   - 用 oracle 评价；
   - 若优化停滞，则用当前高分样本动态微调模型；
   - 形成一个结合 遗传算法、拒绝采样、提示优化 和 在线微调 的分子优化循环。

## 方法框架

### 1. 训练语料构建

论文从 **PubChem** dumps 构建 SQL 数据库，包含：

- 分子；
- 相似分子对；
- 实验性质；
- bioassays；
- PubChem CID；
- 同义名；
- 计算得到的分子性质。

使用 **rdkit** 计算若干分子性质，包括：

- **SAS**：synthesizability score，合成可及性分数；
- **QED**：quantitatively estimated drug-likeness，类药性；
- **MW / WEIGHT**：分子量；
- **TPSA**：total polar surface area，总极性表面积；
- **CLogP**：分配系数；
- 氢键供体/受体数量；
- 环数量等结构特征。

数据处理细节：

- 所有 SMILES 使用 **rdkit** 标准化；
- 数据截止日期为 2023-01-26；
- 无法被 rdkit `MolFromSmiles` 解析的分子被丢弃；
- 使用 PubChem related molecule data 中 Tanimoto similarity ≥ 0.8 的相似分子对；
- 从约 200B 对中采样 4B 对；
- 使用 **ECFC4 fingerprint** 重新计算相似性。

### 2. JSONL 语料格式

每个分子被表示为一个 JSON 对象，并通过标签模板转为文本。示例格式如下：

```text
[WEIGHT]180.16[/WEIGHT]
[TPSA]63.60[/TPSA]
[CLOGP]1.31[/CLOGP]
[START_SMILES]CC(=O)OC1=CC=CC=C1C(=O)O[END_SMILES]
[SAS]1.58[/SAS]
[QED]0.92[/QED]
[SIMILAR]O=C(Oc1ccccc1C(=O)O)c1ccccc1O 0.59[/SIMILAR]
[PROPERTY]Vapor Pressure 2.52X10-5 mm Hg at 25 °C (calc)[/PROPERTY]
```

这种模板允许模型学习：

- 从 SMILES 预测性质；
- 从性质条件生成 SMILES；
- 根据相似分子生成新分子；
- 利用自然语言性质或实验性质进行推理。

为增强模型泛化能力，作者随机打乱性质顺序，并随机改变主分子在序列中的位置。

### 3. 模型训练

模型包括：

| 模型 | 参数规模 | 基础模型来源 |
|---|---:|---|
| **Chemlactica-125M** | 125M | Galactica 系列 |
| **Chemlactica-1.3B** | 1.3B | Galactica 系列 |
| **Chemma-2B** | 2B | Gemma 系列 |

训练方法：

- 目标：causal language modeling；
- 损失：cross-entropy loss；
- 优化器：Adam；
- 上下文长度：2048；
- 使用 PyTorch FSDP 和 Flash Attention；
- **Chemma-2B** 使用 bfloat16；
- **Chemlactica** 使用 dropout，Chemma 不使用 dropout；
- 对 tokenizer 添加化学专用特殊 token，如 `[START_SMILES]`、`[END_SMILES]` 以及各类属性标签。

### 4. 分子优化框架

优化算法维护一个分子池 `Pool`，每轮执行：

1. 从当前高分池中随机选择若干分子；
2. 构造包含相似性和目标性质的 prompt；
3. 用语言模型生成新分子；
4. 调用 oracle 评价；
5. 更新高分分子池；
6. 若若干轮没有提升，则用当前高分分子对语言模型进行微调。

## 算法流程

### Algorithm 1：molecules2prompt

该函数根据输入分子构造两类 prompt：

1. **生成 prompt**
   - 当目标分子 $m$ 为空时；
   - 随机采样相似性值；
   - 采样期望 oracle 分数；
   - 输出以 `[START_SMILES]` 结尾的 prompt，要求模型补全分子。

2. **训练样本**
   - 当目标分子 $m$ 已知时；
   - 计算 prompt 中分子与目标分子的真实相似度；
   - 使用真实 oracle score；
   - 输出包含目标 SMILES 的完整训练样本。

prompt 基本形式为：

```text
[SIMILAR]m1_smiles sim1[/SIMILAR]
...
[SIMILAR]mS_smiles simS[/SIMILAR]
[PROPERTY]oracle_score[/PROPERTY]
[START_SMILES]
```

如果用于训练，则后面接：

```text
target_smiles[END_SMILES]
```

### Algorithm 2：molecular_optimization

输入参数：

- $P$：分子池大小；
- $S$：prompt 中相似分子数量；
- $N$：每轮生成分子数；
- $K$：停滞多少轮后触发微调。

流程：

1. 初始化空的 `Pool`；
2. 重复直到满足停止条件：
   1. 从 `Pool` 中随机选择 $S$ 个分子；
   2. 用 `molecules2prompt` 构造 $N$ 个 prompt；
   3. 用语言模型生成 $N$ 个新的唯一分子；
   4. 用 oracle 评价新分子；
   5. 将新分子加入池中，只保留 top-$P$；
   6. 如果最优分子连续 $K$ 轮没有提升：
      - 用池中分子及其生成来源构造训练样本；
      - 微调语言模型；
3. 输出高分分子。

### 与传统遗传算法的关系

传统 遗传算法 通常依赖：

- mutation；
- crossover；
- selection。

本文将 mutation/crossover 替换为语言模型条件生成。也就是说，语言模型根据若干高分父代分子的 SMILES 和相似度要求，生成可能相似但性质更优的新分子。

## 实验设置

### 1. 计算性质预测与条件生成

评估任务包括：

- **Property Prediction**
  - 输入：
    ```text
    [START_SMILES]Mi[END_SMILES][QED]
    ```
  - 模型预测性质值；
  - 用 RMSE 评估。

- **Conditional Generation**
  - 输入：
    ```text
    [QED]vi[/QED][START_SMILES]
    ```
  - 模型生成 SMILES；
  - 用 rdkit 计算生成分子的真实性质；
  - 与目标值 $v_i$ 比较 RMSE。

评估性质包括：

- QED；
- Similarity；
- SAS；
- CLogP；
- TPSA；
- WEIGHT。

生成时使用的技术包括：

- **Chain-of-Thought (CoT)**：省略初始 `[START_SMILES]`，允许模型先生成更多属性；
- repetition penalty；
- undesired token suppression，确保模型最终生成 `[START_SMILES]`。

### 2. Practical Molecular Optimization Benchmark

使用 **Practical Molecular Optimization (PMO)** benchmark，包含 23 个分子优化问题。

评价指标：

- oracle 调用上限：10000；
- 指标：Top-10 average property value 随 oracle calls 的 AUC；
- 每 100 次 oracle call 计算一次；
- 最终归一化到 [0, 1]；
- 报告 5 个随机种子的平均值和标准差。

比较方法包括：

- **REINVENT**
- **Augmented memory**
- **Genetic-guided GFlowNets**
- **Chemlactica-125M**
- **Chemlactica-1.3B**
- **Chemma-2B**

### 3. Multi-property Optimization with Docking

该实验来自 **REINVENT** 相关 docking benchmark，用于模拟实际药物发现场景。

目标蛋白包括：

- **DRD2**
- **MK2-kinase**
- **acetylcholinesterase / AChE**

目标：

- 优化 docking score，即最小化 docking energy；
- 同时约束 QED；
- 分子量限制为 500 Da。

指标：

- **oracle burden**：生成达到阈值的 $N$ 个唯一分子所需 oracle 调用数；
- **generative yield**：固定 oracle 调用预算下，达到阈值的唯一分子数量。

oracle budget：

- 最大 5000 次 oracle calls。

比较方法包括：

- **REINVENT baseline**
- **Beam Structure 15**
- **Chemlactica-125M**
- **Chemlactica-1.3B**
- **Chemma-2B**

### 4. QED Maximization with Similarity Constrained Molecular Design

任务目标：

给定一个 lead molecule $M$，生成新分子 $M'$，满足：

$$
sim(M', M) \geq 0.4
$$

且：

$$
qed(M') \geq 0.9
$$

设置：

- 输入 800 个 QED 在 [0.7, 0.8] 的分子；
- 评价优化成功率；
- 本文使用最多 10000 次 QED evaluations；
- baseline 使用最多 50000 次 QED evaluations。

比较方法：

- **QMO**
- **RetMol**
- **Chemlactica-125M**

### 5. MoleculeNet 和 ADMET 性质预测

附录中还评估了模型在性质预测任务上的监督微调能力。

数据集/任务：

- **MoleculeNet**
  - ESOL
  - FreeSolv
  - Lipophilicity
- **ADMET benchmark**
  - HLM
  - MDR1-MDCK ER
  - Solubility
  - RLM
  - hPPB
  - rPPB

微调格式：

```text
[START_SMILES]msmiles[END_SMILES][PROPERTY]<VALUE>[/PROPERTY]
```

训练时只对 `[PROPERTY]` 后的生成响应计算损失。

## 主要结果

### 1. PMO benchmark 结果

在 PMO 23 个任务总和指标上：

| 方法 | PMO sum Top-10 AUC |
|---|---:|
| REINVENT | 14.196 |
| Augmented memory | 15.002 |
| Genetic-guided GFlowNets | 16.213 |
| Chemlactica-125M | 17.170 ± 0.424 |
| Chemlactica-1.3B | 17.284 ± 0.284 |
| Chemma-2B | 17.534 ± 0.214 |

论文称相较此前最好方法 **Genetic-guided GFlowNets**，平均提升约 8%。

部分任务结果：

| 任务 | REINVENT | GG GFlowNets | Chemlactica-125M | Chemlactica-1.3B | Chemma-2B |
|---|---:|---:|---:|---:|---:|
| jnk3 | 0.783 | 0.764 | 0.881 | 0.866 | 0.891 |
| median1 | 0.356 | 0.379 | 0.359 | 0.382 | 0.382 |
| scaffold_hop | 0.560 | 0.615 | 0.626 | 0.673 | 0.669 |
| sitagliptin_mpo | 0.021 | 0.634 | 0.649 | 0.586 | 0.613 |
| sum of 23 | 14.196 | 16.213 | 17.170 | 17.284 | 17.534 |

观察：

- 最小的 **Chemlactica-125M** 已经超过此前 SOTA；
- 增大模型规模通常进一步提升 PMO 总分；
- 没有任何方法在全部任务上统一最优；
- `valsartan_smarts` 上多个方法结果为 0，论文解释为 oracle 中存在常为 0 的二元乘子，导致缺乏有效监督信号。

### 2. Docking 多性质优化结果

在 docking benchmark 中：

- **Chemma-2B** 在 generative yield 指标上通常表现最好；
- **Chemlactica-125M** 在 oracle burden 指标上表现很强；
- **Chemlactica-1.3B** 在部分 DRD2 yield 上表现更好。

论文的解释是：

- 较小模型可能更擅长早期探索；
- 较大模型可能更擅长利用 reward space；
- 模型规模在 exploration/exploitation 平衡中起重要作用。

示例结果：

Generative Yield 0.8：

| Target | REINVENT | Beam Structure 15 | Chemlactica-125M | Chemlactica-1.3B | Chemma-2B |
|---|---:|---:|---:|---:|---:|
| DRD2 | 102 ± 6 | 1780 ± 439 | 2827 ± 510 | 2621 ± 614 | 2985 ± 194 |
| MK2 | 2 ± 0 | 987 ± 211 | 2569 ± 1156 | 2216 ± 522 | 1058 ± 465 |
| AChE | 147 ± 11 | 2059 ± 327 | 3246 ± 168 | 3652 ± 349 | 3096 ± 372 |

Oracle burden 0.8 (100)，越低越好：

| Target | REINVENT | Beam Structure 15 | Chemlactica-125M | Chemlactica-1.3B | Chemma-2B |
|---|---:|---:|---:|---:|---:|
| DRD2 | 4595 ± 0 | 1120 ± 25 | 364 ± 119 | 430 ± 250 | 518 ± 41 |
| MK2 | Failed | 2189 ± 181 | 865 ± 533 | 486 ± 346 | 934 ± 918 |
| AChE | 3931 ± 286 | 1110 ± 265 | 497 ± 58 | 333 ± 131 | 433 ± 143 |

### 3. QED + 相似性约束优化结果

| 方法 | Success Rate |
|---|---:|
| QMO | 92.8% |
| RetMol | 94.5% |
| Chemlactica-125M | 99.0% |

说明：

- 本文只评估了 **Chemlactica-125M**；
- 成功率接近满分；
- 且最多 QED evaluations 为 10000，比 baseline 的 50000 更少。

### 4. 性质预测结果

在 MoleculeNet 回归任务中：

| 方法 | ESOL RMSE ↓ | FreeSolv RMSE ↓ | Lipophilicity RMSE ↓ | Avg ↓ |
|---|---:|---:|---:|---:|
| ChemFormer | 0.633 | 1.230 | 0.598 | 0.820 |
| MoLFormer-XL | 0.279 | 0.231 | 0.529 | 0.346 |
| BARTSmiles | 0.308 | 0.338 | 0.540 | 0.395 |
| Chemlactica-125M | 0.270 ± 0.011 | 0.306 ± 0.011 | 0.533 ± 0.009 | 0.369 |
| Chemlactica-1.3B | 0.281 ± 0.005 | 0.356 ± 0.009 | 0.557 ± 0.021 | 0.403 |
| Chemma-2B | 0.298 ± 0.014 | 0.359 ± 0.040 | 0.563 ± 0.004 | 0.406 |

结论：

- **Chemlactica-125M** 在 ESOL 上表现很好；
- 整体上接近 **BARTSmiles**，但不全面超过 **MoLFormer-XL**；
- 模型可以用少量样本快速适配新性质预测任务。

### 5. 附加性质 prompt 的影响

论文在附录中测试了在优化 prompt 中加入任务相关已知性质，例如相似目标、CLogP、TPSA 等。

结果显示：

| 模型 | 无附加性质 sum | 加附加性质 sum |
|---|---:|---:|
| Chemlactica-125M | 2.515 | 2.920 |
| Chemlactica-1.3B | 2.506 | 2.824 |
| Chemma-2B | 2.555 | 2.887 |

说明模型能利用预训练中学到的属性知识。但作者指出，这种方式可能导致与未使用该信息的方法比较不公平，因此主实验未使用这些额外 oracle 相关信息。

## 创新点

1. **构建了大规模带属性的小分子语言模型语料**
   - 相比仅包含 SMILES 的语料，本文语料包含计算性质、实验性质、相似分子关系等；
   - 覆盖超过 110M 分子；
   - 使用约 40B token 进行继续预训练。

2. **提出 Chemlactica 与 Chemma 化学语言模型**
   - 包括 **Chemlactica-125M**、**Chemlactica-1.3B**、**Chemma-2B**；
   - 能进行性质预测、条件生成、相似分子生成和分子优化。

3. **提出结合 LLM 与群体搜索的分子优化算法**
   - 用语言模型生成替代传统遗传算法的 mutation/crossover；
   - 将高分样本池作为 evolutionary memory；
   - 用 oracle 反馈动态微调模型；
   - 将 遗传算法、拒绝采样 和 提示优化 统一在同一框架中。

4. **在 PMO 等分子优化基准上取得强结果**
   - PMO 总分超过 **Genetic-guided GFlowNets**；
   - docking 任务中显著优于 **REINVENT** 和 **Beam Structure 15**；
   - QED + similarity 约束任务中达到 99.0% 成功率。

5. **展示了语言模型对结构化化学 prompt 的利用能力**
   - 模型可以利用 `[QED]`、`[SIMILAR]`、`[PROPERTY]`、`[CLOGP]` 等标签完成多种任务；
   - 表明 LLM 不仅能生成 SMILES，还能在属性条件下进行受控生成。

## 局限性

论文附录明确列出若干局限：

1. **只支持 SMILES，不支持 3D 原子坐标**
   - 模型仅基于 SMILES 表示；
   - 对依赖 3D 构象的任务可靠性有限；
   - 对 docking、蛋白-配体相互作用等任务可能存在结构表示不足。

2. **对蛋白质等其他生物实体理解有限**
   - 模型主要学习小分子；
   - 对蛋白质、靶点、生物通路等知识掌握有限；
   - 限制了其在复杂生物化学和真实药物发现流程中的适用性。

3. **优化算法尚未充分调参**
   - 作者指出算法有效，但没有穷尽式调优；
   - 仍可能存在性能提升空间。

4. **未充分考虑真实药物设计中的实用约束**
   - 当前方法没有系统考虑 synthetic accessibility 之外的合成路线、毒性、ADMET、多靶点安全性等因素；
   - 可能限制其直接落地到工业药物发现流程。

5. **低精度数值可能影响分子优化**
   - 附录指出，在多轮生成与微调的优化循环中，bfloat16 等低精度可能导致生成质量退化；
   - 分子优化任务对数值精度比普通预训练或单次生成更敏感。

6. **存在潜在双重用途风险**
   - 分子生成和优化模型可能加速药物发现；
   - 但也可能降低有害化学/生物物质设计门槛；
   - 作者建议未来引入生物安全与伦理评估。

## 相关概念

- [[小分子优化]]
- [[分子优化]]
- [[多目标分子优化]]
- [[药物发现]]
- [[计算化学]]
- [[化学信息学]]
- [[大语言模型]]
- [[化学语言模型]]
- [[SMILES]]
- [[条件分子生成]]
- [[性质预测]]
- [[黑盒优化]]
- [[黑盒 oracle]]
- [[遗传算法]]
- [[拒绝采样]]
- [[提示优化]]
- [[在线微调]]
- [[强化学习]]
- [[GFlowNets]]
- [[分子图]]
- [[化学空间]]
- [[类药性]]
- [[QED]]
- [[SAS]]
- [[CLogP]]
- [[TPSA]]
- [[分子量]]
- [[Tanimoto similarity]]
- [[ECFC4 fingerprint]]
- [[PubChem]]
- [[rdkit]]
- [[MoleculeNet]]
- [[ADMET]]
- [[蛋白-配体 docking]]
- [[oracle burden]]
- [[generative yield]]
- [[Top-10 AUC]]

## 相关方法

- [[REINVENT]]
- [[Augmented memory]]
- [[Beam Enumeration]]
- [[Genetic-guided GFlowNets]]
- [[GFlowNets]]
- [[ChemFormer]]
- [[MolT5]]
- [[BARTSmiles]]
- [[MoLFormer-XL]]
- [[GROVER]]
- [[MolCLR]]
- [[iMolCLR]]
- [[QMO]]
- [[RetMol]]
- [[Graph-based genetic algorithm]]
- [[Monte Carlo Tree Search]]
- [[Variational Autoencoder]]
- [[Junction Tree VAE]]
- [[Prompt tuning]]
- [[EvoPrompt]]
- [[NEFTune]]
- [[Flash Attention]]
- [[FSDP]]

## 相关论文

- **Small Molecule Optimization with Large Language Models**  
  - citekey: `bedrosianSmallMoleculeOptimization`
  - authors: Menua Bedrosian, Philipp Guevorguian, Tigran Fahradyan  
  - 注：PDF 首页还列出 Gayane Chilingaryan、Hrant Khachatrian、Armen Aghajanyan 等作者；Zotero 元数据与 PDF 作者列表不完全一致，待补充原文/PDF 后确认最终作者列表。
  - year: 待补充原文/PDF 后确认
  - venue: Foundation Models for Science Workshop, 38th Conference on Neural Information Processing Systems (NeurIPS 2024)，根据 PDF 首页；Zotero 元数据为空，待补充原文/PDF 后确认。
  - DOI: 待补充原文/PDF 后确认

- **Sample efficiency matters: A benchmark for practical molecular optimization**  
  - Gao et al., 2022  
  - 提出 **Practical Molecular Optimization (PMO)** benchmark。

- **REINVENT 2.0: an AI tool for de novo drug design**  
  - Blaschke et al., 2020  
  - docking case studies 的相关基准来源之一。

- **Molecular de-novo design through deep reinforcement learning**  
  - Olivecrona et al., 2017  
  - **REINVENT** 方法。

- **Augmented memory: Capitalizing on experience replay to accelerate de novo molecular design**  
  - Guo and Schwaller, 2023a。

- **Beam Enumeration: Probabilistic explainability for sample efficient self-conditioned molecular design**  
  - Guo and Schwaller, 2023b。

- **Genetic-guided GFlowNets: Advancing in practical molecular optimization benchmark**  
  - Kim et al., 2024。

- **ChemFormer: a pre-trained transformer for computational chemistry**  
  - Irwin et al., 2022。

- **Translation between molecules and natural language / MolT5**  
  - Edwards et al., 2022。

- **BARTSmiles: Generative masked language models for molecular representations**  
  - Chilingaryan et al., 2024。

- **Retrieval-based controllable molecule generation / RetMol**  
  - Wang et al., 2023。

- **MoleculeNet: a benchmark for molecular machine learning**  
  - Wu et al., 2018。

- **Galactica: A large language model for science**  
  - Taylor et al., 2022。

- **Gemma: Open models based on Gemini research and technology**  
  - Team et al., 2024。

## 源文件

- Zotero citekey: `bedrosianSmallMoleculeOptimization`
- 论文标题: **Small Molecule Optimization with Large Language Models**
- Zotero collections: 多目标分子优化
- PDF 文本摘取范围: 第 1–27 页
- 年份: Zotero 元数据为空；PDF 提到 NeurIPS 2024 workshop，待补充原文/PDF 后确认
- venue: Zotero 元数据为空；PDF 首页显示 Foundation Models for Science Workshop, 38th Conference on Neural Information Processing Systems (NeurIPS 2024)，待补充原文/PDF 后确认
- DOI: 待补充原文/PDF 后确认

## 图表摘录

![[raw/zotero/images/多目标分子优化/基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization/page-001.png]]

## Zotero 原始摘要

The rise of large language models has created an opportunity for practical applications of machine learning algorithms in different areas like life science. In this work, we take advantage of the immense learning abilities of large language models and combine that with a training corpus of 110M small molecules to train a model that can predict molecular properties and more. More specifically, we take three publicly available large language models of 125M, 1B and 2B parameter sizes and train them on roughly 40B tokens comprising of molecules in SMILES format and their respective properties. These models demonstrate strong performance in generating molecules with specified properties and predicting new molecular characteristics from limited samples. We introduce a novel optimization algorithm that leverages our language models to optimize molecules for arbitrary properties given limited access to a black box oracle. Our approach combines ideas from genetic algorithms, rejection sampling, and prompt optimization. It achieves stateof-the-art performance on multiple molecular optimization benchmarks, including an 8% improvement on Practical Molecular Optimization compared to previous methods. We publicly release the language models and the dataset.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的关键价值不只是“用 LLM 生成 SMILES”，而是把 分子优化 重构成一种结构化语言建模问题。作者通过大量属性标签把分子、性质、相似关系和 oracle 分数都转化为文本序列，使语言模型可以在同一接口下完成性质预测、条件生成和优化搜索。

我认为最重要的设计是：

1. **用 `[SIMILAR]` 标签把遗传算法的父代信息显式写入 prompt**
   - 传统遗传算法需要手工定义 mutation/crossover；
   - 这里让 LLM 学习“如何基于相似分子生成合理新分子”；
   - 这相当于数据驱动的、语义更强的变异算子。

2. **用 `[PROPERTY]oracle_score[/PROPERTY]` 把 oracle 反馈转成可微调数据**
   - 黑盒 oracle 本身不可微；
   - 但 oracle 评价后的样本可以转成语言模型训练样本；
   - 这类似把优化历史蒸馏进生成模型。

3. **动态微调使优化算法具备任务适应能力**
   - 初始模型来自大规模 PubChem 分布；
   - 优化中逐步吸收当前任务的高分分子；
   - 因此它既利用预训练先验，又利用在线反馈适应特定目标。

4. **模型规模与探索/利用的关系值得注意**
   - docking 实验显示小模型在 oracle burden 上可能更好，大模型在 generative yield 上更强；
   - 这说明在分子优化中，模型越大不一定在所有阶段都更优；
   - 实际应用可能需要根据 oracle 成本和探索需求选择模型规模。

5. **公平比较问题需要谨慎**
   - 模型预训练中已经学过 QED、CLogP、TPSA 等性质；
   - 如果 PMO oracle 内部包含这些性质，LLM 可能通过 prompt 直接利用部分 oracle 知识；
   - 作者主实验避免显式加入这些信息，但附录显示加入后性能大幅提升；
   - 这提示未来 benchmark 需要区分“纯黑盒优化能力”和“利用预训练化学知识的能力”。

总体看，这篇论文适合作为 大语言模型用于分子设计 和 多目标分子优化 的重要参考。它证明了结构化 prompt + 化学预训练 + 在线优化可以在有限 oracle 预算下取得强性能。

## 后续问题

1. **模型是否真正学习了化学规律，还是主要记忆了 PubChem 分布？**
   - 论文提到 conditional generation 中部分生成分子来自 PubChem；
   - 需要进一步分析 novelty、scaffold novelty 和真实可合成性。

2. **SMILES-only 表示是否足够支持 docking 相关优化？**
   - docking 依赖 3D 构象；
   - 当前模型不直接建模 3D 坐标；
   - 后续是否可以结合 3D 分子表示 或 蛋白-配体相互作用建模？

3. **动态微调是否会导致模式坍缩？**
   - 高分池反复用于微调，可能降低分子多样性；
   - 需要检查 diversity、scaffold diversity 和重复率。

4. **oracle feedback 的使用是否可以更高效？**
   - 当前是停滞后微调；
   - 是否可以结合 贝叶斯优化、主动学习 或 强化学习 改进样本效率？

5. **如何扩展到真正的多目标优化？**
   - 本文虽然涉及多性质任务，但主要通过单一 reward/oracle 聚合；
   - 可进一步研究 Pareto front、约束优化和 多目标分子优化。

6. **如何处理合成可行性与真实药物开发约束？**
   - 当前未系统考虑合成路线、毒性、代谢稳定性、选择性等；
   - 需要与 retrosynthesis、ADMET 和实验反馈结合。

7. **安全风险如何评估？**
   - 分子优化模型可能被用于设计有害化合物；
   - 需要建立面向化学/生物安全的 red-teaming benchmark。

8. **Chemlactica 与 Chemma 的公开模型和数据集地址是什么？**
   - 摘要称公开释放语言模型和数据集；
   - 当前摘取文本中未包含链接；
   - 待补充原文/PDF 后确认。
