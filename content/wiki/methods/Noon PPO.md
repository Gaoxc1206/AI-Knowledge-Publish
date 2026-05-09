---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标大语言模型对齐"
---
# Noon PPO

## 定义

Noon [[PPO]] 是论文中提出的一种 PPO 变体，核心做法是将 advantage 中的负值截断为 0，只保留非负优势动作的更新。论文将其解释为 “No Negative” 机制，用于减少训练中的不稳定梯度波动。在 [[PAMA]] 框架下，它还被用来把多目标 PPO 的[[梯度聚合|梯度组合]]问题重写为更易求解的[[凸优化]]形式，并进一步得到[[闭式解]]。

## 关键点

- Noon 表示 “No Negative”，即将优势函数写成 A_t = max(A'_t, 0)。
- 其目标是只鼓励提升非负优势动作的概率，而不更新负优势动作。
- 标准 clipped surrogate objective 仍然保留，但基于截断后的 advantage 计算。
- 在 PAMA 中，Noon PPO 的结构被用于将高维梯度组合近似为仅依赖目标数量的优化问题。
- 论文声称这种重写可将计算复杂度从 O(n^2 d) 降到 O(n)。
- 上下文只说明它是 PAMA 的关键组成部分，更多细节待从更多论文中补充。

## 别名

- No Negative PPO
- Noon-PPO
- Noon Policy Optimization

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
