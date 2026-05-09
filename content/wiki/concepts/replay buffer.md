---
type: "concept"
status: "enriched"
category: "其他"
domain: "多目标分子设计与 GFlowNet"
background: "included"
---
# replay buffer

## 标准定义

Replay buffer（经验回放缓冲区）是一种用于暂存历史样本的数据结构，常保存 transition、trajectory 或完整 episode。训练时从其中[[Weighted Resampling|重采样]]旧数据，可以复用样本、打破相邻样本的相关性，并提升[[离策略学习]]或生成模型训练的稳定性。在一些方法中，replay buffer 还会和[[hindsight experience replay]]结合，用于对历史轨迹进行重新标注。

## 在本知识库中的用法

本文在目标条件[[GFlowNet]]训练中使用 replay buffer 来保存过去采样的轨迹，并从 buffer 中抽样进行训练。由于 hard constraint 会带来[[稀疏奖励]]和训练不稳定，作者进一步结合 [[hindsight experience replay]]，把原本没有命中当前 goal 的轨迹重新标注为其他可行 [[focus region|goal region]] 下的成功样本，以提高训练效率。

## 关键点

- 它的核心作用不是“生成”样本，而是作为历史经验的存储与重用机制，帮助模型反复利用已有轨迹。
- 在本文中，replay buffer 主要服务于[[goal-conditioned GFlowNet]]的稳定训练，尤其是在 reward 只对落入[[focus region]]的样本开放时。
- 与普通经验回放相比，本文更强调将 buffer 中的轨迹做 hindsight 重标注，以缓解目标不可达或奖励过稀的问题。
- 它提升的是训练可用样本的密度和多样性，而不是直接改变奖励定义本身。
- 在[[多目标分子设计]]里，这类缓存机制常用于支持更长时间尺度上的探索与目标覆盖。

## 别名

- 经验回放
- 经验池
- experience replay
- replay memory

## 外部背景

- 经验回放常见于[[离策略学习]]，通常通过随机采样历史经验来降低样本之间的时序相关性。待核对经典来源
- buffer 中可存储单步 transition，也可存储整条 trajectory；具体形式取决于算法设计。待核对经典来源
- 它常与优先经验回放、[[hindsight experience replay]]等变体结合，用于提升[[reward sparsity|稀疏奖励]]任务的学习效率。待核对经典来源
- 在生成模型或组合优化中，replay buffer 也可用于保存高质量历史解，辅助后续的再训练或再采样。待核对经典来源

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
