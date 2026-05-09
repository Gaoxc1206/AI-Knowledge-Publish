---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# generative yield

## 标准定义

Generative yield（生成产率）是生成式优化中的常用评价指标，通常用于衡量在给定生成预算、筛选阈值或约束条件下，模型生成的候选分子中有多少能够被视为“有效产出”——例如同时满足目标性质、相似性或可行性要求。不同论文对其归一化方式、阈值设定和统计对象可能不同，因此需要结合具体实验协议理解。

## 在本知识库中的用法

在该论文的 docking 多性质优化实验中，generative yield 用来衡量模型在给定目标阈值下产生可用候选分子的能力。文中报告了 Generative Yield 0.8 的结果，并对比了 [[REINVENT]]、[[Beam Enumeration|Beam Structure]] 15、Chemlactica-125M、Chemlactica-1.3B 和 Chemma-2B；这里数值越高，表示模型在约束满足与候选生成上的产出越好。该指标与 [[分子优化]] 过程中的黑盒 [[oracle]] 评估直接相关。

## 关键点

- Generative yield 更关注“生成出来并达到要求的分子有多少”，属于[[分子生成]]/优化中的结果型指标。
- 它通常和阈值绑定使用，例如文中出现的 0.8 设置；阈值不同，数值不可直接横向比较。
- 在本知识库对应论文里，它主要用于 docking 多性质优化实验，用来比较不同[[大语言模型|语言模型]]在生成有效候选分子上的表现。
- 该指标与 [[黑盒 oracle]] 的评价结果密切相关：先生成，再由 [[黑盒 oracle|oracle]] 判定是否计入产出。
- 它和 [[oracle burden]] 关注点不同：generative yield 偏向“产出多少”，oracle burden 偏向“为达到目标花了多少评估代价”。

## 别名

- generative yield
- GY
- 生成产率
- 生成收益

## 外部背景

- 在生成式[[分子设计]]中，yield 类指标常被用来衡量候选分子的有效产出率，属于常见但实现细节不统一的实验指标。
- 常见变体包括 success rate、hit rate、top-k yield 等，分别强调是否成功、是否命中和是否在前 k 个结果中满足条件。
- 如果实验同时要求新颖性、[[validity|有效性]]和[[Synthesizability|可合成性]]，generative yield 的统计口径会更严格，需要结合论文定义理解。
- 待核对经典来源

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
