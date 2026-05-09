---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多目标分子设计"
---
# hard constraint conditioning

## 定义

在该论文中，hard constraint conditioning 指将 [[GFlowNet]] 条件化到一个明确的[[focus region|目标区域]]（[[focus region]]）上，而不是仅输入偏好权重进行软约束。模型只对落入指定目标区域的分子赋予正奖励，区域外奖励为 0，从而让生成过程更可控。该方法的目标是让模型沿用户指定的 trade-off 方向，更均匀地覆盖 [[Pareto front]]。相比 [[preference-conditioning]]，它强调“生成到哪个区域”而不是“更偏好哪些目标”。

## 关键点

- 用 goal direction 和余弦相似度阈值定义 focus region，可将[[目标空间]]看作一个锥形区域。
- 奖励是硬约束形式：只有落入目标区域的样本才获得正奖励，区域外样本奖励为 0。
- 这种设定增强了生成的可控性，使用户可以显式指定希望探索的目标区域。
- 论文指出，hard constraint 会带来奖励稀疏，因此配合 [[replay buffer]] 和 [[hindsight experience replay]] 以稳定训练。
- 为减少靠近区域边界的样本，作者还引入 [[reward shaping|reward sharpening]] / [[reward shaping|limit reward coefficient]]。
- 对于不可行目标区域，论文提出 [[Tab-GS]] 以降低无效 goal 的采样比例，提高采样效率。

## 别名

- goal conditioning
- goal-conditioned conditioning
- focus region conditioning
- 目标条件化
- 硬约束条件化

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
