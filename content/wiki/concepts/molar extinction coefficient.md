---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标荧光分子设计"
background: "included"
---
# molar extinction coefficient

## 标准定义

摩尔消光系数（molar extinction coefficient，常记为 ε）是表征分子在特定波长处吸收光能力的光谱参数，通常出现在 Beer-Lambert 定律 A = εlc 中，用于把吸光度与浓度和光程长度联系起来。ε 越大，表示单位浓度下吸收越强；在实际文献中也常以 log ε 形式报告，便于比较不同分子的吸收强度。

## 在本知识库中的用法

在该文的[[荧光分子设计]]任务中，molar extinction coefficient 主要以 log ε 的形式出现，作为与 [[吸收峰]]、[[发射峰]]、[[PLQY]] 和 [[Stokes shift]] 并列的[[多目标优化]]指标之一。[[Attentive Graph Predictor|AGP]] 预测器将 log ε 作为多任务输出，用于快速筛选；[[prompt-conditioned generation]] 也将 log ε 作为条件输入之一。作者还在 [[TD-DFT]]/NN hybrid predictor 中通过[[oscillator strength|振子强度]]近似估计 log ε，并用偏差校正网络修正物理计算结果。

## 关键点

- 这是衡量分子吸收强度的基础光谱量，在荧光[[分子设计]]里常用其对数形式 log ε 作为优化目标。
- 在本文中，它不是孤立指标，而是与 [[吸收峰]]、[[发射峰]]、[[PLQY]] 等一起参与 [[多目标分子优化]]。
- 本文的 AGP 直接预测 log ε，说明该性质被当作高通量筛选的重要输出。
- TD-DFT 工作流中，log ε 通过振子强度做近似估计，再由神经网络进行偏差校正。
- 作为条件输入时，log ε 有助于引导生成更适合实际应用的荧光分子，但文中也提示其可控性不如部分其他目标稳定。

## 别名

- 摩尔消光系数
- 摩尔吸光系数
- molar absorptivity
- extinction coefficient
- log ε

## 外部背景

- 常见单位是 L·mol⁻¹·cm⁻¹；待核对经典来源。
- 实验上通常通过 UV-Vis 吸收光谱在峰位或指定波长处读取 ε 或 ε_max，并进一步报告为 log ε。
- ε 与分子的共轭程度、跃迁允许性、构型与环境（如溶剂）有关；待核对经典来源。
- 在[[计算化学]]中，ε 常与振子强度相关联，但二者并非严格一一对应；待核对经典来源。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
