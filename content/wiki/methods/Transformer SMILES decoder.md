---
type: "method"
status: "enriched"
category: "生成模型"
domain: "分子生成、分子表示学习"
---
# Transformer SMILES decoder

## 定义

Transformer [[SMILES decoder]] 是 [[LUMOS]] 的图到序列自编码器中的解码器，用于将连续潜在表示还原为 [[SMILES]] 字符串。它与[[MolCT Graph Encoder|分子图编码器]]配合，把离散分子结构映射到可用于重构、生成和优化的[[latent chemical space|潜在化学空间]]。根据上下文，它主要服务于分子重构和 [[latent chemical space|latent space]] 解码，而不是单独作为独立的生成目标模型。

## 关键点

- 作为 [[graph-to-sequence autoencoder]] 的解码端，将 [[latent chemical space|latent representation]] 还原为 SMILES。
- 与 [[MolCT Graph Encoder]] 和 virtual atoms 机制配合，支持不同大小分子的固定维度表示。
- 用于分子重构，并为后续的 [[latent diffusion]] 生成与[[分子优化]]提供解码器。
- 训练中采用 maximum likelihood estimation，并配合 latent vector 的 L2 regularization。
- 重构失败时，多数情况下仍能生成有效且结构相近的分子，而非无效 SMILES。
- 其对应的潜在表示在不同 [[荧光小分子|fluorophore]] scaffold 上表现出更清晰的聚类。

## 别名

- SMILES decoder
- Transformer decoder
- graph-to-sequence decoder

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
