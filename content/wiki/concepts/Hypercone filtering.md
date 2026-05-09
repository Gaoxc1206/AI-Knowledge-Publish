---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标离散生成"
background: "included"
---
# Hypercone filtering

## 标准定义

Hypercone filtering（超锥过滤）是一种基于几何方向约束的候选筛选方法：给定一个参考方向（例如某个[[权重向量]]），只保留与该方向夹角小于阈值的候选向量，从而排除明显偏离目标方向的更新。在高维空间里，它可看作是对“朝向一致性”的显式约束，常用于多目标搜索、采样或引导优化中。

## 在本知识库中的用法

在该论文的 [[Multi-Objective-Guided Discrete Flow Matching]] 中，[[Adaptive hypercone|hypercone filtering]] 用来过滤离散序列采样时的 token 替换候选：先计算候选改进向量与 trade-off 方向 \(\omega\) 的夹角，再只接受落在超锥内的转移。若候选过少或拒绝率过高，则通过自适应调整锥角 \(\Phi\) 来平衡探索与利用；最终与 [[CTMC]] 的引导转移率和 [[Euler sampling|Euler 采样]]一起工作。

## 关键点

- 核心作用是把候选更新限制在与目标方向一致的区域内，减少与多目标偏好明显冲突的转移。
- 在本文里，过滤依据是候选改进向量与 [[权重向量]] \(\omega\) 的夹角，而不是仅看单个目标分数。
- 它不是独立优化器，而是嵌入 [[离散流匹配]] 的逐步采样过程，作为局部决策的几何筛子。
- 超锥角 \(\Phi\) 不是固定常数，而是根据 rejection rate 自适应更新，以维持合适的候选通过率。
- 若没有候选落入超锥，论文会退化为 self-transition 或选择最接近方向的候选，以保证采样可继续。
- 它服务于把生成过程推向 [[Pareto front]] 附近的区域，但论文也明确说明不保证严格 [[Pareto 最优]]。

## 别名

- hypercone filter
- adaptive hypercone filtering
- cone filtering
- 超锥过滤
- 锥形过滤

## 外部背景

- 超锥/锥体过滤在几何上属于方向约束：在向量空间中保留位于某参考轴附近的点，常见于搜索与检索中的角度阈值筛选。
- 在[[多目标优化]]里，类似的角度约束常用于偏好引导或参考方向法；具体经典来源待核对经典来源。
- 自适应阈值更新属于一种反馈控制思想：通过观测候选拒绝率动态调节过滤强度，避免过严或过松。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
