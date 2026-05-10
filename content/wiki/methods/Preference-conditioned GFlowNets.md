---
type: "method"
status: "enriched"
category: "生成方法"
domain: "多目标分子生成"
background: "included"
---
# Preference-conditioned GFlowNets

## 标准定义

Preference-conditioned [[GFlowNet|GFlowNets]] 是在 [[GFlowNet]] 框架中引入条件变量（如偏好向量、目标描述或任务上下文）的[[可控生成|条件生成]]方法，使模型能够根据不同条件生成不同分布的高奖励样本。对多目标问题而言，常见做法是先把多个目标通过线性标量化映射为单个奖励，再学习在不同偏好下采样，从而服务于 [[多目标优化]] 中的偏好控制与折中解搜索。

## 在本知识库中的用法

在这篇论文的语境里，作者主要是以 preference-conditioned [[GFlowNet]]s 作为对比基线，并指出其在复杂或凹形 [[Pareto front]] 上容易偏向极端点、对中间折中区域覆盖不足。为缓解目标稀疏与训练不稳定，论文使用了 [[replay buffer]] 和 [[hindsight experience replay]]，并配合 reward shaping 与可行性更高的目标采样策略来提升生成稳定性与覆盖均匀性。

## 关键点

- 核心问题不是“给定偏好权重后[[分子生成|生成分子]]”，而是“在[[目标空间]]中指定一个希望覆盖的区域”，以提升对复杂 [[Pareto front]] 的可控覆盖。
- 相比线性 [[标量化]] 的偏好控制，这类方法更关注生成分布是否真的落在用户想要的目标区域内，而不只是提升某个加权分数。
- 在该论文中，preference-conditioned GFlowNets 作为基线被证明在凹形和多峰目标地形上容易出现覆盖不均的问题。
- 论文强调通过记忆回放与反事实重标记来缓解硬约束带来的稀疏奖励，从而让条件生成更稳定。
- 该节点更适合放在“多目标生成控制”语境下理解，而不是单纯的奖励建模技巧。

## 别名

- 偏好条件GFlowNets
- Preference-conditioned GFN
- PC-GFlowNets
- 偏好条件生成流网络

## 外部背景

- GFlowNet 是一种以流量匹配为核心的生成式强化学习框架，目标是让终态样本概率与奖励成比例，常用于组合优化与[[分子生成]]。
- [[多目标优化]]中，偏好条件方法通常会用随机采样的偏好向量或权重来覆盖不同折中解；待核对经典来源。
- 线性标量化在凸形 [[Pareto Front|Pareto front]] 上通常更有效，但在凹形或非凸前沿上可能无法完整覆盖所有折中解；待核对经典来源。
- 条件生成也常见于 goal-conditioned / region-conditioned 设定，即直接把“想要到达的目标区域”作为输入条件；待核对经典来源。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
