---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子优化"
background: "included"
---
# GFlowNets

## 标准定义

[[GFlowNet]]s（[[Generative Flow Network|Generative Flow Networks]]）是一类用于[[生成模型]]与组合搜索的概率建模框架，目标不是只找到单个最优解，而是学习一个生成分布，使终止状态被采样的概率与其[[奖励函数]]成比例。它通过在构造轨迹上学习“流量守恒”式的转移规律，把高奖励对象更频繁地生成出来，适合离散空间中的探索与多样性保留。

## 在本知识库中的用法

在本知识库对应论文中，GFlowNets主要作为[[小分子优化]]的既有基线方法出现，具体是 [[Genetic-guided GFlowNets]]。论文在 [[PMO benchmark|PMO]] 基准上将其与 Chemlactica / Chemma 等[[大语言模型]]方法比较，报告其 [[Top-10 AUC|PMO sum Top-10 AUC]] 为 16.213；文中将其视为面向[[黑盒 oracle]] 的[[分子优化]]参考方法之一，而非本文提出的新模型。

## 关键点

- 标准上，GFlowNets强调“按奖励分布采样”而不是“只做贪心找最优”，因此更适合需要保留多样性的[[生成模型]]场景。
- 它通常用于离散组合空间中的结构生成，可与[[分子设计]]、程序搜索、子结构拼接等任务结合。
- 与传统[[强化学习]]相比，GFlowNets更直接地学习终止对象分布，并常用于缓解模式坍塌与局部最优问题。
- 在本论文中，GFlowNets被用作小分子优化基线，代表此前面向黑盒 oracle 的一类强方法。
- 论文结果显示，Genetic-guided GFlowNets 的 PMO 总分低于本文的大语言模型方法，说明基于 SMILES 的专用 LLM 在该设置下具有更强竞争力。

## 别名

- Generative Flow Networks
- GFlowNet
- 生成流网络

## 外部背景

- 最早由 Bengio 等人提出，用于把复杂对象的生成转化为对轨迹流的学习；待核对经典来源。
- 常见训练目标包括 Trajectory Balance、Flow Matching、Detailed Balance 等；待核对经典来源。
- GFlowNets 常被用于需要兼顾高奖励与多样性的任务，如分子生成、离散结构搜索和程序合成。
- 它与能量模型/强化学习的区别在于：目标是匹配一个目标分布，而不只是优化单条轨迹的回报。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
