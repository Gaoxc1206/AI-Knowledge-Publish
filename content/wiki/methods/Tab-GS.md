---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# Tab-GS

## 定义

Tab-GS（[[Tabular Goal-Sampler]]）是论文中提出的一种目标采样策略，用于 [[fragment-based molecule generation|goal-conditioned GFlowNets]]。在训练中，它根据已观察到的成功情况维护不同 goal direction 的可行性统计，并调整各[[focus region|目标区域]]的采样概率，从而减少对不可行目标的无效采样。该方法在训练后期固定目标分布，以便模型更稳定地微调并提升采样效率。

## 关键点

- 用于 [[goal-conditioning|goal-conditioned]] [[GFlowNets]]，而不是 [[preference-conditioning|preference-conditioned]] 的[[标量化]]偏好输入。
- 训练初期对 goal directions 近似均匀采样；在训练到 25% 后降低不可行方向的采样概率。
- 训练到 75% 后停止更新 [[GFlowNet-based Goal Sampler|goal sampler]]，使 goal distribution 固定，便于微调。
- 未归一化采样权重与“是否从未采样/是否存在最接近该方向的样本”有关。
- 主要用于 3 目标和 4 目标任务，以提高采样效率。
- 其目的是避免在 hard constraint 下反复采样不可行 goal，减少资源浪费。

## 别名

- Tabular Goal-Sampler
- Tab-GS

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
