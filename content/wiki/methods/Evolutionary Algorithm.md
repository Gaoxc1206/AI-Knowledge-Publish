---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标黑箱优化"
background: "included"
---
# Evolutionary Algorithm

## 标准定义

Evolutionary Algorithm（EA，[[进化算法]]）是一类受自然选择与遗传机制启发的随机优化方法，通常通过“种群—选择—变异—[[crossover|交叉]]—迭代更新”的流程，在搜索空间中逐步寻找高质量解。它常用于不可微、离散、组合或高维的优化问题，尤其适合只可评估的黑箱目标。对于多目标场景，EA 往往通过保留一组[[Non-dominated Solutions|非支配解]]来近似 [[Pareto front]]，代表性方法包括 [[NSGA-II]]、[[MOEA/D]] 和 [[SPEA2]]。

## 在本知识库中的用法

在本文上下文中，Evolutionary Algorithm 指传统[[多目标黑盒优化|多目标黑箱优化]]中的基线方法族，被用来与[[扩散模型]][[Inference-time Optimization|推理时优化]]方法 IMG 对比。文中提到 EA、[[MOEA/D]]、[[NSGA-II]]、[[SPEA2]] 等常作为[[多目标优化]]基线，但在高维[[分子生成]]任务中，传统 [[mutation]] / [[crossover]] 难以稳定产生高质量候选，且总体效率低于直接在扩散模型反向推理过程中进行分布引导的 IMG。论文还提到某些方法将预训练扩散模型作为 frozen refiner 放入外部 EA 循环中，但这类用法仍受限于模型原始分布。

## 关键点

- EA 的核心是用种群搜索替代单点搜索，适合 [[Black-box optimization]] 这类只可评估、不可微的目标。
- 多目标场景下，EA 通常不追求单一最优值，而是维护一组非支配解来逼近 [[Pareto front]]。
- 本文把 EA 视为传统 baseline：它们在多目标黑箱优化中常见，但在高维分子生成中效率偏低。
- 论文明确指出，EA 的 mutation / crossover 在复杂生成空间中不够稳定，难以高效产生高质量候选。
- 在本知识库语境里，EA 也对应一种“外部优化循环”思路：先生成候选，再用目标函数筛选/迭代更新。

## 别名

- EA
- 进化算法
- 演化算法
- 遗传算法
- Evolutionary Computation

## 外部背景

- EA 的经典组成包括编码表示、适应度评估、选择、交叉、变异与终止准则；待核对经典来源。
- 多目标 EA 的常见变体包括基于支配关系的算法、分解式算法与指标驱动算法；待核对经典来源。
- EA 在离散组合优化、调参和工程设计中应用广泛，优点是全局搜索能力较强、对梯度无依赖；待核对经典来源。
- 与单目标遗传算法相比，EA 更强调群体多样性与多解集输出；待核对经典来源。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
