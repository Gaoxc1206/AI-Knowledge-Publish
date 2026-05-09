---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标优化"
background: "included"
---
# KKT condition

## 标准定义

KKT condition（Karush-Kuhn-Tucker 条件）是带约束优化问题中的一组最优性条件，通常用于描述在满足一定正则性条件时，候选最优解必须满足的结构。它一般包括四部分：[[约束优化]]中的原始可行性（primal feasibility）、对偶可行性（dual feasibility）、[[拉格朗日乘子]]相关的驻点条件（stationarity），以及[[互补松弛]]条件（complementary slackness）。在[[凸优化]]中，如果满足适当的约束资格条件，KKT 条件往往还是充要条件。

## 在本知识库中的用法

待从更多论文中补充。就给定上下文而言，这篇论文没有直接展开 KKT 推导，但其将[[多目标对齐]]重写为带单纯形约束的[[凸优化|凸优化问题]]，并通过[[闭式解]]和 [[Pareto stationary point]] 证明来刻画最优性，因此可以从 KKT 视角理解其约束最优化结构。

## 关键点

- KKT 条件是分析带约束最优化问题的核心工具，尤其适合处理等式约束、非负约束和投影类问题。
- 在满足适当正则条件时，凸问题的 KKT 条件可作为最优性的充要刻画；这使它常用于证明解的正确性。
- 本知识库相关论文中，[[PAMA]] 把多目标组合写成单纯形上的凸问题；虽然正文未显式写出 KKT 系统，但其闭式解与最优性分析可用 KKT 语言理解。
- 与 [[Pareto stationary point]] 的关系：在[[多目标优化]]里，KKT 形式常用于表达“存在一组非负权重使加权梯度和为零”的驻点条件。
- 对于只含简单约束的子问题，KKT 视角通常比直接处理高维[[梯度聚合]]更便于分析和求解。

## 别名

- KKT条件
- Karush-Kuhn-Tucker condition
- Karush-Kuhn-Tucker conditions
- Kuhn-Tucker condition

## 外部背景

- KKT 条件是经典的非线性规划最优性条件，常见于教材中的拉格朗日对偶与约束优化章节。
- 在[[凸优化]]中，若满足 Slater 条件等约束资格条件，KKT 条件通常可直接刻画全局最优解。
- 多目标优化中，KKT 条件常与 [[Pareto 最优]]、Pareto stationary、权重[[标量化]]等概念一起使用。
- 待核对经典来源

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
