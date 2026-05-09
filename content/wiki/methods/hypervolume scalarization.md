---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标贝叶斯优化、分子设计"
---
# hypervolume scalarization

## 定义

待从更多论文中补充。现有笔记只明确描述了“[[固定权重标量化]]”：先把多个目标压缩为单一标量 utility，再在该标量目标上使用单目标 [[Expected Improvement]] 进行优化。该方法在论文中被作为与 [[Expected Hypervolume Improvement|EHVI]] 的对比基线，作者指出它通常只对应 [[Pareto front]] 上的一个区域或一个点。论文还提到，简单加权和式[[标量化]]对[[非凸 Pareto front]] 的覆盖可能不足。

## 关键点

- 在这组笔记中，标量化被用作[[多目标贝叶斯优化]]中的基线方法，与 EHVI 直接对比。
- 其核心做法是先用固定权重把多个目标合成为单一标量目标，再应用 Expected Improvement。
- 论文指出，固定权重标量化往往只能探索 Pareto front 的局部区域，若要获得不同 trade-off 解，通常需要重复设置不同权重。
- 简单[[scalarization|加权和标量化]]对非凸 Pareto front 的覆盖能力有限。
- 在[[分子设计]]这类低数据、昂贵评估场景中，重复优化不同权重会带来额外成本。

## 别名

- scalarization
- fixed scalarization
- weighted-sum scalarization
- scalarized EI
- 标量化方法

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
