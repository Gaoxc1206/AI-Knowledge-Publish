---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# R2 indicator

## 标准定义

R2 indicator（也写作 [[R^2 indicator]]）是[[多目标优化]]中的一种解集质量指标，常用于评价一个解集对 [[Pareto front]] 的逼近程度。它通常基于一组[[Preference Vector|权重向量]]和一个参考点，把每个目标向量映射为标量效用，再对多个权重下的最优效用做汇总；一般来说，R2 越低，表示解集在收敛性与覆盖性上越接近理想前沿。它与回归里的“R²”不是同一个概念。

## 在本知识库中的用法

在该论文中，R2 indicator 被用作[[多目标分子设计]]结果的评估指标之一，用来衡量优化得到的分子集合对近似 [[Pareto front]] 的逼近质量。论文明确采用“越低越好”的解释，并用它比较 [[EHVI]] 与固定权重 [[标量化]] [[Expected Improvement]] 的表现；结果显示 [[Expected Hypervolume Improvement|EHVI]] 在三个 GUACAMOL [[多目标分子优化]]任务上都取得了更低的 R2 值，说明其 Pareto front 近似更好。

## 关键点

- R2 indicator 属于多目标优化的[[评价指标]]，主要看解集对 [[Pareto front]] 的逼近质量，而不是单点最优值。
- 常见计算思路是用一组权重向量把多目标向量转成标量效用，再对整体现象做汇总；它与 [[超体积指标]] 是互补而非同一类指标。
- 在本知识库对应论文中，R2 被明确当作“越低越好”的指标，用于比较 [[EHVI]] 和固定权重 [[标量化]] 方法。
- 论文结果表明，在 Fexofenadine、Amlodipine、Perindopril 三个任务上，E[[Hypervolume Indicator|HVI]] 都比固定权重 EI 得到更低的 R2，说明其 Pareto 覆盖更好。
- R2 在这里不仅反映最终解的质量，也间接反映 [[多目标贝叶斯优化]] 的搜索效率与前沿覆盖能力。

## 别名

- R^2 indicator
- R2 指标
- R2 metric

## 外部背景

- 常见的 R2 指标实现会依赖参考点、权重向量集合以及某种[[标量化]]函数（如 Tchebycheff 或 achievement scalarizing function），待核对经典来源。
- R2 指标通常与 [[Hypervolume Indicator|hypervolume]]、spacing、[[IGD]] 等多目标性能指标一起使用，用于从不同角度评价 Pareto 近似集，待核对经典来源。
- 在很多文献中，R2 更强调“对前沿整体的代表性与覆盖性”，而不仅是某一个最优点，待核对经典来源。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
