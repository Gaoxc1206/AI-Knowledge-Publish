---
type: "method"
status: "enriched"
category: "优化方法"
domain: "大语言模型多目标对齐"
---
# Multi-Objective Controllable Language Models

## 定义

这类方法关注让[[大语言模型|语言模型]]在多个可能冲突的目标之间进行可控折中，例如有用性、[[无害性奖励|无害性]]、幽默性、长度或创造性。给定论文提出的 [[PAMA]] 将[[多目标对齐]]从昂贵的梯度式[[多目标优化]]，重写为基于 [[Noon PPO]] 的[[凸优化]]近似，并给出[[闭式解]]。论文还证明其在一定假设下可收敛到 [[Pareto stationary point]]。该方法主要用于策略优化阶段，前提是多个[[奖励模型]]已经存在。

## 关键点

- 将多目标对齐形式化为同时优化多个奖励目标，而不是压缩成单一标量奖励。
- 提出 Noon [[PPO]]：将负 advantage 截断为 0，只保留非负优势动作的更新。
- 把原本依赖高维参数梯度的 min-norm 多目标优化，转化为只依赖目标数量的[[凸优化|凸优化问题]]。
- 闭式解对应于 0 在目标优势区间上的投影，从而避免显式构造梯度 Gram matrix。
- 理论上在 Lipschitz smooth、学习率有界和奖励有界等条件下，可收敛到 Pareto stationary point。
- 实验中在 GPT-2、GPT-2 XL、LLaMA-2 7B 上，相比 [[MORLHF]] 和 [[MGDA-UB]] 表现更稳定、更高效。

## 别名

- PAMA
- PAreto Multi-Objective Alignment
- 多目标可控语言模型
- 多目标对齐语言模型

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
