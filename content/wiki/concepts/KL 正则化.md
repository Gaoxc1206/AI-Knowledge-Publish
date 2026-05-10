---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "强化学习与生成模型优化"
background: "included"
---
# KL 正则化

## 标准定义

KL 正则化（Kullback-Leibler regularization）是指在优化目标中加入 [[KL 散度]] 罚项，用来约束新分布相对参考分布的偏移幅度。常见形式是最大化任务收益，同时最小化与参考策略/参考分布的 KL 距离，例如 $\max_\theta\, \mathbb{E}[r]-\beta\,\mathrm{KL}(\pi_\theta\|\pi_{ref})$。它通常用于稳定训练、限制分布漂移，并在 [[PPO]]、[[RLHF]]、生成模型对齐等场景中作为“软约束”或信赖域近似。

## 在本知识库中的用法

在本知识库的上下文中，KL 正则化主要出现在两类用法中：一是 [[PAMA]] 所对应的 RLHF 策略优化里，用 KL 项约束当前策略不要偏离参考策略，从而保持训练稳定；二是在 [[IMG]] 的分布式多目标[[黑箱优化]]框架里，把[[多目标优化]]写成 KL-regularized distributional optimization，通过 $\mathrm{KL}(q\|p_{base})$ 约束目标分布相对 base distribution 的偏移，并推导出指数倾斜形式的最优分布 $q^*(x)\propto p_{base}(x)e^{-f(x)/\lambda}$。在这里，KL 正则化不只是防止过拟合，更是把“优化目标”转写为“目标分布构造”的关键工具。

## 关键点

- KL 正则化的核心作用是把“尽量优化任务目标”与“不要离参考分布太远”结合起来；常见参考对象包括 [[参考策略]]、base distribution 或预训练模型分布。
- 在 [[RLHF]]/[[PPO]] 中，KL 项通常用于抑制策略崩塌与过度偏移，提升训练稳定性与输出可控性。
- 在本知识库的 [[PAMA]] 中，KL 约束是 RLHF 策略目标的一部分，但论文重点在于把多目标对齐重构为可闭式求解的凸优化问题。
- 在 [[IMG]] 中，KL 正则化直接参与 distributional optimization：通过最小化期望目标值与 KL 罚项，得到指数倾斜分布，并进一步构造多目标混合目标分布。
- 从方法论上看，KL 正则化既可以解释为“保守更新”，也可以解释为“把最优解限制在参考分布附近的概率空间投影”。
- 它常与 [[Pareto front]]、多目标权衡、生成分布重采样等概念一起出现，但具体形式会随任务是策略优化还是分布优化而变化。

## 别名

- KL penalty
- KL regularization
- KL 约束
- KL 惩罚项
- Kullback-Leibler regularization

## 外部背景

- KL 散度定义为 $\mathrm{KL}(q\|p)=\mathbb{E}_{q}[\log q-\log p]$，衡量两个概率分布之间的信息差异；待核对经典来源。
- 在强化学习中，KL 正则常被视为 trust-region 思想的近似实现，用来限制新策略与旧策略的步长；待核对经典来源。
- 在生成建模里，KL 正则常用于变分推断、策略蒸馏和对齐训练中，既可约束输出分布，也可诱导更平滑的解；待核对经典来源。
- KL 罚项有常见方向差异：$\mathrm{KL}(q\|p)$ 与 $\mathrm{KL}(p\|q)$ 的优化行为不同，前者更常用于“从参考分布出发做保守更新”；待核对经典来源。
- 在分布式优化/[[Energy-Based Model|能量模型]]视角下，最小化 $\mathbb{E}[f]+\lambda\mathrm{KL}(q\|p_0)$ 往往对应 Gibbs/指数倾斜形式的最优分布；待核对经典来源。

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
