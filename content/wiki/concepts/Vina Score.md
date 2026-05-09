---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# Vina Score

## 标准定义

[[AutoDock VINA|Vina]] Score 通常指 [[AutoDock VINA|AutoDock Vina]] 在[[蛋白-配体 docking|分子对接]]中输出的预测结合得分，用于近似衡量配体与受体的结合倾向或结合自由能。一般来说，数值越低（越负）表示预测结合越强。它本质上是一个用于[[分子对接]]与[[虚拟筛选]]的经验打分函数，也常被当作[[黑箱目标函数]]或优化目标使用。

## 在本知识库中的用法

待从更多论文中补充

## 关键点

- Vina Score 是 AutoDock Vina 的对接打分，常用来快速评估分子与靶蛋白的预测[[binding affinity|结合强度]]。
- 在[[分子生成]]与筛选任务中，它常可作为一个黑箱目标，和[[多目标优化]]一起用于权衡结合能力、[[Synthesizability|可合成性]]与[[类药性]]。
- 通常情况下，Vina Score 越低表示预测结合越强，但具体解释要结合受体设置、对接参数和评分版本。
- 它不是实验测得的真实[[binding affinity|亲和力]]，而是基于经验项的预测分数，因此适合做排序和筛选，不宜直接等同于真实活性。
- 在给定上下文中，论文强调的是黑箱多目标生成框架；Vina Score 若出现，主要应理解为其中一个可评估目标。

## 别名

- AutoDock Vina Score
- Vina affinity
- 对接得分
- Vina 打分

## 外部背景

- AutoDock Vina 是常用分子对接程序，Vina Score 是其默认输出之一。
- Vina Score 常被用于虚拟筛选、[[Hit-to-Lead Optimization|先导优化]]和生成式[[分子设计]]中的快速排序。
- 它与实验结合自由能通常不完全一致，适合作为筛选指标而非最终结论。
- 待核对经典来源

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
