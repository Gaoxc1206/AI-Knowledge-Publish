---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标贝叶斯优化"
background: "included"
---
# Bayesian Optimization

## 标准定义

[[Bayesian Optimization]]（[[Bayesian optimization|贝叶斯优化]]）是一类用于优化昂贵、黑盒、不可微[[黑盒 oracle|目标函数]]的序贯决策方法。其典型流程是先用概率代理模型（常见如 [[Gaussian Process]]）近似目标函数，再通过[[Acquisition Function]]在“探索/利用”之间权衡，迭代选择下一批最值得评估的样本。它特别适合评估代价高、样本预算有限的场景，如实验设计、材料发现和[[分子优化]]；在多目标情形下，BO 通常会结合 [[Pareto Front]]、[[Hypervolume Indicator|超体积]]等概念扩展到多目标采集策略。

## 在本知识库中的用法

在本知识库对应论文中，Bayesian Optimization 指的是一个受控的[[多目标分子优化]]流程：在相同分子表示、相同 GP 代理模型、相同候选池和相同评估预算下，仅比较不同[[acquisition function|采集函数]]策略。具体实验采用 10,000 个候选分子、200 轮 BO、3 个随机种子，并对比 [[Expected Hypervolume Improvement]]（[[Expected Hypervolume Improvement|EHVI]]）与[[固定权重标量化]]后的 [[Expected Improvement]]（EI）。该设置用于隔离采集策略本身对 [[Pareto front]] 覆盖、收敛速度与[[molecular diversity|分子多样性]]的影响。

## 关键点

- BO 的核心是用概率代理模型近似黑盒目标，并通过采集函数决定下一次评估点，兼顾探索与利用。
- 标准 BO 多用于单目标优化；在多目标场景中，常通过 [[Pareto Front]]、[[Expected Hypervolume Improvement]] 等方式扩展。
- 本库中的 BO 主要出现在分子设计任务里，目标是比较 EHVI 与固定标量化 EI 在同一预算下的表现，而不是提出新的 BO 框架。
- 该论文中的 BO 使用独立的 GP 为每个性质建模，并在固定候选池上逐轮选择分子，强调受控比较。
- 结果表明，在这些分子 MPO 任务里，Pareto-aware 的 BO 往往比固定权重标量化更能提升覆盖、收敛和多样性。

## 别名

- BO
- Bayes Optimization
- 贝叶斯优化

## 外部背景

- 经典 BO 通常以 [[Gaussian Process]] 为代理模型，并配合 EI、UCB、PI 等采集函数；待核对经典来源。
- 多目标 BO 的常见扩展包括 EHVI、ParEGO、qEHVI 等；待核对经典来源。
- 在离散空间或候选池有限的任务中，BO 常被改造成“从固定候选集合中选点”的版本，以适配分子设计；待核对经典来源。
- BO 的理论与实践通常强调样本效率，适合评估昂贵的实验或模拟目标；待核对经典来源。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
