---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# uniqueness

## 标准定义

Uniqueness（唯一性）是[[深度生成模型|生成式模型]]中常用的去重指标，通常表示生成样本里有多少比例是不重复的分子。做法一般是先对分子做标准化/规范化表示，再统计去重后的唯一分子数，占总生成数的比例；数值越高，说明重复生成越少。它常与 [[validity]]、[[diversity]] 一起，用于同时观察模型是否“能生成、少重复、且有探索性”。

## 在本知识库中的用法

在这篇 [[MOLLM]] 论文中，Uniqueness 被作为[[多目标分子优化]]结果的辅助质量指标之一，用来衡量优化过程中生成并保留下来的候选分子集合中，去重后仍保持独立结构的比例。论文在不同初始种群（worst/random/best initial）和不同选择策略（with/without MO selection）下报告了 uniqueness，作为与 [[F-value]]、[[validity]]、[[diversity]] 并列的性能指标；例如作者发现启用多目标选择后，fitness 提升明显，但 uniqueness 仍保持在较高水平，说明模型在优化过程中没有严重退化为大量重复分子。

## 关键点

- Uniqueness 关注的是“重复率”问题：生成集合中越多分子彼此不同，Uniqueness 越高。
- 它通常需要先做分子标准化和去重，因此具体数值会受 canonical [[SMILES]]、盐离子处理等预处理影响。
- 在 MO[[Large Language Model|LLM]] 中，Uniqueness 不是优化目标本身，而是用于补充评估搜索结果质量，和 [[validity]]、[[diversity]]、[[F-value]] 共同观察。
- 该论文报告的 uniqueness 在不同初始种群与选择策略下都维持在较高区间，说明 LLM 驱动的遗传式搜索能较稳定地产生非重复候选。
- Uniqueness 高并不等于整体更优；若只追求 uniqueness，可能出现很多彼此不同但性质很差的分子，因此需要与多目标选择一起看。

## 别名

- unique
- unique rate
- 唯一性
- 去重率

## 外部背景

- 在[[分子生成]]与优化基准中，Uniqueness 常与 novelty、diversity 并列，用来衡量模型是否陷入[[mode collapse|模式坍塌]]。待核对经典来源
- 常见口径是 unique / generated molecules，或者 unique / valid molecules；不同论文对分母定义并不完全一致。待核对经典来源
- 当评估的是 top-k 候选集合时，Uniqueness 也可能指 top-k 中非重复分子的比例，而不一定是全体采样结果。待核对经典来源
- Uniqueness 的计算通常依赖 SMILES 规范化后的结构去重，因此不同实现之间可能存在轻微差异。待核对经典来源

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
