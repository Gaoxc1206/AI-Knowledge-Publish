---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
background: "included"
---
# SMS-EMOA

## 标准定义

SMS-EMOA（S-Metric Selection Evolutionary Multi-Objective Algorithm）是一类基于[[超体积]]贡献的稳态[[Evolutionary Algorithm|进化算法]]，用于解决[[多目标优化]]问题。它通常每次只产生少量后代，并通过评估个体对[[目标空间]]覆盖质量的边际贡献来进行选择，从而逐步逼近[[Pareto front]]。

## 在本知识库中的用法

在本知识库所对应论文中，SMS-EMOA 被作为传统[[多目标优化]]基线之一，用于与 [[AReUReDi]] 在肽 binder 设计任务上比较。论文在 1B8Q 和 PPP5 两个目标上将 SMS-EMOA 与 [[MOPSO]]、[[NSGA-III]]、[[SPEA2]]、PepTune + DPLM 进行对照，结论是 AReU[[Rectified Flow|ReDi]] 的整体 trade-off 更均衡，尤其在 non-fouling、solubility 和 half-life 上更占优，但运行时间更长。

## 关键点

- SMS-EMOA 属于稳态[[Multi-objective Evolutionary Algorithm|多目标进化算法]]，核心是用 [[超体积]] 或其贡献度来选择保留个体。
- 它更强调对 [[Pareto Front|Pareto 前沿]]覆盖质量的整体提升，而不是单一目标的极致最优。
- 在该论文中，SMS-EMOA 作为传统黑盒多目标优化基线，用于评估离散序列生成方法的相对优势。
- 论文比较表明，SMS-EMOA 等传统方法在部分指标上有竞争力，但在多属性均衡性上弱于 AReUReDi。
- SMS-EMOA 常用于中小规模多目标问题；在高维离散序列空间中，往往会面临搜索效率与约束表达能力不足的问题。

## 别名

- SMS-EMOA
- S-metric Selection EMOA
- S Metric Selection EMOA

## 外部背景

- SMS-EMOA 是 SPEA/NSGA 系列之外的经典 MOO 方法，名称中的 S-metric 指的是[[Hypervolume Indicator|超体积指标]]，常见于经典文献。
- 与代际型算法不同，SMS-EMOA 通常采用稳态更新：每次加入少量新解，再删除对超体积贡献最小的个体。
- 它在目标数不太高、且希望直接优化 Pareto 覆盖质量的场景中较常见。
- 待核对经典来源

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
