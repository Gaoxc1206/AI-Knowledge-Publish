---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "离散生成模型与多目标序列设计"
background: "included"
---
# CTMC

## 标准定义

CTMC（[[连续时间马尔可夫链|continuous-time Markov chain]]，[[连续时间马尔可夫链]]）是指状态随连续时间演化、且未来仅依赖当前状态的随机过程。它通常由状态空间、初始分布和时间相关的转移速率（transition rate）或生成元（generator）来刻画；边际分布可由 [[Kolmogorov forward equation]] 描述。与离散时间 [[Markov chain]] 相比，CTMC 通过速率而不是固定步长转移来建模状态跳变，常用于需要显式刻画“何时发生跳转”的过程。

## 在本知识库中的用法

在这篇论文中，CTMC 是 [[Discrete Flow Matching]] 的基础生成框架：离散序列被看作在连续时间上演化的随机状态，模型学习时间相关的 token 转移速率，并通过 [[Euler sampling|Euler 采样]]实现逐步生成。[[MOG-DFM]] 在此 CTMC 上对转移速率进行多目标引导重加权，并结合自适应 [[Adaptive hypercone|hypercone filtering]]，推动序列朝多个目标的 [[Pareto front]] 区域采样。

## 关键点

- 标准上，CTMC 用连续时间的转移速率而非固定步数来描述状态变化；在序列生成中可自然对应 token-level 跳转。
- 本库中，CTMC 主要作为[[Discrete Flow Matching|离散流匹配]]生成器的底层动力学，用来表达序列从噪声分布到数据分布的连续时间传输。
- 论文中的多目标引导并不是直接改写最终序列，而是改写 CTMC 的局部转移速率，再用 Euler 采样推进生成。
- CTMC 的 outgoing rate 与 self-transition 概念在该方法里很关键，因为它决定了每一步是否跳转以及跳向哪个候选 token。
- 与连续松弛方法相比，基于 CTMC 的离散建模更贴近真实的氨基酸或 DNA token 空间，减少了嵌入扭曲的风险。

## 别名

- 连续时间马尔可夫链
- 连续时间马尔可夫过程
- continuous-time Markov chain
- CTMC

## 外部背景

- CTMC 是随机过程与排队论中的经典模型，常由生成元矩阵或速率函数定义；其概率演化由前向方程或后向方程刻画。
- 在化学反应网络、[[分子动力学模拟|分子动力学]]近似、[[MCMC]] 以及生物序列生成中，CTMC 都常被用来表示离散状态随时间的随机跃迁。
- 离散时间马尔可夫链与 CTMC 的核心区别在于：前者按固定步数更新，后者按连续时间下的跳变速率更新。
- 待核对经典来源

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
