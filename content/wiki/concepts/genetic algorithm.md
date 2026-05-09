---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
background: "included"
---
# genetic algorithm

## 标准定义

[[遗传算法]]（[[GA]]）是一类基于生物进化思想的随机搜索与优化方法，通常通过维护一个[[population|种群]]，反复执行[[crossover|交叉]]、[[mutation|变异]]和[[selection|选择]]来迭代改进候选解。它常用于离散或组合优化问题，也常与适应度函数、约束处理和多目标排序机制结合，用于在复杂搜索空间中寻找高质量解。

## 在本知识库中的用法

在这篇论文的语境里，遗传算法不是指传统的图编辑式[[分子优化]]器本身，而是指一种“遗传式搜索框架”：从初始分子种群出发，随机挑选父代，交替进行 [[crossover]] 和 [[mutation]] 生成子代，再用 F-value 或 [[Pareto front]] selection 选择下一代。[[MOLLM]] 的关键变化是把 [[Large Language Model]] 直接作为[[crossover|交叉]]与[[mutation|变异算子]]，而不是依赖 [[GB-GA]] 这类传统分子遗传算法操作。论文还特别强调了初始种群对遗传式优化性能的影响，并在 best / worst / random 三种初始化设置下比较算法表现。

## 关键点

- 遗传算法的核心是“种群—生成—筛选”的迭代过程，典型操作包括 [[crossover]]、[[mutation]] 和 [[selection]]。
- 在[[多目标分子优化]]中，遗传算法往往需要结合[[标量化]]适应度或 [[Pareto front]] 来处理多个性质之间的权衡。
- 本论文把 GA 风格流程保留下来，但将“生成子代”的算子替换为 [[Large Language Model]]，以增强化学知识利用和生成灵活性。
- MOLLM 仍然依赖种群初始化、父代采样与下一代筛选，因此属于遗传式优化框架，而不是纯生成式模型。
- 论文指出初始种群质量会显著影响遗传式方法在固定 oracle budget 下的最终结果。
- 在本知识库中，这个概念主要用于指代分子设计中的遗传式搜索范式，而非通用机器学习分类器。

## 别名

- GA
- 遗传算法
- 进化算法
- genetic algorithm

## 外部背景

- 遗传算法通常由初始化、适应度评估、选择、交叉、变异和终止条件构成，是经典的演化计算方法之一。
- 多目标遗传算法的常见做法包括加权求和、Pareto 排序、拥挤距离等机制；待核对经典来源。
- 遗传算法适合处理搜索空间大、目标函数不光滑或难以求梯度的问题，因此常用于分子设计、路径规划和组合优化。
- 与遗传算法相关的近邻概念包括演化算法（Evolutionary Algorithm）和遗传编程（Genetic Programming）。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
