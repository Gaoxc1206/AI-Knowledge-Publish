---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多模态多目标优化"
background: "included"
---
# Pareto前沿

## 标准定义

Pareto前沿（[[Pareto front]], PF）是[[多目标优化]]中由所有[[Pareto最优解]]在[[目标空间]]中的映射所形成的边界或集合。位于该前沿上的解满足：不存在另一个解能在所有目标上都不差、且至少一个目标更优。直观上，PF刻画了“各目标之间不可同时再改进”的最优折中区域，是评价[[多目标优化]]算法收敛性与解集质量的核心参照。

## 在本知识库中的用法

在这篇关于[[多模态多目标优化]]的论文里，Pareto前沿主要作为算法要逼近的目标空间参照。ACEA-[[拥挤距离|NFCD]] 不仅要找到 PF 本身，还要尽可能恢复与同一 PF 对应的多个[[Pareto最优解集]]，包括 global PS 和 local PS。论文还指出，某些问题存在 local PF / global PF 的差异，因此 PF 的“逼近”与“找全对应解集”被分开处理。

## 关键点

- PF 是目标空间中的概念，而 [[Pareto最优解集]] 更强调[[决策空间]]中的解分布；两者常配对出现。
- 标准多目标优化里，算法通常以逼近 PF 作为收敛目标；这篇论文进一步要求在 [[决策空间]] 中找全多个对应 PS。
- 在 [[多模态多目标优化]] 中，可能出现多个不同 PS 映射到同一 PF，或存在 local PF 与 global PF 共存的情况。
- 论文中的 [[Adaptive Convergence Indicator]] 用来区分个体更接近 global PF 还是 local PF，对 PF 相关解的保留策略进行自适应调整。
- 论文中的 [[Neighborhood Fuzzy Crowding Distance]] 主要服务于 PF 附近的多样性维护，兼顾目标空间与决策空间的覆盖。
- 对于本知识库而言，PF 不只是“最优边界”，还常被用作判断算法是否同时具备收敛性与多模态覆盖能力的基准。

## 别名

- Pareto front
- PF
- 帕累托前沿
- 帕累托前线

## 外部背景

- PF 通常是由[[Non-dominated Solutions|非支配解]]在目标空间形成的集合；其对应的决策空间集合常称为 PS。
- 在经典多目标优化教材中，PF 用于说明多个目标之间不可避免的权衡关系；待核对经典来源。
- 当问题具有多个决策空间解映射到同一目标前沿时，常会讨论 disconnected PF、global PF 与 local PF 等变体。
- PF 常与 [[非支配]]、[[支配关系]]、[[多样性维护]] 一起作为[[多目标进化算法]]的基础概念。

## 相关论文

- [[2026 - 自适应收敛指标与邻域模糊拥挤距离的多峰多目标优化 - dangAdaptiveConvergenceIndicator2026]]
