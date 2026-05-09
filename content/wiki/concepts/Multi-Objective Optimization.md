---
type: "concept"
status: "enriched"
category: "优化问题"
domain: "多目标优化"
background: "included"
---
# Multi-Objective Optimization

## 标准定义

[[多目标优化]]（[[multi-property optimization|multi-objective optimization]], [[多目标优化|MOO]]）是指在同一问题中同时优化多个彼此冲突或不完全一致的[[黑盒 oracle|目标函数]]。与单目标优化不同，MOO 通常不存在对所有目标都最优的单一解，因此更常用 [[Pareto optimality]]、[[Pareto front]] 来刻画一组不可互相支配的折中解。常见做法包括 [[scalarization]]、约束化、分层优化、搜索/[[进化算法]]以及基于偏好或目标条件的生成式方法。

## 在本知识库中的用法

在本知识库给定上下文中，多目标优化主要出现在两类任务：一类是[[多目标分子设计]]，联合优化 binding、[[QED]]、SA、toxicity、EC50 等性质，强调在 [[Pareto front]] 上更均匀、可控地探索；另一类是[[大语言模型对齐]]，把有用性、无害性、长度、幽默性等多个 reward 一起优化。相关工作分别使用 [[preference-conditioning]]、[[goal-conditioned reinforcement learning]]、遗传式选择、以及多目标 [[PPO]]/[[梯度聚合|梯度组合]]等思路处理冲突目标。

## 关键点

- 多目标优化的核心不是找到“唯一最优”，而是寻找一组代表不同权衡的 [[Pareto front]] 解。
- 当目标之间存在冲突时，简单 [[scalarization]] 往往会对权重和前沿形状敏感，可能偏向极端点或覆盖不均。
- 在分子设计中，多目标优化常对应性质折中：既要高活性，又要可合成、低毒性和较好的药物相似性。
- 在本知识库里，GFlowNet 路线强调用 [[goal-conditioned reinforcement learning]] 显式指定目标区域，而不是只用偏好权重。
- 在大语言模型对齐里，多目标优化被用来同时平衡多个 reward，并追求 [[Pareto optimality]] 意义下的稳定折中。
- 多目标优化的评估不仅看最终分数，还要看覆盖度、均匀性、可控性以及对不同目标区域的适应能力。

## 别名

- 多目标优化
- MOO
- multi-objective optimization
- Pareto optimization

## 外部背景

- 经典教材通常将 MOO 分为标量化法、进化多目标算法、基于 Pareto 支配的搜索与约束处理等几类，待核对经典来源。
- 与单目标优化相比，MOO 常引入支配关系、非支配排序、超体积（hypervolume）等指标来评价解集质量，待核对经典来源。
- 许多工程与机器学习问题可写成多目标优化，例如资源分配、控制、推荐、药物发现与模型对齐，待核对经典来源。
- 多目标优化中的偏好可以是显式给定的，也可以通过交互式搜索、偏好学习或条件生成的方式逐步确定，待核对经典来源。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
