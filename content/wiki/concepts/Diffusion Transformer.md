---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "荧光分子生成"
background: "included"
---
# Diffusion Transformer

## 标准定义

[[Diffusion Model|Diffusion]] Transformer（[[latent diffusion model|DiT]]）是将 [[Transformer]] 作为[[扩散模型]]去噪网络的一类架构。它在正向加噪、反向去噪的生成过程中，用自注意力建模全局依赖，并根据条件输入预测噪声、score 或残差，从而完成连续表示上的采样与生成。该思想常用于图像、文本和分子等生成任务。

## 在本知识库中的用法

本文在 [[latent diffusion]] 生成模块中使用 Diffusion Transformer 作为反向去噪器：先在分子的潜在向量上逐步加[[Gaussian|高斯噪声]]，再由 DiT 结合条件信息执行去噪，生成新的 latent 表示；这些条件既可以来自 [[prompt-conditioned generation]]（如溶剂介电常数、λabs、λemi、[[molar extinction coefficient|log ε]]、PLQY），也可以与 [[LSP]] 结合做 [[gradient-guided generation]]。最终生成的 latent 再交给预训练的 [[SMILES decoder]] 还原为分子结构，用于荧光分子的[[controllable generation|可控生成]]与[[多目标优化]]。

## 关键点

- Diffusion Transformer 本质上是把 [[Transformer]] 用作扩散模型的去噪骨干，适合在连续空间中建模长程依赖与条件控制。
- 在本知识库的框架里，它位于 latent diffusion 的反向过程核心，负责把含噪的分子潜在表示逐步恢复为可解码的结构表示。
- 它支持条件生成：可把溶剂环境和性质目标编码后注入模型，实现对吸收、发射及相关光物理性质的定向采样。
- 它也可与 [[LSP]] 配合做梯度引导生成，使扩散采样过程服务于多目标分子优化，而不只是无条件生成。
- 由于生成发生在 [[潜在空间]] 而非直接 SMILES 或分子图上，DiT 更适合作为连续优化与采样的统一接口。
- 本框架中，DiT 生成的 latent 需要再经过 [[SMILES decoder]] 转回分子，因此它承担的是“生成中间表示”的角色。

## 别名

- DiT
- Diffusion Transformer
- 扩散Transformer
- 扩散变换器

## 外部背景

- 待核对经典来源：DiT 常见于大规模扩散生成模型，通常通过 AdaLN、cross-attention 等机制注入类别或文本条件。
- 扩散模型通常有多种参数化方式，如预测噪声 ε、预测原始样本 x0 或使用 v-parameterization，不同选择会影响训练稳定性与采样质量。
- 待核对经典来源：与 U-Net 型去噪器相比，Transformer 型去噪器更依赖注意力机制，往往更擅长建模全局关系。
- 在分子生成中，Transformer 扩散既可用于序列表示，也可用于 latent 表示，通常比纯 MLP 去噪器更灵活。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
