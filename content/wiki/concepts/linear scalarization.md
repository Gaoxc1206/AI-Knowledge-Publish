---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标优化、蛋白质序列设计"
background: "included"
---
# linear scalarization

## 标准定义

linear [[scalarization]]（[[线性标量化]]）是[[多目标优化]]中的一种基础方法：将多个[[黑盒 oracle|目标函数]]按给定权重[[线性标量化|线性加权]]，合成为一个单目标函数，例如 f_\lambda(x)=\sum_i \lambda_i f_i(x)，其中 \lambda_i\ge 0 且通常满足 \sum_i \lambda_i=1。它的核心作用是把多目标问题转成可直接优化的单目标问题；在理想情况下，通过扫描不同权重可以得到一部分 [[Pareto front]] 上的解。

## 在本知识库中的用法

在这篇关于蛋白质/抗体序列采样的论文中，linear scalarization 作为一个朴素的[[多目标优化]]基线出现，用固定的偏好权重 \lambda 对 Ab-like、[[binding affinity|Aff]]、[[BV score]] 等目标做线性加权，形成 [[ls-cEBM]] 这类对照方法。作者用它来对比 [[pcEBM]] 的动态 Pareto 改进方向，并指出线性标量化更适合凸的 [[Pareto front]]，对于非凸 front 的覆盖能力不足。

## 关键点

- 本质上是把多个目标用固定 [[权重]] 合并成一个标量目标，便于直接优化或采样。
- 它是多目标优化里的经典基线，常用于和 [[Pareto front]] 方法、[[Multiple Gradient Descent]] 等对照。
- 在本文语境下，它对应“固定加权求和”的朴素方案，而不是动态调整偏好的方法。
- 论文强调其局限：对于非凸的 Pareto front，线性标量化可能无法覆盖全部 Pareto 最优区域。
- 在 pcEBM 的比较实验里，linear scalarization 主要承担 baseline 角色，用来凸显动态 Pareto 方向和噪声探索的优势。

## 别名

- 加权和法
- weighted-sum method
- weighted sum scalarization
- sum scalarization
- 线性加权标量化

## 外部背景

- 也常被称为加权和法（weighted-sum method）或 weighted scalarization，待核对经典来源。
- 对凸优化或凸 Pareto front，改变权重通常可以系统性地枚举一部分折中解；这是教材中常见结论，待核对经典来源。
- 在线性标量化前，常需要对不同目标做尺度归一化，否则权重含义会受量纲影响，待核对经典来源。
- 在非凸多目标问题中，线性标量化常与 ε-constraint、Pareto-based search 等方法一起作为对照，待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
