---
type: "model"
status: "enriched"
category: "分子表示"
domain: "分子表示学习与荧光分子设计"
background: "included"
---
# MolCT

## 标准定义

从通用角度看，MolCT 可视为一种用于[[分子图]]编码的神经网络模型，目标是把原子、键及其上下文信息压缩为连续向量表示，供[[分子性质预测|性质预测]]、重构、检索或生成使用。它通常属于图编码器一类方法，可能结合消息传递或[[Transformer]]式上下文建模；具体缩写含义与原始结构细节待核对经典来源。

## 在本知识库中的用法

在这篇论文中，MolCT 主要被当作共享的图编码器使用：一方面出现在 graph-to-sequence autoencoder 中，将分子图编码并通过 virtual atoms 压缩为 latent vectors，再作为[[SMILES]] decoder 的前缀输入；另一方面在 LSP 中作为冻结编码器，把分子映射到潜在表示后与溶剂表示拼接，用于回归吸收峰、发射峰、log ε 和 PLQY。

## 关键点

- MolCT 在本库中承担的是“分子图到连续潜表示”的编码角色，是 LUMOS 生成与预测模块之间的共享表征基础。
- 它与 virtual atoms 的 padding 机制配合，使不同大小的分子能够映射到固定维度的 [[潜在空间|latent space]]。
- 在 graph-to-sequence autoencoder 中，MolCT 编码结果被送入解码器，用于分子重构与[[潜在空间]]学习。
- 在 LSP 中，冻结的 MolCT encoder 提供较稳定的分子特征，再与溶剂表征联合进行多任务性质预测。
- 该论文没有展开 MolCT 的独立结构细节，因此其层设计、预训练目标和训练数据范围待从更多论文中补充。

## 别名

- MolCT
- MolCT encoder

## 外部背景

- 分子编码器通常把[[分子图]]转换为定长向量，以支持回归、分类、重构和生成任务。
- 图神经网络与[[Transformer]]式结构常用于捕捉原子局部邻域和全局依赖，适合电子性质相关建模。
- 冻结 encoder 是小数据集或 OOD 泛化场景中的常见做法，可减少下游训练的不稳定性。
- 若 MolCT 来自特定预训练框架，其输入原子特征、消息传递层数和预训练任务需待核对经典来源。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
