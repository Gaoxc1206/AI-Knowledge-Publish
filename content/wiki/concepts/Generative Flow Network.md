---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "多目标分子设计"
background: "included"
---
# Generative Flow Network

## 标准定义

Generative Flow Network（[[GFlowNet]]）是一类用于离散对象生成的概率生成模型，核心目标是学习一个使对象采样概率近似满足 p(x) ∝ R(x) 的分布，其中 R(x) 是对象的奖励或效用。它通常通过逐步构造对象的前向策略进行采样，并配合流守恒类训练目标，使高奖励区域中的样本既高质量又保持多样性，而不是只收敛到单个最优解。

## 在本知识库中的用法

在这篇论文中，GFlowNet 被用作[[多目标分子设计|多目标分子生成]]的基础框架，并进一步扩展为 [[goal conditioning]] 版本：模型不再只接收偏好权重，而是直接针对指定的[[focus region|目标区域]]采样分子。作者将 reward vector 落入目标 [[focus region]] 的分子视为成功样本，并结合 [[hindsight experience replay]]、[[replay buffer]] 和目标分布调度来缓解[[reward sparsity|稀疏奖励]]与不可行目标带来的训练困难；其目的，是比 [[preference conditioning]] 更可控、更均匀地覆盖 [[Pareto front]]。

## 关键点

- GFlowNet 的核心特征是“按奖励分布采样”，适合需要多样化高质量候选的生成任务。
- 在本知识库的论文语境里，GFlowNet 主要用于[[多目标分子设计]]，而不是单一性质优化。
- 该工作把条件从偏好权重转向目标区域，强调 [[goal conditioning]] 对具体 trade-off 区域的显式控制。
- 相较于 [[preference conditioning]]，这种 hard constraint 方式更有利于在非凸或凹形 [[Pareto front]] 上均匀探索。
- 由于目标区域可能稀疏或不可行，论文借助 replay buffer 和 [[hindsight experience replay]] 提升训练稳定性。

## 别名

- GFlowNet
- Generative Flow Networks
- 生成流网络

## 外部背景

- GFlowNet 常见训练准则包括 trajectory balance、detailed balance、subtrajectory balance 等；待核对经典来源。
- 它常用于离散组合生成、[[graph-based molecular generation|分子图生成]]与其他需要“多解采样”的任务；待核对经典来源。
- 从直觉上看，GFlowNet 介于[[强化学习]]式搜索与生成模型之间，强调从高奖励区域采样而非只做 argmax；待核对经典来源。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
