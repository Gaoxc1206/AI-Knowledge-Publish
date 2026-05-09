---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "DNA形状建模与增强子设计"
background: "included"
---
# Rise

## 标准定义

Rise 是 DNA 双螺旋中相邻碱基对沿螺旋轴方向的位移/间距参数，常作为 [[DNA shape]] 描述子之一，用来刻画局部几何构象。一般可理解为“碱基对沿轴向前进了多少”，与螺旋结构的局部伸展程度相关；具体数值通常由结构模型或预测器给出，属于背景知识，不特指某一篇论文的定义。

## 在本知识库中的用法

在该论文的 enhancer DNA 设计任务中，Rise 被当作可控的 [[DNA shape]] 属性之一，与 [[HelT]] 一起作为多目标引导的优化对象。论文并未重点解释 Rise 的生物物理含义，而是将其视为预训练[[性质预测]]器可打分的序列性质，用于在离散生成过程中引导序列朝目标方向采样。

## 关键点

- Rise 属于 [[DNA shape]] 的局部几何特征，不是序列碱基类别本身。
- 在本知识库里，它主要作为 [[enhancer DNA]] 设计中的可控性质出现，而不是单独的建模主题。
- 论文将 Rise 与 enhancer class、HelT 等目标联合起来做多目标引导，体现的是性质协同控制而非单指标优化。
- 其作用是帮助生成器在离散序列空间中调整局部结构偏好，从而影响增强子相关功能表型。
- 关于 Rise 的具体数值范围、方向解释和阈值选择，当前上下文不足，待从更多论文中补充。

## 别名

- DNA rise
- base-pair rise
- bp rise

## 外部背景

- 在经典 DNA 结构几何中，Rise 通常指相邻碱基对之间沿螺旋轴的垂直位移，常与 Twist、Roll、Tilt、Shift、Slide 等一起构成 DNA 构象描述。待核对经典来源
- Rise 常被用于 [[Deep DNAshape|DNA shape prediction]] 或结构注释中，作为从序列推断局部构象的一个输出特征。待核对经典来源
- 与 HelT 相比，Rise 更偏向轴向间距/伸展程度的描述；两者常被一起用于刻画局部双螺旋几何。待核对经典来源

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
