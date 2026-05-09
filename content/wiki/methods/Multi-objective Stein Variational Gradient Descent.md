---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标优化"
---
# Multi-objective Stein Variational Gradient Descent

## 定义

当前上下文没有直接给出 Multi-objective [[Stein Variational Gradient Descent]] 的具体定义。相关笔记只说明了一类多目标采样/优化思路：在多个目标之间寻找 Pareto 改进方向，并结合随机采样过程探索更好的候选解。若要准确描述该方法的 Stein 变分粒子更新形式、核函数和具体目标构造，待从更多论文中补充。

## 关键点

- 当前证据主要来自 [[pcEBM]] 相关笔记，核心是[[多目标优化]]与 [[Pareto front]]，而不是对 SVGD 的直接说明。
- 笔记中明确提到多目标优化可用梯度方向来同时改善多个目标，并强调避免[[固定权重标量化]]带来的偏置。
- 相关方法会结合随机采样机制，在接近 Pareto front 时继续探索不同权衡解。
- 当前上下文未提供 Multi-objective SVGD 的粒子更新公式、核函数设计或收敛性质。
- 如果需要把该节点写成可用知识卡，仍需补充专门讨论 multi-objective SVGD 的论文证据。

## 别名

- 多目标 SVGD
- Multi-objective SVGD

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
