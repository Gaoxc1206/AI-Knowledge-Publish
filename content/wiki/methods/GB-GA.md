---
type: "method"
status: "enriched"
category: "优化方法"
domain: "分子优化"
---
# GB-GA

## 定义

GB-GA 是文中提到的一类传统基于图操作的[[遗传算法]]式[[分子优化]]方法。上下文只说明它属于[[分子设计]]中的图编辑/遗传式操作算子，用于与 [[Large Language Model|LLM]] 驱动的优化框架进行对比。关于其具体算子设计、适用场景和性能细节，当前证据不足，待从更多论文中补充。

## 关键点

- 在文中被作为传统的图操作型遗传算法基线，与 LLM 直接作为[[crossover|交叉]]/[[mutation|变异算子]]的框架进行比较。
- 作者提到 [[MOLLM]] 试图减少对 GB-GA 这类传统图编辑算子的依赖。
- 上下文未给出 GB-GA 的完整定义、具体流程或实现细节，待从更多论文中补充。
- 可推知其与分子遗传算法、图编辑式分子优化有关，但更细粒度信息不足。

## 别名

- Graph-Based Genetic Algorithm
- 基于图的遗传算法
- 图基遗传算法

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
