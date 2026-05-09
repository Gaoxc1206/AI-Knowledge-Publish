---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
background: "included"
---
# EGD

## 标准定义

EGD 通常可理解为一种将 [[进化算法]] 与 [[扩散模型]] 结合的优化方法：先通过种群搜索、变异与选择在候选空间中探索，再利用生成模型对候选进行局部精修或再采样，以提升 [[黑箱优化]]，尤其是 [[多目标优化]] 场景中的搜索效率与解的多样性。具体缩写全称与实现细节待从更多论文中补充。

## 在本知识库中的用法

在这篇关于扩散[[Inference-time Multi-target Generation|推理时多目标生成]]的论文中，EGD 被当作[[多目标分子设计|多目标分子生成]]实验里的对比基线之一，用来衡量 [[IMG]] 相对传统“进化搜索 + 扩散精修”范式的优势。论文表 1 报告了 EGD 在 25.6k、51.2k、102.4k objective evaluations 下的 [[Hypervolume]]、[[Pareto front]] 数量与运行时间，并在 204.8k evaluations 的混合设置中给出 EGD+IMG 结果。作者还观察到 EGD 在约 50k objective evaluations 后性能趋于平坦，推测与其把预训练 [[扩散模型]] 作为 frozen refiner、优化上限受限有关。

## 关键点

- EGD 在本知识库中主要作为多目标[[分子生成]]任务的基线方法，而不是本文提出的新方法。
- 它代表一种“[[进化算法]] + [[扩散模型]] 精修”的混合优化范式，用于比较 IMG 的推理时多目标引导能力。
- 论文用 [[Hypervolume]] 和 Pareto front 数量评估 EGD 的[[多目标优化]]效果，并同时统计运行时间。
- 在中等预算下，EGD 的性能会提升，但作者指出其后期容易趋于平坦，说明单纯冻结式精修的上限有限。
- EGD 还能与 IMG 组合成 EGD+IMG，说明该基线可作为更强[[Inference-time Optimization|推理时优化]]框架的组成部分。

## 别名

- EGD

## 外部背景

- 在 [[多目标优化]] 中，常用 [[Pareto front]]、[[Hypervolume]] 等指标衡量解集质量与覆盖度，待核对经典来源。
- 进化式方法通常擅长全局搜索，但在高维离散结构空间里[[sample efficiency|样本效率]]可能较低，待核对经典来源。
- 将生成模型作为优化器的“精修器”或“候选重打分器”是扩散辅助优化中的常见思路，待核对经典来源。
- EGD 的具体英文全称在不同论文中可能存在歧义，待核对经典来源。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
