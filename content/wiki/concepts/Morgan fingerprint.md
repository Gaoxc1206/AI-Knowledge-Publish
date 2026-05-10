---
type: "concept"
status: "enriched"
category: "分子表示"
domain: "多目标分子优化与分子相似性计算"
background: "included"
---
# Morgan Fingerprint

## 标准定义

Morgan Fingerprint 是一种基于原子局部邻域逐层展开得到的圆形[[Molecular Fingerprints|分子指纹]]，常被视为 [[分子指纹]] 的一种实现形式；它把分子结构编码为固定长度的稀疏或二值向量，便于相似性检索、聚类和机器学习建模。经典用法中，常配合 [[Tanimoto similarity]] 度量两个分子的结构相似性，也常在 [[RDKit]] 中生成。

## 在本知识库中的用法

在本知识库对应论文中，Morgan Fingerprint 主要用于计算优化分子与先导分子之间的结构相似性。论文明确采用基于 [[Molecular Fingerprints|Morgan fingerprint]]s 的 Tanimoto similarity 作为[[多目标优化]]中的一个目标，与 [[QED]]、[[PlogP]]、DRD2 等性质共同优化。

## 关键点

- 它是一种把局部原子环境逐层编码为向量的分子表示方法，适合做结构相似性比较。
- 在该论文中，Morgan Fingerprint 不是学习得到的表示，而是用于计算 [[Tanimoto similarity]] 的固定结构特征。
- 论文把相似性作为独立目标而非简单约束，因此 Morgan Fingerprint 支持了多目标 Pareto 搜索中的评价环节。
- 这种表示相比直接基于 [[SMILES]] 的比较，更能反映分子骨架与局部子结构的相近程度。

## 别名

- ECFP
- Morgan 指纹
- 圆形指纹
- Extended-Connectivity Fingerprint

## 外部背景

- Morgan Fingerprint 通常与 [[Molecular Fingerprints|ECFP]]（Extended-Connectivity Fingerprint）同类，常见实现会输出 bit vector 或 count vector。
- 它广泛用于虚拟筛选、相似性搜索和 QSAR/性质预测等任务。
- 不同半径（radius）和位数（nBits）会影响指纹的分辨率与碰撞率，具体设置需按任务调参。
- 待核对经典来源

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
