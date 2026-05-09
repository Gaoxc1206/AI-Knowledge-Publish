---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "可控多属性多目标分子优化"
background: "included"
---
# hERG

## 标准定义

hERG 通常指 human Ether-à-go-go Related Gene 相关的钾离子通道抑制/阻断风险，是药物早期筛选中常用的安全性性质之一。hERG 抑制过强往往与 [[心脏毒性]]、尤其是 [[QT间期延长]] 风险相关，因此在[[药物发现]]中通常希望降低 hERG 相关风险；在[[分子优化]]任务里，它常被作为“越低越好”的性质目标来处理。

## 在本知识库中的用法

在该论文的 [[C-MuMOInstruct]] 中，hERG 是 10 个药物相关分子性质之一，并被设定为“越低越好”的属性。它可作为需要优化的子最优性质，也可作为需要保持稳定的近最优性质；例如在 ACEP 案例中，模型需要在提升 [[AMP]] 和 [[PlogP]] 的同时保持 hERG 不变，以避免引入新的心脏毒性风险。

## 关键点

- hERG 是 C-[[MuMOInstruct]] 中的核心安全性属性之一，属于[[属性特异性目标|属性级目标]]控制的对象。
- 标准上它表示对 hERG 相关通道/机制的抑制风险，通常与 [[心脏毒性]] 评估相关。
- 在本知识库中的用法里，hERG 默认是“降低更好”的目标，但在已达标时也可能被要求保持稳定。
- 论文强调真实分子优化不是所有性质一起提升，而是要对 hERG 这类安全性性质进行选择性控制。
- 案例表明，模型在提升其他性质时若能维持 hERG，不仅更符合药物优化逻辑，也更接近[[先导化合物优化]]中的实际约束。

## 别名

- hERG inhibition
- hERG liability
- hERG blockade
- human Ether-à-go-go Related Gene inhibition

## 外部背景

- hERG 抑制是药物安全性筛选中的经典关注点，常被用于预测心律失常相关风险，待核对经典来源。
- 许多化合物在体外表现出良好活性，但若 hERG 风险较高，后续开发价值会显著下降，待核对经典来源。
- hERG 指标有时写作 hERG inhibition、hERG liability 或 hERG blockade，含义大体相近。
- 在部分文献中，hERG 会与 IKr 通道阻断、QT 延长风险一起讨论，待核对经典来源。

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
