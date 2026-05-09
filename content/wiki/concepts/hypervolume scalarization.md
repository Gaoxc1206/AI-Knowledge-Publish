---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标贝叶斯优化"
background: "included"
---
# hypervolume scalarization

## 标准定义

[[Hypervolume]] [[scalarization]] 指把多目标问题转化为单标量目标的思路，目标是让这个标量尽可能反映解相对参考点的支配体积（[[Hypervolume Indicator|hypervolume]]）或其改变量，从而可以直接套用单目标优化器。它与一般的 [[标量化]] 类似，但更强调对 [[Pareto front]] 的覆盖；与 [[Expected Hypervolume Improvement]] 相关但不完全等同，后者通常是基于 hypervolume 增量的[[acquisition function|获取函数]]。

## 在本知识库中的用法

待从更多论文中补充。当前上下文中没有直接使用“hypervolume scalarization”这一术语；论文实际比较的是把多个目标先用固定权重压成单一分数、再做 [[Expected Improvement]] 的基线，以及显式面向 [[hypervolume indicator]] 的 [[Expected Hypervolume Improvement]]。因此，在本知识库里它更像是“用[[标量化]]基线对照 hypervolume-aware 方法”的相关概念，而不是该论文中的正式方法名。

## 关键点

- 核心作用是把[[多目标优化]]压成单目标，方便复用成熟的单目标优化流程，例如 [[Expected Improvement]]。
- 如果目标是近似 [[Pareto front]]，这类方法希望标量变化能与 [[hypervolume indicator]] 的提升方向一致。
- 在[[分子设计]]的这篇对比研究中，实际落地的是[[固定权重标量化]] EI；它与 [[Expected Hypervolume Improvement|EHVI]] 的差别在于前者先压缩目标，后者直接优化 hypervolume 增量。
- 这类方法通常对权重或参考点较敏感，因此更适合作为基线或偏好明确的优化方式。
- 相较直接的 hypervolume-aware acquisition，它对[[非凸 Pareto front]] 的覆盖通常更弱。

## 别名

- HV scalarization
- hypervolume-based scalarization
- 基于超体积的标量化

## 外部背景

- 待核对经典来源：多目标优化里更常见的基础标量化包括加权和、Tchebycheff、augmented Tchebycheff 等。
- 待核对经典来源：hypervolume 是少数同时反映收敛性与多样性的指标之一，因此常被用来构造 acquisition 或训练目标。
- 待核对经典来源：在 [[多目标贝叶斯优化]] 中，基于 hypervolume 的方法通常与 [[Expected Hypervolume Improvement]] 一起出现。
- 待核对经典来源：若参考点选择不当，hypervolume 相关标量化或指标的比较会受到明显影响。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
