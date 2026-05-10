---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "药物发现与多属性分子优化"
background: "included"
---
# ADMET

## 标准定义

ADMET 是药物研发中用于评估候选分子体内行为与安全性的经典框架，分别指 Absorption、Distribution、Metabolism、Excretion 和 Toxicity。它常用于 [[lead optimization]]、可开发性评估和早期安全性筛选，帮助判断分子是否适合作为进一步研发的候选物。

## 在本知识库中的用法

在该论文的可控多属性多目标[[分子优化]]设定中，ADMET 相关性质被拆解为可单独控制的目标属性，用于指导分子从 hit molecule 向 lead molecule 优化。[[C-MuMOInstruct]] 覆盖 10 个药物相关性质，其中包含 BBBP、HIA、hERG、CARC、MUT、DILI 等典型 ADMET/安全性指标；论文将这些属性与 [[QED]]、[[PlogP]]、AMP、DRD2 组合为带阈值的指令任务，要求模型对未达标性质进行提升、对已达标性质保持稳定。

## 关键点

- ADMET 不是单一性质，而是一组描述分子在体内命运与安全性的性质集合，常作为药物可开发性的核心约束。
- 在该知识库对应论文中，ADMET 被具体化为多个可操作属性，例如 [[Blood-Brain Barrier Permeability]]、[[human Intestinal Absorption]]、[[hERG inhibition]]、[[Drug-induced Liver Injury]] 和 [[Mutagenicity]]。
- 论文采用属性级目标表达方式，把“提升某些 ADMET 指标、维持另一些指标”写成自然语言指令，而不是简单要求所有性质一起变好。
- ADMET 相关目标与 [[Quantitative Estimate of Drug-Likeness]]、[[PlogP]] 等非安全性属性共同构成[[多目标优化]]任务，更贴近真实的 [[lead optimization]] 场景。
- 在该论文语境下，ADMET 主要是一个任务设计与评价背景概念，而不是一个单独的数据集或模型。

## 别名

- ADME-Tox
- ADMET properties
- 吸收-分布-代谢-排泄-毒性

## 外部背景

- ADMET 是[[药物发现]]中非常常见的缩写，通常与药代动力学和毒理学筛选一起使用。
- Toxicity 在实践中常进一步细分为心脏毒性、肝毒性、致突变性、致癌性等具体风险，待核对经典来源。
- 很多 ADMET 相关任务会被建模为分类或回归问题，依赖 QSAR 或机器学习预测器。
- ADMET 约束通常出现在先导化合物优化阶段，用来平衡活性、选择性、溶解性和安全性，待核对经典来源。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
