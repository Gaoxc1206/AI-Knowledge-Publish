---
type: "method"
status: "enriched"
category: "优化方法"
domain: "进化多目标优化"
background: "included"
---
# Binary Tournament Selection

## 标准定义

Binary [[锦标赛选择|Tournament Selection]]（双人[[锦标赛选择]]）是一种常见的[[选择算子]]：每次从种群中随机抽取两个个体，依据适应度、排序或[[Pareto Dominance|支配关系]]比较，优者胜出并进入下一步繁殖或保留流程。它常用于[[遗传算法]]与进化[[多目标优化]]中，优点是实现简单、计算开销低，且能通过重复抽样维持选择压力。

## 在本知识库中的用法

在该论文的 [[MOMO]] 框架中，作者明确提到在[[隐式化学空间]]里执行 selection、crossover、mutation，并结合 non-domination rank、reference point mechanism 和 dynamic acceptance probability 更新种群；但上下文未明确写出这里的 selection 是否具体采用 binary [[锦标赛选择|tournament selection]]，因此该节点在本知识库中的对应实现待从更多论文中补充。

## 关键点

- 标准上，binary tournament selection 通过两两比较个体来执行选择，属于[[Evolutionary Algorithm|进化算法]]里最基础的繁殖选择机制之一。
- 它通常依赖某种比较准则，如适应度值、[[Pareto Front|Pareto前沿]]相关排序、[[拥挤距离]]或约束可行性，以决定胜者。
- 相比全局排序式选择，binary tournament selection 更轻量，适合在每代都要频繁调用的种群进化流程中使用。
- 在多目标优化中，它常与[[非支配排序]]、参考点策略或多样性维护机制搭配使用，以平衡收敛性与多样性。
- 在本知识库对应论文中，只能确认存在 selection 这一进化步骤；是否采用 binary tournament selection 仍需更多文献佐证。

## 别名

- 二元锦标赛选择
- 双人锦标赛选择
- 二进制锦标赛选择
- 2-way tournament selection
- binary tournament

## 外部背景

- 锦标赛选择是遗传算法中的经典选择机制之一，常见于[[进化计算]]教材与早期 GA 实践。
- Binary 版本指每次只比较两个候选体；更一般的 tournament selection 可以使用更大的锦标赛规模以增强选择压力。
- 在多目标进化算法中，锦标赛比较对象往往不是单一适应度，而是非支配层级、拥挤度或参考点距离等综合信息。
- 待核对经典来源

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
