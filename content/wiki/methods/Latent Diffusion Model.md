---
type: "method"
status: "enriched"
category: "生成模型"
domain: "分子生成与多目标优化"
background: "included"
---
# Latent Diffusion Model

## 标准定义

Latent Diffusion Model（潜在[[扩散模型]]）是一类将扩散生成过程从原始高维数据空间迁移到[[潜在空间]]中的生成模型：先用编码器把输入压缩为紧凑表示，再在该表示上学习逐步加噪与去噪的[[扩散模型]]，最后通过解码器还原为原始样本。相较于直接在原空间建模，潜在扩散通常更高效，且更容易结合[[条件生成]]、属性引导与后续筛选。

## 在本知识库中的用法

在本文的 LUMOS 框架中，Latent Diffusion Model 指在分子 latent vectors 上训练的 diffusion transformer，用于荧光小分子的[[可控生成|条件生成]]与优化。潜在表示由 graph-to-sequence autoencoder 学得，扩散过程在该连续空间中进行，最终再解码为 [[SMILES]]。该模型支持两种用法：一是基于目标性质与溶剂介电常数的 prompt-conditioned generation；二是结合冻结的 LSP 梯度进行 gradient-[[可控生成|guided generation]]。作者还将扩散过程视为[[多目标优化]]中的变异算子，与 [[NSGA-III]] 配合完成荧光分子的逆向设计。

## 关键点

- 核心思路是把离散[[分子生成]]转化为在连续[[潜在空间]]中的去噪采样，从而提升搜索效率并降低无效结构比例。
- 在 LUMOS 中，LDM 与分子自动编码器共享潜表示，生成结果再通过解码器映射回 [[SMILES]]，实现“表示学习—生成—优化”的闭环。
- 该方法同时支持 prompt-conditioned generation 和 gradient-guided generation，兼顾显式条件控制与性质梯度引导。
- 与直接在离散化学空间中做搜索相比，潜在扩散更适合和 [[多目标优化]]、硬约束以及骨架新颖性要求结合。
- 本文中的 LDM 主要服务于[[荧光分子设计]]，而不是通用图像/文本生成；其有效性依赖于前端潜表示质量和后端[[分子性质预测|性质预测]]器的可微性。

## 别名

- latent diffusion
- LDM
- latent diffusion model
- 潜在扩散模型

## 外部背景

- 扩散模型通常通过前向加噪与反向去噪学习数据分布；潜在扩散是其在压缩表示上的实现形式，常用于降低计算成本并提高采样效率。
- 待核对经典来源：潜在扩散模型在计算机视觉中常与自编码器结合，用于把高分辨率数据映射到低维 latent 再做生成。
- 条件扩散可通过类别、文本或属性向量控制生成方向；在[[分子生成|分子设计]]中，条件通常对应目标性质、骨架或环境变量。
- 待核对经典来源：在生成式分子优化中，扩散过程也常被改造为带梯度引导的采样器，以对接性质预测器。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
