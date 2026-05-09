---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "离散生物序列生成、多目标分子优化"
background: "included"
---
# Rectified Flow

## 标准定义

Rectified Flow 是一种生成建模框架，核心是学习从简单基分布到数据分布的连续时间速度场（vector field / velocity field），再通过 ODE 形式生成样本。它与 [[Flow Matching]]、[[Diffusion Model]] 有密切关系，但更强调把生成轨迹“拉直”成更简单的路径，从而降低采样难度、提高推断效率。

## 在本知识库中的用法

在这篇论文对应的知识库语境里，Rectified Flow 主要体现为离散版本 [[Rectified Discrete Flows]]（[[ReDi]]）这一预训练生成先验：它为 token 级别的替换提供转移概率，帮助在离散序列空间中进行生成。[[AReUReDi]] 在此基础上叠加多目标引导、[[Tchebycheff scalarization]]、[[locally balanced proposals|locally balanced proposal]] 和 [[Metropolis-Hastings]] 更新，把采样推进到更接近 [[Pareto front]] 的区域。

## 关键点

- 标准上，Rectified Flow 是一种用连续动力系统描述生成过程的方法，目标是从简单噪声分布到目标数据分布构造更直接的生成轨迹。
- 在本知识库的用法中，它更多对应离散化后的 [[Rectified Discrete Flows]]，作为离散 token 序列生成的基础模型。
- 论文将其用作 AReUReDi 的先验：每次只修改一个位置，并用 ReDi 给出的 token transition probability 作为 proposal 基础。
- Rectification 的作用之一是缓解[[离散流模型|离散流]]建模中的 [[factorization error]]，并在经验上改善序列生成质量。
- 它本身不直接解决[[多目标优化]]，但可以与多目标 reward、[[Pareto front]] 及 [[MCMC]] 接口结合，形成可控采样框架。

## 别名

- RF
- Rectified Flow Matching
- Rectified Discrete Flow
- ReDi
- 直线流

## 外部背景

- 常与 [[Flow Matching]] 并列讨论：二者都把生成学习表述为轨迹/速度场拟合问题，而不是逐步去噪式的显式反演；待核对经典来源。
- 在连续空间里，Rectified Flow 通常通过数值求解 ODE 进行采样，生成轨迹往往比传统[[扩散模型]]更直接；待核对经典来源。
- 有“reflow / rectification”式迭代变体，用于进一步拉直轨迹并减少采样误差；待核对经典来源。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
