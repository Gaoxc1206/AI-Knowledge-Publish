---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "DNA shape 建模与 enhancer DNA 设计"
background: "included"
---
# HelT

## 标准定义

HelT 通常指 DNA 的 helical twist（螺旋扭转）这一局部结构参数，用来描述相邻碱基对之间沿双螺旋轴的旋转角度变化。它属于 [[DNA shape]] 特征之一，常用于刻画序列如何影响局部三维构象，并可与 [[Rise]]、Roll、Tilt、Propeller Twist 等指标一起用于 DNA 结构分析与功能建模。标准上，HelT 是一个结构几何量，而不是任务指标本身；在建模中，它可以作为可预测、可优化或可控制的连续性质。

## 在本知识库中的用法

在这篇论文的上下文中，HelT 被当作 enhancer DNA 设计任务里的一个可控制目标/属性，与 enhancer class 以及 [[Rise]] 等 [[DNA shape]] 特征一起用于多目标引导生成。论文并没有重新定义 HelT，而是把它作为预训练 score function 的评价对象，配合 [[Discrete Flow Matching]] 的采样过程进行多目标引导，使生成的 DNA 序列朝指定的性质权衡方向移动。

## 关键点

- HelT 是 [[DNA shape]] 中的局部几何描述，标准含义是 helical twist；本质上反映碱基步长的旋转角变化。
- 它常与 [[Rise]] 等结构特征一起使用，用于描述序列到局部构象的映射关系。
- 在本文中，HelT 不是独立任务，而是 enhancer DNA 设计中的一个优化/控制目标。
- 作者把 HelT 纳入多目标引导框架，与 enhancer class 等性质共同参与序列采样重加权。
- 该论文关注的是如何在 [[Discrete Flow Matching]] 的离散生成过程中直接调控 HelT，而不是先做连续嵌入再优化。
- 就本知识库而言，HelT 更像一个可预测的生物物理属性节点，适合与 [[DNA shape]]、[[多目标优化]]、[[分子生成]] 关联理解。

## 别名

- helical twist
- Helical Twist
- DNA helical twist

## 外部背景

- HelT 通常是 DNA 形状特征集中的标准指标之一，常见于序列-结构预测与调控元件建模。
- 在经典 DNA shape 建模中，HelT 往往由序列上下文决定，反映局部双螺旋几何而非单个碱基的孤立性质。
- HelT 的具体数值定义、单位与测量方式在不同数据库/工具中可能略有差异，待核对经典来源。
- 常见相关特征还包括 Roll、Tilt、Shift、Slide、[[Rise]]、Propeller Twist 等，通常一起刻画 DNA 构象。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
