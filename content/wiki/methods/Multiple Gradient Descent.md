---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标蛋白质序列优化"
background: "included"
---
# Multiple Gradient Descent

## 标准定义

Multiple Gradient Descent（MGD）是一类[[多目标优化]]中的方向搜索方法：在给定多个目标函数及其梯度时，不直接把梯度简单[[Linear Scalarization|加权求和]]，而是寻找一个共同下降方向，使所有目标都尽可能同时改善，尤其强调“最难下降的目标”的改进幅度。它常用于逼近 [[Pareto front]]，并可作为 [[multi-objective optimization]] 中构造 Pareto 改进方向的工具。在连续空间中，MGD 通常以当前点的多个梯度为输入，输出一个范数受限的合成下降方向。

## 在本知识库中的用法

在该论文中，MGD 被用作 [[Compositional Energy-Based Model|pcEBM]] 的采样内核：对每一步生成/改造的蛋白质序列，根据多个性质目标（如 Ab-like、Aff、BV score）的梯度，自适应求出一个 Pareto 改进方向，再与 Langevin 噪声结合进行采样。其作用是让样本尽量沿多个目标同时改进，而不是像朴素 c[[Energy-Based Model|EBM]] 那样只依赖多个 energy 的固定求和梯度。论文将 MGD 视为一种能够提升多目标覆盖、帮助生成更接近 [[Pareto Front|Pareto front]] 候选序列的优化机制。

## 关键点

- MGD 的核心不是单目标最优化，而是从多个目标梯度中构造一个共同下降方向，尽量兼顾所有目标。
- 它适合处理目标冲突或非凸的多目标问题，比简单线性标量化更有机会覆盖 [[Pareto front]] 的不同区域。
- 在本文里，MGD 被嵌入 [[energy-based model]] 的采样过程，作为 pcEBM 的内层方向求解步骤。
- pcEBM 中的 MGD 方向负责“朝 Pareto 改进”，而采样噪声则负责在 Pareto front 附近探索更广区域。
- 从实验现象看，MGD 本身就是较强基线，而 pcEBM 在其基础上进一步增强了多属性覆盖与稳定性。

## 别名

- MGDA
- 多目标梯度下降算法
- MGDA
- MGD
- Multiple Gradient Descent Algorithm
- 多重梯度下降
- 多目标梯度下降

## 外部背景

- 待核对经典来源：MGD 常被视为多目标优化中的一种“共同下降方向”构造方法，和多任务学习中的梯度协调思想相近。
- 待核对经典来源：当目标函数数量较多或彼此冲突时，MGD 可帮助找到近似 Pareto 稳定点附近的更新方向。
- 常见变体会在不同约束下求解合成梯度，例如最小化梯度冲突、最大化最差目标的改进率，或与投影/二次规划结合。
- 在生成模型与控制问题中，MGD 可与随机采样、搜索或动力系统结合，用来在多目标约束下更新状态。

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
