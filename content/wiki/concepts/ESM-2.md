---
type: "concept"
status: "enriched"
category: "其他"
domain: "蛋白质序列表示学习"
background: "included"
---
# ESM-2

## 标准定义

ESM-2（Evolutionary Scale Modeling 2）是基于 Transformer 的蛋白质[[大语言模型|语言模型]]，通常通过大规模蛋白质序列上的[[自监督学习|自监督预训练]]学习上下文相关的氨基酸表示。它可为每个残基或整条蛋白输出嵌入表示，并常用于结构预测、功能注释、突变效应评估和[[生物序列设计|序列设计]]等下游任务。

## 在本知识库中的用法

待从更多论文中补充

## 关键点

- ESM-2 属于蛋白质语言模型，核心作用是把氨基酸序列映射为可用于下游任务的上下文表示。
- 它通常以 Transformer 架构和自监督预训练为基础，学习序列中的进化与功能相关统计模式。
- 在标准用法中，ESM-2 常作为特征提取器、评分器或表示学习 backbone，用于蛋白质[[性质预测]]与设计。
- 当前给定论文上下文中未出现 ESM-2 的明确使用，因此本知识库中的具体用法待从更多论文中补充。

## 别名

- ESM-2
- ESM2
- Evolutionary Scale Modeling 2

## 外部背景

- ESM 系列由 Meta AI 提出，ESM-2 是其后续更大规模的蛋白质语言模型版本，常被视为蛋白质预训练表示学习的重要基线。
- 常见训练目标是 masked language modeling，即随机遮盖氨基酸并预测被遮盖位置的残基。
- ESM-2 产生的嵌入既可用于 residue-level 表征，也可通过 pooling 形成 sequence-level 表征。
- 它经常与结构预测、定点突变效应预测、蛋白质工程和 zero-shot 设计等任务结合使用。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
