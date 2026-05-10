---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
background: "included"
---
# Multi-objective Evolutionary Algorithm

## 标准定义

[[Multi-objective Evolutionary Algorithm|多目标进化算法]]（Multi-objective [[Evolutionary Algorithm]], MOEA）是一类基于种群搜索的 [[evolutionary algorithm]]，用于同时优化多个相互冲突的目标，并近似求得一组 [[Pareto front]] 上的[[Pareto 最优|非支配解]]。它通常借助 [[non-dominated sorting]]、多样性维护、[[selection]]、[[crossover]] 和 [[mutation]] 等机制，在解空间中逐步逼近目标之间的折中边界。

## 在本知识库中的用法

在本知识库对应论文中，多目标[[Evolutionary Algorithm|进化算法]]被用于 [[MOMO]] 的核心搜索框架：把分子的 latent vector 视为个体，在[[隐式化学空间]]中进行进化操作；随后将解码后的分子按 [[QED]]、[[PlogP]]、DRD2、Similarity 等多个指标分别评价，并用基于 [[Pareto dominance]] 的更新策略替代[[Linear Scalarization|加权求和]]，最终输出一组位于 [[Pareto front]] 上、具有不同偏好的候选分子。

## 关键点

- 标准用法中，MOEA 不把多个目标压缩成单一标量，而是保留目标之间的 trade-off 结构，以获得一组折中解而非单点最优。
- 在本库论文里，进化发生在连续 [[潜在空间|latent space]] 中，评价却在分子解码后的空间进行，这种“搜索在隐空间、评价在分子空间”的分工是方法关键。
- 论文强调多目标优化适合同时处理性质提升与相似性约束，因为不同目标之间往往存在冲突，单目标加权容易丢失多样性。
- MOMO 通过种群更新来保留不同偏好的候选分子，使结果更接近一组而不是一个最优分子。

## 别名

- Pareto进化算法
- MOEA
- 多目标进化算法
- 多目标演化算法
- 多目标进化优化
- Multi-objective evolutionary optimization

## 外部背景

- 经典 MOEA 通常包括 NSGA-II、MOEA/D 等变体，待核对经典来源。
- 常见的多目标选择机制包括非支配排序、拥挤距离或参考点机制，用于同时兼顾收敛性与多样性。
- 与单目标加权优化相比，MOEA 更适合在目标冲突明显时寻找多种可接受解，而不是强行选定固定权重。
- 在化学与分子设计中，MOEA 常用于同时优化活性、药物相似性、可合成性、ADMET 等指标，待核对经典来源。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
