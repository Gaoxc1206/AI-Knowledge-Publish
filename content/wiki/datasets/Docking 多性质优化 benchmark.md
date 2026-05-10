---
type: "dataset"
status: "enriched"
category: "Benchmark"
domain: "分子对接与多目标分子优化"
background: "included"
---
# Docking 多性质优化 benchmark

## 标准定义

Docking 多性质优化 benchmark 指用于评估分子在目标蛋白对接相关约束下、同时优化多个分子性质能力的一类基准任务。通常会给定若干靶点或性质目标，并用统一的评分函数/[[黑盒 oracle]]对候选分子打分，再用诸如成功率、得分提升、[[Generative Yield]]、[[Oracle burden]]等指标衡量方法在[[分子优化]]中的探索与利用能力。

## 在本知识库中的用法

在本知识库所对应论文中，这一 benchmark 具体用于评估模型在 [[DRD2]]、MK2、AChE 三个靶点上的多性质优化能力。作者将 Chemlactica/Chemma 作为生成器，在有限 oracle 调用下持续产生候选分子，并与 [[REINVENT]] Baseline、Beam Structure 15 比较。论文报告该 benchmark 上模型在 Generative Yield 与 Oracle burden 两类指标上整体优于基线，且观察到较小模型更偏向早期探索、较大模型更擅长利用高 reward 区域。

## 关键点

- 这是一个面向[[分子优化]]的 benchmark，而不是单纯的静态[[分子性质预测|性质预测]]数据集；核心是比较不同方法在[[黑箱优化|黑盒搜索]]中的效率。
- 论文上下文中的任务聚焦于三个靶点：DRD2、MK2、AChE，并同时报告生成产出与 oracle 代价。
- 评价时使用了 [[Generative Yield]] 和 [[Oracle burden]] 两类指标，分别反映生成候选的数量/产出效率与达到目标所需的 oracle 调用成本。
- 与 REINVENT Baseline、Beam Structure 15 相比，本文方法在多数设置下取得更高的 yield、更低的 burden。
- 该 benchmark 在论文中体现的是“对接导向的多性质优化”场景：不仅要[[分子生成|生成分子]]，还要在靶点相关打分下持续改进。
- 证据主要来自该论文的实验部分；更具体的 benchmark 规范、数据划分与标准实现待从更多论文中补充。

## 别名

- docking multi-property optimization benchmark
- Docking MPO benchmark
- 多性质对接优化基准
- 对接多目标优化基准

## 外部背景

- 分子 docking benchmark 通常用于评估化合物与靶蛋白结合相关的优化能力，常与[[药物发现]]场景中的先导化合物设计相连。
- 多性质优化常把对接分数与理化性质、合成可行性或相似性约束结合起来，形成多目标搜索问题。
- Generative Yield 和 Oracle burden 是[[分子生成]]/优化中常见的效率类指标，用来衡量方法能否以较少查询找到更多高分候选。
- 不同论文中的 docking benchmark 可能采用不同靶点、打分函数和阈值设置，具体定义需要对照原始实验协议，待核对经典来源。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
