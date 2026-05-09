---
type: "concept"
status: "enriched"
category: "优化问题"
domain: "多目标分子优化"
background: "included"
---
# offline multi-objective optimization

## 标准定义

offline [[Multi-Objective Optimization|multi-objective optimization]]（离线[[多目标优化]]）一般指：在固定数据集、历史日志或冻结评估器上，同时优化多个相互冲突的目标，并尽量逼近 [[Pareto front]]。与在线优化不同，它不依赖持续的环境交互或实时实验反馈，通常借助 [[scalarization]]、[[surrogate model]]、生成模型或搜索算法，在已知信息范围内寻找高质量候选解。

## 在本知识库中的用法

在这篇论文的语境中，offline multi-objective optimization 被具体化为：在离散生物序列空间里，基于预训练的离散流模型和固定的性质打分器，对肽序列与 peptide SMILES 做多目标引导生成。论文将 [[binding affinity]]、[[solubility]]、[[hemolysis]]、[[half-life]]、[[non-fouling]] 等目标视为离线可评估的优化信号，并通过 annealed [[Tchebycheff scalarization]]、[[locally balanced proposals|locally balanced proposal]] 和 [[Metropolis-Hastings]] 更新，将采样推向近似 [[Pareto front]] 的区域。

## 关键点

- 核心目标是在固定可用信息下，同时改善多个冲突目标，而不是把某一个指标单独优化到最强。
- 离线设定通常意味着目标函数、打分器或数据分布已经预先给定，优化过程不能依赖新的在线实验交互。
- 这类问题常通过 [[scalarization]]、[[Pareto front]] 近似、[[evolutionary search]]、[[Bayesian optimization]] 或生成式采样来求解。
- 在本论文中，它对应的是对离散 token 序列的多目标引导生成，而不是连续潜空间中的黑盒搜索。
- AReUReDi 通过预训练离散流作为先验，再叠加多目标 guidance，实现对候选序列的离线 Pareto 导向采样。

## 别名

- offline multiobjective optimization
- offline multi-objective optimization
- offline MOO
- 离线多目标优化
- 离线多目标优化问题

## 外部背景

- 经典多目标优化通常强调“最优解”不再是单点，而是一组互不支配解；离线版本则是在固定信息源上近似这组解，待核对经典来源。
- 常见的离线多目标优化实现方式包括加权和、Tchebycheff 标量化、参考点方法与基于支配关系的搜索，待核对经典来源。
- 在分子设计、生物序列设计和材料发现中，离线多目标优化常用于处理活性、稳定性、毒性、可溶性等目标的 trade-off，待核对经典来源。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
