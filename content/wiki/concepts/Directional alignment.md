---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标离散序列生成"
background: "included"
---
# Directional alignment

## 标准定义

Directional alignment（方向对齐）指候选更新方向、改进向量或梯度方向与预设目标方向、[[Preference Vector|偏好向量]]或[[Preference Vector|权重向量]]之间的一致程度。通常可用夹角、余弦相似度、点积符号等方式刻画：对齐越强，表示该候选变化越朝向期望的优化方向；对齐越弱或相反，则表示其与目标偏好不一致。它常用于 [[多目标优化]]、[[Pareto front]] 相关方法中，作为筛选、重加权或约[[Beam Enumeration|束搜索]]方向的原则。这里的“方向”是背景性的通用定义，不特指某一篇论文。

## 在本知识库中的用法

在该论文的 [[MOG-DFM]] 中，directional alignment 主要指候选 token 替换带来的多目标改进向量与 trade-off 权重向量 ω 的方向一致性。作者用方向项 D(y_i,x,ω)=Δs(y_i,x)·ω 来衡量这种一致性，并把它与 rank-based 局部改进分数结合，重加权 [[Discrete Flow Matching]] 的转移速率。与此同时，论文还用候选改进向量与 ω 的夹角 α_i 来做 [[hypercone]] 过滤，只保留与偏好方向足够一致的转移，从而在离散序列生成过程中引导样本朝更接近 [[Pareto front]] 的区域移动。

## 关键点

- 标准上，directional alignment 关注的是“变化方向是否朝向目标方向”，常见度量包括余弦相似度、夹角和点积。
- 在这篇论文里，它不是单独的优化目标，而是多目标引导信号的一部分，用来表达候选替换与权重向量 ω 的一致性。
- 作者把方向对齐与局部 rank 改进结合，形成综合分数后再去重加权 [[Discrete Flow Matching]] 的转移速率。
- 方向对齐还被用于 [[hypercone]] 过滤：只有落在 ω 附近角锥内的候选转移才会被优先接受。
- 这种机制的目标是让离散生物序列生成过程更稳定地朝多目标折中区域推进，但论文也明确说明不保证找到真正的 Pareto optimal 解。

## 别名

- direction alignment
- 方向对齐
- 方向一致性
- aligned direction

## 外部背景

- 在[[多目标优化]]中，方向对齐常与偏好引导（preference-based optimization）一起使用，用于将搜索过程限制在用户关心的目标权衡方向上。
- 在梯度法或连续优化中，directional alignment 常可通过目标方向与更新向量的夹角来度量；夹角越小，表示越对齐。
- 在生成模型或采样控制中，方向对齐也可被理解为“引导信号是否与当前转移一致”，用于决定重加权、筛选或[[拒绝采样]]。
- 待核对经典来源

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
