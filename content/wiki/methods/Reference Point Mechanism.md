---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
background: "included"
---
# Reference Point Mechanism

## 标准定义

Reference Point Mechanism（参考点机制）是[[多目标优化]]中的一种偏好引导策略：先给定一个或多个参考点，用它们来刻画决策者希望关注的[[目标空间]]区域，再据此进行解的排序、筛选或分配，以提升搜索的收敛性与多样性。它常用于把优化过程引向特定的[[Pareto front]]区域，或在多个候选解之间建立更符合偏好的比较准则。背景上，参考点可以是“理想点/期望点/目标锚点”一类概念，用来表达对某些目标组合的偏好。

## 在本知识库中的用法

在这篇论文的 [[MOMO]] 框架中，reference point mechanism 被放入 Pareto-based population update 过程，与[[非支配排序]]一起使用，用于定义候选分子的偏序关系并保留多样化的高质量解。它服务于[[隐式化学空间]]中的多目标进化搜索，目标是在不同性质与相似性之间形成多个有区分度的折中方向，而不是只返回单一最优解。结合论文描述，这一机制主要帮助模型在 Task 1-4 中维持多样性、筛选更接近目标偏好的分子，并与动态接受概率共同作用于种群更新。

## 关键点

- 标准上，reference point mechanism 属于偏好引导型[[多目标优化]]工具，用参考点描述“想要的解”所在区域。
- 它的核心作用通常是：引导搜索朝目标空间中特定区域收敛，同时避免种群过早集中到单一折中解。
- 在 MOMO 中，该机制与[[非支配排序]]结合，用于种群更新和候选解比较，强化 Pareto 意义下的选择。
- 在本知识库语境里，它更接近“按偏好区域组织多目标分子候选”的操作组件，而不是独立的分子表示或评价指标。
- 论文中的用法强调：一次搜索应保留多个不同权衡的分子，而参考点机制有助于维持这种分布式结果。

## 别名

- 参考点机制
- reference-point mechanism
- reference point based selection
- reference point

## 外部背景

- 在经典[[Multi-objective Evolutionary Algorithm|多目标进化算法]]中，参考点常用于偏好表达和分布控制，帮助算法覆盖不同的 Pareto 区域。
- 参考点机制与 aspiration point、utopia point、reference direction 等概念常有相近用途，但具体实现有所区别。
- 待核对经典来源：相关思想常见于偏好引导型 [[Multi-objective Evolutionary Algorithm|MOEA]]、参考点驱动选择和分布保持策略。
- 在目标数量较多时，参考点机制常与 niching、[[拥挤距离|crowding distance]] 或方向向量等方法配合使用。

## 相关论文

- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
