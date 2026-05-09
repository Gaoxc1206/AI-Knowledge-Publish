---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标大语言模型对齐"
---
# PAMA

## 定义

PAMA（[[PAreto Multi-Objective Alignment]]）是一种用于[[大语言模型]][[多目标对齐]]的方法，目标是在多个可能冲突的奖励之间找到合理的 Pareto 折中。它将原本昂贵的梯度式[[多目标优化]]重写为基于 [[Noon PPO]] 结构的[[凸优化]]近似，并进一步得到[[闭式解]]，从而避免对几十亿参数模型进行高成本的高维[[梯度聚合]]。论文给出的理论结果表明，在相关假设下该方法可收敛到 [[Pareto stationary point]]。

## 关键点

- 将多目标对齐问题从传统的梯度式多目标优化，转化为与目标数量相关的[[凸优化|凸优化问题]]。
- 依托 Noon [[PPO]]：将 advantage 中的负值截断为 0，只保留非负优势动作的更新。
- 通过对多目标 PPO [[梯度聚合|梯度组合]]的上界/近似，把原始的高维 min-norm 问题化简为只涉及优势项的组合优化。
- 该优化具有闭式解，最优组合值可视为 0 在目标优势区间上的投影。
- 理论上在梯度 Lipschitz、学习率有界和奖励有界等条件下，PAMA 收敛到 Pareto stationary point。
- 实验显示其在 GPT-2、GPT-2 XL、LLaMA-2 7B 上相比 [[MORLHF]] 和 [[MGDA-UB]] 更稳定、更高效。

## 别名

- PAreto Multi-Objective Alignment
- Pareto Multi-Objective Alignment
- PAMA

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
