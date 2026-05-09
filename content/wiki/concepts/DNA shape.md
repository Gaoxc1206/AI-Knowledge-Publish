---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "可控生物序列设计"
background: "included"
---
# DNA shape

## 标准定义

DNA shape 指由 DNA 序列决定的局部三维构象与几何特征集合，可作为序列功能的结构性表征。常见 DNA shape 特征包括 [[helix twist]]、[[roll]]、[[rise]]、[[shift]]、[[slide]]、[[propeller twist]] 和 [[minor groove width]] 等；它们反映碱基对堆叠、双螺旋局部弯曲与沟槽几何的变化。与只看碱基字母不同，DNA shape 更强调序列在结构层面的可解释性背景。

## 在本知识库中的用法

在该论文的 enhancer DNA 设计任务中，DNA shape 被当作需要联合控制的性质之一，与 enhancer class 一起作为多目标引导的优化对象。上下文中明确举例的 shape 特征包括 [[HelT]] 和 [[Rise]]；方法通过预训练的标量评分函数对这些性质进行打分，并在[[Discrete Flow Matching|离散流匹配]]采样过程中朝更符合目标权衡的方向引导序列生成。

## 关键点

- DNA shape 是序列衍生的结构特征，不等同于 DNA 字母本身；它提供了比纯序列更接近机制层面的描述。
- 经典 DNA shape 描述通常覆盖局部几何量，如 [[helix twist]]、[[rise]]、[[roll]]、[[propeller twist]] 和 [[minor groove width]]。
- 在本知识库对应论文中，DNA shape 是 enhancer DNA 设计的多目标之一，用于和 enhancer class 共同进行[[controllable generation|可控生成]]。
- 论文上下文里具体提到的 shape 例子是 HelT 和 Rise，说明这里关注的是可由序列驱动的局部构象控制。
- DNA shape 适合与多目标引导结合，因为它可以作为独立评分维度参与 Pareto 式权衡。
- 若需要更完整的分类、计算方式或与实验测量/预测模型的对应关系，待从更多论文中补充。

## 别名

- DNA构象形状
- DNA shape features
- 序列衍生DNA结构特征
- HelT/Rise 等DNA几何特征

## 外部背景

- DNA shape 研究通常从高分辨率结构统计或基于序列的预测模型出发，用于刻画短序列片段的局部构象偏好。
- 常见 DNA shape 参数里，HelT 通常指 helix twist，Rise 表示相邻碱基对之间沿螺旋轴方向的位移。
- DNA shape 经常被用于解释转录因子结合偏好、启动子/增强子活性差异以及蛋白-DNA 相互作用特异性。
- 待核对经典来源

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
