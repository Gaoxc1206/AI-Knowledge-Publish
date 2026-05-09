---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标优化与多目标分子设计"
background: "included"
---
# IGD

## 标准定义

IGD（[[Inverted Generational Distance]]，逆世代距离）是[[多目标优化]]中常用的覆盖性评价指标，用来衡量一个近似解集与参考前沿（通常是[[Pareto front]]或其采样点集）之间的平均距离。直观上，IGD越小，说明近似解集越能覆盖参考前沿、整体分布越接近目标前沿。它既关注解的质量，也关注对前沿不同区域的覆盖程度；在多目标问题中常与[[Hypervolume Indicator|超体积]]（HV）等指标一起使用。严格定义可能随论文和实现细节略有差异，待核对经典来源。

## 在本知识库中的用法

在该论文中，IGD用于评估不同方法在[[多目标分子设计]]任务中对[[目标空间]]/[[Pareto前沿]]的覆盖程度。作者报告：在多个复杂二目标landscape上，[[goal-conditioning|goal-conditioned]] [[GFlowNet]] 与 [[preference-conditioning|preference-conditioned GFlowNet]] 的IGD整体差距不大；这说明仅看IGD时，两者的覆盖性表面上相近，但并不能充分反映goal-conditioned方法在可控性、均匀采样和前沿分布质量上的优势。因此，论文同时结合了[[PC-ent]]和[[Avg-PCC]]来更全面比较方法。

## 关键点

- IGD衡量的是近似解集到参考前沿的平均距离，因此更偏向“前沿覆盖是否充分”的评估，而不只是单点最优性。
- 在本文的多目标[[分子设计]]实验里，IGD主要用于比较 goal-conditioned 与 [[preference-conditioning|preference-conditioned]] 方法对不同 Pareto 前沿形状的覆盖效果。
- 论文结果显示，两种方法的IGD差距并不总是很大，但这并不代表生成分布同样均匀；还需要结合[[PC-ent]]和[[Avg-PCC]]判断。
- 对于凹形或多峰形的目标空间，单看IGD可能不足以体现方法是否真正实现了用户指定的目标区域采样。
- IGD通常越小越好，但其数值依赖参考集的构造方式、归一化方式以及距离度量实现。

## 别名

- Inverted Generational Distance
- 逆世代距离
- 反向世代距离
- IGD

## 外部背景

- IGD常与GD（Generational Distance）对照理解：GD看“生成集到参考集”的距离，IGD看“参考集到生成集”的距离。
- 在多目标优化文献中，IGD及其变体IGD+常被用于评价算法对Pareto front的逼近与覆盖，待核对经典来源。
- 若参考前沿采样不充分，IGD可能对结果产生偏差，因此实验中参考集构造很关键，待核对经典来源。
- IGD更强调分布覆盖，和超体积（HV）这类更强调优势区域体积的指标侧重点不同，待核对经典来源。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
