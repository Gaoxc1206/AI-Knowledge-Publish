---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "离散生物序列生成与多目标优化"
background: "included"
---
# biomolecular sequence design

## 标准定义

biomolecular sequence design 指在给定功能、结构或性质约束下，对 DNA、RNA、蛋白质、肽或相关分子序列进行定向构造与优化的任务。它通常被建模为一个高维离散组合优化问题，目标可能包括活性、稳定性、可溶性、选择性、毒性、可制造性等。常见方法包括 [[生成模型]]、搜索/优化算法、代理模型和基于能量或打分函数的引导采样；在多目标场景下，常需同时权衡多个冲突性质，并寻找接近 [[Pareto front]] 的候选序列。

## 在本知识库中的用法

在本知识库中，该概念主要用于表示一类直接在离散生物序列空间中进行生成与优化的任务，重点是肽序列与 peptide [[SMILES]] 的多目标设计。对应论文将其表述为：先以预训练的 [[Rectified Discrete Flows]] 作为离散生成先验，再结合多目标打分、局部 token 替换和 [[Metropolis-Hastings]] 更新，把采样引导到近似 Pareto 优区。具体应用包括野生型肽 binder 设计，以及同时优化 [[binding affinity]]、[[solubility]]、[[hemolysis]]、[[half-life]] 和 [[non-fouling]] 等性质。

## 关键点

- 本质上是对 [[离散序列]] 的定向生成：输入通常是一个 token 化的生物分子序列，输出是满足目标性质的候选序列集合。
- 在该论文语境中，它被明确建模为[[多目标分子优化]]问题，核心不是单一性质最大化，而是让多个冲突目标同时保持较好。
- 方法上依赖 [[Rectified Discrete Flows]] 提供 token-level 生成先验，再用多目标 reward 对局部替换进行引导。
- 论文采用 annealed 的 Tchebycheff [[标量化]]，把多个目标压成一个可采样分数，以逐步从探索过渡到聚焦高质量区域。
- 通过 [[locally balanced proposals|locally balanced proposal]] 与 [[Metropolis-Hastings]] 接受/拒绝机制，方法试图保持目标分布不变并提高采样稳定性。
- 在本库中，这一概念主要对应肽 binder 设计和 peptide SMILES 设计等离散生物序列生成任务，而不是纯连续空间中的[[分子优化]]。

## 别名

- biological sequence design
- molecular sequence design
- sequence design
- 生物序列设计
- 分子序列设计

## 外部背景

- 生物序列设计通常包括蛋白质工程、肽设计、RNA 设计和调控元件设计等方向，是合成生物学与计算分子设计中的基础任务。
- 常见评价维度包括序列可行性、功能得分、结构稳定性、表达/合成可实现性以及与多个性质相关的 trade-off，待核对经典来源。
- 多目标序列设计常借助加权和、Pareto 优化、进化算法或贝叶斯优化等框架，待核对经典来源。
- 近年来生成式方法逐渐用于序列设计，包括基于扩散、流模型、语言模型或能量模型的可控生成，待核对经典来源。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
