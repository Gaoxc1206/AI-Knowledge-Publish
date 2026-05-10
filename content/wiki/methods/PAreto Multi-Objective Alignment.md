---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标语言模型对齐"
background: "included"
---
# PAreto Multi-Objective Alignment

## 标准定义

PAreto Multi-Objective Alignment（PAMA）可理解为一种面向 [[RLHF]] 的 [[多目标优化]] [[大语言模型对齐|对齐]]方法：它不把多个偏好压缩成单一奖励，而是通过多目标更新规则寻找更接近 [[Pareto Front|Pareto前沿]] 的策略，在多个冲突目标之间取得折中。一般背景下，这类方法通常结合策略梯度或 [[PPO]] 一类优化框架，目标是在保留可训练性的同时减少目标间的梯度冲突。

## 在本知识库中的用法

在这篇论文中，PAMA 被用来做[[大语言模型|大型语言模型]]的多目标 [[大语言模型对齐|RLHF 对齐]]。作者将原本需要在高维参数梯度空间中处理的 min-norm 多目标组合问题，借助 [[Noon PPO]] 的非负 advantage 结构，重构为关于 advantage 标量组合的凸优化，并给出闭式求解形式。该方法声称把复杂度从 O(n^2 d) 降到 O(n)，同时在 GPT-2、GPT-2 XL、LLaMA-2 7B 上相较 [[MORLHF]] 和 [[MGDA-UB]] 展示出更稳定的多目标对齐效果，并给出 [[Pareto Stationary Point|Pareto stationary]] 收敛保证。

## 关键点

- 核心目标是把 [[RLHF]] 中的单目标奖励优化扩展为多目标对齐，直接处理冲突偏好而不是强行标量化。
- 论文采用 [[PPO]]/Noon [[PPO]] 风格的更新：将负 advantage 截断为 0，使后续多目标组合更稳定。
- 方法不在全参数梯度空间做传统 min-norm 聚合，而是在目标维度上对 advantage 信号做组合，从而降低计算成本。
- 理论上提供 Pareto stationary 收敛分析；这里保证的是一阶必要条件，不等于全局 [[Pareto 最优]]。
- 实验覆盖 GPT-2 125M、GPT-2 XL 1.5B、LLaMA-2 7B，主要比较 sentiment、length、humor、harmlessness 等冲突目标。

## 别名

- PAMA
- Pareto Multi-Objective Alignment
- 帕累托多目标对齐

## 外部背景

- [[多目标优化]]里最常见的标量化方法是线性加权，但它对权重设置敏感，且可能错过部分 Pareto 解。
- Pareto stationarity 是多目标优化的一阶概念：若一个点是 Pareto stationary，通常表示不存在同时改善所有目标的共同下降方向，但不保证全局最优。
- 在 RLHF 中，常见流程是先训练奖励模型，再用 PPO 做策略优化，并加入 KL 约束维持与参考模型的接近。
- 多目标梯度方法如 MGDA、min-norm aggregation、梯度投影等常用于处理冲突梯度，但在大模型上往往计算开销较高；待核对经典来源

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
