---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多目标分子设计"
---
# Goal-conditioned GFlowNets

## 定义

Goal-conditioned [[GFlowNets]] 是一种将 [[GFlowNet]] 条件化到[[focus region|目标区域]]（[[focus region]]）的生成方法，用于在[[多目标分子设计]]中显式控制生成样本落入用户指定的[[目标空间]]区域。相比基于[[Preference Vector|偏好向量]]的 [[preference-conditioning]]，它不只是表达“更偏好什么”，而是直接指定“希望生成到哪里”，从而更有利于在 [[Pareto front]] 上进行均匀、可控的采样。该方法通过 hard constraint、回放缓冲与 [[hindsight experience replay]] 等机制，缓解[[reward sparsity|稀疏奖励]]带来的训练不稳定问题。

## 关键点

- 用目标方向和余弦相似度阈值定义 focus region，将目标空间划分为可控的锥形区域。
- 奖励采用区域内为正、区域外为 0 的 hard constraint 形式，以强化对指定目标区域的控制。
- 引入 [[replay buffer]] 和 hindsight [[replay buffer|experience replay]]，缓解由于稀疏奖励导致的训练困难。
- 使用 [[reward shaping|reward sharpening]] / [[reward shaping|limit reward coefficient]]，让模型更偏向目标区域中心而不是边界样本。
- 提出 [[Tab-GS]] 来学习目标可行性分布，降低不可行目标方向的采样浪费。
- 在复杂 Pareto front 场景中，相比 [[preference-conditioning|preference-conditioned GFlowNet]]s，[[goal-conditioning|goal-conditioned]] 版本通常具有更高的可控性和更均匀的覆盖；IGD 差距不大，但 [[Avg-PCC]] 和 [[PC-ent]] 更好。

## 别名

- Goal-conditioned GFN
- Goal-conditioned Generative Flow Network
- GC-GFlowNet
- goal-conditioned GFlowNets

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
