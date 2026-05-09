---
type: "method"
status: "enriched"
category: "代理模型"
domain: "多目标贝叶斯优化 / 分子设计"
---
# MinMax kernel GP

## 定义

[[MinMax kernel]] GP 指在[[Gaussian Process|高斯过程]]（GP）中使用 MinMax kernel 作为核函数来建模分子性质。该 kernel 是面向 count-based [[Morgan fingerprints]] 的、对 [[Tanimoto kernel]] 的 count-aware 泛化，适合处理未截断的全维 [[Morgan fingerprint|count-based ECFP]] 向量。上下文中的实验将其与 [[Expected Hypervolume Improvement|EHVI]] 和[[固定权重标量化]] EI 配合使用，但论文重点比较的是 [[acquisition function]]，kernel 设定保持一致。

## 关键点

- 用于基于[[Morgan fingerprint|分子指纹]]的 [[Gaussian Process]] surrogate 建模。
- 输入特征采用 count-based [[Morgan fingerprint]] / [[ECFP]]，radius = 3，且使用未截断的 full-dimensional 向量。
- MinMax kernel 的定义为 k(x, x') = sum_i min(x_i, x'_i) / sum_i max(x_i, x'_i)。
- 它被描述为 Tanimoto kernel 的 count-aware generalization，适合 count-based 指纹。
- 论文实验中 GP 实现使用 JAX-based framework 的 kernel_only_GP。

## 别名

- MinMax kernel
- Min-Max kernel
- count-aware Tanimoto kernel

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
