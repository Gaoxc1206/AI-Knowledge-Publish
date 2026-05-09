---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标优化"
background: "included"
---
# Pareto set

## 标准定义

在[[多目标优化]]中，Pareto set（帕累托集）是所有[[非支配解]]组成的集合：对任一解，都不存在另一个解在所有目标上都不差且至少一个目标更好。Pareto set 在[[目标空间]]中的投影称为[[Pareto front]]。它刻画了多个目标之间无法同时兼得时的最优权衡边界。

## 在本知识库中的用法

在本知识库的相关论文中，Pareto set / [[Pareto front]] 主要作为[[多目标分子设计]]与蛋白序列优化的核心参照：[[Expected Hypervolume Improvement|EHVI]] 直接优化[[Hypervolume Indicator|超体积]]增益，以扩展[[Non-dominated Solutions|非支配解]]集合；[[Goal-conditioned GFlowNets|goal-conditioned GFlowNets]] 通过指定 [[focus region]] 在前沿上更均匀、可控地采样；[[pcEBM]] 则结合 [[Multiple Gradient Descent]] 和采样噪声，沿着 Pareto 改进方向探索非凸前沿。

## 关键点

- Pareto set 描述的是“[[决策空间]]中的最优解集合”，而 [[Pareto front]] 是其映射到目标空间后的边界。两者相关但不完全相同。
- 它的核心判据是[[非支配]]：一个解若被另一个解在所有目标上同时压制，就不属于 Pareto set。
- 在本库语境里，Pareto set 常用于衡量多目标[[分子设计]]、[[蛋白质序列设计|蛋白序列设计]]中的 trade-off 质量，而不是单一分数最优。
- EHVI 这类 [[Pareto-aware]] 方法会直接推动当前非支配集合扩展，因此更适合评估 Pareto set 的覆盖程度。
- 当 Pareto front 呈现凹形或非凸结构时，固定权重[[标量化]]往往难以完整恢复对应的 Pareto set。

## 别名

- 帕累托集
- Pareto-optimal set
- non-dominated set
- 最优解集

## 外部背景

- 加权和标量化通常只能稳定恢复凸前沿上的 Pareto 解；对非凸前沿可能覆盖不足。
- Pareto set 是“解的集合”，Pareto front 是“这些解在目标值空间中的像”，二者在教材中常被区分说明。
- 常见的多目标评价指标包括 Hypervolume、IGD、R2 等，它们常用于近似衡量 Pareto set/front 的质量。
- 待核对经典来源

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
