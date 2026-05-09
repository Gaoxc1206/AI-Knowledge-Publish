---
type: "method"
status: "enriched"
category: "分子表示"
domain: "荧光分子设计"
---
# MPNN

## 定义

MPNN（Message Passing Neural Network）在该框架中作为图编码器使用，用于处理[[分子图]]和溶剂图，生成后续[[性质预测]]所需的图表示。笔记中明确提到它被用于 [[Attentive Graph Predictor|AGP]] 和 [[Latent Surrogate Predictor|LSP]] 的编码部分，但没有展开具体的消息传递细节。更具体的结构与训练设置，待从更多论文中补充。

## 关键点

- 在 AGP 中，MPNN 分别用于编码分子图和溶剂图，为性质预测提供图表征。
- 在 LSP 中，MPNN 用于编码溶剂图，与分子潜在表示一起输入后续回归模块。
- 它在该工作中的主要作用是支持多任务性质预测，而不是单独作为生成模型。
- 笔记未给出 MPNN 的具体层数、消息传递函数或聚合方式，待从更多论文中补充。

## 别名

- Message Passing Neural Network
- 消息传递神经网络
- MPNN

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
