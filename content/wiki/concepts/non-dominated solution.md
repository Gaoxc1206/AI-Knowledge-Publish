---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子优化"
background: "included"
---
# non-dominated solution

## 标准定义

在 [[多目标优化]] 中，若一个解在所有目标上都不劣于另一个解，并且在至少一个目标上更优，则称前者支配后者；不被任何其他可行解支配的解称为 non-dominated solution，通常也可理解为 [[Pareto optimal]] 解或 [[Pareto front]] 上的点。它不是单一最优值，而是多目标权衡下的一个有效折中解。

## 在本知识库中的用法

在该论文语境中，non-dominated solution 指[[分子设计]]任务里那些在多个性质目标上形成 [[Pareto front]] 近似的候选分子。论文用 [[EHVI]] 和固定权重 [[Expected Improvement]] 在相同候选池与预算下搜索这些解，并用 [[Hypervolume Indicator|hypervolume]]、[[R2 indicator]] 和多样性指标评估所找到解集是否更接近、覆盖更广的[[Pareto set|非支配解集合]]。

## 关键点

- non-dominated solution 是 [[多目标优化]] 的核心概念，强调“没有被别的解同时全面压过”的可行解。
- 一组 non-dominated solutions 构成对 [[Pareto front]] 的近似，适合描述多个目标之间的 trade-off。
- 在分子设计中，它通常对应同时兼顾活性、[[QED]]、[[logP]]、[[SA score]] 等性质的候选分子。
- 论文中的 [[EHVI]] 直接面向[[Non-dominated Solutions|非支配解]]集的扩展，因此更关注覆盖面与前沿推进；固定权重 [[Expected Improvement]] 则更容易偏向某个权衡点。
- “非支配”判定依赖目标是最大化还是最小化，实际实现时需统一方向并明确参考点或比较规则。
- non-dominated solution 不是唯一解，而是一类解的性质；同一问题通常会有多个非支配分子。

## 别名

- nondominated solution
- Pareto-optimal solution
- Pareto efficient solution
- non-dominated point

## 外部背景

- 标准定义：若不存在另一个可行解在所有目标上都至少一样好、且在某一目标上更好，则该解为 non-dominated solution。
- 常见变体：在不同文献中也会写作 Pareto-optimal solution、[[Pareto-efficient solution]] 或 nondominated point。
- 在工程和[[药物发现]]中，non-dominated 解集常作为多目标方法的输出，再用 hypervolume、spacing、coverage 等指标评价。待核对经典来源
- 对于最小化问题与最大化问题，支配关系的方向相反，但概念本质相同。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
