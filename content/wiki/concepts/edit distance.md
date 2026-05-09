---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "蛋白质序列优化"
background: "included"
---
# edit distance

## 标准定义

Edit distance（[[Levenshtein distance|编辑距离]]）是衡量两个字符串或序列之间差异的经典距离度量，通常定义为将一个序列转换为另一个序列所需的最少编辑操作数，常见操作包括插入、删除和替换。对于氨基酸序列，它可用来量化两条序列在逐位字符层面的差异；距离越小，表示序列越相似。它是离散序列问题中常用的基础相似性/差异性指标。

## 在本知识库中的用法

在这篇关于 [[蛋白质序列设计]] 与 [[多目标优化]] 的论文中，edit distance 被用作生成序列与参考序列/目标属性数据之间的差异度量。论文在多属性生成结果分析中报告了不同方法到 Ab-like、BV、[[binding affinity|Aff]] 相关参考集合的 edit distance，并以平均 edit distance 作为整体接近程度的比较指标；结果显示 [[pcEBM]] 的平均 edit distance 更低，说明其生成的抗体序列在序列层面更接近多属性真实数据，同时仍在 [[Pareto front]] 上保留多种权衡方案。

## 关键点

- Edit distance 是离散序列的基础差异指标，核心含义是“把一个序列改成另一个序列需要多少步”。
- 在本知识库的论文语境中，它主要用于评估生成的抗体/蛋白质序列与参考数据的接近程度，而不是直接作为优化目标。
- 论文将 edit distance 分别统计到 Ab-like、BV、Aff 相关参考集合，并用平均值概括多属性生成的整体序列偏移。
- 较低的 edit distance 通常表示生成样本更接近训练分布或目标性质相关序列，但不必然意味着功能最优。
- 它与 [[Hypervolume]] 互补：前者更关注序列层面的相似性，后者更关注多目标解集在性质空间中的覆盖质量。
- 在[[蛋白质序列设计]]中，edit distance 的数值解释需要结合任务背景，不能脱离具体参考序列或参考集合单独判断好坏。

## 别名

- 编辑距离
- Levenshtein distance
- LEV distance

## 外部背景

- 经典定义：最常见的是 [[Levenshtein distance]]，即允许插入、删除、替换三类操作的最小代价；待核对经典来源。
- 常见变体包括 Damerau-Levenshtein distance（额外允许相邻字符交换）以及带权 edit distance（不同操作赋予不同代价）；待核对经典来源。
- 在生物序列分析中，edit distance 常用于衡量 DNA、RNA 或蛋白质序列的相似性，但对长序列和复杂生物功能的表达能力有限。
- 有时会使用 normalized edit distance，将距离按序列长度归一化，便于不同长度样本之间比较；待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
