---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多目标蛋白质序列优化"
background: "included"
---
# cEBM

## 标准定义

c[[Energy-Based Model|EBM]]（[[compositional EBM|compositional energy-based model]]）是一类将多个 [[Energy-Based Model]] 通过能量相加或 [[Product of Experts]] 方式组合起来的生成/采样方法。对每个条件、属性或约束分别定义能量函数后，联合分布通常可写为 p(x) ∝ exp(-∑_i E_i(x))，再借助 [[Langevin Dynamics]] 等随机梯度采样方法从该联合分布中生成样本。它的核心特点是“可组合”，但通常隐含固定的组合方式或权重。

## 在本知识库中的用法

在这篇论文里，cEBM 被用作多性质蛋白质/抗体序列采样的基线方法：把 Ab-like、[[binding affinity|Aff]]、[[BV score]] 等属性对应的能量直接组合，再通过 Langevin 式采样搜索序列。论文用它与 [[pcEBM]]、[[Multiple Gradient Descent]] 等方法对比，重点考察其在多目标权衡下的 [[Pareto front]] 覆盖和 [[edit distance]] 表现；结果表明，固定的能量组合在非凸多目标场景中不如动态 Pareto 方向稳定。

## 关键点

- cEBM 的核心是把多个属性/约束分别建模为能量函数，再将它们组合成一个总能量进行采样。
- 标准形式上，它常等价于对多个专家做乘积组合，因此也可视为一种约束可组合的 [[Energy-Based Model]]。
- 采样阶段通常采用 [[Langevin Dynamics]]：沿总能量梯度下降，同时加入噪声以保持探索性。
- 它适合把多个判别器或性质模型统一到同一个生成框架中，但组合方式往往是固定的。
- 在多目标问题里，cEBM 可视为一种[[标量化]]策略；当目标冲突且 [[Pareto front]] 非凸时，覆盖能力可能受限。
- 在本论文中，cEBM 主要作为与 [[pcEBM]] 对照的基线，用来体现动态 Pareto 方向的优势。

## 别名

- compositional EBM
- compositional energy-based model
- 组合式能量模型
- product-of-experts EBM

## 外部背景

- EBM 的标准背景是用能量函数定义未归一化概率密度：p(x) ∝ exp(-E(x))。
- 组合式 EBM 常见于[[controllable generation|条件生成]]、约束采样和 [[Product of Experts]] 框架。
- 离散或连续样本的 EBM 训练与推断中，[[Langevin Dynamics]] 是最常见的近似采样方法之一。
- 在[[多目标优化]]语境下，固定加权求和是最简单的[[hypervolume scalarization|标量化方法]]，但并不保证覆盖所有非凸 [[non-dominated solution|Pareto 解]]集。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
