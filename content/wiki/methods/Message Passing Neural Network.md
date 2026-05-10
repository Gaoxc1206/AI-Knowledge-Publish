---
type: "method"
status: "enriched"
category: "基础模型"
domain: "分子性质预测"
background: "included"
---
# Message Passing Neural Network

## 标准定义

Message Passing Neural Network（MPNN）是一类基于图结构的神经网络。它将分子表示为由原子和键组成的图，通过多轮消息传递在节点之间交换信息，并在读出阶段聚合得到分子级表示，用于分类、回归或生成任务。其核心思想是用局部邻域信息迭代更新节点状态，从而学习图中的结构与属性依赖关系。

## 在本知识库中的用法

在该论文的[[荧光分子设计]]框架中，MPNN 主要作为分子图编码器使用：一方面用于 AGP 中对分子图和溶剂图进行编码，并配合 cross-attention 学习不同性质对应的原子贡献；另一方面也作为对比基线，与 AGP、LSP、FLSF 等方法一起在 random split、scaffold split 和 fluorophore split 上评估吸收峰、发射峰、摩尔消光系数和 PLQY 的预测效果。

## 关键点

- MPNN 是 [[图神经网络]] 在分子建模中的经典形式，适合处理原子-键图，并输出分子级表征。
- 标准范式通常包括消息函数、节点更新函数和读出函数三部分，能够逐步聚合局部化学环境信息。
- 在本知识库对应论文中，MPNN 被用作荧光[[分子性质预测|性质预测]]任务的图编码器/基线模型，而不是生成器主体。
- 论文的 AGP 以 MPNN 编码分子与溶剂图，再结合 [[交叉注意力]] 预测多种荧光性质。
- 在 fluorophore split 这类更接近 OOD 的划分下，MPNN 作为对照模型用于检验新骨架泛化能力。

## 别名

- MPNN
- Message Passing Neural Network
- 消息传递神经网络

## 外部背景

- 常见于[[分子性质预测]]、量子化学性质回归和药物分子表征任务。
- 待核对经典来源：MPNN 作为统一图消息传递框架的代表性工作通常被引用为分子图学习的重要基础。
- 常见变体会在消息函数中加入键类型、距离、角度或注意力机制，以增强对化学键与空间构型的表达能力。
- MPNN 的 readout 往往采用 sum/mean/attention pooling，将节点表示汇聚为分子级向量。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
