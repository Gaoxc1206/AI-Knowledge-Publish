---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子设计"
background: "included"
---
# goal-conditioned reinforcement learning

## 标准定义

Goal-conditioned [[强化学习|reinforcement learning]]（目标条件[[强化学习]]）是指：在强化学习中将“目标”作为显式条件输入策略或价值函数，使智能体学习在给定目标 g 时采取动作、到达目标状态或实现目标回报。常见形式是学习条件策略 π(a|s,g) 或条件价值函数 Q(s,a,g)。它通常用于目标可变、目标稀疏或需要[[controllable generation|可控生成]]/控制的任务，并常与 [[reward shaping]]、目标重标记等技巧结合，以缓解[[reward sparsity|稀疏奖励]]问题。

## 在本知识库中的用法

在该论文中，[[goal-conditioning|goal-conditioned]] reinforcement learning 的思想被迁移到 [[GFlowNet]]：模型不再只接收偏好权重，而是显式接收目标方向 d_g，把[[目标空间]]中的一个区域作为条件来控制生成。这里的“goal”不是环境状态，而是多目标性质空间中的 [[focus region]]；只有落入该区域的分子才获得正奖励。作者还结合了 [[replay buffer]] 和 [[hindsight experience replay]]，以及面向不可行目标的 [[Tab-GS]] 采样策略，以提升在复杂 [[Pareto front]] 上的可控性与覆盖均匀性。

## 关键点

- 核心是把目标 g 显式输入策略/生成器，使同一模型能在不同目标下执行不同控制行为，适合 [[multi-objective optimization]] 与可控生成任务。
- 与 [[preference conditioning]] 相比，[[goal-conditioning|目标条件化]]强调“要到哪里”，而不是“更偏好什么”；在本文中这被用来直接指定目标空间中的 focus region。
- 论文将该思想用于 [[GFlowNet]]，通过目标方向 d_g 和区域阈值定义可达区域，并用区域内/外二值奖励约束采样分布。
- 由于硬约束会带来稀疏奖励，训练中借助 [[hindsight experience replay]] 和 [[replay buffer]] 缓解样本稀缺与学习不稳定。
- 该设定的目标是更均匀地覆盖 [[Pareto front]]，尤其是在凹形或多峰目标空间中避免只偏向极端点。

## 别名

- goal-conditioned RL
- GCRL
- 目标条件强化学习
- 目标条件RL

## 外部背景

- 经典目标条件强化学习通常写作学习 π(a|s,g) 或 Q(s,a,g)，其中 g 可以是目标状态、目标图像或目标回报；待核对经典来源。
- 在稀疏奖励任务中，目标重标记（goal relabeling）与 [[hindsight experience replay]] 常被用于提升[[sample efficiency|样本效率]]；待核对经典来源。
- 目标条件方法与层级强化学习、技能条件生成模型等方向常有交叉，但侧重点不同：前者强调“达成指定目标”，后者强调“学习可复用的控制/生成能力”；待核对经典来源。
- 在多目标优化中，目标条件化可被看作比标量化更显式的控制方式，因为它直接面向目标空间中的区域而非单一加权标量；待核对经典来源。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
