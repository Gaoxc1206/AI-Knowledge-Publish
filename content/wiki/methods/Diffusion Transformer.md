---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多目标荧光分子生成"
background: "included"
---
# Diffusion Transformer

## 标准定义

Diffusion Transformer（[[latent diffusion model|DiT]]）是一类将[[Transformer]]作为[[扩散模型]]去噪器或噪声预测器的生成架构，通常通过注意力机制建模全局依赖，并在条件嵌入、时间步嵌入或潜变量表示上进行逐步去噪。它常用于连续数据、序列数据或[[潜在空间]]中的[[controllable generation|条件生成]]任务。

## 在本知识库中的用法

在 [[LUMOS]] 框架中，Diffusion Transformer 被用作 [[latent diffusion]] 的去噪网络：先在分子的连续潜在表示上加噪，再由 DiT 逐步去噪生成新的 latent 向量，最后交给预训练解码器还原为分子。该实现支持 [[prompt-conditioned generation]]，并把溶剂介电常数、吸收峰、发射峰、[[molar extinction coefficient|log ε]]、[[photoluminescence quantum yield|PLQY]] 等条件编码后注入模型，用于荧光分子的[[controllable generation|可控生成]]与[[多目标优化]]。

## 关键点

- DiT 的核心作用是在[[潜在空间]]中学习“从噪声到样本”的反向生成过程，适合把离散[[分子设计]]转成连续优化问题。
- 在这篇论文里，DiT 不是直接生成 SMILES，而是先生成 latent 表示，再由解码器映射回分子结构。
- 条件信息通过 Gaussian RBF embedding 编码，并借助[[自适应层归一化]]（adaLN）注入 DiT，实现按目标性质和溶剂环境控制生成。
- 该用法属于 LUMOS 的 latent diffusion 模块，与性质预测器和多目标优化器配合，服务于荧光分子的反向设计。
- 相较直接在离散化学空间中搜索，DiT 在连续潜变量上采样更适合做可控生成与候选扩增。

## 别名

- DiT
- 扩散 Transformer
- Diffusion Transformer

## 外部背景

- DiT 通常被看作把 Transformer 结构引入扩散生成流程，用更强的全局建模能力替代传统卷积式去噪骨干。
- 它常与时间步嵌入、类别/文本/属性条件嵌入结合，用于条件生成；具体实现细节在不同论文中会有差异，待核对经典来源。
- 把扩散过程放到 latent space 中进行，通常能降低原始高维表示的建模难度，并提升生成效率，与[[潜在扩散模型]]思路相近。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
