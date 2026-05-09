---
type: "method"
status: "enriched"
category: "优化方法"
domain: "大语言模型多目标对齐与多目标强化学习"
---
# Multi-objective reinforcement learning based on decomposition

## 定义

这类方法将[[多目标强化学习]]中的优化问题拆解为更低维、可处理的子问题，避免直接在高维参数空间中做复杂的[[梯度聚合]]。根据给定论文笔记，[[PAMA]] 通过 [[Noon PPO]] 和 advantage 相关项，把[[多目标对齐]]的 min-norm 梯度问题转化为只依赖目标数量的[[凸优化]]，并进一步给出[[闭式解]]。论文还说明，在一定假设下该方法可收敛到 [[Pareto stationary point]]。该思路主要用于降低多目标对齐的计算开销并提升训练稳定性。

## 关键点

- 核心是“分解”高维多目标梯度优化，而不是直接在模型参数空间里求解[[梯度聚合|梯度组合]]。
- 论文引入 Noon [[PPO]]，将 advantage 中的负值截断为 0，以减少不稳定更新。
- 原始的 min-norm 多目标梯度问题被重写为关于 advantage 组合的凸优化，计算复杂度从 O(n^2 d) 降到 O(n)。
- 定理给出了组合最优值的闭式解，本质上是 0 在目标 advantage 区间上的投影。
- 在 GPT-2、GPT-2 XL 和 LLaMA-2 7B 的实验中，PAMA 相比 [[MORLHF]] 和 [[MGDA-UB]] 表现出更稳定、更高效的多目标平衡。
- 理论上，在梯度 Lipschitz、学习率有界和奖励有界等条件下，可收敛到 Pareto stationary point。

## 别名

- 分解式多目标强化学习
- decomposition-based multi-objective reinforcement learning
- PAMA
- PAreto Multi-Objective Alignment

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
