---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "多目标分子生成"
background: "included"
---
# GFlowNet

## 标准定义

GFlowNet（Generative Flow Network）是一类生成模型框架，目标是学习一个从初始状态到终止状态的随机生成过程，使终止样本的边际分布与其奖励成正比。它通常把生成过程表示为状态转移图上的“流”学习问题，适合在离散组合空间中按奖励分布采样多个高质量解，而不只是寻找单个最优解。

## 在本知识库中的用法

在本知识库的这篇论文中，GFlowNet 被用作 fragment-based [[分子生成]]器：模型从空图出发，逐步添加片段或边，并通过 STOP 动作结束生成。与传统 preference-conditioned GFlowNet 不同，这里将条件从偏好权重改为目标区域（focus region）/goal direction，使模型直接学习生成落入指定多目标区域的分子。论文还结合了 replay buffer、hindsight experience replay 和 Tab-GS 来缓解硬约束奖励稀疏与不可行目标采样的问题，并展示了该方法在复杂 [[Pareto front]] 上比权重标量化更均匀、更可控。

## 关键点

- GFlowNet 的核心目标不是输出单个最优解，而是学习按奖励比例采样一整个高质量解集，适合 [[多目标优化]] 中的多样化候选生成。
- 在这篇论文里，GFlowNet 被改造成 goal-conditioned 形式：给定目标方向与 focus region，生成结果需要落入指定区域，而不是仅仅满足某个偏好权重。
- 论文使用硬约束奖励定义目标区域，并通过 replay buffer 与 hindsight experience replay 缓解稀疏反馈问题。
- 相较于 preference-conditioned 方法，goal-conditioned GFlowNet 在凹形或复杂 [[Pareto Front|Pareto 前沿]]上更能覆盖中间折中区域。
- Tab-GS 用于近似维护目标方向的可行性信念，降低不可行方向的采样概率，提高训练效率。
- 在该上下文中，GFlowNet 主要服务于分子结构生成与多目标可控设计，而不是传统单目标优化。

## 别名

- GFlowNets
- Generative Flow Networks
- GFlowNet
- GFN
- Generative Flow Network
- 生成流网络

## 外部背景

- 经典 GFlowNet 训练通常包含 trajectory balance、flow matching 等目标，用于保证轨迹流量与奖励一致，待核对经典来源。
- GFlowNet 常被视为一种“生成式”而非“判别式”优化方法，强调采样分布的形状而不是只找最优点。
- 它特别适合需要多样解的任务，例如分子生成、子图搜索、组合优化与程序生成。
- 与基于偏好权重的线性标量化不同，GFlowNet 更容易表达“按区域/按条件”采样的需求，待核对经典来源。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
