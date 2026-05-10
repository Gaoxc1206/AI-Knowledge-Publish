---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标优化"
background: "included"
---
# Pareto 最优

## 标准定义

Pareto 最优（[[Pareto 最优|Pareto optimality]]）是[[多目标优化]]中的核心概念：如果一个可行解不存在其他解能在所有目标上都不差、且至少一个目标更好，那么它就是 [[Pareto 最优解]]；所有 Pareto 最优解共同构成 [[Pareto Front|Pareto 前沿]]。它强调的是目标之间的不可同时改进性，而不是单一标量目标的最大值。

## 在本知识库中的用法

在本知识库的相关论文中，Pareto 最优主要用于刻画“多目标折中解”的质量：[[MOMO]] 在[[隐式化学空间]]中用基于 Pareto 的进化搜索，最后返回 Pareto-front 上的分子；EHVI 对比固定权重标量化时，直接以 [[Pareto Front|Pareto 前沿]]覆盖和[[Hypervolume Indicator|超体积]]改进为导向；语言模型多目标对齐工作则更多讨论 [[Pareto Stationary Point|Pareto stationary]] 作为可计算的近似目标，而不是直接追求单一奖励最大化。

## 关键点

- Pareto 最优关注的是多目标之间的权衡，而不是单个指标的绝对最大化；当目标冲突时，往往只存在一组不可互相支配的解。
- 它与 [[非支配排序]] 密切相关：如果一个候选被其他解支配，它就不是 Pareto 最优；[[Pareto 最优|非支配解]]集合通常用于近似 [[Pareto Front|Pareto 前沿]]。
- 在[[分子优化]]中，MOMO 将 QED、[[PlogP]]、Drd2、相似性等目标同时优化，并直接返回最后一代种群中的 Pareto-front 分子。
- 在多目标 Bayesian optimization 中，EHVI 通过最大化 [[超体积]] 增益来扩展 Pareto 前沿，而不是把多目标压成固定权重的单目标。
- 在语言模型多目标对齐中，相关工作更强调 [[Pareto stationary point]] 作为可优化的理论目标，但它与真正的 Pareto 最优并不完全等价。

## 别名

- Pareto optimal
- Pareto efficiency
- Pareto optimality
- 帕累托最优
- 帕累托最优解
- 非支配解

## 外部背景

- Pareto 最优解通常不唯一，多个解之间可能对应不同的 trade-off 方案。待核对经典来源
- 若多个目标量纲差异较大，直接做标量化会非常依赖权重设置，因此 Pareto-aware 方法更能保留前沿结构。待核对经典来源
- 常见的多目标优化思路包括标量化、ε-约束法、进化多目标优化和多目标贝叶斯优化。待核对经典来源
- Pareto 最优描述的是“无法在不牺牲其他目标的情况下继续改进”，与单目标意义上的全局最优不同。待核对经典来源

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
