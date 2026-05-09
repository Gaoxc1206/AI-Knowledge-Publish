---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子优化 / 多目标贝叶斯优化"
background: "included"
---
# scalarization

## 标准定义

Scalarization（[[标量化]]）是[[多目标优化]]中的一种通用处理方式：把向量形式的多个[[黑盒 oracle|目标函数]]映射为一个标量目标或标量效用，例如通过[[加权和]]、加权切比雪夫函数或其他聚合方式。这样就可以直接复用单目标优化方法（如[[Expected Improvement]]、梯度法或启发式搜索）。其优点是实现简单、便于控制偏好；局限是会丢失部分 [[Pareto front]] 结构，对非凸前沿、目标权衡不均匀或权重难以设定的场景往往不够理想。

## 在本知识库中的用法

在本知识库对应论文中，scalarization 主要指“固定权重的多目标压缩”作为基线方法：一篇工作把多目标分子性质按权重加和，形成 [[preference-conditioning]] / scalarized reward，再与 [[Goal-conditioned GFlowNets]] 对比；另一篇工作把多个分子目标先标量化，再在该单标量上做 [[Expected Improvement]]，作为与 [[EHVI]] 对照的固定标量化基线。库内用法强调：它适合做简单、可控的偏好表达，但在凹形或复杂[[目标空间]]中容易只覆盖 Pareto 前沿的一部分，且对权重设定较敏感。

## 关键点

- 标量化的核心是把多目标向量压成一个标量，从而把 [[多目标优化]] 转写为单目标问题。
- 最常见形式是加权和：不同目标乘以权重后求和；在[[分子设计]]中也常被用来构造 reward 或 utility。
- 它的优势是易实现、易与现有单目标算法结合，特别适合和 [[贝叶斯优化]]、生成模型或 RL 管线对接。
- 它的局限在于依赖权重设定，且对非凸 Pareto 前沿的覆盖通常不充分，容易偏向极端解。
- 本知识库中，scalarization 多作为 baseline，用来对比更显式的多目标方法，如 [[EHVI]] 或[[focus region|目标区域]]条件化方法。

## 别名

- 标量化
- scalarisation
- weighted sum
- 加权标量化
- 标量奖励

## 外部背景

- 标量化是多目标优化中的经典思路，常见教材通常将其视为从“偏好表达”到“单目标求解”的桥梁；待核对经典来源。
- [[weighted sum scalarization|加权和标量化]]在凸前沿上更容易恢复 [[Pareto 最优]]解，但对非凸前沿的覆盖通常有限；待核对经典来源。
- 除加权和外，常见变体还包括 Tchebycheff / Chebyshev 标量化、边界交点法等；待核对经典来源。
- 在贝叶斯优化中，标量化常用于把多目标 [[acquisition function|acquisition]] 简化为单目标 acquisition，但可能损失 Pareto-aware 信息；待核对经典来源。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
