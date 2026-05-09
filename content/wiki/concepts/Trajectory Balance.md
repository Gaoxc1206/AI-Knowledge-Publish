---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "分子生成"
background: "included"
---
# Trajectory Balance

## 标准定义

Trajectory Balance（TB，轨迹平衡）是 [[Generative Flow Network|GFlowNet]] 中常用的训练目标之一，用于学习一个满足“终止样本概率与其 [[reward|奖励]] 成正比”的生成模型。其核心约束是：一条从初始状态到终止状态的整条 [[trajectory|轨迹]] 上，前向转移概率、反向转移概率、归一化常数与终止奖励之间应满足平衡关系；训练时通常把该关系写成一个对数形式的误差并最小化。背景知识中，TB 可以理解为把“路径级别的流量守恒”转化为可优化的损失函数。

## 在本知识库中的用法

在给定论文上下文中，Trajectory Balance 没有被单独展开，但它所依托的 [[GFlowNet]] 框架被用于 [[goal-conditioning|goal-conditioned]] [[分子生成]]。就本知识库而言，TB 主要应被理解为这类 [[GFlowNet]] 的通用训练目标/损失背景，而不是本文独立提出的核心方法；具体公式与实现细节待从更多论文中补充。

## 关键点

- TB 是 [[GFlowNet]] 的一种训练准则，目标是让生成分布近似满足 $p(x) \propto R(x)$。
- 它约束的是整条轨迹的前向与反向概率平衡，而不是只看单步转移或局部奖励。
- 与仅做 reward maximization 不同，TB 更强调通过流量守恒来学习多样化高奖励样本。
- 在本库上下文里，TB 可视为支撑 goal-conditioned GFlowNet 的底层优化机制，而 goal / [[focus region]] 则决定奖励如何定义。
- 如果[[focus region|目标区域]]稀疏或可行性未知，TB 往往需要配合 [[replay buffer]] 等技巧稳定训练。

## 别名

- TB
- Trajectory-Balance
- Trajectory Balance Loss
- 轨迹平衡
- 轨迹平衡损失

## 外部背景

- TB 通常写成：沿轨迹的前向概率乘积、归一化常数和终止奖励，与反向概率乘积之间满足平衡关系；待核对经典来源。
- 它属于 GFlowNet 家族中的一种经典[[黑盒 oracle|目标函数]]，常与 [[forward policy]] / [[backward policy]] 一起出现。
- 与 [[Flow Matching]] 相比，TB 更直接地约束轨迹级关系；具体优缺点依赖任务与实现，待核对经典来源。
- 在离散组合生成、[[graph-based molecular generation|分子图生成]]等问题中，TB 常被用来学习多样化的高奖励解集。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
