---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多属性多目标分子优化"
background: "included"
---
# Sequence-based Molecular Optimization

## 标准定义

Sequence-based Molecular Optimization 指将分子表示为序列（最常见是 [[SMILES]]，也可扩展到其他线性化表示），并通过序列生成、序列编辑或序列到序列预测等方式，搜索/生成满足目标性质的候选分子的方法。其核心目标通常包括：提高指定性质、降低不良性质、并尽量保持结构相似性或可合成性。该范式与 [[分子表示]]、[[生成模型]]、[[多目标优化]] 常紧密相关。

## 在本知识库中的用法

在本知识库所对应论文中，该类方法具体表现为：把 [[分子优化|lead optimization]] 任务表述为“输入 hit molecule 序列，输出优化后的 lead molecule 序列”的指令式生成问题，并通过 [[C-MuMOInstruct]] 训练 [[GeLLM4O-C]]。这里的序列化[[分子优化]]强调属性级可控目标：对未达标属性进行定向提升，对已达标属性保持稳定，同时尽量保留核心 scaffold。论文中还区分了 specialist 与 generalist 两类训练方式，用于比较在已见组合、未见组合和未见指令下的泛化能力。

## 关键点

- 标准上，Sequence-based Molecular Optimization 是一种把分子线性化后进行优化的思路，常见输入输出形式是 SMILES 到 SMILES 的改写。
- 它适合表达“提升 A、降低 B、保持 C”这类细粒度目标，比只做单属性最大化更贴近真实药物设计。
- 在本库论文中，该方法被实现为[[Instruction Tuning|指令微调]]式分子序列生成：模型读取分子及属性目标说明，直接生成优化后的分子序列。
- 论文强调结构相似性约束，即优化后的分子不只是分数更好，还要尽量保留原始化学骨架。
- 与传统基于手工 reward 的优化不同，这里更重视属性级可控性和自然语言指令泛化。
- 该方法在 IND 和 OOD 场景下都被用于评估多属性、[[多目标优化]]能力。

## 别名

- SMILES-based Molecular Optimization
- 基于序列的分子优化
- 序列到序列分子优化
- 分子序列优化

## 外部背景

- 序列式分子优化常以 SMILES 作为主要表示，因为它便于直接套用 NLP 里的生成模型、编码器-解码器和指令微调框架。
- 常见变体包括基于编辑的优化、基于强化学习的优化、以及基于生成模型的条件采样；不同方法对探索能力、可控性和化学有效性侧重点不同。
- 这类方法通常会同时关注 validity、uniqueness、novelty、similarity 和 property improvement 等指标。
- 在[[药物发现]]中，sequence-based 方法常被用于 lead optimization、hit-to-lead 和 scaffold-preserving optimization 场景。
- 待核对经典来源

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
