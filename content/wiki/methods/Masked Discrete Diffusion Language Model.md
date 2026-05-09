---
type: "method"
status: "enriched"
category: "生成模型"
domain: "离散生物序列生成"
---
# Masked Discrete Diffusion Language Model

## 定义

当前给定上下文中没有直接出现“Masked Discrete [[Diffusion Model|Diffusion]] Language Model”的明确介绍，待从更多论文中补充。相关笔记仅表明该类工作属于离散生成建模范畴，尤其关注在离散生物序列空间中进行逐步采样与控制生成。上下文中最接近的相关方法是基于 [[Discrete Flow Matching]] / [[CTMC]] 的多目标引导生成框架，用 token 级转移率重加权来推动样本朝 [[Pareto front]] 采样。

## 关键点

- 当前上下文未直接提供该方法的定义、训练目标或结构细节，待从更多论文中补充。
- 相关笔记中的生成框架直接在离散序列空间建模，不依赖连续嵌入来做优化。
- 采样过程中可结合多个预训练标量评分函数，对候选 token 替换进行多目标引导。
- 相关方法通过重加权转移速率和自适应过滤机制，平衡探索与利用，并朝多目标 Pareto 区域推进。
- 上下文支持的主要应用场景是[[肽段设计]]与 enhancer DNA 设计。

## 别名

- 无

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
