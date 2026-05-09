---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "抗体设计与蛋白质序列优化"
background: "included"
---
# therapeutic antibody

## 标准定义

Therapeutic antibody（治疗性抗体）是指用于预防、诊断或治疗疾病的抗体药物，通常通过高[[binding affinity|亲和力]]、特异性识别靶标分子来发挥作用。它既包含天然抗体的工程化形式，也常指经人源化、亲和力成熟或其他优化后的单克隆抗体。作为[[抗体]]药物的一类，治疗性抗体不仅要满足靶标结合能力，还要兼顾[[developability|可开发性]]、稳定性、免疫原性和制备可行性等约束。

## 在本知识库中的用法

在这篇论文中，therapeutic antibody 主要是一个[[蛋白质序列设计]]的应用场景：模型需要生成或优化同时满足多个性质的抗体序列。文中将其具体化为多目标属性组合，例如 Ab-like、[[binding affinity]]（[[binding affinity|Aff]]）和 [[nonspecificity]] / [[BV score]]，并强调这些目标可能相互冲突，因此更适合用 [[多目标优化]] 和 [[Pareto front]] 的视角来处理。[[pcEBM]] 在这里被用来沿着 Pareto 改进方向采样，以获得一组具有不同权衡的候选治疗性抗体序列。

## 关键点

- 治疗性抗体在本知识库中对应的是 [[蛋白质序列设计]] / [[inverse design|反向设计]]任务，而不是泛指所有抗体生物学问题。
- 论文把治疗性抗体优化表述为多目标问题：既要保持 Ab-like，又要提高 Aff，同时降低 BV score 等非特异性风险。
- 与单纯追求单一指标不同，这里更强调在多个性质之间寻找可接受的权衡，即接近 [[Pareto front]] 的候选序列集合。
- p[[cEBM]] 将治疗性抗体作为能量模型采样的应用对象，把每个性质对应的能量/梯度组合起来进行迭代优化。
- 该场景隐含了治疗性抗体常见的工程约束：不仅要“能结合”，还要兼顾 developability 和可制造性。

## 别名

- 治疗性抗体
- 抗体药物
- monoclonal antibody therapeutics
- therapeutic mAb

## 外部背景

- 治疗性抗体通常包括单克隆抗体、抗体片段、双特异性抗体以及抗体偶联药物中的抗体部分；具体形态依适应症和机制而定，待核对经典来源。
- 常见工程流程包括抗体发现、亲和力成熟、人源化、可开发性评估和制剂优化，待核对经典来源。
- 在药物研发中，治疗性抗体的重要性质通常包括靶标亲和力、特异性、稳定性、聚集倾向、黏度和免疫原性，待核对经典来源。
- “monoclonal antibody therapeutics” 是最常见的英文近义表达之一，待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
