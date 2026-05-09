---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# ParetoFlow

## 定义

ParetoFlow 是一种基于 flow matching 的多目标生成/优化方法，用于在连续空间中朝 [[Pareto front]] 方向采样。根据给定上下文，它被作为离散生物序列[[多目标优化]]工作的对照方法之一。上下文指出其主要工作于连续空间，用于离散序列时通常需要连续嵌入，可能扭曲离散分布。

## 关键点

- 基于 flow matching，在连续空间中进行多目标引导采样。
- 目标是生成接近 Pareto front 的样本，而不是只优化单一性质。
- 在本文上下文中被视为连续空间方法，作者认为其用于离散生物序列时需要连续嵌入，可能带来分布扭曲。
- 被用作离散生物序列多目标优化场景中的相关对照背景。
- 更细的算法细节和具体实验结论：待从更多论文中补充

## 别名

- Pareto Flow

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
