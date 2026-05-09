---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多目标生物序列设计"
---
# MDLM

## 定义

根据当前笔记，这里对应的是一种在[[Discrete Flow Matching|离散流匹配]]生成过程中加入多目标引导的方法，用于让生成序列朝多个性质的 [[Pareto front]] 方向移动。它以预训练的 [[Discrete Flow Matching]] 生成器和多个预训练标量评分函数为基础，在逐步采样时对 token 转移速率进行重加权。方法还使用自适应 hypercone 过滤来约束候选转移方向，使生成过程更符合用户指定的 trade-off 偏好。该方法在[[肽段设计]]和 enhancer DNA 设计任务中用于多目标权衡，但不保证达到严格的 Pareto optimal。

## 关键点

- 基于预训练 Discrete [[Flow Matching]]，在离散序列空间中直接做多目标引导，而不是先转到连续空间再优化。
- 利用多个预训练 score functions 评价序列的不同目标性质，并将这些分数用于生成时的引导。
- 通过 rank-directional score 同时考虑局部改进幅度和与[[Preference Vector|权重向量]] ω 的[[Directional alignment|方向一致性]]，对转移速率进行重加权。
- 使用 [[Adaptive hypercone|adaptive hypercone filter]] 只保留与目标 trade-off 方向足够一致的候选转移，并根据 rejection rate 自适应调整角度。
- 采用 [[CTMC]] 的 [[Euler sampling]] 进行逐步生成，推动样本接近多目标 Pareto front。
- 在肽段和 enhancer DNA 任务中展示了较好的多目标权衡能力。

## 别名

- MOG-DFM
- Multi-Objective-Guided Discrete Flow Matching
- 多目标引导离散流匹配

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
