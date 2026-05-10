---
type: "method"
status: "enriched"
category: "其他"
domain: "蛋白质序列建模与属性预测"
background: "included"
---
# Sequence CNN

## 标准定义

Sequence CNN 通常指面向序列数据的一维 [[卷积神经网络]] 变体：在离散符号序列（如文本、DNA、蛋白质氨基酸序列）上滑动卷积核，提取局部模式，并通过池化、非线性层或全连接层完成分类、回归或表示学习。它的核心优势是能高效捕捉局部邻域中的 motif/gram 模式，并对固定长度或可变长度序列做端到端建模。单独写作“Sequence CNN”时，通常强调其用于 [[序列建模]] 的卷积结构，而不是图像卷积。

## 在本知识库中的用法

在给定论文上下文中，没有直接出现 Sequence CNN 作为方法名或核心组件；当前只能确认该文聚焦于 [[蛋白质序列]] / [[抗体设计]] 的多目标生成与优化，以及 [[多目标优化]]、[[Pareto front]]、[[Energy-Based Model|EBM]] 采样等内容。Sequence CNN 在本知识库中的具体作用、是否作为序列打分器/[[分子性质预测|性质预测]]器/[[Energy-Based Model|能量模型]]骨干，待从更多论文中补充。

## 关键点

- Sequence CNN 的本质是把 [[卷积神经网络]] 迁移到离散序列上，用一维卷积捕捉局部上下文特征。
- 它更擅长识别短程 motif、局部组合模式和邻近残基依赖，而不是显式建模长程依赖。
- 在蛋白质任务中，Sequence CNN 常可用于序列分类、性质回归、打分函数或表示提取；但本库当前给定论文未明确使用它。
- 与 Transformer 相比，Sequence CNN 结构更轻量，训练与推理通常更高效；但对远距离相互作用的表达能力通常较弱。
- 如果后续论文把 Sequence CNN 用作抗体/蛋白序列的属性预测器，它可能成为能量模型或[[多目标优化]]中的一个可学习打分模块。

## 别名

- SeqCNN
- Sequence CNN
- Seq-CNN
- 1D CNN
- 序列卷积网络
- 一维卷积网络
- sequence convolutional neural network

## 外部背景

- 一维卷积通过局部感受野提取序列邻域特征，是序列 CNN 的基本机制。
- CNN 在序列任务中常配合 max-pooling、global pooling 或多层堆叠，以聚合不同尺度的局部模式。
- 在生物序列分析中，CNN 常用于识别保守 motif、结合位点或功能片段；这一用法属于常见经验背景。
- 相比 RNN，CNN 并行性更好；相比 Transformer，CNN 往往更依赖局部先验。待核对经典来源

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
