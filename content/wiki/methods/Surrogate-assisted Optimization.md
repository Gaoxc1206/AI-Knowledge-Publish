---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标黑盒优化"
---
# Surrogate-assisted Optimization

## 定义

['Surrogate-assisted Optimization 指在[[黑盒优化]]中借助可微或可评估的代理模型来辅助搜索，以减少对真实[[黑盒 oracle|目标函数]]的直接评估成本。相关上下文中提到，传统[[多目标黑盒优化]]常会使用这类 surrogate model，但本文的方法明确不训练可微 surrogate，而是直接在[[扩散模型]]推理阶段进行引导。待从更多论文中补充。', '在多目标场景下，代理方法通常用于缓解目标不可微、评估昂贵和搜索效率低的问题。本文只将其作为对比背景，而非所提出方法本身。']

## 关键点

- 用于黑盒优化场景，核心作用是减少真实目标函数[[oracle calls|评估次数]]、提升搜索效率。
- 在多目标问题中，常与 [[Pareto front]] 搜索相关，但具体实现细节在当前上下文中未展开。
- 上下文提到一些方法会训练或微调可微 surrogate model 来适配目标分布。
- 本文的方法特别强调不训练 surrogate model，而是在扩散模型推理时直接做多目标分布引导。
- 传统基于 EA 的方法也常与代理或外部 refiner 结合，但在高维生成任务中效率受限。

## 别名

- 代理辅助优化
- surrogate-based optimization
- surrogate-assisted black-box optimization

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
