---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子优化与分子设计"
background: "included"
---
# sample efficiency

## 标准定义

Sample efficiency（样本效率）指模型或算法在给定有限数据、查询次数或实验预算下，获得[[validity|有效性]]能提升的能力。样本效率越高，意味着达到相同效果所需的样本、[[黑盒 oracle|oracle]] 调用或实验次数越少。该概念常用于[[Bayesian Optimization|贝叶斯优化]]、[[强化学习]]、主动学习和生成式优化等场景，强调在昂贵评估或低数据条件下尽量减少无效探索。

## 在本知识库中的用法

在本知识库的相关论文中，sample efficiency 主要指在固定且较小的评估预算下，算法获取高质量分子解的效率。[[Expected Hypervolume Improvement|EHVI]] 与[[固定权重标量化]] EI 的比较表明，前者在相同 GP 代理模型、相同分子表示和相同 200 轮 BO 预算下，往往能更快获得更好的 [[Pareto front]] 覆盖、[[Hypervolume Indicator|hypervolume]] 和多样性，因此被视为更具 sample efficiency。[[MOLLM]] 相关笔记则把 sample efficiency 体现为在固定 5000 次 [[oracle calls]] 约束下，以更少的 LLM 调用和更短运行时间达到更高的分子优化分数。

## 关键点

- 样本效率强调“用更少的样本/查询获得更好结果”，是低数据、昂贵评估任务中的关键概念。
- 在多目标分子优化中，sample efficiency 不只看单点最优值，还要看 Pareto front 覆盖、hypervolume 和多样性。
- 本知识库中，EHVI 相比固定权重 scalarized EI 表现出更好的样本效率，尤其在固定 BO 预算下更快收敛。
- 本知识库中，MOLLM 也把样本效率体现在更少的 LLM calls 和 oracle calls 上，同时保持或提升优化质量。
- 样本效率高并不等于总性能一定最高，但通常意味着在预算受限时更早达到可用解。

## 别名

- 样本效率
- 数据效率
- sample-efficient
- data efficiency

## 外部背景

- 在机器学习中，样本效率常与 data efficiency、label efficiency 近义使用，但具体语境可能不同。
- 在贝叶斯优化中，sample efficiency 通常体现为更少的目标函数评估次数达到更优最优值或更优 Pareto 解集。
- 在强化学习中，sample efficiency 常指更少环境交互即可学到较好策略，待核对经典来源。
- 在主动学习中，sample efficiency 常体现为更少标注样本即可提升模型性能，待核对经典来源。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
