---
type: "method"
status: "enriched"
category: "生成模型"
domain: "蛋白质序列设计与多目标优化"
background: "included"
---
# Energy-Based Model

## 标准定义

Energy-Based Model（EBM）是一类用能量函数 E(x) 表示样本与模型偏好匹配程度的生成模型：能量越低，样本越符合模型分布。标准做法是通过 [[Boltzmann distribution]] 将能量映射为概率分布，并常用 [[contrastive divergence]] 训练；在生成/采样阶段，常借助 [[Langevin Dynamics]] 或其他 [[MCMC]] 方法从低能区域采样。

## 在本知识库中的用法

在这篇论文中，EBM 被用来为蛋白质/抗体序列及其多个性质建立可组合的打分与采样机制。论文将不同性质对应到不同的能量模型，再通过[[多目标优化]]思想构造 Pareto 改进方向，使采样不只是把多个能量简单相加，而是沿着更接近 [[Pareto front]] 的方向搜索。其主要用途是支持同时满足 Ab-like、[[binding affinity]]、[[nonspecificity]] 等多个目标的序列生成与优化。

## 关键点

- EBM 用能量而非显式似然来刻画样本质量，低能样本对应高概率；在生成任务中通常通过采样而不是直接求[[闭式解|解析解]]。
- 标准 EBM 训练与采样常分别依赖 [[contrastive divergence]] 和 [[Langevin Dynamics]]，适合处理离散/连续的复杂结构化数据。
- 本论文把 EBM 用于蛋白质序列的多性质约束生成：每个性质可对应一个能量项，再进一步结合多目标优化方法寻找 Pareto 改进方向。
- 与简单的能量求和不同，论文强调在多目标冲突时应关注 [[Pareto front]] 上的候选，而不是强行追求单一全局最优。
- EBM 在这里更像“可采样的性质评分器”：既能表达单性质偏好，也能与组合式建模和噪声采样结合，用于探索多性质权衡解。

## 别名

- EBM
- Energy-Based Model
- 能量模型
- 基于能量的模型

## 外部背景

- EBM 是经典的无监督生成建模框架之一，常用于图像、序列和结构化预测；待核对经典来源。
- 常见变体包括 unconditioned EBM、conditional EBM，以及与 [[product of experts]] 风格相近的组合式能量建模；待核对经典来源。
- 由于归一化常数难以精确计算，EBM 训练通常依赖对比学习或采样近似；待核对经典来源。
- EBM 的采样质量高度依赖 MCMC 超参数，尤其是步长、噪声强度和初始化方式；待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
