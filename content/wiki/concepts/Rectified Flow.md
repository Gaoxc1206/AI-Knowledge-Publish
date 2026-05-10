---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "离散序列生成、多目标分子优化"
background: "included"
---
# Rectified Flow

## 标准定义

Rectified Flow 是一类基于连续时间向量场的生成建模方法，通常可视为 [[Flow Matching]] 的一种实现思路：从简单分布到数据分布学习一条可积分的流，并通过“rectification”逐步把原本弯曲、复杂的轨迹拉直，使采样路径更简单、步数更少。其核心目标是学习一个随时间变化的速度场/漂移项，把噪声或基分布样本连续变换为数据样本。与传统[[扩散模型]]相比，Rectified Flow 往往强调更直接的轨迹建模与更高效的采样。

## 在本知识库中的用法

在本知识库中，该术语主要指 [[AReUReDi]] 里使用的 [[Rectified Discrete Flow]] / ReDi 先验：先通过 [[PepReDi]] 或 [[SMILESReDi]] 对离散肽序列或 peptide [[SMILES]] 做 rectification，再把它作为多目标引导采样的基础分布。这里的重点不是连续流本身，而是“经过 rectification 后更可靠的离散 token 转移概率”，以及它为后续的 annealed 指导、[[Tchebycheff scalarization]]、局部提议与 MH 更新提供生成基础。

## 关键点

- 标准上，Rectified Flow 属于生成模型中的连续流方法，核心是学习从噪声到数据的可积分流场，而不是直接生成每一步的独立样本。
- “rectification” 的直观作用是把复杂轨迹逐步拉直，从而降低采样难度并提升少步生成质量。
- 在本论文上下文中，它被离散化为 [[Rectified Discrete Flow]]，用于氨基酸序列和 peptide SMILES 这类离散 token 空间。
- AReUReDi 把 rectified flow 作为生成 prior，再叠加多目标属性引导，借助局部候选和退火式更新把样本推向 [[Pareto Front|Pareto front]]。
- 论文中的经验结论是：经过多轮 rectification，基础生成质量和有效性会明显提升，进而改善后续引导采样的可用性。

## 别名

- Rectified Flow
- RF
- Rectified Discrete Flow
- ReDi

## 外部背景

- Rectified Flow 常与 [[Continuous Normalizing Flow]]、[[Flow Matching]]、[[Diffusion Model]] 等方法并列讨论，属于连续生成建模的一支。
- 其典型训练目标通常围绕速度场/向量场回归展开，具体损失形式与路径参数化方式可能因实现而异，待核对经典来源。
- 在离散域中，相关思想常被改写为离散流、token transition 或马尔可夫链式更新，但不同论文的“rectification”含义并不完全相同，待核对经典来源。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
