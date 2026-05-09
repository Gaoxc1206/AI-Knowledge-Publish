---
type: "method"
status: "enriched"
category: "采样方法"
domain: "离散多目标分子优化"
background: "included"
---
# Barker proposal

## 标准定义

Barker proposal 通常指 [[MCMC]] / [[Metropolis-Hastings]] 框架中，基于 Barker 平衡函数构造的局部提案方式。其核心是用满足 g(u)=u g(1/u) 的 [[balancing function]] 对候选状态按目标比值加权，典型形式为 g(u)=u/(1+u)。这类构造常见于 [[locally balanced proposal]]，目的是让提案更贴近目标分布、同时保持可逆性与较好的采样效率。

## 在本知识库中的用法

在 [[AReUReDi]] 中，Barker proposal 指局部平衡提案里对 balancing function 的一种具体选择：将预训练 [[Rectified Discrete Flows]] 给出的 token-level 先验与多目标 reward ratio 结合，对单个位置的 token 替换候选进行加权。论文将其用于离散肽序列和 peptide [[SMILES]] 的多目标引导采样，并声称在该设置下可使 MH 接受步骤简化为 1，从而提升混合速度，帮助样本逐步靠近近似 [[Pareto front]]。

## 关键点

- 它属于 [[locally balanced proposal]] 的一个实例，核心是用候选状态与当前状态的 reward ratio 来构造提案权重。
- 在 AReU[[ReDi]] 中，它与 [[Tchebycheff scalarization]] 和 [[annealed guidance]] 配合，把多个性质目标压缩成一个可采样的 reward。
- 论文把 Barker proposal 用在单个 token 位置的 [[mutation]] 上，而不是整条序列的全局[[Weighted Resampling|重采样]]。
- 它与 [[Rectified Discrete Flows]] 提供的生成先验结合，用于离散生物序列的[[多目标优化]]采样。
- 作者强调该选择有助于简化接受/拒绝处理并改善 mixing，从而更有效地搜索高质量候选。

## 别名

- Barker balancing function
- Barker function
- Barker acceptance rule
- Barker proposal

## 外部背景

- Barker 平衡函数常写为 g(u)=u/(1+u)，是构造局部平衡提案时的经典选择之一。
- 待核对经典来源：Barker (1965) 提出的 Barker 接受规则通常写作 α=r/(1+r)，与 Metropolis 的 min(1,r) 形式相对。
- 在离散状态空间中，局部平衡提案通常用于减少随机游走式搜索的低效率问题。
- 不同文献里 “Barker proposal” 有时特指提案构造，有时与 Barker acceptance rule 混用，需要结合上下文判断。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
