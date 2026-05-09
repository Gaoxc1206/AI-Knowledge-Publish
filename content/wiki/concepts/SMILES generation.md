---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "离散分子生成"
background: "included"
---
# SMILES generation

## 标准定义

[[SMILES]] generation 指在 [[SMILES]] 字符串空间中生成分子表示的任务，目标通常是产生可解析、化学上合法且满足特定约束或性质要求的分子。它既可以是无[[controllable generation|条件生成]]，也可以是条件生成、属性引导生成或优化式生成；常见关注点包括 [[validity]]、novelty、[[uniqueness]] 和多样性。

## 在本知识库中的用法

在本知识库对应论文中，SMILES generation 特指 chemically-modified peptide SMILES 的离散生成与优化：模型以 [[Rectified Discrete Flows]] 作为先验，在 token 级别对 SMILES 序列进行更新，并结合 [[Tchebycheff scalarization]]、[[annealed guidance]] 与 [[Metropolis-Hastings]] 机制，将生成结果引导到多目标更优、近似 [[Pareto front]] 的区域。论文还用 validity、uniqueness、diversity 和 SNN 等指标评估 [[SMILES 分子生成|SMILES 生成]]质量。

## 关键点

- SMILES generation 是把分子结构表示为字符串并直接在字符串空间中采样或搜索的生成任务。
- 标准目标除了生成“合法分子”外，还常包括新颖性、多样性以及特定性质优化。
- 在该论文中，SMILES generation 被用于 peptide SMILES 的多目标引导生成，属于 [[多目标优化]] 场景。
- 方法上依赖 [[Rectified Discrete Flows]] 提供离散 token 先验，再通过引导更新逐步逼近更优样本。
- 结合 [[Metropolis-Hastings]] 后，生成过程兼顾探索性与接受率，并支持朝近似 [[Pareto front]] 的区域移动。

## 别名

- SMILES 生成
- SMILES-based generation
- molecular SMILES generation

## 外部背景

- SMILES 是分子的线性字符串表示，常用于数据库存储、模型输入和[[分子生成]]任务。
- 常见生成范式包括无条件生成、性质条件生成、编辑式生成和优化式生成；待核对经典来源
- 评价 SMILES 生成时通常会同时看 validity、uniqueness、novelty 和 diversity；待核对经典来源
- SMILES 既可以使用 canonical SMILES，也可以使用 randomized SMILES 作为数据增强；待核对经典来源

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
