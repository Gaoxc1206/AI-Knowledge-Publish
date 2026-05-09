---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标贝叶斯优化"
---
# Monte Carlo estimation

## 定义

Monte Carlo estimation 是一种通过随机采样来近似计算期望量的方法。在该论文中，它用于估计 [[Expected Hypervolume Improvement|EHVI]] 的期望 hypervolume 增量。实验里对每个候选分子使用 1000 次 Monte Carlo draws 进行估计。

## 关键点

- 在本文中，Monte Carlo estimation 主要服务于 EHVI 的计算，而不是单独作为优化目标。
- 每个候选分子使用 1000 次 Monte Carlo draws 来近似期望 hypervolume 改变量。
- 该估计过程与 JAX-based 的 kernel_only_GP 实现一起使用。
- 论文在相同 surrogate、表示和候选池下比较 [[acquisition function|acquisition strategy]]，因此 Monte Carlo estimation 是 EHVI 实现细节的一部分。
- 待从更多论文中补充

## 别名

- Monte Carlo
- 蒙特卡洛估计
- MC estimation

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
