---
type: "dataset"
status: "enriched"
category: "数据集"
domain: "多目标增强子 DNA 设计"
background: "included"
---
# enhancer DNA 多目标设计

## 标准定义

enhancer DNA 多目标设计通常指：围绕增强子序列构建一个带有功能标签与结构/性质标签的设计任务或评测集，用于同时优化多个目标，例如增强子类别（enhancer class）与 DNA shape 特征（如 HelT、Rise）。这类数据集常与[[多目标优化]]、[[序列生成]]和性质引导采样结合，用来评估模型能否在保持序列可行性的同时实现多个目标之间的折中。

## 在本知识库中的用法

在本知识库中，该节点特指论文 [[Multi-Objective-Guided Discrete Flow Matching|MOG-DFM]] 中的 enhancer DNA 多目标设计实验设置：模型在[[Discrete Flow Matching|离散流匹配]]采样过程中同时引导 enhancer class 与 DNA shape 两类目标。论文给出两个任务：Task 1 目标为 enhancer class 1 且更高 HelT；Task 2 目标为 enhancer class 16 且更高 Rise。每个设置生成 5 条长度为 100 的 enhancer DNA 序列，并比较同时开启/关闭 class guidance 与 shape guidance 时的结果。该节点更偏向“基准任务/评测集”而不是通用 enhancer 数据库。

## 关键点

- 这是一个面向[[enhancer DNA]]生成的多目标设计任务，核心不是单一分类，而是同时满足功能类别与[[DNA shape]]目标。
- 在论文设置中，Task 1 关注 enhancer class 1 + 较高 HelT，Task 2 关注 enhancer class 16 + 较高 Rise。
- 每个任务生成 5 条长度 100 的序列，用于观察多目标引导是否能同时提升类别概率与形状指标。
- 消融结果表明：去掉 class guidance 或 shape guidance 后，对应目标会明显退化，说明任务确实依赖多目标控制。
- 该设置被用来验证 MOG-[[Discrete Flow Matching|DFM]] 不仅适用于肽序列，也能迁移到 DNA 序列的多目标[[可控生成]]。
- 待从更多论文中补充

## 别名

- Enhancer DNA
- enhancer sequence design
- 增强子序列设计
- EnhancerDFM enhancer task

## 外部背景

- 增强子（enhancer）是调控基因表达的顺式调控 DNA 元件，常通过序列特征和结构特征共同影响转录活性。
- DNA shape 是对 DNA 局部几何构象的描述，常见特征包括 HelT（helical twist）和 Rise（碱基对堆叠上升量）。
- 多目标[[蛋白质序列设计|序列设计]]通常会为每个目标训练一个评分器或预测器，再在生成过程中联合优化这些分数。
- 待核对经典来源

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
