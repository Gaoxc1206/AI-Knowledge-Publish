---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "药物发现中的分子优化"
background: "included"
---
# 蛋白-配体 docking

## 标准定义

蛋白-配体 docking（分子对接）是指在给定蛋白靶标结构的前提下，预测小分子配体在结合位点中的可能构象、取向及其结合倾向的计算方法。它通常用于评估候选分子是否可能与靶蛋白发生有效结合，并常以 docking score 作为近似的[[binding affinity|结合强度]]指标。在 [[药物发现]] 中，docking 既可用于虚拟筛选，也可作为 [[黑盒 oracle]] 或优化目标的一部分；但它本质上是对真实结合自由能的近似，精度受蛋白构象、打分函数与采样策略影响。

## 在本知识库中的用法

在这篇论文的语境中，docking 主要作为[[分子优化]]中的一个黑盒[[黑盒 oracle|评价函数]]（[[黑盒 oracle|oracle]]）出现：模型生成候选分子后，用 docking score 评估其是否更接近期望的结合性质。论文将 docking 相关任务纳入多性质优化基准，并报告了基于不同靶标的生成结果，例如 [[DRD2]]、MK2、AChE 等目标上的 [[generative yield]] 和 [[oracle burden]]。也就是说，这里关心的不是对接算法本身，而是 [[分子优化]] 循环里如何把 docking 作为可调用但昂贵的评分信号来驱动搜索。

## 关键点

- 在本知识库中，docking 主要被当作 [[黑盒 oracle]] 使用，用于给生成分子打分并指导 [[分子优化]]。
- 论文把 docking 视为一种昂贵的性质评价信号，因此特别关注生成效率和 [[oracle burden]]。
- docking 任务与[[分子生成]]结合后，重点不在精确复现对接过程，而在于提升候选分子对目标蛋白的预期结合表现。
- 上下文中的 docking benchmark 以具体靶标为单位评估结果，如 DRD2、MK2、AChE 等。
- 该设置属于离散[[化学空间]]中的目标导向搜索，模型通过 [[SMILES]] 生成候选，再由 docking 评分筛选。
- 论文强调模型规模会影响在 docking 类任务中的探索与利用平衡。

## 别名

- 分子对接
- protein-ligand docking
- molecular docking
- 对接

## 外部背景

- 蛋白-配体 docking 通常包含两步：构象采样与打分排序，目的是在蛋白结合位点中找到可能的低能结合姿态。
- 常见 docking 软件包括 AutoDock、[[AutoDock VINA|Vina]]、Glide 等；其打分函数一般是经验式或半经验式，待核对经典来源。
- docking score 越低通常表示预测结合越强，但不同软件的分数不可直接横向比较，待核对经典来源。
- 在药物发现中，docking 常用于虚拟筛选、先导化合物优化和靶点选择，待核对经典来源。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
