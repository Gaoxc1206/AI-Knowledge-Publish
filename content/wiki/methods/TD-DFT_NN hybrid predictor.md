---
type: "method"
status: "enriched"
category: "代理模型"
domain: "多目标荧光分子设计"
---
# TD-DFT/NN hybrid predictor

## 定义

一种将快速 [[TD-DFT]] 计算与神经网络偏差校正结合的混合[[性质预测]]方法。它先通过高通量量子化学流程得到分子在吸收峰、发射峰等性质上的物理估计，再用神经网络学习系统性偏差并进行线性校准。该方法旨在提升对分布外分子的泛化能力，同时保持[[物理一致性]]与较高预测效率。

## 关键点

- 先用 [[RDKit]]、[[xTB]] 和 [[GPU4PySCF]]/TD-DFT 工作流获得性质的物理估计。
- TD-DFT 侧重点包括 λabs、λemi，以及基于[[oscillator strength|振子强度]]估计的 [[molar extinction coefficient|log ε]]。
- 再引入神经网络学习动态 scaling factor 和 shifting factor，对原始 TD-DFT 输出进行校正。
- 该混合模型在 [[荧光小分子|fluorophore]] split subset 上对 λabs 和 λemi 的 RMSE 与 R² 优于 raw TD-DFT 和 pure NN。
- 设计目标是提升 [[OOD 泛化]]和物理一致性，但 λemi、log ε、[[photoluminescence quantum yield|PLQY]] 的估计仍存在一定局限。
- 待从更多论文中补充

## 别名

- TD-DFT + NN hybrid predictor
- physics-informed hybrid predictor
- TD-DFT/NN混合预测器
- TD-DFT偏差校正网络

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
