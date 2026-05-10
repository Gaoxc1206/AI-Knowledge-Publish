---
type: "method"
status: "enriched"
category: "其他"
domain: "多目标分子生成与多目标黑箱优化"
background: "included"
---
# Preference Vector Generation

## 标准定义

Preference Vector Generation（偏好向量生成）通常指为[[多目标优化]]中的每个样本构造一个偏好向量，用来表达对各目标的相对重视程度或 trade-off 取向。它常与[[多目标优化]]、[[Pareto front]]和目标加权策略一起使用：不同偏好向量对应不同的目标侧重，从而在一次求解或多次采样中覆盖更多[[Pareto 最优|非支配解]]区域。对于生成模型场景，偏好向量也可作为控制信号，指导模型朝特定目标组合生成样本。

## 在本知识库中的用法

在这篇论文的 [[Inference-time Multi-target Generation|IMG]] 框架中，Preference Vector Generation 指的是：在[[扩散模型]]推理阶段，为 batch 中不同样本分配不同的偏好向量，使单次 diffusion pass 能同时探索多个目标权衡区域，并配合[[weighted resampling]]把生成分布推向多目标目标分布。论文明确强调这是 inference-time 机制，不需要微调扩散模型；但偏好向量的具体生成细节在给定上下文中并不完整，待从更多论文中补充。

## 关键点

- 它的作用不是重新训练模型，而是在推理时为不同样本指定不同的目标侧重，以覆盖更多 [[Pareto front]] 区域。
- 在 IMG 中，偏好向量与 reverse diffusion 中的候选重采样结合，用于一次生成多个 trade-off 不同的分子候选。
- 论文只给出了“按 batch 分配不同 preference vector”的用法，具体如何构造、采样或调度这些向量，待从更多论文中补充。
- 从方法定位看，它是连接[[多目标黑箱优化]]和扩散生成过程的控制接口，而不是独立的优化器。
- 消融结果表明，扩大 batch size 会提升 hypervolume，说明同时使用更多偏好向量有助于更充分地探索多[[目标空间]]。

## 别名

- 偏好向量生成
- Preference Vector
- Preference Conditioning
- 偏好控制向量

## 外部背景

- 在多目标优化中，偏好向量通常对应权重向量、参考点或效用参数，用于指定不同目标之间的相对偏好；待核对经典来源。
- 在基于偏好条件的生成模型里，偏好向量常作为条件输入，控制生成样本在多个属性上的取值方向；待核对经典来源。
- 偏好向量不一定必须是显式权重，也可以是通过离散分组、连续采样或温度参数隐式编码的 trade-off 指令；待核对经典来源。
- 在分布式多目标优化中，为不同样本分配不同偏好向量，是一种并行探索多个解区域的常见思路；待核对经典来源。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
