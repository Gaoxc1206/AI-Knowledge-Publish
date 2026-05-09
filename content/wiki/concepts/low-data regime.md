---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子优化与贝叶斯优化"
background: "included"
---
# low-data regime

## 标准定义

low-data regime 指可用于训练、调参或迭代优化的数据量/实验预算相对任务复杂度明显不足的场景。在这种场景下，模型往往更依赖先验、[[代理模型]] 的不确定性估计以及高效的 [[采集函数]] 设计；例如在 [[贝叶斯优化]] 中，少量[[oracle budget|评估预算]]会显著影响搜索效率、收敛速度与最终解的质量。该术语通常强调“预算稀缺”而不是“数据绝对很少”，具体阈值取决于任务与领域。

## 在本知识库中的用法

在这篇[[分子设计]]论文里，low-data regime 主要指[[多目标贝叶斯优化]]的低预算实验设置：总共只有 200 轮优化，每轮从 10,000 个候选分子中选择 1 个进行评估，并且只重复 3 个随机种子。作者用这个受限预算来检验在数据/评估都很稀缺时，[[Expected Hypervolume Improvement|EHVI]] 这类 Pareto-aware 方法是否比[[固定权重标量化]] EI 更有效。

## 关键点

- low-data regime 的核心不是“没有数据”，而是数据或实验预算不足以支撑大规模试错，因此算法必须更依赖 [[不确定性]] 与[[sample efficiency|样本效率]]。
- 在低数据场景下，[[贝叶斯优化]]、主动学习和少样本方法通常比纯数据驱动的搜索更有优势。
- 本文中的 low-data regime 体现为固定且有限的 BO 预算，因此不同 [[采集函数]] 的效率差异会被放大。
- 低预算下，方法不仅要追求单次最优值，还要关注搜索稳定性、[[Pareto front]] 覆盖和[[chemical diversity|结构多样性]]。
- 该概念在本库中更像实验设置/问题条件，而不是单一算法或指标。

## 别名

- low data regime
- low-data setting
- data-scarce regime
- small-data regime
- 低数据场景

## 外部背景

- 低数据场景常见于昂贵实验、模拟代价高或标注困难的任务中，此时每一次评估都需要尽量“物尽其用”。
- 在机器学习里，low-data regime 与 few-shot、small-data、data-scarce setting 有部分重叠，但侧重点略有不同：前者更强调预算约束，后者更强调样本规模。
- 在优化问题中，低数据 regime 往往要求更好的探索-利用平衡；这也是 [[采集函数]] 设计成为关键的原因。
- 待核对经典来源

## 相关论文

- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
