---
type: "concept"
status: "enriched"
category: "分子表示"
domain: "分子图神经网络与分子性质预测"
background: "included"
---
# MPNN

## 标准定义

MPNN（Message Passing Neural Network，消息传递神经网络）是一类在图结构上工作的 [[图神经网络]]：它通过若干轮“消息传递”在节点之间聚合邻域信息，并迭代更新节点/边的隐状态，最后将整张图汇聚为图级表示或节点级表示。用于分子任务时，节点通常对应原子，边对应化学键，可学习分子的结构表征并支持[[性质预测]]、表示学习与生成建模。

## 在本知识库中的用法

在本文的 [[LUMOS]] 框架中，MPNN 主要被用作[[分子图]]与溶剂图的编码器。具体来说：
1) 在 [[Attentive Graph Predictor|AGP]]（[[Attentive Graph Predictor]]）里，分子图和溶剂图分别经 MPNN 编码，再结合 cross-attention 学习性质相关表示，用于快速预测 λabs、λemi、[[molar extinction coefficient|log ε]] 和 [[photoluminescence quantum yield|PLQY]]。
2) 在 [[Latent Surrogate Predictor|LSP]]（[[Latent Surrogate Predictor]]）里，溶剂图同样由 MPNN 编码，并与冻结的分子 latent 表示拼接后输入 MLP，用作可微的性质代理模型，服务于[[gradient-guided generation|梯度引导生成]]。
3) 从本知识库上下文看，MPNN 在这里不是生成器本身，而是承担结构到表示的编码角色，为多目标荧光分子优化提供图级特征。

## 关键点

- MPNN 是一种在图上进行迭代消息传递与状态更新的神经网络，适合处理原子-键结构的分子图。
- 在本论文中，MPNN 被用于编码 [[分子图]] 和 [[溶剂图]]，为性质预测模块提供结构表征。
- AGP 通过 MPNN + cross-attention 提取性质相关表示，实现对 λabs、λemi、log ε、PLQY 的快速多任务预测。
- LSP 也使用 MPNN 编码溶剂信息，并与分子 latent 表示结合，形成可微的代理预测器。
- 就该框架而言，MPNN 的价值主要在于高效、通用地把离散化学结构转成可供后续 [[多目标优化]] 与生成模型使用的连续特征。

## 别名

- Message Passing Neural Network
- Message Passing Neural Networks
- 消息传递神经网络
- MPNN

## 外部背景

- MPNN 通常可视为图神经网络的一个通用框架：不同实现会在消息函数、聚合函数和更新函数上有所变化。
- 在分子机器学习中，MPNN 常用于分子性质预测、反应预测、毒性预测和 QSAR 等任务。
- MPNN 可以自然接入原子特征、键特征，某些变体还可引入 3D 几何信息或边条件信息。
- 待核对经典来源

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
