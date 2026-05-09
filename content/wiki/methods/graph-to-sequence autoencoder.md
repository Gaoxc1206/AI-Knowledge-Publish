---
type: "method"
status: "enriched"
category: "分子表示"
domain: "荧光分子设计与多目标分子优化"
---
# graph-to-sequence autoencoder

## 定义

一种将[[分子图]]编码到连续潜在空间、再解码回 [[SMILES]] 序列的自编码方法。根据上下文，它在 [[LUMOS]] 中用于把离散分子结构压缩为固定维度的 [[latent chemical space|latent representation]]，便于后续重构、[[性质预测]]、[[Gen-DL|扩散生成]]和[[分子优化]]。该方法通过虚拟原子处理不同大小分子，并用最大似然训练及 L2 正则化避免简单记忆训练样本。

## 关键点

- 输入是由 [[RDKit]] 解析的分子图，编码器采用 [[MolCT Graph Encoder]] / graph transformer。
- 为适配不同分子大小，引入 virtual atoms 作为 padding nodes，并用其压缩 embedding 形成固定维度 latent vector。
- 解码器是 [[SMILES decoder|transformer SMILES decoder]]，可将 latent representation 还原为 SMILES。
- 训练目标是 maximum likelihood estimation，同时对 latent vector 加 L2 regularization。
- 该 [[latent chemical space|latent space]] 被用于分子重构、性质预测、diffusion generation 和 [[molecular optimization]]。
- 上下文中报告其在 FluoDB test set 上重构准确率为 94.0%，在外部 TADF dataset 上为 77.8%。

## 别名

- graph-to-sequence AE
- graph2seq autoencoder
- G2S autoencoder
- 分子图到序列自编码器
- graph-to-SMILES autoencoder

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
