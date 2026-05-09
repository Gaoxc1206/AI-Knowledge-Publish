---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# OPRO

## 定义

待从更多论文中补充。当前上下文仅能确认：在 [[MOLLM]] 相关工作中，[[Large Language Model]] 被直接用作[[分子优化]]中的[[crossover|交叉]]与[[mutation|变异算子]]，并结合 [[in-context learning]]、[[prompt engineering]]、[[Pareto front selection]] 和 [[F-value selection]] 来进行[[多目标分子优化]]。由于上下文没有明确说明 OPRO 的完整定义及其与该方法的对应关系，暂不做进一步推断。

## 关键点

- 待从更多论文中补充；当前证据不足以确认 OPRO 的标准定义。
- 上下文中可确认的相关做法是：用 [[Large Language Model|LLM]] 直接生成分子子代，而不是依赖额外训练的生成模型。
- 该流程包含基于父代分子性质的 prompt 设计，用于在生成阶段注入目标信息与搜索方向。
- 多目标场景下，选择阶段显式使用 F-value selection 或 [[Pareto front]] selection，以兼顾多个性质目标。
- 该上下文还提到初始种群、[[oracle budget]] 与 [[ExpeL|experience pool]] 会影响优化效果，但这些信息不能直接视为 OPRO 的定义。

## 别名

- 无

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
