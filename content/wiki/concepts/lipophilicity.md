---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标荧光分子设计"
background: "included"
---
# lipophilicity

## 标准定义

Lipophilicity（疏脂性/脂溶性）通常指分子在脂相与水相之间的分配倾向，常用 [[logP]] 或 [[logD]] 表征。它会影响膜穿透、溶解度、体内分布和代谢等性质，因此在[[molecular optimization|分子性质优化]]与 [[ADMET]] 评估中经常作为重要维度。

## 在本知识库中的用法

待从更多论文中补充。当前上下文只表明该框架可在[[荧光分子设计]]中同时考虑 [[ADMET]] 和 [[细胞通透性]] 等约束，但没有直接给出 lipophilicity（如 [[logP]]/logD）的独立建模、优化目标或实验结果。

## 关键点

- Lipophilicity 是分子在水相与脂相之间分配倾向的概念，和 [[ADMET]]、[[细胞通透性]]、溶解度等性质密切相关。
- 在 [[多目标分子优化]] 中，它常被作为约束或辅助目标，与活性、选择性和[[Synthesizability|可合成性]]等指标共同权衡。
- 在本知识库对应论文中，框架主要优化荧光相关目标（如吸收/发射峰、[[PLQY]]、[[molar extinction coefficient|log ε]]），lipophilicity 更像是可纳入的辅助性质，而非文中重点展开的核心目标。
- 若用 [[logP]] 表示，需要区分中性分子的分配行为；若分子可电离，则 [[logD]] 更能反映特定 pH 下的真实分配倾向。
- 对[[荧光探针]]而言，适度的 lipophilicity 往往有助于细胞摄取和膜穿透，但过高可能带来[[solubility|水溶性]]下降和非特异性结合增加。

## 别名

- 疏脂性
- 脂溶性
- logP
- logD

## 外部背景

- 常用实验或计算指标是正辛醇-水分配系数的对数值 [[logP]]；若考虑电离状态与环境 pH，常用 [[logD]]。
- lipophilicity 过高通常会增强膜亲和性，但也可能降低水溶性并增加非特异性结合；过低则可能限制通透性。
- 在药物化学与分子探针设计中，lipophilicity 常与 [[ADMET]]、口服暴露和组织分布共同评估；具体阈值依体系而异，待核对经典来源。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
