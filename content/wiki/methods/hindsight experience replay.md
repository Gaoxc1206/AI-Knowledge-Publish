---
type: "method"
status: "enriched"
category: "强化学习方法"
domain: "多目标分子设计"
---
# hindsight experience replay

## 定义

Hindsight [[replay buffer|experience replay]]（HER）是一种配合 [[replay buffer]] 使用的训练方法，用于缓解硬约束或[[reward sparsity|稀疏奖励]]场景下的学习困难。在这篇工作中，它会把过去采样到的轨迹重新标注为其他 [[focus region|goal region]] 下的“成功经验”，从而让原本未命中目标的样本也能参与训练。它的作用是提高训练稳定性，并帮助模型更有效地学习不同[[focus region|目标区域]]的生成策略。

## 关键点

- 在目标条件 [[GFlowNet]] 中，HER 与 replay buffer 配合使用。
- 它会对历史轨迹进行重新标注：如果某条轨迹落入了另一个 goal region，就将其视为该目标下的成功样本。
- 这样可以缓解 hard constraint 带来的奖励稀疏问题。
- 它也有助于减少训练不稳定，提高采样效率。
- 在该论文中，HER 是为 [[goal-conditioning|goal-conditioned]] 设定服务的辅助训练机制，具体实现细节待从更多论文中补充。

## 别名

- HER
- hindsight replay
- hindsight relabeling

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
