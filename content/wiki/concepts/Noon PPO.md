---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标大语言模型对齐"
background: "included"
---
# Noon PPO

## 标准定义

Noon [[PPO]] 可视为 [[PPO]] 的一个非标准变体：在策略更新时对 [[advantage]] 做非负截断，把负值置零，只保留正优势样本的强化信号。它通常仍建立在 clipped surrogate objective 这类稳定更新机制之上，目标是减少负优势样本对参数更新的干扰。由于“Noon PPO”并非通用统一术语，具体含义需要结合上下文判断。

## 在本知识库中的用法

在本知识库中，Noon PPO 是 [[PAMA]] 的关键组件：将原始优势 A' 截断为 A = max(A', 0)，即只保留非负优势，从而让[[多目标对齐]]中的[[梯度聚合|梯度组合]]可以被重写为只依赖目标数的[[凸优化|凸优化问题]]。论文利用这一结构，把原本需要处理高维参数梯度的[[多目标优化]]，转化为关于目标优势项的组合，并据此得到[[闭式解]]与更低复杂度的更新方式。

## 关键点

- 作为 [[PPO]] 的变体，Noon PPO 的核心操作是把负 [[advantage]] 直接截断为 0，只强化“高于基线”的动作。
- 在 PAMA 的推导里，Noon PPO 提供了一个可利用的结构，使多目标优化不必显式处理高维参数梯度。
- 论文把多目标 PPO 的 min-norm 组合问题转写为关于优势项的[[凸优化]]，并进一步给出闭式解。
- 这种写法的目的，是把计算复杂度从依赖模型参数维度的二次量级，降到主要随目标数线性增长。
- 它与 [[RLHF]] 的策略优化阶段相关，但在本知识库中的具体用法是面向多目标对齐与 [[Pareto stationary point]] 分析的。

## 别名

- No Negative PPO
- NoonPPO

## 外部背景

- PPO 的经典核心是 clipped surrogate objective，常用于 [[RLHF]] 中的策略优化。
- 一般而言，advantage 大于 0 表示动作优于基线，截断负 advantage 等价于只保留“值得加强”的样本。
- “Noon PPO”不是统一标准术语，具体命名与变体细节待核对经典来源。

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
