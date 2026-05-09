---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标贝叶斯优化与分子表示"
background: "included"
---
# MinMax kernel

## 标准定义

MinMax kernel 是一种面向非负计数型特征的相似度核函数，常用于[[ECFP|分子指纹]]等稀疏向量。其核心形式是对每个维度分别取 min 与 max，再用两者之和的比值衡量相似性：k(x, x') = sum_i min(x_i, x'_i) / sum_i max(x_i, x'_i)。当输入是二值指纹时，它与 Tanimoto/Jaccard 类相似度密切相关；当输入是 count-based 指纹时，它能更自然地利用重复子结构信息。

## 在本知识库中的用法

在该论文的[[多目标分子设计]]实验中，MinMax kernel 被用作 [[Gaussian Process]] 代理模型的核函数，输入是 [[RDKit]] 生成的 count-based Morgan/[[ECFP]] 指纹（radius=3，full-dimensional、未截断）。[[Expected Hypervolume Improvement|EHVI]] 与[[固定权重标量化]] EI 共用同一套 GP 和同一核设置，用于在 GUACAMOL 的三个 [[multi-property optimization|MPO]] 任务上做受控比较。

## 关键点

- 它是针对 count-based 分子指纹的相似度核，强调子结构重叠程度与覆盖程度的综合匹配。
- 与 [[Gaussian Process]] 搭配时，可作为分子性质代理模型中的[[药物相似性|结构相似性]]度量。
- 在本知识库对应论文中，它用于隔离 [[acquisition function]] 的影响：只比较 [[EHVI]] 与固定标量化 [[Expected Improvement]]，其余设置保持一致。
- 论文采用的是 RDKit 计算的 Morgan/[[ECFP]] 表示，说明该核对计数型稀疏指纹尤其合适。
- 标准定义上，它与 [[Tanimoto kernel]] 密切相关，可视为对计数特征更自然的推广。

## 别名

- min-max kernel
- MinMax similarity kernel
- count-based Tanimoto kernel
- generalized Tanimoto kernel

## 外部背景

- 常见于化学信息学中的分子指纹相似度建模，尤其适合非二值、计数型特征。
- 在二值向量场景下，它与 Jaccard/Tanimoto 相似度有对应关系。
- 待核对经典来源

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
