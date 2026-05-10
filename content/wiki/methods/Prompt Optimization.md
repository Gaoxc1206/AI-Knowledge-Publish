---
type: "method"
status: "enriched"
category: "优化方法"
domain: "小分子生成与分子优化"
background: "included"
---
# Prompt Optimization

## 标准定义

Prompt Optimization（提示优化）是指围绕模型输入提示进行搜索、改写、组合或自动化选择，以提升 [[大语言模型]] 在目标任务上的输出质量、稳定性或可控性。它通常关注如何设计更有效的上下文、指令、示例或约束条件，使模型更好地完成 [[条件生成]]、预测或决策任务。常见形式包括手工[[Prompt Engineering|提示工程]]、自动提示搜索，以及软提示/前缀式提示方法。

## 在本知识库中的用法

在本知识库对应论文中，Prompt Optimization 主要出现在群体式小[[分子优化]]流程里：先维护高分分子池，再从池中采样与目标分子相近的分子来组织 prompt，驱动语言模型生成新候选分子并交给黑盒 oracle 打分。论文还结合了生成阶段的若干提示/采样技巧，如 Chain-of-Thought、repetition penalty 和 undesired token suppression，以减少无效输出并改善[[分子性质预测|性质预测]]/[[可控生成|条件生成]]表现。这里的“prompt optimization”更偏向任务内的提示构造与生成控制，而不是通用的自动提示搜索框架；具体自动化程度待从更多论文中补充。

## 关键点

- 标准上，prompt optimization 是对输入提示进行优化，而不是直接修改模型参数；目标是提升 [[大语言模型]] 的任务适配能力。
- 在该论文中，它服务于小分子优化：用高分样本和相似分子构造提示，引导模型生成更可能高分的 [[SMILES]] 候选。
- 它与 [[黑盒 oracle]]、[[拒绝采样]]式筛选和动态 fine-tuning 共同组成闭环搜索过程。
- 生成阶段的提示/解码控制很重要，论文报告了 Chain-of-Thought、repetition penalty、undesired token suppression 等技巧能减少 invalid generation。
- 这里的用法更接近“任务内提示构造 + 生成控制”，而不是完整的自动 prompt search；该点仍需更多论文交叉验证。

## 别名

- 提示优化
- Prompt Engineering
- 自动提示优化
- 提示工程

## 外部背景

- 离散 prompt optimization 通常包括手工模板调参、示例选择、自动搜索或基于反馈的迭代改写，待核对经典来源。
- 软提示方法会把提示表示为可训练的连续向量，常见近义概念包括 prefix tuning、prompt tuning，待核对经典来源。
- 在生成任务中，prompt optimization 常与约束解码、采样温度、repetition penalty 等策略配合使用，以提高可控性和有效输出率。
- 在[[分子生成]]场景中，提示往往会编码目标性质、相似分子或局部结构约束，从而引导模型进行条件[[分子生成|分子设计]]。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
