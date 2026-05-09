---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子设计"
background: "included"
---
# in-context learning

## 标准定义

In-context learning（上下文学习，ICL）是指模型在不更新参数的情况下，仅通过输入提示词中的任务说明、示例或上下文信息，在推理阶段临时归纳任务模式并完成生成或预测的能力。它常见于 [[Large Language Model]]，也常与 [[prompt engineering]] 配合使用。背景知识上，ICL 不等同于参数微调，而是依赖上下文中提供的示范、约束和结构化信息来触发模型的条件化推理。

## 在本知识库中的用法

在本论文的[[Multi-objective evolutionary molecule optimization|多目标分子优化框架]]中，in-context learning 主要体现为把父代分子的 [[SMILES]]、各目标性质值以及聚合后的 F-value 放入 prompt，让 [[Large Language Model|LLM]] 在生成 [[crossover]]/[[mutation]] 结果时依据这些上下文信息理解当前优化状态与目标权衡。作者将其作为无需额外训练地利用化学先验和优化历史的关键机制之一，并与 [[prompt engineering]]、[[Pareto front]] selection、[[F-value selection]] 共同构成优化流程。这里的用法不是训练一个新的[[分子生成]]器，而是让 [[Large Language Model]] 通过上下文直接执行分子搜索操作。

## 关键点

- 标准意义上，ICL 是一种推理时学习方式：模型根据上下文中的示例和约束完成任务，而不是通过梯度更新参数。
- 在该论文中，ICL 主要用于把父代分子的性质信息写入 prompt，使 LLM 能感知当前分子的多目标状态与优化方向。
- ICL 与 [[prompt engineering]] 紧密结合：上下文组织方式会直接影响 LLM 作为 crossover / mutation 算子时的输出质量。
- 论文中的 ICL 不是单纯的 few-shot 分类，而是面向分子生成与多目标权衡的条件化生成。
- 结合 [[Pareto front]] selection 和 F-value selection 后，ICL 提供的上下文信息更容易转化为有效的候选分子搜索。
- 该工作强调 ICL 可帮助复用预训练模型中的化学知识，从而减少额外训练和 [[黑盒 oracle|oracle]] 调用成本。

## 别名

- ICL
- 上下文学习
- 上下文内学习
- in-context learning

## 外部背景

- ICL 常被视为大模型在上下文中进行临时任务适配的一种能力，常见于指令跟随、few-shot 生成和结构化推理任务。
- 在经典理解中，ICL 依赖于示例顺序、示例质量和提示格式；这些因素会显著影响模型表现，待核对经典来源。
- 与微调不同，ICL 不改变模型参数，因此更适合低成本、快速迭代的应用场景。
- 在生成式任务中，ICL 不仅可以提供标签或答案示例，也可以提供中间状态、约束条件和打分信息，待核对经典来源。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
