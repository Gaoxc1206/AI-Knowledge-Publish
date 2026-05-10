---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
background: "included"
---
# Reference Point Based Non-dominated Sorting

## 标准定义

Reference Point Based [[非支配排序|Non-dominated Sorting]] 是[[多目标优化]]中的一种排序与选择策略：先依据[[非支配排序]]将候选解分层，再引入一个或多个[[参考点]]，根据解与参考点的距离、方向匹配或覆盖偏好，对同一支配层中的个体进一步排序，从而在逼近[[Pareto front]]的同时维持解集多样性。它本质上是面向[[多目标优化]]的偏好引导型选择机制，常用于[[Evolutionary Algorithm|进化算法]]的环境选择阶段。

## 在本知识库中的用法

在 [[MOMO]] 中，这一策略被用作多属性分子的环境选择机制之一：分子先在 [[潜在空间|latent space]] 中进化，解码后在分子空间计算各目标属性与相似性，然后结合 non-domination rank、reference point mechanism 和 dynamic acceptance probability 选出下一代种群。其作用是避免把 [[QED]]、[[PlogP]]、DRD2、Similarity 简单加权合并，而是保留不同权衡偏好的候选分子，最终更容易得到位于 Pareto-front 上且更具多样性的优化分子。

## 关键点

- 核心用途是对同一非支配层中的解进行二次排序，优先保留更接近参考点或更符合偏好方向的个体。
- 与纯粹的[[Pareto Dominance|支配关系]]排序相比，它更强调解集在[[目标空间]]中的覆盖与分布，适合需要多样化解的场景。
- 在本知识库中的用法是作为 MOMO 的 Pareto-based 评价策略组成部分，用于多属性[[分子优化]]而不是单目标打分。
- 它与 [[Pareto front]] 的关系是：前者服务于搜索与选择过程，后者是最终希望逼近的解集边界。
- 该方法特别适合不希望预先固定多个目标权重的任务。

## 别名

- 基于参考点的非支配排序
- Reference-point based non-dominated sorting
- reference point sorting
- 基于参考点的Pareto排序

## 外部背景

- 多目标进化算法中常见的基本流程是：非支配排序 + 多样性维护；参考点机制属于多样性维护或偏好引导的常见扩展，待核对经典来源。
- 在 NSGA 系列、R-NSGA-II、NSGA-III 等方法中，参考点或参考方向常被用于指导解集分布，待核对经典来源。
- 参考点既可以是人工设定的偏好目标，也可以是动态更新的目标锚点；不同论文中的实现细节差异较大，待核对经典来源。
- 与 crowding distance 一类方法相比，reference point strategy 更强调朝特定目标区域聚集，同时避免解集塌缩到单一区域。

## 相关论文

- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
