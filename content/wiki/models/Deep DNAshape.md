---
type: "model"
status: "enriched"
category: "其他"
domain: "DNA形状预测、增强子设计"
background: "included"
---
# Deep DNAshape

## 标准定义

Deep DNAshape 通常指一类基于深度学习的 [[DNA shape]] 预测模型：输入 [[DNA序列]]，输出与局部双螺旋结构相关的形状特征预测值，例如 minor groove width、roll、helix twist、rise 等。它常被用于解析序列如何影响 DNA 结构，并为调控元件建模、转录因子结合分析和[[蛋白质序列设计|序列设计]]提供结构先验。

## 在本知识库中的用法

待从更多论文中补充

## 关键点

- 标准定义上，Deep DNAshape 是从 DNA 序列预测 DNA 结构/形状特征的模型，而不是序列生成模型。
- 这类模型通常服务于 [[转录因子结合]]、调控元件解析和结构约束下的序列设计。
- 在当前知识库上下文中，只能确认 enhancer DNA 设计显式使用了 DNA shape 作为优化目标；Deep DNAshape 的具体实现、训练数据和接口尚未在该论文上下文中说明。
- 如果它被用作打分器或代理模型，可以为生成过程提供形状相关的指导信号；但这属于通用用途，不应视为当前论文已证实的细节。

## 别名

- DeepDNAshape
- Deep DNAshape
- 深度DNAshape

## 外部背景

- DNA shape 是由核苷酸序列决定的局部几何与物理特征，常见表征包括 MGW、Roll、HelT、Rise 等。
- 传统 DNA shape 预测既有基于实验统计/物理建模的方法，也有基于机器学习或深度学习的方法；Deep DNAshape 属于后者，具体实现细节待核对经典来源。
- DNA shape 特征常用于解释转录因子对同一 motif 不同序列上下文的偏好，待核对经典来源。
- 在增强子设计或调控序列优化中，DNA shape 可作为与类别标签并列的辅助控制目标，待核对经典来源。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
