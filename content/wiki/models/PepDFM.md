---
type: "model"
status: "enriched"
category: "生成模型"
domain: "肽序列生成与多目标生物序列设计"
background: "included"
---
# PepDFM

## 标准定义

Pep[[Discrete Flow Matching|DFM]] 可理解为一种面向肽序列生成的 [[离散流匹配]] 模型：它在离散 token 空间中学习从噪声/初始状态到目标序列分布的生成轨迹，并可通过 token 级转移率或速度场进行采样。作为背景知识，这类模型通常属于离散生成模型的一种，常与 [[连续时间马尔可夫链]] 表达结合，用于自然语言、蛋白质或肽序列等离散对象的生成与编辑。

## 在本知识库中的用法

在给定论文中，PepDFM 指的是用于肽序列生成的基础 [[离散流匹配]] 生成器，用作 [[Multi-Objective-Guided Discrete Flow Matching|MOG-DFM]] 的预训练底座和无条件对照模型。论文用它来评估生成质量，包括 generalized KL loss、与测试集的 Hamming distance、Shannon entropy 等，并将其生成分布与多目标引导后的结果进行比较。它本身不承担多目标引导，而是提供一个较强的肽生成先验，后续通过采样阶段的多目标加权与过滤实现可控设计。

## 关键点

- PepDFM 是一个面向肽序列的基础生成模型，核心范式是 [[离散流匹配]]，适合在离散生物序列空间中直接采样。
- 在本知识库对应论文里，它主要作为 MOG-DFM 的预训练底座与无条件 baseline，而不是[[多目标优化]]器本身。
- 论文用 PepDFM 的生成结果评估基础生成质量，关注 generalized KL loss、新颖性（Hamming distance）和分布多样性（Shannon entropy）。
- 与 MOG-DFM 相比，PepDFM 体现的是“先学会生成”，多目标可控性则由后续采样引导机制补足。
- PepDFM 的定位说明：离散生成模型可以直接服务于肽设计，而不必先映射到连续嵌入空间。

## 别名

- Pep DFM
- Peptide DFM
- Pep-DFM

## 外部背景

- [[Discrete Flow Matching|离散流匹配]]（[[Discrete Flow Matching]]）通常用于学习离散状态之间的时间演化规律，可与[[连续时间马尔可夫链]]建模方式结合，待核对经典来源。
- 在序列生成任务中，flow matching 类方法常被视作[[扩散模型]]的离散化或替代范式之一，重点是学习可采样的转移过程，待核对经典来源。
- 用于蛋白质/肽设计的生成模型通常会同时关注有效性、分布相似性和多样性，这些指标常通过 KL 类度量、距离度量和熵来评估，待核对经典来源。
- 面向生物序列的基础生成器常作为后续性质引导、条件控制或多目标优化的先验模型，待核对经典来源。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
