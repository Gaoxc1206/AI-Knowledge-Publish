---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "离散序列多目标优化"
background: "included"
---
# Metropolis-Hastings

## 标准定义

Metropolis-Hastings（MH）是一类经典的[[马尔可夫链蒙特卡洛]]方法，用于从难以直接采样的目标分布中生成样本。其基本流程是先根据 proposal 分布提出一个候选状态，再按接受率决定是否跳转；接受率通常写为 min(1, 目标分布比值 × proposal 比值)，从而在满足一定条件下保证马尔可夫链以目标分布为不变分布。它常用于[[退火采样]]、[[Energy-Based Model|能量模型]]采样和受约束生成。

## 在本知识库中的用法

在 [[AReUReDi]] 中，MH update 被用作离散序列多目标引导采样的关键步骤：每一步通常只修改一个位置，并结合[[locally balanced proposal]]与退火后的多目标奖励来决定是否接受候选 token 变异。这里的目标分布写成由 ReDi 先验和多目标打分共同定义的形式，用于在保持采样稳定性的同时，把 peptide 序列或 peptide [[SMILES]] 推向更接近[[Pareto front]] 的区域。

## 关键点

- MH 的核心作用是把“提议新样本”和“接受/拒绝更新”分开，适合在复杂离散空间中做受控采样。
- 标准 MH 关注目标分布的不变性；在本知识库里，它被用于把 [[Rectified Discrete Flow]] 生成的样本再朝多目标高分区域修正。
- AReUReDi 里 MH 不是单纯随机游走，而是与[[Tchebycheff scalarization]]、退火系数和局部单点突变 proposal 联合使用。
- 这种设计使采样既能保留生成模型 prior，又能逐步加强对多个冲突属性的偏置，避免只优化单一指标。
- 在离散生物序列生成任务中，MH 的作用更偏向“校正采样轨迹”，而不是直接训练一个新的生成模型。

## 别名

- Metropolis-Hastings算法
- MH
- MH采样

## 外部背景

- MH 是最常见的 MCMC 方法之一，常见于贝叶斯推断、统计物理和受约束生成问题。
- 当 proposal 分布是对称的时，MH 可退化为更简单的 Metropolis 接受规则。
- 在带有温度参数的退火框架中，MH 常用于逐步从探索转向利用，提升高概率区域的采样密度。
- 待核对经典来源

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
