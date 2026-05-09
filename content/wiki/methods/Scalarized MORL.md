---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标强化学习"
---
# Scalarized MORL

## 定义

Scalarized [[Multi-Objective Reinforcement Learning|MORL]] 指将多个目标奖励或偏好通过加权和等方式压缩为单一标量目标，再用单目标[[强化学习|强化学习方法]]进行优化的思路。给定笔记中，它主要作为“简单加权和”方法被提及：这种做法高度依赖权重选择，容易偏向部分目标并忽略其他目标。更具体的算法细节与适用边界，待从更多论文中补充。

## 关键点

- 把多个目标合成为一个标量奖励，便于直接套用单目标 [[RLHF]] / [[PPO]]。
- 上下文指出其核心问题是权重选择敏感，容易产生偏置。
- 在冲突目标较多时，可能忽略部分目标，难以充分体现 Pareto 折中。
- 在该论文笔记中，Scalarized MORL 主要作为对比对象和动机背景出现。
- 更具体的实现、变体与理论性质，待从更多论文中补充。

## 别名

- scalarization
- weighted-sum MORL
- linear scalarization
- 标量化多目标强化学习
- 加权和方法

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
