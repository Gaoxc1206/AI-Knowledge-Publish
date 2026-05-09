---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标优化"
background: "included"
---
# Pareto front

## 标准定义

Pareto front（[[Pareto frontier|帕累托前沿]]）是[[多目标优化]]中由所有 [[Non-dominated Solutions|Pareto optimal solutions]] 的目标值组成的集合。若在某个解附近，不存在另一个解能够在所有目标上都不差且至少一个目标更优，则该解是[[Non-dominated Solutions|非支配解]]；这些非支配解在[[目标空间]]中的边界/轨迹通常构成 Pareto front。它描述了多个冲突目标之间可达到的最优权衡，而不是单一最优点。与 [[multi-objective optimization]]、[[Pareto optimality]]、[[non-dominated sorting]] 常一起出现。

## 在本知识库中的用法

在本知识库相关论文中，Pareto front 通常被当作多目标生成与优化的目标区域或评估对象：MOMO、[[MOG-DFM]]、[[Goal-conditioned GFlowNets|goal-conditioned GFlowNets]]、[[pcEBM]]、IMG 等方法都以“逼近/覆盖 Pareto front”为核心目标；EHVI 研究则把它作为衡量 [[Hypervolume Indicator|hypervolume]] 和覆盖质量的参照；PAMA 则围绕[[多目标对齐]]中的 Pareto stationary 视角进行优化。这里的用法多是“近似 Pareto front”或“朝 Pareto front 采样”，强调在性质冲突时保留一组不同权衡的候选解，而不是压缩成单一标量目标。

## 关键点

- Pareto front 表示多目标问题中不可再被整体改进的一组权衡解；它比单一最优值更适合描述冲突目标。
- 在本库的分子优化、序列设计和 LLM 对齐语境里，Pareto front 常对应“候选解集合”而非单点最优。
- 很多方法显式避免把多个目标简单加权成一个标量，因为这往往只能覆盖前沿的一小部分，尤其是非凸前沿。
- 常见评价会围绕 Pareto front 质量展开，例如 [[hypervolume]]、R2 indicator、覆盖率、多样性与非支配解数量。
- 相关方法通常追求“逼近”或“覆盖” Pareto front，而不保证找到真实全局前沿；这在黑盒优化和生成式模型中尤其常见。

## 别名

- Pareto前沿
- Pareto frontier
- 非支配前沿
- 帕累托前沿

## 外部背景

- 经典多目标优化中，Pareto front 是由所有非支配解的目标值构成的边界；常见教材将其与 Pareto dominance 一起定义。
- 线性标量化只能保证在凸前沿上恢复所有 Pareto 解；对于非凸前沿，往往会遗漏部分 Pareto front 区域。
- 常见的前沿质量指标包括 hypervolume、IGD、R2 indicator 等；这些指标用于衡量前沿覆盖与逼近程度。
- 待核对经典来源

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
