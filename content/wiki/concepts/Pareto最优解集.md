---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多峰多目标优化"
background: "included"
---
# Pareto最优解集

## 标准定义

Pareto[[Pareto set|最优解集]]（[[Pareto-efficient solution|Pareto optimal solution]] set, PS）是指在可行域中所有未被任何其他可行解支配的解所构成的集合；它们在[[目标空间]]中的像通常对应同一个 [[Pareto前沿]]，而在[[决策空间]]中可能表现为一个或多个连通或离散区域。换言之，PS 是“在 [[非支配]] 意义下最优”的全部解的集合。

## 在本知识库中的用法

在本知识库对应的 [[多模态多目标优化|MMOP]] 语境里，Pareto最优解集特指与同一 [[Pareto前沿]] 对应的决策空间解集，并且可能同时存在 global PS 和 local PS。该概念强调的不只是逼近前沿，还要尽量找全这些分散在 [[决策空间]] 中的解集，同时维持它们在 [[目标空间]] 中的对应覆盖。

## 关键点

- PS 是决策空间概念，[[Pareto前沿]] 是其在目标空间中的对应；两者相关但不等同。
- 标准意义下，PS 中的任一解都不应被其他可行解支配，因此它代表多目标折中意义上的最优解集合。
- 在 [[多峰多目标优化]] 中，一个前沿点可能对应多个彼此分离的 PS，因此“找全解集”比只找前沿更难。
- 本库语境特别关注 global PS 与 local PS 的并存结构，而不是只保留少数最优解点。
- ACEA-[[拥挤距离|NFCD]] 这类方法把 PS 的覆盖率、收敛性和多样性一起考虑，避免搜索过早丢失某些可行的 Pareto 解集。

## 别名

- Pareto optimal solution set
- PS
- Pareto解集
- Pareto最优解集合
- 非支配解集

## 外部背景

- 在经典[[多目标优化]]里，PS 通常与 [[Pareto 最优]]性、[[Non-dominated Solutions|非支配解]]集合等概念一起讨论。
- 从几何上看，PS 位于决策空间，而 PF 位于目标空间；二者之间通常存在多对一映射关系。
- 在多峰问题中，多个互不相连的 PS 可能对应同一条 PF，这是 MMOP 研究的核心难点之一。
- 待核对经典来源

## 相关论文

- [[2026 - 自适应收敛指标与邻域模糊拥挤距离的多峰多目标优化 - dangAdaptiveConvergenceIndicator2026]]
