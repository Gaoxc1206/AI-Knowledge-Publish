---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# Drug-likeness

## 标准定义

Drug-likeness（[[类药性]]）通常指一个候选分子在结构、理化性质和经验规则上与“已知药物”相似的程度，是 [[分子生成]]、虚拟筛选与药物设计中常见的性质/评分。它更像是对“能否成为可开发药物候选”的启发式度量，而不是疗效或安全性的直接保证；不同研究会采用不同的打分函数或近似指标。

## 在本知识库中的用法

在这篇论文里，[[QED|drug-likeness]] 被当作[[多目标黑盒优化]]中的一个目标，与 [[binding affinity]]、[[Synthesizability|synthesizability]] 等可能冲突的目标一起优化。作者在[[扩散模型]]推理阶段用 [[IMG]] 对候选分子进行[[Weighted Resampling|重采样]]，使样本分布朝多目标目标分布移动，从而更好地覆盖 [[Pareto front]]。论文没有展开 drug-likeness 的具体经典定义或计算公式，细节待从更多论文中补充。

## 关键点

- 在标准语义上，drug-likeness 是一种面向 [[药物设计]] 的性质/评分，用来衡量分子是否“像药”。
- 在本文语境中，它是 [[多目标优化]] 的一个黑盒目标，而不是单独优化的唯一指标。
- 论文强调 drug-likeness 可能与其他目标冲突，因此更适合放在 Pareto 视角下联合考虑。
- IMG 通过在 [[扩散模型]] 推理时基于多目标权重重采样，把 drug-likeness 融入生成过程，而不是事后筛选。
- 本文未给出 drug-likeness 的专门定义、公式或特定打分器，因此其具体实现细节待从更多论文中补充。

## 别名

- 类药性
- drug likeness
- druglikeness
- 类药性评分

## 外部背景

- 常见的类药性量化方式包括 [[QED]]（quantitative estimate of drug-likeness）；不同实现的构成与权重可能不同，待核对经典来源。
- 类药性常与 [[Lipinski Rule of Five]] 等经验规则一起作为早期筛选参考，但二者并不完全等价，待核对经典来源。
- 在生成式[[分子设计]]中，drug-likeness 常被当作优化目标或约束项，与活性、合成可行性、稳定性等共同权衡。
- 类药性较高通常只表示“更像可开发分子”，并不自动保证生物活性、毒性可控或可合成。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
