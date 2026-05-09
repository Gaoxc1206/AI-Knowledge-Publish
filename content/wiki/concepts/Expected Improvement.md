---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "贝叶斯优化"
background: "included"
---
# Expected Improvement

## 标准定义

Expected Improvement（EI，期望改进）是 [[贝叶斯优化]] 中最经典的[[acquisition function|采集函数]]之一：在给定当前最优观测值的情况下，EI 衡量某个候选点相对于当前最优值“期望能改进多少”。当后验由 [[Gaussian Process]] 给出、且预测分布可近似为[[Gaussian|高斯]]时，EI 可以写成对改进量正部的期望，用于在“继续开发当前最优区域”和“探索不确定区域”之间取得平衡。它既可用于最大化也可用于最小化问题（通过改写改进定义）。

## 在本知识库中的用法

在本知识库对应论文里，EI 不是单独的多目标采集函数，而是“固定权重 [[标量化]]”后的基线：先把多个分子性质按预设权重合成为一个单目标 utility，再在该标量目标上计算 EI。作者用它与 [[Expected Hypervolume Improvement]] 做受控比较，以检验在[[多目标分子设计]]中，单目标化的 EI 是否能像 Pareto-aware 方法那样更好地覆盖 [[Pareto front]]。

## 关键点

- EI 是 [[贝叶斯优化]] 中的单目标采集函数，核心思想是优先选择“期望改进最大”的候选点。
- 标准 EI 依赖代理模型的后验不确定性，因此天然兼顾 exploitation 与 exploration。
- 在本知识库的用法里，EI 先经过固定权重 [[标量化]]，因此只优化一个综合目标，而不是直接处理 [[多目标优化]] 的向量目标。
- 这种[[fixed-weight scalarized EI|固定权重 EI]] 往往只对应 [[Pareto front]] 上的某个偏好区域，难以一次性覆盖多种权衡解。
- 论文中将它作为 [[Expected Hypervolume Improvement|EHVI]] 的对照基线，用于隔离采集函数本身对[[分子优化]]结果的影响。

## 别名

- EI
- 期望改进
- Expected Improvement

## 外部背景

- 经典 EI 通常与[[Gaussian Process|高斯过程]]代理模型配合使用，是单目标 [[Bayesian optimization]] 的标准基线之一。
- EI 的常见变体包括带探索参数的 EI、batch/q-EI、约束 EI；待核对经典来源。
- 当预测分布偏离高斯或目标噪声较复杂时，EI 往往需要数值近似或 [[Monte Carlo estimation|Monte Carlo]] 估计。
- 在多目标问题中，EI 常通过标量化后间接使用；另一条路线是直接使用 EHVI、[[ParEGO]] 等多目标采集函数。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
