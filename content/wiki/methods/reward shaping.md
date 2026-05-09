---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子设计"
---
# reward shaping

## 定义

在该论文中，reward shaping 指对[[focus region|目标区域]]内的奖励进行再设计，以增强 [[fragment-based molecule generation|goal-conditioned GFlowNets]] 的可控性与目标命中精度。具体做法是：只有落入 [[focus region]] 的分子才获得正奖励，区域外奖励为 0；同时引入 reward coefficient 对区域边界附近的奖励进行衰减，使模型更偏向生成目标区域中心附近的样本。该策略主要用于缓解硬约束带来的[[reward sparsity|稀疏奖励]]问题，并提升对 [[Pareto front]] 指定区域的采样效果。

## 关键点

- 用于 [[goal-conditioning|goal-conditioned]] [[GFlowNets]] 中的奖励再设计，而不是传统 [[preference-conditioning]] 的[[奖励标量化|加权和奖励]]。
- focus region 之外的样本奖励设为 0，形成 hard constraint。
- 在 focus region 内引入 reward coefficient，对边界样本进行衰减，鼓励更靠近目标区域中心的分子。
- 该设计的目标是提高 goal-reaching accuracy 和采样可控性。
- 由于硬约束会带来稀疏奖励，论文结合 [[replay buffer]] 和 [[hindsight experience replay]] 缓解训练不稳定。

## 别名

- 奖励塑形
- reward shaping
- reward sharpening
- limit reward coefficient

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
