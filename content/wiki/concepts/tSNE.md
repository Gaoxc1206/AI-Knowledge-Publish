---
type: "concept"
status: "enriched"
category: "降维方法"
domain: "高维数据可视化"
background: "included"
---
# tSNE

## 标准定义

t-SNE（t-distributed Stochastic Neighbor Embedding）是一种非线性降维方法，主要用于[[高维数据可视化]]。它通过尽量保留样本的局部邻域关系，把高维空间中相近的点映射到低维空间；常见做法是最小化高维相似分布与低维相似分布之间的[[KL散度]]。低维空间通常使用 Student-t 分布，以缓解 crowded problem，并更清楚地展示簇结构。

## 在本知识库中的用法

待从更多论文中补充。当前给定论文上下文中未直接出现 tSNE，也没有明确说明其用于蛋白质序列、[[抗体设计]]或 [[Pareto front]] 可视化。

## 关键点

- t-SNE 是一种用于[[高维数据可视化]]的非线性降维方法，重点保留局部邻域而不是全局几何关系。
- 其核心思想是把高维相似性与低维相似性对齐，通常通过最小化二者之间的[[KL散度]]来实现。
- 低维端使用 Student-t 分布有助于缓解点堆积，增强簇分离效果。
- 在解释结果时应更关注“谁和谁相近”，不宜过度解读簇间绝对距离或簇间面积。
- 在当前论文上下文中未见明确使用记录，具体在本知识库中的用途待从更多论文中补充。

## 别名

- t-SNE
- t distributed stochastic neighbor embedding
- t分布随机邻域嵌入

## 外部背景

- 经典来源通常被认为是 van der Maaten & Hinton 的 t-SNE 论文；待核对经典来源。
- 常与[[PCA]]配合使用，先做粗略预降维，再进行 t-SNE 可视化；待核对经典来源。
- 对 perplexity、学习率、初始化方式等超参数较敏感；待核对经典来源。
- 更适合观察局部聚类结构，不适合把嵌入空间的全局距离直接当作真实距离；待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
