---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标语言模型对齐"
background: "included"
---
# Noon PPO

## 标准定义

Noon [[PPO]] 通常指一种 [[PPO]] 变体：在优势估计中把负的 [[advantage function|advantage]] 截断为 0，只保留非负优势来驱动策略更新。它仍保留 PPO 的裁剪式策略优化框架，但通过“No Negative”的处理，让更新信号更保守、更稳定。

## 在本知识库中的用法

在该论文中，Noon PPO 是 PAMA 的底层策略优化模块。作者将优势写成 A_t = max(A'_t, 0)，即把负优势直接置零，只让非负优势参与更新；这样做的目的，是为多目标 [[强化学习从人类反馈|RLHF]] 中的优势组合与凸重构提供更稳定的信号，并配合后续的 Pareto 分析与闭式求解。论文中它不是独立主角，而是支撑 PAMA 理论与实验的关键实现细节。

## 关键点

- 它本质上是 [[PPO]] 的一个保守变体：先对 [[advantage function|advantage]] 做非负化，再进行策略更新。
- 方法仍沿用 PPO 的 clipped surrogate objective，因此训练形式与常规 PPO 兼容。
- 在本知识库对应论文里，Noon PPO 被嵌入 [[PAMA]]，用于把多目标[[大语言模型对齐|对齐]]问题转成更易处理的优势层面优化。
- 论文利用这种设计来降低训练波动，并为 [[Pareto stationarity]] 的收敛分析提供条件。
- 从实现上看，核心规则就是只让“有利”的动作更新策略，负优势样本不再反向拉低更新。

## 别名

- No Negative PPO
- NN-PPO
- Noon-PPO

## 外部背景

- 标准 PPO 通常通过裁剪策略比率来限制单步更新幅度，并常与 [[KL 正则化|KL 约束]]或基线值函数一起使用。
- 优势函数用于衡量某个动作相对基线的好坏；将其截断为非负是一种启发式保守更新策略，而不是标准 PPO 的必备组成。
- 待核对经典来源：类似“只保留正优势”的做法在若干强化学习变体中出现过，但 No on/No Negative PPO 这一命名并非通用标准术语。

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
