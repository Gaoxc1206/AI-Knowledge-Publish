---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多目标分子设计"
---
# Trajectory Balance

## 定义

Trajectory Balance 是 [[Goal-conditioned GFlowNets]] 中用于训练条件式生成策略的一类方法，目标是在给定[[focus region|目标区域]]（[[focus region]]）时，让模型生成落入该区域的分子。它强调通过显式指定目标方向或目标区域，而不是仅用偏好权重做[[标量化]]，从而提升对 [[Pareto front]] 的可控采样能力。该方法结合 [[replay buffer]]、[[hindsight experience replay]] 以及 [[reward shaping|reward sharpening]] 等设计，以缓解硬约束带来的[[reward sparsity|稀疏奖励]]和训练不稳定问题。

## 关键点

- 核心思想是把条件从“偏好权重”改为“目标区域”，直接约束生成结果落在指定的 goal / focus region 内。
- focus region 用目标方向和余弦相似度阈值定义，只有满足区域条件的分子才获得正奖励，区域外奖励为 0。
- 相比 [[preference-conditioning]]，[[goal-conditioning]] 在凹形或复杂 Pareto front 上更能均匀覆盖[[目标空间]]，也更可控。
- 由于硬约束会导致奖励稀疏，方法使用 replay buffer 和 hindsight [[replay buffer|experience replay]] 来提高训练稳定性。
- 通过 reward sharpening 和 [[reward shaping|limit reward coefficient]]，模型会更偏向 focus region 的中心而非边界样本。
- 针对不可行目标方向，作者提出 [[Tab-GS]] 来调整 goal 采样分布，提高采样效率。

## 别名

- Goal-conditioned GFlowNets
- goal-conditioned GFN
- Goal-conditioned Generative Flow Networks
- 目标条件GFlowNets

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
