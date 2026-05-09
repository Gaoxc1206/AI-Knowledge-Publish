---
type: "method"
status: "enriched"
category: "生成模型"
domain: "分子优化"
---
# GFlowNets

## 定义

[[GFlowNet]]s 在给定上下文中被作为一种用于[[分子优化]]的既有方法提及，尤其出现了基于[[分子图]]的 [[Genetic-guided GFlowNets]] 作为对比基线。它用于在离散的[[化学空间]]中搜索候选分子，并在 [[PMO benchmark|PMO]] 等基准上评估优化效果。关于其具体建模机制、训练目标和采样细节，待从更多论文中补充。

## 关键点

- 在上下文中，GFlowNets 被列为分子优化领域的既有方法之一，属于基于分子图的优化路线。
- Genetic-guided GFlowNets 是 [[PMO benchmark]] 中的对比基线，23 个任务总和指标为 16.213。
- 在本文给出的 PMO 对比中，Chemlactica 系列 [[Large Language Model|LLM]] 的总分高于 Genetic-guided GFlowNets。
- 上下文未提供 GFlowNets 的具体算法细节，相关原理待从更多论文中补充。

## 别名

- Generative Flow Networks
- GFlowNet
- Genetic-guided GFlowNets

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
