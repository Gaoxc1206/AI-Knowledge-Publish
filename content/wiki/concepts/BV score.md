---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "抗体序列多目标优化"
background: "included"
---
# BV score

## 标准定义

BV score 通常指用于衡量候选蛋白或抗体序列非特异性结合倾向、背景结合风险或相关性质的评分指标。它常作为可优化的属性分数出现；不同数据集、实验体系或预测模型中，分数的具体含义与方向性（越大越好或越小越好）可能不同，需要结合具体定义理解。

## 在本知识库中的用法

在这篇论文中，BV score 被当作[[抗体设计|抗体序列设计]]中的一个目标性质，与 [[Ab-like]] 和[[binding affinity|结合亲和力]] [[Aff]] 一起进入 [[多目标优化]] 框架。论文用它来刻画非特异性结合风险，并将其对应的[[Energy-Based Model|能量模型]]纳入 [[pcEBM]] 的组合采样与 Pareto 改进过程；实验里也把它作为[[Hypervolume Indicator|超体积]]（HV）和[[edit distance|编辑距离]]分析中的一个目标维度。

## 关键点

- BV score 在本库中主要对应[[抗体设计]]里的非特异性结合/背景结合风险，而不是通用分类分数。
- 论文把 BV score 视为可与 [[Ab-like]]、[[Aff]] 并列优化的性质之一，用于构造 [[Pareto front]]。
- 在 p[[cEBM]] 中，BV score 对应一个属性能量模型；采样时会沿着多个目标的 [[Multiple Gradient Descent]] 方向推进。
- 它体现了[[抗体设计|治疗性抗体设计]]中的典型权衡：提高结合能力不应以显著增加非特异性风险为代价。
- 具体数值含义与方向性在不同任务里可能不同，需结合原始 assay 或预测器定义判断。

## 别名

- BV
- nonspecificity score
- non-specificity score
- 背景结合评分
- 非特异性结合评分

## 外部背景

- 在抗体 [[developability]] 评估中，类似 BV 的指标常用于表征非特异性、粘连倾向或背景结合风险，和 [[特异性]]、[[可开发性]] 密切相关。
- 这类分数有时来自实验筛选，有时来自学习到的预测模型；不同来源的标定尺度可能不可直接比较。
- 用于优化时，BV score 往往与亲和力、免疫原性、黏度等指标一起构成多目标权衡；待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
