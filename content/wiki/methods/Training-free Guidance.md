---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标黑箱优化、扩散模型推理时生成"
---
# Training-free Guidance

## 定义

Training-free Guidance 指在不重新训练[[扩散模型]]、也不训练可微 surrogate model 的前提下，在推理阶段直接用黑盒目标对生成过程进行引导的方法。根据给定上下文，它通过在扩散反向生成每一步对候选样本进行多目标评估，并按[[Weighted Resampling|加权重采样]]把预训练模型的生成分布推向目标多目标分布。该思路用于生成覆盖 [[Pareto front]] 的多目标候选解，特别适合[[分子生成]]等黑盒[[多目标优化]]任务。

## 关键点

- 核心特点是 training-free：不需要重新训练或微调扩散模型。
- 在扩散模型反向推理过程中，对多个候选样本进行黑盒目标评估后再[[Weighted Resampling|重采样]]。
- 通过多目标期望值构造的权重函数，将 base distribution 推向多目标 Boltzmann 目标分布。
- 可在单次推理中生成一组不同 trade-off 的候选样本，用于近似 Pareto front。
- 上下文中该思路以 [[IMG]]（[[Inference-time Multi-target Generation]]）形式实现，并可与其他方法结合。
- 证据主要来自[[多目标分子设计|多目标分子生成]]场景；其他任务泛化细节待从更多论文中补充。

## 别名

- Inference-time Guidance
- IMG
- Inference-time Multi-target Generation
- 推理时引导
- 训练自由引导

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
