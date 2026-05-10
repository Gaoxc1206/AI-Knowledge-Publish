---
type: "dataset"
status: "enriched"
category: "数据集"
domain: "多目标分子优化"
background: "included"
---
# Fexofenadine MPO

## 标准定义

Fexofenadine MPO 通常指一个以 Fexofenadine 相关分子为核心的多目标[[分子优化]]基准任务，用于评估模型在固定候选空间中对多目标权衡、[[Pareto front]] 覆盖和样本效率的表现。它属于 [[多目标贝叶斯优化]] / [[分子生成|分子设计]]中的任务型数据集，常与 [[Gaussian Process]] 代理模型和不同 acquisition function 一起使用。MPO 这里一般表示 multi-property optimization 或 [[多目标优化|multi-objective optimization]]，具体目标构成需以对应基准定义为准。

## 在本知识库中的用法

在本知识库所对应论文中，Fexofenadine MPO 是三个 [[GUACAMOL]] 多目标分子优化任务之一，与 [[Amlodipine MPO]]、[[Perindopril MPO]] 并列，用于比较 [[Expected Hypervolume Improvement]]（[[Expected Hypervolume Improvement|EHVI]]）和固定权重 [[Expected Improvement]]（EI）。实验中两种方法共享相同的 surrogate model、分子表示、候选池和预算，仅改变 acquisition function；Fexofenadine MPO 上 EHVI 在 hypervolume、R^2 指标和结构多样性上整体优于 EI，且优势较明显。

## 关键点

- 这是一个面向分子设计的任务型 [[数据集]]，更准确地说是[[多目标优化]] benchmark / optimization task，而不是静态分类数据集。
- 在论文中，它被用作受控比较 [[Expected Hypervolume Improvement]] 与固定权重[[Scalarization|标量化]] EI 的实验任务。
- 该任务与 GUACAMOL 固定候选池配套使用，实验设置强调只比较 acquisition function，尽量排除 surrogate、representation 等混杂因素。
- 论文报告中，Fexofenadine MPO 上 EHVI 的最终 hypervolume 和 R^2 指标都优于 [[Scalarization|scalarized EI]]，说明其 Pareto front 逼近更好。
- 在结构多样性评估中，Fexofenadine MPO 上 EHVI 在较严格的 Tanimoto 距离阈值下也更占优。

## 别名

- Fexofenadine
- Fexofenadine MPO task
- GUACAMOL Fexofenadine

## 外部背景

- Fexofenadine 是一种常见的第二代抗组胺药，常用于过敏相关适应症；它的分子结构常被用于药物设计相关基准任务。
- 待核对经典来源：MPO 类任务通常通过多个分子性质目标共同构造，并用来测试算法对冲突目标的处理能力。
- 待核对经典来源：GUACAMOL 是分子生成与优化领域常用的基准集合，包含若干针对不同优化偏好的目标任务。

## 相关论文

- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
