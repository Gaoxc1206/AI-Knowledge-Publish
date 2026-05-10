---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标贝叶斯优化"
background: "included"
---
# Predictive Entropy Search for Multi-objective Optimization

## 标准定义

Predictive Entropy Search for Multi-objective Optimization（PESMO）是一类信息论驱动的[[多目标贝叶斯优化]]方法。它通常基于[[高斯过程]]等代理模型，通过选择能够最大幅度降低对真实[[帕累托前沿]]或 Pareto set 不确定性的候选点，来最大化下一次评估带来的期望信息增益。与基于[[超体积]]改进的采集函数不同，PESMO 关注的是“学到更多关于前沿本身的信息”，而不是直接最大化单步改进量，因此它属于典型的[[采集函数]]型方法。

## 在本知识库中的用法

待从更多论文中补充

## 关键点

- PESMO 属于信息论视角的多目标 BO 方法，核心目标是减少对[[帕累托前沿]]的后验不确定性。
- 它通常依赖[[高斯过程]]代理，并通过近似推断或采样来估计信息增益，计算上往往比简单标量化更复杂。
- 相较于[[期望超体积增益]]（[[Expected Hypervolume Improvement|EHVI]]），PESMO 更强调“获取前沿信息”而非“直接改进[[Hypervolume Indicator|超体积]]”。
- 本知识库当前给定论文上下文主要讨论 EHVI 与固定标量化 EI 的[[分子生成|分子设计]]比较，未直接涉及 PESMO，具体应用待从更多论文中补充。

## 别名

- PESMO
- Predictive Entropy Search for MO
- 多目标预测熵搜索

## 外部背景

- 经典 Entropy Search 通过最大化关于最优解位置的不确定性减少来指导采样，PESMO 可视为其多目标扩展；待核对经典来源。
- 多目标版本通常将信息对象从单一最优点扩展为 Pareto set / [[Pareto Front|Pareto front]]；待核对经典来源。
- PESMO 常与 EHVI、[[ParEGO]]、MESMO 等并列为多目标 BO 的代表性采集策略；待核对经典来源。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
