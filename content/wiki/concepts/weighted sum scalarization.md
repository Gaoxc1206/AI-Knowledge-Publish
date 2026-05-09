---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
background: "included"
---
# weighted sum scalarization

## 标准定义

weighted [[linear scalarization|sum scalarization]]（[[固定权重标量化|加权和标量化]]）是一种把多个[[黑盒 oracle|目标函数]]压缩为单一标量目标的经典方法，通常写作 f_{ws}(x)=\sum_i w_i f_i(x)。它把多目标问题转化为单目标优化，便于直接复用 [[Expected Improvement]]、[[Upper Confidence Bound|UCB]] 等单目标决策规则。在 [[多目标优化]] 中，它最直观地体现偏好权重，但通常只能稳定覆盖 [[Pareto front]] 的一部分区域，尤其对非凸前沿的覆盖能力有限。

## 在本知识库中的用法

在这篇[[分子设计]]论文里，[[scalarization|weighted sum]] [[scalarization]] 指的是一种**固定权重**的[[标量化]]基线：先用预设权重把多个分子性质压成单一 utility，再在该标量目标上做 EI 选择。论文将它与 [[EHVI]] 放在完全相同的分子表示、[[Gaussian Process]] 代理模型、候选池和预算下比较，用来检验“[[Pareto-aware acquisition]]”是否优于这种简单、可控的固定标量化策略。作者也明确强调，这里比较的是固定权重版本，不是在否定更灵活的[[random scalarization|随机标量化]]或自适应标量化。

## 关键点

- 核心作用是把多目标优化改写成单目标问题，便于直接套用 [[Expected Improvement]] 这类单目标方法。
- 在多目标分子优化中，权重体现对不同性质的偏好，但权重一旦固定，通常只会偏向 [[Pareto front]] 上某个局部区域。
- 对非凸前沿的覆盖往往不理想，因此若想获得多样化 trade-off，常需要更换多组权重重复优化。
- 本知识库中的用法是：作为固定权重 EI 的基线，与 [[EHVI]] 做受控比较，而不是作为完整多目标方法的最终方案。
- 论文结论表明，在相同 surrogate 与预算下，固定标量化方法整体不如 EHVI 稳健地扩展 Pareto 覆盖。

## 别名

- weighted-sum scalarization
- scalarization
- linear scalarization
- fixed scalarization
- 加权和标量化

## 外部背景

- 加权和标量化是最常见的多目标处理方式之一，待核对经典来源。
- 当目标已做尺度归一化时，权重可以更直接地解释为偏好强度；未归一化时，不同量纲会强烈影响结果。
- 标准加权和方法通常更适合凸 Pareto front；对非凸部分的恢复能力有限，待核对经典来源。
- 在贝叶斯优化中，标量化常用于把多目标代理模型的输出转成单目标 acquisition 的优化目标。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
