---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子生成与优化"
background: "included"
---
# Multi-objective GFlowNets

## 标准定义

Multi-objective [[GFlowNet|GFlowNets]] 是将 [[GFlowNet]] 扩展到多目标设置的一类[[可控生成|条件生成]]方法：模型在多个目标维度上学习生成与奖励相匹配的分布，并尽量覆盖 [[Pareto front]] 上不同的权衡解。常见做法包括使用偏好向量、目标向量或其他条件来控制生成；相较于简单 [[标量化]]，这类方法更强调在[[目标空间]]中的可控采样与多样性。

## 在本知识库中的用法

在本知识库对应论文中，该方法特指 goal-conditioned [[GFlowNet]]s：不再用偏好权重做线性标量化，而是直接把目标空间中的 focus region 作为条件，让[[分子生成]]落入指定目标区域。论文将其用于可控多目标[[分子生成|分子设计]]，重点解决凹形或复杂 [[Pareto Front|Pareto front]] 上中间折中区域覆盖不足的问题，并结合 replay buffer、hindsight experience replay、reward shaping 和 Tab-GS 来缓解稀疏奖励与不可行目标采样。

## 关键点

- 核心区别是从 preference conditioning 转向目标条件化：模型接收目标方向或 focus region，而不是只接收权重向量。
- 该方法面向 [[Pareto front]] 的均匀覆盖，尤其适合线性 [[标量化]] 难以覆盖的凹形或复杂前沿。
- 训练时用 hard constraint 定义目标区域内的奖励，并通过 [[reward shaping]]、[[replay buffer]] 和 [[hindsight experience replay]] 缓解稀疏反馈。
- 论文引入 Tab-GS 作为 learned goal distribution，用简单的可行性统计降低不可行目标方向的采样概率。
- 生成器采用 fragment-based 分子构造框架，并用 [[Graph Transformer]] 处理带条件信息的图状态。

## 别名

- Goal-conditioned GFlowNet
- GC-GFlowNet
- 目标条件 GFlowNet
- 目标条件生成流网络
- Goal-conditioned GFlowNets
- 多目标 GFlowNets
- 目标条件 GFlowNets
- GC-GFN
- GFN-GS

## 外部背景

- [[GFlowNet]] 旨在学习与奖励成比例的生成分布，常用于需要多样化采样的组合与生成问题。待核对经典来源
- [[多目标优化]]通常以[[Pareto Dominance|支配关系]]和 [[Pareto front]] 描述解之间的权衡，而不是只追求单一最优点。
- 线性标量化和偏好加权在工程上简单，但对非凸前沿可能出现覆盖偏置。待核对经典来源
- replay buffer 与 hindsight experience replay 常用于稀疏奖励场景，以提高可学习信号的密度。待核对经典来源

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
