---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标荧光分子生成"
background: "included"
---
# adaptive layer normalization

## 标准定义

Adaptive Layer Normalization（AdaLN）是在标准 [[Layer Normalization]] 基础上，引入由条件向量生成的缩放、偏移，必要时还可加入门控参数，使模型能够把类别、属性、时间步或文本等条件注入主干网络。它常见于 [[Diffusion Transformer]] 等[[conditional generative model|条件生成模型]]中，用来在不显式拼接条件序列的情况下实现[[controllable generation|可控生成]]。

## 在本知识库中的用法

在 [[LUMOS]] 的 prompt-conditioned [[latent diffusion]] 中，作者先将溶剂介电常数以及 λabs、λemi、[[molar extinction coefficient|log ε]]、[[photoluminescence quantum yield|PLQY]] 等条件做 [[Gaussian|Gaussian RBF]] embedding，再通过 adaptive layer normalization 注入到 [[Diffusion Transformer|DiT]] 去噪网络中，用于条件化的[[分子生成]]。这里它的作用是把连续性质条件直接写入扩散过程，支持快速采样；但文中也指出，对 log ε 和 PLQY 的控制相对较弱，尤其在分布尾部 prompt 上更明显。

## 关键点

- AdaLN 的核心是“条件化归一化”：先做 [[Layer Normalization]]，再用条件向量生成逐通道调制参数，从而改变网络表示。
- 它比简单拼接条件更适合注入到 [[Diffusion Transformer]] 这类主干中，尤其适合连续属性控制和时间步条件。
- 在本知识库中，LUMOS 把溶剂与光物理性质编码后，通过 AdaLN 送入 latent diffusion 的去噪器，实现 [[prompt-conditioned generation]]。
- 这种用法强调推理效率高、无需采样时反向传播，适合一次性生成多个候选分子。
- 从经验上看，AdaLN 对稀缺标签、尾部条件或弱相关目标的控制可能不稳定，因此在库内更多作为条件注入机制而不是单独的优化方法。

## 别名

- AdaLN
- adaptive layer norm
- conditional layer normalization
- 条件层归一化

## 外部背景

- 常见变体包括 AdaLN-Zero：将调制参数初始化为 0，以稳定深层生成模型训练。
- AdaLN 常用于条件生成、扩散模型和 Transformer 结构中，可注入类别、风格、文本、属性或时间步信息。
- 相较于交叉注意力，AdaLN 更轻量，通常不需要显式建立条件 token 与主干 token 的对齐关系。
- 在一些实现中，AdaLN 的 scale/shift 由 MLP 从条件嵌入中预测；具体实现细节需待核对经典来源。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
