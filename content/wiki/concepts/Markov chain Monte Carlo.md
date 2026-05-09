---
type: "concept"
status: "enriched"
category: "采样方法"
domain: "蛋白质序列生成与多目标优化"
background: "included"
---
# Markov chain Monte Carlo

## 标准定义

[[MCMC|马尔可夫链蒙特卡洛]]（[[MCMC]]）是一类通过构造满足目标分布不变性的[[Markov chain]]，并借助随机提议与接受/拒绝步骤来近似从复杂分布采样的方法。其典型形式包括 [[Metropolis-Hastings]] 与 [[Gibbs sampling]]；在高维或离散空间中，MCMC 常用于从难以直接归一化的概率分布、后验分布或[[Energy-Based Model|能量模型]]中生成样本。

## 在本知识库中的用法

在本知识库的两篇论文中，MCMC 主要作为“带性质引导的序列采样”框架使用：一篇把 [[Energy-Based Model]] 的采样过程与 [[Langevin dynamics]] 结合，并用 [[Multiple Gradient Descent]] 近似寻找多目标的 Pareto 改进方向；另一篇则在离散序列空间中显式采用 [[Metropolis-Hastings]] 更新与局部平衡 proposal，从而把多目标打分转成可采样的目标分布，逐步逼近 Pareto 优良区域。

## 关键点

- MCMC 的核心是构造一个以目标分布为不变分布的 [[Markov chain]]，从而用随机游走近似复杂分布采样。
- 在 [[pcEBM]] 中，采样过程可理解为带噪声的连续 MCMC：更新方向由多目标梯度的 Pareto 改进方向决定，噪声用于探索更宽的 [[Pareto front]]。
- 在 [[AReUReDi]] 中，MCMC 以离散 [[Metropolis-Hastings]] 形式出现，负责在 token 级别的替换提议与接受/拒绝之间维持目标分布。
- 两篇工作都把 MCMC 用于“优化即采样”：不是只找单个最优解，而是从偏向高质量性质组合的分布中抽样。
- 对于多目标[[生物序列设计]]，MCMC 的优势是能自然结合先验生成模型、性质打分器与随机探索。

## 别名

- MCMC
- 马尔可夫链蒙特卡洛
- Markov Chain Monte Carlo

## 外部背景

- MCMC 通常依赖“提议分布 + 接受概率”来纠正提议偏差，使链收敛到目标分布。
- [[Metropolis-Hastings]] 是最经典的通用 MCMC 框架之一；[[Gibbs sampling]] 则适合条件分布易于采样的情形。
- 在能量模型里，MCMC 常用于从 $p(x)\propto e^{-E(x)}$ 中采样，[[Langevin dynamics]] 可视为连续空间中的近似 MCMC。
- 在[[多目标优化]]场景中，MCMC 可以通过重加权或分段指导分布，生成一组而非单个解；更严格的理论细节待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
