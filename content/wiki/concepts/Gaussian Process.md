---
type: "concept"
status: "enriched"
category: "其他"
domain: "待分类"
background: "included"
---
# Gaussian Process

## 标准定义

{
  "category": "代理模型",
  "domain": "[[多目标贝叶斯优化]]",
  "standard_definition": "[[Gaussian]] Process（GP，[[Gaussian|高斯]]过程）是一类定义在输入空间上的随机函数模型。给定均值函数与[[核函数]]，任意有限个输入点上的函数值联合服从高斯分布，因此 GP 能同时刻画预测均值与不确定性，并可通过观测数据更新为后验分布。在[[贝叶斯优化]]中，GP 常被用作[[代理模型]]，以支持对昂贵目标的回归、探索与利用权衡。",
  "in_vault_usage": "在本知识库所述论文中，Gaussian Process 主要作为[[多目标分子优化]]的共同代理模型，而不是研究对象本身。作者对每个分子性质分别建立独立的 GP：每个[[黑盒 oracle|目标函数]] \(f_j\) 都用一个 GP 建模，并输出对应的后验均值与后验方差，供 [[Expected Hypervolume Improvement|EHVI]] 与[[固定权重标量化]] EI 共享使用。实验中，GP 采用相同的分子表示与相同的 [[MinMax kernel]]，配合 JAX 实现的 `kernel_only_GP`；这样做的目的，是在相同 surrogate 条件下只比较 [[acquisition function]] 的差异。论文还使用固定的超参数设置（如 amplitude = 1.0、noise variance = 1e-4），并在固定候选池与有限 BO 预算下运行，以隔离 GP 之外的因素对结果的影响。",
  "key_points": [
    "GP 是一种非参数概率模型，可用有限数据估计函数形状，并给出不确定性；这使它很适合与[[贝叶斯优化]]结合。",
    "GP 的核心组件是均值函数和[[核函数]]；核函数决定了输入之间的相似性与函数平滑性假设。",
    "在本知识库的论文里，GP 被用作多目标[[分子优化]]的统一 surrogate：每个性质

## 在本知识库中的用法

待从更多论文中补充。

## 关键点

- 待从更多论文中补充。

## 别名

- 无

## 外部背景

- 待核对经典来源。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
