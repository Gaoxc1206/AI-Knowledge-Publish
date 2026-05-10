---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "DNA序列设计"
background: "included"
---
# DNA Shape

## 标准定义

DNA shape 指由 DNA 序列决定的局部三维构象与几何特征集合，常用于刻画双螺旋在不同位置的结构差异。它不同于仅看碱基字母本身的序列表示，更强调序列对物理形态的影响。常见的 DNA shape 特征包括 minor groove width、helix twist、roll、propeller twist，以及更细粒度的局部几何量；这些特征可作为转录调控、蛋白-DNA 识别和序列功能建模的结构性描述。

## 在本知识库中的用法

在这篇论文里，DNA shape 被当作 enhancer DNA 设计中的一个可控目标，与 enhancer class 并列用于多目标引导采样。作者在两个任务中分别以目标 enhancer class 1 / 16 搭配较高的 [[HelT]] 或 [[Rise]] 作为引导目标；结果表明，同时开启 class 与 shape guidance 时，生成序列能同时提升类别概率和 shape 指标，而去掉其中一种 guidance 会使对应指标明显下降。

## 关键点

- DNA shape 是序列诱导的局部结构特征，不是单纯的分类标签或全局分数；它更适合与 [[enhancer]] 等功能目标一起作为设计约束。
- 在本知识库对应论文中，DNA shape 作为 enhancer DNA 设计的多目标之一，和 enhancer class 共同构成[[可控生成]]条件。
- 论文具体使用的 shape 相关目标包括 [[HelT]] 和 [[Rise]]，分别对应不同任务中的结构偏好。
- 实验结果支持：class 与 shape 双重引导优于只保留其中一个目标，说明 DNA shape 在可控序列设计中具有独立信息。
- DNA shape 在这里不是生成模型结构本身，而是用于对离散序列采样进行外部评分和引导的属性。

## 别名

- DNA结构形状
- DNA shape features
- DNA structural features

## 外部背景

- DNA shape 通常由 sequence-dependent structural models 近似预测，可从序列推断局部构象参数，待核对经典来源。
- DNA shape 常被用于解释转录因子结合特异性，因为某些蛋白不仅识别碱基序列，也识别 DNA 的局部几何形态，待核对经典来源。
- 常见 DNA shape 表征除了 HelT、Rise 外，还包括 MGW、ProT、Roll、Shift、Slide、Tilt、Buckle 和 Opening，待核对经典来源。
- DNA shape 特征通常可在滑动窗口上按位置计算，因此适合做位置相关的序列分析与设计约束，待核对经典来源。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
