---
type: "method"
status: "enriched"
category: "代理模型"
domain: "贝叶斯优化 / 分子设计"
---
# Tanimoto kernel GP

## 定义

[[Tanimoto kernel]] GP 是一种将 Tanimoto kernel 用于 [[Gaussian Process]] 的代理模型，用来根据[[Morgan fingerprint|分子指纹]]的[[药物相似性|结构相似性]]建模分子性质。在给定论文中，Tanimoto kernel 被作为分子指纹相似度的背景方法介绍，其形式基于指纹向量的内积与并集大小。该论文的实际实验使用的是 [[MinMax kernel]]，它是面向 count-based [[Morgan fingerprints]] 的 Tanimoto kernel 泛化版本，因此 Tanimoto kernel GP 的具体实验表现待从更多论文中补充。

## 关键点

- 用于[[分子设计]]中的[[多目标贝叶斯优化]]，依赖分子指纹作为输入表示。
- 通过 Tanimoto kernel 衡量分子结构相似性，并将其嵌入 [[Gaussian]] Process 进行性质回归。
- 适合处理分子 fingerprint 这类稀疏、离散的结构表示。
- 给定论文中仅将其作为背景相关方法介绍，实际实验采用的是 MinMax kernel 而非原始 Tanimoto kernel。
- 其在[[分子优化]]中的具体性能结论待从更多论文中补充。

## 别名

- Tanimoto GP
- Gaussian Process with Tanimoto kernel
- Tanimoto kernel-based Gaussian Process

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
