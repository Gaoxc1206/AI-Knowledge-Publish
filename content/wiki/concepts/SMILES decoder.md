---
type: "concept"
status: "enriched"
category: "分子表示"
domain: "荧光分子生成与分子表示学习"
background: "included"
---
# SMILES decoder

## 标准定义

[[SMILES]] decoder 是一种将连续潜在表示或中间表示还原为 [[SMILES]] 字符串的解码器组件，常见于自编码器、[[变分自编码器]]或其他生成模型中。它的作用是把模型在 [[latent space]] 中学到的表示映射回可解析的分子序列，从而支持分子重构、采样生成和性质优化。作为背景知识，SMILES decoder 的核心能力通常包括序列生成、语法约束建模以及对化学[[validity|有效性]]的恢复。

## 在本知识库中的用法

在本知识库对应论文中，SMILES decoder 是 [[graph-to-sequence autoencoder]] 的解码端：它接收由[[分子图]]编码得到的潜在向量，并将其还原为 SMILES，用于分子重构与后续生成。它与 [[graph encoder]] 共同构成连续化的分子表示空间，并被复用到 [[latent diffusion]] 生成流程中，用于把生成的 latent representation 转换回具体分子结构。该解码器还用于评估表示学习质量，例如重构准确率和对 scaffold 语义的保留能力。

## 关键点

- 标准上，SMILES decoder 负责把潜在表示映射回可解析的分子序列，是 [[分子生成模型]] 中常见的序列解码模块。
- 在该论文中，它是 graph-to-sequence autoencoder 的关键组件，把分子图编码后的 latent vector 解码成 SMILES。
- 它服务于 [[分子重构]]，并作为 latent diffusion 生成后的最终落地步骤，把连续空间中的样本还原为具体分子。
- 作者将其与连续 [[latent space]] 配合使用，使后续的优化、采样和控制生成可以在潜在空间中进行。
- 从库内语境看，这个 decoder 的价值主要在于把表示学习、生成模型和[[多目标优化]]连接起来，而不是单纯做字符级语言建模。

## 别名

- SMILES 解码器
- SMILES decoder
- sequence decoder
- 分子序列解码器

## 外部背景

- SMILES decoder 常见于基于序列的化学生成方法，例如自编码器、[[变分自编码器|VAE]] 和 Transformer 生成器。
- 待核对经典来源：很多[[分子生成]]工作会结合 grammar-constrained decoding 或 [[validity]] checking 来提升生成分子的化学有效性。
- 在图到序列框架中，decoder 往往与图编码器配对，用于学习从分子结构到序列表示的可逆映射。
- 待核对经典来源：SMILES 解码质量常用 reconstruction accuracy、validity、novelty 和 uniqueness 等指标评估。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
