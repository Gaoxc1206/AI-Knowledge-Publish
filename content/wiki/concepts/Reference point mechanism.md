---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标进化优化"
background: "included"
---
# Reference point mechanism

## 标准定义

Reference point mechanism（参考点机制）是[[多目标优化]]中的一种偏好引导策略：通过给定一个或多个参考点，指导搜索过程更关注 [[Pareto front]] 上靠近这些参考点的解，从而表达“希望解落在哪个权衡区域”的偏好。它通常与 [[Pareto dominance]]、[[非支配排序]]和多样性维护策略配合使用，用来兼顾收敛性与解集分布。

## 在本知识库中的用法

在这两篇 [[MOMO]] 论文中，reference point mechanism 被放在基于 Pareto 的多属性评价/选择流程里使用，和 [[non-domination rank]]、动态接受概率一起决定下一代种群。它的作用是帮助[[多目标分子优化]]在[[隐式化学空间]]中保留不同权衡方向的候选分子，而不是只返回单个加权最优解。

## 关键点

- 标准上，参考点机制用于把多目标搜索从“任意 [[Pareto 最优]]”引导到“靠近指定偏好区域的 Pareto 解”。
- 它常与 [[Pareto dominance]] 和非支配排序结合，用于在收敛与多样性之间取得平衡。
- 在本知识库的 MOMO 语境中，它是 Pareto-based 选择的一部分，和 [[non-domination rank]]、动态接受概率共同作用。
- 其目标不是把多个目标简单加权，而是保留一组不同权衡的候选分子，覆盖 [[Pareto front]] 的多个区域。
- 在隐式[[化学空间]]中的进化搜索里，参考点机制有助于把候选解朝更符合任务偏好的方向推进。

## 别名

- 参考点
- 参考点选择
- reference-point mechanism
- reference point based mechanism
- 偏好引导机制

## 外部背景

- 常见于 [[NSGA-III]]、[[MOEA_D|MOEA/D]] 等[[多目标进化算法]]的偏好表达或参考向量/参考点思想，待核对经典来源。
- 参考点可以是理想点、用户指定偏好点或其它目标空间中的锚点；具体定义依算法实现而异。
- 它的核心用途是把搜索重点放到 Pareto 前沿中的某些区域，而不是平均覆盖整个前沿。
- 在工程和决策场景中，参考点机制常用于把“决策者偏好”显式注入优化过程。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
