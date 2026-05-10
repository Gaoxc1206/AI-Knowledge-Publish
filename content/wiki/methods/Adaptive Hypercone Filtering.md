---
type: "method"
status: "enriched"
category: "采样方法"
domain: "多目标生物序列设计"
background: "included"
---
# Adaptive Hypercone Filtering

## 标准定义

自适应超锥过滤（Adaptive Hypercone Filtering）是一种在 [[多目标优化]] 或引导式采样中使用的方向约束机制：先用一个参考方向（如权重向量）定义一个超锥，再只保留与该方向足够一致的候选更新；当拒绝率变化时，自动调整超锥张角，以在探索与利用之间折中。它常用于筛掉“方向不一致”的候选步，减少对目标折中方向的偏离。

## 在本知识库中的用法

在该论文的 MOG-[[Discrete Flow Matching|DFM]] 中，Adaptive Hypercone Filtering 被放在预训练 [[Discrete Flow Matching|离散流匹配]] 生成器的采样阶段，用来过滤 token 替换候选：只有其多目标改善方向落在当前 trade-off 方向附近超锥内的转移才更可能被接受。超锥角度会根据拒绝率自适应调整，以在保持方向一致性的同时不过度抑制探索。论文中的消融显示，去掉 filtering 会使 half-life 明显下降；使用静态 hypercone 可部分恢复，但可能牺牲 non-fouling 与 solubility；完整的自适应版本在 peptide binder 和 enhancer DNA 任务上更能平衡多个目标。

## 关键点

- 核心作用是在采样时对候选更新做方向筛选，只保留与当前 [[权重向量]] 或折中方向一致的转移。
- 与 [[Pareto front]] 相关：它不直接求解所有 Pareto 解，而是通过局部方向约束把采样轨迹推向更合适的折中区域。
- “自适应”体现在超锥张角会随拒绝率动态调整，从而平衡探索与利用。
- 在本知识库对应论文中，它是 MOG-DFM 的关键采样组件之一，而不是单独训练的生成模型。
- 实验表明该机制对保持多目标平衡很重要，尤其在非凸或不规则的目标景观中更明显。

## 别名

- 自适应超锥过滤
- Adaptive Hypercone
- Hypercone Filtering
- 自适应超锥约束

## 外部背景

- 超锥（hypercone）/锥约束在[[多目标优化]]中常被用来表达“与某个参考方向足够接近”的候选解集合，待核对经典来源。
- 方向一致性筛选可看作一种几何化的局部接受准则，与基于标量化的多目标搜索思路相关，待核对经典来源。
- 自适应阈值/自适应角度调节是常见的搜索控制技巧，可根据接受率或拒绝率调节探索强度，待核对经典来源。
- 在生成式多目标控制中，类似的方向过滤思想通常用于限制引导步偏离目标折中方向，待核对经典来源。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
