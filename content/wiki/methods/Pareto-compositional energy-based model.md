---
type: "method"
status: "enriched"
category: "优化方法"
domain: "蛋白质序列设计、多目标优化"
---
# Pareto-compositional energy-based model

## 定义

Pareto-[[compositional EBM|compositional energy-based model]]（[[pcEBM]]）是一种将多个属性对应的 [[Energy-Based Model]] 进行组合，并结合 [[Multiple Gradient Descent]] 的多目标采样方法。它不是把多个目标简单加权求和，而是在每一步采样时动态寻找更符合 Pareto 改进方向的更新方向，再加入 Langevin 动力学噪声进行探索。该方法用于生成或优化同时满足多个性质约束的蛋白质/抗体序列，尤其关注[[非凸 Pareto front]] 的覆盖。

## 关键点

- 每个性质对应一个单独的 [[Energy-Based Model|EBM]]，能量越低表示越符合该性质。
- 与传统 [[compositional EBM]] 的固定加和不同，p[[cEBM]] 用 Multiple Gradient Descent 动态计算 Pareto 改进方向。
- 更新过程结合了 Pareto 方向和 Langevin 噪声，兼顾朝多目标更优区域移动与对 [[Pareto front]] 的探索。
- 方法目标不是找到单个全局最优解，而是生成一组处于或接近 Pareto front 的候选序列。
- 论文中在[[抗体设计]]任务上展示了较好的多属性权衡采样质量与非凸 Pareto front 覆盖能力。

## 别名

- pcEBM
- Pareto-compositional EBM
- Pareto compositional energy-based model

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
