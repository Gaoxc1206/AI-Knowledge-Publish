---
type: "method"
status: "enriched"
category: "优化方法"
domain: "GFlowNets 训练"
background: "included"
---
# Trajectory Balance

## 标准定义

Trajectory Balance（TB，轨迹平衡）是 [[GFlowNet]] 中一种训练目标，要求模型对任意完整轨迹的前向概率、后向概率与终止奖励之间满足整体一致的平衡关系。直观上，它不是只约束局部一步转移，而是把整条生成轨迹的“流量”与最终样本的奖励联系起来，从而学习一个能够按奖励分布生成对象的策略。TB 常被视为比局部平衡类目标更稳定的全轨迹学习方法，适用于离线或在线采样的生成式优化问题。

## 在本知识库中的用法

待从更多论文中补充。当前给定论文上下文明确说明方法建立在 [[GFlowNet]] 框架上，并使用 goal-conditioned / preference-conditioned 的多目标[[分子生成]]、[[replay buffer]]、[[hindsight experience replay]]、以及 [[Tabular Goal Sampler|Tab-GS]] 等机制；但上下文未明确提到是否采用 Trajectory Balance 作为训练目标，因此无法仅据此确定其在本知识库中的具体用法。

## 关键点

- TB 是 [[GFlowNet]] 的一种全轨迹训练目标，核心是让整条生成轨迹的概率流与终止奖励保持平衡。
- 与只约束局部转移的目标相比，TB 更直接地把“生成路径”与“最终质量”联系起来。
- 在多目标生成里，TB 可与[[可控生成|条件生成]]结合，但具体条件形式取决于任务设计；本上下文中的具体训练目标未明确说明。
- 若用于分子生成，TB 通常配合图生成状态空间与奖励建模，学习按目标分布采样候选分子。
- 当前论文上下文更强调 goal-conditioning 与目标区域采样策略，而非明确阐述 TB 本身。

## 别名

- TB
- Trajectory Balance loss
- 轨迹平衡

## 外部背景

- TB 常见于 [[GFlowNet]] 经典训练目标体系中，待核对经典来源。
- 与 [[detailed balance]] 相比，TB 是对整条轨迹施加约束的目标形式。
- TB 通常会引入前向策略、后向策略以及终止流/奖励项来构造损失。
- 在一些实现中，TB 被认为有利于缓解稀疏奖励下的训练不稳定问题，待核对经典来源。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
