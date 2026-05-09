---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标荧光分子设计"
background: "included"
---
# photoluminescence quantum yield

## 标准定义

Photoluminescence quantum yield（PLQY，光致发光量子产率）是描述材料/分子发光效率的指标，通常定义为发射的光子数与被吸收的光子数之比。它反映激发后有多少激发态能量通过辐射跃迁转化为发光；数值越高，通常表示非辐射损失越少、发光效率越高。

## 在本知识库中的用法

在该论文的 [[LUMOS]] 框架中，PLQY 被作为[[荧光分子设计]]的核心优化目标之一，与 [[吸收峰]]、[[发射峰]]、[[摩尔消光系数]]、[[Stokes shift]] 等一起进入[[多目标优化]]。具体来说，它被纳入 [[Attentive Graph Predictor|AGP]] 的多任务[[性质预测]]、[[latent diffusion]] 的 [[prompt-conditioned generation]] 条件，以及基于 [[NSGA-III]] 的[[多目标分子优化]]流程。论文也指出，PLQY 缺乏标准化的 [[TD-DFT]] 计算协议，因此其物理校准与控制相对更难，且由于标注数据稀缺，prompt 控制效果较弱。

## 关键点

- PLQY 是荧光/发光分子的关键 [[评价指标]]，在这篇工作中被直接视为多目标优化变量，而不是仅作为事后表征。
- [[LUMO]]S 将 PLQY 与 [[吸收峰]]、[[发射峰]]、[[摩尔消光系数]] 等一起做联合预测和联合生成，实现 [[多目标优化]]。
- AGP 预测器把 PLQY 作为多任务回归目标之一，用于快速筛选；LSP 则为潜在空间中的[[gradient-guided generation|梯度引导生成]]提供可微代理。
- 在 prompt-conditioned generation 中，PLQY 也是条件输入之一，但论文明确提到其控制效果弱于部分其他性质，可能与数据稀缺有关。
- 论文指出 PLQY 缺乏标准 TD-DFT 计算协议，因此更依赖数据驱动预测与物理校正结合的混合框架。

## 别名

- PLQY
- photoluminescence quantum yield
- 光致发光量子产率
- 荧光量子产率
- φ

## 外部背景

- PLQY 通常用来衡量分子或材料把吸收能量转化为发光的效率，是荧光探针、成像染料和 OLED 材料中的常用指标，待核对经典来源。
- PLQY 的测量常见有相对法和积分球法，不同溶剂、浓度、温度和固/液相条件会显著影响结果，待核对经典来源。
- 高 PLQY 往往意味着较强的辐射跃迁与较少的非辐射衰减，但它不单由分子本征结构决定，也受环境与聚集态效应影响，待核对经典来源。
- 在不同文献中，PLQY 也常写作 quantum yield of photoluminescence 或简称 quantum yield，但应注意与荧光量子产率、磷光量子产率的具体定义区分，待核对经典来源。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
