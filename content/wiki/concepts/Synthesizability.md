---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子生成"
background: "included"
---
# Synthesizability

## 标准定义

可合成性（[[synthetic accessibility|synthesizability]]）指一个分子能否通过合理、可行的化学路线被实验制备出来；在[[分子生成]]、[[药物设计]]和[[多目标优化]]中，它常作为性质目标或约束，用于与[[可药性]]、活性等指标共同权衡。它通常与[[逆合成]]、原料可得性、路线步骤数和反应可行性相关。

## 在本知识库中的用法

在该论文中，synthesizability 是多目标[[黑盒 oracle|黑盒函数]]之一，和 [[binding affinity]]、[[类药性|drug-likeness]] 等一起用于[[多目标分子设计|多目标分子生成]]；[[IMG]] 在[[扩散模型]]推理阶段通过基于目标值的[[Weighted Resampling|加权重采样]]，把样本推向同时兼顾合成可行性的目标分布。上下文未给出具体的[[SAS|可合成性评分]]公式或实现细节，待从更多论文中补充。

## 关键点

- 在本知识库里，它主要作为[[多目标分子优化]]中的一个黑盒目标，而不是单独的生成任务。
- 它与 binding affinity、drug-likeness 一起构成 trade-off，需要在 [[Pareto front]] 上寻找折中解。
- 论文的 IMG 方法把可合成性纳入推理时目标评估，并通过候选[[Weighted Resampling|重采样]]影响生成轨迹。
- 这里的用法强调“实验上能否合成”，但未限定具体打分器或阈值。

## 别名

- 可合成性
- 合成可行性
- 合成可及性
- synthetic accessibility
- SA

## 外部背景

- 常见定义是“给定一个分子，判断其是否容易被合成”，不同工作对“容易”的标准可能不同，待核对经典来源。
- 分子领域里常见的相关量化包括 SA score、逆合成可达性、路线长度和原料可得性，待核对经典来源。
- 在生成模型文献中，可合成性经常与活性、选择性、毒性和可药性一起作为多目标权衡项。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
