---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标黑箱优化与扩散模型推理"
background: "included"
---
# KL-regularized Optimization

## 标准定义

KL-regularized Optimization 指在优化目标中显式加入 [[KL散度]] 约束/惩罚的优化框架，典型形式是最小化期望代价并限制解分布不要偏离基准分布太远：\(\min_q \mathbb{E}_q[f(x)] + \lambda\, KL(q\|p_{base})\)。其常见结果是得到指数倾斜/ Boltzmann 形式的最优分布，即在保持对基准分布的“保守性”同时，把概率质量更多分配给低代价区域。该概念既可用于策略优化，也可用于[[Distributional Optimization|分布优化]]和推理时采样引导。

## 在本知识库中的用法

在本知识库对应论文中，KL-regularized Optimization 被用作[[多目标黑盒优化|多目标黑箱优化]]的分布式表述基础：先对单个黑箱目标写成 \(\mathbb{E}_q[f_k(x)] + \lambda_k KL(q\|p_{base})\) 的形式，再推得单目标最优分布 \(q_k^*(x) \propto p_{base}(x)e^{-f_k(x)/\lambda_k}\)。随后将多个目标的分布组合成 mixture，并把这个权重形式用于[[扩散模型]]推理时的[[Weighted Resampling|重采样]]，从而把预训练扩散模型的生成分布推向多目标 Boltzmann 目标分布，服务于 [[IMG]] 的多目标候选生成。

## 关键点

- 这是一个把“性能目标”和“偏离基准分布的代价”统一起来的分布优化框架，核心约束由 [[KL散度]] 表达。
- 标准解通常呈指数倾斜形式，可写成 \(p_{base}(x)e^{-f(x)/\lambda}\)；因此它天然对应 [[Boltzmann分布]] / [[Energy-Based Model|能量模型]]式的加权采样。
- 在这篇论文里，它不是单纯的理论背景，而是多目标分布构造的起点：先做单目标 KL-regularized 优化，再组合成多目标 mixture。
- 论文把预训练扩散模型的反向转移分布视作 base distribution，并在每一步用 KL-regularized 的权重思想做 [[重采样]]，实现[[Training-free Guidance|推理时引导]]。
- 该框架适合 [[黑箱优化]]：只需要评估目标值，不要求目标可微，也不依赖显式可导 surrogate。

## 别名

- KL 正则化优化
- KL-regularized optimization
- KL 正则化分布优化
- KL-regularized control

## 外部背景

- 经典上可视为“在约束分布偏移的同时最小化期望损失”的泛化形式，常见于控制、[[强化学习]]和分布优化；待核对经典来源。
- 当 \(\lambda\) 较小时，解更偏向低损失区域；当 \(\lambda\) 较大时，更接近基准分布，这体现了探索-利用权衡。
- 与最大熵优化、熵正则化策略优化在形式上有紧密联系，但侧重点是对参考分布的 KL 偏离而非仅对熵的奖励；待核对经典来源。
- 在生成模型中，这类正则化常被用来做采样引导、分布匹配和后验调整；待核对经典来源。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
