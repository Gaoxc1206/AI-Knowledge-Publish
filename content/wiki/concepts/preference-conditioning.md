---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子设计"
background: "included"
---
# preference-conditioning

## 标准定义

preference-conditioning（偏好条件化）是指：把用户的偏好表示（通常是[[Preference Vector|偏好向量]]、[[Preference Vector|权重向量]]或目标约束信息）作为条件输入给模型，使模型在生成或优化时朝向不同的 trade-off 方向。它常与[[标量化]]结合使用，即把多个目标按偏好加权成单一标量奖励/目标，再据此训练[[条件生成模型]]或优化器。直观上，它回答的是“我更重视哪些目标”，而不是直接指定“结果应落在[[目标空间]]的哪个区域”。

## 在本知识库中的用法

在这篇论文里，preference-conditioning 特指[[多目标分子设计]]中的 baseline 做法：将偏好向量 $w$ 输入 [[GFlowNet]]，并用[[奖励标量化|加权和奖励]] $\sum_k w_k r_k$ 训练模型。作者把它视为一种软约束方法：它能表达目标权重，但不能直接保证生成样本落在用户关心的[[focus region|目标区域]]，因此在凹形或更复杂的 [[Pareto front]] 上容易偏向极端点，难以均匀覆盖整个[[Pareto front]]。本文正是以它为对比对象，提出用 [[goal-conditioning]] 替代这种偏好条件化。

## 关键点

- 本质上是“用偏好控制生成/优化方向”的条件化框架，常见条件是[[偏好向量]]或目标权重。
- 通常通过[[标量化]]把多目标问题转成单一奖励，再训练模型或搜索解。
- 在多目标[[分子设计]]中，它能让同一模型对应不同偏好设定，但控制粒度较粗。
- 在该文中，preference-conditioning 被明确当作 GFlowNet 的对照基线，用于生成按权重折中后的分子。
- 论文指出，这种软约束在复杂目标空间里可能导致采样偏向极端解，而不是均匀覆盖中间 trade-off 区域。
- 相较之下，本文提出的 goal-conditioning 是更强的区域级控制方式。

## 别名

- 偏好条件化
- preference conditioning
- 条件偏好优化
- 偏好引导生成

## 外部背景

- 常见实现是把偏好权重拼接到模型输入，或直接进入 reward 计算流程。
- 在多目标优化里，preference-conditioning 与加权和法、线性标量化密切相关。
- 它也常出现在推荐系统、偏好学习和对话生成中，作为个性化控制机制。
- 待核对经典来源：不同论文对 preference-conditioning、conditioned optimization、utility conditioning 的命名并不完全一致。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
