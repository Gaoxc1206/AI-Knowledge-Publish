---
type: "method"
status: "enriched"
category: "生成模型"
domain: "增强子DNA设计"
background: "included"
---
# EnhancerDFM

## 标准定义

Enhancer[[Discrete Flow Matching|DFM]] 可视为一种用于增强子 DNA 序列生成的 [[Discrete Flow Matching]] 方法：它在离散 token 空间中学习逐步转移速率，并通过[[连续时间马尔可夫链]]式采样从先验分布生成序列，而不是先把序列映射到连续空间再做优化。

## 在本知识库中的用法

在这篇论文里，EnhancerDFM 指用于 enhancer DNA 任务的[[Discrete Flow Matching|离散流匹配]]生成器/实验分支，主要用于无[[controllable generation|条件生成]]评估；作者报告其在 10k 条 enhancer DNA 生成上的质量接近 Dirichlet FM。结合本文的多目标引导框架，它对应 enhancer class 与 [[DNA shape]]（如 [[HelT]]、[[Rise]]）控制场景；更具体的架构与训练细节待从更多论文中补充。

## 关键点

- 它属于离散序列生成方法，直接在碱基 token 层面建模局部转移，而不是先转到连续嵌入空间再处理。
- 在本文中，EnhancerDFM 主要作为 enhancer DNA 的生成基线，用于无条件生成质量评估。
- 论文报告其在 10k 条 enhancer DNA 生成任务上的表现接近 Dirichlet FM。
- 在多目标设计语境下，enhancer 任务关注 enhancer class 与 DNA shape 等目标，可与引导式生成框架结合。
- 相比连续松弛式方法，这类离散生成器更贴近真实 DNA 的离散分布。
- 更细的网络结构、训练损失和采样细节，现有上下文不足，待从更多论文中补充。

## 别名

- Enhancer DFM
- Enhancer-DFM

## 外部背景

- Enhancer 是基因组中的顺式调控元件，通常影响转录活性和组织/细胞类型特异性表达。
- [[Discrete Flow Matching]] 常把生成建模为离散状态上的连续时间跃迁过程，适合序列、图等离散对象。
- DNA shape 特征（如 HelT、Rise）常被用作序列调控性质的补充表征，帮助描述仅靠碱基组成难以刻画的结构差异。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
