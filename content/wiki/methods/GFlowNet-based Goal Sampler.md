---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# GFlowNet-based Goal Sampler

## 定义

一种用于 Goal-conditioned [[GFlowNet]] 的目标采样机制，用来根据已观察到的成功情况自适应调整各个 goal direction 的采样概率。其核心目的是减少对不可行[[focus region|目标区域]]的无效采样，提高训练效率，并帮助模型更稳定地覆盖[[目标空间]]中的可行区域。论文中该设计也被称为 [[Tabular Goal-Sampler]]（[[Tab-GS]]），用于[[多目标分子设计]]中的目标分布学习。

## 关键点

- 维护每个 goal direction 的可行性统计，并据此调整后续采样分布。
- 训练初期对目标方向进行均匀采样；约在训练 25% 后，降低不可行方向的采样概率。
- 约在训练 75% 后停止更新 goal sampler，使目标分布固定，便于模型微调。
- 未归一化采样权重基于目标方向是否从未采样、是否存在最接近该方向的样本等规则。
- 主要用于 3 目标和 4 目标任务，以缓解 hard constraint 带来的奖励稀疏和采样低效问题。

## 别名

- Tab-GS
- Tabular Goal-Sampler
- learned goal distribution
- goal sampler

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
