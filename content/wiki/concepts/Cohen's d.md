---
type: "concept"
status: "enriched"
category: "统计指标"
domain: "多目标分子优化"
background: "included"
---
# Cohen's d

## 标准定义

Cohen's d 是一种常用的效应量（effect size）指标，用于衡量两组样本均值差异的标准化幅度。最常见的定义是两组均值之差除以合并标准差，因此它描述的是“差异有多大”，而不仅是“是否显著”。d 的绝对值越大，表示两组差异越强；正负号则取决于比较顺序。在经验解释上，常把约 0.2、0.5、0.8 视为小、中、大效应，但这只是粗略经验规则，需结合具体领域判断。

## 在本知识库中的用法

在这篇[[分子设计]]论文中，Cohen's d 被用来量化 [[Expected Hypervolume Improvement|EHVI]] 与[[固定权重标量化]] EI 在多个随机种子下的结果差异，作为对均值与标准差之外的补充分析。论文分别对 hypervolume 和 [[R2 indicator]] 计算 Cohen's d：在 hypervolume 上，Fexofenadine 和 Amlodipine 的 d 为正，表示 EHVI 整体优于固定[[Expected Improvement|标量化 EI]]；Perindopril 的 d 接近 0，表示两者最终 hypervolume 差异很小。在 R2 上，d 为负且幅度较大，表示 EHVI 的 R2 更低、[[Pareto front]] 近似更好。该指标在这里主要用于表达“优势有多大”和“方向如何”，而不是单独作为模型选择标准。

## 关键点

- Cohen's d 是标准化均值差，适合比较两组实验结果的差异幅度。
- 它在本知识库里主要用于比较 EHVI 与固定[[标量化]] EI 的优化表现，而不是作为优化目标本身。
- 在 hypervolume 任务中，d > 0 表示 EHVI 更好；在 R2 任务中，因为 R2 越低越好，d < 0 反而表示 EHVI 更好。
- 它补充了均值±标准差的信息，能更直观地反映效应大小，尤其适合随机种子较少的实验。
- 论文同时报告了 [[Cliff's Delta]]，说明作者希望从参数型和非参数型两个角度描述方法差异。

## 别名

- Cohen d
- 标准化均值差
- 标准化效应量
- effect size d

## 外部背景

- Cohen's d 通常用于独立样本均值比较，也有配对样本等变体，具体公式会随实验设计略有不同。
- 它依赖标准差尺度，因此适合近似连续型指标；对极端偏态分布或离群值较多的数据需谨慎解释。
- 经验阈值 0.2/0.5/0.8 常被引用为小/中/大效应，但应视领域和任务背景而定。
- 待核对经典来源
- 在机器学习与生物统计里，Cohen's d 常被用来补充 p 值，强调实际意义而非仅统计显著性。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
