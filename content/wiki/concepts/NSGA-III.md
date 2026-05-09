---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
background: "included"
---
# NSGA-III

## 标准定义

[[NSGA-II]]I（[[NSGA-II|Non-dominated Sorting Genetic Algorithm II]]I）是一类面向[[多目标优化]]，尤其是 many-objective 场景的[[进化算法]]。它通常在[[非支配排序]]的基础上，引入[[参考点]]或参考方向来维持种群多样性，并通过选择机制逼近[[Pareto 前沿]]。与更早的 NSGA-II 相比，NSGA-III 更适合目标数较多、需要平衡多个指标的优化任务。

## 在本知识库中的用法

在本文的荧光分子[[inverse design|反向设计]]框架 [[LUMOS]] 中，NSGA-III 被用作多目标进化选择器：将扩散生成中的部分去噪/突变得到的候选分子组成种群，再通过 NSGA-III 选择 Pareto-optimal population，用于在潜在空间内进行[[分子优化]]。其作用是把生成模型产生的候选与多目标[[性质预测]]结果结合起来，支持同时优化吸收峰、发射峰、[[Stokes shift]]、[[molar extinction coefficient|log ε]]、[[photoluminescence quantum yield|PLQY]] 等目标，并在最终阶段配合 hybrid model 做精细筛选。

## 关键点

- NSGA-III 是面向[[多目标优化]]的进化算法，核心目标是在保持种群多样性的同时逼近[[Pareto 前沿]]。
- 它通常通过[[参考点]]/参考方向引导选择，因此更适合目标数较多的 many-objective 问题。
- 在本知识库中，它不是独立的生成模型，而是与潜在扩散模型结合的后处理/选择模块，用来筛选候选分子。
- 本文把“部分去噪得到的新分子”视为突变后代，再由 NSGA-III 进行非支配选择，实现连续潜在空间中的进化式优化。
- 该方法服务于荧光分子的多目标联合优化，目标之间可能冲突，因此需要进化算法来维护折中解集。
- 当结合快速预测器与物理校正模型时，NSGA-III 可作为统一的多目标决策层。

## 别名

- Non-dominated Sorting Genetic Algorithm III
- NSGA Ⅲ
- NSGA3

## 外部背景

- 常见用法：将多个彼此冲突的目标一起优化，并返回一组折中解，而不是单一最优解。
- 与 [[NSGA-II]] 相比，NSGA-III 更强调参考点驱动的多样性维护，通常更适合目标维度较高的场景。
- 经典来源：Deb 等提出的第三代非支配排序遗传算法，待核对经典来源。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
