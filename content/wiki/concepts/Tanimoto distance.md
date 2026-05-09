---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# Tanimoto distance

## 标准定义

Tanimoto distance 是基于 [[Tanimoto similarity]] 的不相似度度量，常用于比较两个分子 [[fingerprint]] 或特征向量的结构差异。若记 Tanimoto 相似度为 $s$，则距离通常可写为 $1-s$；数值越大，表示两个分子在化学结构上越不同。它常与 [[Morgan fingerprint]] / [[ECFP]] 一起使用，用于[[molecular diversity|分子多样性]]、去重、候选筛选和[[化学空间]]覆盖分析。

## 在本知识库中的用法

在给定论文上下文中，Tanimoto distance 主要出现在[[多目标分子设计]]结果的[[chemical diversity|结构多样性]]评估里：作者用它作为阈值来统计分子集合的差异程度，并比较 [[Expected Hypervolume Improvement|EHVI]] 与[[fixed-weight scalarized EI|固定标量化 EI]] 在不同阈值下能找到多少结构不同的分子。具体地，论文报告当 Tanimoto distance threshold 较高时，E[[Hypervolume Indicator|HVI]] 往往能发现更多结构上彼此不同的高质量分子，说明它在扩展 [[Pareto front]] 的同时，也更有利于覆盖更广的 [[chemical space]]。

## 关键点

- Tanimoto distance 本质上是 [[Tanimoto similarity]] 的补量，常用于衡量分子结构是否相近。
- 在[[分子优化]]里，它更常被当作 [[structural diversity]] 指标或阈值，而不是单独的优化目标。
- 在本知识库对应论文中，它用于比较 EHVI 和固定[[标量化]] EI 产生结果的结构多样性。
- 较高的 Tanimoto distance 阈值意味着只统计结构差异更大的分子，因此更能反映方法是否真正探索了不同的分子区域。
- 该指标通常依赖分子 [[fingerprint]]，因此结果会受指纹类型和参数设置影响。

## 别名

- Tanimoto dissimilarity
- Jaccard distance
- Tanimoto distance

## 外部背景

- 在化学信息学中，Tanimoto distance 常定义为 $1-\frac{|A\cap B|}{|A\cup B|}$ 的推广形式，适用于二值或计数型特征。
- 当使用 Morgan fingerprint / ECFP 时，Tanimoto 距离是最常见的分子不相似度度量之一。
- 它常被用于分子去重、最近邻筛选、训练/测试集划分和多样性约束。
- 与 [[chemical space]] 分析配合时，Tanimoto distance 可以帮助判断候选分子是否只是局部变体，还是覆盖了新的结构区域。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
