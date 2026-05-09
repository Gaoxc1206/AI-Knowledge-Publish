---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "多目标分子设计"
background: "included"
---
# conditional generative model

## 标准定义

[[controllable generation|条件生成]]模型（conditional generative model）是指学习条件分布 p(x|c) 的生成模型，其中 x 是要生成的样本，c 是条件信息。条件可以来自类别标签、属性向量、文本、目标约束或其他上下文信号。与无条件生成相比，条件生成模型的目标是让输出不仅“像真实数据”，还要满足给定条件；常见形式包括条件 [[变分自编码器|VAE]]、条件 [[Generative Adversarial Network|GAN]]、[[Conditional Diffusion Model|条件扩散模型]]以及条件自回归模型等。

## 在本知识库中的用法

在该论文语境中，conditional generative model 主要指用于[[多目标分子设计]]的 [[goal-conditioning|goal-conditioned]] [[GFlowNet]]：模型不再只接受 [[Preference Vector|preference vector]]，而是显式接收目标方向或目标区域（[[focus region]]）作为条件，生成落入指定 [[Pareto front]] 区域的分子。这里的“条件”更接近目标区域约束而非软偏好，因此强调可控地在不同 trade-off 区域采样。论文还结合了 [[replay buffer]]、[[hindsight experience replay]] 和 [[Tab-GS]] 来缓解 hard constraint 下的稀疏奖励与不可行目标采样问题。

## 关键点

- 标准上，条件生成模型学习的是 [[p(x|c)]]；在本知识库中，条件 c 被具体化为目标方向/目标区域，用来控制分子落点而不是仅仅调整偏好权重。
- 论文将其与传统 preference-conditioning 对比：前者是软偏好，后者是显式目标约束，更适合在复杂的 [[Pareto front]] 上均匀覆盖不同折中解。
- 在实现上，这类模型可以与 [[GFlowNet]] 结合，使生成概率与奖励/目标区域匹配，从而既保留多样性，又提升可控性。
- 本文中的条件生成不是“生成任意高分子”，而是“生成属于指定 focus region 的高质量分子”；这是一种面向多目标优化的条件化生成。
- 由于 hard constraint 会带来稀疏奖励，论文用 [[hindsight experience replay]] 和可学习的 goal distribution 来提高训练稳定性与采样效率。

## 别名

- 条件生成模型
- 条件式生成模型
- conditional generation model
- conditional generative model
- 受控生成模型

## 外部背景

- 条件生成模型的经典思想是：在同一个生成器中加入控制变量，使模型能够按类、属性或语义提示生成不同样本；待核对经典来源。
- 常见变体包括 conditional VAE、conditional GAN、conditional diffusion 和 conditional autoregressive model，它们都可视为对 p(x|c) 的不同参数化；待核对经典来源。
- 在优化与设计任务中，条件信息常被用来表示目标向量、属性阈值或约束集合，从而把“生成”变成“受控生成”；待核对经典来源。
- 在多目标问题里，条件化可以采用 preference vector，也可以采用目标区域/任务标签；后者通常比单纯加权和更适合表达可行域和局部 trade-off；待核对经典来源。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
