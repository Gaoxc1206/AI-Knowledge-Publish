---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标蛋白质序列优化"
---
# ls-cEBM

## 定义

ls-[[cEBM]] 是一种基于 [[compositional EBM|compositional energy-based model]] 的[[多目标优化]]基线方法，采用[[线性标量化]]将多个性质对应的能量函数按固定权重加和后进行采样。它本质上是把多个目标统一成一个加权目标，再用 Langevin dynamics 进行更新。论文指出，这种方法更适合凸 [[Pareto front]]，对于[[非凸 Pareto front]] 可能覆盖不足。ls-c[[Energy-Based Model|EBM]] 主要作为与 [[pcEBM]]、[[MGD]] 等方法对比的基线。

## 关键点

- 将多个属性的 EBM 以线性权重形式组合，等价于固定权重的加权求和优化。
- 采样过程沿用 [[compositional EBM]] / Langevin dynamics 框架，而不是动态搜索 Pareto 方向。
- [[Preference Vector|权重向量]] λ 需要满足非负且和为 1，因此方法隐含了明确的偏好设定。
- 论文将其与 MGD、cEBM、pcEBM 对比，用于衡量线性[[标量化]]在多目标蛋白质/[[抗体设计]]中的效果。
- 文中指出线性标量化更适合凸 Pareto front，对非凸 Pareto front 的覆盖能力有限。

## 别名

- linear scalarization cEBM
- 线性标量化 cEBM
- 加权和 cEBM
- weighted-sum cEBM

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
