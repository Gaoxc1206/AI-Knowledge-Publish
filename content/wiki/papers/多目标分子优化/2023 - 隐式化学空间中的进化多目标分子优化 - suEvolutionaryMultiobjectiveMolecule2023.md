---
type: paper
citekey: "suEvolutionaryMultiobjectiveMolecule2023"
zotero_key: "XDFQVXB6"
title: "隐式化学空间中的进化多目标分子优化"
chinese_title: "隐式化学空间中的进化多目标分子优化"
authors: "Yansen Su, Xin Xia, Chunhou Zheng, Yiping Liu, Qingwen Wu, Xiangxiang Zeng"
year: "2023"
venue: ""
doi: "10.21203/rs.3.rs-2798803/v1"
zotero_collections:
  - "多目标分子优化"
source_pdf: "raw/zotero/pdfs/多目标分子优化/2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023.pdf"
status: imported
reading_status: inbox
tags:
  - paper
aliases:
  - "隐式化学空间中的进化多目标分子优化"
  - "Evolutionary multi-objective molecule optimization in implicit chemical space"
original_title: "Evolutionary multi-objective molecule optimization in implicit chemical space"
---
## 一句话总结

本文提出 **[[MOMO]]**（[[Molecular evolutionary optimization|multi-objective molecule optimization framework]]），在由预训练[[encoder-decoder|编码器-解码器]]构建的连续[[隐式化学空间]]中执行进化搜索，并用基于 **[[Pareto dominance]]** 的多属性评价策略在分子序列层面选择候选分子，以同时优化多个分子性质和与先导分子的相似性。

## 研究问题

本文关注的是[[分子优化]]中的[[多目标优化|多目标优化问题]]：给定一个先导分子，如何高效搜索一组多样、新颖且高质量的优化分子，使其同时满足多个目标性质，例如：

- **[[QED]]**（[[Drug-likeness|drug likeness]]）
- **[[Penalized-logP]] / [[PlogP]]**
- **[[DRD2]]** 活性相关评分
- 与先导分子的 **[[Tanimoto similarity]]**

传统方法常将多个目标通过加权求和合并为单目标，或只优化单一性质并添加相似性约束。本文认为，这类做法难以充分探索多属性之间的权衡关系，也容易导致候选[[molecular diversity|分子多样性]]不足。

## 背景与动机

[[药物发现]]中的[[先导化合物优化]]通常需要同时改善多个分子性质，包括[[药物相似性|成药性]]、活性、[[ADME|药代动力学性质]]、[[Synthesizability|合成可行性]]以及与原始先导分子的结构相似性。传统实验试错和基于模拟的方法成本较高，近年来 AI 驱动的[[分子生成]]与优化方法被广泛研究。

已有 AI 分子优化方法大致包括两类：

1. **离散[[化学空间]]中的直接优化**
   - 分子表示为 **[[SMILES]]** 序列或[[分子图]]。
   - 常用方法包括[[强化学习]]、[[遗传算法]]、[[进化算法]]。
   - 问题是离散结构操作容易产生无效分子，尤其在 SMILES 或图结构上执行[[crossover|交叉]]、[[mutation|变异]]时，可能违反化学价键约束。

2. **[[连续隐空间]]中的生成式优化**
   - 使用[[深度生成模型]]将分子编码到连续 [[latent chemical space|latent space]]。
   - 在连续空间中执行向量操作，再解码为分子。
   - 优点是搜索更平滑，但模型训练依赖数据，且多目标优化仍常被转化为加权单目标问题。

本文的核心动机是：  
在[[多属性分子优化]]中，多个目标之间可能存在冲突，简单加权求和无法自然表达不同目标之间的权衡关系。因此需要引入[[Pareto 最优]]思想，搜索一组具有不同偏好的优化分子，而不是只返回一个由固定权重决定的最优分子。

## 核心思想

**MOMO** 的核心思想是将[[多目标进化算法]]与连续隐式化学空间结合：

- 使用预训练的 encoder-decoder 模型学习分子的连续表示，构建隐式化学空间。
- 在 latent vector 上执行进化操作，包括 selection、crossover、mutation。
- 将 latent vector 解码为分子序列后，在分子空间中计算多个目标性质。
- 使用基于 **Pareto dominance** 的多属性评价策略选择下一代种群。
- 最终返回最后一代种群中位于 **[[Pareto-front]]** 的分子作为优化结果。

这使 MOMO 能够同时优化多个分子性质，并得到一组具有不同目标权衡的候选分子。

## 方法框架

MOMO 主要包含两个部分：

1. **隐式化学空间构建**
   - 使用预训练 codec，即 encoder-decoder 架构。
   - encoder 将离散分子映射为 latent vector。
   - decoder 将 latent vector 解码为分子。
   - 本文实验中使用预训练 **[[cddd model]]** 构建隐式化学空间。

2. **基于 Pareto dominance 的分子评价与进化搜索**
   - 在 latent space 中对分子向量执行进化操作。
   - 在 molecular sequence level 解码后计算性质。
   - 用 non-domination rank、reference point mechanism 和动态 acceptance probability 更新种群。

整体流程可以理解为：

```text
先导分子
  ↓ encoder
latent vector
  ↓ [[Gaussian mutation|高斯扰动]]初始化种群
latent population
  ↓ selection / crossover / mutation
offspring latent vectors
  ↓ decoder
候选分子
  ↓ property evaluators
多目标性质评分
  ↓ Pareto dominance-based evaluation
下一代种群
  ↓ 多轮迭代
Pareto-front 分子集合
```

## 算法流程

根据论文描述，MOMO 的优化流程如下：

1. **预训练 encoder-decoder**
   - 在大规模公共分子数据库上预训练 encoder-decoder 模块。
   - 目标是构建连续的 implicit chemical space。

2. **编码先导分子**
   - 输入先导分子。
   - 通过 encoder 得到其 latent representation。

3. **初始化种群**
   - 第一代种群通过对先导分子的 latent vector 添加 Gaussian noise 得到。
   - 每个个体是一个 latent vector，对应一个潜在优化分子。

4. **执行进化操作**
   - 在 latent vector 上执行：
     - selection
     - crossover
     - mutation

5. **解码并评价分子**
   - 将父代和子代 latent vectors 合并。
   - 使用 decoder 解码为分子序列。
   - 使用 property evaluator 计算多个目标值，例如 QED、PlogP、DRD2、Similarity。

6. **基于 Pareto dominance 更新种群**
   - 使用 non-domination rank 对分子排序。
   - 使用 reference point mechanism 保持解的分布多样性。
   - 使用动态 acceptance probability 接受高质量分子进入下一代，同时避免过早陷入局部最优。

7. **迭代搜索**
   - 重复步骤 3–6。
   - 最后一代种群中位于 Pareto-front 的分子作为优化结果输出。

### 关键模块

#### 1. 隐式化学空间

MOMO 使用 encoder-decoder：

- encoder：将分子 $x$ 编码为 latent vector $z = E(x)$
- decoder：将 latent vector 解码为分子 $x' = D(z)$

本文指出 MOMO 不限于具体 codec 架构，可适配字符串或图结构分子表示；实验中使用 **cddd model**。

#### 2. 多目标优化形式

MOMO 将每个分子性质作为一个独立目标，而不是合并为单目标。

目标可包括：

- QED
- SA
- 靶点生物活性
- ADME 性质
- 与先导分子的 similarity

本文实验主要使用：

- **QED**
- **PlogP**
- **DRD2**
- **Tanimoto similarity**

#### 3. Tanimoto similarity

论文使用基于 **[[Morgan fingerprints]]** 的 Tanimoto similarity 计算优化分子与先导分子的相似性。

#### 4. Evolutionary operations

MOMO 在 latent vector 上定义进化操作：

- **Selection**：binary [[锦标赛选择|tournament selection]]
- **Crossover**：blending [[Blending linear crossover|linear crossover]] operator
- **Mutation**：以一定概率随机替换 latent vector 中某一维为标准高斯分布采样值

#### 5. Pareto dominance-based evaluation strategy

该策略包含：

- **[[Non-domination rank]]**
  - 若解 $z_1$ 在所有目标上不差于 $z_2$，且至少一个目标更优，则 $z_1$ dominate $z_2$。
  - [[Non-dominated Solutions|非支配解]]形成 Pareto-front。

- **[[Reference point mechanism]]**
  - 用于对同一 domination rank 的个体进一步排序。
  - 目标是保持种群多样性，避免所有解集中在[[目标空间]]的某一区域。

- **Dynamic acceptance probability**
  - 早期允许较低目标值个体进入下一代，以增强多样性。
  - 后期更强调高目标值个体，以提高性质和相似性。

## 实验设置

论文设计了三个多属性分子优化任务。

### Task 1：QED and Similarity

目标：

- 优化分子使其满足：
  - **QED ≥ 0.9**
  - **Similarity ≥ 0.4**

数据集：

- 800 个 **QED ∈ [0.7, 0.8]** 的分子。
- 来源：Jin et al.，从 **[[ZINC]]** 测试集中选取。

评价指标：

- **Success Rate / SR**
  - 满足性质阈值和相似性阈值的优化分子比例。

对比方法包括：

- **[[JTVAE]]**
- **[[VSeqtoSeq]]**
- **[[VJTNN]]**
- **[[QMO]]**
- **[[GCPN]]**
- **GA**

### Task 2：PlogP and Similarity

目标：

- 最大化 **PlogP improvement / PlogP_imp**
- 同时满足 similarity threshold

相似性阈值：

- **0.4**
- **0.6**

数据集：

- 800 个低 PlogP 分子。
- 来源：Jin et al.

对比方法：

- 与 Task 1 类似，包含深度学习方法、强化学习方法和[[Evolutionary algorithms|进化计算]]方法。

### Task 3：QED, DRD2 and Similarity

目标：

- 优化分子使其满足：
  - **QED ≥ 0.8**
  - **DRD2 ≥ 0.4**
  - **Similarity ≥ 0.3**

数据集：

- 780 个测试分子。
- 条件包括：
  - **DRD2 < 0.05**
  - **QED ∈ [0.7, 0.8]**
- 来源：已发表论文，原文中对应引用存在编号混乱，需待补充原文/PDF 后确认具体来源。

对比方法：

- **[[IPCA]]**
- **GA**
- **[[MSO]]**
- **QMO**

评价指标：

- Success Rate / SR
- 平均目标性质值
- 平均性质提升值

### 参数设置

根据论文 Methods：

#### Task 1

- population size：**P = 100**
- iterations：**T = 100**
- crossover 控制参数：**d = 0.25**
- crossover probability：**pc = 1**
- mutation probability：**pm = 0.5**
- 使用 10 次 restart，报告最佳结果。

#### Task 2

- population size：**P = 100**
- iterations：**T = 200**
- d = 0.25
- pc = 1
- pm = 0.5

#### Task 3

- population size：**P = 100**
- iterations：**T = 200**
- d = 0.25
- pc = 1
- pm = 0.5
- 为公平比较与考虑计算成本，不使用 restart。

## 主要结果

### Task 1：QED and Similarity

论文报告：

- MOMO 和 QMO 的 SR 均超过 90%。
- MOMO 比 QMO 高 **1.91%**。
- MOMO 在 QED 和 Similarity 分布上表现出更高多样性与更优性质。

解释：

- MOMO 和 QMO 都在连续 latent space 中搜索，因此相较离散空间方法具有优势。
- MOMO 使用 population evolution 和 Pareto-based selection，比 QMO 的加权单目标优化更能探索不同目标偏好的解。

### Task 2：PlogP and Similarity

论文报告：

- 当 similarity threshold 为 **0.4** 时，MOMO 的平均 **PlogP_imp = 9.61**。
- MOMO 至少比所有 baseline 高 **1.91**。
- MOMO 的 PlogP_imp 标准差低于 QMO，说明稳定性更好。
- 当 similarity threshold 为 **0.6** 时，MOMO 仍优于 baselines，说明对不同相似性约束较稳健。

论文还指出：

- 将 similarity 作为单独目标，而不是仅作为阈值，有助于找到 PlogP 提升较大且 similarity 较高的分子。
- QMO 中有一个 PlogP_imp 很高的分子，但作者认为其主要由大量碳原子构成，[[chemical diversity|结构多样性]]不足，因此意义有限。

### Task 3：QED, DRD2 and Similarity

论文报告：

- MOMO 的 Success Rate 为 **75.93%**。
- 至少比 baselines 高 **29.9%**。
- MOMO 在三个目标的平均性质值上均优于 baselines。

解释：

- 当优化目标超过一个性质加相似性约束时，传统单目标加权方法表现不足。
- Pareto-based evolutionary approach 能够发现多个目标之间具有不同 trade-off 的高质量分子。

### Case Study

论文通过 Task 1 的示例展示 MOMO 的搜索能力：

- 先导分子用红色五角星表示。
- 不同颜色点表示不同进化代生成的分子。
- 最终 Pareto-front 分子用红色点表示。
- MOMO 能沿多个方向搜索：
  - 高 Similarity
  - 高 QED
  - 同时兼顾 QED 和 Similarity

论文还展示了三个演化轨迹：

- 第一条轨迹：生成极高 QED 但 similarity 较低的分子。
- 第二条轨迹：生成 QED 和 similarity 都较高的分子。
- 第三条轨迹：生成 QED 较低但与先导分子高度相似的分子。

这说明 MOMO 可以为同一先导分子生成具有不同偏好的候选分子集合。

## 创新点

1. **将分子优化明确表述为多目标优化问题**
   - 不再简单使用加权求和将多属性合并为单目标。
   - 使用 Pareto dominance 搜索一组解。

2. **结合连续隐式化学空间与进化搜索**
   - 在 latent vector 上执行 evolution，而不是直接在离散 SMILES 或分子图上修改。
   - 提高了搜索平滑性和生成有效分子的概率。

3. **在分子序列层面执行多属性评价**
   - 虽然进化操作在 latent space 中进行，但性质评价在解码后的分子空间中完成。
   - 这样可以直接使用 [[RDKit]]、[[pyTDC]]、[[ADMETlab]] 等 property evaluators。

4. **设计 Pareto dominance-based multi-property evaluation strategy**
   - 结合 non-domination rank、reference point mechanism 和 dynamic acceptance probability。
   - 兼顾高性质值、多样性和避免局部最优。

5. **在三个多属性任务上验证效果**
   - 包括 QED + Similarity、PlogP + Similarity、QED + DRD2 + Similarity。
   - 尤其在三目标任务中体现出明显优势。

## 局限性

论文作者明确指出 MOMO 存在以下局限：

1. **编码和解码过程耗时**
   - 在优化过程中需要频繁将分子编码到 latent space、再解码回分子空间。
   - 如何减少 codec 时间，同时保持性质评价准确性，是一个挑战。

2. **真实药物开发目标更多**
   - 实际药物设计往往需要同时优化四个或更多目标。
   - 本文实验最多涉及 QED、DRD2、Similarity 三个目标，尚未充分验证更多目标场景。

3. **需要进一步考虑分布性与多样性**
   - 作者建议未来在分子进化中进一步引入 distributivity 和 diversity，以提升优化表现。
   - 这里的 distributivity 具体定义和实现方式需待补充原文/PDF 后确认。

4. **依赖预训练 codec 的质量**
   - MOMO 的隐式化学空间由预训练 codec 构建。
   - codec 的表达能力、解码有效率和化学空间覆盖范围可能影响最终搜索效果。
   - 论文未在给定摘录中系统分析不同 codec 对结果的影响，待补充原文/PDF 后确认。

5. **部分 baseline 结果来自原论文**
   - Task 1 和 Task 2 中若干 baseline 结果取自原始文献。
   - 不同实验设置、随机种子或实现细节可能影响公平性，需结合完整实验附录进一步确认。

## 相关概念

- [[分子优化]]
- [[多目标优化]]
- [[多目标分子优化]]
- [[多目标进化算法]]
- [[Pareto 最优]]
- [[Pareto-front]]
- [[Pareto dominance]]
- [[Non-domination rank]]
- [[Reference point mechanism]]
- [[隐式化学空间]]
- [[连续隐空间]]
- [[分子生成模型]]
- [[深度生成模型]]
- [[进化算法]]
- [[遗传算法]]
- [[强化学习]]
- [[先导化合物优化]]
- [[SMILES]]
- [[分子图]]
- [[Morgan fingerprint]]
- [[Tanimoto similarity]]
- [[QED]]
- [[Penalized-logP]]
- [[DRD2]]
- [[ADME]]
- [[ADMET]]
- [[RDKit]]
- [[pyTDC]]
- [[ADMETlab]]
- [[ZINC]]

## 相关方法

- [[MOMO]]
- [[QMO]]
- [[JTVAE]]
- [[VSeqtoSeq]]
- [[VJTNN]]
- [[GCPN]]
- [[GA]]
- [[IPCA]]
- [[MSO]]
- [[cddd model]]
- [[NSGA-II]]
- [[NSGA-III]]
- [[Binary tournament selection]]
- [[Blending linear crossover]]
- [[Gaussian mutation]]
- [[Latent space optimization]]
- [[Molecular evolutionary optimization]]
- [[Multi-objective evolutionary molecule optimization]]

## 相关论文

- **Evolutionary multi-objective molecule optimization in implicit chemical space**  
  - citekey: `suEvolutionaryMultiobjectiveMolecule2023`
  - authors: Yansen Su, Xin Xia, Chunhou Zheng, Yiping Liu, Qingwen Wu, Xiangxiang Zeng
  - year: 2023
  - DOI: `10.21203/rs.3.rs-2798803/v1`

- **Junction Tree Variational Autoencoder for Molecular Graph Generation**
  - 对应方法：[[JTVAE]]
  - 本文作为相关 baseline 引用。

- **Learning Multimodal Graph-to-Graph Translation for Molecule Optimization**
  - 对应方法：[[VJTNN]]
  - 本文作为相关 baseline 引用。

- **Graph Convolutional Policy Network for Goal-Directed Molecular Graph Generation**
  - 对应方法：[[GCPN]]
  - 本文作为相关 baseline 引用。

- **Optimizing Molecules Using Efficient Queries from Property Evaluations**
  - 对应方法：[[QMO]]
  - 本文重点对比的 latent-space search baseline。

- **Efficient Multi-Objective Molecular Optimization in a Continuous Latent Space**
  - 对应方法：[[MSO]]
  - 与连续隐空间中的多目标分子优化相关。

- **Multi-Property Molecular Optimization using an Integrated Poly-Cycle Architecture**
  - 对应方法：[[IPCA]]
  - 本文 Task 3 对比方法之一。

- **Fast and Elitist Multiobjective Genetic Algorithm: NSGA-II**
  - 与 non-domination rank 相关。

- **An Evolutionary Many-Objective Optimization Algorithm Using Reference-Point-Based Nondominated Sorting Approach**
  - 与 reference point mechanism 相关，类似 [[NSGA-III]] 思路。

## 源文件

- citekey: `suEvolutionaryMultiobjectiveMolecule2023`
- title: **Evolutionary multi-objective molecule optimization in implicit chemical space**
- authors: Yansen Su, Xin Xia, Chunhou Zheng, Yiping Liu, Qingwen Wu, Xiangxiang Zeng
- year: 2023
- DOI: `10.21203/rs.3.rs-2798803/v1`
- collections: 多目标分子优化
- posted date: April 21st, 2023
- license: Creative Commons Attribution 4.0 International License
- competing interest: No competing interest
- code/data availability:
  - `https://github.com/ahu-bioinf-lab/MOMO-master`
  - 原文称 datasets 和 code 将更新并可用，实际可用性需待补充原文/PDF 或访问仓库后确认。

## 图表摘录

![[raw/zotero/images/多目标分子优化/2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023/page-001.png]]

## Zotero 原始摘要

Optimization techniques play a pivotal role in advancing molecular optimization, prompting the development of numerous generative methods tailored to e ciently design optimized molecules derived from existing lead compounds. However, these methodologies often encounter di culties in generating diverse, novel, and high-quality molecules when addressing multi-property tasks. Consequently, e ciently searching for diverse optimized candidates that simultaneously satisfy multiple properties remains a signi cant challenge in molecule optimization. To address this problem, we propose a multi-objective molecule optimization framework (MOMO). MOMO employs a specially designed Pareto dominancebased multi-property evaluation strategy at the molecular sequence level, speci cally designed to guide the evolutionary search in a latent molecular space to optimize multiple molecular properties. A comparative analysis of MOMO with extant state-of-the-art baselines across three multi-property molecule optimization tasks reveals that MOMO markedly outperforms them all. These results suggest the e cacy of the proposed MOMO framework for simultaneous optimization of multiple properties in molecule optimization.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的关键价值在于，它没有把多属性分子优化强行压缩成单个 reward，而是直接承认多个目标之间存在 trade-off，并使用 Pareto-front 来表达“一组合理优化结果”。

这对于药物设计很重要，因为真实场景中很少存在一个单一指标可以完全代表分子的优劣。例如，一个分子可能 QED 高但与先导分子相似性较低；另一个分子可能相似性高但活性提升有限。MOMO 的输出不是一个点，而是一组 Pareto-front 分子，使研究者可以根据后续实验需求选择不同偏好的候选分子。

另一个值得注意的点是，MOMO 把“搜索”和“化学先验学习”解耦：

- 化学先验由预训练 codec 学到。
- 搜索由 multi-objective evolutionary algorithm 完成。
- 评价由分子空间中的 property evaluators 完成。

这种设计比较模块化，因此理论上可以替换不同的 encoder-decoder、[[性质预测]]器和进化策略。  
不过，这也意味着 MOMO 的表现可能受限于 codec 解码质量和 property evaluator 的可靠性。

从方法定位看，MOMO 可以视为：

> 连续[[Latent space optimization|隐空间优化]] + 多目标进化算法 + Pareto-based selection 在分子优化中的组合。

它相较于单目标 reward-based 方法的优势，在三目标任务 Task 3 中体现得最明显。

## 后续问题

1. MOMO 使用的 **cddd model** 具体预训练数据、架构和解码有效率是多少？
   - 待补充原文/PDF 后确认。

2. MOMO 在更多目标，例如 4 个及以上性质同时优化时，是否仍保持优势？

3. MOMO 的 dynamic acceptance probability 对结果贡献有多大？
   - 是否有 ablation study？
   - 摘录中未见详细消融结果，待补充原文/PDF 后确认。

4. Reference point mechanism 的具体参数如何设定？
   - 例如 reference points 数量、分布方式等细节需进一步确认。

5. MOMO 的运行时间和计算成本是多少？
   - 作者指出 codec 耗时，但摘录中未给出具体耗时对比。

6. MOMO 生成分子的合成可行性如何？
   - 虽然方法可扩展到 SA 等目标，但本文实验主要未报告 SA 优化结果。

7. MOMO 对 property predictor 的误差是否敏感？
   - 特别是 DRD2 这类预测活性目标，预测器误差可能影响优化方向。

8. MOMO 是否可能被 property evaluator exploitation 影响？
   - 即模型生成一些性质预测高但化学上不合理或不可合成的分子。

9. 与 NSGA-II 或 NSGA-III 的标准实现相比，MOMO 的 Pareto-based evaluation strategy 有哪些具体差异？
   - 摘录中显示其使用 non-domination rank 和 reference point mechanism，类似 NSGA-III，但完整算法细节还需核对。

10. GitHub 仓库 `MOMO-master` 是否提供完整可复现实验代码、训练好的 codec、数据集划分和 baseline 配置？
    - 待实际访问仓库后确认。
