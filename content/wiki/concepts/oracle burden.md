---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# oracle burden

## 标准定义

Oracle burden 通常指为了达到某个目标性能或成功阈值，优化过程需要消耗的 [[黑盒 oracle|oracle]] 调用次数、查询成本或评估负担。它本质上衡量的是优化效率：在给定黑盒[[黑盒 oracle|评价函数]]下，越快达到目标，oracle burden 越低。标准用法里，它常与“query efficiency”“[[sample efficiency]]”或“evaluation cost”接近，但具体计算方式会随基准而变化。

## 在本知识库中的用法

在这篇论文的 docking 多性质优化实验中，oracle burden 是一个越低越好的效率指标，用来比较不同方法达到指定 [[generative yield]] 阈值时所需的 oracle 评估开销。论文报告了如 oracle burden 0.8 (100) 这类结果，并发现 Chemlactica-125M 在该指标上表现很强，说明它能用较少的 oracle 调用达到目标水平。

## 关键点

- 它衡量的是[[黑盒优化]]中的评估成本，而不是最终分子分数本身。
- 在标准意义上，oracle burden 关注“达到某个目标需要多少次查询”，因此越低越好。
- 在本知识库对应论文中，该指标用于 docking benchmark，配合 [[generative yield]] 评估[[分子优化]]的效率。
- 论文将其作为比较不同模型探索/利用能力的重要指标：更低的 oracle burden 表示更高的优化效率。
- 该指标依赖具体 benchmark 的阈值设定与统计口径，不能脱离实验协议单独解释。

## 别名

- oracle call cost
- oracle query burden
- evaluation burden
- query burden

## 外部背景

- 黑盒优化与[[Bayesian Optimization|贝叶斯优化]]中常见“query cost / [[oracle budget|evaluation budget]]”类指标，常用来衡量达到目标所需的函数[[oracle calls|评估次数]]。
- 在[[分子设计]]任务里，oracle 往往代表实验测量、对接打分或量化计算，因此 oracle burden 可视为实验资源消耗的代理指标。
- 待核对经典来源：不同分子优化 benchmark 对 oracle burden 的精确定义可能不完全一致，需结合具体基准说明。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
