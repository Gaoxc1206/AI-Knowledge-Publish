---
type: "concept"
status: "enriched"
category: "分子表示"
domain: "多目标分子优化"
background: "included"
---
# Molecular Fingerprints

## 标准定义

Molecular Fingerprints（分子指纹）是把分子结构映射为固定维度的二进制向量或计数向量的表示方式，用于刻画子结构、原子环境或拓扑模式，便于进行相似度计算、检索、分类和机器学习建模。常见的分子指纹包括 [[ECFP]]/Morgan fingerprint、MACCS keys、拓扑指纹等；在很多场景中会与 [[Tanimoto]] 相似度或其变体配合使用。分子指纹的核心价值是把化学结构压缩为可计算、可比较的特征空间。

## 在本知识库中的用法

在这篇论文里，分子指纹用于作为所有方法共享的分子表示，以尽量控制实验变量并把性能差异归因于 acquisition function 本身。具体采用的是 count-based ECFP，半径为 3，由 RDKit 计算，且不截断 count features。该表示随后输入 GP 代理模型，并与 [[MinMax kernel]] 配合，用于比较 [[EHVI]] 和固定权重标量化 [[Expected Improvement|EI]] 在多目标[[分子优化]]中的表现。

## 关键点

- 标准上，分子指纹是将分子结构编码为向量的通用表示，适合用于相似度、回归和分类任务。
- 本知识库中的用法是：把 count-based ECFP 作为分子表示，和 [[Gaussian Process]] 代理模型一起构成多目标 [[Bayesian optimization]] 的输入。
- 论文刻意固定分子指纹、surrogate 和候选池，只比较 acquisition function，因此指纹在这里属于“受控变量”而不是研究重点。
- 该实验使用的是计数型而非仅二值型指纹，因此能保留子结构出现次数信息，并与 [[MinMax kernel]] 更自然地匹配。
- 分子指纹的选择会影响结构相似性度量和代理模型的归纳偏置，但本文没有比较不同指纹方案，待从更多论文中补充。

## 别名

- molecular fingerprint
- fingerprint
- ECFP
- Morgan fingerprint
- 分子指纹

## 外部背景

- 分子指纹通常分为结构键指纹、路径指纹和循环子结构指纹等类型；待核对经典来源。
- ECFP（Extended-Connectivity Fingerprint）是最常用的分子指纹之一，基于局部原子环境迭代哈希生成；待核对经典来源。
- 二进制指纹更强调“是否出现”，计数型指纹则进一步保留“出现次数”，在一些核方法和相似度定义下更有表达力。
- Tanimoto 相似度是化学信息学中最常见的指纹相似度之一，计数型场景常见其推广形式，如 MinMax / generalized Tanimoto；待核对经典来源。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
