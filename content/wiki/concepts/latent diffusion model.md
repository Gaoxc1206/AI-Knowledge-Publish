---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "荧光分子生成与多目标分子优化"
background: "included"
---
# latent diffusion model

## 标准定义

[[latent diffusion]] model（潜在[[扩散模型]]）是指先通过编码器把原始数据映射到[[潜在空间]]，再在该连续空间中学习扩散去噪过程的一类生成模型。与直接在像素、序列或图结构上扩散相比，它通常借助预训练[[自动编码器]]压缩数据维度，从而降低生成难度、提升采样效率，并更适合条件控制与编辑式生成。

## 在本知识库中的用法

在该论文的 [[LUMOS]] 框架中，latent [[Diffusion Model|diffusion model]] 用于对荧光分子的连续 latent representation 进行生成与优化。其 latent 来自 [[graph-to-sequence autoencoder]]，生成结果再由预训练 [[SMILES]] 解码器还原为分子结构。作者将其用于 prompt-conditioned [[de novo molecular generation|de novo generation]] 和 [[gradient-guided generation]]；其中条件可包含溶剂介电常数、λabs、λemi、[[molar extinction coefficient|log ε]]、[[photoluminescence quantum yield|PLQY]] 等。该模型还可通过部分加噪与去噪过程充当“突变算子”，嵌入 [[NSGA-III]] 的[[多目标进化算法|多目标进化优化]]流程。

## 关键点

- 标准定义上，latent diffusion model 的核心是把复杂对象先压缩到连续 [[潜在空间]]，再在该空间执行扩散去噪，从而兼顾可生成性与采样效率。
- 本库中它服务于荧光小分子反向设计，生成对象不是直接的离散分子图，而是由图编码器得到的语义化 latent 向量。
- 该方法与 [[Diffusion Transformer]] 结合，用于在条件输入下生成满足目标性质的候选分子。
- 它支持两种控制方式：prompt-conditioned generation 与 [[梯度引导]]的 generation，分别对应无梯度采样和基于性质损失的定向优化。
- 在优化任务里，partial noise-denoising cycle 被当作局部扰动/突变操作，与多目标选择器协同实现 [[多目标优化]]。
- 该方法的有效性依赖于上游表示学习与下游解码器；若 latent 表示与分子语义对齐不足，生成质量会受影响。

## 别名

- LDM
- latent-space diffusion
- 潜在扩散模型
- latent diffusion

## 外部背景

- 扩散模型是一类通过逐步加噪与逐步去噪学习数据分布的生成模型，latent diffusion 是其在压缩表示上的常见变体。
- 常见实现通常包含编码器、潜在扩散主干和解码器三部分；编码器/解码器可以来自 [[自动编码器]] 或变分自动编码器。
- latent diffusion 由于在低维连续空间操作，通常比直接在高维原空间扩散更省算力，但代价是受编码质量约束。
- 在条件生成中，latent diffusion 可结合文本、属性向量或其他控制信号；具体注入方式与训练细节待核对经典来源。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
