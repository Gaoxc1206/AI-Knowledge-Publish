---
type: "method"
status: "enriched"
category: "代理模型"
domain: "荧光分子多目标优化"
background: "included"
---
# Attentive Graph Predictor

## 标准定义

Attentive Graph Predictor 指基于[[图神经网络]]和注意力机制的图[[性质预测|属性预测]]器，通常通过消息传递编码[[分子图]]，再用注意力对关键原子、键或子结构进行加权汇聚，以完成性质回归或分类。它的常见优点是能在保持较强预测能力的同时提供一定可解释性；在多任务场景下，还可为不同目标学习不同的 property-specific 表示。

## 在本知识库中的用法

在本文的 [[LUMOS]] 框架中，AGP 是一个面向荧光分子性质的快速、可解释预测器，主要服务于高通量筛选与原子级解释。它分别对分子图和溶剂图进行编码，并通过 cross-attention 与 learnable query vectors 学习每个性质对应的表示，联合预测 λabs、λemi、[[molar extinction coefficient|log ε]] 和 [[photoluminescence quantum yield|PLQY]]。作者还利用其注意力权重分析关键原子/官能团贡献，并观察到注意力分布与 DFT 中的 [[HOMO]]/[[LUMO]] 相关分布具有较好对应。

## 关键点

- AGP 是一种基于[[图神经网络]]的注意力式[[性质预测]]方法，核心作用是从分子图中提取与目标性质相关的局部结构信号。
- 与普通 [[MPNN]] 相比，AGP 通过注意力或查询向量为不同性质学习不同表示，更适合[[多任务学习]]式的性质回归。
- 在本知识库对应论文中，AGP 同时编码分子图与溶剂图，并通过 cross-attention 形成 property-specific representation。
- 该方法主要用于荧光分子的快速筛选，预测目标包括 λabs、λemi、log ε 和 PLQY。
- AGP 的注意力权重可用于解释哪些原子或官能团对性质贡献更大，属于可解释代理模型的一种。

## 别名

- AGP
- Attentive Graph Predictor
- attention-based graph predictor

## 外部背景

- 注意力机制在图模型中的常见作用是软选择重要节点/边，增强模型对关键子结构的聚焦能力。
- 在[[分子性质预测]]中，注意力图常被用作一种后验解释手段，但其“可解释性”并不总是等同于严格因果解释。
- 将注意力与多任务预测结合，是化学信息学里常见的结构化回归范式。待核对经典来源

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
