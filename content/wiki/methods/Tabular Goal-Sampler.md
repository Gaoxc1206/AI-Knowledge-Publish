---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子设计"
---
# Tabular Goal-Sampler

## 定义

Tabular Goal-Sampler（[[Tab-GS]]）是论文中用于 [[fragment-based molecule generation|goal-conditioned GFlowNets]] 的目标采样策略，用来维护不同 goal direction 的可行性统计，并据此调整[[focus region|目标区域]]的采样概率。它在训练初期采用较均匀的 goal 采样，随后根据已观察到的成功情况降低不可行方向的采样频率，以减少对无效目标的计算浪费。论文还提到在训练后期会固定 [[GFlowNet-based Goal Sampler|goal sampler]] 的分布，便于模型进一步微调。其核心作用是提高在多[[目标空间]]中的采样效率与训练稳定性。

## 关键点

- 用于 [[goal-conditioning|goal-conditioned]] [[GFlowNets]] 中的目标方向/目标区域采样。
- 通过统计不同 goal direction 的可行性，减少对不可行目标的采样。
- 训练初期偏向均匀采样，后期根据成功经验重新加权采样分布。
- 论文中提到训练到 25% 后开始降低不可行方向概率，75% 后停止更新 goal sampler。
- 主要服务于 3 目标和 4 目标任务，以提升采样效率。
- 与 hard constraint 下的[[reward sparsity|稀疏奖励]]问题相关，属于配套采样机制。

## 别名

- Tab-GS
- Tabular Goal Sampler
- Learned Goal Distribution

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
