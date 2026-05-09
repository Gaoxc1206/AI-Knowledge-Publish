---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标优化"
---
# NSGA-III

## 定义

[[NSGA-II]]I 是一种经典的[[多目标进化算法|多目标进化优化]]方法。相关论文笔记中，它被作为黑盒[[多目标优化]]方法的代表之一，用于在多目标生成与设计任务中进行候选解筛选。[[LUMOS]] 论文将 NSGA-III 用于多目标荧光[[分子优化]]中的 Pareto-optimal population 选择，说明它可作为多目标生成框架中的外部优化器。对于其更具体的机制与适用条件，待从更多论文中补充。

## 关键点

- 在笔记中，NSGA-III 被归类为经典多目标优化方法，常与 [[SPEA2]]、[[SMS-EMOA]]、[[MOPSO]] 并列讨论。
- 相关论文认为它可以用于[[黑盒优化]]，但在高维序列空间中的效率和生成质量受到限制。
- [[LUMO]]S 框架将 NSGA-III 作为[[多目标分子优化]]中的选择模块，用于筛选 Pareto-optimal population。
- 其使用场景与[[多目标分子设计]]相关，例如荧光分子[[inverse design|反向设计]]中的多性质权衡优化。
- 关于其完整算法细节、[[Reference point mechanism|参考点机制]]等信息，当前上下文未充分展开，待从更多论文中补充。

## 别名

- NSGA3
- Non-dominated Sorting Genetic Algorithm III
- 非支配排序遗传算法III

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
