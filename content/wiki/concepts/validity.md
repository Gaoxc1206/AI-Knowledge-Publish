---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# validity

## 标准定义

Validity（有效性/合法性）通常指生成样本在形式和结构上是否“可被接受”。在[[分子生成]]中，它一般表示生成结果能否被化学解析为合法分子，例如 [[SMILES]] 可成功解析、价态与键连关系满足基本化学约束等。它主要衡量生成结果的可用性，而不是性质优化水平本身。

## 在本知识库中的用法

在这篇 [[MOLLM]] 的上下文里，Validity 是[[多目标分子优化]]结果的质量指标之一，和 Top1/Top10 F、[[Uniqueness]]、[[Diversity]] 一起报告。作者在 worst initial、random initial、best initial 三种初始化设置下都给出了 Validity，用来比较不同搜索策略与初始种群对生成分子“可用性”的影响。实验中，加入 [[Pareto front selection]] 与 [[F-value]] 相关的多目标选择后，Validity 明显高于不使用多目标选择的设置；同时，作者也报告了不同初始化下的具体数值（如 worst initial 0.915、random initial 0.900、best initial 0.790），说明该指标会随搜索偏好与优化强度而变化。

## 关键点

- 标准意义上，Validity 衡量生成分子是否满足基本化学合法性，常以能否被工具正确解析为合法结构为准。
- 在本知识库中，Validity 被当作优化后候选集合的结果质量指标，而不是单独的优化目标。
- MO[[Large Language Model|LLM]] 将 Validity 与 [[F-value]]、[[Uniqueness]]、[[Diversity]] 共同报告，用于综合评估[[多目标优化]]效果。
- 从实验结果看，使用多目标选择时 Validity 更高，说明显式的多目标筛选有助于保留更多可用分子。
- Validity 与优化强度并不总是同向变化：更激进的目标优化可能带来更高的性质分数，但也可能牺牲一部分合法性或稳定性。
- 在分子生成任务中，Validity 通常是基础门槛指标，只有先保证有效性，后续的性质优化与多样性比较才有意义。

## 别名

- 有效性
- 合法率
- chemical validity
- validity score

## 外部背景

- 在分子生成评测里，Validity 常与 [[Uniqueness]]、Novelty、[[Diversity]] 一起作为基础指标出现。
- 对基于 [[SMILES]] 的生成方法，Validity 往往通过 [[RDKit]] 等化学工具检查解析成功率、价态合法性与结构完整性来计算。
- 不同论文对 Validity 的实现细节可能略有差异，例如是否要求分子完全中性、是否过滤盐形式等，待核对经典来源。
- 有些图生成或编辑方法还会把连通性、环结构合法性等纳入有效性判定，具体口径需结合任务设定理解。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
