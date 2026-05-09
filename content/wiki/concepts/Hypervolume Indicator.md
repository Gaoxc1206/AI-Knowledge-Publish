---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标贝叶斯优化"
background: "included"
---
# Hypervolume Indicator

## 标准定义

[[Hypervolume]] Indicator（超[[Hypervolume|体积指标]]，常记为 HVI）是[[多目标优化]]中衡量一组[[Non-dominated Solutions|非支配解]]对 [[Pareto front]] 覆盖质量的指标。它通常以一个参考点（[[Reference point mechanism|reference point]]）为基准，计算[[目标空间]]中“被该解集支配并且位于参考点之内”的体积；在最大化设定下，[[Hypervolume|超体积]]越大，说明解集越接近理想前沿、覆盖范围越广。该指标同时反映收敛性与分布性，是多目标优化里最常用的性能度量之一。

## 在本知识库中的用法

在本知识库所对应的论文比较中，Hypervolume Indicator 用来评估[[多目标分子设计]]过程中不同采集策略的 Pareto 覆盖质量。作者在相同的 [[Gaussian Process]] 代理模型、分子表示和预算下，对 [[Expected Hypervolume Improvement]] 与[[固定权重标量化]]方法进行对比，并报告 200 轮 BO 后各任务的最终 hypervolume。结果显示，[[Expected Hypervolume Improvement|EHVI]] 在 Fexofenadine 和 Amlodipine 上的 HVI 通常更高，在 Perindopril 上与基线接近但更早收敛、方差更低。因此，这里 HVI 主要作为衡量 [[多目标贝叶斯优化]] 结果优劣的核心指标，而不是单纯的单目标最优值。

## 关键点

- 超体积指标衡量的是解集在目标空间中对参考点的支配体积，值越大通常越好。
- 它同时反映 Pareto front 的覆盖范围、收敛程度与解集分布情况。
- 在该论文中，HVI 被用于比较 EHVI 与固定权重标量化 EI 在分子优化中的整体表现。
- 论文采用相同的 surrogate、分子表示与候选池，尽量让 HVI 的差异只来自采集函数。
- 实验中 EHVI 在多数任务上获得更高或相当的 HVI，说明其对 Pareto 覆盖更有利。

## 别名

- HVI
- hypervolume
- 超体积
- 超体积指标

## 外部背景

- Hypervolume Indicator 常被认为是少数同时兼顾收敛与多样性的多目标评价指标之一。
- HVI 的数值依赖参考点的选取，因此参考点通常需要放在所有候选解都能支配的区域之外。
- 在二维或三维目标下，HVI 可以较精确计算；高维情况下常需要近似算法或 Monte Carlo 估计。
- HVI 与 [[Expected Hypervolume Improvement]] 关系紧密：前者是评价指标，后者是直接优化超体积增益的采集函数。
- 待核对经典来源

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
