---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "蛋白质序列优化与多目标生成"
background: "included"
---
# Levenshtein distance

## 标准定义

Levenshtein distance（[[edit distance|编辑距离]]）是衡量两个序列之间差异的经典指标，定义为将一个字符串转换为另一个字符串所需的最少单字符编辑次数，允许的编辑操作通常包括插入、删除和替换。对于序列型数据，它常用来度量生成结果与目标序列、参考序列或数据分布样本之间的接近程度；数值越小，说明两个序列越相似。作为背景知识，它不直接表达性能优劣，而是提供一种可解释的字符串差异度量，常与 [[Hypervolume]]、[[性质预测]]分数等指标配合使用。

## 在本知识库中的用法

在这篇关于蛋白质/抗体序列采样与优化的论文中，Levenshtein distance 以“[[edit distance]]”的形式出现，用来评估不同方法生成的序列与多属性真实数据或目标属性参考序列之间的偏离程度。论文在比较 [[MGD]]、[[cEBM]]、[[ls-cEBM]] 与 [[pcEBM]] 时报告平均 edit distance，借此说明 p[[cEBM]] 在保持多目标权衡的同时，生成结果在序列层面也更接近相关参考样本。该指标在这里主要服务于“生成结果是否仍然贴近已知有效序列邻域”的判断，而不是直接定义 [[Pareto front]] 或优化方向。

## 关键点

- 它是序列相似性的基础度量，可将蛋白质序列看作字符序列来比较。
- 在本库语境下，它用于衡量多目标生成结果与参考序列的“距离”，数值越小通常表示越接近目标分布。
- 论文将其作为补充评估指标，与 [[Hypervolume]] 一起观察[[多目标优化]]的权衡质量。
- 它反映的是字符串层面的局部修改成本，不直接等价于生物功能优劣。
- 在 pc[[Energy-Based Model|EBM]] 的结果分析中，较低的 edit distance 支持了方法生成序列仍保持较好的可参考性与邻域一致性。

## 别名

- 编辑距离
- edit distance
- Levenshtein edit distance

## 外部背景

- Levenshtein distance 也常被称为编辑距离，是字符串匹配、拼写纠错、信息检索中的经典指标。
- 它与 [[Hamming distance]] 不同：后者通常只允许等长字符串的逐位替换，不包含插入和删除。
- 对于长序列或生物序列，edit distance 往往用于粗粒度比较，不一定能充分反映结构或功能相似性。
- 在某些实现中，若允许不同操作赋予不同代价，可扩展为加权编辑距离；待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
