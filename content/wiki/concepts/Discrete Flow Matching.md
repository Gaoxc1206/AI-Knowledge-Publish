---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "离散生物序列生成"
background: "included"
---
# Discrete Flow Matching

## 标准定义

Discrete [[Flow Matching]]（[[Flow Matching|DFM]]）是一类面向离散状态空间的生成建模方法，目标是在不依赖连续嵌入松弛的前提下，学习从简单先验分布到数据分布的时间依赖转移规律。它通常把生成过程写成 [[连续时间马尔可夫链]] 或离散跳跃过程，学习每个时间步的 token 转移速率或 [[velocity field]]，再通过逐步采样生成最终序列。与连续流匹配相比，DFM 更强调在离散 token 空间中直接建模转移结构。

## 在本知识库中的用法

在本知识库的上下文中，DFM 主要作为离散生物序列生成底座出现。[[MOG-DFM]] 以预训练 DFM 为先验，在采样阶段对 token 转移速率做多目标重加权，并结合自适应 hypercone 过滤，把序列逐步推向多个性质的 [[Pareto front]] 附近。第二篇论文则把 DFM 相关的[[离散流模型|离散流]]建模视为背景，强调 [[Rectified Discrete Flows]] 可缓解离散流中的 [[factorization error]]，并据此讨论在离散 token 空间里进行多目标引导采样的设计思路。

## 关键点

- DFM 面向离散 token 序列，适合蛋白、肽段、DNA 等生物序列的直接生成，不需要先映射到[[连续隐空间|连续潜空间]]。
- 其核心是学习时间相关的转移率/[[velocity field]]，用 [[连续时间马尔可夫链]] 形式描述从噪声或简单分布到数据分布的演化。
- 在 MOG-DFM 中，DFM 不是单独做生成，而是作为多目标引导的载体：候选 token 的局部改进会被多个性质分数共同重加权。
- DFM 的逐步采样机制便于插入局部控制策略，例如[[Directional alignment|方向一致性]]判断、自适应过滤和 [[Euler采样]]。
- 本库中的相关论文都把 DFM 视为离散生物序列[[controllable generation|可控生成]]的重要基础，但多目标 Pareto 控制需要额外引导机制才能实现。

## 别名

- DFM
- Discrete Flow Matching
- 离散流匹配

## 外部背景

- 离散版 flow matching 通常可理解为把连续流匹配推广到 token 状态空间，用离散转移而不是连续轨迹来表达生成过程。待核对经典来源
- 常见实现会把生成过程写成 jump process 或 [[连续时间马尔可夫链]]，并通过 [[Kolmogorov forward equation|forward equation]] 描述边际分布演化。待核对经典来源
- 与离散 diffusion 方法相比，DFM 更强调直接学习状态之间的转移结构，而不是先加噪再逐步去噪。待核对经典来源
- Rectified Discrete Flows 常被视为 DFM 的一个改进方向，用于降低 factorization error、改善离散生成质量。待核对经典来源

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
