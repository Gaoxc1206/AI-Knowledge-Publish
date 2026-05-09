---
type: "concept"
status: "enriched"
category: "数据集"
domain: "分子性质预测"
background: "included"
---
# MoleculeNet

## 标准定义

MoleculeNet 是一个用于[[分子性质预测]]和[[分子机器学习]]的标准基准集合，通常把多个公开分子数据集整理成统一接口，支持回归、分类等任务，并用一致的评测协议比较不同的[[分子表示]]或模型。

## 在本知识库中的用法

在本文中，MoleculeNet 主要被用作小[[分子生成]]/优化模型的[[性质预测]]外部评测基准：作者在其回归任务上评估模型对分子性质的预测能力，重点涉及 [[ESOL]]、[[FreeSolv]]、[[Lipophilicity]]，并以 [[RMSE]] 汇总比较不同模型；具体数值结果在当前上下文中未完整给出，待从更多论文中补充。

## 关键点

- 在本文语境里，MoleculeNet 主要用于检验[[化学语言模型]]是否具备可迁移的[[分子性质预测]]能力，而不是作为生成目标本身。
- 当前上下文明确提到的是回归子集与 [[RMSE]] 评估；更完整的任务覆盖与具体分数待从更多论文中补充。
- 它可视为[[小分子优化]]系统的外部验证集，用来检查模型从 [[SMILES]] 表示中学到的性质信息是否可靠。

## 别名

- MoleculeNet benchmark
- MoleculeNet 数据集
- MoleculeNet 基准

## 外部背景

- MoleculeNet 通常被视为一个统一的分子机器学习 benchmark，而不是单一数据集。
- 它常用于比较指纹方法、[[图神经网络]]与基于 [[SMILES]] 的序列模型。
- 常见评测中，回归任务多用 RMSE，分类任务多用 ROC-AUC 或 PRC-AUC。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
