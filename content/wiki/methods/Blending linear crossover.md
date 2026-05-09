---
type: "method"
status: "enriched"
category: "进化算子"
domain: "多目标分子优化"
background: "included"
---
# Blending linear crossover

## 标准定义

Blending linear [[crossover]]（常写作 BLX-α）是一类面向实值编码的[[crossover|交叉算子]]：对子代每个维度，在两个父代对应取值所张成的区间及其外扩范围内采样，生成新的连续个体。它常用于 [[遗传算法]] 和 [[进化算法]] 的 [[连续优化]] 场景，可在保留父代信息的同时增加搜索多样性。

## 在本知识库中的用法

在给定论文中，[[MOMO]] 只明确提到在 [[连续隐式化学空间]] 中对 latent vector 执行 crossover、[[mutation]] 和 selection；论文未说明具体是否采用 BLX-α 或其他[[crossover|交叉]]变体。因此，在本知识库里可将其视为用于 [[分子表示学习]] 后得到的连续隐向量重组算子，但具体实现仍待从更多论文中补充。

## 关键点

- BLX-α 适合处理实值向量，比离散染色体上的单点交叉更自然。
- 它的核心作用是在父代局部邻域内进行插值/外插，兼顾开发与探索。
- 在 MOMO 中，交叉发生在 [[连续隐式化学空间]] 中，服务于多目标分子搜索；但论文没有给出算子细节。
- 这类算子更适合与 [[多目标分子优化]] 和 [[Pareto front]] 搜索配合使用，以产生不同权衡的后代。

## 别名

- BLX-α
- BLX-alpha
- blended crossover
- blend crossover
- linear crossover

## 外部背景

- 经典形式通常记为 BLX-α：α=0 时只在父代区间内采样，α>0 时向外扩张搜索范围。
- 常见做法是对每个维度独立采样；也有与其他重组算子结合的变体。
- 在实值[[遗传算法]]中，它常与[[mutation|变异算子]]一起使用，以提升全局探索能力。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
