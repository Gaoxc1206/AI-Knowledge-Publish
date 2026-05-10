---
type: "dataset"
status: "enriched"
category: "数据集"
domain: "多目标分子优化"
background: "included"
---
# Amlodipine MPO

## 标准定义

Amlodipine MPO 是 [[GUACAMOL]] 体系中的一个 [[多目标分子优化]]基准任务，通常用于评估算法在固定候选分子池上对多个性质的联合优化能力，以及对 [[Pareto front]] 的覆盖效果。它更像是一个任务型 benchmark，而不只是静态数据表；具体目标函数组合、参考前沿和评分细则需要回查原始基准说明，待从更多论文中补充。

## 在本知识库中的用法

在本知识库中，Amlodipine MPO 作为 2025 年比较 [[EHVI]] 与固定权重 [[Expected Improvement]] 的三个 [[GUACAMOL]] 任务之一，用来检验在相同 [[Gaussian Process]] 代理模型、相同分子表示和相同预算下，仅改变 acquisition function 是否会影响优化效果。论文将它用于比较 [[Hypervolume Indicator|Hypervolume]]、[[R^2 indicator]] 和结构多样性（#Circles），结果显示 [[Expected Hypervolume Improvement|EHVI]] 在该任务上通常比固定[[Scalarization|标量化]] EI 有更快收敛、更好的前沿覆盖和更高的严格阈值多样性。

## 关键点

- 它是一个面向药物[[分子生成|分子设计]]的基准任务，核心目标是检验方法能否在多个性质之间做有效权衡，而不是只优化单一分数。
- 在该论文中，它被用作受控实验对象：除了 acquisition function 之外，surrogate、[[Molecular Fingerprints|分子指纹]]、候选池和预算都保持一致。
- Amlodipine MPO 的比较结论支持 [[EHVI]] 相比固定权重 [[Expected Improvement]] 更适合直接优化 Pareto 型目标。
- 论文报告中，这个任务上 EHVI 的 [[Hypervolume Indicator|Hypervolume]] 通常更高、[[R^2 indicator]] 更低，说明其前沿覆盖和前沿逼近都更好。
- 在结构多样性方面，它主要通过 #Circles 指标考察；EHVI 在较严格的相似度阈值下更能保持分子多样性。
- 如果需要更精确的任务定义、评分函数和参考分子信息，仍需进一步查原始 benchmark 文档，待从更多论文中补充。

## 别名

- Amlodipine multi-objective optimization
- Amlodipine MPO task
- 氨氯地平MPO
- 氨氯地平多目标优化

## 外部背景

- Amlodipine（氨氯地平）是一种常见的二氢吡啶类钙通道阻滞剂，属于药物化学中的经典小分子背景，待核对经典来源。
- MPO 通常表示 multi-property optimization 或 [[多目标优化|multi-objective optimization]]，指同时优化多个分子性质的任务，待核对经典来源。
- [[GUACAMOL]] 是[[分子生成]]与[[分子优化]]领域常用的 benchmark 套件，包含多种单目标和多目标任务，待核对经典来源。
- 这类任务通常采用黑箱评分和固定候选池来评估 [[Bayesian optimization]] 或生成式模型的样本效率，待核对经典来源。

## 相关论文

- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
