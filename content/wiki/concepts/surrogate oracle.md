---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子优化"
background: "included"
---
# surrogate oracle

## 标准定义

surrogate [[黑盒 oracle|oracle]]（代理 oracle / 替代 oracle）是指：用一个可计算、可微或较便宜的近似评估器，去模拟真实但昂贵、不可得或不可微的[[黑盒 oracle|目标函数]]/实验读数。在 [[多目标优化]]、[[贝叶斯优化]] 和[[分子设计]]中，它常由 [[代理模型]]、分类器或回归器充当，用来快速给候选样本打分、提供梯度信号，或近似真实实验/仿真中的目标值。它不等同于真实 oracle，而是面向优化过程的近似反馈源。

## 在本知识库中的用法

在这篇关于 [[pcEBM]] 的论文语境里，surrogate oracle 可理解为用于指导蛋白质/抗体序列优化的性质评估器：例如 Ab-like、[[binding affinity]]（[[binding affinity|Aff]]）和 [[BV score]] 等属性模型。论文并未直接使用“surrogate oracle”这一术语，但其方法实质上依赖这些属性模型提供的可优化反馈，再结合 [[Energy-Based Model]] 与 [[Pareto front]] / [[多目标优化]] 的思想生成候选序列。也就是说，这里的“oracle”是被学习到的性质模型，而不是湿实验中的真实测量。

## 关键点

- surrogate oracle 的核心作用是把昂贵或不可直接获得的真实评价，替换成可快速调用的近似评分函数；在序列生成中，它通常作为优化目标或约束信号。
- 在 p[[cEBM]] 语境下，多个性质模型分别充当不同目标的 surrogate oracle，用来近似 Ab-like、Aff、BV 等属性，并为采样提供梯度方向。
- 与真实实验 oracle 相比，surrogate oracle 可能存在偏差，因此更适合用于候选筛选、局部搜索和 [[分子生成]] 中的快速迭代。
- 当多个 surrogate oracle 对应的目标彼此冲突时，单纯加权求和容易偏置某一目标；这也是论文进一步引入 Pareto 思路的原因。
- surrogate oracle 往往和 [[代理模型]] 紧密相关，但前者更强调“作为优化反馈接口”，后者更强调“模型本身是近似器”。

## 别名

- proxy oracle
- surrogate model
- proxy evaluator
- 代理 oracle
- 替代评估器

## 外部背景

- 在 [[贝叶斯优化]] 中，surrogate oracle 常对应“代理目标函数”或“代理评估器”，用于减少真实评估次数；待核对经典来源。
- 在主动学习、[[黑盒优化]]与实验设计中，surrogate oracle 常被视为“可查询的近似标签源”，用来替代昂贵实验；待核对经典来源。
- 在分子与材料设计中，[[性质预测]]器、打分器、QSAR 模型都可能扮演 surrogate oracle 的角色；待核对经典来源。
- surrogate oracle 的常见风险是分布偏移：模型在训练分布外的预测可能不可靠，因此优化时需结合不确定性或多样性控制；待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
