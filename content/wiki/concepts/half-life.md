---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标生物序列优化"
background: "included"
---
# half-life

## 标准定义

half-life（半衰期）通常指某个物质、信号或活性在一定条件下衰减到原来一半所需的时间。在生物与药物语境中，它常用于描述分子在体内的药代稳定性、清除速度或功能持续时间；数值越大，通常表示分子维持有效浓度或有效作用的时间越长。这个概念本身是通用背景知识，不特指某一篇论文。

## 在本知识库中的用法

在本知识库所覆盖的两篇离散生物序列生成论文中，half-life 被当作[[肽段设计]]里的一个可优化性质，用于衡量并提升候选序列的持续时间/稳定性。它与 [[binding affinity]]、[[solubility]]、[[hemolysis]]、[[non-fouling]] 一起构成多目标权衡；在 [[AReUReDi]] 的案例中，half-life 甚至出现了超过 96 h、42–64 h 等结果，并且与其他目标存在明显 trade-off。整体上，它是一个由预训练打分器提供的标量目标，优化方向是“延长”。

## 关键点

- half-life 在这里不是生成模型本身，而是[[生物序列设计]]中的一个性质目标，通常作为可预测、可打分的标量指标使用。
- 在论文上下文中，它主要出现在肽段 binder 设计任务里，并与 [[binding affinity]]、[[solubility]]、[[hemolysis]]、[[non-fouling]] 共同进行[[多目标优化]]。
- 库内用法明确把 half-life 的优化方向设为“延长”，因此它对应的是“越大越好”的目标，但会与其他性质产生 trade-off。
- AReU[[ReDi]] 的消融结果显示，去掉 half-life guidance 后，相关样本的 half-life 会显著下降，说明该目标对采样方向有实际控制作用。
- 在示例结果中，half-life 常以小时（h）报告，说明这里更接近肽段/分子层面的稳定性或体内持续时间指标。

## 别名

- 半衰期
- 药代半衰期
- protein half-life
- serum half-life

## 外部背景

- 半衰期的经典定义是某一量从初始值衰减到一半所需的时间；在化学、物理和生物医学中都广泛使用。
- 在[[drug discovery|药物研发]]中，half-life 往往指药代半衰期或血清半衰期，影响给药频率、暴露时长和药效维持。
- 对于蛋白质和肽段，half-life 常与体内降解速率、蛋白酶敏感性、清除机制等因素相关。
- 待核对经典来源

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
