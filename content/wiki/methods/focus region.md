---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# focus region

## 定义

focus region 是[[目标空间]]中的一个指定区域，用来表示用户希望模型重点探索的目标折中范围。本文中它由目标方向 d_g 和余弦相似度阈值 c_g 共同定义，满足条件的 reward vector 被认为落入该区域。它在 [[fragment-based molecule generation|goal-conditioned GFlowNets]] 中作为显式条件，用于让生成模型更可控地采样 [[Pareto front]] 上的特定区域。只有落入该区域的样本才获得正奖励，否则奖励为 0。

## 关键点

- focus region 被定义为目标空间中的锥形区域，而不是单一标量偏好。
- 判定条件基于 reward vector 与目标方向 d_g 的余弦相似度是否达到阈值 c_g。
- 该区域内的样本获得奖励，区域外样本奖励为 0，属于硬约束形式。
- 它用于替代或区别于 [[preference-conditioning]] 的软偏好输入，提高生成目标的可控性。
- 在[[多目标分子设计]]中，focus region 可对应不同 trade-off 方向，帮助更均匀地覆盖 Pareto front。

## 别名

- goal region
- target region
- 目标区域
- 目标锥区域
- cone region

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
