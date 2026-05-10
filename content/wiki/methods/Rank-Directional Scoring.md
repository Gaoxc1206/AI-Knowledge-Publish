---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标离散序列设计"
background: "included"
---
# Rank-Directional Scoring

## 标准定义

Rank-Directional Scoring（RDS）是一类多目标候选打分方法：先基于各目标的局部改进幅度或排名对候选进行归一化排序，再计算候选改善向量与目标权重/偏好方向之间的方向一致性，并将二者组合成最终分数。它的目的不是只看单个目标的绝对值，而是同时衡量“改进了多少”和“是否朝向期望的 [[Pareto front]] 方向”。在离散生成场景中，这种方法通常用于对每一步候选转移进行重加权或重排序。

## 在本知识库中的用法

在本知识库对应论文中，Rank-Directional Scoring 是 [[Discrete Flow Matching]] 采样阶段的一个多目标引导打分模块，用来评估某个 token 替换是否符合当前随机选定的权重向量所代表的折中方向。具体做法是：对候选替换计算多个性质的局部改善排名分数，再结合多目标改善向量与权重向量的方向一致性，得到候选转移的引导分数；随后该分数用于对原始转移速率进行指数重加权，并与 [[Adaptive Hypercone Filtering]] 配合，筛掉方向不一致的候选转移。它在论文中主要服务于肽结合物和 enhancer DNA 的多目标可控采样。

## 关键点

- 核心作用是在离散生成过程中，把“多目标改善强度”和“朝向哪种 trade-off 方向”同时纳入打分，而不是只看单一性质值。
- 在该论文里，RDS 作用于每一步候选 token 替换，是 [[Discrete Flow Matching]] 采样引导的一部分，而不是单独训练一个新生成器。
- 它会把各目标的局部改善先做 rank/尺度归一化，再与权重向量所表示的偏好方向做一致性评估，从而形成最终引导分数。
- 该打分与 [[Adaptive Hypercone Filtering]] 是互补的：前者负责排序与重加权，后者负责方向约束与拒绝不合适转移。
- 论文中的使用表明，RDS 更适合表达多目标之间的折中关系，尤其是在肽和 DNA 这类离散序列空间中。

## 别名

- RDS
- rank-directional score
- rank-directional scoring

## 外部背景

- [[多目标优化]]中常见的候选打分思路包括基于 rank 的归一化与基于方向的一致性度量；待核对经典来源。
- 方向一致性通常可用点积或余弦相似度来衡量候选改进向量与目标偏好向量是否同向。
- 在 [[Pareto front]] 附近进行采样时，rank-based scoring 往往比直接使用原始分数更稳健，因为它对不同目标量纲不敏感。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
