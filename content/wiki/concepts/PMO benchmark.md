---
type: "concept"
status: "enriched"
category: "实验设置"
domain: "多目标分子优化"
background: "included"
---
# PMO benchmark

## 标准定义

PMO benchmark 通常指用于分子[[多目标优化]]的标准化评测基准，用来统一比较不同算法在给定任务、初始分子池和 [[oracle calls]] 预算下的搜索能力。它一般会同时考察优化质量、[[sample efficiency|样本效率]]、[[validity|有效性]]、独特性与多样性，并常与 [[Pareto front]]、[[F-value]] 等评价/选择机制配合使用。

## 在本知识库中的用法

在本知识库所对应论文中，PMO benchmark 被用作[[多目标分子优化]]的统一评测环境，作者强调在固定的 5000 次 [[黑盒 oracle|oracle]] 调用预算下比较不同方法的性能。该 benchmark 下，[[MOLLM]] 以 [[ZINC250K]] 作为初始分子来源，并在不同初始种群设置（best / worst / random）和不同目标数量任务上评估其优化效果、稳定性与效率。

## 关键点

- PMO benchmark 不是单一算法，而是面向多目标[[分子优化]]的标准化测试框架，核心作用是让不同方法在相同预算和任务定义下可比。
- 在该论文中，评测重点放在固定 [[oracle calls]] 预算下的优化结果，因此 benchmark 更强调 [[sample efficiency]]，而不是无限制搜索。
- 作者在 PMO benchmark 上使用 [[ZINC250K]] 作为初始分子池，并区分 best / worst / random 三种初始种群，以分析初始分布对遗传式优化的影响。
- 该 benchmark 关注的不只是最终分数，还包括 [[uniqueness]]、validity、diversity 等属性，用于衡量候选分子集合的整体质量。
- 论文中的方法比较体现出：在 PMO benchmark 上，仅靠 prompt 生成不足以保证多目标优化效果，仍需要显式的 [[Pareto front]] 或 [[F-value selection]]。
- PMO benchmark 在本知识库中主要承担“统一实验场景”的角色，服务于多目标分子优化方法的公平对比，而不是单独的模型或数据集。

## 别名

- PMO
- Practical Molecular Optimization benchmark
- 多目标分子优化基准

## 外部背景

- benchmark 通常指一组固定任务、输入分布和评价协议，用于衡量方法优劣并提升可复现性。
- 多目标优化基准一般会同时给出多个性质目标，要求算法在目标之间做权衡，而不是只追求单一最优。
- 在分子优化领域，常见做法是限制 oracle 评估次数，以模拟真实场景中的昂贵性质计算或实验验证。
- 待核对经典来源：PMO 的全称、具体任务集合与标准指标定义在不同论文/实现中可能略有差异。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
