---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标黑盒优化与多目标分子生成"
background: "included"
---
# Preference Vector

## 标准定义

Preference Vector（偏好向量）通常指在[[多目标优化]]中，用来表达对各个目标相对重要性或权衡方向的参数向量。它可以是目标权重、效用参数、温度参数，或用于指定希望在 [[Pareto front]] 上偏向哪一类解的控制变量。其作用不是直接给出最优解，而是把优化过程引导到某种特定 trade-off 区域；在[[分布式优化]]或采样式方法中，偏好向量还常被用来调节目标分布的形状，类似对 [[Boltzmann distribution]] 中能量项的加权控制。

## 在本知识库中的用法

在该论文中，Preference Vector 主要记作 $\lambda_i \in \mathbb{R}^n$，用于 [[IMG]]（[[Inference-time Multi-target Generation]]）里控制每个样本的多目标权衡。它决定[[Weighted Resampling|重采样]]权重 $W(x;\lambda)$ 中各目标项的相对影响，并把[[扩散模型]]的推理过程推向不同的多目标目标分布。作者还在 batch 级别为不同样本分配不同的 preference vector，以便一次推理覆盖更多 Pareto trade-off；当用户没有给定偏好分布时，则通过 [[Quasi-Monte Carlo]] 在正超球面上生成偏好向量，从而提高覆盖均匀性。

## 关键点

- 它本质上是多目标优化中的“权衡控制参数”，用于指定解在各目标之间的偏向，而不是单独优化某一个目标。
- 在本知识库对应论文中，Preference Vector 与扩散推理时的[[Weighted Resampling|加权重采样]]直接绑定，用来调节 IMG 的目标分布。
- 不同样本可使用不同的 preference vector，从而在单次推理中同时生成多种 trade-off 解，提升对 [[Pareto front]] 的覆盖。
- 论文没有把它当作静态超参数，而是当作可批量生成、可分配给不同实例的目标偏好表示。
- 当缺少人工指定偏好时，论文使用 [[Quasi-Monte Carlo]] 生成更均匀的偏好向量集合，以减少偏好空间中的聚集与空洞。

## 别名

- 偏好向量
- 权重向量
- 目标权重向量
- preference weights
- objective weights

## 外部背景

- 在经典多目标优化中，偏好向量常与[[linear scalarization|加权和法]]、目标[[标量化]]、参考点法等一起使用，用于把向量目标转成可优化的单标量或可采样形式，待核对经典来源。
- 在概率生成与[[Energy-Based Model|能量模型]]中，偏好向量可被解释为调节各能量项强度的控制参数，从而改变生成分布的形状，待核对经典来源。
- 在多目标贝叶斯优化、强化学习和生成模型中，类似概念也常被称为 preference weights、objective weights 或 utility weights，待核对经典来源。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
