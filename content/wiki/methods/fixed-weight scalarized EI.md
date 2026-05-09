---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标贝叶斯优化、分子设计"
background: "included"
---
# fixed-weight scalarized EI

## 标准定义

fixed-weight [[hypervolume scalarization|scalarized EI]] 指先用固定权重把多[[黑盒 oracle|目标函数]][[标量化]]，再在该单一标量目标上应用 [[Expected Improvement]] 选择下一批候选点的方法。其核心是把[[多目标优化]]转化为单目标优化，常见形式是[[scalarization|加权和标量化]]：$s(x)=\sum_i w_i f_i(x)$，然后最大化或最小化该标量的 EI。它通常依赖预先设定的权重，适合在目标偏好已较明确时使用，但对不同权重下的 trade-off 覆盖有限。

## 在本知识库中的用法

在本知识库对应论文中，fixed-weight scalarized EI 被当作与 [[EHVI]] 对比的固定标量化基线：在相同的 [[Gaussian Process]] 代理模型、相同的[[ECFP|分子指纹]]表示、相同候选池和相同 BO 预算下，先用固定权重把多个分子性质压成单一标量，再用 EI 进行候选分子选择。论文重点比较它与 [[Expected Hypervolume Improvement|EHVI]] 在 GUACAMOL 的三个[[多目标分子优化]]任务上的表现，结果显示该基线整体上在 hypervolume、R2 指标和[[chemical diversity|结构多样性]]方面通常弱于 EHVI，但作者也明确指出这里仅比较一种简单、可控的固定权重版本，不代表所有[[hypervolume scalarization|标量化方法]]。

## 关键点

- 本质上是“固定权重标量化 + 单目标 [[Expected Improvement]]”的组合方法。
- 在标准定义中，它把多目标偏好压缩为一个标量 utility，因此实现简单、可直接复用单目标 BO 管线。
- 在本知识库中的用法是作为 [[EHVI]] 的对照基线，强调与 Pareto-aware acquisition 的差异。
- 论文实验中该方法与 EHVI 共享同一分子表示、同一 [[Gaussian Process]] surrogate、同一候选池和 BO 预算，以隔离 acquisition strategy 的影响。
- 该方法在三个分子设计任务中总体不及 EHVI，尤其在 Pareto front 覆盖、R2 和多样性上更弱。
- 固定权重使其通常只偏向某个 trade-off 区域，若要覆盖更多前沿点通常需要更换权重重复优化。

## 别名

- scalarized EI
- weighted-sum EI
- fixed scalarization EI
- 固定标量化 EI
- 加权和 EI

## 外部背景

- 多目标优化中的标量化方法是经典思路，常见变体包括固定权重加权和、随机标量化和自适应标量化。
- 加权和标量化通常更容易优化，但对非凸 Pareto front 的覆盖能力有限；待核对经典来源。
- EI 是贝叶斯优化中常用的单目标采集函数，用于衡量相对当前最优值的期望改进。
- 在偏好已知、目标数量较少时，固定权重标量化常被用作简单基线或工程实现方案。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
