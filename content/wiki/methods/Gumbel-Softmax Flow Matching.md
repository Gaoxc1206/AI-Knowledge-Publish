---
type: "method"
status: "enriched"
category: "生成模型"
domain: "可控生物序列设计"
---
# Gumbel-Softmax Flow Matching

## 定义

['待从更多论文中补充。当前给定上下文主要描述的是一种[[Discrete Flow Matching|离散流匹配]]的多目标引导方法 [[MOG-DFM]]，而不是明确的 Gumbel-Softmax [[Flow Matching]]。', '相关方法的核心是在离散序列生成过程中，对预训练 [[Discrete Flow Matching]] 的 token 级转移速率进行多目标重加权，并结合 trade-off 方向逐步采样。', '该方法通过 rank-directional scoring 和 [[Adaptive hypercone|adaptive hypercone filter]]ing，推动生成序列向多个性质的 [[Pareto front]] 附近靠近，但文中也明确说明不保证 Pareto optimal。']

## 关键点

- 基于预训练的 Discrete Flow Matching 生成器，在离散状态空间中直接建模序列生成。
- 使用多个预训练标量打分函数作为多目标性质评估，并生成目标序列的 Pareto 风格采样。
- 通过 trade-off [[Preference Vector|权重向量]] ω 和 hybrid rank-directional score，对原始转移速率进行重加权。
- 引入 adaptive [[Adaptive hypercone|hypercone filter]]ing，只保留与目标方向一致的候选 token 转移，并根据 rejection rate 动态调整角度。
- 采样阶段使用 [[CTMC]] 的 [[Euler sampling]]，在引导后的 transition rate 上进行逐步跳转。
- 应用场景包括[[肽段设计]]和 enhancer DNA 设计，展示了较好的多目标权衡能力。

## 别名

- MOG-DFM
- Multi-Objective-Guided Discrete Flow Matching
- Discrete Flow Matching
- 多目标引导离散流匹配

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
