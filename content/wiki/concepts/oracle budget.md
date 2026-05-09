---
type: "concept"
status: "enriched"
category: "实验设置"
domain: "多目标分子优化"
background: "included"
---
# oracle budget

## 标准定义

[[黑盒 oracle|oracle]] budget 指在[[黑盒优化]]或性质驱动生成中，允许调用[[黑盒 oracle|目标函数]]/评分器（oracle）的总次数上限，也可理解为可用于查询、评估或打分的预算。它用于约[[Beam Enumeration|束搜索]]成本，并便于比较不同方法在相同评估资源下的[[sample efficiency|样本效率]]与优化效果。

## 在本知识库中的用法

在本知识库对应论文中，oracle budget 主要指[[分子优化]]过程中对性质[[oracle calls|评估次数]]的固定上限。作者明确采用 [[PMO benchmark]] 中的 5000 次 [[oracle calls]] 预算，用于公平比较 [[MOLLM]] 与其他方法在有限查询资源下的优化质量、效率和候选分子创新性。论文还强调初始种群会显著影响固定预算下的结果，因此用 best / worst / random initial 三种设定来分析 [[sample efficiency]] 与预算利用方式。

## 关键点

- 在分子优化里，oracle budget 约束的是可进行多少次性质查询/打分，而不是生成多少分子。
- 它直接影响 [[sample efficiency]]：同样的预算下，方法越能找到高分子，说明搜索越高效。
- 论文将 5000 次 oracle calls 作为固定比较基准，用于公平评估不同方法。
- MOLLM 的实验设计强调在有限预算内结合 [[in-context learning]]、[[Pareto front selection]] 和 [[F-value]] 提升搜索质量。
- 固定预算下，初始种群质量会显著改变最终结果，因此论文专门比较 best / worst / random initial。

## 别名

- oracle call budget
- query budget
- evaluation budget
- function evaluation budget
- oracle calls

## 外部背景

- 在黑盒优化与 [[Bayesian optimization]] 中，budget 通常就是函数评估次数上限；这是衡量搜索成本的经典方式。
- 在分子设计任务中，oracle 可能是实验测量、物理/化学模拟，或训练好的性质预测器；具体实现需依任务而定，待核对经典来源。
- 固定 oracle budget 便于不同算法进行公平对比，避免某些方法通过更多评估次数获得不公平优势。
- 在遗传算法、强化学习和其他迭代搜索方法中，预算常与 early stopping、population size、mutation rate 等设置共同决定性能。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
