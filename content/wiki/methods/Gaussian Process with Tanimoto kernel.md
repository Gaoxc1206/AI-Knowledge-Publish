---
type: "method"
status: "enriched"
category: "代理模型"
domain: "多目标分子优化、贝叶斯优化"
---
# Gaussian Process with Tanimoto kernel

## 定义

一种用于分子性质建模的[[Gaussian Process|高斯过程]]代理模型，输入采用基于 [[Morgan fingerprints]] / [[ECFP]] 的 count-based 表示。文中采用的核函数是 [[MinMax kernel]]，可视为适合 count-based fingerprint 的 [[Tanimoto kernel]] 泛化形式，用于刻画[[Morgan fingerprint|分子指纹]]之间的相似性。论文中每个目标性质分别用独立的 [[Gaussian Process]] 建模，并与 [[Expected Hypervolume Improvement|EHVI]] / EI [[acquisition function|采集函数]]配合使用。该设定主要用于在相同代理模型条件下公平比较不同采集策略的效果。

## 关键点

- 用于[[分子设计]]中的目标性质代理建模，而不是直接作为优化目标本身。
- 输入特征为 [[RDKit]] 计算的 count-based [[Morgan fingerprint]]s / ECFP，radius = 3，且不截断 full-dimensional 特征。
- 核函数采用 MinMax kernel，公式为 min/max 比值，文中将其作为适合 count-based fingerprint 的 Tanimoto kernel 泛化形式。
- 每个目标性质分别由独立的 [[Gaussian]] Process 建模。
- 论文固定了该 GP 设置中的超参数，包括 amplitude = 1.0、noise variance = 10^-4。
- 在实验中，EHVI 和 [[fixed-weight scalarized EI|scalarized EI]] 使用相同的 GP、核函数、分子表示和候选池。

## 别名

- Tanimoto kernel
- MinMax kernel
- Generalized Tanimoto kernel
- count-based Tanimoto kernel

## 相关论文

- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
