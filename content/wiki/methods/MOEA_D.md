---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标优化"
background: "included"
---
# MOEA/D

## 标准定义

MOEA/D（Multiobjective [[Evolutionary Algorithm]] based on Decomposition）是一类[[多目标优化]]方法，核心思想是把一个多目标问题分解为多个标量子问题，并用一组[[权重向量]]或参考方向并行求解。每个子问题通常通过[[标量化函数]]把多个目标转成单目标形式，再借助[[邻域]]信息进行协同搜索，从而在逼近[[Pareto Front|Pareto前沿]]的同时维持解集分布。与直接依赖[[帕累托支配]]排序的算法相比，MOEA/D更强调分解、局部协作和均匀覆盖。

## 在本知识库中的用法

待从更多论文中补充。当前提供的论文上下文主要讨论 ACEA-NFCD 在[[多模态多目标优化]]中的双档案机制与邻域[[拥挤距离]]，并未明确说明 MOEA/D 在该工作中的具体作用或用法。

## 关键点

- MOEA/D 将一个多目标问题分解为多个标量子问题，是分解式[[Multi-objective Evolutionary Algorithm|多目标进化算法]]的代表方法。
- 它通常通过[[权重向量]]、参考点或其他分解方式来覆盖不同偏好方向，并借助[[邻域]]实现信息共享。
- 相比以[[帕累托支配]]为中心的算法，MOEA/D 更强调子问题协同与解集均匀分布。
- MOEA/D 常被用于求解标准[[多目标优化]]，也常作为许多改进算法的基础框架。
- 在本知识库提供的论文上下文中，未见 MOEA/D 的直接实例化用法；相关内容需待从更多论文中补充。

## 别名

- Multiobjective Evolutionary Algorithm based on Decomposition
- 分解多目标进化算法
- 基于分解的多目标进化算法

## 外部背景

- 经典 MOEA/D 通常与加权和、Tchebycheff、PBI 等[[标量化函数]]结合；待核对经典来源。
- MOEA/D 的常见设计包括邻域更新、交叉变异和外部精英集维护；待核对经典来源。
- 该方法后来发展出若干变体，可用于处理约束、多峰、多目标和偏好引导优化；待核对经典来源。
- MOEA/D 常与参考向量方法、分解策略和局部搜索结合形成混合算法；待核对经典来源。

## 相关论文

- [[2026 - 自适应收敛指标与邻域模糊拥挤距离的多峰多目标优化 - dangAdaptiveConvergenceIndicator2026]]
