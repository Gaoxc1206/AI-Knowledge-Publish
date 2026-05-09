---
type: "method"
status: "enriched"
category: "采样方法"
domain: "离散生物序列多目标优化"
---
# MCMC

## 定义

在该论文中，MCMC主要指基于 [[Metropolis-Hastings]] 的马尔可夫链更新过程，用来在离散序列空间中逐步采样和修正候选序列。它结合局部平衡 proposal 与多目标 scalarized reward，把 [[ReDi]] 生成的先验样本引导到更高质量、接近 [[Pareto front]] 的区域。论文还指出，在使用 [[Barker proposal|Barker balancing function]] 时，接受概率可简化为 1，从而加快 mixing。

## 关键点

- 在离散 token 空间中进行采样，目标分布定义为 p1(x) 与多目标 reward 的乘积形式。
- 每次只更新一个 token 位置，并用 [[locally balanced proposals|locally balanced proposal]] 结合 ReDi 的转移概率与 reward ratio。
- Metropolis-Hastings 接受/拒绝步骤用于保持目标分布不变性。
- 使用 [[annealed guidance]] strength 让采样先探索、后聚焦高质量候选。
- 理论上，guidance strength 增大时，采样会更集中到 Pareto-optimal states。

## 别名

- 马尔可夫链蒙特卡洛
- Metropolis-Hastings
- MH
- MCMC
- 马尔可夫链采样

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
