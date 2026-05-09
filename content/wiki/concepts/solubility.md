---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标生物序列设计"
background: "included"
---
# solubility

## 标准定义

溶解性（solubility）是指某种物质在特定溶剂、温度、压力和其他环境条件下，能够达到溶解平衡时所能进入溶液的最大量。在[[分子设计]]语境中，它通常更偏向水溶性或表观溶解性，常与分子[[logP|疏水性]]、带电状态、聚集倾向和分子尺寸相关。

## 在本知识库中的用法

在给定论文上下文中，solubility 被当作肽段/[[生物序列设计]]中的一个优化目标，通常希望提高。它与 [[hemolysis]]、[[non-fouling]]、[[half-life]]、[[binding affinity]] 等性质一起参与多目标权衡，用于把生成结果推向近似 [[Pareto front]] 的区域。上下文没有给出该指标的具体计算公式、实验测量协议或对应预测器细节，待从更多论文中补充。

## 关键点

- 标准上，solubility 描述分子在特定条件下的最大溶解能力；在生物分子设计里常默认指水溶性或表观溶解性。
- 在 [[多目标优化]] 中，solubility 往往与活性、毒性、稳定性等目标存在 trade-off，不能只看单一高分。
- 在本知识库的论文上下文里，solubility 主要出现在 [[肽段设计]] 任务中，作为需要被提高的性质之一。
- 它通常和 hemolysis、non-fouling、half-life、affinity 一起作为联合指导信号，帮助生成样本靠近 [[Pareto front]]。
- 当前上下文只说明它是一个可打分/可引导的性质目标，具体定义、单位与预测方式待从更多论文中补充。

## 别名

- 溶解性
- 溶解度
- aqueous solubility
- logS

## 外部背景

- 常见表示包括溶解度数值、饱和浓度、[[LogS|logS]]，或在特定 pH/缓冲液中的实验溶解性。
- 对肽和蛋白而言，净电荷、疏水性、氢键能力、二级结构倾向与聚集行为都会显著影响溶解性。
- 高溶解性通常有利于制剂、递送和实验操作，但并不自动意味着更高活性或更好稳定性。
- 在[[药物发现]]和材料设计中，solubility 既可通过实验测定，也常通过 QSPR/机器学习模型进行预测；待核对经典来源。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
