---
type: "method"
status: "enriched"
category: "生成模型"
domain: "离散生物序列生成"
background: "included"
---
# Discrete Flow Matching

## 标准定义

Discrete Flow Matching（[[Discrete Flow Matching|DFM]]）是一类面向离散状态空间的生成建模方法，通常通过学习[[连续时间马尔可夫链]]中的 token 转移率或“流”来刻画从噪声/初始分布到数据分布的演化。它与连续空间的 flow matching 不同，核心优势是可直接在离散序列上建模与采样，而不必先将序列强行嵌入连续表示。常见表述会把它理解为在离散空间中学习一个可采样的 [[连续时间马尔可夫链]]，并用 token-level 的转移规则逐步生成样本。

## 在本知识库中的用法

在这篇论文相关知识库中，Discrete Flow Matching 是 MOG-DFM 的底层预训练生成器，用于肽结合物和 enhancer DNA 的[[可控生成]]。采样时不是重新训练生成器，而是在 DFM 的离散采样轨迹上加入多目标引导：随机选取位置、枚举候选 token 替换、根据多目标 score 对转移进行重加权，并结合[[Adaptive Hypercone Filtering|自适应超锥过滤]]来限制与目标 trade-off 方向不一致的更新。论文强调它适合直接处理离散生物序列，避免把序列先映射到连续空间再优化。

## 关键点

- DFM 直接建模离散序列的生成过程，适合 [[离散状态空间]] 下的样本采样，而不是依赖连续嵌入后再生成。
- 其核心对象通常是连续时间马尔可夫链中的 token 转移率或 velocity / flow，因此采样过程可以逐步控制每个位置的替换。
- 在本论文中，DFM 被用作 peptide binder 和 enhancer DNA 的基础生成器，后续通过多目标 guidance 改造采样过程。
- MOG-DFM 的做法是不改训练好的生成器，而是在采样阶段对候选 token 转移进行基于多目标评分的重加权。
- 论文中的 DFM 采样与 [[Pareto front]] 相关：不同权重向量对应不同的多目标折中方向。
- 由于保持在离散空间中，DFM 比需要连续输入的某些多目标方法更适合[[生物序列设计]]任务。

## 别名

- 离散流
- 离散流匹配模型
- DFM
- Discrete Flow Matching
- 离散流匹配

## 外部背景

- 待核对经典来源：Discrete Flow Matching 可视为 [[Flow Matching]] 思想在离散空间中的推广。
- 待核对经典来源：其采样常与连续时间马尔可夫链、随机过程生成和 token replacement 机制相关。
- 待核对经典来源：与 masked diffusion language model 相比，DFM 更强调显式的 token-level 转移率建模。
- 待核对经典来源：在离散序列生成中，DFM 常被用于蛋白质、DNA、RNA 或一般符号序列建模。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
