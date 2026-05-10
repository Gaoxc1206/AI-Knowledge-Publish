---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多目标生物序列设计"
background: "included"
---
# Multi-Objective-Guided Discrete Flow Matching

## 标准定义

Multi-Objective-Guided [[Discrete Flow Matching]]（MOG-[[Discrete Flow Matching|DFM]]）可以理解为一种用于离散生成模型的多目标采样引导框架：在生成阶段，不改变底层生成器参数，而是根据多个目标函数和一个偏好方向，对离散状态空间中的 token 转移进行重加权或筛选，从而把样本推向 [[Pareto front]] 附近的折中解。它通常建立在 [[Discrete Flow Matching]] 这类离散时间连续马尔可夫链生成模型之上，用于在保持离散结构的前提下实现[[可控生成]]。

## 在本知识库中的用法

在这篇论文中，MOG-DFM 被用作面向[[生物序列设计|可控生物序列设计]]的采样方法：在预训练的 PepDFM / EnhancerDFM 采样过程中加入多目标引导，而不是重新训练生成器。它通过 Das–Dennis simplex lattice 生成权重向量，随机选择一个 trade-off 方向；再对每一步候选 token 替换做 rank-directional scoring，并结合[[Adaptive Hypercone Filtering|自适应超锥过滤]]（adaptive hypercone filtering）限制与目标方向不一致的转移。该方法用于肽结合物的[[多目标优化]]（亲和力、hemolysis、solubility、half-life、non-fouling 等）以及 enhancer DNA 设计（class 与 DNA shape），目标是生成更接近 Pareto-efficient 折中的序列。

## 关键点

- 核心作用是在离散序列的采样阶段进行多目标引导，而不是把序列先映射到连续空间再优化。
- 方法依赖预训练的 [[Discrete Flow Matching]] 生成器，并对 token-level transition / velocity 进行重加权。
- 用权重向量表示当前希望偏向的折中方向，覆盖不同的 [[Pareto front]] 区域。
- rank-directional scoring 将局部目标改善与方向一致性结合，用于评价候选 token 替换。
- adaptive hypercone filtering 通过动态调整过滤角度，平衡探索与利用，并减少与目标方向冲突的转移。
- 在本知识库中的具体应用包括 peptide binder 设计与 enhancer DNA 设计，均强调无需重新训练生成器即可实现可控采样。

## 别名

- MOG-DFM
- Multi-Objective Guided Discrete Flow Matching
- 多目标引导离散流匹配

## 外部背景

- [[Discrete Flow Matching]] 是一种离散生成建模思路，常可表述为在离散状态空间上学习[[连续时间马尔可夫链]]的转移率；待核对经典来源。
- 多目标优化通常追求一组互不支配解，而不是单一最优解；常见概念包括 [[Pareto front]]、[[Pareto Dominance|支配关系]]和权重标量化；待核对经典来源。
- 在生成模型采样阶段加入 guidance，是一种常见控制手段；与分类器引导、能量引导或偏好引导在思想上相近，但实现方式不同；待核对经典来源。
- 离散[[蛋白质序列设计|序列设计]]中，直接在 token 空间优化通常比连续嵌入更保真，但也更难做平滑梯度式优化；待核对经典来源。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
