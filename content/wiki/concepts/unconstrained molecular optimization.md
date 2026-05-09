---
type: "concept"
status: "enriched"
category: "优化问题"
domain: "多目标分子优化"
background: "included"
---
# unconstrained molecular optimization

## 标准定义

unconstrained [[molecular optimization]]（无约束[[分子优化]]）是指在不施加显式结构约束或子结构保留约束的前提下，直接搜索[[化学空间|分子空间]]，使候选分子在一个或多个性质目标上尽可能最优的优化问题。常见做法是把分子表示为 [[SMILES]]、图或潜变量，并通过 [[遗传算法]]、[[强化学习]]、[[Bayesian Optimization|贝叶斯优化]]或生成模型在可行分子集合中迭代搜索。若涉及多个性质，则通常需要结合 [[多目标优化]]、[[Pareto front]] 等机制来处理目标间权衡。

## 在本知识库中的用法

在本知识库对应论文中，unconstrained molecular optimization 指作者所采用的[[分子设计]]评测设定：给定一组性质目标和初始分子种群，在固定 [[oracle budget]] 下迭代生成并筛选更优分子，不要求保留特定母体骨架或满足额外硬约束。[[MOLLM]] 将 [[Large Language Model]] 作为[[crossover|交叉]]与[[mutation|变异算子]]，在该设定下结合 F-value 选择与 Pareto 选择进行多目标搜索，并比较不同初始种群（best / worst / random）对结果的影响。

## 关键点

- 标准含义上，它强调的是“只优化目标、不额外加硬约束”的搜索问题，因此更接近开放式分子空间探索，而不是受限重设计。
- 在多目标场景下，通常不能只看单一得分，需要把多个性质的权衡显式纳入搜索与筛选机制，例如 [[Pareto front]] 或加权 F-value。
- 本论文把该问题放在 PMO 风格的预算约束下评测，关注固定 [[oracle budget]] 内的样本效率、稳定性和新颖分子产出。
- MOLLM 的做法不是训练新的分子生成器，而是让 [[Large Language Model]] 直接充当遗传式搜索中的 crossover / mutation 操作器。
- 论文特别强调初始种群会显著影响无约束分子优化结果，因此设计了 best、worst 和 random 三种初始化情形。
- 该节点在本库中主要对应一种研究任务/问题设定，而不是某个特定模型或单一算法。

## 别名

- unconstrained molecular optimization
- UMO
- 无约束分子优化
- 非约束分子优化

## 外部背景

- 无约束分子优化常见于药物发现中的性质重设计任务，例如同时提高活性、可合成性或药物相似性质；与之相对的是 constrained optimization，后者通常要求保留核心骨架或相似度下限。
- 经典评测中常见指标包括 top-1 / top-10 得分、validity、uniqueness、diversity 等；不同 benchmark 对目标定义和归一化方式可能不同。
- 待核对经典来源：不少工作将该任务放入 PMO（Practical Molecular Optimization）或类似 benchmark 框架下进行比较，通常设定固定次数的 oracle 查询。
- 待核对经典来源：在早期方法中，这类问题常由 [[遗传算法]]、贝叶斯优化、强化学习或分子生成模型求解，后续才逐渐引入大语言模型与提示式优化。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
