---
type: "concept"
status: "enriched"
category: "优化问题"
domain: "多目标分子优化"
background: "included"
---
# multi-property optimization

## 标准定义

multi-property optimization（MPO，亦常写作 multi-property/[[Multi-Objective Optimization|multi-objective optimization]]）是指在同一候选对象上同时优化多个相互竞争的性质，例如尽量提高若干有益性质、压低若干不利性质，并在目标之间寻找 [[Pareto front]] 上的折中解。它通常会结合 [[scalarization]]、[[Bayesian optimization]] 或其他多目标搜索策略来处理目标冲突。

## 在本知识库中的用法

在本知识库的这篇论文语境中，multi-property optimization 主要指 GUACAMOL 中的三个[[分子设计]]任务：Amlodipine、Fexofenadine 和 Perindopril。每个任务都同时优化多个分子性质，并用它们来比较 [[Expected Hypervolume Improvement]] 与固定权重 [[Expected Improvement]] 的效果。论文把 MPO 视为一个受控的[[多目标贝叶斯优化]]问题：保持相同的 [[Gaussian process]] 代理模型、相同分子表示和相同候选池，只改变 [[acquisition function]]，以观察对 Pareto 覆盖、收敛速度和[[chemical diversity|结构多样性]]的影响。

## 关键点

- MPO 的核心不是得到单一最优值，而是在多个性质之间找到更好的折中，并尽量逼近 [[Pareto front]]。
- 在分子设计中，MPO 常被用来联合考虑活性、[[QED]]、[[logP]]、[[SA score]]、[[分子量]]或目标相似性等性质。
- 本库中的相关论文把 MPO 具体化为三个 GUACAMOL 任务，并用其比较 [[EHVI]] 与固定权重 [[scalarization]] 基线。
- 与[[固定权重标量化]]相比，MPO 更适合评估“多样的高质量分子集合”而不仅是单点最优解。
- 在该论文设置下，MPO 的评价不仅看目标值，还看 hypervolume、R2 indicator 和结构多样性。

## 别名

- MPO
- multi-property optimization
- multi-objective molecular optimization
- 多属性优化
- 多目标分子优化

## 外部背景

- 多目标优化教材中通常将 MPO 视为“多目标决策问题”的一种实例；待核对经典来源。
- 在药物发现里，MPO 常被用来描述“同时满足药效、安全性、药代和可合成性”的分子筛选目标；待核对经典来源。
- MPO 常与 [[surrogate model]] + acquisition function 的框架一起出现，尤其是在昂贵评估场景下；待核对经典来源。
- 一些经典分子优化 benchmark 会把 MPO 设计成一组固定属性组合，用于比较不同优化算法；待核对经典来源。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
