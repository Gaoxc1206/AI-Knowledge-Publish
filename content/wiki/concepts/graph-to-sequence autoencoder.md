---
type: "concept"
status: "enriched"
category: "分子表示"
domain: "荧光分子生成与多目标优化"
background: "included"
---
# graph-to-sequence autoencoder

## 标准定义

graph-to-sequence autoencoder 是一种把图结构数据先编码到[[连续隐空间|连续潜空间]]、再从潜空间解码为序列的自编码器。对分子任务而言，它通常将[[分子图]]编码为 latent vector，再用序列解码器重构为 [[SMILES]] 或其他线性表示，从而把离散[[化学空间|分子空间]]转化为更便于搜索、插值和优化的连续表示。它本质上属于 [[autoencoder]] 的图到序列变体，常与 [[graph neural network]]、Transformer 解码器和[[分子表示学习]]结合使用。

## 在本知识库中的用法

在本知识库对应论文 [[LUMOS]] 中，graph-to-sequence autoencoder 是连续[[latent chemical space|潜在化学空间]]的核心表示模块：先用 [[MolCT Graph Encoder]] / graph transformer 编码分子图，并通过 virtual atoms 将不同大小的分子压缩到固定维度 latent vector，再由 [[SMILES decoder|transformer SMILES decoder]] 重构分子。该表示学习模块以 MLE 训练，并加 L2 regularization 约束 latent。其产出的潜空间不仅用于分子重构，也被后续的性质预测、[[latent diffusion]] 生成和[[多目标分子优化]]复用，是连接图结构、序列生成与优化搜索的枢纽。

## 关键点

- 它把分子从离散图表示映射到连续 latent space，使后续的 [[分子生成]] 和 [[多目标优化]] 能在连续空间中进行。
- 在 LUMOS 中，编码端使用 MolCT Graph Encoder / graph transformer，解码端使用 transformer SMILES decoder，体现了“图编码—序列解码”的典型范式。
- 通过 virtual atoms 做 padding/压缩，可将不同大小的分子统一到固定维度表示，便于批量训练与后续建模。
- 该潜空间不仅服务于重构，还被复用到 [[latent diffusion model]] 和潜变量性质预测器中，成为共享表示层。
- 从论文结果看，这种表示对荧光 scaffold 具有较好的聚类与相似性保持能力，latent cosine similarity 与结构相似性呈正相关。

## 别名

- graph2seq autoencoder
- graph-to-seq autoencoder
- graph-to-SMILES autoencoder
- G2S autoencoder

## 外部背景

- 常见用途是把图结构压缩为可插值的连续表示，再通过序列解码器生成线性化分子字符串；待核对经典来源。
- 与直接在 [[SMILES]] 上做生成相比，graph-to-sequence 往往更强调保留分子拓扑信息，同时保留序列生成的便利性。
- 该类模型通常由图编码器、潜变量瓶颈和自回归序列解码器组成，训练时多采用重构损失；待核对经典来源。
- 在分子设计中，这类表示常用于重构、采样、性质预测和优化搜索，是一种常见的 [[分子表示学习]] 方案。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
