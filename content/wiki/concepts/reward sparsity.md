---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子设计与GFlowNet"
background: "included"
---
# reward sparsity

## 标准定义

reward sparsity（奖励稀疏性）指环境或任务中，只有少数状态、动作或样本能够获得非零奖励，而大多数轨迹/样本的回报为零或接近零的现象。它通常会降低学习信号密度，使优化更难、收敛更慢，并增加探索难度。常见于[[强化学习]]、组合优化和[[controllable generation|条件生成]]任务中，尤其是在需要满足严格约束或命中特定[[focus region|目标区域]]时。

## 在本知识库中的用法

在该论文语境中，reward sparsity主要来自 [[goal-conditioning|goal-conditioned]] [[GFlowNet]] 的 hard constraint 设计：只有落入指定 [[focus region]] 的分子才获得正奖励，区域外奖励为 0。作者明确把这种稀疏性视为训练不稳定的重要来源之一，因此使用 [[replay buffer]] 和 [[hindsight experience replay]] 来复用历史轨迹、缓解有效样本不足，并通过 [[Tab-GS]] 降低无效 goal 的采样浪费。

## 关键点

- 标准上，reward sparsity 是指奖励信号过于稀少，导致模型很难从随机探索中获得足够反馈。
- 在本库论文中，稀疏性来自对 focus region 的硬约束：只有满足目标区域条件的分子才有奖励，区域外样本一律为 0。
- 这种设计提升了目标可控性，但会显著增加探索难度，并可能让训练更依赖有效轨迹的再利用。
- 论文用 [[hindsight experience replay]] 把部分“原本失败”的轨迹重新标注为其他 goal 下的成功样本，以缓解稀疏奖励问题。
- reward sparsity 与 [[goal-conditioned GFlowNet]] 的结合，体现了“更强约束”与“更难优化”之间的典型权衡。

## 别名

- 稀疏奖励
- 奖励稀疏性
- sparse reward
- reward sparsity

## 外部背景

- 在强化学习中，稀疏奖励常见于到达终点才给奖励的导航、游戏和机器人任务；这是奖励设计中的经典难点。
- 常见缓解手段包括 [[reward shaping]]、curriculum learning、探索增强、[[replay buffer|经验回放]]等。
- [[hindsight experience replay]] 是处理稀疏奖励的经典思路之一：把失败轨迹按“如果目标换成已到达状态”来重解释，从而增加正样本。
- 在生成建模与组合优化中，稀疏奖励往往意味着只有少数高质量候选可提供学习信号，因此常与多样化采样或搜索策略结合使用。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
