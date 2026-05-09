---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# Reinforcement Learning for Molecule Optimization

## 定义

该上下文主要讨论了药物[[分子优化]]的可控多属性多目标设定，但没有给出一个明确的[[强化学习]]算法细节。论文指出，传统[[多目标分子优化]]方法常依赖人工设计的 reward function，并存在任务特定调参、扩展性差等问题。就当前笔记而言，该节点的具体强化学习实现、奖励设计与训练流程待从更多论文中补充。

## 关键点

- 传统多目标分子优化方法常依赖人工设计的 reward function。
- 真实[[Lead Optimization|先导优化]]更需要[[属性特异性目标|属性级目标]]控制，即提升部分性质、保持部分已达标性质。
- 现有 instruction-tuned [[Large Language Model|LLM]] 方案能做[[multi-property optimization|多属性优化]]，但该上下文强调的主要是[[Instruction Tuning|指令微调]]范式，而非具体强化学习算法。
- 对于强化学习在分子优化中的具体策略、[[奖励模型|奖励函数]]和训练细节，待从更多论文中补充。

## 别名

- 分子优化强化学习
- molecule optimization RL
- reinforcement learning for molecular optimization

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
