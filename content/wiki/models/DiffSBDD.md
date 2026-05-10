---
type: "model"
status: "enriched"
category: "生成模型"
domain: "3D结构基础药物设计、多目标黑箱优化"
background: "included"
---
# DiffSBDD

## 标准定义

DiffSBDD 通常指用于结构基础药物设计的 [[扩散模型]]：给定蛋白口袋或受体结构，逐步去噪生成与口袋互补的小分子/配体三维构象，并同时考虑原子类型、键连接与几何布局。它的核心用途是做条件式 [[3D分子生成]]，让生成结果在空间上匹配 [[蛋白口袋]]，而不是仅在 [[SMILES]] 层面做文本生成。

## 在本知识库中的用法

在这篇论文里，DiffSBDD 被当作预训练的基础 [[分子生成]]器嵌入 [[Inference-time Multi-target Generation|IMG]] 框架；作者不微调它，而是在其反向扩散推理过程中加入多目标[[Weighted Resampling|加权重采样]]，以在一次生成中覆盖不同的 trade-off 区域。论文还把 DiffSBDD-EA 作为基线，即把 DiffSBDD 作为 [[Evolutionary Algorithm|进化算法]]中的冻结候选生成/精炼模块，用于 [[黑箱优化]] 场景下的 [[多目标优化]] 搜索，并以接近 [[Pareto front]] 的候选质量进行比较。

## 关键点

- 标准上，DiffSBDD 是面向 [[蛋白口袋]] 条件的 [[扩散模型]]，目标是生成与受体结构互补的 3D 配体。
- 它更适合表达结构约束与几何互补，而不是只做序列或 SMILES 生成。
- 在本知识库对应论文中，DiffSBDD 主要扮演“冻结的基础生成器”角色，而不是被重新训练的目标模型。
- 论文中的 DiffSBDD-EA 表明它可以作为 [[Evolutionary Algorithm|进化算法]] 的候选产生/精炼模块，但仍受原始生成分布限制。
- 与推理时重加权/重采样结合后，DiffSBDD 可用于探索多目标折中解，并辅助逼近 [[Pareto front]]。

## 别名

- DiffSBDD
- Diffusion for Structure-Based Drug Design
- 扩散式结构基础药物设计
- Diffusion-based SBDD
- Diffusion-based Structure-Based Drug Design
- 结构基础扩散药物设计
- 基于扩散的结构基础药物设计
- DiffSBDD model

## 外部背景

- 常见任务包括基于口袋的配体生成、骨架补全、局部修饰与构象优化。
- 这类模型通常依赖蛋白-配体三维数据集进行训练，具体基准与首发实现细节待核对经典来源。
- 与传统[[分子生成]]器相比，DiffSBDD 更强调三维几何一致性与口袋条件控制。
- 在后续研究中，类似模型常被复用为冻结生成器、采样器或外部搜索中的 refiner。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
