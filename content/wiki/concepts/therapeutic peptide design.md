---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标肽序列设计"
background: "included"
---
# therapeutic peptide design

## 标准定义

Therapeutic [[肽段设计|peptide design]]（治疗性肽设计）是指围绕治疗用途，对肽序列及其化学修饰进行设计与筛选，使其在目标结合、稳定性、[[solubility|溶解性]]、毒性、药代性质等方面满足应用需求的研究方向。它通常属于[[分子设计]]与[[多目标优化]][[crossover|交叉]]问题：一方面要提升疗效相关属性，另一方面要控制[[hemolysis|溶血性]]、聚集性、低[[half-life|半衰期]]等不良性质。作为背景知识，这一定义不依赖某一篇论文，而是该领域的通用理解。

## 在本知识库中的用法

在本知识库中，therapeutic peptide design 主要指离散生物序列空间中的多目标生成与优化任务。给定论文将其具体化为：在[[Rectified Discrete Flows]]的先验下，结合 annealed [[Tchebycheff scalarization]]、[[locally balanced proposals]] 和 [[Metropolis-Hastings]] 更新，把肽序列或 peptide SMILES 引导到近似 [[Pareto front]] 的高质量区域。上下文中的典型任务包括 wild-type peptide binder 设计、chemically-modified peptide SMILES 设计，以及同时优化 [[binding affinity]]、[[solubility]]、hemolysis、[[half-life]] 和 [[non-fouling]] 等治疗相关性质。

## 关键点

- 标准上，它关注把肽作为治疗分子来设计，而不是只追求单一性质；常见目标是 affinity、solubility、stability、toxicity 与 pharmacokinetics 的综合平衡。
- 在本库所述论文中，这个概念被建模为离散序列上的多目标采样问题：先验来自 [[Rectified Discrete Flows]]，再用多目标 guidance 进行重加权。
- 论文使用的核心偏好不是“某一目标越强越好”，而是通过 [[Tchebycheff scalarization]] 倾向于选择各目标都较均衡的候选肽。
- annealed guidance 的作用是先探索、后收敛：前期较弱引导维持多样性，后期增强引导以聚焦高质量候选。
- 该框架同时适用于肽序列和 peptide SMILES，说明治疗性肽设计在这里并不限于天然序列，也包含化学修饰分子。
- 从实验结果看，这类设计任务体现典型 trade-off：去掉某个目标 guidance 后，对应性质会明显变差，而其他性质可能变好。

## 别名

- therapeutic peptide engineering
- peptide drug design
- peptide therapeutics design
- 治疗性肽工程
- 肽药物设计

## 外部背景

- 治疗性肽通常兼具靶向性强、合成相对灵活、可进行序列与修饰双重设计等特点，因此常被用于抗感染、抗肿瘤、免疫调节和靶向递送等方向。
- 常见设计流程包括：候选肽生成、性质预测、过滤不良性质、迭代优化与实验验证；其中多目标权衡是核心难点。
- 治疗性肽设计与蛋白质工程、药物发现中的 lead optimization 类似，但更强调短序列、局部突变与化学修饰的联合优化。
- 待核对经典来源：肽药物设计教材或综述通常会把亲和力、选择性、稳定性、膜通透性、免疫原性和半衰期作为主要优化维度。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
