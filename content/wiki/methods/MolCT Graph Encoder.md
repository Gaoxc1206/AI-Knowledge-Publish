---
type: "method"
status: "enriched"
category: "分子表示"
domain: "多目标荧光分子设计"
---
# MolCT Graph Encoder

## 定义

[[MolCT]] Graph Encoder 是 [[LUMOS]] 框架中的[[分子图]]编码器，用于把离散的分子图映射到连续、紧凑且语义化的潜在空间。它作为 [[graph-to-sequence autoencoder]] 的编码部分，与 [[SMILES decoder|SMILES 解码器]]配合实现分子重构与后续生成优化。该编码器支持将不同大小的分子通过 virtual atoms 压缩为固定维度 latent vector，便于在连续空间中进行[[性质预测]]、[[Gen-DL|扩散生成]]和[[分子优化]]。

## 关键点

- 用于 graph-to-sequence autoencoder 的编码端，将分子图编码为固定维度 [[latent chemical space|latent representation]]。
- 输入分子图由 [[RDKit]] 解析，并通过 virtual atoms 作为 padding nodes 处理不同大小分子。
- 编码器被描述为 MolCT / graph transformer，可与 [[SMILES decoder]] 联合训练实现分子重构。
- 其 [[latent chemical space|latent space]] 同时服务于分子重构、性质预测、[[latent diffusion]] 和 [[molecular optimization]]。
- 论文中提到该表示的 latent cosine similarity 与 [[Tanimoto similarity]] 正相关。

## 别名

- MolCT encoder
- MolCT Graph Encoder
- graph transformer encoder
- 分子图编码器

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
