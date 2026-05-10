---
type: paper
citekey: "ranMOLLMMultiObjectiveLarge"
title: "MOLLM借助专家优化的分子设计多目标大语言模型"
chinese_title: "MOLLM借助专家优化的分子设计多目标大语言模型"
authors: "Nian Ran, Yue Wang, Richard Allmendinger"
year: ""
venue: ""
doi: ""
zotero_collections:
  - "多目标分子优化"
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

MOLLM: Multi-Objective Large Language Model for Molecular Design – Optimizing with Experts 提出了一种无需额外训练、以 LLM 作为遗传算法 crossover 与 mutation 操作器的多目标分子优化框架，在 ZINC250K 初始化、PMO 风格 5,000 oracle calls 预算下，相比 GB-GA、GB-BO、JT-VAE、MARS、REINVENT、MOLLEO、DyMol、Genetic-GFN 等方法取得更高的多目标 fitness，并显著减少 LLM 调用与运行时间。

## 研究问题

本文关注无约束分子设计中的多目标优化问题：给定一个或多个分子性质目标，如何在有限 oracle calls 预算下生成兼顾多种性质的高质量分子。

具体问题包括：

1. 分子设计通常不是单目标任务，而是需要同时优化 QED、SA、LogP、DRD2、LogS、reduction potential、JNK3、GSK3β、BBBP 等多个性质。
2. 传统 GA、BO、MCMC、RL、DL 方法虽然在分子优化中有效，但往往难以在运行时引入专家知识或预训练语言模型中的化学知识。
3. 现有 LLM 分子优化方法如 MOLLEO 仍部分依赖 GB-GA 等外部遗传操作器，且多目标实验和初始种群影响分析不足。
4. 在固定 oracle calls 预算下，初始分子种群会显著影响遗传类方法的结果，因此需要更严格地区分 best initial、worst initial、random initial 三类设置进行公平评估。

## 背景与动机

分子设计对药物发现、材料科学和化学工程非常重要。传统实验式试错依赖反复合成与测试，成本高、周期长。机器学习方法已经被广泛引入分子优化，包括 Bayesian Optimization、Multi-Objective Optimization、Markov Chain Monte Carlo、Genetic Algorithms、Reinforcement Learning 和 Deep Learning。

不过，已有方法存在几个不足：

- 很多方法没有在优化过程中动态引入专家知识或方向性反馈。
- 一些深度模型如 MolGPT、LICO 等可能需要针对目标进行训练或引入额外参数，灵活性受限。
- 许多分子设计任务天然是多目标的，但部分方法的多目标能力有限，或主要面向单目标/目标分子发现。
- 基于 GA 的方法常忽略初始种群对最终表现的影响；在固定 oracle calls 预算下，这会影响公平比较。
- LLM 具备从大规模文本中学习到的化学和科学知识，并能通过 in-context learning、prompt engineering 参与优化，但如何系统地嵌入 MOO/GA 框架仍处于早期阶段。

MOLLM 的动机是：不从头训练分子生成模型，而是直接利用 SOTA LLM 的领域知识与推理能力，将 LLM 完整作为遗传操作器，并结合多目标选择策略，实现高效、灵活的分子多目标优化。

## 核心思想

MOLLM 的核心思想是将 LLM 作为遗传算法中的主要生成机制，用于执行 crossover 与 mutation，而不是依赖传统 GB-GA 操作器或额外训练的分子生成模型。

框架包含几个关键部分：

1. **LLM-driven mating**  
   使用 LLM 根据父代分子、目标描述、目标值和提示模板生成子代分子。crossover 使用两个父代，mutation 使用一个父代。

2. **Prompt engineering + in-context learning**  
   Prompt 包含五类信息：
   - 多目标优化要求；
   - 各目标的描述；
   - 父代分子的目标值，用于 in-context learning；
   - 输出格式要求；
   - 可选的历史经验 experience。

3. **多目标选择机制**  
   将上一代父代与当前子代合并后，使用两种选择方式：
   - F-value selection：根据归一化目标值之和选择；
   - Pareto front selection：基于 Pareto 前沿选择，保持多目标权衡与多样性。  
   两种选择以 50% 概率交替使用。

4. **初始化公平性设计**  
   从 ZINC250K 中构造三种初始化：
   - best initial；
   - worst initial；
   - random initial。  
   这样可以分析初始种群对 GA 类方法的影响，并提高比较公平性。

5. **不额外训练**  
   MOLLM 不需要针对特定目标重新训练模型，理论上可适配不同 LLM。论文实验中主要使用 ChatGPT 4o，并在消融中测试 Llama3-8B。

## 方法框架

![[raw/zotero/images/多目标分子优化/MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge/mineru-figure-01.jpg]]

图 1 展示了 MOLLM 的整体优化流程：从 ZINC250K 中选择初始分子后，框架迭代执行 mating、prompt generation、scoring、experience updating 和 next-generation selection。该图最重要的是说明 MOLLM 将 LLM 置于分子生成操作的核心位置，并通过多目标选择策略把 LLM 生成结果纳入进化优化循环。

MOLLM 的方法框架可分为以下模块：

### 1. 初始化模块

对于一个或多个目标，MOLLM 从 ZINC250K 中初始化 $N_i$ 个分子。论文设置中 $N_i = 100$。

初始化方式包括：

- random initial：随机选择；
- best initial：根据 F-value 选择最优的 100 个；
- worst initial：根据 F-value 选择最差的 100 个。

ZINC250K 大约包含 250,000 个经过整理的 drug-like molecules，包含化学结构、logP、QED、SA 等性质。

### 2. Mating 模块

Mating 负责让 LLM 生成新候选分子。父代分子从当前种群中随机选择：

- crossover 概率为 $P_c$，每次使用两个父代；
- mutation 概率为 $P_m$，每次使用一个父代。

父代会被组织进 prompt 模板中，包括 SMILES、目标值和聚合分数等信息。

论文指出，LLM 在 crossover 上表现较好，因为任务形式较直接；但 mutation prompt 与 crossover 相似，LLM 可能难以进行有效探索。因此作者在 mutation 指令中加入常见分子变异操作，以提升探索性。

### 3. Prompt 模板

Prompt 包含五个关键组成部分：

1. multi-objective requirements；
2. objective descriptions；
3. parent objective values；
4. output instructions；
5. past experience，可选。

其中 output instructions 要求 LLM 只输出分子结构，不输出解释，以减少运行时间和查询成本。

### 4. 评分模块

生成子代后，系统对分子进行有效性检查与目标函数计算，并通过 oracle 获得各目标分数。多个目标会被归一化，并构造 F-value：

$$
\max _ {m \in M} F (m) = \sum_ {i = 1} ^ {k} w _ {i} f _ {i} (m)
$$

论文实验中每个目标权重相同。如果某目标需要最小化，则通过 $1 - f_i(m)$ 转换为最大化方向。

### 5. Experience Pool 模块

作者设计了 experience pool，用于总结：

- 生成更好且结构相似分子的经验；
- 避免较差分子的经验。

经验来自每轮 top 10 和 bottom 10 分子，其中 bottom 10 通过滑动窗口选取。

不过消融实验发现，引入 experience pool 反而降低性能。因此主实验暂时不使用 experience pool。

### 6. Next-generation Selection 模块

将上一代父代和当前子代合并后，选择下一代种群。

选择方式包括：

- F-value selection：偏向当前最优解，增强 exploitation；
- Pareto front selection：保留 Pareto 多样性，增强 exploration，降低早熟收敛风险。

两者在多目标场景下以 50% 概率使用。

## 算法流程

论文给出的 Algorithm 1 可概括如下：

1. 输入：
   - 初始种群 $\mathbb{M}_0$；
   - 种群大小 $N$；
   - fitness function $F$；
   - 添加经验概率 $P_{exp}$；
   - crossover 概率 $P_c$；
   - mutation 概率 $P_m$。

2. 对初始种群中的每个分子计算 $F(m)$。

3. 在 oracle budget 未耗尽前循环：
   - 根据 $P_c$ 和 $P_m$ 从当前种群中随机采样父代或父代对；
   - 使用 Prompt Module 构造 prompts；
   - 若随机概率小于 $P_{exp}$，则将 experience 加入 prompt；
   - 并行查询 LLM，生成 offspring；
   - 对 offspring 计算 $F(m)$；
   - 若使用 experience，则更新 experience pool；
   - 合并父代与子代；
   - 如果是单目标，或随机概率小于 0.5，则使用 F-value selection；
   - 否则使用 Pareto frontier selection；
   - 进入下一轮。

4. 返回最终种群 $\mathbb{M}_t$。

简化伪代码：

```text
初始化种群 M0
计算每个初始分子的 F-value

while oracle_budget 未耗尽:
    从当前种群采样 crossover / mutation 父代
    构造 prompt
    可选加入 experience
    并行调用 LLM 生成 offspring
    计算 offspring 的目标值和 F-value
    可选更新 experience pool
    合并父代与 offspring
    使用 F-value selection 或 Pareto frontier selection 选出下一代

return 最终种群
```

## 实验设置

### 任务设置

实验任务是无约束分子优化，遵循 PMO benchmark 的 oracle calls 预算设定，预算为 5,000 oracle calls。

作者重点考察初始种群影响，设置三种初始化：

| 初始化类型 | 含义 | 目的 |
|---|---|---|
| worst initial | 从 ZINC250K 中选择 F-value 最差的 100 个分子 | 测试困难优化场景 |
| random initial | 从 ZINC250K 随机选择 100 个分子 | 模拟常见实际使用场景 |
| best initial | 从 ZINC250K 中选择 F-value 最好的 100 个分子 | 测试上限表现 |

主要实验中同时优化五个目标：

- QED ↑；
- SA ↓；
- DRD2 ↓；
- GSK3β ↓；
- JNK3 ↑。

更多目标实验中，作者从 1 个目标逐步增加到 6 个目标：

1. QED ↑；
2. QED ↑ + SA ↓；
3. QED ↑ + SA ↓ + DRD2 ↓；
4. QED ↑ + SA ↓ + DRD2 ↓ + GSK3β ↓；
5. QED ↑ + SA ↓ + DRD2 ↓ + GSK3β ↓ + JNK3 ↑；
6. QED ↑ + SA ↓ + DRD2 ↓ + GSK3β ↓ + JNK3 ↑ + BBBP ↑。

其中 BBBP 是 Blood-Brain Barrier Permeability，被作者视为更复杂、更难预测的性质。

### 评价指标

论文使用以下指标：

| 指标 | 含义 |
|---|---|
| Top 1 F | 最优分子的 F-value |
| Mean Top 10 F | 前 10 个分子的平均 F-value |
| Uniqueness | 有效生成分子中唯一分子的比例 |
| Validity | 生成分子中有效分子的比例 |
| Structural Diversity | 基于 Morgan fingerprints 与 Tanimoto distance 的结构多样性 |
| Efficiency | 运行时间、LLM calls 数量 |

Uniqueness 定义为：

$$
U = 1 - \frac {\mathbb {M} _ {\text { rep }}}{\mathbb {M} _ {\text { all }}}
$$

Validity 定义为：

$$
V = \frac {\mathbb {M} _ {\text { val }}}{\mathbb {M} _ {\text { all }}}
$$

Structural Diversity 定义为：

$$
D (A) = \frac {1}{| A | ^ {2}} \sum_ {(x, y) \in A \times A} T _ {d} (x, y)
$$

### Baselines

论文比较了多类 SOTA 或代表性方法：

| 类别 | 方法 |
|---|---|
| GA | GB-GA |
| BO | GB-BO |
| DL | JT-VAE |
| MCMC | MARS |
| RL | REINVENT |
| LLM/GA | MOLLEO |
| Many-objective/RL 相关 | DyMol |
| GFlowNet/GA | Genetic-GFN |

MOLLM 和 MOLLEO 均使用 ChatGPT 4o。GB-GA、JT-VAE、GB-BO、MARS、REINVENT 使用 PMO benchmark 默认超参数。MOLLEO、DyMol、Genetic-GFN 使用其代码或论文中的默认超参数。

### 模型与实现细节

- 主实验 LLM：ChatGPT 4o。
- 消融实验中还测试了 Llama3-8B。
- 官方 MOLLM 设置中，每次 LLM call 生成 2 个 offspring。
- REINVENT、DyMol、Genetic-GFN 无法显式设置初始种群，因此仅在 random initial 场景下评估。

## 主要结果

### 1. 五目标优化主实验

主实验目标为：

QED↑ + SA↓ + DRD2↓ + GSK3β↓ + JNK3↑

核心结论：

1. 在 worst initial、random initial、best initial 三种设置下，MOLLM 均达到最高或并列最高的 Top 1 F。
2. 在 Mean Top 10 F 上，MOLLM 在三种设置下均优于其他方法。
3. 在 worst initial 和 random initial 中，MOLLM 的 Mean Top 10 F 甚至超过第二名方法的 Top 1 F，说明其收敛质量较强。
4. MOLLM 保持较高 uniqueness，通常超过 90%；相比之下，MOLLEO 的 uniqueness 明显较低。
5. MOLLM 的 top-100 diversity 相对较低，但作者指出，高 diversity 方法往往 Top F 较低，因此需要结合 fitness 一起解释。

关键数值摘要：

| 初始化 | 指标 | MOLLM | 第二梯队/对比情况 |
|---|---:|---:|---|
| worst initial | Top1 F | 4.187 | MOLLEO 4.096，GB-GA 4.048 |
| worst initial | Top10 F | 4.152 | MOLLEO 4.044 |
| random initial | Top1 F | 4.276 | DyMol 4.232，Genetic-GFN 4.157，MOLLEO 4.098 |
| random initial | Top10 F | 4.245 | DyMol 4.164，MOLLEO 4.065 |
| best initial | Top1 F | 4.699 | 与 MOLLEO 4.699 并列 |
| best initial | Top10 F | 4.628 | MOLLEO 4.564 |

### 2. 1 到 6 目标扩展实验

作者在 random initialization 下比较 MOLLM 与 MOLLEO。随着目标数增加，MOLLM 与 MOLLEO 的差距扩大，尤其是在超过 4 个目标后更明显。

关键结果：

| 目标数 | MOLLM Top1 F | MOLLEO Top1 F | MOLLM Top10 F | MOLLEO Top10 F |
|---:|---:|---:|---:|---:|
| 1 | 0.948 | 0.941 | 0.948 | 0.936 |
| 2 | 1.901 | 1.887 | 1.901 | 1.882 |
| 3 | 2.901 | 2.891 | 2.901 | 2.886 |
| 4 | 3.901 | 3.890 | 3.901 | 3.887 |
| 5 | 4.276 | 4.098 | 4.245 | 4.065 |
| 6 | 5.183 | 4.964 | 5.164 | 4.948 |

作者特别指出，在加入 BBBP 作为第六目标后，MOLLM 仍能生成 top-100 分子集合，且所有分子均为 BBB+。这一点说明 MOLLM 对更复杂性质有一定适应能力，但具体 BBBP 预测模型或 oracle 细节在当前摘录中不足，待补充原文/PDF 后确认。

### 3. 运行效率

MOLLM 相比 MOLLEO 显著减少 LLM calls 和运行时间。

| 方法 | LLM calls | 运行时间 |
|---|---:|---:|
| MOLLEO | 8517 | 7.32 小时 |
| MOLLM | 2908 | 0.52 小时 |

论文称，在没有 early stopping 的情况下，MOLLM 的 LLM calls 约为 MOLLEO 的三分之一，运行时间超过 14 倍更快，同时取得更好结果。

### 4. Experience Pool 消融

作者测试 experience 加入 prompt 的概率 $P_{exp}$：

| $P_{exp}$ | Top1 F | Top10 F | Uniqueness | Validity | Diversity |
|---:|---:|---:|---:|---:|---:|
| 0.0 | 4.187 | 4.152 | 0.937 | 0.915 | 0.556 |
| 0.1 | 4.175 | 4.163 | 0.935 | 0.917 | 0.548 |
| 0.3 | 4.154 | 4.124 | 0.961 | 0.903 | 0.544 |
| 0.5 | 4.168 | 4.144 | 0.978 | 0.898 | 0.554 |

结果显示，$P_{exp}=0.0$ 时整体表现最好或最稳。作者认为 molecular space 中局部最优可能较大且相互分离，experience pool 可能让模型过度集中于某个局部最优，削弱探索能力。因此主实验暂时排除 experience pool。

### 5. 多目标选择消融

| 方法 | Top1 F | Top10 F | Uniqueness | Validity | Diversity |
|---|---:|---:|---:|---:|---:|
| without MO selection | 3.830 | 3.791 | 0.999 | 0.816 | 0.842 |
| with MO selection | 4.187 | 4.152 | 0.961 | 0.915 | 0.556 |

移除多目标选择后，Top1 F 和 Top10 F 明显下降，说明 Pareto front selection 与 F-value selection 的混合选择是 MOLLM 的关键设计。

### 6. LLM backbone 与 offspring 数量消融

| 方法 | Top1 F | Top10 F | Uniqueness | Validity | Diversity |
|---|---:|---:|---:|---:|---:|
| GPT-4o direct propose | 3.974 | 3.955 | 0.955 | 0.864 | 0.644 |
| MOLLM (Llama3-8B) | 3.988 | 3.900 | 0.986 | 0.482 | 0.749 |
| 1 offspring each call | 4.068 | 3.980 | 0.969 | 0.942 | 0.575 |
| 3 offspring each call | 4.208 | 4.114 | 0.970 | 0.831 | 0.592 |
| 2 offspring each call | 4.276 | 4.245 | 0.949 | 0.900 | 0.529 |

结论：

- 直接让 GPT-4o 提出 5000 个分子不如 MOLLM，说明框架本身有效。
- 使用较弱的 Llama3-8B 也能达到与部分 baseline 可比的表现，但 validity 较低。
- 每次 LLM call 生成 2 个 offspring 是官方设置，性能优于 1 个和 3 个 offspring 设置，并降低调用成本。

## 创新点

1. **完全 LLM-driven 的遗传操作器**  
   与 MOLLEO 仍依赖 GB-GA 不同，MOLLM 使用 LLM 执行 crossover 和 mutation，使生成环节完全由 LLM 驱动。

2. **将 LLM prompt engineering 与多目标优化框架结合**  
   Prompt 设计包含多目标要求、目标描述、父代目标值、输出格式和可选经验，使 LLM 能通过 in-context learning 利用父代信息。

3. **混合选择策略**  
   通过 F-value selection 与 Pareto front selection 的随机混合，在 exploitation 和 exploration 之间取得平衡。

4. **强调初始种群公平性**  
   系统评估 best initial、worst initial、random initial 三种初始化，指出固定 oracle calls 下初始种群对 GA 类方法影响显著。

5. **无需额外训练且可适配多种 LLM**  
   MOLLM 不需要为不同目标重新训练模型，实验中也展示了 Llama3-8B 作为 backbone 的可行性。

6. **效率提升明显**  
   相比 MOLLEO，MOLLM 显著减少 LLM calls 和运行时间。

## 局限性

1. **结构多样性仍有提升空间**  
   MOLLM 的 top-100 diversity 在部分设置中低于一些 baseline，说明其可能更偏向高 fitness 区域，探索结构多样性的能力仍可改进。

2. **Experience Pool 当前未带来收益**  
   虽然 experience pool 设计符合人类迭代总结经验的直觉，但实验中会降低性能，说明经验总结方式、使用频率或 prompt 注入方式需要重新设计。

3. **Validity 不总是最优**  
   在 best initial 场景中 MOLLM validity 为 0.790，低于多种 baseline；Llama3-8B 版本 validity 也较低，说明 LLM 生成 SMILES 的语法与化学有效性仍是问题。

4. **对 oracle 和性质预测器依赖较强**  
   分子性质评价依赖 oracle。当前摘录没有完整说明每个性质的 oracle 实现细节，待补充原文/PDF 后确认。

5. **代码与可复现性信息不足**  
   当前解析文本中未发现明确代码仓库或实验脚本链接，因此复现实验所需细节可能不足，待补充原文/PDF 后确认。

6. **伦理与双重用途风险**  
   虽然作者声明 MOLLM 不直接面向有害分子生成，但任何分子生成模型都可能存在 dual-use 风险，需要生物安全和监管约束。

## 相关概念

- [[多目标优化]]
- [[无约束分子优化]]
- [[分子优化]]
- [[大语言模型]]
- [[QED]]
- [[Oracle Calls]]
- [[Pareto Front]]
- [[分子生成]]
## 相关方法

- [[MOLLM]]
- [[GB-GA]]
- [[GB-BO]]
- [[MOLLEO]]
- [[REINVENT]]
- [[MARS]]
- [[Prompt Engineering]]
## 相关数据集

- [[ZINC]]
## 相关模型

- [[GPT-4o]]
- [[Llama]]
- [[MOLLM]]
## 相关论文

- [[Efficient evolutionary search over chemical space with large language models]]
- [[Sample efficiency matters: a benchmark for practical molecular optimization]]
- [[A graph-based genetic algorithm and generative model/monte carlo tree search for the exploration of chemical space]]
- [[Mars: Markov molecular sampling for multi-objective drug discovery]]
- [[Lico: Large language models for in-context molecular optimization]]
- [[Large language models as evolutionary optimizers]]

## 源文件

- citekey: ranMOLLMMultiObjectiveLarge
- title: MOLLM: Multi-Objective Large Language Model for Molecular Design – Optimizing with Experts
- authors: Nian Ran, Yue Wang, Richard Allmendinger
- year: 待补充原文/PDF 后确认
- venue: 待补充原文/PDF 后确认
- DOI: 待补充原文/PDF 后确认
- collections: 多目标分子优化
- 正文来源：MinerU full.md

## 代码与数据

### 代码

未在当前解析文本中发现明确代码仓库。

### 数据集 / Benchmark

未在当前解析文本中发现明确数据集或 benchmark 链接。

### 其他链接

- https://arxiv.org/abs/1708.08227
- https://arxiv.org/abs/2407.21783
- https://openreview.net/forum?id=B4q98aAZwt
- https://doi.org/10.24963/ijcai.2024/666
- https://arxiv.org/abs/2309.03409
- https://arxiv.org/abs/2308.10144

## Zotero 原始摘要

Molecular design plays a critical role in advancing fields such as drug discovery, materials science, and chemical engineering. This work introduces the Multi-Objective Large Language Model for Molecular Design (MOLLM), a novel framework that combines domain-specific knowledge with the adaptability of Large Language Models to optimize molecular properties across multiple objectives. Leveraging in-context learning and multi-objective optimization, MOLLM achieves superior efficiency, innovation, and performance, significantly surpassing state-of-the-art (SOTA) methods. Recognizing the substantial impact of initial populations on evolutionary algorithms, we categorize them into three types: best initial, worst initial, and random initial, to ensure the initial molecules are the same for each method across experiments. Our results demonstrate that MOLLM consistently outperforms SOTA models in all of our experiments. We also provide extensive ablation studies to evaluate the superiority of our components.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的关键价值不只是“用 LLM 做分子生成”，而是把 LLM 放进了一个更严格的多目标进化优化框架中。相比直接让 LLM 生成分子，MOLLM 通过父代分子、目标值、目标描述和选择机制形成闭环，使 LLM 的生成能力被 oracle 反馈持续筛选和放大。

我认为最值得注意的是两点：

1. **初始化设置的严谨性**  
   作者指出初始种群对 GA 类方法影响很大，并专门设置 best/worst/random 三类初始条件。这对分子优化 benchmark 很重要，因为固定 oracle calls 下，初始分子越好，最终结果自然可能越好。如果不控制这一点，不同方法之间比较容易不公平。

2. **Experience Pool 的负结果很有启发**  
   直觉上，把历史经验加入 prompt 应该有帮助，但实验显示会降低优化性能。这说明分子空间中的“经验总结”可能容易让 LLM 锁定局部规律，而不是更广泛探索。对于 LLM-driven optimization，经验记忆不一定越多越好，关键是如何避免过度 exploitation。

整体看，MOLLM 可以理解为一种“LLM 作为可迁移化学启发式算子 + 多目标进化选择”的框架。它不需要重新训练，适合快速适配不同目标组合；但它的最终效果仍受到 LLM 生成有效 SMILES 的能力、oracle 质量、prompt 设计和选择策略影响。

## 后续问题

1. 每个性质目标的 oracle 具体如何实现？尤其是 DRD2、JNK3、GSK3β、BBBP 的预测模型或评分函数是什么？
2. MOLLM 的 prompt 模板完整文本是什么？不同目标描述是否需要人工设计？
3. 论文是否提供代码仓库？如果没有，如何复现 LLM 并行调用、去重、有效性过滤和 oracle 计算？
4. Pareto front selection 的具体实现细节是什么？如果 Pareto 前沿数量超过或少于 $N$，如何截断或补齐？
5. 每轮生成多少 offspring？种群大小 $N$ 与 oracle budget 的具体关系如何？
6. 对无效 SMILES 的处理方式是什么？是否计入 oracle calls？
7. Experience Pool 的具体 prompt 格式是什么？是否可以通过更结构化的经验表示避免局部最优陷阱？
8. MOLLM 在真实湿实验成本更高的任务中是否仍具备优势？
9. Diversity 较低是否会影响后续药物发现中的 novelty、scaffold diversity 或可专利性？
10. 如果使用更强或更便宜的开源化学 LLM，MOLLM 的性能/成本曲线会如何变化？
