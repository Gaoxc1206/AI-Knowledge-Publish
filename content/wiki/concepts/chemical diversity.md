---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# chemical diversity

## 标准定义

chemical [[molecular diversity|diversity]]（化学多样性）通常指一组分子在结构、骨架或指纹空间中的差异程度。多样性越高，表示这些分子越不集中在少数相似结构上，而是覆盖更广的[[化学空间]]。它常通过基于[[Morgan fingerprint|分子指纹]]的距离、相似度分布、scaffold 分布或聚类结果来衡量，也常与 [[Pareto front]] 覆盖一起作为优化结果质量的补充指标。

## 在本知识库中的用法

在该论文中，chemical diversity 指优化过程中生成/发现分子的结构多样性，用来检验 [[Expected Hypervolume Improvement|EHVI]] 是否不仅能提升目标值，还能找到更多彼此不同的高质量分子。论文使用 #Circles 指标，并通过不同的 [[Tanimoto distance|Tanimoto distance threshold]] 来统计分子之间的结构差异；结果显示 EHVI 在 Fexofenadine 和 Perindopril 上通常更高，在 Amlodipine 上也多为相当或更优。这里的多样性评价是围绕分子结构差异展开的，而不是单纯看目标分数。

## 关键点

- chemical diversity 关注的是候选分子集合在结构上的分散程度，而不只是单个分子是否“好”。
- 在本知识库对应论文中，它用于衡量 EHVI 与[[固定权重标量化]]方法在 [[多目标分子优化]] 中的探索广度。
- 论文通过基于 [[Tanimoto distance]] 的 #Circles 统计来比较多样性，说明多样性是从 [[分子指纹]] 的[[药物相似性|结构相似性]]角度度量的。
- 实验结论是：EHVI 往往能在保持或提升目标质量的同时，带来更好的化学多样性。
- 多样性与 [[Pareto front]] 覆盖并不完全等价：前者强调结构差异，后者强调[[目标空间]]覆盖。
- 如果只优化固定权重标量目标，容易把搜索集中在某个偏好区域，从而降低化学多样性。

## 别名

- 化学多样性
- 结构多样性
- chemical diversity
- molecular diversity

## 外部背景

- 化学多样性通常被视为分子设计中的重要性质之一，尤其在早期筛选、先导化合物发现和[[多目标优化]]中。
- 常见多样性度量包括指纹相似度/距离统计、骨架多样性（scaffold diversity）、聚类数目和覆盖率等。
- 基于阈值的计数型多样性指标会把“足够不同”的分子对或分子簇计入多样性，具体实现依任务而异，待核对经典来源。
- 多样性高并不必然代表性质更优，但通常有助于提高候选解的可探索性和后续优化空间。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
