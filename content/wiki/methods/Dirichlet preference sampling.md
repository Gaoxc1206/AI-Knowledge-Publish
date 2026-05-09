---
type: "method"
status: "enriched"
category: "采样方法"
domain: "多目标分子优化"
background: "included"
---
# Dirichlet preference sampling

## 标准定义

Dirichlet preference sampling 指从 Dirichlet 分布中采样[[Preference Vector|偏好向量]]（通常是位于单纯形上的[[Preference Vector|权重向量]]）的方法，用于在[[多目标优化]]中生成一组非负且和为 1 的 preference / weight。它常被用来覆盖不同的目标权衡方向，并可通过浓度参数控制采样更偏向中心还是边角区域。

## 在本知识库中的用法

待从更多论文中补充。当前上下文只表明本文把 [[preference-conditioning]] 作为对照路线，并主张用 [[goal-conditioning]] 替代；未明确提到 Dirichlet preference sampling 的具体定义、实现或实验用法。

## 关键点

- 本质上是对 [[Dirichlet distribution]] 的应用：在多目标问题中采样偏好权重向量，以表达不同目标之间的 trade-off。
- 通常用于 [[multi-objective optimization]] 或多目标生成任务中，作为扫描 [[Pareto front]] 的一种偏好生成机制。
- 在该论文语境里，它更接近被替代的 [[preference-conditioning]] 思路：先给定权重，再用[[标量化]]目标训练或控制生成。
- 与本文提出的 [[goal-conditioning]] 不同，Dirichlet preference sampling 传递的是“偏好强度”，而不是显式的[[focus region|目标区域]]约束。
- 若使用对称 Dirichlet 分布，样本可较均匀地覆盖简单形偏好空间；但对复杂或[[非凸 Pareto front]]，仍可能出现覆盖不均的问题。

## 别名

- Dirichlet sampling
- Dirichlet-based preference sampling
- 偏好向量采样
- 权重向量采样

## 外部背景

- Dirichlet 分布是定义在单纯形上的分布，适合生成概率向量或多目标权重向量；待核对经典来源。
- 其浓度参数会影响采样形状：参数较大时样本更集中于中心，较小时更容易落到边角区域；待核对经典来源。
- 在多目标学习中，采样偏好向量常用于构造训练条件、进行偏好扫描或生成不同折中解；待核对经典来源。
- 若与标量化奖励结合，Dirichlet 采样出的权重通常会进入加权和[[黑盒 oracle|目标函数]]，用于训练条件式模型；待核对经典来源。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
