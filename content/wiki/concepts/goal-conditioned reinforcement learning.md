---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子生成与强化学习"
background: "included"
---
# Goal-conditioned Reinforcement Learning

## 标准定义

Goal-conditioned Reinforcement Learning（目标条件强化学习）是指把“目标”作为条件输入到策略、价值函数或轨迹生成器中，使模型学习在给定目标 g 时产生能达成该目标的行为。目标可以是期望状态、子任务、奖励阈值、区间或目标区域；在稀疏奖励场景中，常与 [[Hindsight Experience Replay]]、[[Replay Buffer]] 等机制结合，以提升可达性与泛化能力。

## 在本知识库中的用法

在本知识库对应论文中，该概念特指把多目标分子设计中的目标区域（focus region）直接作为条件输入，而不是使用偏好权重向量做标量化。模型被要求生成奖励向量落入指定目标区域的分子，并通过 replay buffer、hindsight experience replay 和目标采样策略来缓解硬约束导致的稀疏奖励与不可行目标采样问题。

## 关键点

- 标准定义上，goal-conditioned RL 的核心是“给定目标、再学习行为”，适用于需要按需达到特定结果的任务，而不只是最大化单一奖励。
- 在这篇论文里，目标不再是偏好权重，而是[[目标空间]]中的 [[Pareto front]] 局部区域；这让模型可以显式控制生成结果落在哪一段目标折中解上。
- 与 preference-conditioned 方法相比，目标条件化更适合凹形或复杂的多目标折中结构，因为它避免了线性标量化对中间区域覆盖不足的问题。
- 论文把 goal-conditioned 训练与 [[Hindsight Experience Replay]]、replay buffer 结合，用来缓解 hard constraint 下大量样本奖励为 0 的训练困难。
- 该用法强调“可控覆盖”而非单纯“高分最优”，目标是让生成分布在目标空间中更均匀，并提高不同目标数下的可达性与稳定性。

## 别名

- 目标条件强化学习
- goal-conditioned RL
- GCRL
- goal conditioned reinforcement learning

## 外部背景

- 在经典强化学习语境中，goal-conditioned 方法通常用于导航、机械臂控制、技能学习等任务；待核对经典来源。
- 目标条件化常与通用值函数近似（UVFA）或层次强化学习一起出现，用于学习对不同目标共享的表示；待核对经典来源。
- 在[[多目标优化]]中，goal-conditioned 方式与 preference-conditioned 的差别在于：前者直接指定目标区域，后者通过权重向量间接标量化目标；待核对经典来源。
- 稀疏奖励环境里，goal-conditioned 方法常依赖重标注、回放和目标采样机制来提高样本效率；待核对经典来源。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
