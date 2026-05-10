---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
background: "included"
---
# GB-GA

## 标准定义

GB-GA 通常指 Graph-Based [[遗传算法|Genetic Algorithm]]，一类以[[遗传算法]]为框架、直接在分子图上进行搜索的优化方法。它通常通过选择、[[crossover]] 和 [[mutation]] 迭代生成新候选分子，再用目标函数或 oracle 评估并保留更优解。与基于字符串的做法相比，这类方法更强调在分子结构层面的编辑与组合。

## 在本知识库中的用法

在本知识库给定论文语境中，GB-GA 主要作为传统[[分子优化]]基线方法之一，用于与 [[MOLLM]]、[[MOLLEO]]、[[GB-BO]]、JT-VAE、[[MARS]]、[[REINVENT]]、DyMol、Genetic-[[GFlowNet|GFN]] 等方法比较。在 MOLLEO 的背景描述中，GB-GA 也被视为外部遗传操作器的代表之一，而 MO[[大语言模型|LLM]] 的目标之一就是不再依赖这类外部遗传操作器，改为直接使用 LLM 执行交叉与变异。在固定 oracle calls 预算、不同初始种群设置（best / worst / random）下，它是评估公平性与性能差距的重要对照对象。

## 关键点

- GB-GA 属于分子优化中的[[遗传算法|遗传搜索]]方法，核心是对候选分子进行选择、交叉与变异，并通过目标打分持续迭代。
- 在该论文的比较语境中，GB-GA 是一个传统 baseline，用来衡量 MOLLM 这类 LLM 驱动方法的多目标优化能力。
- 论文特别强调初始种群会显著影响遗传类方法表现，因此 GB-GA 也应在 [[best initial]]、[[worst initial]]、[[random initial]] 等设置下公平比较。
- 相较于 MOLLM 将 [[LLM]] 直接用于 mating，GB-GA 仍代表传统的手工/规则式遗传操作器思路。
- 该节点在本库中更偏向“对照方法”而非新方法本身；具体实现细节需待从更多论文中补充。

## 别名

- Graph-Based Genetic Algorithm
- Graph GA
- GBGA
- 图遗传算法

## 外部背景

- Graph-Based Genetic Algorithm 的常见思路是把分子看作图结构，在图上做局部编辑与组合，而不是仅在 SMILES 字符串上操作。
- 这类方法常用于分子生成、先导化合物优化和多目标性质优化中，属于经典启发式搜索路线之一。
- 与强化学习或贝叶斯优化相比，GB-GA 更依赖种群演化与离散结构操作，待核对经典来源。
- 在化学空间优化中，GB-GA 往往被用作强基线，但不同实现版本差异较大，具体算子设计需要按原文确认。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
