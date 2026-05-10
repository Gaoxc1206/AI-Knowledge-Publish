---
type: "dataset"
status: "enriched"
category: "Benchmark"
domain: "多目标分子优化"
background: "included"
---
# QED + similarity constrained molecular design

## 标准定义

[[QED]] + similarity constrained molecular design 是一种带约束的[[分子优化]]任务：在尽量提高 [[QED]]（drug-likeness 相关指标）的同时，要求[[分子生成|生成分子]]与给定参考分子保持足够高的 [[分子相似性]]。这类任务通常用于模拟[[Lead Optimization|先导优化]]场景，既追求性质改进，也限制结构偏离过大。

## 在本知识库中的用法

在该论文中，它作为分子优化 benchmark 里的一个约束设计任务，用来评估模型能否在保持与起始分子相似的前提下提升 QED。[[Chemlactica-125M]] 在该任务上达到 99.0% success rate，优于 QMO 与 RetMol；论文还报告该方法最多使用 10,000 次 QED evaluations，而 baseline 为 50,000 次。

## 关键点

- 任务目标是同时满足“高 QED”和“与参考分子相似”两个条件，属于 [[分子优化]] 中的约[[Beam Search|束搜索]]问题。
- 从论文用法看，它更像一个 benchmark 任务/数据集切片，用于比较不同生成与搜索策略的效率和成功率。
- 该任务的评价重点是 success rate，以及达到目标所需的 oracle evaluations 数量，而不只是单次生成得分。
- 论文中的结果显示，较小的 LM 也能在该约束任务上取得接近满分的表现，说明 [[SMILES]] 生成与条件控制能力足以支撑此类局部优化。

## 别名

- QED similarity-constrained molecular design
- QED + similarity
- similarity-constrained QED optimization
- QED constrained molecular optimization

## 外部背景

- QED（quantitative estimate of drug-likeness）常用于衡量分子整体药物相似性，但并不直接代表活性或可合成性；待核对经典来源。
- similarity-constrained optimization 是先导优化中的常见设定，通常通过 Tanimoto similarity 等指标约束生成分子与母体结构的接近程度；待核对经典来源。
- 这类任务通常使用 reference molecule + property target 的形式定义，适合比较[[遗传算法]]、强化学习和语言模型式生成方法的搜索能力；待核对经典来源。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
