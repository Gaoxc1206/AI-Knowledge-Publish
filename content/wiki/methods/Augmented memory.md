---
type: "method"
status: "enriched"
category: "优化方法"
domain: "小分子优化"
background: "included"
---
# Augmented memory

## 标准定义

Augmented memory 是一种用于序列生成/[[分子生成]]的记忆增强优化策略，通常在 [[强化学习]] 或启发式搜索中维护高分候选的记忆池，并在后续采样、更新或损失计算中对这些高质量样本进行再利用，以提高[[sample efficiency|样本效率]]并稳定搜索过程。它常与 [[SMILES]] 生成和黑盒 [[奖励函数]] 优化一起使用。

## 在本知识库中的用法

在《Small [[小分子优化|Molecule Optimization]] with [[Large Language Model]]s》中，Augmented memory 仅作为 [[PMO benchmark]] 上的对照方法之一出现，报告的 23 个任务总和指标 [[Top-10 AUC]] 为 15.002。论文未展开其算法细节，因此在本知识库中只能确定它是一个既有的[[分子优化]] baseline，而不是本文提出的方法。

## 关键点

- 常见实现会保留高分候选的 memory/[[replay buffer]]，把过去的优质分子重新用于生成或更新。
- 它适用于离散化、组合爆炸的分子搜索问题，目标是提升探索效率并减少无效采样。
- 在本库对应论文中，Augmented memory 只作为 [[PMO benchmark|PMO]] 基准对照方法出现，未给出完整算法流程。
- 论文仅报告其性能结果：PMO 23 个任务总和 Top-10 AUC 为 15.002，低于本文的 [[Large Language Model|LLM]] 方法。
- 若要精确定义其更新规则、采样策略与超参数，待从更多论文中补充。

## 别名

- AM
- Augmented Memory
- augmented-memory

## 外部背景

- 待核对经典来源：在 REINVENT 系列分子生成工作中，augmented memory 常被用于把高奖励样本重新注入训练过程。
- 常见变体会将 memory 与 top-k 选择、重放样本、探索噪声或拒绝采样结合。
- 与 [[黑盒 oracle]] 优化搭配时，它通常被视为一种启发式经验回放/记忆驱动搜索策略。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
