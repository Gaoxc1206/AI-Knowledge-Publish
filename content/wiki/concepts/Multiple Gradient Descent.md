---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标蛋白序列优化"
background: "included"
---
# Multiple Gradient Descent

## 标准定义

Multiple Gradient Descent（[[MGD]]）是[[多目标优化]]中的一种梯度更新思想：在同一点上，不给定固定权重，而是寻找一个更新方向，使各个目标的局部下降尽可能同时成立。常见表述是通过最大化最差目标的方向导数，或等价地求解一个最小范数的梯度凸组合，从而得到一个 [[Pareto front]] 上的改进方向；当多个目标梯度强冲突时，所得方向可能趋近于零，表示接近 Pareto 驻点。

## 在本知识库中的用法

在这篇论文里，MGD 被用来替代简单的[[线性标量化]]，为 [[pcEBM]] 提供“动态的 Pareto 改进方向”。具体做法是在每一步采样/更新时，根据多个性质模型的梯度，求出一个让所有目标尽量同时下降的方向，再将该方向嵌入 [[Langevin Dynamics]] 式采样中。论文强调，这样做可以比把多个能量直接相加的 [[compositional EBM]] 更好地处理目标冲突，并更有效地覆盖非凸的 [[Pareto front]]。

## 关键点

- MGD 的核心不是给目标预先设定固定权重，而是根据当前点的梯度关系动态确定更新方向。
- 它试图最大化“最差下降目标”的下降速率，因此天然适合处理互相冲突的多目标问题。
- 在本知识库所对应的论文中，MGD 作为 p[[cEBM]] 的方向选择模块，与 [[Energy-Based Model]] 的组合式采样结合，用于蛋白质/抗体序列的多性质优化。
- 论文中 MGD 解决的是多目标采样中的方向问题，而噪声项则负责探索更宽的 Pareto 区域；两者共同作用。
- 当多个目标梯度接近完全抵消时，MGD 可能给出接近零的方向，这可视为接近局部 [[Pareto optimality]]。

## 别名

- MGD
- Multiple Gradient Descent Algorithm
- 多目标梯度下降
- 多目标梯度法

## 外部背景

- MGD 常与多目标梯度法（[[MGDA]], [[MGDA|Multiple Gradient Descent Algorithm]]）一类方法相关，后者通常通过求解梯度的凸组合来得到公共下降方向。
- 它与线性[[标量化]]不同：线性标量化依赖固定权重，较适合凸 Pareto front；MGD 更偏向直接求 Pareto 改进方向。
- 待核对经典来源：Désidéri 关于 multiple gradient descent / multiple objective optimization 的经典表述与闭式/数值求解细节。
- 在深度学习中，类似思想也常被用于多任务学习与梯度冲突缓解，但具体实现可能与优化理论中的 MGD 略有差异。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
