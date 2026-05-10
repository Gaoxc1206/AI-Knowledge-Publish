---
type: "concept"
status: "enriched"
category: "实验设置"
domain: "多目标分子优化"
background: "included"
---
# Oracle Calls

## 标准定义

Oracle calls 指在[[黑箱优化|黑盒优化]]或生成式优化中，对外部评价函数、模拟器或实验系统进行查询的次数。每一次 call 通常对应一次候选解的性质评估，用来衡量算法在固定预算下的样本效率与搜索效率。对于分子设计场景，oracle 通常指可计算目标性质的打分函数或性质预测器，而不是模型内部参数更新。

## 在本知识库中的用法

在本知识库的 [[MOLLM]] 论文语境中，oracle calls 主要指多目标[[分子优化]]过程中对候选分子的性质打分次数，用作统一的优化预算。论文强调在固定 5,000 oracle calls 的 PMO 风格预算下比较不同方法的公平性，并指出初始种群选择会显著影响基于遗传搜索的方法表现，因此需要区分 best initial、worst initial 和 random initial。oracle calls 也隐含了方法的查询成本：MOLLM 通过减少 LLM 调用与总体运行时间，在相同预算下取得更高的多目标 fitness。

## 关键点

- oracle calls 本质上是黑盒优化中的“查询预算”，每次查询对应一次候选分子的性质评估。
- 在多目标分子优化中，oracle calls 常用来衡量方法在固定评估次数下的效率，而不仅仅是最终最优值。
- 本知识库中它主要作为实验设置与公平比较标准，尤其用于限定 PMO 风格的 5,000 次预算。
- 论文强调：在固定 oracle calls 下，初始种群会显著影响遗传类方法结果，因此需要分开报告不同初始化。
- oracle calls 既反映搜索过程中的计算/推理成本，也间接反映方法是否需要频繁调用外部模型或 LLM。

## 别名

- oracle query
- objective evaluation
- function evaluation
- query budget
- 评估次数

## 外部背景

- 在黑盒优化、Bayesian Optimization 和[[遗传算法]]中，oracle calls 往往等价于目标函数评估次数，用于约束总实验开销。
- 在分子优化任务中，oracle 可以是精确计算器、经验打分函数，或训练好的性质预测器；具体含义需结合实验设置判断。
- 样本效率通常以“在相同 oracle calls 预算下达到的最优值”来比较，是生成式优化和搜索算法的常见评价方式。
- 待核对经典来源：不同论文对 oracle query、function evaluation、objective evaluation 的命名并不完全一致。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
