---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "离散生物序列生成"
background: "included"
---
# Generalized KL divergence

## 标准定义

Generalized KL divergence（广义 KL 散度，常也称 I-divergence）是对非负向量或非负测度定义的一类散度函数，常见形式为 D(p\|q)=\sum_i p_i\log\frac{p_i}{q_i}-p_i+q_i。它是非对称、非负的；当两者都是同总质量的概率分布时，额外的质量项会抵消，退化为常见的 KL divergence。它通常用于衡量两个非负分布/强度函数之间的差异，而不要求先验上已经严格归一化。

## 在本知识库中的用法

在这篇工作中，generalized KL loss 被用于训练 [[Discrete Flow Matching]] 的生成器参数，尤其是学习其 [[velocity field]]；作者在 mixture path 参数化下指出，学习 velocity field 可等价于学习边际 posterior。除此之外，论文还说明该 loss 可作为模型评估指标，并可为目标分布似然提供 [[ELBO]] 形式的下界。换言之，在本知识库中它主要是[[Discrete Flow Matching|离散流匹配]]预训练与评估环节中的基础损失，而不是多目标引导本身。

## 关键点

- 它是面向非负向量/测度的广义散度；在概率分布情形下可视为标准 KL divergence 的推广。
- 标准定义通常写作 D(p\|q)=\sum_i p_i\log(p_i/q_i)-p_i+q_i，强调对“质量差异”的惩罚。
- 在本论文中，它是 [[Discrete Flow Matching]] 训练中的核心损失，用来学习离散 [[CTMC]] 里的 [[velocity field]]。
- 作者还把它当作评估信号，并指出它与目标分布似然的 [[ELBO]] 推导相关。
- 它与多目标引导本身不同：前者负责基础生成模型拟合，后者负责在采样时重加权转移方向。

## 别名

- 广义KL散度
- Generalized KL
- I-divergence
- 广义KL损失

## 外部背景

- 常见定义：D(p\|q)=\sum_i p_i\log(p_i/q_i)-p_i+q_i，适用于非负实数向量或测度。
- 当 p 和 q 的总质量相同且都归一化为概率分布时，广义 KL 散度退化为标准 KL divergence。
- 它也常被称为 I-divergence，常见于非负矩阵分解、计数建模和 Poisson 似然相关目标。
- 待核对经典来源

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
