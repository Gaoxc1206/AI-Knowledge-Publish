---
type: "concept"
status: "enriched"
category: "分子表示"
domain: "多目标分子优化"
background: "included"
---
# ECFP

## 标准定义

ECFP（Extended-Connectivity Fingerprint）是一类基于原子局部邻域递推生成的圆形[[Morgan fingerprint|分子指纹]]，常用于将分子结构编码为固定长度或全维稀疏向量。它通常通过逐层扩展原子环境来刻画子结构特征，因此能够较好表达局部化学环境与整体结构差异。ECFP 既可以是二值指纹，也可以是计数型表示；在很多实现中与 [[Morgan fingerprint]] 关系非常紧密。背景知识中，它常被用作 [[QSAR]]、虚拟筛选和[[分子优化]]中的通用分子表示。

## 在本知识库中的用法

在本知识库所对应的论文比较实验中，ECFP 被用作[[多目标贝叶斯优化]]里的分子表示之一：具体采用 radius = 3 的 [[Morgan fingerprint|count-based ECFP]]，并使用未截断的 full-dimensional 向量。该表示与独立的 [[Gaussian Process]] 代理模型、[[MinMax kernel]] 以及固定候选池一起使用，用于比较 EHVI 与[[固定权重标量化]] EI 在 GUACAMOL 分子优化任务中的表现。论文的结论并不来自 ECFP 本身，而是说明在相同表示下，[[acquisition function|采集函数]]差异会显著影响 [[Pareto front]] 覆盖与[[chemical diversity|结构多样性]]。

## 关键点

- ECFP 是一种把分子结构转成向量表示的 [[分子指纹]]，核心思想是编码原子局部邻域。
- 标准定义上，ECFP 可为二值或计数型；在本知识库对应论文中使用的是 count-based、full-dimensional 版本。
- 它在论文中作为 [[Gaussian Process]] 代理模型的输入特征，用于分子性质的多目标优化。
- ECFP 本身不是优化方法；它提供的是结构表征，优化效果主要由采集函数（如 EHVI）和核函数共同决定。
- 由于采用固定的分子表示，论文能够更公平地比较 [[EHVI]] 与固定标量化 EI 的差异。

## 别名

- Extended-Connectivity Fingerprint
- Morgan fingerprint
- 圆形指纹
- 分子指纹

## 外部背景

- ECFP 常被视为 [[Morgan fingerprint]] 的一种具体参数化形式，尤其在 RDKit 中应用广泛。
- 圆形指纹的常见变体包括不同半径的 ECFP4、ECFP6 等；半径越大，编码的结构上下文通常越丰富。
- ECFP 可与相似性度量或核函数配合使用，用于虚拟筛选、性质预测和分子生成后的排序。
- 待核对经典来源

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
