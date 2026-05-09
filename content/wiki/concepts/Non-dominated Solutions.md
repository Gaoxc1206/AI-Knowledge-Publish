---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标黑箱优化"
background: "included"
---
# Non-dominated Solutions

## 标准定义

Non-dominated solutions（非支配解）是[[多目标优化]]中的一组候选解：若某个解在所有目标上都不劣于另一个解，并且至少在一个目标上更优，则前者支配后者；不被任何其他可行解支配的解称为非支配解。所有非支配解通常构成或近似构成 [[Pareto front]]。在实践中，非支配解不是“单一最优解”，而是描述多目标权衡关系的一组代表性解。

## 在本知识库中的用法

在该论文语境中，Non-dominated Solutions 指在多个冲突黑盒目标下，希望由[[扩散模型]]推理阶段直接生成的一组候选分子/结构解。它们用于近似 [[Pareto front]]，并以覆盖不同 trade-off 的方式提升多目标生成质量；论文中的 [[IMG]] 通过[[Weighted Resampling|加权重采样]]把生成分布推向多目标目标分布，从而更高效地产生[[Pareto set|非支配解集合]]。

## 关键点

- 标准含义上，非支配解是多目标优化里“没有被其他解同时全局压过”的解集合，常用来描述 [[Pareto front]]。
- 在论文中，非支配解不是靠后处理筛选出来的静态集合，而是希望在扩散模型 [[Inference-time optimization]] 过程中直接生成出来。
- 论文聚焦黑盒[[黑盒 oracle|目标函数]]，因此非支配解的获取依赖目标评估而非梯度优化。
- [[IMG]] 通过在每个反向扩散步进行加权[[Weighted Resampling|重采样]]，逐步把样本推向能覆盖多个目标权衡的非支配区域。
- 论文强调生成的非支配解应兼顾覆盖度与[[sample efficiency|样本效率]]，而不仅仅是某一个点上的最优值。
- 在该知识库中，这一概念主要服务于[[多目标分子设计|多目标分子生成]]场景。

## 别名

- 非支配解
- Pareto optimal solutions
- non-dominated solutions
- Pareto solutions

## 外部背景

- 非支配解是多目标优化教材中的基础概念，通常与支配关系（dominance）和 Pareto 最优性一起定义，待核对经典来源。
- 在工程实现中，非支配解常通过非支配排序（non-dominated sorting）或外部档案（archive）维护，待核对经典来源。
- 在连续或离散多目标问题中，非支配解集合一般只是 Pareto front 的离散近似，而不一定覆盖完整前沿。
- 在带噪声或黑盒评估场景中，非支配性可能依赖采样预算和评估精度，因此结果具有近似性。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
