---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "贝叶斯优化 / 多目标分子优化"
background: "included"
---
# Bayesian optimization

## 标准定义

Bayesian optimization（贝叶斯优化）是一类用于黑箱函数优化的序贯决策方法：先用[[Gaussian Process]]等代理模型对目标函数进行概率建模，再通过[[acquisition function]]在“探索”和“利用”之间权衡，选择下一批最值得评估的候选点。它通常适用于评估代价高、目标函数不可微、样本预算有限的场景；在多目标情形下，还可以直接面向[[Pareto front]]进行优化，而不必先把多个目标压缩成单一标量。

## 在本知识库中的用法

在本知识库所对应的论文中，Bayesian optimization 指用于分子设计的序贯[[多目标优化]]流程：从 [[GUACAMOL]] 固定候选池中逐轮选择分子，使用相同的 GP 代理模型与分子表示，只比较不同 acquisition strategy 的效果。具体实验中每轮从 10,000 个候选分子中选 1 个，连续优化 200 轮，并在 3 个随机种子上重复。该用法主要服务于比较 Pareto-aware 的 EHVI 与固定权重标量化 EI 在超体积、R^2 指标和结构多样性上的差异。

## 关键点

- 标准上，Bayesian optimization 用代理模型近似真实目标，并通过 acquisition function 决定下一次评估哪里最有价值。
- 在多目标[[分子优化]]中，它常被用来直接搜索非支配解，而不是先把多个性质压成一个固定分数。
- 本知识库中的实验把 BO 作为统一框架，控制了 surrogate、kernel、分子表征和候选池，以隔离 acquisition function 的影响。
- 论文比较的核心不是 BO 是否有效，而是在相同 BO 预算下，[[Expected Hypervolume Improvement]] 是否优于固定权重的 [[Expected Improvement]] 标量化版本。
- 该设置强调样本效率：在有限轮次内更快扩展[[Pareto front]]，同时尽量保持化学结构多样性。

## 别名

- BO
- 贝叶斯优化
- 序贯模型优化

## 外部背景

- Bayesian optimization 常见组成包括 surrogate model、acquisition function 和 sequential update 机制。
- 经典 BO 多用于昂贵评估场景，如材料设计、超参数搜索和分子发现；待核对经典来源。
- 多目标 Bayesian optimization 也称 MOBO，常见 acquisition 变体包括 EHVI、[[ParEGO]]、qEHVI 等；待核对经典来源。
- 固定权重标量化是 BO 中常见但较基础的多目标处理方式，优点是实现简单，缺点是对权重敏感且覆盖范围有限。
- 在离散候选池上进行 BO 时，常会先预生成候选集合，再用 acquisition 在候选池中筛选下一点。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
