---
type: "concept"
status: "enriched"
category: "强化学习方法"
domain: "多目标分子设计"
background: "included"
---
# hindsight experience replay

## 标准定义

Hindsight Experience Replay（HER）是一种用于[[goal-conditioned reinforcement learning]]的[[replay buffer|经验回放]]方法。其核心做法是：把已经发生的轨迹重新解释为“达成了某个其他目标”的成功经验，从而把原本对当前目标而言失败的样本转化为对新目标有监督信号的样本。HER通常用于[[replay buffer]]中存在[[reward sparsity|稀疏奖励]]、成功样本较少的场景，以提升[[sample efficiency|样本效率]]和训练稳定性。

## 在本知识库中的用法

在这篇论文中，hindsight [[replay buffer|experience replay]] 被用来缓解 [[Goal-conditioned GFlowNets|goal-conditioned GFlowNets]] 中因 hard constraint 带来的稀疏奖励问题。做法是从 [[replay buffer]] 里取出历史轨迹后，若某条轨迹虽然没有达到原始 goal，但实际上落入了另一个 [[focus region|goal region]]，就将它重新标注为该 goal 的成功样本并用于训练。作者将其与 replay buffer 结合使用，以提高训练稳定性和对不同[[focus region|目标区域]]的学习效率。

## 关键点

- 标准上，HER属于[[goal-conditioned reinforcement learning]]中的经验重标注技术，重点不是改变轨迹本身，而是改变“这条轨迹对应哪个目标”的解释。
- 它特别适合稀疏奖励任务：即使某条轨迹对原目标失败，也可能对另一个目标是成功样本。
- 在本知识库所对应的论文中，HER主要服务于 [[goal-conditioning|goal-conditioned]] GFlowNets，用于应对 [[focus region]] 的 hard constraint 造成的训练稀疏性。
- 论文中的用法强调“目标区域重标注”：把历史轨迹按其实际落入的 goal region 重新分配训练信号。
- 它与[[replay buffer]]配合使用，目的是提高采样效率，并减少因不可达或难达目标区域导致的无效更新。
- 这一机制更偏向训练技巧/数据重用策略，而不是生成模型结构本身。

## 别名

- HER
- Hindsight Experience Replay
- hindsight replay

## 外部背景

- HER最早在机器人控制和强化学习中广泛使用，常见直觉是“如果没完成原任务，就把已达到的状态当成新任务的目标”。
- 常见变体包括 final、future、episode 等重标注策略；不同策略在样本效率和偏差之间有不同权衡，待核对经典来源。
- HER通常与 off-policy 方法结合更自然，因为它依赖对历史数据进行重用和重标注。
- 在稀疏奖励环境中，HER常被视为一种与[[sparse reward]]互补的训练技巧，能够显著增加有效正样本比例。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
