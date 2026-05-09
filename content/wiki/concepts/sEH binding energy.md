---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# sEH binding energy

## 标准定义

sEH binding energy 指分子与靶蛋白 [[可溶性环氧化物水解酶]]（sEH, soluble epoxide hydrolase）结合时的能量估计，常见于[[蛋白-配体 docking|分子对接]]或打分函数中，用于近似表征配体-蛋白相互作用强弱。通常在约定的评分体系下，数值越低/越负往往表示预测结合越强，但具体方向要以所用软件和打分函数定义为准。它属于 [[binding energy]]/[[binding affinity|亲和力]]类指标，常被当作[[分子设计]]中的一个优化目标。

## 在本知识库中的用法

在该论文中，sEH binding energy 作为[[多目标分子设计]]里的一个目标维度，与其他性质一起构成 reward vector，用来刻画候选分子在[[目标空间]]中的位置。作者围绕 [[Pareto front]] 上不同 trade-off 区域进行可控采样，并用 [[goal-conditioning|goal-conditioned]] [[GFlowNet]] 生成落入指定 [[focus region]] 的分子；因此 sEH binding energy 在这里主要扮演“需要被优化的性质目标”而不是单独任务。

## 关键点

- 它是一个面向 [[多目标分子优化]] 的性质目标，通常与 [[QED]]、[[Synthesizability|可合成性]]、毒性等指标并列使用。
- 标准含义上，它衡量分子与 sEH 的预测[[binding affinity|结合强度]]；更强结合通常对应更有利的药物候选筛选，但必须结合具体打分体系解释。
- 在本知识库所引论文中，它被放入 reward vector，与其他目标共同定义目标空间中的 trade-off 关系。
- 论文强调不要只靠加权和式标量化来间接优化这些目标，而是直接指定[[focus region|目标区域]]来生成相应分子。
- 因此，sEH binding energy 在此语境下更像是一个可被定向探索的目标维度，而不是单纯的评估结果。

## 别名

- sEH结合能
- sEH binding score
- soluble epoxide hydrolase binding energy
- sEH亲和力

## 外部背景

- 在药物发现中，binding energy 常由分子对接、自由能近似或打分函数给出，属于对真实结合自由能的粗粒度估计。
- 待核对经典来源：不同 docking 软件对 binding energy / score 的符号约定、单位与可比性并不一致。
- sEH 通常指 soluble epoxide hydrolase，是一个常见的药物靶点名称缩写。
- 在生成式分子设计里，这类指标经常作为目标函数的一部分，与药物相似性、合成可行性一起做联合优化。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
