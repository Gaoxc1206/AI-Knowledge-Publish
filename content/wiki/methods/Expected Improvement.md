---
type: "method"
status: "enriched"
category: "优化方法"
domain: "贝叶斯优化、 多目标分子优化"
background: "included"
---
# Expected Improvement

## 标准定义

Expected Improvement（EI，期望改进）是一类常见的[[acquisition function|采集函数]]，用于[[Bayesian Optimization|贝叶斯优化]]中平衡探索与利用。它衡量在当前观测最优值基准下，评估某个候选点后所期望带来的目标改进幅度；在[[Gaussian Process|高斯过程]]等[[Gaussian Process|代理模型]]下，EI通常可由预测均值与不确定性解析或近似计算。对于最小化问题，EI关注相对于当前最好值的下降幅度；对于最大化问题，则关注提升幅度。标准形式上，EI只对应单一标量目标，因此在多目标场景里通常需要先做标量化，或作为标量化后目标上的单目标采集函数使用。

## 在本知识库中的用法

在该知识库对应论文中，EI特指“固定权重标量化 Expected Improvement”：先将多个分子性质用固定权重压缩成一个标量目标，再对该标量目标计算 EI。它作为 [[Expected Hypervolume Improvement|EHVI]] 的对照基线，与 EHVI 共享相同的 [[Gaussian Process]] 代理模型、分子表征、候选池和优化预算，差异主要体现在采集策略上。论文并未把它作为 Pareto-aware 方法，而是把它作为一个可控、常见但偏单目标化的 baseline，用来检验在[[分子生成|分子设计]]多目标 BO 中固定标量化是否不如 EHVI。

## 关键点

- EI 的核心作用是：在当前最优解附近，优先选择“预期能带来最多改进”的候选点。
- 标准 EI 主要用于单目标优化；在多目标问题中，常需先通过固定权重等方式做标量化。
- 本库中的用法是固定权重标量化 EI，不是自适应标量化，也不是 [[Expected Hypervolume Improvement|EHVI]] 这类 Pareto-aware 采集函数。
- 在论文的受控比较里，EI 与 EHVI 共享同一 [[Gaussian Process|GP]] 代理、相同分子表示和相同候选池，因此其表现差异主要来自采集策略本身。
- 实验结论显示：相较固定标量化 EI，EHVI 在 [[Pareto Front|Pareto 前沿]]覆盖、收敛速度和结构多样性上整体更优。
- 如果目标偏好事先难以确定，固定权重 EI 往往只能覆盖 Pareto 前沿的一个偏好区域。

## 别名

- EI
- Expected Improvement
- 期望改进
- 标量化EI
- 固定权重标量化EI

## 外部背景

- EI 是[[Bayesian optimization|贝叶斯优化]]中的经典采集函数之一，常与 UCB、PI 等并列使用；待核对经典来源。
- 对高斯过程后验为正态分布的情形，EI 通常有较成熟的解析表达或数值近似；待核对经典来源。
- 在[[多目标优化]]里，标量化 EI 是把多目标问题转化为单目标 BO 的常见基线，但对非凸 Pareto 前沿可能覆盖不足；待核对经典来源。
- 固定权重标量化通常需要预先设定偏好权重，因此更适合偏好明确的场景；待核对经典来源。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
