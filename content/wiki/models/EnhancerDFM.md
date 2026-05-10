---
type: "model"
status: "enriched"
category: "生成模型"
domain: "增强子DNA生成与可控设计"
background: "included"
---
# EnhancerDFM

## 标准定义

Enhancer[[Discrete Flow Matching|DFM]] 可理解为一种面向 enhancer DNA 序列的 [[Discrete Flow Matching]] 生成模型：它在离散序列空间中学习从噪声/初始状态到目标序列分布的生成轨迹，适合用于无条件序列生成，也可作为后续引导采样的基础生成器。作为背景知识，这类模型通常以 token 级转移率或[[连续时间马尔可夫链]]来表达离散生成过程，而不是先把序列强行嵌入连续空间。

## 在本知识库中的用法

在给定论文中，EnhancerDFM 是 enhancer DNA 无[[可控生成|条件生成]]的基座模型，用于评估[[Discrete Flow Matching|离散流匹配]]在增强子序列建模上的生成质量；论文用 FBD 将它与随机序列和 Dirichlet FM 做对比。文中报告 EnhancerDFM 在较少训练 epoch 下即可获得较好的 checkpoint，且在 100 个 NFE 下的 FBD 接近 Dirichlet FM、显著优于随机序列。它还作为该论文“[[Discrete Flow Matching|离散流]]匹配可迁移到 DNA [[蛋白质序列设计|序列设计]]”的示例，和后续 [[MOG-DFM]] 的多目标引导框架形成对照。

## 关键点

- EnhancerDFM 是针对 enhancer DNA 的离散生成模型，核心是把生成过程建模为 [[Discrete Flow Matching]] 式的离散轨迹，而不是连续[[潜在空间|潜空间]]采样。
- 在本知识库对应论文中，它主要承担“无条件生成基座模型”的角色，用来验证离散流匹配对 enhancer 序列分布的建模能力。
- 论文使用 FBD 评价其生成质量：EnhancerDFM 明显优于随机序列，并接近 Dirichlet FM，说明其能生成更像真实 enhancer 的序列分布。
- EnhancerDFM 的结果表明，离散流匹配不仅可用于肽序列，也可迁移到 DNA 序列生成；后续的 [[MOG-DFM]] 则是在此类生成器上加入多目标引导。
- 需要注意，论文中关于训练 epoch 的表述存在疑似笔误，相关细节待从更多论文中补充。

## 别名

- Enhancer DFM
- Enhancer Flow Matching
- Enhancer-DFM
- enhancer DNA DFM

## 外部背景

- 离散流匹配是将 flow matching 思想扩展到离散状态空间的一类生成建模方法，常用连续时间马尔可夫链刻画 token 级转移；待核对经典来源。
- enhancer 是调控基因表达的顺式调控 DNA 元件，常用于解释细胞类型特异性的转录激活；待核对经典来源。
- 生物序列生成模型常用分布相似性、样本多样性和下游性质来评价，无条件生成通常先作为基础能力测试；待核对经典来源。
- 在多目标可控设计中，预训练生成器常作为先验分布，再叠加性质引导或重加权采样；待核对经典来源。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
