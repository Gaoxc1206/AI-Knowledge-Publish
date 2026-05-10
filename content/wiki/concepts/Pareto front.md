---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标优化"
background: "included"
---
# Pareto Front

## 标准定义

Pareto Front（帕累托前沿）是[[多目标优化]]中的核心概念，指所有[[非支配解]]在[[目标空间]]中的集合或其投影。若一个解在所有目标上都不劣于另一个解，并且至少一个目标更优，则前者支配后者；不被任何其他解支配的解构成 Pareto optimal set，而这些解在目标空间形成 Pareto front。它描述的是一组不可由单点“全局最优”替代的折中解，而不是单一最优值。

## 在本知识库中的用法

在本知识库中，Pareto Front 主要被用来描述生物序列、分子和蛋白设计里的多目标折中结果：例如在[[Discrete Flow Matching|离散流匹配]]采样、[[GFlowNet]] 生成、[[Energy-Based Model|EBM]] 采样、扩散推理时重采样、以及进化多目标搜索中，方法的目标不是找到单个最高分样本，而是生成一组位于或接近 Pareto front 的候选序列/分子。相关论文通常用它来衡量多目标覆盖、trade-off 均匀性和生成分布是否朝向更优区域移动，并常结合[[Hypervolume Indicator|Hypervolume]]、[[Inverted Generational Distance|IGD]]、[[R2 indicator]] 等指标评估前沿质量。

## 关键点

- Pareto front 表示多个冲突目标下的“最优折中集合”，在[[多目标优化]]中比单目标最优更重要。
- 在库内论文中，它常对应生成模型或搜索算法最终希望逼近的目标空间区域，而不是某个固定分数。
- MOG-DFM、[[AReUReDi]]、IMG、pcEBM、[[MOMO]]、goal-conditioned [[GFlowNet|GFlowNets]] 等方法都以“把样本推向 Pareto front”为核心目标。
- 对 Pareto front 的评价通常不只看是否有高分点，还看覆盖是否均匀、是否能覆盖凹形或复杂前沿，以及是否能保持多样性。
- 在离散生物序列与分子设计任务中，Pareto front 尤其适合表达亲和力、可溶性、半衰期、毒性等性质之间的冲突。
- 本库语境下，Pareto front 既是优化目标，也是结果分析对象，常与[[非支配解]]、[[Hypervolume Indicator|Hypervolume]]、多目标采样策略一起出现。

## 别名

- Pareto 前沿
- Pareto front
- 帕累托边界
- Pareto前沿
- PF
- Pareto front
- Pareto frontier
- 帕累托前沿
- 帕累托前线
- non-dominated front

## 外部背景

- 标准[[多目标优化]]教材中，Pareto front 通常定义为所有 Pareto optimal solutions 在目标空间中的集合，待核对经典来源。
- 若目标是最小化形式，Pareto front 可理解为在任一目标上都无法再同时改善而不牺牲其他目标的边界，待核对经典来源。
- 在工程与机器学习文献中，Pareto front 常与 hypervolume、epsilon indicator、IGD 等指标一起用于评估前沿逼近质量，待核对经典来源。
- 对于非凸 Pareto front，简单线性标量化往往难以覆盖全部前沿区域，这是多目标方法设计的重要动机，待核对经典来源。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
- [[2026 - 自适应收敛指标与邻域模糊拥挤距离的多峰多目标优化 - dangAdaptiveConvergenceIndicator2026]]
- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
