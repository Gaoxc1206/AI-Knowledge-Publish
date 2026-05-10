---
type: "method"
status: "enriched"
category: "生成方法"
domain: "多目标蛋白质序列优化"
background: "included"
---
# Pareto-compositional Energy-Based Model

## 标准定义

Pareto-compositional [[Energy-Based Model]]（[[Compositional Energy-Based Model|pcEBM]]）是一类将多个属性/任务的[[Energy-Based Model|能量模型]]进行组合，并在采样阶段借助 [[Multiple Gradient Descent]] 寻找Pareto改进方向的 [[Energy-Based Model]] 方法。它通常结合 [[Langevin dynamics]] 进行随机采样，以在多个目标之间做权衡，并尽量覆盖更广的 [[Pareto front]]。

## 在本知识库中的用法

在这篇论文中，pc[[Energy-Based Model|EBM]] 被用于蛋白质/抗体序列采样与优化：把 Ab-like、binding affinity（Aff）和 BV score 作为多个目标，在 compositional EBM 的基础上，用 [[Multiple Gradient Descent|MGD]] 计算采样更新方向，再加噪声进行探索。作者将其与 cEBM、ls-cEBM 和纯 MGD 对比，发现 pcEBM 在多目标 Hyper-Volume、与目标属性数据的 edit distance，以及稳定性方面通常更好，尤其在较小步长下更能覆盖接近 [[Pareto Front|Pareto front]] 的候选序列。

## 关键点

- pcEBM 的核心不是简单把多个能量相加，而是在每一步采样时用 [[Multiple Gradient Descent]] 找到更适合多目标的下降方向。
- 它保留了 [[Langevin dynamics]] 的随机性，因此既能朝多目标改进，又能在前沿附近进行探索。
- 相较朴素的 [[compositional energy-based model]]，pcEBM 更适合目标冲突或非凸 Pareto front 的场景。
- 在本文的抗体设计任务中，pcEBM 同时处理 Ab-like、Aff 和 BV score，目标是生成更优的 [[Pareto front]] 候选序列。
- 实验上，pcEBM 在 Hyper-Volume 和 edit distance 指标上通常优于或接近强基线，且对步长更稳健。

## 别名

- pcEBM
- Pareto-compositional EBM
- Pareto compositional energy-based model

## 外部背景

- Energy-Based Model 的背景：通过定义未归一化能量函数来表示数据分布，常用采样方式包括 Langevin dynamics。
- Compositional EBM 的常见做法是将多个属性对应的能量组合，形成对多条件样本的联合建模。
- [[多目标优化]]中的 [[Pareto 最优|Pareto optimality]] 是指不存在其他解能在所有目标上同时不差且至少一个目标更优的解。
- [[Multiple Gradient Descent]] 用于在多个目标梯度之间寻找共同改进方向；其经典来源待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
