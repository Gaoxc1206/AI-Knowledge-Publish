---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标蛋白质序列生成"
background: "included"
---
# Product of Experts

## 标准定义

Product of Experts（PoE，专家乘积）是一种将多个“专家”分布组合成单个分布的方法：把各专家的输出相乘后再归一化。若每个专家表示一个约束或偏好，则联合分布会倾向于同时满足所有专家。对 [[Energy-Based Model]] 而言，多个专家的乘积通常等价于能量之和，因此常被用来做条件组合、约束融合或多属性生成。它的直观含义是“只保留各专家都认可的样本区域”，而不是像 mixture of experts 那样做加权混合。

## 在本知识库中的用法

在这篇论文的上下文里，Product of Experts 主要作为 [[compositional EBM]] 的基础组合规则：每个性质对应一个[[Energy-Based Model|能量模型]]，多个性质的联合约束可写成专家乘积，从而得到合取式的联合分布。论文将其作为 [[compositional EBM]] / [[cEBM]] 的对照背景，并进一步提出 [[pcEBM]]：不只是简单把多个能量相加，而是结合 [[Multiple Gradient Descent]] 在采样时动态寻找更接近 [[Pareto optimality]] 的更新方向。换言之，本知识库中的 PoE 主要用于说明“多个性质模型如何组合成一个联合生成器”，尤其服务于抗体序列的多目标采样与优化。

## 关键点

- PoE 的核心是把多个专家分布相乘，强调各专家共同支持的区域；在能量形式下通常对应多个能量函数相加。
- 在本论文相关语境中，PoE 是多性质约束组合的基础：如 Ab-like、[[binding affinity|Aff]]、[[BV score]] 等属性模型可以被视为不同专家。
- 与单纯[[线性标量化|线性加权]]不同，PoE 更像“联合筛选”，适合表达多个条件同时成立的生成偏好。
- PoE 本身不解决多目标冲突的权衡问题；论文因此引入 [[Multiple Gradient Descent]] 来寻找更接近 [[Pareto optimality]] 的更新方向。
- 在 [[Energy-Based Model]] 框架下，PoE 常与 [[Langevin Dynamics]] 搭配，用于从联合能量分布中采样。

## 别名

- PoE
- 专家乘积
- Product-of-Experts

## 外部背景

- 待核对经典来源：PoE 常被认为是 Hinton 等人提出/系统化的一类模型思想，用于将多个概率模型组合成更尖锐的联合分布。
- 在概率建模中，PoE 往往比 mixture of experts 更“保守”：它要求样本同时通过多个专家的约束，而不是由某一个专家主导。
- 在 [[Energy-Based Model|EBM]] 中，若每个专家给出能量 E_i(x)，则联合分布常写成 p(x) ∝ exp(-∑_i E_i(x))，这与 PoE 的乘积形式一致。
- PoE 也常用于多模态融合、[[controllable generation|条件生成]]和约束满足问题；具体经典应用脉络待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
