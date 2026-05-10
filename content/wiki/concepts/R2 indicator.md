---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# R2 indicator

## 标准定义

R^2 indicator 是[[多目标优化]]中衡量解集质量的指标之一，通常基于一组参考权重向量或参考方向，把每个解集在这些方向上的效用值进行聚合，从而评价解集对[[目标空间]]中理想前沿的逼近程度与覆盖程度。常见理解是：数值越低，表示解集越接近参考 [[Pareto Front|Pareto front]]，且在多个 trade-off 方向上的表现越均衡。它与[[超体积指标]]不同，更强调基于参考方向的整体逼近质量，而不只是支配体积。

## 在本知识库中的用法

在本知识库对应论文中，R^2 indicator 用作多目标[[Bayesian optimization|贝叶斯优化]]的前沿逼近评价指标之一，用来比较 EHVI 与固定权重标量化 EI 在 [[GUACAMOL]] 三个多目标[[分子优化]]任务上的结果。该用法中，R^2 indicator 越低越好；作者用它判断不同方法得到的解集是否更接近近似 Pareto front。实验结论是：在 Amlodipine、Fexofenadine 和 Perindopril 任务上，EHVI 的 R^2 indicator 整体低于 scalarized EI，说明 EHVI 的 Pareto front approximation 更好、更稳定。

## 关键点

- R^2 indicator 属于多目标优化中的[[评价指标]]，主要评估解集对参考 Pareto front 的逼近质量。
- 标准上它通常依赖一组参考方向/权重向量，并通过某种效用聚合函数对解集进行评分。
- 在本库对应研究中，它被用来比较 EHVI 与固定权重 scalarized EI 的前沿逼近能力。
- 该研究中 R^2 indicator 的判读方向是“越低越好”，低值表示解集更接近参考前沿。
- 论文结果显示 EHVI 在三个 GUACAMOL 多目标任务上都获得更低的 R^2 indicator，说明其 Pareto-aware acquisition 更有利于覆盖不同权衡区域。

## 别名

- R²指标
- R2指标
- R2 metric
- R^2 metric

## 外部背景

- R^2 indicator 常与 reference direction / weight vector 结合使用，是[[Multi-objective Evolutionary Algorithm|多目标进化算法]]和多目标贝叶斯优化中常见的解集质量评估工具。
- 它与[[超体积指标]]互补：[[Hypervolume Indicator|超体积]]更强调支配体积，R^2 更强调沿多个方向的均衡逼近。
- 不同文献中 R^2 indicator 的具体效用函数可能不同，常见包括基于 Tchebycheff 距离的变体；待核对经典来源。
- 在部分文献中，R^2 indicator 也被用于分析算法是否偏向某些局部 trade-off 区域，而不是整体覆盖 Pareto front。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
