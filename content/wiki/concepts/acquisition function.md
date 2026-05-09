---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标贝叶斯优化"
background: "included"
---
# acquisition function

## 标准定义

acquisition function（采集函数）是 [[贝叶斯优化]]中的决策准则，用来根据当前 surrogate model 的预测分布，评估每个候选点作为“下一次采样/评估对象”的价值。它通常在探索与利用之间做权衡，并将不确定性、[[Expected Improvement|期望改进]]或多目标收益转化为一个可优化的打分函数。对于多目标问题，采集函数也可以直接面向 [[Pareto front]]、[[超体积]]等结构进行设计，而不必先把目标压缩成单一标量。

## 在本知识库中的用法

在该论文语境中，acquisition function 指[[多目标贝叶斯优化]]里用于选择下一批候选分子的策略变量。作者将其作为唯一控制变量，在相同的分子表示、[[Gaussian Process]] surrogate、候选池和预算下，对比了 [[EHVI]] 与固定权重 [[标量化]] 后的 [[Expected Improvement]]。结论是：在三个 GUACAMOL [[多目标分子优化]]任务上，采用 Pareto-aware 的 acquisition function（[[Expected Hypervolume Improvement|EHVI]]）通常比固定[[Expected Improvement|标量化 EI]] 带来更好的 Pareto 覆盖、更低的 [[R2 indicator]]，以及更好的[[chemical diversity|结构多样性]]。

## 关键点

- acquisition function 是 [[贝叶斯优化]]的核心决策模块，负责从候选空间中挑选下一次最值得评估的点。
- 在多目标场景下，它可以直接优化 [[超体积]]、Pareto 改进等指标，从而显式面向 [[Pareto front]]。
- 本论文把 acquisition function 视为唯一对照变量，用来隔离 [[EHVI]] 与固定权重 [[标量化]] [[Expected Improvement]] 的差异。
- 论文中的结论表明：在[[分子设计]]这种低数据、昂贵评估场景里，[[Pareto-aware acquisition|Pareto-aware acquisition function]] 往往优于固定标量化策略。
- 该节点在本知识库中的重点不是一般算法实现，而是“如何选下一分子”这一 BO 决策规则。

## 别名

- 采集函数
- 获取函数
- acquisition
- acq function

## 外部背景

- 常见 acquisition function 变体包括 [[Expected Improvement]]、[[Upper Confidence Bound]]、Probability of Improvement，以及多目标版本如 EHVI；具体选择取决于目标形式和优化预算。
- 标准背景中，acquisition function 通常需要与 surrogate model 联合使用，并通过数值优化或候选池搜索来找到最大值。
- 对于多目标问题，acquisition function 既可以采用标量化思路，也可以直接使用 Pareto-aware 设计；后者通常更适合非凸 Pareto front。待核对经典来源
- 在批量或并行贝叶斯优化中，acquisition function 还会扩展为 batch acquisition（如 qEHVI 等）。待核对经典来源

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
