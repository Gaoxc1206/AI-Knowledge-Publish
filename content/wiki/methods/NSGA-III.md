---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标优化"
background: "included"
---
# NSGA-III

## 标准定义

[[NSGA-II]]I（[[NSGA-II|Non-dominated Sorting Genetic Algorithm II]]I）是一类面向多目标、尤其是多目标数目较多时的进化优化算法。它基于[[非支配排序]]与精英保留框架，通过参考点/参考方向机制维持种群多样性，尽量获得覆盖整个 [[Pareto Front|Pareto front]] 的解集。与单目标优化不同，NSGA-III 输出的是一组彼此权衡的候选解，而不是单个最优解。

## 在本知识库中的用法

在本知识库上下文中，NSGA-III 主要作为传统[[多目标优化]]基线，用于与[[Discrete Flow Matching|离散流匹配]]或退火更新类方法比较。在[[生物序列设计|可控生物序列设计]]任务里，它被用于肽 binder 的多目标优化对照，以及荧光分子多目标设计中的优化对照；相关论文用它来衡量提出方法在 affinity、solubility、hemolysis、half-life、non-fouling 等冲突目标上的折中效果。上下文显示，NSGA-III 有时在单个指标上有竞争力，但整体 Pareto 折中通常不如新提出的引导式生成方法。

## 关键点

- 属于 [[多目标优化]] 中的经典[[Evolutionary Algorithm|进化算法]]，核心是非支配排序、精英选择与多样性维护。
- NSGA-III 主要通过参考点/参考方向来分散种群，适合处理较多目标的 Pareto 优化问题。
- 在本知识库中，它常被当作离散[[生物序列设计]]与[[分子生成|分子设计]]任务里的传统基线。
- 相关上下文中，它用于肽 binder、多目标荧光分子等任务的对照实验，帮助评估新方法对多属性 trade-off 的改进。
- 在这些任务里，NSGA-III 有时能得到较好的单项属性，但整体均衡性通常弱于专门的生成式多目标引导方法。

## 别名

- NSGA3
- Non-dominated Sorting Genetic Algorithm III
- 非支配排序遗传算法III

## 外部背景

- NSGA-III 是 NSGA-II 的后续扩展，通常被视为面向 many-objective optimization 的经典方法。
- 其常见做法是将目标值归一化后，与一组预定义参考点匹配，以保持解集在 Pareto front 上的覆盖度。
- 待核对经典来源
- 待核对经典来源

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
