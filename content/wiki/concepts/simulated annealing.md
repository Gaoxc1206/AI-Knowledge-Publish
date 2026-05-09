---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "离散生物序列多目标优化"
background: "included"
---
# simulated annealing

## 标准定义

模拟退火（Simulated Annealing, SA）是一类随机优化方法，模仿物理退火过程：以“温度”参数控制搜索随机性，初期允许较差解以增强探索，随后逐步降低温度，使搜索更集中于高质量解。它常与 [[Metropolis-Hastings]] 式的概率接受机制相关联，也常被视为一种从探索到收敛的退火式搜索策略。

## 在本知识库中的用法

在这篇论文里，“annealed”主要体现为对多目标 guidance strength \(\eta_t\) 的逐步增大：早期更强调探索，后期更强调朝高质量候选收缩。它不是经典意义上单独运行的模拟退火算法，而是嵌入在[[离散流模型|离散流]]采样更新中的退火式调度，用来配合 [[Tchebycheff scalarization]]、局部平衡 proposal 和 [[Metropolis-Hastings]] 更新，把采样逐步推向近似 [[Pareto front]] 的区域。

## 关键点

- 标准定义上，模拟退火是一种“高温探索、低温收敛”的随机优化框架，核心是温度调度与概率接受规则。
- 在本知识库的语境中，它更接近一种 annealing schedule：通过逐步增大引导强度，让离散生成从多样探索转向 Pareto 高质量样本聚焦。
- 论文中的退火变量是 \(\eta_t\)，其作用类似温度的反向控制量：\(\eta_t\) 越大，目标偏好越强，搜索越收缩。
- 该退火机制与 [[Metropolis-Hastings]] 更新共同工作：前者调节搜索阶段性，后者负责接受/拒绝并维持目标分布性质。
- 它服务于多目标分子/肽序列生成，而不是传统的纯组合优化；重点是平衡多个冲突性质，而非只优化单一标量目标。

## 别名

- SA
- 模拟退火
- 退火搜索
- annealing

## 外部背景

- 模拟退火的经典教材定义通常包含温度下降、邻域扰动、以及以概率接受劣解的机制；待核对经典来源。
- 与[[Markov chain Monte Carlo|马尔可夫链蒙特卡洛]]（[[MCMC]]）存在方法论上的联系，尤其是当接受概率采用 [[Metropolis-Hastings]] 形式时；待核对经典来源。
- 常见变体包括快速退火、并行退火、量子退火和自适应退火；待核对经典来源。
- 在机器学习中，annealing 也常被用作泛化概念，指任何“先探索后收敛”的参数调度，不一定严格等同于经典 SA；待核对经典来源。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
