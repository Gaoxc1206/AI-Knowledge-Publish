---
type: paper
citekey: "xiaMoleculeOptimizationMultiobjective"
zotero_key: "WVGSF6PD"
title: "面向隐式化学空间的多目标进化分子优化方法"
chinese_title: "面向隐式化学空间的多目标进化分子优化方法"
authors: "Xin Xia, Yansen Su, Chunhou Zheng, Xiangxiang Zeng"
year: ""
venue: ""
doi: ""
zotero_collections:
  - "多目标分子优化"
source_pdf: "raw/zotero/pdfs/多目标分子优化/面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective.pdf"
status: imported
reading_status: inbox
tags:
  - paper
aliases:
  - "面向隐式化学空间的多目标进化分子优化方法"
  - "Molecule optimization via multi-objective evolutionary in implicit chemical space"
original_title: "Molecule optimization via multi-objective evolutionary in implicit chemical space"
---
## 一句话总结

论文 **Molecule optimization via multi-objective evolutionary in implicit chemical space** 提出 **MOMO**，将自监督分子编码器学习到的连续隐式化学空间与基于 Pareto 的多目标进化算法结合，用于同时优化分子性质与相似性，在多个多目标分子优化任务上优于若干深度学习、强化学习和进化算法基线。

## 研究问题

本文关注分子优化中的多目标优化问题：给定一个先导分子，希望生成与原分子保持较高相似性的候选分子，同时提升多个目标性质。

具体目标包括：

- 保持与先导分子的结构相似性，即 **Similarity**；
- 提升药物相似性 **QED**；
- 提升 **Penalized-logP / PlogP**；
- 提升与靶点相关的生物活性预测指标 **Dopamine Receptor D2 / DRD2**。

论文认为，真实药物发现通常需要同时满足活性、类药性、安全性、ADME 等多个要求，因此分子优化天然是一个多目标优化问题，而不是简单的单目标优化问题。

## 背景与动机

传统分子优化方法包括虚拟筛选和实验试错，成本高、耗时长。由于化学空间规模巨大，文中引用估计称药物样化学空间可能在 $10^{30}$ 到 $10^{60}$ 之间，人工探索非常有限。

已有机器学习方法可以加速分子设计与优化，包括：

- 变分自编码器，如 **VAE**、**JTVAE**；
- 循环神经网络方法；
- 生成对抗网络方法；
- 图神经网络方法；
- 强化学习方法；
- 遗传算法和其他进化算法。

但这些方法存在若干问题：

1. 很多分子生成模型更关注性质提升，不能很好保持与原分子的相似性。
2. 深度学习方法通常需要大量带标签数据，而分子性质标签获取困难。
3. 分子性质往往不可微，难以直接作为神经网络训练目标。
4. 强化学习和传统进化算法可以直接使用非可微性质作为奖励或目标，但在离散化学空间中逐步修改分子效率较低。
5. 许多方法将多个目标通过加权求和或乘积合并成单目标，这会带来权重难以设定、只能得到某个偏好下单个解、难以覆盖非凸 Pareto 前沿、不同目标量纲不一致导致鲁棒性差等问题。

因此，本文动机是：构建一个既能学习化学先验、又能直接处理多个冲突目标的多目标分子优化框架。

## 核心思想

**MOMO** 的核心思想是将表示学习与多目标进化搜索解耦并结合：

1. 使用预训练的 encoder-decoder 模型从大量无标签分子中学习化学知识，构建连续的隐式化学空间；
2. 将先导分子编码为隐空间向量；
3. 在连续隐空间中执行进化操作，包括选择、交叉和变异；
4. 将隐向量解码回分子空间；
5. 在分子空间中计算多个目标性质和相似性；
6. 使用基于 Pareto 支配关系的多目标进化策略选择下一代种群；
7. 最终返回 Pareto front 上的一组候选优化分子。

该方法避免了在离散分子图或 SMILES 空间中手工设计复杂化学变异规则，同时不需要大量带标签数据来训练性质预测导向模型。

## 方法框架

MOMO 框架包括以下模块：

### 1. 隐式化学空间构建

论文使用 encoder-decoder 模型学习分子的连续表示：

- encoder：将离散分子 $x$ 映射到隐空间向量 $z = E(x)$；
- decoder：将隐向量 $z$ 解码为分子 $x' = D(z)$。

文中指出 MOMO 可以兼容多种分子表示，包括：

- 字符串表示，如 **SMILES**、**SELFIES**；
- 图表示，如分子图。

实验中使用预训练的 **cddd** 模型构建隐式化学空间。

相关概念：

- 隐式化学空间
- 分子表示学习
- 连续分子表示
- 自监督学习
- encoder-decoder
- cddd

### 2. 隐空间进化搜索

每个个体是一个分子隐向量，而不是显式分子结构。MOMO 在隐空间中进行：

- selection；
- crossover；
- mutation。

这样可以在连续空间中进行更平滑的搜索，减少直接在离散化学空间中修改分子带来的化学有效性约束问题。

### 3. 分子空间性质评估

虽然搜索发生在隐空间，但性质和相似性评估在解码后的分子空间中完成。文中使用或提到的工具包括：

- **RDKit**；
- **pyTDC**；
- **ADMETlab**。

目标函数包括：

- **QED**；
- **PlogP**；
- **DRD2**；
- **Tanimoto Similarity**。

### 4. Pareto-based 多目标选择

MOMO 不将多个目标加权合并为单目标，而是使用：

- Pareto dominance
- non-domination rank
- reference point mechanism
- 动态接受概率

来维护多目标优化中的收敛性和多样性。

## 算法流程

MOMO 的整体流程如下：

1. 在大规模公开分子数据库上预训练 encoder-decoder 模型，学习化学知识并构建隐式化学空间。
2. 输入先导分子，通过 encoder 得到其隐向量。
3. 第一代种群通过对先导分子的隐向量加入 Gaussian noise 生成。
4. 若不是第一代，则将上一代保留分子重新编码为隐向量。
5. 对种群中的隐向量执行进化操作：
   - binary tournament selection；
   - blending linear crossover；
   - mutation。
6. 合并父代和子代种群。
7. 将隐向量通过 decoder 解码为分子。
8. 丢弃无效分子。
9. 使用性质评估器计算分子目标值，例如 QED、PlogP、DRD2 和 Similarity。
10. 根据多个目标值进行非支配排序。
11. 使用 reference point mechanism 进一步维持种群多样性。
12. 使用动态接受概率决定高质量分子进入下一代的概率。
13. 重复迭代若干代。
14. 返回最后一代种群中 Pareto front 上的分子作为优化结果。

动态接受概率的作用是：

- 进化早期允许较低目标值个体进入下一代，以增强多样性；
- 进化后期更偏向接受高质量分子，以增强收敛性。

## 实验设置

### 优化任务

论文设计了 4 个多目标分子优化任务。

#### Task 1: QED and Similarity

目标：

- **QED ≥ 0.9**
- **Similarity ≥ 0.4**

数据集：

- 800 个来自 **ZINC test** 的分子；
- 分子初始 **QED ∈ [0.7, 0.8]**；
- 数据集来源于 Jin et al.

评价指标：

- **Success Rate / SR**。

#### Task 2: PlogP and Similarity

目标：

- 最大化 **PlogP_imp**；
- 同时满足 **Similarity ≥ δ**；
- δ 分别设置为 **0.4** 和 **0.6**。

数据集：

- 800 个低 **PlogP** 分子；
- 来源于 Jin et al.

评价指标：

- **PlogP_imp**；
- Similarity 约束下的平均性质提升。

#### Task 3: QED, PlogP and Similarity

目标：

- **QED ≥ 0.85**
- **PlogP_imp ≥ 3**
- **Similarity ≥ 0.3**

数据集：

- 从 Task 1 和 Task 2 数据集合并后筛选；
- 共 500 个唯一分子；
- 条件为 **QED ∈ [0.6, 0.8]** 且 **PlogP < -2**。

评价指标：

- **Success Rate / SR**；
- 优化分子的平均 **QED**；
- 平均 **PlogP_imp**；
- 平均 **Similarity**。

#### Task 4: QED, DRD2 and Similarity

目标：

- **QED ≥ 0.8**
- **DRD2 ≥ 0.4**
- **Similarity ≥ 0.3**

数据集：

- 来自已发表文章的 780 个测试分子；
- 条件为 **DRD2 < 0.05** 且 **QED ∈ [0.7, 0.8]**。

评价指标：

- **Success Rate / SR**；
- 平均 **QED**；
- 平均 **DRD2**；
- 平均 **Similarity**。

### Baselines

Task 1 和 Task 2 中比较的方法包括：

- **JTVAE**
- **VSeqtoSeq**
- **VJTNN**
- **QMO**
- **GCPN**
- **GA**

Task 3 和 Task 4 中比较的方法包括：

- **GA**
- **MSO**
- **QMO**

Task 4 额外比较：

- **IPCA**

文中说明，在 Task 3 和 Task 4 中，一些方法在多性质同时优化任务中表现较差，或难以针对不同任务重新训练，因此重新选择了基线。

### MOMO 参数设置

文中给出参数符号存在 PDF 文本抽取缺失，具体变量名部分无法完全还原，以下仅记录可确认数值：

- Task 1：
  - 种群规模疑似为 100；
  - 迭代次数疑似为 100；
  - 其他参数包括 0.25、1、0.5；
  - 使用 10 次 restart，报告最佳结果。
  - 参数含义待补充原文/PDF 后确认。

- Task 2：
  - 种群规模疑似为 100；
  - 迭代次数疑似为 200；
  - 其他参数包括 0.25、1、0.5；
  - 参数含义待补充原文/PDF 后确认。

- Task 3 和 Task 4：
  - 不使用 restart，以保证公平并考虑计算成本；
  - 种群规模疑似为 100；
  - 迭代次数疑似为 200；
  - 其他参数包括 0.25、1、0.5；
  - 参数含义待补充原文/PDF 后确认。

### Baseline 参数

论文中可确认的部分设置：

- **GA**：
  - Task 1 中 population size = 100，iterations = 50；
  - Task 3/4 中 population size = 500，iterations = 100。
- **MSO**：
  - particles = 200，iterations = 200。
- **QMO**：
  - sample size = 200，runs = 100。
- **IPCA**：
  - Task 4 结果来自原论文。

## 主要结果

### Task 1: QED and Similarity

结果显示：

- **QMO** 和 **MOMO** 的 SR 都超过 90%；
- **MOMO** 比 **QMO** 高 **1.91%**；
- MOMO 生成的成功优化分子在 QED 和 Similarity 分布上更丰富，并且能获得更高性质和相似性的分子。

具体 SR 数值除相对提升外，PDF 摘取中未完整给出，待补充原文/PDF 后确认。

### Task 2: PlogP and Similarity

结果显示：

- 当 **δ = 0.4** 时，MOMO 的平均 **PlogP_imp = 9.61**；
- MOMO 至少比所有基线高 **1.91**；
- MOMO 的标准差低于 QMO，说明更稳定；
- 当 **δ = 0.6** 时，MOMO 仍优于基线，说明对不同相似性阈值较鲁棒；
- 可视化显示 MOMO 能在保持较高 Similarity 的同时获得更高 PlogP_imp。

论文提到 QMO 有一个 PlogP_imp 更高的异常优化分子，但该分子主要由大量碳组成、结构多样性不足，因此作者认为其意义有限。

### Task 3: QED, PlogP and Similarity

结果显示：

- MOMO 的 **SR = 82.4%**；
- 至少比基线高 **32.1%**；
- MOMO 在平均 **QED**、平均 **PlogP_imp** 和平均 **Similarity** 三个目标上均优于所有基线；
- 三维性质分布显示 MOMO 优化分子覆盖 QMO 的上方区域，并有更多分子接近三个目标同时最大化的理想区域。

这说明 MOMO 在三目标同时优化时优势明显。

### Task 4: QED, DRD2 and Similarity

结果显示：

- MOMO 的 **SR = 75.93%**；
- 至少比基线高 **29.9%**；
- MOMO 在平均 **QED**、平均 **DRD2** 和平均 **Similarity** 上均优于基线；
- 可视化显示 QMO 在优化性质时可能牺牲相似性，而 MOMO 能保持较高相似性的同时提高目标性质。

### 可视化分析

论文通过两个案例展示 MOMO 的搜索能力：

1. **Pareto front 搜索过程可视化**
   - 随着进化代数增加，MOMO 在多个方向搜索分子；
   - 最终能够找到偏高 Similarity、偏高 QED 或二者兼顾的不同分子；
   - 表明 MOMO 能产生不同偏好下的一组优化解。

2. **分子编辑轨迹可视化**
   - 展示从先导分子到不同后代分子的演化路径；
   - 不同路径分别对应：
     - 高 QED 但较低相似性；
     - 高 QED 且高相似性；
     - 低 QED 但非常接近先导分子；
   - 说明 MOMO 可以沿不同优化方向逐步探索分子空间。

## 创新点

1. **将分子优化明确建模为多目标优化问题**

   本文避免简单使用加权求和将多个目标合并为单目标，而是使用 Pareto-based 方法直接处理多个冲突目标。

2. **在隐式化学空间中执行多目标进化**

   MOMO 不直接在离散 SMILES 或分子图上进行手工变异，而是在由 encoder-decoder 学习得到的连续隐空间中执行进化操作。

3. **结合自监督化学知识学习与进化搜索**

   预训练 codec 从大量无标签分子中学习化学知识，降低对带标签数据的依赖，并提高生成分子的有效性和搜索效率。

4. **使用 non-domination rank 与 reference point mechanism 维护 Pareto 搜索质量**

   该设计有助于同时考虑收敛性和多样性。

5. **设计动态接受概率**

   早期强调多样性，后期强调高目标值分子，有助于避免过早陷入局部最优。

6. **在三目标分子优化任务上表现突出**

   特别是在 QED、PlogP、Similarity 和 QED、DRD2、Similarity 这类三目标任务中，MOMO 明显优于基线。

## 局限性

论文作者明确指出以下局限：

1. **编码和解码过程耗时**

   MOMO 在优化过程中需要频繁将分子编码到隐空间、再从隐空间解码回分子空间，这带来较高计算成本。

2. **更多目标的优化尚未充分验证**

   实验主要是二目标和三目标任务。真实药物开发常常需要同时考虑更多目标，例如 4 个及以上目标。

3. **未来需要进一步考虑分布性和多样性**

   作者指出可以在分子进化中进一步考虑 distributivity 和 diversity，以提升优化性能。

4. **代码和数据可用性尚不明确**

   文中写到 datasets 和 code 将更新到作者 GitHub，但 PDF 摘取中没有给出具体链接。待补充原文/PDF 后确认。

5. **性质评估依赖外部评估器或预测器**

   例如 RDKit、pyTDC、ADMETlab 等。若性质预测器存在误差，优化结果可能受到影响。论文中未充分讨论预测误差对优化结果的影响，待补充原文/PDF 后确认。

## 相关概念

- [[分子优化]]
- [[多目标分子优化]]
- [[多目标优化]]
- [[多目标进化算法]]
- [[Pareto dominance]]
- [[Pareto front]]
- [[non-domination rank]]
- [[reference point mechanism]]
- [[隐式化学空间]]
- [[连续分子表示]]
- [[分子表示学习]]
- [[自监督学习]]
- [[encoder-decoder]]
- [[分子生成]]
- [[药物发现]]
- [[先导化合物优化]]
- [[QED]]
- [[PlogP]]
- [[Penalized-logP]]
- [[DRD2]]
- [[Tanimoto similarity]]
- [[Morgan fingerprint]]
- [[SMILES]]
- [[SELFIES]]
- [[ZINC]]
- [[RDKit]]
- [[pyTDC]]
- [[ADMETlab]]
- [[化学空间]]
- [[强化学习]]
- [[遗传算法]]
- [[变分自编码器]]
- [[图神经网络]]

## 相关方法

- [[MOMO]]
- [[JTVAE]]
- [[VSeqtoSeq]]
- [[VJTNN]]
- [[QMO]]
- [[GCPN]]
- [[GA]]
- [[MSO]]
- [[IPCA]]
- [[cddd]]
- [[NSGA-II]]
- [[NSGA-III]]
- [[binary tournament selection]]
- [[blending linear crossover]]
- [[Gaussian mutation]]
- [[Pareto-based evolutionary search]]
- [[latent space optimization]]
- [[分子隐空间优化]]
- [[多目标遗传算法]]
- [[图分子生成]]
- [[SMILES 分子生成]]
- [[强化学习分子优化]]

## 相关论文

以下为本文引用或实验中相关的重要工作，信息根据 PDF 摘取整理：

- **Junction tree variational autoencoder for molecular graph generation**  
  对应方法：**JTVAE**。用于分子图生成和分子优化，是本文 Task 1/2 的基线之一。

- **Learning multimodal graph-to-graph translation for molecule optimization**  
  对应方法：**VJTNN**。用于图到图的分子优化。

- **Optimizing molecules using efficient queries from property evaluations**  
  对应方法：**QMO**。本文多次将 MOMO 与 QMO 比较。

- **Graph convolutional policy network for goal-directed molecular graph generation**  
  对应方法：**GCPN**。强化学习分子图生成方法。

- **Augmenting genetic algorithms with deep neural networks for exploring the chemical space**  
  对应方法：**GA** 相关基线。将遗传算法与深度神经网络结合探索化学空间。

- **Efficient multi-objective molecular optimization in a continuous latent space**  
  对应方法：**MSO**。在连续隐空间中进行多目标分子优化。

- **Multi-Property Molecular Optimization using an Integrated Poly-Cycle Architecture**  
  对应方法：**IPCA**。用于多性质分子优化，本文 Task 4 中作为对比方法。

- **Learning continuous and data-driven molecular descriptors by translating equivalent chemical representations**  
  对应方法：**cddd**。本文使用的预训练分子编码表示模型来源。

- **A fast and elitist multiobjective genetic algorithm: NSGA-II**  
  相关概念：非支配排序、多目标遗传算法。

- **An evolutionary many-objective optimization algorithm using reference-point based nondominated sorting approach**  
  相关概念：reference-point based nondominated sorting，类似 **NSGA-III** 思路。

## 源文件

- citekey: `xiaMoleculeOptimizationMultiobjective`
- title: **Molecule optimization via multi-objective evolutionary in implicit chemical space**
- authors: Xin Xia, Yansen Su, Chunhou Zheng, Xiangxiang Zeng
- year: 待补充原文/PDF 后确认
- venue: 待补充原文/PDF 后确认
- DOI: 待补充原文/PDF 后确认
- collections: 多目标分子优化

## 图表摘录

![[raw/zotero/images/多目标分子优化/面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective/page-001.png]]

## Zotero 原始摘要

无。

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## Zotero 原始笔记

暂无 Zotero 子笔记。

## 我的理解

这篇论文的关键价值在于：它不是把多个分子性质粗暴压成一个分数，而是承认分子优化本身就是一个多目标优化问题。对于药物发现而言，这一点很重要，因为一个候选分子往往不能只看单一指标。例如，只提升 PlogP 或活性可能会破坏相似性、可合成性或类药性。

MOMO 的设计可以理解为两个层面的结合：

1. **用深度学习提供“化学可行的搜索空间”**  
   预训练 encoder-decoder 把离散分子映射到连续隐空间，使进化算法不必直接面对复杂的化学规则。

2. **用多目标进化算法提供“多偏好解集”**  
   Pareto-based 搜索一次可以得到一组不同权衡的候选分子，而不是只得到某个权重设定下的单个最优分子。

这使得 MOMO 特别适合药物优化场景，因为药物化学专家通常需要在多个候选之间根据经验进行选择，而不是只接受算法输出的唯一答案。

不过，MOMO 的实际应用仍依赖隐空间质量和解码效率。如果 encoder-decoder 解码慢、无效分子比例高，或者隐空间中相近向量并不总对应合理的分子修改，那么搜索效率会受影响。作者也承认编码/解码耗时是主要瓶颈。

从研究脉络看，MOMO 可以被放在以下交叉方向中：

- 多目标进化算法 × 分子优化
- 分子表示学习 × 遗传算法
- 隐空间优化 × 药物发现
- Pareto optimization × 先导化合物优化

## 后续问题

1. MOMO 使用的 **cddd** 预训练模型具体训练数据、隐空间维度和解码有效率是多少？待补充原文/PDF 后确认。
2. MOMO 在四目标及更多目标任务上是否仍能保持较好性能？
3. 动态接受概率中的参数具体如何影响收敛性和多样性？
4. 与 **NSGA-II**、**NSGA-III** 的标准实现相比，MOMO 的多目标选择机制具体差异是什么？
5. MOMO 是否适合加入可合成性 **SA**、毒性、溶解度、ADMET 等更实际的药物开发目标？
6. 如果使用更强的分子生成模型替代 **cddd**，例如图扩散模型或分子语言模型，性能是否会进一步提升？
7. MOMO 生成的高 PlogP 分子是否存在结构不合理或“刷指标”现象？论文提到 QMO 有类似问题，但 MOMO 是否完全避免仍需进一步验证。
8. 性质评估器若是预测模型而非实验数据，MOMO 是否会过拟合评估器偏差？
9. 代码和数据集是否已公开？PDF 摘取中只说明将更新到 GitHub，具体地址待补充原文/PDF 后确认。
10. MOMO 在真实 lead optimization 项目中如何与药物化学专家的人工筛选流程结合？
