---
type: "dataset"
status: "enriched"
category: "Benchmark"
domain: "ADMET性质预测与分子性质评测"
background: "included"
---
# ADMET benchmark

## 标准定义

[[ADMET]] benchmark 通常指用于评测分子在 [[ADMET]]（吸收、分布、代谢、排泄、毒性）相关[[分子性质预测|性质预测]]能力的一组标准化任务或数据集合。它常用于比较不同的 [[分子性质预测]] 模型、分子表示方法和预训练模型在[[药物发现]]场景中的泛化表现。不同论文中的 ADMET benchmark 可能由多个单任务或多任务回归/分类数据集组成，评价指标也可能因任务而异。

## 在本知识库中的用法

根据当前论文上下文，ADMET benchmark 被当作模型评测基准，用来检验 Chemlactica/Chemma 这类[[大语言模型]]在[[分子性质预测]]上的效果。上下文明确提到作者在 [[MoleculeNet]] 和 ADMET 相关性质预测上报告了结果，但关于该 benchmark 的具体任务构成、数据来源、划分方式与指标细节，当前证据不足，需“待从更多论文中补充”。

## 关键点

- 它属于分子机器学习中的标准 [[Benchmark]]，核心用途是衡量模型对 ADMET 相关性质的预测能力。
- 在本知识库中，它主要作为 [[分子性质预测]] 的评测对象，而不是生成模型本身。
- 当前上下文只表明论文将其用于评测 [[大语言模型|LLM]] 在 ADMET 任务上的表现；具体子任务与协议待从更多论文中补充。
- 这类 benchmark 常与 [[MoleculeNet]]、实验性质预测和药物发现任务一起出现。
- 由于 ADMET 任务往往包含多种性质与不同数据规模，跨论文比较时需要注意任务定义和数据划分是否一致。

## 别名

- ADMET benchmark
- ADMET Benchmark
- ADMET评测基准
- ADMET性质评测

## 外部背景

- ADMET 是药物发现中的经典缩写，分别对应吸收、分布、代谢、排泄和毒性，待核对经典来源。
- 常见的 ADMET benchmark 往往由多个小数据集或多任务集合组成，待核对经典来源。
- 这类 benchmark 一般用于比较图神经网络、[[SMILES]] 模型和预训练分子语言模型，待核对经典来源。
- 不同论文可能对“ADMET benchmark”的命名与任务集合定义不完全一致，需具体看原文，待核对经典来源。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
