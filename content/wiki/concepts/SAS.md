---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "分子性质预测与优化"
background: "included"
---
# SAS

## 标准定义

SAS 通常指 [[SA score|synthetic accessibility score]]，中文常译为“[[SA|合成可及性]]分数”或“[[Synthesizability|可合成性]]评分”，用于估计一个分子在现实化学合成中的难易程度。一般来说，SAS 越低表示越容易合成，越高表示越难合成。它通常由分子片段统计、结构复杂度、环系与立体特征等启发式因素综合得到，常见于 [[分子生成]]、[[分子优化]] 和 [[多目标优化]] 任务中，作为与活性、[[类药性]]并列的约束或评价维度。

## 在本知识库中的用法

在这篇论文的语境里，SAS 是作者用 rdkit 计算并写入训练语料的分子性质之一，和 [[QED]]、[[MW]]、[[TPSA]]、[[CLogP]] 等一起作为结构化标签出现在 JSONL 模板中。其作用是让[[化学语言模型]]在学习 [[SMILES]] 的同时，也学习分子可合成性这一性质，从而支持[[性质预测]]、[[controllable generation|条件生成]]和黑盒[[分子优化]]。论文并未把 SAS 作为唯一优化目标，而是把它作为多种可学习性质中的一个背景属性来使用。

## 关键点

- SAS 是衡量分子“好不好合成”的启发式分数，属于常见的分子可合成性指标。
- 标准含义中通常是“分数越低越容易合成”，适合与 [[QED]]、活性分数等一起做多目标权衡。
- 在本论文中，SAS 被 rdkit 计算后作为训练标签之一，融入大规模 [[PubChem]] 分子语料。
- 作者将 SAS 放入带标签的文本模板中，使模型可从 [[SMILES]] 预测性质，也可在条件生成时显式利用该性质。
- SAS 在这里更多是辅助性质特征，而不是论文主优化目标。
- 若需要更严格的公式或实现细节，待从更多论文中补充。

## 别名

- synthetic accessibility score
- synthetic accessibility
- 合成可及性分数
- 可合成性评分
- SA score

## 外部背景

- SAS 常见实现是 RDKit 的 [[synthetic accessibility]] score 变体，属于经验型评分，不是严格物理量。
- 待核对经典来源：早期常被引用的合成可及性评分工作通常与 Ertl 等人的方法相关。
- SAS 与 QED 不同：QED 偏向“像不像药”，SAS 偏向“能不能较容易合成”。
- 不同工具链下的 SAS 取值范围和缩放方式可能略有差异，比较结果时需注意实现版本。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
