---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标黑箱优化"
background: "included"
---
# SPEA2

## 标准定义

SPEA2（Strength Pareto [[Evolutionary Algorithm]] 2）是一种经典的[[Evolutionary Algorithm|进化算法]]式[[多目标优化]]方法，通常通过外部档案维护[[Pareto 最优|非支配解]]，并结合个体的支配强度与密度估计来进行选择，从而同时兼顾收敛性与多样性。它适合没有显式梯度、只能通过评估获得目标值的[[黑箱优化]]问题，输出的是近似 [[Pareto front]] 的解集，而不是单一最优点。

## 在本知识库中的用法

在本知识库给定论文中，SPEA2 作为 [[DiffSBDD]]-EA 的一个对照/基线设置出现，用于多目标 3D [[分子生成]]任务中的性能比较。论文报告了 DiffSBDD-EA (Spea2) 在不同 [[Oracle Calls|objective evaluation]] budget 下的 hypervolume、[[Pareto Front|Pareto front]] 数量和运行时间，并指出其整体表现通常弱于 [[Inference-time Multi-target Generation|IMG]]；在合并 256 个解的统计中，Spea2 版本仅贡献了少量 non-dominated 解。

## 关键点

- SPEA2 是经典的精英型 [[多目标优化]] 方法，核心是用外部档案保留当前的非支配解。 
- 它通过“支配强度 + 密度估计”来计算适应度，常用于平衡收敛与多样性。
- 在本库上下文中，SPEA2 主要作为 DiffSBDD-EA 的基线算法，用来和 [[IMG]]、[[EGD]] 等推理时方法比较。
- 论文结果显示，基于 SPEA2 的 DiffSBDD-EA 在相同评估预算下的 hypervolume 通常低于 IMG，且运行时间更长。
- SPEA2 适合目标函数不可微、只能黑箱评估的场景，因此常见于[[分子生成|分子设计]]和其他组合式[[多目标优化]]任务。

## 别名

- Strength Pareto Evolutionary Algorithm 2
- SPEA 2
- Strength Pareto EA 2

## 外部背景

- SPEA2 通常被视为对早期 SPEA 的改进版本，改进点包括更细致的适应度分配和更稳定的档案更新。
- 常见实现会使用 k 近邻密度或距离项来缓解解集聚集，提升 Pareto 解分布的均匀性。
- 它常与 NSGA-II、MOEA/D 等算法一起作为多目标优化基准进行比较，评价指标经常包括 hypervolume、IGD/IGDX 和 Pareto coverage。
- 待核对经典来源

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
- [[2026 - 自适应收敛指标与邻域模糊拥挤距离的多峰多目标优化 - dangAdaptiveConvergenceIndicator2026]]
