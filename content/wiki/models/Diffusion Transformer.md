---
type: "model"
status: "enriched"
category: "生成模型"
domain: "荧光分子生成"
background: "included"
---
# Diffusion Transformer

## 标准定义

Diffusion Transformer（常简称 DiT）是一类把 Transformer 作为[[扩散模型]]去噪器或噪声预测器的生成架构。它通常通过自注意力建模全局依赖，在逐步加噪/去噪的过程中学习数据分布；既可以用于原始空间生成，也可以用于[[潜在空间]]中的高效生成，并可结合条件信息实现[[条件生成]]。

## 在本知识库中的用法

在本知识库的 LUMOS 框架中，Diffusion Transformer 被用于荧光分子的潜在扩散生成：模型在连续潜在表示上学习条件分布 p(\mathcal{M}|\mathcal{P})，正向过程向 latent vector 注入高斯噪声，反向过程由 Diffusion Transformer 预测噪声并迭代去噪，最后再由预训练 decoder 还原为 [[SMILES]]。该方法还支持两种用法：一是通过 adaLN 注入目标性质与溶剂介电常数的 prompt-conditioned generation；二是利用冻结的 LSP 梯度进行[[梯度引导]]采样，以把生成结果推向更符合荧光性质目标的区域。

## 关键点

- 它本质上是“扩散模型 + Transformer 主干”的组合，优点是更擅长捕捉长程依赖和复杂条件信息。
- 与直接在离散分子空间搜索相比，把扩散过程放到[[潜在空间]]里通常更高效，也更容易和性质条件[[大语言模型对齐|对齐]]。
- 在本知识库中，它不是单独做[[分子性质预测|性质预测]]，而是作为 LUMOS 的生成器，负责从噪声中逐步恢复荧光分子的 latent 表示。
- LUMOS 中的 Diffusion Transformer 既支持[[条件生成]]，也支持基于冻结 LSP 的梯度引导采样。
- 最终生成结果需要经过预训练解码器映射回 SMILES，因此它更像是“潜在表示生成器”，而不是直接输出离散分子字符串。

## 别名

- 潜在扩散Transformer
- DiT
- Diffusion Transformer
- 扩散Transformer
- 扩散变换器

## 外部背景

- 待核对经典来源：扩散模型通常通过前向加噪、反向去噪来学习数据分布，是一类稳定的生成框架。
- 待核对经典来源：Transformer 依赖 self-attention，适合建模序列中的全局依赖关系。
- 待核对经典来源：[[Latent Diffusion Model|latent diffusion]] 是常见变体，先把数据压缩到潜在表示，再在[[潜在空间|潜空间]]中扩散以降低计算成本。
- 待核对经典来源：常见条件扩散机制包括 prompt conditioning、classifier-free guidance 和基于外部预测器的引导。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
