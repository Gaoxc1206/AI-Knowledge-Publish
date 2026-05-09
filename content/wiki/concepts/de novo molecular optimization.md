---
type: "concept"
status: "enriched"
category: "优化问题"
domain: "多目标分子优化"
background: "included"
---
# de novo molecular optimization

## 标准定义

de novo [[molecular optimization]] 指从头搜索或生成满足给定性质的新分子，而不是只在已有分子上做简单筛选或局部修饰。它通常把分子表示、生成/搜索策略与性质评估器结合起来，目标可以是单目标，也可以是多目标；在多目标场景下，常需要关注 [[Pareto front]]、可行性与多样性之间的权衡。它是 [[分子生成]] 与优化方法[[crossover|交叉]]的典型问题。

## 在本知识库中的用法

在本知识库对应论文中，de novo molecular optimization 主要指 GUACAMOL 上的[[多目标分子设计]]任务：在固定候选池、固定预算和相同 [[Gaussian Process]] 代理模型下，逐轮选择分子，比较 [[Expected Hypervolume Improvement]] 与[[固定权重标量化]]的 [[Expected Improvement]]。论文重点关注在低数据、昂贵评估条件下，哪种 [[acquisition function|acquisition]] strategy 能更好地逼近近似 [[Pareto front]]、提升 hypervolume、降低 [[R2 indicator]]，并保持或提高化学[[chemical diversity|结构多样性]]。

## 关键点

- 标准上，它是一个面向新分子的优化问题，核心是“从头找到满足目标性质的新结构”，常与 [[分子生成]]、[[多目标贝叶斯优化]]、搜索算法或生成模型结合。
- 在这篇论文里，它被具体化为三个 GUACAMOL 多目标任务上的受控比较：相同表示、相同代理模型、相同候选池，只改变 [[acquisition function]]。
- 论文中的目标性质包括药物发现常见的多指标组合，例如活性/相似性、QED、[[logP]]、[[SA score]] 等；评价重点放在 hypervolume、[[R2 indicator]] 和多样性。
- 结果表明，在该 de novo molecular optimization 设置下，[[Expected Hypervolume Improvement]] 通常比固定权重标量化的 [[Expected Improvement]] 更能覆盖 [[Pareto front]]，并且更快收敛。
- 该用法强调的是低数据、昂贵评估、离散候选池下的分子优化实验框架，而不是泛指所有生成式分子设计方法。
- 分子表示采用 [[Morgan fingerprint]]，说明这里的优化对象是离散分子结构，优化效果受表示、代理模型和采集策略共同影响。

## 别名

- de novo molecular design
- de novo drug design
- 从头分子优化
- 从头分子设计

## 外部背景

- 通常指在没有既定母体分子的情况下，自动生成并优化新的化合物结构，以满足目标性质。
- 常见实现路径包括基于 [[生成模型]] 的搜索、基于 [[贝叶斯优化]] 的候选选择，以及遗传算法、强化学习等。
- 在药物发现中，常把“可合成性、活性、选择性、ADMET、QED、logP”等作为联合优化目标。
- 评价时除了性质值本身，还经常看 novelty、uniqueness、validity 和结构多样性。
- 待核对经典来源

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
