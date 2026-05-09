---
type: "concept"
status: "enriched"
category: "优化问题"
domain: "多目标生物序列设计"
background: "included"
---
# Enhancer DNA design

## 标准定义

Enhancer DNA design 是指在 DNA 序列空间中生成、修改或筛选增强子相关序列，使其满足预设的调控目标，例如增强子类别、活性强弱、组织特异性或局部结构特征。它通常属于可控序列生成与序列优化问题，常会结合 [[DNA shape]]、motif 以及功能预测器来约束设计结果。背景上，enhancer 是一种顺式调控元件，负责影响基因表达调控。

## 在本知识库中的用法

在这篇论文中，enhancer DNA design 被用作 [[MOG-DFM]] 的应用任务之一，用来验证[[Discrete Flow Matching|离散流匹配]]在 DNA 序列上的多目标引导能力。具体控制目标包括 enhancer class 以及 [[DNA shape]] 特征（如 [[HelT]]、[[Rise]]），通过多目标[[Preference Vector|权重向量]]和 hypercone 过滤，在生成过程中朝多个目标的 Pareto 区域采样。论文还报告了该任务上的 unconditional enhancer DNA 生成质量，并与 Dirichlet FM 进行对比。

## 关键点

- 它是一个面向调控功能的 DNA [[生物序列设计|序列设计]]任务，核心不是单纯生成随机序列，而是控制序列对应的增强子性质。
- 在本论文中，该任务同时涉及 enhancer class 和 [[DNA shape]] 两类目标，体现了多目标约束而非单目标优化。
- 该任务作为评测场景，用于展示 [[Discrete Flow Matching]] 在离散生物序列上的[[controllable generation|可控生成]]能力。
- 论文通过多目标引导采样，让生成结果沿着不同 trade-off 方向逼近 [[Pareto front]]，但作者明确不保证严格 [[Pareto 最优]]。
- 增强子 DNA 设计也被用于检验模型在 unconditional 生成下的整体质量与生物合理性，作为与基线方法比较的基准场景。

## 别名

- enhancer sequence design
- enhancer engineering
- enhancer DNA generation

## 外部背景

- 增强子（enhancer）是调控基因表达的顺式元件，常见于非编码 DNA 区域；待核对经典来源。
- DNA shape 指描述 DNA 局部几何与构象的特征集合，常用于补充序列 motif 信息；待核对经典来源。
- 在序列设计中，enhancer 任务常与活性预测、组织特异性控制和可解释 motif 设计结合；待核对经典来源。
- 常见的 enhancer 设计评估包括功能分类一致性、多样性、以及与真实分布的接近程度；待核对经典来源。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
