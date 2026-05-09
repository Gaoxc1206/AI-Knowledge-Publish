---
type: paper
citekey: "ranMOLLMMultiObjectiveLarge"
zotero_key: "Y7RIMRN8"
title: "MOLLM借助专家优化的分子设计多目标大语言模型"
chinese_title: "MOLLM借助专家优化的分子设计多目标大语言模型"
authors: "Nian Ran, Yue Wang, Richard Allmendinger"
year: ""
venue: ""
doi: ""
zotero_collections:
  - "多目标分子优化"
source_pdf: "raw/zotero/pdfs/多目标分子优化/MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge.pdf"
status: imported
reading_status: inbox
tags:
  - paper
aliases:
  - "MOLLM借助专家优化的分子设计多目标大语言模型"
  - "MOLLM: Multi-Objective Large Language Model for Molecular Design – Optimizing with Experts"
original_title: "MOLLM: Multi-Objective Large Language Model for Molecular Design – Optimizing with Experts"
---
## 一句话总结

**MOLLM: Multi-Objective Large Language Model for Molecular Design – Optimizing with Experts** 提出了一种无需额外训练、以 Large Language Model 作为交叉与变异算子的 多目标分子优化 框架，通过 in-context learning、prompt engineering、Pareto front selection 与 F-value selection 在多个分子性质目标上进行优化，并在作者实验中优于多类 SOTA 基线方法。

## 研究问题

本文关注的问题是：如何在 分子设计 中同时优化多个分子性质，并在有限 oracle 调用预算下提高优化质量、效率与候选分子的创新性。

具体问题包括：

- 如何将预训练 Large Language Model 中蕴含的化学领域知识用于 molecular design，而不是为每组目标重新训练模型。
- 如何在 multi-objective optimization 场景下，让模型同时考虑多个性质目标之间的权衡。
- 如何在 genetic algorithm 风格的分子优化中减少对传统图操作算子如 GB-GA 的依赖。
- 如何公平评估不同初始种群对遗传式优化算法性能的影响。
- 如何在固定 oracle budget 下提升分子优化的 sample efficiency。

## 背景与动机

分子设计在 drug discovery、materials science 和 chemical engineering 中非常重要。传统分子设计依赖反复实验、合成与试错，成本高、周期长、效率低。

近年来，机器学习方法被用于加速分子设计，包括：

- Bayesian Optimization
- Multi-Objective Optimization
- Markov Chain Monte Carlo
- Genetic Algorithm
- Reinforcement Learning
- Deep Learning
- Large Language Model

已有方法虽然取得了较好结果，但作者指出仍存在若干不足：

1. **运行时缺少专家知识整合**  
   很多优化算法在搜索过程中主要依赖分子性质打分，不充分利用化学专家知识或搜索方向反馈。

2. **多目标优化能力不足或不灵活**  
   许多实际分子设计任务需要同时优化多个性质，但一些方法更偏向单目标或有限多目标能力。例如文中提到 GB-BO、JT-VAE、MolGen 多目标能力有限；MolGPT 需要针对不同目标训练，灵活性受限。

3. **LLM 用于分子优化仍处于早期阶段**  
   MOLLEO 使用 LLM 辅助分子优化，但仍依赖 GB-GA 作为框架中的操作，并且多目标实验与 prompt 研究较初步。

4. **初始种群影响被低估**  
   对基于 genetic algorithm 的方法而言，在 oracle calls 固定时，初始种群会显著影响最终结果。作者认为已有研究如 MARS、MOLLEO、GB-GA 等常常没有充分控制或分析这一因素。

5. **oracle calls 应受限制**  
   某些分子性质评估可能依赖昂贵实验或专门训练模型，因此在实际应用和公平比较中应限制 oracle 调用次数。本文遵循 PMO benchmark 的 5000 次 oracle calls 预算。

## 核心思想

MOLLM 的核心思想是：

> 将 Large Language Model 直接作为分子优化中的遗传操作器，利用其预训练获得的化学领域知识和推理能力，通过 carefully designed prompts 执行 crossover 与 mutation，并用多目标选择机制筛选下一代分子。

与部分已有方法不同，MOLLM 不训练新的分子生成模型，也不依赖 GB-GA 等传统图编辑算子，而是让 LLM 负责所有 mating operations。

其关键组成包括：

- LLM 驱动的 crossover
- LLM 驱动的 mutation
- 面向多目标分子优化的 prompt template
- 基于父代分子性质的 in-context learning
- Pareto front selection
- F-value selection
- 可选的 experience pool，但主实验中作者发现 experience pool 会降低性能，因此暂时排除

## 方法框架

MOLLM 面向 unconstrained molecular optimization。输入是一组优化目标和一个初始分子种群，输出是优化后的分子集合。

整体流程包括：

1. **初始化 Initialization**
   - 从 ZINC250K 中选择初始分子。
   - 初始种群大小为 `Ni = 100`。
   - 作者设计三种初始化场景：
     - best initial：从 ZINC250K 中选 F-value 最好的 top 100 分子。
     - worst initial：从 ZINC250K 中选 F-value 最差的 bottom 100 分子。
     - random initial：随机采样 100 个分子。
   - 这样用于评估初始种群对算法的影响。

2. **Mating**
   - 从当前种群中随机选择父代分子。
   - 按概率执行：
     - crossover：使用两个父代分子。
     - mutation：使用一个父代分子。
   - 将父代分子的 SMILES、目标值、聚合 F-value 等信息放入 prompt。
   - 由 LLM 生成候选子代分子。

3. **Prompt Module**
   prompt template 包含五个关键部分：
   - multi-objective requirements
   - objective descriptions
   - parent objective values，用于 in-context learning
   - output instructions
   - past experience，如果启用 experience pool

4. **Scoring**
   - 对 LLM 生成的 offspring 计算各目标性质值。
   - 计算归一化后的 F-value。

5. **Selection**
   - 将上一代 parent molecules 与当前 offspring 合并。
   - 使用两种选择方式之一筛选下一代：
     - F-value selection
     - Pareto front selection
   - 两者各以 50% 概率执行。
   - 单目标任务或随机概率小于 0.5 时使用 F-value selection，否则使用 Pareto frontier selection。

6. **Experience Pool，主实验未使用**
   - 作者借鉴 ExpeL 设计 experience pool。
   - experience pool 包含：
     - 从更好且结构相似分子中总结的知识。
     - 避免生成较差分子的经验。
   - 但消融实验发现加入 experience 会使优化性能下降，可能因为使模型过度集中在局部最优附近，削弱探索能力。
   - 因此主实验暂时排除了 experience pool。

## 算法流程

论文给出的 **Algorithm 1 MOLLM framework** 可整理如下：

1. 输入：
   - 初始种群 `M0`
   - 种群大小 `N`
   - fitness function `F`
   - 加入 experience 的概率 `Pexp`
   - crossover 概率 `Pc`
   - mutation 概率 `Pm`

2. 初始化：
   - `t ← 0`
   - 对 `M0` 中每个分子 `m` 计算 `F(m)`

3. 在 oracle budget 未耗尽时循环：
   - 根据 `Pc` 和 `Pm` 从当前种群随机采样 parent pairs。
   - 通过 Prompt Module 生成 prompts。
   - 若随机概率小于 `Pexp`，则将 experience 加入 prompt。
   - 并行查询 LLM，生成 offspring。
   - 对每个 offspring 计算 `F(m)`。
   - 若随机概率小于 `Pexp`，则更新 experience pool。
   - 合并当前种群与 offspring。
   - 若为单目标或随机概率小于 0.5：
     - 使用 F-value selection 选择下一代。
   - 否则：
     - 使用 Pareto frontier selection 选择下一代。

4. 返回最终种群 `Mt`。

可概括为：

```text
初始化分子种群
→ 采样父代分子
→ 构造包含目标、父代性质、输出约束的 prompt
→ LLM 生成新分子
→ 计算分子性质和 F-value
→ 合并父代与子代
→ 通过 F-value / Pareto front 选择下一代
→ 重复直到 oracle budget 用尽
```

## 实验设置

### 任务设置

实验任务为 unconstrained molecular design。

作者重点评估在不同初始种群和多个目标组合下的分子优化能力。

初始种群来自 ZINC250K，分为：

- worst initial
- random initial
- best initial

oracle budget：

- 遵循 PMO benchmark
- 每次实验限制为 5000 oracle calls

### 优化目标

论文涉及的分子性质目标包括：

- QED：drug-likeness
- SA：synthetic accessibility
- LogP：octanol-water partition coefficient
- DRD2：dopamine receptor D2 affinity
- LogS：log of solubility
- reduction potential
- JNK3：c-Jun N-terminal Kinase 3
- GSK3β：Glycogen Synthase Kinase 3 Beta
- BBBP：Blood-Brain Barrier Permeability

主实验优化五个目标：

- QED ↑
- SA ↓
- DRD2 ↓
- GSK3β ↓
- JNK3 ↑

消融实验进一步测试 1 到 6 个目标：

1. QED ↑
2. QED ↑ + SA ↓
3. QED ↑ + SA ↓ + DRD2 ↓
4. QED ↑ + SA ↓ + DRD2 ↓ + GSK3β ↓
5. QED ↑ + SA ↓ + DRD2 ↓ + GSK3β ↓ + JNK3 ↑
6. QED ↑ + SA ↓ + DRD2 ↓ + GSK3β ↓ + JNK3 ↑ + BBBP ↑

### 评价指标

1. **Top 1 F**
   - 最优分子的 fitness。
   - F 是归一化目标值的加权和。
   - 本文各目标权重相同。

2. **Mean Top 10 F**
   - top 10 分子的平均 F-value。
   - 用于衡量模型是否稳定生成高质量分子。

3. **Uniqueness**
   - 有效生成分子中唯一分子的比例。
   - 用于衡量是否重复生成相同分子。

4. **Validity**
   - 生成分子中合法分子的比例。
   - 用于衡量模型对 SMILES 语法和原子价规则的掌握。

5. **Structural Diversity**
   - 基于 Morgan fingerprints 的 pairwise Tanimoto distance。
   - 用于衡量 Pareto set 或候选集的结构多样性。

6. **Efficiency**
   - 运行时间。
   - LLM calls 数量。
   - 对 LLM 方法尤其重要，因为 LLM 推理成本较高。

### 基线方法

作者比较了来自多类算法的 SOTA 或常用基线：

- GB-GA
- GB-BO
- JT-VAE
- MARS
- REINVENT
- MOLLEO
- DyMol
- Genetic-GFN

其中：

- MOLLM 和 MOLLEO 都使用 ChatGPT 4o。
- GB-GA、JT-VAE、GB-BO、MARS、REINVENT 使用 PMO benchmark 默认超参数。
- MOLLEO、DyMol、Genetic-GFN 使用其代码或论文中的默认超参数。
- REINVENT、DyMol、Genetic-GFN 的初始种群无法显式设置，因此只在 random initial 场景下评估。

## 主要结果

### 主实验结果：五目标优化

任务：

- QED ↑ + SA ↓ + DRD2 ↓ + GSK3β ↓ + JNK3 ↑

#### worst initial

MOLLM 结果：

- Top1 F：4.187
- Top10 F：4.152
- Uniqueness：0.937
- Validity：0.915
- Diversity：0.556

对比结果：

- Top1 F 第二梯队中 MOLLEO 为 4.096，GB-GA 为 4.048。
- MOLLM 在 Top1 F 和 Top10 F 上均最高。
- MOLLM 的 Top10 F 甚至超过其他方法的 Top1 F，表明从差初始点出发时仍有较强收敛能力。

#### random initial

MOLLM 结果：

- Top1 F：4.276
- Top10 F：4.245
- Uniqueness：0.949
- Validity：0.900
- Diversity：0.529

对比结果：

- DyMol Top1 F 为 4.232。
- Genetic-GFN Top1 F 为 4.157。
- MOLLEO Top1 F 为 4.098。
- MOLLM 在 Top1 F 和 Top10 F 上均最高。

#### best initial

MOLLM 结果：

- Top1 F：4.699
- Top10 F：4.628
- Uniqueness：0.942
- Validity：0.790
- Diversity：0.491

对比结果：

- MOLLEO Top1 F 同为 4.699。
- 但 MOLLM 的 Top10 F 为 4.628，高于 MOLLEO 的 4.564。
- 说明在最佳初始分子下，MOLLM 生成高质量分子的稳定性更好。

### 目标数量扩展实验

作者比较 MOLLM 与 MOLLEO 在 1 到 6 个目标下的表现。

主要发现：

- 随着目标数量增加，MOLLM 与 MOLLEO 的性能差距扩大。
- 当目标数超过 4 个时，MOLLM 优势更明显。
- 在 6 目标任务中加入 BBBP 后，MOLLM 仍能保持较高表现：
  - Top1 F：5.183
  - Top10 F：5.164
  - Uniqueness：0.957
  - Validity：0.890
  - Diversity：0.529
- 作者称 MOLLM 成功生成 top 100 molecule set，其中所有分子均为 Blood-Brain Barrier Permeable，即 BBB+。

### 效率结果

与 MOLLEO 相比：

| 方法 | LLM calls | 运行时间 |
|---|---:|---:|
| MOLLEO | 8517 | 7.32 小时 |
| MOLLM | 2908 | 0.52 小时 |

作者报告 MOLLM 在没有 early stopping 的情况下，LLM calls 约为 MOLLEO 的三分之一，运行时间超过 14 倍更快，同时性能更好。

### Experience Pool 消融

Pexp 表示加入 experience 的概率。

实验结果显示：

- Pexp = 0.0 时 Top1 F = 4.187，Top10 F = 4.152。
- 加入 experience 后性能没有提升，部分设置下降。
- 作者认为可能原因是 experience pool 使模型过度聚焦于某个局部最优，从而阻碍探索其他高质量区域。
- 因此主实验中暂时不使用 experience pool。

### 多目标选择消融

比较是否使用 MO selection：

| 设置 | Top1 F | Top10 F | Uniqueness | Validity | Diversity |
|---|---:|---:|---:|---:|---:|
| without MO selection | 3.830 | 3.791 | 0.999 | 0.816 | 0.842 |
| with MO selection | 4.187 | 4.152 | 0.961 | 0.915 | 0.556 |

结论：

- Pareto front selection 与 F-value selection 的组合对性能非常关键。
- 不使用多目标选择时，虽然 diversity 和 uniqueness 更高，但 fitness 明显下降。
- 对多目标分子优化而言，仅依靠 prompt 中写入目标不足，需要在 selection 中显式考虑多目标优化。

### LLM backbone 与 offspring 数量实验

作者比较了：

- GPT-4o direct propose
- MOLLM with Llama3-8B
- 每次 LLM call 生成 1 个 offspring
- 每次 LLM call 生成 2 个 offspring
- 每次 LLM call 生成 3 个 offspring

结果显示：

- 直接让 GPT-4o 提出 5000 个分子不如 MOLLM 框架。
- 即使使用 Llama3-8B 作为 backbone，MOLLM 也能达到可比表现，但 validity 较低。
- 官方版本采用每次 LLM call 生成 2 个 offspring：
  - Top1 F：4.276
  - Top10 F：4.245
  - Uniqueness：0.949
  - Validity：0.900
  - Diversity：0.529
- 每次生成 2 个 offspring 优于 1 个和 3 个的设置。

## 创新点

1. **完全由 LLM 驱动 mating operations**  
   MOLLM 使用 LLM 同时执行 crossover 与 mutation，而不是像 MOLLEO 那样仍依赖 GB-GA 等外部遗传算子。

2. **将 LLM、in-context learning 与 MOO 框架结合**  
   MOLLM 通过 prompt 输入父代分子的结构和目标值，使 LLM 在上下文中学习优化方向，并通过多目标选择机制实现目标权衡。

3. **无需针对目标重新训练**  
   与 MolGPT 等需要训练或适配的模型不同，MOLLM 直接利用预训练 LLM 的知识，不需要针对特定目标额外训练。

4. **重视初始种群影响并系统评估**  
   作者将初始种群分成 best initial、worst initial 和 random initial，控制不同方法的初始分子一致性，以提高比较公平性。

5. **混合选择策略**  
   使用 50% 概率的 F-value selection 和 50% 概率的 Pareto front selection，在 exploitation 与 diversity 之间折中。

6. **效率改进明显**  
   相比 MOLLEO，MOLLM 使用更少 LLM calls 和更短运行时间，同时获得更高 fitness。

## 局限性

1. **结构多样性相对较低**
   - 在主实验中，MOLLM 的 Top100 diversity 往往低于部分基线。
   - 作者也指出提升 molecular diversity 是未来方向。

2. **Experience Pool 未达到预期**
   - 虽然 experience pool 符合人类经验积累直觉，但实验中反而降低性能。
   - 具体原因仍需进一步研究。

3. **依赖 LLM 推理**
   - 尽管比 MOLLEO 更高效，但 MOLLM 仍需要多次 LLM calls。
   - 在大规模或高成本 API 场景下，推理成本仍是问题。

4. **Validity 在部分设置下不是最高**
   - 例如 best initial 中 MOLLM validity 为 0.790，低于 GB-GA、JT-VAE、GB-BO 等方法。
   - 这说明 LLM 生成合法 SMILES 的稳定性仍有改进空间。

5. **结果依赖具体 LLM 能力**
   - 主实验使用 ChatGPT 4o。
   - 虽然 Llama3-8B 版本也可运行，但 validity 明显下降。
   - 不同 LLM 的泛化表现需进一步确认。

6. **年份、会议/期刊、DOI 信息缺失**
   - 元数据中 year、venue、DOI 均为空。
   - PDF 显示 arXiv:2502.12845v1，日期为 18 Feb 2025。
   - 正式发表信息待补充原文/PDF 后确认。

7. **部分细节位于 Appendix**
   - baseline hyperparameters 细节在 Appendix 中，但当前摘取文本未包含完整 Appendix。
   - 待补充原文/PDF 后确认。

## 相关概念

- [[分子设计]]
- [[多目标分子优化]]
- [[multi-objective optimization]]
- [[molecular optimization]]
- [[unconstrained molecular optimization]]
- [[Large Language Model]]
- [[in-context learning]]
- [[prompt engineering]]
- [[genetic algorithm]]
- [[crossover]]
- [[mutation]]
- [[Pareto front selection]]
- [[Pareto frontier]]
- [[F-value selection]]
- [[oracle budget]]
- [[oracle calls]]
- [[SMILES]]
- [[SELFIES]]
- [[ZINC250K]]
- [[PMO benchmark]]
- [[QED]]
- [[SA]]
- [[LogP]]
- [[DRD2]]
- [[LogS]]
- [[JNK3]]
- [[GSK3β]]
- [[BBBP]]
- [[Tanimoto distance]]
- [[Morgan fingerprint]]
- [[molecular diversity]]
- [[validity]]
- [[uniqueness]]
- [[sample efficiency]]
- [[drug discovery]]
- [[materials science]]
- [[chemical engineering]]

## 相关方法

- [[MOLLM]]
- [[MOLLEO]]
- [[GB-GA]]
- [[GB-BO]]
- [[JT-VAE]]
- [[MARS]]
- [[REINVENT]]
- [[DyMol]]
- [[Genetic-GFN]]
- [[MolGPT]]
- [[MolGen]]
- [[LICO]]
- [[MolReGPT]]
- [[ChemCrow]]
- [[OPRO]]
- [[LMEA]]
- [[DST]]
- [[VJTNN+GAN]]
- [[MOOD]]
- [[RationaleRL]]
- [[MolSearch]]
- [[MLPS]]
- [[ExpeL]]
- [[Llama3-8B]]
- [[GPT-4o]]

## 相关论文

- [[MOLLEO]]：Efficient evolutionary search over chemical space with large language models
- [[PMO benchmark]]：Sample efficiency matters: a benchmark for practical molecular optimization
- [[GB-GA]]：A graph-based genetic algorithm and generative model/monte carlo tree search for the exploration of chemical space
- [[MolGPT]]：Molecular generation using a transformer-decoder model
- [[LICO]]：Large language models for in-context molecular optimization
- [[MolGen]]：Domain-agnostic molecular generation with chemical feedback
- [[MARS]]：Markov molecular sampling for multi-objective drug discovery
- [[REINVENT]]：Molecular de-novo design through deep reinforcement learning
- [[JT-VAE]]：Junction tree variational autoencoder for molecular graph generation
- [[DyMol]]：Dynamic many-objective molecular optimization
- [[Genetic-GFN]]：Genetic-guided GFlownets for sample efficient molecular optimization
- [[ChemCrow]]：Augmenting large language models with chemistry tools
- [[OPRO]]：Large language models as optimizers
- [[ExpeL]]：LLM agents are experiential learners

## 源文件

- citekey：`ranMOLLMMultiObjectiveLarge`
- title：**MOLLM: Multi-Objective Large Language Model for Molecular Design – Optimizing with Experts**
- authors：Nian Ran, Yue Wang, Richard Allmendinger
- year：待补充原文/PDF 后确认
- venue：待补充原文/PDF 后确认
- DOI：待补充原文/PDF 后确认
- collections：多目标分子优化
- arXiv：PDF 文本显示 `arXiv:2502.12845v1 [cs.LG] 18 Feb 2025`

## 图表摘录

![[raw/zotero/images/多目标分子优化/MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge/page-001.png]]

## Zotero 原始摘要

Molecular design plays a critical role in advancing fields such as drug discovery, materials science, and chemical engineering. This work introduces the Multi-Objective Large Language Model for Molecular Design (MOLLM), a novel framework that combines domain-specific knowledge with the adaptability of Large Language Models to optimize molecular properties across multiple objectives. Leveraging in-context learning and multi-objective optimization, MOLLM achieves superior efficiency, innovation, and performance, significantly surpassing state-of-the-art (SOTA) methods. Recognizing the substantial impact of initial populations on evolutionary algorithms, we categorize them into three types: best initial, worst initial, and random initial, to ensure the initial molecules are the same for each method across experiments. Our results demonstrate that MOLLM consistently outperforms SOTA models in all of our experiments. We also provide extensive ablation studies to evaluate the superiority of our components.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文可以看作是把 Large Language Model 作为“化学专家型遗传算子”嵌入 多目标分子优化 框架中。传统 genetic algorithm 的 crossover 和 mutation 通常依赖手工规则或图结构编辑，而 MOLLM 直接让 LLM 根据父代分子的 SMILES、目标值和优化说明生成子代分子。

我认为本文最重要的点不是“LLM 会生成分子”本身，而是以下三点组合：

1. **LLM 负责生成候选分子**
   - 利用预训练知识进行结构改造。
   - 不需要额外训练。
   - 不依赖 GB-GA 作为底层操作器。

2. **MOO selection 负责纠偏**
   - LLM 生成的分子不一定天然满足多目标权衡。
   - 因此通过 Pareto front selection 和 F-value selection 把搜索拉回多目标优化轨道。
   - 消融实验表明，没有 MO selection 时性能明显下降。

3. **控制初始种群使比较更公平**
   - 在固定 oracle budget 下，初始分子好坏会显著影响最终结果。
   - 这点在分子优化论文中确实容易被忽略。
   - best/random/worst initial 的设置使实验更有解释力。

从结果看，MOLLM 在 fitness 上表现突出，尤其是目标数量增加时优势扩大。这说明 LLM + prompt + MOO selection 可能适合复杂多目标场景。不过，validity 和 diversity 仍是潜在短板。LLM 可能会围绕高分结构局部搜索，导致结构多样性下降；同时 SMILES 生成合法性也依赖模型能力和 prompt 设计。

experience pool 的失败也很有启发：在分子空间中，简单总结“好分子经验”不一定能帮助全局搜索，反而可能强化局部最优。这说明将人类式反思机制迁移到分子优化时，需要更精细地设计，例如分区经验、多样性约束、目标条件化经验或 novelty-aware memory。

## 后续问题

1. MOLLM 的 prompt template 完整内容是什么？当前正文仅描述五个组成部分，具体模板待补充原文/PDF 后确认。

2. baseline 的完整超参数设置是什么？论文正文提到在 Appendix 中，当前摘取文本未包含 Appendix，待补充原文/PDF 后确认。

3. MOLLM 生成的高 F-value 分子是否具有真实化学可合成性和药物开发意义？仅凭 oracle 分数可能不足以判断。

4. 对 BBBP 的 oracle 是什么模型或评估函数？其可靠性和外推能力如何？待补充原文/PDF 后确认。

5. MOLLM 在更多真实约束任务中表现如何，例如 scaffold constraint、toxicity constraint、binding affinity constraint？

6. 如何提升 MOLLM 的 structural diversity，同时不显著牺牲 Top1 F 和 Top10 F？

7. experience pool 是否可以改为多样性保持型经验库，例如按结构簇或 Pareto 区域分别维护经验？

8. MOLLM 对不同 LLM 的敏感性如何？除了 GPT-4o 和 Llama3-8B，是否测试过 Claude、Gemini、Mistral、Mol-domain LLM？

9. LLM 输出无解释虽然降低成本，但是否损失了可解释的化学改造路径？

10. 如果 oracle 是昂贵湿实验或高成本模拟，MOLLM 的 5000 oracle calls 是否仍然过多？是否可结合 Bayesian Optimization 或 surrogate model 进一步降低调用次数？
