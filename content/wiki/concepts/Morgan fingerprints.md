---
type: "concept"
status: "enriched"
category: "分子表示"
domain: "多目标分子优化"
background: "included"
---
# Morgan fingerprints

## 标准定义

[[Morgan fingerprint]]s 是一种经典的[[ECFP|分子指纹]]表示，属于基于局部原子环境的[[ECFC4 fingerprint|圆形指纹]]（circular fingerprint）。它通常以每个原子为中心，按固定半径递归收集邻域结构，将这些子结构编码到高维稀疏向量中；在 [[RDKit]] 中常与 [[ECFP]] 互通使用。其优点是实现简单、对局部化学环境敏感、便于与传统机器学习和 [[Gaussian Process]] 等模型结合；常见变体包括二值版、计数版以及不同半径设置。它本质上是一种分子表示，而不是优化算法或评价指标。

## 在本知识库中的用法

在该论文中，Morgan fingerprints 被用作[[多目标贝叶斯优化]]中的统一分子表示，以保证 [[Expected Hypervolume Improvement]] 与[[固定权重标量化]] EI 的比较尽可能受控。作者采用 [[RDKit]] 计算、radius = 3、count-based features、且不截断的 full-dimensional count-based [[ECFP]]，并让两种方法共享同一表示与同一候选池，从而把性能差异主要归因于[[acquisition function|采集函数]]而非表示差异。

## 关键点

- Morgan fingerprints 通过局部原子邻域编码分子结构，适合把离散化学结构映射为可计算的向量特征。
- 它在本库论文中作为统一的 [[分子表示]] 使用，与 [[Gaussian Process]] 代理模型和 [[Bayesian Optimization]] 流程配合。
- 该论文采用的是 count-based、full-dimensional 版本，并设置 radius = 3；这比简单二值指纹更保留结构出现次数信息。
- 由于 EHVI 与 [[fixed-weight scalarized EI|scalarized EI]] 共享同一 Morgan fingerprints 表示，因此实验结论主要比较的是采集函数对 [[Pareto front]] 搜索的影响。
- Morgan fingerprints 常与基于相似度的核函数或指纹距离一起使用；若用于分子优化，通常需要明确半径、是否计数化、是否截断等实现细节。

## 别名

- Morgan fingerprint
- Morgan fingerprints
- ECFP
- circular fingerprint
- Extended-Connectivity Fingerprint

## 外部背景

- Morgan fingerprints 源于经典的 circular fingerprint 思路，常被视为 ECFP 系列的实现基础或通用称呼。
- 不同实现可能在原子不变量、哈希方式、是否折叠到固定长度向量等细节上有所差异，待核对经典来源。
- 在分子机器学习中，Morgan fingerprints 常作为传统基线特征，用于分类、回归与检索任务。
- 计数版 Morgan fingerprints 能保留子结构出现频次，通常比纯二值版携带更多结构信息。
- 其与 Tanimoto 相似度、MinMax kernel 等指纹相似性度量常被一起使用。

## 相关论文

- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
