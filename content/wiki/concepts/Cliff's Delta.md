---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化实验评估"
background: "included"
---
# Cliff's Delta

## 标准定义

Cliff's Delta（δ）是一种非参数[[效应量]]，用于衡量两组独立样本的分布差异。它可理解为“随机从两组中各取一个样本时，前者大于后者的概率减去前者小于后者的概率”，取值通常在 -1 到 1 之间：0 表示两组没有系统性大小差异，绝对值越大表示差异越强。它不依赖正态分布假设，适合比较小样本或非正态数据。

## 在本知识库中的用法

在该论文中，Cliff's Delta 被用作比较 [[Expected Hypervolume Improvement|EHVI]] 与[[固定权重标量化]] EI 的效应量指标，分别针对 [[超体积指标]] 和 [[R2 indicator]] 的最终结果进行汇总。论文用它来补充 [[Cohen's d]]，说明两种方法差异的方向与幅度：对于 hypervolume，正的 Cliff's Delta 表示 EHVI 更占优；对于 R2，负的 Cliff's Delta 表示 EHVI 更优，因为 R2 越低越好。它主要服务于三个 GUACAMOL [[多目标分子优化]]任务下的受控对比分析。

## 关键点

- Cliff's Delta 是一种用于两组结果比较的[[效应量]]，比单纯看均值更能反映差异方向与强度。
- 它的取值范围通常为 -1 到 1；绝对值越大，表示两组分布差异越明显。
- 在这篇[[分子设计]]论文中，它用于比较 EHVI 与固定[[Expected Improvement|标量化 EI]] 在 [[超体积指标]] 和 [[R2 indicator]] 上的表现。
- 对 hypervolume 而言，正值通常意味着 EHVI 更好；对 R2 而言，负值通常意味着 EHVI 更好，因为该指标越低越优。
- 它与 Cohen's d 一起出现，属于对低随机种子设置下方法差异的补充性统计摘要。

## 别名

- Cliff delta
- Cliff's d
- δ
- Cliff效应量

## 外部背景

- 常用于非参数统计比较，尤其适合分布形态未知、样本量较小或存在离群值的场景。
- 可视为“随机优越概率”差值的度量，和概率优势/胜率类解释有较强直观对应关系。
- 待核对经典来源：它常与 Mann–Whitney U 检验、AUC 类解释一起讨论。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
