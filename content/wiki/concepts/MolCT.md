---
type: "concept"
status: "enriched"
category: "分子表示"
domain: "分子表示学习"
background: "included"
---
# MolCT

## 标准定义

MolCT 可理解为一种面向 [[分子图]] 的上下文建模编码器，通常结合消息传递与注意力机制，把原子、键及其局部/全局关系压缩为连续向量表示。它的标准作用是把离散分子结构映射到可用于 [[潜在空间]] 操作的表征，常见用途包括[[性质预测]]、分子重构与生成模型中的编码端。就一般背景而言，它属于 [[graph transformer]] 一类方法的分子化实现；具体全称、预训练策略与最早出处待核对经典来源。

## 在本知识库中的用法

在该论文中，MolCT 作为 graph encoder 出现在 [[graph-to-sequence autoencoder]] 的编码端：[[分子图]]先经 [[RDKit]] 解析，再输入 MolCT 得到固定维度的 latent representation；随后配合 virtual atoms 做长度对齐，并由 [[SMILES decoder]] 进行重构。该 latent 表示还被后续模块直接复用，用于 [[LSP]] 的 latent-to-property 回归，以及 [[latent diffusion]] 的生成与优化流程。

## 关键点

- MolCT 在本知识库中主要承担“把分子图编码成连续向量”的角色，是连接离散化学结构与连续生成/优化空间的核心模块。
- 它与 [[graph-to-sequence autoencoder]] 配合使用，使分子重构不再直接依赖离散搜索，而是先进入可操作的 [[latent chemical space|latent space]]。
- 论文中 MolCT 产出的表示不仅用于重构，还被冻结后作为下游预测器与生成模型的共享表征基础。
- 从方法定位看，MolCT 更偏向[[分子表示学习]]中的编码器，而不是独立的性质预测器或生成器。
- 在该框架里，MolCT 的价值在于为后续的 [[多目标分子优化]]、[[controllable generation|条件生成]]和梯度引导提供统一表征。

## 别名

- MolCT encoder
- MolCT Graph Encoder
- 分子上下文Transformer

## 外部背景

- 一般而言，分子编码器会学习结构、官能团与拓扑关系的联合表示，常见于[[分子性质预测]]、虚拟筛选和生成式设计。
- 若采用 Transformer/注意力机制，编码器通常更擅长捕捉长程依赖与全局上下文，适合与生成解码器联合训练。
- 与传统[[ECFP|分子指纹]]相比，这类表示通常更适合端到端学习，但可解释性与跨数据集泛化仍需结合实验验证。
- MolCT 的具体结构细节、是否存在标准公开实现，以及其最早提出论文的确切名称，待核对经典来源。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
