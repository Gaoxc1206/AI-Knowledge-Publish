---
type: "method"
status: "enriched"
category: "代理模型"
domain: "DNA序列到结构预测、增强子设计"
background: "included"
---
# Deep DNAshape

## 标准定义

Deep DNAshape 通常指一种基于深度学习的 [[DNA shape]] 预测方法：输入 DNA 序列，输出其局部几何/构象特征的估计，例如 [[HelT]]、[[Rise]]，以及常见的 MGW、Roll、ProT 等。它本质上是一个序列到结构的预测器，常被用作序列表征、性质打分或下游设计中的辅助模型。

## 在本知识库中的用法

在当前这篇关于可控[[生物序列设计]]的论文上下文中，只能确认作者在 enhancer DNA 设计任务里把 [[DNA shape]]（例如 [[HelT]]、[[Rise]]）作为可控目标之一；文中未明确说明是否具体采用 Deep DNAshape 作为打分器、约束器或特征提取器。与本文的直接关联，待从更多论文中补充。

## 关键点

- Deep DNAshape 的核心作用是从 DNA 序列中预测 [[DNA shape]]，属于典型的序列到结构代理模型。
- 它输出的形状特征可用于描述调控序列的局部构象偏好，并服务于 [[增强子 DNA]]、启动子等设计任务。
- 常见可预测特征包括 [[HelT]]、[[Rise]]，以及其他经典 DNA 形状参数；具体输出集合可能随实现而变化。
- 在[[controllable generation|可控生成]]场景中，这类模型通常可作为性质评估器、[[奖励模型]]或[[多目标优化]]中的一个[[黑盒 oracle|目标函数]]来源。
- 就当前库内论文而言，只能确认 [[DNA shape]] 被用于多目标控制，Deep DNAshape 是否为具体实现尚不明确。

## 别名

- DeepDNAshape
- Deep DNAshape
- DNA shape prediction
- 深度DNA形状预测

## 外部背景

- DNA 形状是由序列上下文决定的局部几何/力学属性，常用于解释转录因子识别和调控元件功能，待核对经典来源。
- 深度学习方法可以从原始序列中学习非线性特征映射，相比手工特征更适合拟合复杂的序列-结构关系，待核对经典来源。
- [[DNA shape]] 预测模型常与 [[可控生成]]、序列筛选、调控元件优化结合使用，作为下游的性质评分器，待核对经典来源。
- Deep DNAshape 的具体网络结构、训练数据与标准基准，待核对经典来源。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
