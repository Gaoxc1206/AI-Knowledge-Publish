---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子生成"
background: "included"
---
# mode collapse

## 标准定义

模式坍塌（mode collapse）是生成模型中的一种退化现象：模型虽然能生成少量高频或高分样本，但对整体数据分布或目标分布的覆盖不足，导致输出缺乏多样性。在 [[生成模型]]、[[GAN]]、[[条件生成]] 等场景中，它常表现为不同输入条件下的结果过度相似，或采样集中到少数模式上。

## 在本知识库中的用法

待从更多论文中补充。当前给定论文未直接使用“mode collapse”这一术语，但它讨论了在[[多目标分子设计]]中，[[preference-conditioning|preference-conditioned GFlowNet]] 容易偏向 [[Pareto front]] 的极端点、覆盖不均匀；作者通过 [[goal-conditioning|goal-conditioned]] [[GFlowNet]]、[[focus region]]、[[replay buffer]] 与 [[hindsight experience replay]] 来提升采样分布的可控性与多样性。这一现象可作为与模式坍塌相关的间接背景。

## 关键点

- 模式坍塌本质上是生成分布的覆盖不足，不一定意味着样本质量差，但通常意味着多样性不足。
- 在本知识库对应论文中，更直接的问题是[[conditional generative model|条件生成模型]]对少数极端 trade-off 区域的过度集中，和模式坍塌现象有相似之处。
- goal-conditioned GFlowNet 通过显式指定[[focus region|目标区域]]，试图让采样在[[目标空间]]中更均匀分布，而不是集中在少数区域。
- [[reward sparsity|稀疏奖励]]和硬约束会增加训练难度，因此论文使用 [[replay buffer]] 和 [[hindsight experience replay]] 来缓解训练不稳定。
- 当模型只追逐少量高奖励区域时，容易出现“看似高分但覆盖很窄”的输出，这通常是模式坍塌的典型信号。

## 别名

- 模式坍塌
- 生成模式塌缩
- mode collapsing

## 外部背景

- 经典 [[Generative Adversarial Network|GAN]] 研究中，mode collapse 是最常见的失败模式之一，生成器可能反复输出少数几类样本，待核对经典来源。
- 在[[controllable generation|条件生成]]模型中，如果条件信号过强、奖励过稀疏或优化目标过于尖锐，也可能诱发条件内的模式坍塌，待核对经典来源。
- 常见缓解思路包括增加多样性奖励、熵正则化、minibatch discrimination、重采样或更好的覆盖型训练目标，待核对经典来源。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
