---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子生成、扩散推理时优化"
background: "included"
---
# Greedy Sampling Without Replacement

## 标准定义

Greedy sampling without replacement（无放回贪心采样）是一种从候选集合中逐个选择样本的方法：每次按当前评分最高/最优原则选出一个候选，并将其从候选池移除，继续对剩余候选重复，直到达到所需数量。它常用于[[重采样]]、子集选择和多样化解集构造，可避免重复抽到同一候选并提高覆盖度。

## 在本知识库中的用法

在这篇 [[Inference-time Multi-target Generation|IMG]] 论文的[[Inference-time Multi-target Generation|推理时多目标生成]]框架里，该策略用于[[反向扩散]]过程中从多个候选分子中进行选择：模型先按预训练扩散转移分布生成一批候选，再依据多目标权重/[[偏好向量]]进行打分，并以无放回的贪心方式逐个挑选进入保留集合。这样做的目的，是在一次推理中同时覆盖不同 trade-off 区域，减少重复候选，并提升[[Pareto front]]覆盖。具体实现细节待从更多论文中补充。

## 关键点

- 核心特征是“选一个、删一个”，与有放回采样相比更强调去重和多样性。
- 常作为[[重采样]]或候选筛选步骤出现，适合需要有限预算内构造代表性解集的场景。
- 在 IMG 中，它服务于多目标[[分子生成]]：结合目标权重，把[[扩散模型]]的候选分布推向更优的[[Pareto front]]区域。
- 它不是训练方法，而是推理阶段的选择规则，可与预训练[[扩散模型]]直接结合。
- 当候选池较大、偏好向量较多时，无放回机制有助于提升覆盖不同目标权衡的机会。

## 别名

- 无放回贪心采样
- greedy without replacement
- greedy sampling w/o replacement
- without-replacement greedy sampling

## 外部背景

- 无放回采样是概率论与蒙特卡洛中的基础操作；贪心版本通常是按当前局部最优规则顺序抽取。
- 在组合优化中，greedy selection without replacement 常用于子集选择、排序、Top-k 近似和多样化搜索。
- 待核对经典来源

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
