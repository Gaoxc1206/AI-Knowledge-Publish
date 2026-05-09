---
type: "method"
status: "enriched"
category: "其他"
domain: "多目标分子优化"
---
# MOOD

## 定义

待从更多论文中补充。当前上下文没有给出 [[Multi-Objective Optimization|MOO]]D 的明确定义与独立方法细节；相关笔记主要描述的是 [[MOLLM]]：一种将 [[Large Language Model]] 直接用作[[分子优化]]中的 [[crossover]] 和 [[mutation]] 算子的[[Multi-objective evolutionary molecule optimization|多目标分子优化框架]]。基于现有上下文，只能确认其研究场景涉及[[多目标分子设计]]、Pareto/F-value 选择以及在固定 [[黑盒 oracle|oracle]] 预算下提升优化效率。不能据此断定 MOOD 与上述方法是否为同一概念。

## 关键点

- 待从更多论文中补充：当前上下文未直接介绍 MOOD 的具体定义。
- 相关笔记中的方法核心是用 Large Language Model 充当分子优化的[[crossover|交叉]]与[[mutation|变异算子]]。
- 方法流程包含 prompt 设计、[[in-context learning]]、[[Pareto front selection]] 与 [[F-value selection]]。
- 实验关注多目标[[molecular optimization|分子性质优化]]，并强调在固定 [[oracle budget]] 下的 [[sample efficiency]]。
- 上下文中未提供 MOOD 的独立实验结果、结构或缩写解释。

## 别名

- 无

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
