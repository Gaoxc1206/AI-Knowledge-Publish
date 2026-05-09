---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标生物序列设计"
background: "included"
---
# Pareto-efficient solution

## 标准定义

在 [[多目标优化]] 中，Pareto-efficient solution（也常写作 [[Pareto optimality|Pareto optimal]] solution）指这样一类可行解：不存在另一可行解能够在所有目标上都不差，并且至少在一个目标上更好。换句话说，这类解不被任何其他解 [[非支配解|支配]]，通常构成 [[Pareto front]] 上的解集。它强调的是多目标之间固有的 trade-off，而不是单一指标的全局最优。

## 在本知识库中的用法

在这篇论文里，Pareto-efficient solution 主要作为生成目标的理想区域来使用：[[MOG-DFM]] 希望在离散生物序列采样过程中，把候选序列逐步推向多个性质共同形成的 [[Pareto front]] 附近。作者通过多个预训练标量 score、[[Preference Vector|权重向量]] ω、rank-directional scoring 和 [[Hypercone filtering|adaptive hypercone filtering]] 来偏向更符合 trade-off 偏好的转移。但论文也明确说明，这种方法是朝 Pareto front 采样，**不保证**最终序列一定是 Pareto optimal。

## 关键点

- Pareto-efficient solution 是多目标问题中的核心概念：若一个解不能被其他解在所有目标上同时改进，就可视为有效解。
- 它与 [[非支配解]] 基本同义，通常用来描述 [[Pareto front]] 上的解；前沿上的不同点对应不同的 trade-off 偏好。
- 在该论文中，这一概念不是作为求解器的严格输出条件，而是作为离散生成过程的引导目标，用来让样本更接近多目标折中最优区域。
- MOG-[[Discrete Flow Matching|DFM]] 通过权重向量 ω、局部改进排序和[[Directional alignment|方向一致性]]评分，把原始[[Discrete Flow Matching|离散流匹配]]的转移率重加权，从而偏向更有希望进入 Pareto-efficient 区域的 token 跳转。
- 论文中的表述偏向工程上的近似：生成结果追求接近 Pareto front 的分布覆盖，但作者明确不宣称严格的 [[Pareto optimality]]。

## 别名

- Pareto optimal solution
- Pareto-optimal solution
- non-dominated solution
- 非支配解
- Pareto解

## 外部背景

- 经典多目标优化教材中，Pareto-efficient solution、Pareto optimal solution 和 [[non-dominated solution]] 常被视为近义词；区别通常只在表述习惯上。
- 判断是否 Pareto-efficient 的标准来自支配关系：若存在另一个可行解在所有目标上都不劣且至少一项更优，则当前解不是 Pareto-efficient。
- 常见的求解思路包括加权和、ε-constraint、进化多目标算法等；它们通常返回一组近似前沿，而不是单个唯一解。
- 弱 Pareto 有效解（weak Pareto efficiency）是常见变体，允许在某些定义下存在“全不差但至少一项严格更好”的更宽松判定；待核对经典来源。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
