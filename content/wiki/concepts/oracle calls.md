---
type: "concept"
status: "enriched"
category: "优化问题"
domain: "多目标分子优化"
background: "included"
---
# oracle calls

## 标准定义

[[黑盒 oracle|oracle]] calls 指对“oracle”函数的调用次数。这里的 oracle 通常是一个黑盒评估器，用来返回候选解在目标上的得分、性质值或约束是否满足。在线优化、[[Bayesian Optimization|贝叶斯优化]]、[[进化算法]]和[[分子设计]]中，oracle calls 常被用作计算预算或实验预算的近似指标：调用越多，搜索越充分，但代价也越高。

## 在本知识库中的用法

在这篇论文里，oracle calls 主要指对分子性质评估器的调用次数，用来作为[[多目标分子优化]]的统一预算上限。作者遵循 [[PMO benchmark]] 的 5000 次 oracle calls 预算，强调在固定预算下比较不同方法的 [[sample efficiency]]、最终 F-value、以及候选分子的 novelty/[[validity]]/diversity。文中还特别指出：oracle calls 约束的是性质评估成本，而不是 [[Large Language Model|LLM]] 生成分子时的 LLM calls；两者在效率分析中被分别统计。

## 关键点

- oracle calls 是[[黑盒优化]]中的“评价次数”概念，常与 [[oracle budget]] 近义使用。
- 在多目标分子优化中，它通常对应对分子性质打分器或实验代理的调用，而不是对生成模型本身的调用。
- 本论文将 5000 次 oracle calls 作为固定预算，以保证与 [[PMO benchmark]] 及其他基线比较公平。
- 固定 oracle calls 后，算法优劣更能反映搜索效率，而不是单纯依赖更大的计算资源。
- 文中区分了 oracle calls 与 LLM calls：前者衡量优化评估成本，后者衡量语言模型生成开销。

## 别名

- oracle call
- function evaluation
- evaluation budget
- 黑盒评估次数
- 函数调用次数

## 外部背景

- 在 [[black-box optimization]] 中，oracle 常指无法显式求导、只能通过输入输出获取结果的目标函数或评估器。
- 在 [[Bayesian optimization]] 和 [[genetic algorithm]] 中，oracle calls 是衡量昂贵函数评估成本的核心指标。
- 在分子设计任务中，oracle 可能是性质预测模型、规则打分器或真实实验测定过程；不同 oracle 的可信度和成本差异很大。
- 固定 oracle calls 预算有助于比较不同方法的效率与收敛质量，但具体预算设置依任务而异，待核对经典来源

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
