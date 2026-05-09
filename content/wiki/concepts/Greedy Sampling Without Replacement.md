---
type: "concept"
status: "enriched"
category: "采样方法"
domain: "扩散模型推理时多目标生成"
background: "included"
---
# Greedy Sampling Without Replacement

## 标准定义

Greedy Sampling Without Replacement 指一种从候选集合中进行顺序选择的采样策略：每一步都按当前评分或概率挑选最优候选，被选中的元素立即从候选池中移除，不再重复抽取，直到满足预算或数量上限。它常用于需要避免重复、提高覆盖多样性、或对候选子集做近似最优筛选的场景。

## 在本知识库中的用法

在这篇论文的 [[IMG]] 框架中，这类思想对应推理时的候选筛选步骤：每个扩散反向步先生成多个候选，再依据多目标权重 W(x; λ) 做[[Weighted Resampling|重采样]]或贪婪选择，从而把预训练[[扩散模型]]的生成轨迹推向多目标目标分布。它被用来服务于覆盖[[Pareto front]]的多样化候选，而不是寻找单个最优解；不同样本可配不同的[[偏好向量]]，并可结合[[Quasi-Monte Carlo方法]]生成更均匀的权重设置。整体上，这是一种在推理阶段实现多目标引导的无放回式候选保留思路。

## 关键点

- 标准含义上，它是“选一个、移除一个、继续选”的顺序采样规则，适合在有限预算下做候选筛选，并减少重复样本。
- 在本文中，它更像 IMG 中的推理时选择机制：先生成多个候选，再按多目标权重进行重采样/贪婪保留，以近似目标分布。
- 这种机制的目标不是单点最优，而是生成能够覆盖[[Pareto front]]的多种 trade-off 解。
- 由于每个 batch 样本可以使用不同的[[偏好向量]]，无放回式筛选有助于保留不同偏好下的代表性候选。
- 与传统外部[[进化算法]]不同，本文把候选选择嵌入到[[扩散模型]]反向推理过程中，以提升[[sample efficiency|样本效率]]。

## 别名

- greedy without replacement
- greedy sampling
- 无放回贪婪采样
- 贪婪无放回采样
- greedy resampling without replacement

## 外部背景

- 在启发式搜索和子集选择中，greedy without replacement 往往对应“按当前最高分逐步选取”的近似策略，待核对经典来源。
- 在概率采样语境里，“without replacement” 表示已选元素不再回到候选池，因此重复率更低、样本之间相关性更小。
- 这类方法常与[[Weighted Resampling|加权重采样]]、beam search 或 top-k 近似结合使用，以在计算预算受限时提高候选质量，待核对经典来源。
- 在[[多目标优化]]中，它可作为一种实用的候选保留规则，但通常不保证全局最优覆盖，待核对经典来源。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
