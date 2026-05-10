---
type: "method"
status: "enriched"
category: "生成模型"
domain: "分子生成"
background: "included"
---
# SMILESReDi

## 标准定义

[[SMILES]][[Rectified Flow|ReDi]] 可理解为一种基于 SMILES 表示的 [[Rectified Discrete Flow]] 生成模型：把分子写成离散 token 序列，在 token 级别建模从噪声/初始分布到目标分子的逐步变换，并通过 rectification（校正）提高少步采样时的生成质量与有效性。它属于离散序列生成方法，常用于无条件[[分子生成]]或作为后续引导优化的先验生成器。

## 在本知识库中的用法

在本知识库对应论文中，SMILESReDi 是 [[AReUReDi]] 的基础无[[可控生成|条件生成]]器之一，用于 peptide SMILES 生成。它被作为[[Discrete Flow Matching|离散流]]先验，与多目标引导、[[Tchebycheff scalarization]]、[[Locally Balanced Proposals|locally balanced proposal]] 和 annealed [[Metropolis-Hastings]] updates 结合，以把生成样本推向多属性 [[Pareto Front|Pareto front]]。文中报告 SMILESReDi 在 16 个 generation steps 下 validity 为 76.3%，经过一轮 rectification 后提升到 98.6%，32 steps 时达到 100%；因此这里的用法重点是“为后续多目标采样提供高质量、可校正的 peptide SMILES 生成底座”。

## 关键点

- SMILESReDi 是面向 [[SMILES]] 序列的离散生成模型，核心作用是输出有效、可编辑的分子字符串。
- 在本库论文里，它不是最终优化算法，而是 AReUReDi 的基础 prior，用来提供候选分子分布。
- 其价值主要体现在 rectification 后的高 validity 与更稳定的少步生成质量，适合作为多目标引导的起点。
- 它服务于 peptide SMILES 设计场景，因此与肽序列生成并列，属于离散生物分子生成的一种实现。
- 在 AReUReDi 框架中，SMILESReDi 生成结果再经过多目标 reward 引导和 MH 接受更新，以改善 affinity、solubility、hemolysis、non-fouling 等属性的 trade-off。

## 别名

- SMILES ReDi
- SMILES Rectified Discrete Flow
- SMILES-DRF
- SMILES rectified flow

## 外部背景

- SMILES 是一种把分子图编码为线性字符串的常见表示法，便于使用序列生成模型处理。
- 离散流模型（discrete flow）与离散扩散/flow matching 类方法类似，目标是在离散状态空间中学习逐步变换过程，待核对经典来源。
- Rectified Flow / Rectified Discrete Flow 通常强调通过“校正”降低采样路径复杂度，从而提升少步生成效果，待核对经典来源。
- 在分子生成任务中，SMILES 生成模型常用 validity、uniqueness、diversity 等指标评估，属于通用背景知识。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
