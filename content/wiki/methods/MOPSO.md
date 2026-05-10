---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标优化"
background: "included"
---
# MOPSO

## 标准定义

MOPSO（Multi-Objective Particle Swarm Optimization）是 [[粒子群优化]] 在多目标场景下的扩展形式，用于同时搜索多个彼此冲突的目标，并用 [[Pareto Front|Pareto前沿]] 上的[[Pareto 最优|非支配解]]来近似可行的折中集合。常见做法是通过外部档案保存非支配解，再借助领导者选择、[[拥挤距离|拥挤度]]或网格密度等机制维持解集多样性；其本质上仍属于群体智能的[[黑箱优化]]方法。

## 在本知识库中的用法

在这篇论文中，MOPSO 作为传统[[多目标优化]]器 baseline，与 [[NSGA-III]]、[[SMS-EMOA]]、[[SPEA2]] 一起用于 peptide binder 设计比较。论文在 1B8Q 和 PPP5 两个 target 上，每种方法生成 100 条候选序列，并报告 MOPSO 相比 MOG-[[Discrete Flow Matching|DFM]] 在 non-fouling、solubility、half-life 等性质上通常更弱，但 affinity 仍具有一定竞争性。

## 关键点

- MOPSO 是 [[粒子群优化]] 的多目标版本，目标是在多个冲突指标之间寻找非支配折中解。
- 标准做法通常依赖外部档案维护非支配解，并通过多样性机制逼近 [[Pareto Front|Pareto前沿]]。
- 在本知识库这篇论文里，MOPSO 不是主方法，而是用于对比的经典多目标优化 baseline。
- 论文中的比较任务主要是 peptide binder 设计，关注 affinity、non-fouling、solubility、half-life 等性质。
- 从结果看，MOPSO 等传统多目标优化器在若干药物相关性质上不如 MOG-DFM，但仍提供了重要的基线参照。

## 别名

- Multi-Objective Particle Swarm Optimization
- 多目标粒子群优化
- Multiobjective PSO

## 外部背景

- MOPSO 通常在连续变量黑箱优化中更常见，离散序列任务往往需要额外编码或离散化处理。
- 常见的 MOPSO 变体会使用[[拥挤距离]]、网格划分或聚类来提升解集分布均匀性。
- 与 NSGA 系列相比，MOPSO 更强调粒子群的速度-位置更新和领导者引导搜索。
- 待核对经典来源：MOPSO 的最早提出版本及其后续 archive 改进论文。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
