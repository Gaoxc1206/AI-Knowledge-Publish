---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "分子生成与多目标分子优化"
background: "included"
---
# latent chemical space

## 标准定义

latent [[化学空间|chemical space]]（潜在[[化学空间]]）是指把离散的分子结构映射到连续向量空间后形成的表示空间。在这个空间里，分子通常由编码器压缩为[[潜在表示]]，再由解码器恢复为化学结构；空间中的距离、插值和方向变化，往往被期望对应[[药物相似性|结构相似性]]、性质变化或可行的[[分子编辑]]。它是[[分子表示学习]]、[[分子生成]]和基于连续优化的[[分子设计]]中的基础概念。

## 在本知识库中的用法

在本知识库对应论文中，latent chemical space 特指由 [[graph-to-sequence autoencoder]] 学到的连续分子潜空间：分子图经编码器压缩为固定维度 latent vector，再由 [[SMILES decoder|SMILES 解码器]]重构。作者将该空间作为 [[LUMOS]] 的核心枢纽，用于分子重构、性质预测、[[latent diffusion]] 生成以及在[[多目标优化]]框架下的荧光分子反向设计；同时还通过 cosine similarity 与 [[Tanimoto similarity]] 的相关性、以及 scaffold 聚类现象，说明该空间具有一定语义组织性。

## 关键点

- 它是把离散化学结构转成连续表示的“工作空间”，便于在连续域中做搜索、插值和优化。
- 标准上，这类空间通常由自编码器、变分自编码器或其他生成模型学习得到，并希望保留结构相似性与性质相关性。
- 在该论文中，潜在空间由 graph-to-sequence autoencoder 学习，分子图编码后再解码为 SMILES。
- 该空间被直接用于 [[分子生成]]、性质预测和基于扩散模型的生成控制，是 LUMOS 统一数据驱动与物理驱动模块的接口。
- 作者还将其用于多目标荧光分子优化，使 latent perturbation、guided denoising 和进化搜索可以在同一表示空间中协同工作。

## 别名

- latent space
- chemical latent space
- latent molecular space
- 潜在化学空间
- 化学潜在空间

## 外部背景

- 连续潜在空间常见于 molecular autoencoder / VAE 体系，用来把化学结构嵌入可优化的连续域。
- 理想情况下，latent distance 应与分子结构相似性、片段变化和性质变化具有一定相关性，但这一点通常需要经验验证。
- 潜在空间中的线性插值有时可生成“介于两者之间”的新分子，因此常被用于生成式设计与局部改造。
- 不同建模方式会得到不同类型的 latent chemical space，例如基于 SMILES、分子图、片段组合或反应路径的潜空间；待核对经典来源。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
