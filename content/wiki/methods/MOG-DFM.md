---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标生物序列设计"
---
# MOG-DFM

## 定义

MOG-[[Discrete Flow Matching|DFM]]（[[Dirichlet Flow Matching|Multi-Objective-Guided Discrete Flow Matching]]）是在预训练[[Discrete Flow Matching|离散流匹配]]（[[Discrete Flow Matching]], DFM）生成器上加入多目标引导的采样方法，用于离散生物序列生成。它在每一步 token 转移时结合多个预训练标量评分函数，对候选替换进行 rank-directional 打分并重加权转移速率，同时通过自适应 hypercone 过滤保持与给定 trade-off 方向一致。该方法旨在让生成序列朝多目标的 [[Pareto front]] 区域靠近，但论文明确指出不保证 Pareto optimal。

## 关键点

- 基于 [[CTMC]] 形式的[[离散流模型|离散流]]匹配，在离散 token 级别直接进行多目标引导采样。
- 使用[[Preference Vector|权重向量]] ω 表示多目标 trade-off 偏好，并通过 [[Das–Dennis simplex lattice]] 覆盖不同方向。
- 用 hybrid rank-directional score 结合局部改进 rank 与[[Directional alignment|方向一致性]]，对原始 transition rate 进行重加权。
- 通过 [[Adaptive hypercone|adaptive hypercone filter]] 只保留与 ω 方向相近的候选转移，并根据 rejection rate 自适应调整角度。
- 支持在[[肽段设计]]和 enhancer DNA 设计等任务中进行多目标控制采样。

## 别名

- Multi-Objective-Guided Discrete Flow Matching
- MOG-DFM

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
