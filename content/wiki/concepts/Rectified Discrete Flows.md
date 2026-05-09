---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "离散生成模型"
background: "included"
---
# Rectified Discrete Flows

## 标准定义

[[Rectified Flow|Rectified Discrete Flow]]s（[[ReDi]]）是一类面向离散变量的生成模型，可视为 [[离散流模型]] / [[flow matching]] 在离散状态空间中的对应形式。它通过对源—目标耦合进行反复 rectification（修正），逐步改善离散转移结构，并缓解因坐标独立近似带来的 joint 依赖失真；因此常用于直接在 token 空间中建模序列生成，而不是先映射到[[连续隐空间|连续潜空间]]。

## 在本知识库中的用法

在本知识库对应论文中，ReDi 被当作 [[AReUReDi]] 的预训练离散生成先验：它为每个位置提供 token 级别的边际转移概率，供局部 [[mutation]] proposal 使用。论文还把 rectification 视为提升离散序列生成质量的关键步骤，并报告 [[PepReDi]] 与 [[SMILESReDi]] 在多轮 rectification 后 [[validity]]、NLL、PPL 等指标得到改善。AReUReDi 进一步在 ReDi 的基础上叠加多目标引导与 [[Metropolis-Hastings]] 更新。

## 关键点

- ReDi 的核心目标是在离散 token 空间中学习可采样的生成转移，而不是依赖连续 latent 的间接表示。
- rectification 的作用是逐轮修正 source-target coupling，使模型更接近真实的联合转移结构，减少 [[factorization error]]。
- 在该知识库的论文语境里，ReDi 提供了位置级别的转移概率，作为后续多目标引导 proposal 的生成先验。
- 它与 [[flow matching]] 的关系是：都强调从起始分布到目标分布的连续/逐步运输思想，但 ReDi 针对的是离散状态。
- 论文把 ReDi 用在肽序列和 peptide [[SMILES generation|SMILES 生成]]上，表明这种离散流框架适合保持 token 结构与生物序列语法。

## 别名

- ReDi
- Rectified Discrete Flow
- Rectified Discrete Flows

## 外部背景

- 待核对经典来源：Rectified flow 在连续空间中通常指通过重参数化或路径修正，让生成轨迹更直接、更易采样；ReDi 可理解为这一思想在离散空间中的变体。
- 离散流模型通常直接对类别变量、token 或序列状态建模，常见优势是保留离散结构，避免连续嵌入对语义和语法的扭曲。
- rectification/coupling correction 这类做法常用于降低局部独立更新与全局联合分布之间的偏差，提升采样质量与训练稳定性。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
