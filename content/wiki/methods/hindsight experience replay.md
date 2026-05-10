---
type: "method"
status: "enriched"
category: "强化学习方法"
domain: "多目标分子生成与强化学习"
background: "included"
---
# Hindsight Experience Replay

## 标准定义

Hindsight Experience Replay（HER）是一类用于稀疏奖励强化学习的经验重标注方法：把一条轨迹在“原始目标”下看作失败后，再用轨迹中实际达到的状态或结果替换目标，构造新的训练样本，从而让失败经验也能提供有效学习信号。它常与[[经验回放]]结合使用，核心作用是把“没完成原目标”的轨迹转化为“完成了另一个实际达成目标”的正样本。

## 在本知识库中的用法

在这篇工作中，HER 用来缓解 goal-conditioned [[GFlowNet|GFlowNets]] 中 hard constraint 带来的稀疏奖励问题：由于只有落入[[目标区域]]的分子才得到非零奖励，大量轨迹会得到 0 奖励，因此作者结合 replay buffer 和 hindsight experience replay，对未达到原目标的轨迹进行目标重标注，使其仍能提供训练信号。

## 关键点

- HER 的核心是“事后改写目标”：将失败轨迹按其实际结果重新解释为成功轨迹。
- 它主要解决稀疏奖励和样本效率问题，特别适合目标明确但达成困难的任务。
- 在本知识库对应论文中，HER 不是独立主方法，而是配合 [[Replay Buffer]] 稳定训练的辅助机制。
- 这里的使用场景是 goal-conditioned [[GFlowNet]]s：原目标区域未命中时，轨迹仍可通过重标注贡献学习信号。
- 该用法与 [[Reward Shaping]] 共同服务于对目标区域（[[目标区域|focus region]]）的更稳定学习。

## 别名

- HER
- Hindsight Experience Replay
- 事后经验回放
- 目标重标注经验回放

## 外部背景

- HER 最早常见于目标导向强化学习，用于把稀疏奖励问题转化为更密集的监督信号。
- 经典做法会从同一条轨迹中采样“未来达成的状态”作为新目标，形成额外训练样本。
- HER 与经验回放常配套使用，后者负责复用历史轨迹，前者负责为历史轨迹赋予新的目标语义。
- 待核对经典来源

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
