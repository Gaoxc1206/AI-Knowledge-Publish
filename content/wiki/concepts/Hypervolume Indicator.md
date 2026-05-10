---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标优化"
background: "included"
---
# Hypervolume Indicator

## 标准定义

[[Hypervolume Indicator|Hypervolume]] Indicator（HV，超体积指标）是[[多目标优化]]中常用的 [[Pareto front]] 质量指标，用来度量一组非支配解在[[目标空间]]中所支配的体积，通常相对于一个预先指定的参考点（reference point）计算。对最小化问题而言，HV 越大表示解集越接近理想前沿、覆盖范围越广；对最大化问题通常可通过符号变换或等价定义处理。它同时反映收敛性与多样性，因此是衡量 [[Pareto 最优|Pareto optimality]] 近似质量的经典指标之一。

## 在本知识库中的用法

在本知识库所给论文中，HV 主要被用作评估多目标设计结果的核心指标，而不是训练目标本身。

1. 在蛋白质/抗体序列采样任务中，论文用 HV 衡量 pc[[Energy-Based Model|EBM]]、cEBM、ls-cEBM、MGD 等方法生成序列对多个性质（Ab-like、Aff、BV）的 [[Pareto front]] 覆盖程度；结果显示 pcEBM 在若干步长设置下取得更高或更稳定的 HV。
2. 在分子设计的多目标 [[Bayesian optimization]] 研究中，HV 用于比较 [[Expected Hypervolume Improvement]]（EHVI）与固定权重标量化 EI；EHVI 在三个 [[GUACAMOL]] 多目标任务上总体表现出更高的 HV 或更快的 HV 收敛。
3. 这些论文中，HV 都被视为“前沿覆盖质量”的主要量化标准，和 $R^2$ indicator、结构多样性指标一起用于综合评价方法优劣。
4. 在库内语境里，HV 更偏向于“结果评估指标”，用来判断方法是否更好地探索了多目标权衡区域，而不是单独评价某一个目标值。

## 关键点

- HV 衡量的是解集在目标空间中所支配的体积，因此天然适合评价 [[Pareto front]] 的覆盖质量与多样性。
- HV 越大通常表示结果越好；在多目标生成/优化任务中，它比只看单点最优值更能反映整体 trade-off 质量。
- 本知识库中的两篇论文都把 HV 作为核心评估指标：一篇用于蛋白质序列多目标采样，一篇用于分子设计中的 Pareto-aware BO。
- 在蛋白质任务里，pcEBM 相比朴素 cEBM 展现出更好的 HV，说明其更能沿多个性质的权衡前沿进行采样。
- 在分子设计任务里，EHVI 相比固定标量化 EI 通常带来更高 HV，说明直接面向 [[Expected Hypervolume Improvement]] 的采集策略更有利于扩展前沿。

## 别名

- Hypervolume indicator
- 体积指标
- HV
- Hypervolume
- Hypervolume metric
- 超体积
- 超体积指标

## 外部背景

- HV 需要指定参考点；参考点选取会影响数值大小，因此不同实验间的 HV 需要在相同设置下比较。
- HV 是少数同时考虑收敛性与多样性的多目标指标之一，常用于评价非支配解集质量。
- 在目标维度较高时，HV 的精确计算可能变得昂贵，实际研究中常采用近似或 Monte Carlo 估计。
- 待核对经典来源

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
