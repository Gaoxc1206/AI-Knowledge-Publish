---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "计算分子设计"
background: "included"
---
# in-silico molecular design

## 标准定义

in-silico [[分子设计|molecular design]] 指在计算机环境中借助 [[分子表示]]、[[生成模型]]、[[多目标优化]] 等方法，自动搜索、生成或筛选满足给定性质约束的分子；它通常用于[[药物发现]]、[[materials science|材料设计]]与[[先导化合物优化]]等场景，是一种以计算实验替代或加速湿实验迭代的背景概念。

## 在本知识库中的用法

在本知识库对应论文中，in-silico molecular design 主要指药物[[分子设计]]中的多目标生成问题：模型需要同时兼顾 binding energy、[[Synthesizability|synthesizability]]、toxicity、EC50、[[QED]] 等指标，并被要求在 [[Pareto front]] 上按用户指定的[[focus region|目标区域]]进行更可控、更均匀的采样。论文用 [[GFlowNet]] 将生成过程条件化到 [[focus region|goal region]] / [[focus region]] 上，强调从“偏好加权”转向“显式目标区域指定”的控制方式。

## 关键点

- 标准上，它是面向分子空间的计算搜索问题，常与 [[分子表示]]、[[生成模型]] 和 [[多目标优化]] 联用。
- 在该论文语境里，它特指药物分子的多目标设计，不再只追求单一最优分子，而是追求对一组可行 trade-off 的可控覆盖。
- 作者用 goal-conditioned [[GFlowNet]] 取代 preference-conditioning，使模型直接围绕指定的目标方向/区域采样，而不是仅靠标量化偏好权重。
- 为了提高可控性，论文把目标空间中的 focus region 视为硬约束；这种做法能更均匀探索 [[Pareto front]]，但也会带来奖励稀疏与不可行目标的问题。
- 论文还结合 replay buffer、hindsight experience replay 和 Tab-GS 来缓解稀疏奖励、提升可行目标采样效率。

## 别名

- 计算机辅助分子设计
- computational molecular design
- computer-aided molecular design
- CADD

## 外部背景

- 计算分子设计通常是药物发现中的“生成—筛选—迭代优化”流程，目标是同时满足活性、可合成性、选择性和安全性等要求。
- 常见计算范式包括规则/启发式搜索、强化学习、贝叶斯优化与生成模型；其中多目标情形经常借助 [[Pareto front]] 来表达折中解集合。
- 在多目标优化中，标量化是一种常见简化方式，但在非凸前沿上可能偏向极端解，因而需要更直接的区域控制或分布建模；待核对经典来源。
- [[GFlowNet]] 作为一种“按奖励成比例采样”的生成框架，常被用于需要同时保持高质量与多样性的分子生成任务。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
