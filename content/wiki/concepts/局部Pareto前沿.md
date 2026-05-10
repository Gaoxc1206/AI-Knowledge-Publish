---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多峰多目标优化"
background: "included"
---
# 局部Pareto前沿

## 标准定义

局部[[Pareto Front|Pareto前沿]]是指在某个局部邻域内形成的 [[Pareto Front|Pareto前沿]] 片段：对应解在局部范围内对其他解呈非支配，但从全局看未必是唯一或最优的前沿。它常与 [[Pareto最优解集]] 的局部结构一起出现，尤其见于 [[多峰多目标优化]] 中。

## 在本知识库中的用法

在本知识库对应论文中，局部Pareto前沿指多峰多目标问题里需要被显式保留的“局部”前沿结构；ACEA-NFCD 不会把它们简单当作劣解删掉，而是通过自适应收敛指标区分局部/全局收敛，并结合邻域模糊[[拥挤距离]]维护这类前沿上的解。

## 关键点

- 它描述的是局部邻域内的非支配结构，而不是只看全局[[Pareto Dominance|支配关系]]的单一 [[Pareto Front|Pareto前沿]]。
- 在 [[多峰多目标优化]] 中，局部Pareto前沿通常与多个[[决策空间]]中的解簇对应，因此也常伴随多个局部 [[Pareto最优解集]]。
- 若仅按[[目标空间]]支配关系筛选，局部前沿可能被误删；本库中的方法因此需要同时考虑局部与全局收敛。
- ACEA-NFCD 将其视为需要保留的搜索对象，并借助 [[自适应收敛指标]] 与 [[邻域模糊拥挤距离]] 维持其多样性。
- 对这类问题的评估不仅关心整体逼近程度，也关心局部前沿是否被完整覆盖。

## 别名

- local Pareto front
- local PF
- 局部PF
- 局部帕累托前沿

## 外部背景

- 常见英文名是 local [[Pareto Front|Pareto front]] / local PF；与 global Pareto front 相对。
- 在[[多目标优化]]里，“局部”通常依赖于决策空间邻域或问题定义的局部最优概念，具体判定方式待核对经典来源。
- 有些论文会把局部Pareto前沿与 locally Pareto-optimal set、local [[Pareto最优解集|Pareto optimal solution set]] 配套讨论。

## 相关论文

- [[2026 - 自适应收敛指标与邻域模糊拥挤距离的多峰多目标优化 - dangAdaptiveConvergenceIndicator2026]]
