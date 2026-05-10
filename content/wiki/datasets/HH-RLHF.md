---
type: "dataset"
status: "enriched"
category: "数据集"
domain: "语言模型对齐"
background: "included"
---
# HH-RLHF

## 标准定义

HH-[[强化学习从人类反馈|RLHF]] 通常指用于 [[RLHF]] 的人类偏好数据集，名称中的 HH 一般对应 [[Helpful Assistant|helpfulness]] 与 harmlessness 两类偏好或约束；这类数据通常用于训练 [[奖励模型]] 或直接支持策略优化，使语言模型更符合人工标注的偏好与安全要求。

## 在本知识库中的用法

在这篇论文的上下文中，HH-RLHF 被作为 [[GPT-2 XL]] 1.5B 的附加验证设置之一，用来观察 [[PAreto Multi-Objective Alignment|PAMA]] 在 length reward 和 humor reward 上是否优于 baseline。当前摘录只明确了它被用于实验对比，未提供该数据集的具体构造、规模、标注方式或任务细节，待从更多论文中补充。

## 关键点

- HH-RLHF 是一种面向 [[RLHF]] 的偏好数据集，通常围绕 helpfulness / harmlessness 等目标构建。
- 它常用于训练奖励模型、做策略微调，或作为多目标[[大语言模型对齐|对齐]]实验中的偏好来源。
- 在本文中，HH-RLHF 主要承担实验设置角色，用于验证 PAMA 在多目标 reward 上的表现。
- 本文未给出 HH-RLHF 的数据构成与标注流程，相关细节待从更多论文中补充。

## 别名

- Helpful-Harmless RLHF
- HH dataset
- Helpful and Harmless RLHF

## 外部背景

- HH-RLHF 常被视为 Anthropic 系列对齐数据的代表之一，常见于安全对齐与偏好对齐研究，待核对经典来源。
- 这类数据集通常包含成对或排序式的人类偏好标注，供 [[奖励模型]] 学习偏好方向。
- 在安全对齐语境中，HH 往往被理解为 helpfulness 与 harmlessness 的组合，待核对经典来源。

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
