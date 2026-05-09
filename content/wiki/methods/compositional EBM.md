---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多目标蛋白质序列优化"
background: "included"
---
# compositional EBM

## 标准定义

compositional [[Energy-Based Model|EBM]]（[[cEBM|组合式能量模型]]）是指把多个已训练的 [[Energy-Based Model]] 按某种组合规则合成为一个联合模型，用于同时表达多个约束、属性或条件。最常见的组合方式是把多个能量函数相加，对应于 [[product of experts]] 形式；在采样时，通常结合 [[Langevin dynamics]] 或其他基于梯度的采样方法，在多个目标之间寻找兼顾的样本。

## 在本知识库中的用法

在这篇论文中，compositional EBM 具体指：为蛋白质/抗体序列的不同性质分别建模能量函数，然后把这些性质模型组合起来做多目标采样与优化。论文把它作为 [[pcEBM]] 的基础版本：传统做法是直接对多个属性能量求和进行采样；而 p[[cEBM]] 在此基础上进一步用 [[Multiple Gradient Descent]] 替代固定加权求和，来更好地逼近 [[Pareto front]]。

## 关键点

- 标准的 compositional EBM 通过组合多个属性能量函数，把单属性约束扩展为多属性联合约束。
- 其核心优势是可以把不同性质的偏好显式注入生成过程，而不是只做无[[controllable generation|条件生成]]。
- 在本论文的蛋白质序列场景里，组合对象是与 Ab-like、[[binding affinity]]、[[BV score]] 等性质相关的[[Energy-Based Model|能量模型]]。
- 论文指出，简单把多个能量相加更像[[固定权重标量化]]，容易偏向某些目标；pcEBM 则用更动态的多目标下降方向改进这一点。
- 采样层面上，它仍然属于基于梯度的生成/优化方法，和 [[Langevin dynamics]] 结合使用。

## 别名

- 组合式EBM
- 组合能量模型
- compositional energy-based model
- cEBM

## 外部背景

- 多个能量项相加通常可解释为 product-of-experts 的联合建模方式。
- 在通用背景下，EBM 通过学习未归一化能量来刻画样本偏好，采样常依赖迭代式梯度更新。
- 组合式生成常见于条件生成、属性控制生成与多约束生成任务中。
- 待核对经典来源

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
