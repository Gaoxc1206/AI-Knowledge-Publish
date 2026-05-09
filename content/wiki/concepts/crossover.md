---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "遗传式多目标分子优化"
background: "included"
---
# crossover

## 标准定义

crossover（交叉）是 [[遗传算法]] 中的重组算子，用于把两个或多个父代个体的表示信息组合起来，生成一个或多个子代候选解。它通常与 [[变异]] 配合使用，目标是在保留部分已有优良结构的同时扩展搜索空间；在 [[分子设计]] 中，父代可以是 [[SMILES]]、片段或图结构，交叉操作的关键要求通常是生成尽可能有效、可比较且具有新颖性的分子。

## 在本知识库中的用法

在 [[MOLLM]] 中，crossover 被定义为由 [[大语言模型]] 直接执行的分子重组操作：从当前种群中随机选取两个父代分子，把它们的 [[SMILES]]、性质值和 F-value 写入 prompt，由模型生成子代分子。它与 [[mutation]] 一起构成 mating 流程，并在后续通过 [[Pareto front]] selection 或 [[F-value selection]] 筛选下一代。该论文强调这种 crossover 不依赖 [[GB-GA]] 一类传统图编辑交叉算子，也不需要额外训练[[分子生成模型]]。

## 关键点

- 标准上，crossover 是 [[遗传算法]] 的核心搜索算子之一，主要作用是通过父代重组产生新的候选解。
- 在本知识库中，crossover 具体指 MO[[Large Language Model|LLM]] 里“用 [[大语言模型]] 生成子代分子”的交叉步骤，而不是传统的图编辑式交叉实现。
- MOLLM 的 crossover 输入通常包含两个父代分子的 [[SMILES]]、目标性质值和 F-value，用于帮助模型进行 in-context 生成。
- crossover 与 [[变异]] 共同构成 mating；前者偏向重组已有结构，后者偏向局部扰动。
- 在[[多目标分子优化]]里，crossover 本身不负责最终筛选，生成后仍需结合 [[Pareto front]] 或 F-value 进行选择。

## 别名

- 交叉
- 交叉算子
- 交配算子
- recombination
- crossover operator

## 外部背景

- 经典 [[遗传算法]] 中，crossover 常见变体包括单点交叉、多点交叉和均匀交叉，用于控制父代信息的交换方式。
- 在[[分子优化]]里，crossover 往往对应对子结构、片段或字符串表示的重组，目标是兼顾[[validity|有效性]]、创新性和可优化性。
- 不同分子表示方式（如 SMILES、图结构、片段库）会影响 crossover 的实现细节和生成分子的合法性；待核对经典来源。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
