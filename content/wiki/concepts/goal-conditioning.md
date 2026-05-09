---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子设计"
background: "included"
---
# goal-conditioning

## 标准定义

goal-conditioning（[[hard constraint conditioning|目标条件化]]）是指把“期望达到的目标”显式作为模型输入条件，使模型在给定目标 g 的前提下生成、决策或采样对应结果。与只学习总体分布不同，它强调“在什么目标下做什么事”，常见于[[强化学习]]和[[条件生成]]：目标可以是离散标签、连续向量，也可以是[[目标空间]]中的一个区域。

## 在本知识库中的用法

在《[[Goal-conditioned GFlowNets]] for Controllable Multi-Objective Molecular Design》中，goal-conditioning 被用来替代传统的 [[preference-conditioning]]：模型不再仅接收偏好权重，而是接收目标方向/[[focus region|目标区域]]（[[focus region]]），并学习在该区域内生成分子。这里的目标是多目标性质空间中的锥形区域，落入该区域的分子才获得正奖励，区域外奖励为 0。论文还结合了 [[replay buffer]]、[[hindsight experience replay]] 和 [[Tab-GS]] 来缓解硬约束带来的[[reward sparsity|稀疏奖励]]与不可行目标问题。

## 关键点

- 标准上，goal-conditioning 是一种“以目标为条件”的建模方式，可将生成或决策任务从无条件学习转为面向指定目标的可控生成。
- 在该论文中，goal-conditioning 具体对应于给定一个 goal direction 和 focus region，让 [[GFlowNet]] 在多目标分子设计中定向探索目标空间。
- 它与 preference-conditioning 的核心区别在于：前者强调“落入某个目标区域”的硬约束，后者更像对多个目标的软加权偏好。
- 论文中的 goal region 由目标向量与余弦相似度阈值定义，因此可以把用户想要的 trade-off 直接编码成目标空间中的一个区域。
- 为了应对硬约束导致的稀疏奖励，作者结合了 [[hindsight experience replay]] 和 replay buffer，让轨迹可以被重新标注为其他可达目标的成功样本。
- 这种用法的目标不是只找到单个最优点，而是更均匀、更可控地覆盖 [[Pareto front]] 的不同区域。

## 别名

- 目标条件化
- goal-conditioned
- 目标导向条件化

## 外部背景

- goal-conditioned reinforcement learning：将目标作为条件输入，训练策略在不同目标下执行对应行为；待核对经典来源。
- 条件生成模型中的 goal-conditioning：常见于文本、图像和分子生成，用目标属性或目标向量控制输出；待核对经典来源。
- 多目标优化中的目标区域控制：不是优化单一标量，而是直接指定可接受的目标子区域；待核对经典来源。
- 在生成式建模里，goal-conditioning 通常比纯无条件采样更强可控，但也更依赖目标定义是否可行。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
