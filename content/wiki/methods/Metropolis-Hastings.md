---
type: "method"
status: "enriched"
category: "优化方法"
domain: "离散多目标序列生成"
---
# Metropolis-Hastings

## 定义

Metropolis-Hastings 在该论文中用于对局部提案进行接受/拒绝更新，从而保持目标分布的不变性。它与 [[locally balanced proposals]] 结合，把多目标奖励引导下的候选序列筛选到更高质量的区域。论文指出，在 guidance strength 趋于无穷时，该过程会集中到 Pareto-optimal states。若要了解更一般的理论细节，待从更多论文中补充。

## 关键点

- 用于对单个 token 替换后的 proposal 做接受/拒绝更新。
- 目标分布写为 p_1(x) exp(eta_t S_omega(x))，以基础生成先验和多目标 reward 共同定义。
- 接受概率由目标分布与 proposal 分布共同决定，用于保持分布不变性。
- 与 [[locally balanced proposals|locally balanced proposal]] 配合时，可通过 balancing function 构造更合适的候选分布。
- 论文提到使用 Barker’s balancing function 时，接受概率可简化为 1，从而自动接受 proposal。
- 在 [[annealed guidance]] 下，MH 更新帮助采样从探索逐步过渡到聚焦高质量 Pareto 候选。

## 别名

- MH
- Metropolis-Hastings algorithm
- Metropolis-Hastings update
- MH 更新

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
