---
type: paper
citekey: "dangAdaptiveConvergenceIndicator2026"
title: "自适应收敛指标与邻域模糊拥挤距离的多峰多目标优化"
chinese_title: "自适应收敛指标与邻域模糊拥挤距离的多峰多目标优化"
authors: "Qianlong Dang, Xiaochuan Gao, Baosheng Li, Tao Zhan, Maoguo Gong, Xiaoyu He"
year: "2026"
venue: "IEEE Transactions on Emerging Topics in Computational Intelligence"
doi: "10.1109/TETCI.2026.3684051"
zotero_collections:
  - "多模态多目标"
status: imported
reading_status: inbox
tags:
  - paper
aliases:
  - "自适应收敛指标与邻域模糊拥挤距离的多峰多目标优化"
  - "Adaptive Convergence Indicator and Neighborhood Fuzzy Crowding Distance for Multimodal Multi-Objective Optimization"
original_title: "Adaptive Convergence Indicator and Neighborhood Fuzzy Crowding Distance for Multimodal Multi-Objective Optimization"
---
## 一句话总结

这篇论文提出了一个面向多模态多目标优化的双档案进化算法 **ACEA-NFCD**（*Adaptive Convergence Indicator and Neighborhood Fuzzy Crowding Distance*），用“自适应收敛指标”区分全局/局部 Pareto optimal solution set，并用“邻域模糊拥挤距离”同时维护决策空间与目标空间多样性，从而更好地找全 global PS 和 local PS。

## 研究问题

论文研究的是Multimodal Multi-Objective Optimization（MMOPs）中的一个核心难题：

- 在决策空间中，可能存在多个不同的Pareto optimal solution set（PSs）；
- 这些不同 PS 可能对应目标空间中的同一个Pareto front（PF）点；
- 某些问题还存在local Pareto front / local PS；
- 关键挑战是：**不仅要逼近 PF，还要尽可能找全所有等价 global PS 和 local PS**。

## 背景与动机

传统多目标进化算法在 MMOPs 中通常偏向“先收敛再多样性”，容易出现两个问题：

1. **局部 PS 被当作劣解删掉**  
   如果 local PF 在目标空间略差于 global PF，传统基于支配关系的机制往往会把它们删掉，导致无法找到 local PS。

2. **孤立解干扰搜索**  
   仅使用局部邻域收敛指标时，一些在邻域中没有竞争对手的孤立个体会被保留，但它们对搜索帮助不大，甚至浪费种群资源。

3. **拥挤距离设计不够适配 MMOPs**  
   传统拥挤距离常只看决策空间或目标空间，而且往往考虑全体个体；但 MMOPs 中不同 PS 通常分布稀疏且彼此独立，导致区分能力不足。

因此，论文的动机是：

- 用一种**能自适应切换局部/全局收敛判断**的指标；
- 再配合一种**同时考虑决策空间与目标空间**、并且只看邻域个体的拥挤距离；
- 最终在保持收敛性的同时，尽量完整保留所有 global PS 和 local PS。

## 核心思想

ACEA-NFCD 的核心是两个协同工作的档案：

- **CArc（convergence archive）**：偏向收敛，优先推动种群靠近 PF；
- **DArc（diversity archive）**：偏向多样性，尽量保留不同 PS，尤其是 local PS。

围绕这两个档案，论文提出了两项关键机制：

### 1. Adaptive Convergence Indicator
根据个体邻域知识，自适应选择：
- 使用local convergence indicator；
- 或使用global convergence indicator。

这样可以：
- 在 PS 充分被搜索到的区域保留局部结构；
- 在孤立个体区域避免无效保留和误导搜索。

### 2. Neighborhood Fuzzy Crowding Distance
将：
- 决策空间中的邻域拥挤距离，
- 目标空间中的邻域拥挤距离，

通过模糊集合理论融合成一个 **NFCD**，用于选择与截断。

这样做的目标是：
- 更准确地评估个体周围的“稀疏程度”；
- 在决策空间和目标空间之间取得更平衡的多样性分布。

## 方法框架

ACEA-NFCD 的整体框架是一个**双档案协同进化**结构：

1. 初始化一个大小为 N 的档案；
2. 通过更新策略得到：
   - 收敛档案 CArc
   - 多样性档案 DArc
3. 从两个档案分别选择父代，独立生成各自一半子代；
4. 将两个档案和两个子代合并；
5. 分别更新 CArc 和 DArc；
6. 重复直到达到最大函数评估次数。

### 框架中的关键模块

- 非支配排序：用于筛选 Pareto 层级；
- local convergence indicator / global convergence indicator：用于收敛评价；
- Neighborhood Fuzzy Crowding Distance：用于多样性维护与截断；
- 平衡策略：用于在每个 PF 上均衡保留解的数量；
- reward index：用于提升稀缺 PF 上个体未来被选中的概率。

## 算法流程

下面按论文 Algorithm 1–6 的逻辑整理：

### Step 1：初始化
- 初始化一个大小为 N 的档案 Arc；
- 构造初始的 DArc 和 CArc。

### Step 2：父代选择与生成子代
- 从 DArc 通过锦标赛选择产生父代，生成 N/2 个子代 DOff；
- 从 CArc 通过锦标赛选择产生父代，生成 N/2 个子代 COff。

### Step 3：合并更新
- 用 DArc ∪ DOff ∪ COff 更新 DArc；
- 用 CArc ∪ COff ∪ DOff 更新 CArc。

### Step 4：计算自适应收敛指标
- 先按式 (3) 计算邻域阈值 V；
- 统计每个个体的邻域个体数 N_i；
- 若 N_i 小于阈值 ξ·|Arc|，则对该个体使用 global convergence indicator；
- 否则使用 local convergence indicator。

### Step 5：更新收敛档案 CArc
- 先找出收敛指标为 0 的候选解；
- 若候选解不足 N：
  - 按“收敛指标 + 邻域模糊拥挤距离”排序；
  - 取前 N 个；
- 若候选解超过 N：
  - 仅保留候选解；
  - 按决策空间邻域拥挤程度删去最拥挤个体，直到数量为 N；
- 输出 CArc，并把收敛指标与 NFCD 作为 fitness。

### Step 6：更新多样性档案 DArc
- 先计算 DArc 的自适应收敛指标；
- 只保留收敛指标为 0 的个体；
- 再做 非支配排序，保留第一前沿；
- 将剩余个体中与当前选择集过于拥挤者删除；
- 若数量不足 N，则直接输出；
- 若数量超过 N，则执行“各 PF 数量平衡策略”。

### Step 7：各 PF 数量平衡
- 统计每个 Pareto 层的个体数；
- 若某层个体数少于平均值：
  - 保留该层；
  - 给予 reward index；
- 若某层个体数过多：
  - 进入待删集合；
- 再按决策空间邻域拥挤距离删除过密个体；
- 得到均衡后的 DArc。

## 实验设置

### 对比算法
论文与 9 个先进 MMOEA 对比：

- DN-NSGA-II
- MO_Ring_PSO_SCD
- MOEA/D-SS
- MMODE_CSCD
- HREA
- CMMO
- CoMMEA
- FPITSEA
- CDP-BCD

### 测试集
论文使用 4 个 benchmark suites，共 62 个 MMOPs：

- CEC 2019
- IDMP
- IDMP_e
- MMMOP

### 实验指标
使用的主要指标为：

- **IGDX**：决策空间中的 inverted generational distance
- **IGDF**：目标空间中的 inverted generational distance
- **rPSP**：reverse Pareto sets proximity

其中：
- IGDX、rPSP 越小越好，说明决策空间 PS 发现得更完整；
- IGDF 越小越好，说明目标空间收敛更好。

### 统计检验
- 使用 Wilcoxon rank sum test；
- 显著性水平为 p < 0.05；
- 同时报告 Friedman rank。

### 运行设置
- 详细结果表来自 **24 次独立运行**；
- 论文还做了消融实验和参数分析。

### 参数建议
论文通过实验给出参数推荐值：

- η_v = 0.2
- ξ = 0.02
- η = 0.1

### 实际应用
论文还测试了一个实际问题：

- **map-based distance minimization**

## 主要结果

### 总体结论
ACEA-NFCD 在四个 benchmark suites 上整体表现最好，且在三个指标上都排名第一，说明它在 MMOPs 中的综合能力强。

### CEC 2019
- 在 rPSP 上，22 个问题中有 9 个最好；
- 在 IGDX 上，22 个问题中有 8 个最好；
- 在 local PS 相关问题上表现突出；
- 说明自适应收敛指标能有效保留 local PS。

### IDMP
- 在 12 个问题中，ACEA-NFCD 的 rPSP 和 IGDX 表现最好；
- Friedman rank 分别达到 1.08 级别的领先表现；
- 对于难找区域，ACEA-NFCD 比传统方法更稳定。

### IDMP_e
- ACEA-NFCD 继续保持第一；
- 能同时较好覆盖 global PS 和 local PS；
- 说明该方法对带局部 PF 的问题适应性较好。

### MMMOP
- 在复杂高维实例上，ACEA-NFCD 仍能保持较强的 decision-space 多样性；
- 相比一些 convergence-first 方法，它更不容易过早丢失潜在 PS。

### 消融结果
论文对比了：
- ACEA-ED
- ACEA-CSCD
- ACEA-FCD
- ACEA-NFCD

结论是：  
**加入 neighborhood + fuzzy 融合后的 NFCD 明显优于简单欧氏距离、CSCD，以及去掉邻域机制的版本。**

## 创新点

1. **提出自适应收敛指标**
   - 可在 local convergence indicator 与 global convergence indicator 间切换；
   - 能减少孤立解干扰；
   - 有利于同时保留 global PS 和 local PS。

2. **提出 Neighborhood Fuzzy Crowding Distance**
   - 将决策空间与目标空间的邻域拥挤距离通过模糊集合理论融合；
   - 比只看单一空间的拥挤距离更适合 MMOPs。

3. **双档案协同更新机制**
   - CArc 负责收敛；
   - DArc 负责多样性；
   - 两者共享子代并交互更新，兼顾“靠近 PF”和“找全 PS”。

4. **PF 内部数量平衡策略**
   - 避免某些 PF 或某些局部 PS 被过度占据；
   - 进一步改善解在每个 PS 内的分布均匀性。

5. **在 62 个问题和实际应用上验证**
   - 不只做标准测试，还包含实际场景 map-based distance minimization。

## 局限性

- 论文明确给出了若干参数，需要人工设定：
  - η_v
  - ξ
  - η  
  虽然做了参数分析，但仍存在参数依赖性。

- 复杂度为 **O(N^2)**，在大规模种群或更高维问题上，计算代价可能上升；是否足以扩展到更大规模 MMOPs，待补充原文/PDF 后确认。

- 文中主要针对无约束/标准 MMOP 测试问题；对更复杂的约束 MMOP、动态 MMOP 或噪声环境下的表现，待补充原文/PDF 后确认。

- 论文未在当前摘录中给出对失败案例或异常情形的系统分析，待补充原文/PDF 后确认。

## 相关概念

- [[多模态多目标优化]]
- [[Pareto Front|Pareto前沿]]
- [[Pareto最优解集]]
- [[局部Pareto前沿]]
- [[非支配排序]]
- [[收敛性-多样性平衡]]
- [[拥挤距离]]
- [[模糊集合理论]]
- [[锦标赛选择]]
- [[双档案协同进化]]
- [[决策空间]]
- [[目标空间]]

## 相关方法

- [[NSGA-II]]
- [[MOEA/D]]
- [[SPEA2]]
- [[DN-NSGA-II]]
- [[MO_Ring_PSO_SCD]]
- [[MMODE_CSCD]]
- [[HREA]]
- [[多模态多目标优化|CMMO]]
- [[CoMMEA]]
- [[FPITSEA]]
- [[CDP-BCD]]
- [[双档案协同进化|双档案与重组策略]]
- [[局部收敛指标]]
- [[特殊拥挤距离]]
- [[MMODE_CSCD|CSCD]]
- [[Fuzzy preference indicator]]

## 相关论文

- [[Multimodal multi-objective optimization: A preliminary study]]
- [[A multimodal multiobjective evolutionary algorithm using two-archive and recombination strategies]]
- [[Hierarchy ranking method for multimodal multiobjective optimization with local pareto fronts]]
- [[A clustering-based differential evolution algorithm for solving multimodal multi-objective optimization problems]]
- [[A dual-population coevolutionary algorithm for balancing convergence and diversity in the decision space in multimodal multi-objective optimization]]
- [[A coevolutionary framework for generalized multimodal multi-objective optimization]]
- [[A multiobjective particle swarm optimizer using ring topology for solving multimodal multiobjective problems]]
- [[Differential evolution using improved crowding distance for multimodal multiobjective optimization]]
- [[Two-stage evolutionary algorithm with fuzzy preference indicator for multimodal multi-objective optimization]]

## 源文件

- 论文标题：**Adaptive Convergence Indicator and Neighborhood Fuzzy Crowding Distance for Multimodal Multi-Objective Optimization**
- DOI：10.1109/TETCI.2026.3684051
- 期刊：IEEE Transactions on Emerging Topics in Computational Intelligence
- 来源：IEEE PDF 文本摘取（第 1–16 页）
- 文档状态：已接收，接受日期 2026-03-26，页内显示为 final content

## 代码与数据

### 代码

未在当前解析文本中发现明确代码仓库。

### 数据集 / Benchmark

未在当前解析文本中发现明确数据集或 benchmark 链接。

### 其他链接

未在当前解析文本中发现其他外部资源链接。

## Zotero 原始摘要

Multimodal multi-objective optimization is a popular research direction characterized by different points on different Pareto optimal solution sets (PSs) in the decision space, corresponding to the same point on the Pareto front in the objective space. In addition, there may exist some multimodal multi-objective optimization problems (MMOPs) with local PSs. Finding all the equivalent global PSs and local PSs is the key to solving MMOPs. To solve these problems, this paper proposes a multimodal multiobjective evolutionary algorithm (MMOEA) based on the adaptive convergence indicator and neighborhood fuzzy crowding distance (ACEA-NFCD). The adaptive convergence indicator is able to calculate the local convergence indicator and global convergence indicator through the adaptive selection of neighborhood knowledge, which can effectively preserve all global PSs and local PSs and exclude the interference of isolated solutions. Moreover, in order to increase the diversity of the population, neighborhood crowding distances in the decision space and the objective space are integrated via fuzzy set theory, improving the truncation and selection process. The superior performance of ACEA-NFCD is demonstrated by experimentally comparing it with nine of the most advanced MMOEAs on four benchmark suites and one practical application of map-based distance minimization.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

我理解这篇工作的重点不只是“把 PF 找得更准”，而是明确把 MMOP 的目标重新定义成：

1. **目标空间要收敛**；
2. **决策空间要保留多个等价解族**；
3. **local PS 不能因为目标值略差就被当成垃圾解删掉**。

其中最有价值的设计是：

- 用自适应机制把“该用局部收敛判断还是全局收敛判断”这件事交给邻域结构决定；
- 用 NFCD 让“多样性”不再只依赖单空间拥挤度，而是同时看决策与目标两个视角。

从结果看，ACEA-NFCD 很像是在做一种“**既保全局最优结构，又保留局部备选结构**”的搜索，这对真实决策问题很重要，因为现实里局部最优方案往往也有可用价值。

## 后续问题

- ACEA-NFCD 在**更高维决策变量**、更大种群规模下是否还能保持 O(N^2) 的可接受代价？
- 自适应阈值 ξ 与 η_v 是否可以进一步做成**在线学习**或**自适应调参**？
- 该方法能否迁移到**约束 MMOP**、**动态 MMOP** 或**噪声 MMOP**？
- 双档案机制是否可以与深度学习引导的进化算法结合，进一步提高局部 PS 的发现率？
- 对于“PF 很好但 PS 覆盖差”的情况，是否还能设计更直接的 decision-space 指标来约束搜索？
- `map-based distance minimization` 之外，还有哪些实际问题适合作为 MMOP 的标准化应用测试？
