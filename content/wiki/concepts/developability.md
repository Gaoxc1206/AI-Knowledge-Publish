---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "蛋白质序列设计与多目标优化"
background: "included"
---
# developability

## 标准定义

developability（可开发性）通常指一个蛋白质或抗体候选分子从发现阶段进入后续药物开发时的综合可推进性。它不是单一理化指标，而是对一组会影响[[Drug-likeness|成药性]]的性质的统称，例如稳定性、[[solubility|溶解性]]、聚集倾向、黏度、表达与纯化可行性、免疫原性以及整体制造可行性。在[[抗体设计]]中，它常被视为与活性和选择性并列的重要约束，往往需要和其他目标一起做[[多目标优化]]。

## 在本知识库中的用法

在这篇论文的语境里，developability 主要作为[[抗体设计|治疗性抗体设计]]中的一类实际约束出现，用来说明仅优化[[binding affinity|结合亲和力]]并不够。作者把它和 Ab-like、[[binding affinity]]、[[nonspecificity]] / [[BV score]] 等并列为可能相互冲突的性质，强调候选序列还应兼顾黏度、[[可制造性]]和临床开发可行性等要求。这里它不是被单独建模的主目标，而是用来说明为什么需要沿 [[Pareto front]] 采样一组权衡候选，而不是追求单一最优解。

## 关键点

- 标准上，developability 是面向[[drug discovery|药物研发]]阶段的综合性概念，关注候选分子是否“能顺利开发”，而不只是是否有高活性。
- 在蛋白/抗体任务中，它常与 [[可制造性]]、[[黏度]]、稳定性、溶解性、聚集风险等性质一起出现。
- 本论文中，developability 作为背景性的额外目标，说明[[therapeutic antibody|治疗性抗体]]设计需要同时平衡多个彼此冲突的性质。
- 论文的核心动机是：当 developability 与结合能力或特异性存在冲突时，单目标优化或固定加权往往不足，需考虑 [[多目标优化]] 与 [[Pareto front]]。
- 因此，这里的 developability 更接近“综合开发约束”而不是某个可直接用单一模型精确定义的标签。

## 别名

- 可开发性
- 药物可开发性
- developability assessment
- 可成药性
- 开发性

## 外部背景

- 在抗体与蛋白工程中，developability 常用于描述候选分子从 lead 到临床候选物的推进难度与风险，属于常见但边界不完全统一的术语。
- 常见的 developability 相关维度包括热稳定性、化学稳定性、溶解性、聚集/自组装倾向、黏度、表达水平、纯化难度和免疫原性。
- 实践中经常通过 developability score 或多指标筛选来近似评估，但不同团队、平台和适应症对该概念的定义会有差异。
- 待核对经典来源

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
