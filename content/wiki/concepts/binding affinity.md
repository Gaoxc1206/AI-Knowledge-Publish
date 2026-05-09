---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标生物序列设计"
background: "included"
---
# binding affinity

## 标准定义

binding affinity（结合亲和力）是衡量两个分子（如蛋白-配体、抗体-抗原、肽-靶标）相互结合强弱的指标。通常亲和力越高，表示结合越稳定、越容易形成复合物；在实验和建模中常可通过解离常数 Kd、结合常数 Ka 或相关打分来表征。它是一个背景中的通用性质指标，不等同于功能效果本身。

## 在本知识库中的用法

在这些论文的[[生物序列设计]]场景中，binding affinity 被当作需要优化的目标性质之一，尤其出现在肽段 binder 设计和[[抗体设计]]任务里。相关方法把它与[[hemolysis|溶血性]]、[[solubility|溶解性]]、[[non-fouling]]、[[half-life]] 等目标一起做多目标权衡，并通过预训练性质打分器或 [[黑盒 oracle|oracle]] 评估候选序列。其作用不是单独追求最高值，而是与其他约束共同推动生成结果接近 [[Pareto front]]。

## 关键点

- 标准上，binding affinity 描述分子与靶标之间的结合强弱；数值越有利，通常表示复合物越稳定。
- 在本知识库的上下文里，它是 [[多目标优化]] 中的一个核心目标，常与 [[solubility]]、[[hemolysis]]、[[non-fouling]]、[[half-life]] 等性质联动优化。
- 在抗体/[[肽段设计]]论文中，binding affinity 常被作为标量 score 来驱动采样或引导生成，而不是仅用于事后评估。
- 它与其他开发性指标经常存在 trade-off：高亲和力候选不一定同时具备良好可溶性、低毒性或长[[half-life|半衰期]]。
- 因此，在序列生成任务里，binding affinity 更适合作为多[[目标空间]]中的一个维度，而不是唯一目标。

## 别名

- 结合亲和力
- 亲和力
- 结合强度
- Aff

## 外部背景

- 常见表征方式包括 Kd、Ka、Ki 等；一般而言，Kd 越小表示亲和力越强。
- 亲和力受实验条件影响明显，例如温度、缓冲液、pH、离子强度和测量平台都会改变数值。
- 在药物发现和蛋白工程中，高 binding affinity 往往需要与选择性、稳定性、可制造性等指标一起考虑。
- binding affinity 既可用于蛋白-蛋白/抗体-抗原体系，也可用于蛋白-小分子、核酸-蛋白等相互作用。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
