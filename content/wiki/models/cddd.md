---
type: "model"
status: "enriched"
category: "基础模型"
domain: "分子表示学习"
background: "included"
---
# cddd

## 标准定义

CDDD 通常指 Continuous Data-Driven Descriptors，是一种面向分子的预训练 [[编码器-解码器]] 模型。它把分子字符串（常见为 [[SMILES]]）映射到连续的向量表示，再从向量重构回分子，目的是学习可用于检索、预测和优化的连续 [[分子表示]]。作为背景知识，CDDD 一般被视为一种把离散化学结构压缩到 [[潜空间]] 的方法，而不是专门针对某个下游任务监督训练的模型。

## 在本知识库中的用法

在这组论文笔记中，CDDD 被用作 [[MOMO]] 的预训练 codec，用来构造 [[隐式化学空间]]。具体做法是先把先导分子编码为连续 latent vector，再在该向量邻域中加高斯噪声形成初始种群，并在连续空间中执行选择、交叉和变异；候选向量随后被解码回分子，以便计算 [[QED]]、[[PlogP]]、[[DRD2]] 和相似性等目标。

## 关键点

- CDDD 是一种把分子字符串映射到连续向量的 [[编码器-解码器]] 模型，核心作用是提供稳定的 [[分子表示]]。
- 它学习到的连续表示可作为 [[隐式化学空间]]，使后续搜索比直接在离散结构上操作更平滑。
- 在本知识库的 MOMO 场景中，CDDD 主要承担“先编码、再进化、后解码”的基础模块角色。
- 借助 CDDD，MOMO 可以在 [[潜在空间|latent space]] 中进行多目标进化搜索，同时把候选分子解码回分子空间做性质评估。
- CDDD 本身不是[[多目标优化]]算法，但它为多目标[[分子优化]]提供了可操作的连续搜索空间。

## 别名

- Continuous and Data-Driven Descriptors
- codec
- CDDD
- Continuous Data-Driven Descriptors
- continuous data-driven descriptors
- cddd model

## 外部背景

- CDDD 通常指 Continuous Data-Driven Descriptors，是一类从大规模无标注分子中学习连续描述符的预训练模型。
- 它常被用作分子嵌入器、相似性检索器或连续[[潜在空间|潜空间]]生成模型的编码/解码模块。
- 与手工[[Molecular Fingerprints|分子指纹]]相比，CDDD 学到的是可直接用于下游连续优化的表示；具体训练细节待核对经典来源。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
