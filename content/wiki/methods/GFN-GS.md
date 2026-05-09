---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多目标分子设计"
---
# GFN-GS

## 定义

[[Generative Flow Network|GFN]]-GS 是一种用于可控[[多目标分子设计]]的 [[goal-conditioning|goal-conditioned]] [[GFlowNet]] 方法。它不再只用[[Preference Vector|偏好向量]]进行[[linear scalarization|加权标量化]]，而是直接指定[[目标空间]]中的 [[focus region]]，让模型在给定[[focus region|目标区域]]内采样分子。该方法通过硬约束奖励、[[replay buffer|回放缓冲区]]和 [[hindsight experience replay]] 提升训练稳定性，并用 [[Tab-GS]] 改进目标区域采样效率。

## 关键点

- 用 goal direction 和 cosine similarity 阈值定义目标空间中的 focus region，将生成任务从“[[preference-conditioning|偏好条件化]]”改为“[[goal-conditioning|目标区域条件化]]”。
- 奖励采用硬约束：只有落入指定 [[focus region|goal region]] 的分子才获得正奖励，区域外奖励为 0。
- 为缓解[[reward sparsity|稀疏奖励]]和训练不稳定，方法结合 [[replay buffer]] 与 hindsight [[replay buffer|experience replay]] 复用历史轨迹。
- 引入 [[reward shaping|reward sharpening]] / [[reward shaping|limit reward coefficient]]，使奖励在目标区域边界附近衰减，增强对区域中心的偏好。
- 提出 Tab-GS，根据已观察到的可行性统计调整不同 goal direction 的采样概率，以减少不可行目标的浪费。
- 在复杂或凹形 Pareto front 上，相比 preference-conditioned GFN，GFN-GS 更能均匀覆盖目标空间，并在 Avg-PCC 和 PC-ent 上表现更好。

## 别名

- Goal-conditioned GFlowNets
- Goal-conditioned GFN
- GC-GFN
- 目标条件GFlowNet

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
