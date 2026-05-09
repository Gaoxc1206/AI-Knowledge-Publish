---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "分子表示与图生成"
background: "included"
---
# Graph Transformer

## 标准定义

Graph Transformer 是一种面向[[分子图]]或一般图结构数据的 Transformer 变体，核心思想是用[[自注意力]]机制建模节点之间的全局依赖关系，并结合图结构信息（如边类型、相对位置、邻接关系或结构编码）进行消息传递。相较于传统[[图神经网络]]，它更擅长捕捉长程交互与全局结构，但通常也更依赖结构编码设计与计算资源。作为背景知识，它常被用于图表示学习、图分类、节点/边预测和图生成等任务。

## 在本知识库中的用法

在本知识库中的用法主要出现在[[荧光分子设计]]框架中：Graph Transformer 作为图编码器的一部分，被用于将[[分子图]]编码到连续[[潜在空间]]，再服务于重构、[[性质预测]]与后续的[[Gen-DL|扩散生成]]。上下文中它具体以 "[[MolCT Graph Encoder]] / graph transformer" 的形式出现，和图到序列自编码器配合，用于把离散分子结构压缩为固定维度表示，以支持[[分子生成]]和[[多目标优化]]。

## 关键点

- 本质上是把 Transformer 引入图结构建模：通过[[自注意力]]捕捉节点间全局关系，而不只局限于局部邻域。
- 在分子场景下，Graph Transformer 常用于学习[[分子图]]表示，输出可供性质预测器、解码器或生成模型使用的嵌入。
- 本知识库中的实例里，它是图到序列自编码器的编码端，用来把分子压缩到[[潜在空间]]，再交给后续的 [[SMILES decoder|SMILES 解码器]]。
- 相较于纯[[图神经网络]]，Graph Transformer 更适合表达长程相互作用；但是否有效仍依赖边/位置编码设计。
- 在该论文语境中，它不是独立的优化方法，而是[[分子表示学习]]模块，为后续的多目标生成与筛选提供输入。

## 别名

- 图Transformer
- 图注意力Transformer
- Graph-Transformer
- Graphormer
- 图编码器

## 外部背景

- Graph Transformer 的常见变体会显式加入边特征、相对距离编码、最短路径编码或中心性编码，以补足普通 Transformer 对图结构不敏感的问题；待核对经典来源。
- 在图学习中，Graph Transformer 往往与[[MPNN|消息传递神经网络]]结合使用：前者负责全局依赖，后者负责局部结构归纳偏置；待核对经典来源。
- 在[[分子生成]]任务里，Graph Transformer 常被用于编码分子骨架、官能团关系和长程原子交互，从而提升性质预测或生成质量；待核对经典来源。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
