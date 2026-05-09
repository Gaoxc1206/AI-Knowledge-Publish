---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# weighted sum scalarization

## 定义

[[linear scalarization|weighted sum]] [[scalarization]] 是一种将多个优化目标通过加权和压缩为单一标量目标的方法。根据给定上下文，论文中使用的是固定权重的[[标量化]]：先定义各目标的加权和，再在该单一目标上应用 [[Expected Improvement]] 进行优化。它的优点是可以直接复用单目标优化流程，但需要预先设定权重，且通常只能对应 [[Pareto front]] 上的一个区域或一个点。

## 关键点

- 在[[多目标分子设计]]中，常用来把多个性质目标合并成一个单目标优化问题。
- 论文比较的是固定权重的 weighted sum scalarization，而不是更灵活的随机或自适应标量化。
- 其形式可写为 f_ws(x) = Σ w_i f_i(x)，其中 w_i 为预先设定的权重。
- 在该研究的受控比较中，标量化后的目标再配合 Expected Improvement 使用。
- [[固定权重标量化]]通常只覆盖 Pareto front 的部分区域，若要获得不同 trade-off 往往需要更换权重重复优化。
- 对于[[非凸 Pareto front]]，简单[[scalarization|加权和标量化]]的覆盖能力有限。

## 别名

- 加权和标量化
- 加权求和标量化
- weighted-sum scalarization
- scalarized EI
- fixed scalarization

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
