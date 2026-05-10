---
type: "method"
status: "enriched"
category: "生成模型"
domain: "离散序列生成"
background: "included"
---
# Rectified Discrete Flows

## 标准定义

[[Rectified Flow|Rectified Discrete Flow]]s（RDF / [[Rectified Flow|ReDi]]）是一类用于离散数据生成的流式模型思路：通过学习离散状态之间的逐步转移，把复杂分布的采样过程表示为少步、可迭代的token更新过程。与连续 [[Discrete Flow Matching|离散流匹配]]/rectified flow 的思想类似，它强调用“校正（rectification）”来改善转移路径的可采样性与生成质量；在一些实现里，还会借助局部转移规则与 [[Metropolis-Hastings]] 采样来保持目标分布的一致性。

## 在本知识库中的用法

在本知识库对应论文中，Rectified Discrete Flows 作为 [[AReUReDi]] 的基础生成先验，用于肽序列和 peptide [[SMILES]] 的离散生成。具体做法是先训练 [[PepReDi]] 或 [[SMILESReDi]] 作为无条件[[Discrete Flow Matching|离散流]]模型，再在其单点token转移上叠加多目标引导；论文利用该模型的逐步离散转移概率，结合 [[Tchebycheff scalarization]]、[[Locally Balanced Proposals|locally balanced proposal]] 与 [[Metropolis-Hastings]] update，把采样推向多属性 [[Pareto front]] 上的候选分子。

## 关键点

- 标准上，Rectified Discrete Flows 关注的是离散空间中的逐步生成，而不是先映射到连续[[潜在空间|潜空间]]再采样。
- 它的核心价值在于把生成过程做得更“可修正”、更适合少步采样，并提升离散序列的有效性与稳定性。
- 在本库论文中，ReDi 不是最终优化器，而是 AReUReDi 的生成底座：先提供先验分布，再接受多目标属性引导。
- 论文把该方法用于肽序列与 peptide SMILES 两类离散生物分子表示，说明它适合 [[离散序列]] 级别的[[分子生成]]。
- AReUReDi 的多目标引导依赖 ReDi 的单位置变异概率，并通过局部平衡提议与 MH 接受率来约束采样。
- 与纯生成相比，这里 Rectified Discrete Flows 更像“可被引导的离散采样器”，重点是帮助获得更均衡的 therapeutic profile。

## 别名

- ReDi
- Rectified Discrete Flow
- Discrete Rectified Flow
- 离散校正流

## 外部背景

- 待核对经典来源：离散流模型通常可看作对离散马尔可夫转移或路径分布的建模，目标是把简单分布逐步变换为数据分布。
- 待核对经典来源：rectification 一般指通过训练或重参数化降低生成路径中的误差，使少步采样时仍保持较好的生成质量。
- 常见变体包括 discrete flow matching、rectified flow、离散扩散模型等，三者都在探索“逐步生成”的不同实现方式。
- 在生成任务中，这类方法常用于文本、分子序列、蛋白序列等离散对象的采样与编辑。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
