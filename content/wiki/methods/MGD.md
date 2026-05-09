---
type: "method"
status: "enriched"
category: "多目标优化方法"
domain: "多目标优化、蛋白质序列优化"
---
# MGD

## 定义

MGD（[[Multiple Gradient Descent]]）是一种[[多目标优化]]中的方向选择方法，用于在多个[[黑盒 oracle|目标函数]]之间寻找尽可能同时下降的更新方向。其核心思想不是给各目标固定加权，而是动态求一个方向，使“最难下降”的目标也尽量获得改善。论文中将其用于 [[pcEBM]] 的采样步骤，以引导序列朝 Pareto 改进方向移动。若多个目标梯度冲突过强，更新方向可能退化为 0，表示停在局部 Pareto 点附近。

## 关键点

- 目标是选择一个更新方向 g，使所有目标的下降尽可能均衡，最大化最慢下降目标的下降速率。
- 方向可由各目标梯度的加权组合近似得到，权重通过一个带单纯形约束的[[凸优化|凸优化问题]]确定。
- 与[[线性标量化]]不同，MGD 不依赖预先固定的目标权重，因此更适合处理梯度冲突和[[非凸 Pareto front]]。
- 当 m=2 时可有[[闭式解]]；当 m>2 时可用快速算法求解。
- 在该论文中，MGD 作为 p[[cEBM]] 的方向选择模块，与 Langevin dynamics 的噪声采样结合，用于探索多属性 [[Pareto front]]。

## 别名

- Multiple Gradient Descent
- 多重梯度下降
- 多目标梯度下降

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
