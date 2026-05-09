---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标优化"
background: "included"
---
# Pareto optimality

## 标准定义

在[[多目标优化]]中，若一个可行解不被任何其他可行解[[支配关系|支配]]，则称其为 Pareto optimal（[[Pareto 最优|帕累托最优]]）解。以最小化问题为例，若不存在另一解 y 使得对所有目标都有 f_i(y) ≤ f_i(x) 且至少一个目标严格更优，则 x 是 Pareto optimal。所有 Pareto optimal 解在[[目标空间]]中的像构成 [[Pareto front|Pareto 前沿]]；在[[决策空间]]中的对应集合常称为 [[Pareto set]]。

## 在本知识库中的用法

本知识库中，这一概念主要用于描述多目标生成/优化方法希望逼近的目标：[[MOG-DFM]] 试图让离散生物序列朝多个性质的 [[Pareto front]] 采样，但作者明确说明“不保证 Pareto optimal”；[[Goal-conditioned GFlowNets]] 通过指定 [[focus region]] 来覆盖 Pareto front 的不同区域；[[pcEBM]] 与 PAMA 更强调朝 Pareto 改进方向更新，并在理论上收敛到 [[Pareto stationary point]]；EHVI 则通过最大化超体积增益来扩展 Pareto front；IMG 在扩散模型推理阶段通过重采样把生成分布推向多目标 Pareto 分布。

## 关键点

- Pareto optimality 的核心是“非支配性”：不是寻找单一最优解，而是寻找一组彼此不同、各自代表不同权衡的解。
- 在生物序列与分子设计中，它常用于同时处理互相冲突的性质，例如活性/亲和力与毒性、溶解性、稳定性之间的权衡。
- 在本库相关工作里，MOG-DFM、Goal-conditioned GFlowNets、pcEBM、PAMA、IMG 都在不同层面上服务于 Pareto 前沿附近的采样、优化或对齐。
- 与 Pareto optimality 相关的常见评估包括 [[Hypervolume]]、R2 indicator、覆盖度和多样性，而不只是单点分数。
- 对非凸前沿，固定加权和往往无法覆盖全部 Pareto 解，因此更需要 Pareto-aware 的生成或采集策略。

## 别名

- Pareto efficiency
- Pareto optimal
- Pareto efficient
- 帕累托最优
- 帕累托效率

## 外部背景

- 标准定义通常区分 Pareto optimal、weakly Pareto optimal、Pareto set 与 Pareto front；其中前者是决策空间概念，后者是目标空间投影。
- 在最大化问题中，支配关系的方向与最小化相反：若所有目标都不差且至少一个更好，则一个解支配另一个解。
- 当使用梯度法做多目标优化时，若无法找到能同时改进所有目标的方向，算法可能停在 Pareto stationary point；待核对经典来源。
- 多目标优化中的加权和标量化只保证在一定条件下恢复凸前沿上的解，对非凸 Pareto front 常不充分。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
