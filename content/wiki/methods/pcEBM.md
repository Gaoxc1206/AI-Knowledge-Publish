---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标蛋白质序列设计"
---
# pcEBM

## 定义

p[[cEBM]]（[[Pareto-compositional energy-based model]]）是一种将多个性质对应的[[Energy-Based Model|能量模型]]进行组合，并结合 [[Multiple Gradient Descent]] 的[[多目标优化]]方法。它在采样过程中动态寻找能够同时推动多个目标下降的 Pareto 改进方向，再叠加 Langevin 动力学噪声进行探索。论文将其用于蛋白质/抗体序列采样与优化，目标是生成位于或接近 [[Pareto front]] 的多性质候选序列。

## 关键点

- 每个目标性质对应一个单独的 [[Energy-Based Model]]，能量越低表示越符合该性质。
- 与简单的能量求和或[[线性标量化]]不同，pc[[Energy-Based Model|EBM]] 用 Multiple Gradient Descent 动态计算更新方向，尽量同时改进多个目标。
- 采样过程结合了 Pareto 方向和 Langevin 噪声，既能朝多目标更优区域移动，也能探索更广的 Pareto front。
- 论文主要面向蛋白质序列，尤其是[[抗体设计|治疗性抗体设计]]中的 Ab-like、[[binding affinity]]、[[nonspecificity]] 等冲突性质。
- 实验结果显示，pcEBM 在部分设置下取得更高的 [[Hypervolume]]，并且平均 [[edit distance]] 表现更接近多属性真实数据。

## 别名

- Pareto-compositional energy-based model
- Pareto compositional EBM
- pcEBM

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
