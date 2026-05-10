---
type: "dataset"
status: "enriched"
category: "Benchmark"
domain: "分子生成与多目标分子优化"
background: "included"
---
# GUACAMOL

## 标准定义

GUACAMOL（常写作 GuacaMol）是一个用于 [[分子生成]] 与[[分子优化]]的标准化基准套件，主要服务于 [[贝叶斯优化]]、目标导向[[分子生成|分子设计]]和生成模型评测。它通常包含一组预定义任务，用统一的评分函数、候选分子集合与评价协议来比较不同方法在目标达成、[[Pareto Front|Pareto前沿]] 逼近和多样性上的表现。

## 在本知识库中的用法

在本知识库对应论文中，GUACAMOL 被用作多目标分子优化实验的统一基准与候选来源：作者从 GUACAMOL training set 中构建固定候选池，并在 [[Amlodipine MPO]]、[[Fexofenadine MPO]]、[[Perindopril MPO]] 三个任务上比较 [[Expected Hypervolume Improvement|EHVI]] 与固定权重 [[Scalarization|scalarized EI]]。它在这里主要承担“受控实验平台”的角色，用于隔离 acquisition function 的影响，并通过相同代理模型、相同分子表示和相同预算来做公平比较。

## 关键点

- GUACAMOL 是分子设计领域常用的 benchmark 套件，适合评测 [[分子优化]]、[[分子生成]] 和目标导向搜索方法。
- 在本知识库论文中，GUACAMOL 不是作为生成模型训练语料，而是作为[[多目标优化]]的固定候选空间与任务集合。
- 论文将 GUACAMOL 的三个 MPO 任务用于比较 EHVI 与固定权重 scalarized EI 在 [[Pareto Front|Pareto前沿]] 覆盖、收敛速度和结构多样性上的差异。
- 实验中从 GUACAMOL training set 形成 10,000 个分子的固定候选池，并在相同代理模型与预算下进行 [[贝叶斯优化]]。
- 因此，这里对 GUACAMOL 的使用重点是“标准化评测基准”，而不是数据集规模或预训练语料。

## 别名

- GuacaMol
- GuacaMol benchmark
- GUACAMOL benchmark suite

## 外部背景

- GUACAMOL 常被视为分子设计 benchmark suite 的代表之一，包含 goal-directed optimization 与 distribution-learning 等任务类型。
- 待核对经典来源：GUACAMOL 原始论文通常强调其目的是为不同[[分子生成]]/优化方法提供统一、可复现的比较协议。
- 待核对经典来源：相关基准任务往往使用分子性质打分函数与结构约束来衡量生成结果的目标性、可行性和多样性。
- 在多目标分子优化语境下，GUACAMOL 也常被用于测试方法对 trade-off、[[Hypervolume Indicator|超体积]]和样本效率的影响。

## 相关论文

- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
