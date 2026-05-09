---
type: "method"
status: "enriched"
category: "优化方法"
domain: "大语言模型多目标对齐"
---
# PAreto Multi-Objective Alignment

## 定义

PAreto [[Multi-Objective Alignment]]（[[PAMA]]）是一种用于[[大语言模型]][[多目标对齐]]的方法，目标是在多个可能冲突的奖励目标之间找到合理的 Pareto 折中。它将原本昂贵的梯度式[[多目标优化]]，重写为依赖目标数量的[[凸优化|凸优化问题]]，并给出[[闭式解]]。论文还基于 [[Noon PPO]] 结构证明了其在一定条件下可收敛到 [[Pareto stationary point]]。

## 关键点

- 核心思路是利用 Noon [[PPO]]，将多目标 PPO 的高维[[梯度聚合|梯度组合]]问题转化为更低成本的[[凸优化]]近似。
- 将负 advantage 截断为 0，只保留非负优势动作的更新，以降低训练不稳定性。
- 原始需要构造高维梯度 Gram matrix 的 min-norm 多目标优化，被改写为只与目标优势项相关的组合优化。
- 论文给出了闭式解：最优组合值可视为 0 在目标优势区间上的投影。
- 理论上在梯度 Lipschitz、学习率有界、奖励有界等条件下，可收敛到 Pareto stationary point。
- 实验在 GPT-2、GPT-2 XL、LLaMA-2 7B 上表明，PAMA 相比 [[MORLHF]] 和 [[MGDA-UB]] 更稳定且更高效。

## 别名

- PAMA
- Pareto Multi-Objective Alignment
- Noon PPO-based multi-objective alignment

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
