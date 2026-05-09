---
type: "method"
status: "enriched"
category: "其他"
domain: "多目标肽序列设计"
---
# PepTune

## 定义

PepTune 在给定笔记中仅作为对比方法出现，未提供其具体算法结构、训练方式或优化目标的详细说明。可以确认它与肽/[[SMILES generation|SMILES 生成]]评测相关，并被用于与 [[AReUReDi]] 比较生成质量相关指标。其更完整的机制与应用范围待从更多论文中补充。

## 关键点

- 在当前上下文中，PepTune 主要作为基线方法出现。
- 它被用于与 AReU[[ReDi]] 的生成结果进行比较，比较维度包括 [[chemical diversity|diversity]] 和 SNN 等指标。
- 上下文未说明 PepTune 的模型类型、是否属于[[离散流模型]]或[[多目标优化]]方法。
- 其与肽序列或 peptide [[SMILES]] 生成任务相关，但具体任务设置待从更多论文中补充。

## 别名

- 无

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
