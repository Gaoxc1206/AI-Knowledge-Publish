---
type: paper
citekey: "deyLargeLanguageModels2025"
title: "可控多属性多目标分子优化的大语言模型"
chinese_title: "可控多属性多目标分子优化的大语言模型"
authors: "Vishal Dey, Xiao Hu, Xia Ning"
year: "2025"
venue: ""
doi: "10.48550/ARXIV.2505.23987"
zotero_collections:
  - "多目标分子优化"
status: imported
reading_status: inbox
tags:
  - paper
aliases:
  - "可控多属性多目标分子优化的大语言模型"
  - "Large Language Models for Controllable Multi-property Multi-objective Molecule Optimization"
original_title: "Large Language Models for Controllable Multi-property Multi-objective Molecule Optimization"
---
## 一句话总结

论文 **Large Language Models for Controllable Multi-property Multi-objective Molecule Optimization** 提出面向可控多属性、多目标分子优化的指令微调数据集 **C-MuMOInstruct**，并基于该数据集训练 **GeLLM4O-C** 系列模型，使 LLM 能按属性级目标选择性提升部分分子性质、同时维持已达标性质，在 IND 与 OOD 任务上显著优于通用 LLM 和化学基础 LLM 基线。

## 研究问题

现实药物设计中的 lead optimization 往往不是“所有性质都越高越好”或“所有性质同时改善”，而是更细粒度的目标组合：

- 对尚未达标的性质进行改进，例如提高 BBBP、提高 DRD2 inhibition、降低 Mutagenicity。
- 对已经满足药物相关要求的性质保持稳定，例如维持 HIA 或 QED。
- 在结构相似性约束下进行分子修改，尽量保留 hit molecule 的核心 scaffold。
- 面对不同药物场景，需要处理不同属性组合和不同优化方向。

论文将这一设定称为 **controllable multi-property, multi-objective optimization，C-MuMO**。核心研究问题是：如何构建能让大语言模型理解并执行“属性级可控目标”的分子优化数据与模型，使其不仅能在已见任务上有效优化，还能 0-shot 泛化到未见属性组合和未见指令表达？

## 背景与动机

药物研发周期长、成本高，论文引用的背景是新药开发通常需要十年以上和约 20 亿美元。Lead optimization 是其中关键阶段，需要把早期具有一定活性的 hit molecules 优化为更接近候选药物的 lead molecules。

传统分子优化方法和已有 LLM 分子优化方法存在几个不足：

1. **目标过于粗粒度**  
   许多方法只能处理单属性或少量属性优化，或者把所有属性统一设为“同时改善”，无法表达“提升 A、降低 B、保持 C”的真实需求。

2. **多目标方法依赖人工 reward 或任务特定调参**  
   现有多目标优化方法通常需要手工设计 reward function，并针对特定任务调参，难以扩展到大量属性组合。

3. **已有指令微调数据集不支持属性级控制**  
   例如 **MuMOInstruct** 支持多属性优化，但主要是所有属性同时改善；**MolOpt-Instructions** 支持阈值式优化，但不是现实的多目标属性级控制设定。本文提出的 **C-MuMOInstruct** 试图补上这一空缺。

4. **真实药物优化存在属性冲突**  
   例如中枢神经系统药物可能需要较高 BBBP 和 DRD2 inhibition，同时又要降低 hERG inhibition、Mutagenicity、Carcinogenicity 等毒性相关性质。这类 trade-off 是简单“全属性提升”无法覆盖的。

## 核心思想

论文的核心思想是：把真实 lead optimization 中的目标拆解为“每个属性的具体目标”，并用自然语言指令显式表达这些目标，从而让 LLM 学会根据不同属性组合进行结构修改。

具体包括三层：

1. **任务定义层：C-MuMO**
   - 输入：hit molecule $M_x$。
   - 输出：优化后的 lead molecule $M_y$。
   - 约束：
     - $M_y$ 与 $M_x$ 保持结构相似；
     - 对 sub-optimal properties，按属性特定阈值 $\Delta_p$ 改善；
     - 对 near-optimal properties，变化幅度不超过 $\Delta_p$，保持稳定。

2. **数据层：C-MuMOInstruct**
   - 从分子对中筛选满足结构相似、属性改善、属性稳定约束的样本。
   - 涵盖 10 个药物相关分子性质。
   - 构造 28,266 个任务，其中 27,401 个任务涉及至少 3 个属性。
   - 通过多种自然语言模板生成多样化指令。

3. **模型层：GeLLM4O-C**
   - 使用 **C-MuMOInstruct** 对通用 LLM 进行 instruction tuning。
   - 包括 specialist 与 generalist 两类模型：
     - specialist 模型针对单一属性组合训练；
     - generalist 模型在多种属性组合和目标上联合训练，用于泛化到未见任务。

## 方法框架

![[raw/zotero/images/多目标分子优化/2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025/mineru-figure-01.jpg]]

图 1 展示了 **C-MuMOInstruct** 与 **GeLLM4O-C** 的整体框架。核心流程是先从分子对中构造带属性级目标的指令微调数据，再用这些数据训练能够执行可控多属性多目标分子优化的 LLM。

### C-MuMOInstruct 的设计原则

论文列出 5 个设计原则：

1. **Real-world relevance**  
   任务应反映真实 lead optimization 中 ADMET、毒性、药效相关属性之间的复杂权衡。

2. **Controllable multi-property threshold-based optimization**  
   每个属性有明确方向和阈值目标，区分需要改善的 sub-optimal properties 和需要维持的 near-optimal properties。

3. **Comprehensive coverage**  
   数据覆盖 10 个药物相关属性，并系统组合出大量多属性任务。

4. **Pairwise optimization**  
   使用分子对 $(M_x, M_y)$ 建模结构修改与属性变化之间的关系。

5. **Diverse instructions**  
   为每个任务生成不同自然语言表达，减少模型对单一模板的过拟合。

### 涉及的 10 个分子性质

论文覆盖以下 10 个性质：

| 属性 | 含义 | 期望方向 |
|---|---|---|
| PlogP | Penalized LogP，综合溶解性、脂溶性、合成可及性和环复杂度 | 越高越好 |
| QED | Quantitative Estimate of Drug-Likeness | 越高越好 |
| AMP | Parallel Artificial Membrane Permeability Assay | 越高越好 |
| BBBP | Blood-Brain Barrier Permeability | CNS 药物通常越高越好 |
| HIA | human Intestinal Absorption | 越高越好 |
| hERG | human Ether-à-go-go Related Gene inhibition | 越低越好 |
| CARC | Carcinogenicity | 越低越好 |
| MUT | Mutagenicity | 越低越好 |
| LIV / DILI | Drug-induced Liver Injury | 越低越好 |
| DRD2 | Dopamine Receptor D2 Inhibition | 抗精神病药场景通常越高越好 |

### 数据集规模对比

论文 Table 1 对比了 **MolOpt-Instructions**、**MuMOInstruct** 与 **C-MuMOInstruct**。关键差异如下：

| 数据集 | Multi-objective | Threshold-based | Realistic | 属性数 | 分子数 | 分子对数 | 总任务数 |
|---|---:|---:|---:|---:|---:|---:|---:|
| MolOpt-Instructions | 否 | 是 | 否 | 5 | 1,595,839 | 1,029,949 | 8 |
| MuMOInstruct | 否 | 否 | 是 | 6 | 331,586 | 255,174 | 63 |
| C-MuMOInstruct | 是 | 是 | 是 | 10 | 433,166 | 256,185 | 28,266 |

这里的 “Multi-objective” 指论文定义下的属性级多目标控制，而不是简单多属性同时提升。

## 算法流程

论文在 Appendix B 中给出 **Algorithm A1: C-MuMO Task Construction from a Molecule Pair**。其目标是从一个分子对 $(M_x, M_y)$ 中枚举所有有效的 C-MuMO 任务。

### 任务构造流程概括

1. 输入一个分子对 $(M_x, M_y)$、每个属性的药物相关阈值 $\Theta_p$、改善阈值 $\Delta_p$，以及属性集合 $P$。
2. 计算每个属性从 $M_x$ 到 $M_y$ 的变化。
3. 判断属性变化方向是否符合该属性的期望方向，例如 QED 越高越好，hERG 越低越好。
4. 识别：
   - 可作为需要改善目标的属性集合；
   - 可作为需要保持稳定目标的属性集合。
5. 枚举属性子集，构造包含 improve 与 maintain 目标的任务。
6. 如果分子对方向与目标改善方向相反，则交换 $M_x$ 与 $M_y$，保证输入到输出是朝期望方向优化。
7. 输出该分子对对应的所有有效 C-MuMO 任务。

### 训练与推理流程

1. **数据构造**
   - 训练对来自 Chen et al. (2021) 构建的数据，包含满足 Tanimoto similarity > 0.6 的分子对。
   - 从其中随机采样 100K 分子对运行任务构造算法。
   - 每个 C-MuMO 任务最多使用 100 个分子对，以平衡效率与任务多样性。

2. **指令构造**
   - 每条样本包含一般任务指令、输入 SMILES、需要调整的属性及阈值、目标 SMILES。
   - 使用 6 种 general instruction 模板和 5 种 adjustment 模板，组合得到 30 种表达。
   - 每个任务保留一条未见 instruction 用于测试模型对新表述的泛化能力。

![[raw/zotero/images/多目标分子优化/2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025/mineru-figure-02.jpg]]

图 2 来自附录上下文，展示了通用 LLM 使用的 prompt 示例。该示例要求模型修改一个 SMILES 分子，同时降低 Mutagenicity、提高 QED 和 DRD2 inhibition，并保持 Intestinal adsorption 不变，体现了 C-MuMO 的属性级目标表达方式。

![[raw/zotero/images/多目标分子优化/2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025/mineru-figure-03.jpg]]

图 3 来自附录上下文，可能对应 **LlaSMol** prompt 示例或分子优化 case 示例；当前解析文本未给出明确图注，需要待补充原文/PDF 后确认。它仍反映了论文在附录中对不同模型提示格式或优化案例的可视化说明。

3. **模型训练**
   - Backbone：
     - **Mistral-7B-Instruct-v0.3**
     - **Llama3.1-8B-Instruct**
   - 微调方式：
     - 使用 **LoRA**；
     - 应用于所有 projection layers 和 language modeling head；
     - rank = 16，alpha = 16，dropout = 0.05；
     - learning rate = $1 \times 10^{-4}$，cosine scheduler，5% warm-up。
   - specialist 模型：
     - batch size 32；
     - 训练 10 epochs。
   - generalist 模型：
     - batch size 128；
     - N ≤ 4 时训练 5 epochs；
     - N = 10 时训练 1,800 steps。
   - 训练成本：
     - 单张 NVIDIA A100 40GB；
     - specialist 约 1 小时；
     - generalist 约 8–20 小时；
     - 总训练约 150 GPU hours。

4. **推理**
   - GeLLM4O-C 均采用 0-shot evaluation。
   - 每个输入分子通过 beam search 生成 20 个候选分子。
   - beam width = 20。
   - 若多个候选满足目标，选择累计改善最高者用于评估。

## 实验设置

### 任务划分

论文评估包括 10 个代表性属性组合，共 119 个多目标任务：

- 5 个 IND property combinations，共 51 个任务；
- 5 个 OOD property combinations，共 68 个任务。

IND 表示训练中出现过的属性组合；OOD 表示训练中未出现过的属性组合和目标组合，但单个属性本身仍可能在其他组合中出现。

### IND 任务

| 任务 | 属性组合 | 任务数 | 类别 |
|---|---|---:|---|
| BPQ | BBBP, PlogP, QED | 7 | CS |
| ELQ | hERG, LIV, QED | 7 | GT |
| ACEP | AMP, CARC, hERG, PlogP | 15 | GT |
| BDPQ | BBBP, DRD2, PlogP, QED | 13 | CS |
| DHMQ | DRD2, HIA, MUT, QED | 9 | CS |

### OOD 任务

| 任务 | 属性组合 | 任务数 | 类别 |
|---|---|---:|---|
| CDE | CARC, DRD2, hERG | 6 | CS |
| ABMP | AMP, BBBP, MUT, PlogP | 15 | CS |
| BCMQ | BBBP, CARC, MUT, QED | 15 | CS |
| BDEQ | BBBP, DRD2, hERG, QED | 11 | CS |
| HLMPQ | HIA, LIV, MUT, PlogP, QED | 21 | GT |

其中：

- **GT**：General Drug-Likeness and Toxicity，偏通用药物性与毒性目标；
- **CS**：Context-Specific Objectives，涉及治疗场景相关属性，例如 DRD2 inhibition 或 BBBP。

### 测试集构造

测试集来自 **ZINC**：

- 随机采样 250K 分子；
- 满足 Lipinski's rule of 5；
- 与训练集无重叠，以避免数据泄露；
- 每个评估属性组合随机采样 500 个测试分子；
- 测试分子需满足：待改善属性低于阈值，待维持属性已超过阈值。

### Baselines

论文比较两类主要 baseline：

1. **General-purpose LLMs**
   - Mistral-7B Instruct-v0.3
   - Llama-3.1 8B-Instruct
   - Claude-3.5
   - GPT-4o

2. **Foundational LLMs for Chemistry**
   - LlaSMol_Mistral
   - ChemDFM 在附录中提到，正文主表主要报告 LlaSMol_Mistral。

通用 LLM 使用 0-shot 和 1-shot prompting。作者说明 1-shot 是成本与性能之间的折中，初步实验中 5-shot 改善不明显。LlaSMol 使用适配其格式的简化 prompt。

### 评价指标

论文主要报告：

| 指标 | 含义 | 越大越好？ |
|---|---|---|
| SR | Success Rate，至少一个候选分子满足所有属性目标的比例 | 是 |
| Sim | 与输入分子的 Tanimoto similarity | 是 |
| RI | Relative Improvement，待改善属性的平均相对改善 | 是 |

附录还报告：

- Strict Success Rate $SR_\Theta$
- Validity
- Novelty
- Synthetic Accessibility Score
- Average Property Score

## 主要结果

### 总体发现

论文总结了 4 个主要发现：

1. **GeLLM4O-C 在 IND 与 OOD 上均显著优于 baselines**  
   相比最佳 baseline，最高取得 126% 更高 SR 和 143% 更高 RI。

2. **generalist 通常优于 specialist**  
   在 5 个 IND 属性组合中，generalist GeLLM4O-C 在 4 个上超过 specialist，尤其在训练样本较少或任务复杂时更明显。

3. **generalist 具备较强 0-shot OOD 泛化能力**  
   在未见属性组合和未见目标上，GeLLM4O-C-P(10) 仍显著优于通用 LLM 与化学 LLM。

4. **对未见 instruction 有较强鲁棒性**  
   generalist 模型在 hold-out instruction 上性能更稳定，说明其不是简单记忆模板。

### IND 结果

在 IND 任务中，所有 specialist 和 generalist GeLLM4O-C 都整体优于通用 LLM 与 LlaSMol_Mistral。

论文中几个关键结论：

- **GeLLM4O-C-P(10)_Mistral** 相比最佳 baseline，在平均 SR 上提升 37%，在平均 RI 上提升 102%。
- 在 BDPQ 与 DHMQ 这类涉及 DRD2 inhibition 的复杂任务上，GeLLM4O-C 可比 baseline 多成功优化最高 150% 和 126% 的输入分子。
- 在更严格的 $SR_\Theta$ 指标下，generalist GeLLM4O-C 相比最佳 baseline 最高提升 218% SR 和 313% RI。

部分代表性 IND SR 结果：

| 任务 | 最佳 baseline SR | GeLLM4O-C 代表性最佳 SR | 观察 |
|---|---:|---:|---|
| BPQ | LlaSMol-M 78.20 | GeLLM4O-C-P(10)_Mistral 89.40 | generalist 表现强 |
| ELQ | LlaSMol-M 81.40 | GeLLM4O-C-P(N)_Llama 90.80 | generalist 最优 |
| ACEP | LlaSMol-M 68.60 | GeLLM4O-C-P(N)_Llama 92.80 | 提升明显 |
| BDPQ | LlaSMol-M 22.60 | GeLLM4O-C-N_Mistral 56.60 | specialist 最优 |
| DHMQ | Mistral 1-shot 25.60 / LlaSMol-M 24.80 | GeLLM4O-C-P(N)_Mistral 53.40 | 复杂任务提升显著 |

需要注意：GeLLM4O-C 的 Sim 有时低于 baseline，说明其为达到属性目标可能进行了更大的结构修改。论文仍强调 lead optimization 中结构相似性重要，但 SR 和 RI 的提升伴随一定 similarity trade-off。

### Specialist 与 Generalist 对比

generalist 模型通常更强，原因是：

- 能从更多属性组合中学习可迁移的化学修改策略；
- 对训练样本较少的任务更有帮助；
- 对未见指令更鲁棒。

但也存在例外：

- 在 BDPQ 上，specialist GeLLM4O-C-N_Mistral 优于 generalist。
- 作者推测原因是 BDPQ 有特定属性 trade-off，generalist 尤其是 P(10) 训练时接触了大量可能冲突的目标，可能削弱对该特定 trade-off 的专门能力。

这说明 foundation-style 多任务训练虽能提升泛化，但也可能引入任务冲突。

### OOD 结果

OOD 任务中只评估 generalist GeLLM4O-C-P(10)，因为 specialist 和 GeLLM4O-C-P(N) 使用了任务特定属性组合，不适用于 OOD。

代表性 OOD SR 结果：

| 任务 | 最佳 baseline SR | GeLLM4O-C-P(10)_Mistral SR | 提升情况 |
|---|---:|---:|---|
| CDE | Mistral 1-shot 30.60 | 39.80 | 明显提升 |
| ABMP | Mistral 1-shot 73.20 | 86.60 | 明显提升 |
| BCMQ | LlaSMol_Mistral 72.80 | 84.20 | 明显提升 |
| BDEQ | Mistral 1-shot 21.60 | 29.20 | 提升 |
| HLMPQ | Mistral 1-shot 55.60 | 74.60 | 明显提升 |

论文称最佳 generalist 模型 **GeLLM4O-C-P(10)_Mistral** 在所有 OOD 任务上平均 SR 为 63%，相比最佳 baseline **Mistral 1-shot**，SR 最高提升 35%，RI 提升 77%。

### 未见指令泛化

在使用 hold-out instruction 和不同属性名称进行测试时：

- specialist 模型在 5 个 IND 组合中的 2 个出现超过 5% 的 SR 下降；
- generalist 模型在所有任务上表现更稳定；
- **GeLLM4O-C-P(10)_Llama** 比 **GeLLM4O-C-P(10)_Mistral** 更鲁棒，作者认为这可能反映其较少过拟合特定 wording。

## 创新点

1. **提出 C-MuMO 任务设定**  
   将现实 lead optimization 中“改善部分属性、维持部分属性”的目标形式化为可控多属性多目标分子优化。

2. **构建 C-MuMOInstruct 数据集**  
   这是论文声称的第一个面向属性级目标控制的多属性多目标分子优化 instruction-tuning dataset，覆盖 10 个属性、28,266 个任务。

3. **把属性级目标写入自然语言指令**  
   每个任务明确说明需要提高、降低或保持哪些属性，并给出阈值，使 LLM 学习更细粒度的分子编辑策略。

4. **提出 GeLLM4O-C 系列模型**  
   通过对 Mistral 和 Llama 进行 LoRA instruction tuning，使其具备可控分子优化能力。

5. **系统评估 IND 与 OOD 泛化**  
   不仅测试已见属性组合，还测试未见属性组合和未见指令，证明 generalist 模型具有一定 foundation model 潜力。

6. **强调真实药物优化的 trade-off**  
   数据和任务设计显式涵盖 ADMET、毒性、药效相关属性之间的冲突，而不是单纯追求所有分数上升。

## 局限性

论文明确列出以下局限：

1. **当前框架是 single-step optimization**  
   现实中分子可能需要多轮迭代修改才能让所有属性达到药物相关阈值。如何为 GeLLM4O-C 设计反馈机制或中间 reward signal 是未来方向。

2. **依赖计算性质预测器**  
   数据集中的分子性质由 ADMET-AI、DRD2/PlogP 相关工具等计算得到。这些工具虽常用，但可能与真实实验结果存在偏差。

3. **指令模板仍是合成生成的**  
   尽管使用多样化模板并测试未见指令，但这些指令仍来自人工模板与 GPT-4o 改写，不能完全代表真实开放式用户表达。

4. **潜在安全与误用风险**  
   虽然目标是降低毒性相关属性，但模型基于开放 LLM 微调，可能仍保留生成有害化合物的知识。论文建议部署时配合毒性筛查、专家审查和使用控制。

5. **Sim 与优化成功之间存在 trade-off**  
   实验表中 GeLLM4O-C 的 similarity 有时低于 baseline，说明更强属性优化可能伴随更大结构变化。论文未充分讨论在具体药物项目中如何设定可接受的结构修改边界。

## 相关概念

- [[可控多属性多目标分子优化]]
- [[分子优化]]
- [[Lead Optimization]]
- [[多目标优化]]
- [[ADMET]]
- [[大语言模型]]
- [[SMILES]]
- [[Tanimoto Similarity]]
- [[QED]]
- [[PlogP]]
## 相关方法

- [[Instruction Tuning]]
- [[LoRA]]
- [[Beam Search]]
- [[Prompt Engineering]]
- [[C-MuMO任务构造]]
## 相关数据集

- [[ZINC]]
- [[C-MuMOInstruct]]
- [[MuMOInstruct]]
- [[SMolInstruct]]
## 相关模型

- [[GPT-4o]]
- [[Claude-3.5]]
- [[Claude]]
- [[Llama]]
- [[Mistral]]
- [[ChemDFM]]
- [[GeLLM4O-C|GeLLM]]
- [[GeLLM4O-C]]
- [[GeLLM4O-Cs]]
- [[LlaSMol]]
## 相关论文

- [[Dey et al. 2025 GeLLM3O]]
- [[Ye et al. 2025 DrugAssist]]
- [[Yu et al. 2024 LlaSMol]]
- [[Chen et al. 2021 Modof]]
- [[Gao et al. 2022 Practical Molecular Optimization Benchmark]]
- [[Wu et al. 2024 PromptMolOpt]]

## 源文件

- citekey: `deyLargeLanguageModels2025`
- title: **Large Language Models for Controllable Multi-property Multi-objective Molecule Optimization**
- authors: Vishal Dey, Xiao Hu, Xia Ning
- year: 2025
- DOI: 10.48550/ARXIV.2505.23987
- collections: 多目标分子优化
- 正文来源：MinerU full.md
- PDF 标注：暂无从 Zotero 读取到的 PDF 标注
- Zotero 子笔记：暂无 Zotero 子笔记

## 代码与数据

### 代码

- https://github.com/ninglab/GeLLMO-C
- https://github.com/ninglab/GeLLMO-C”。具体模型权重下载方式待补充原文/PDF
- https://github.com/ziqi92/Modof
- https://huggingface.co/datasets/osunlp/SMolInstruct
- https://huggingface.co/OpenDFM/ChemDFM-v1.5-8B
- https://docs.anthropic.com/claude/reference/getting-started-with-the-api

### 数据集 / Benchmark

- https://openai.com/api/
- https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct
- https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3

### 其他链接

未在当前解析文本中发现其他外部资源链接。

## Zotero 原始摘要

In real-world drug design, molecule optimization requires selectively improving multiple molecular properties up to pharmaceutically relevant levels, while maintaining others that already meet such criteria. However, existing computational approaches and instructiontuned LLMs fail to capture such nuanced property-specific objectives, limiting their practical applicability. To address this, we introduce C-MuMOInstruct, the first instructiontuning dataset focused on multi-property optimization with explicit, property-specific objectives. Leveraging C-MuMOInstruct, we develop GeLLM4O-Cs, a series of instructiontuned LLMs that can perform targeted propertyspecific optimization. Our experiments across 5 in-distribution and 5 out-of-distribution tasks show that GeLLM4O-Cs consistently outperform strong baselines, achieving up to 126% higher success rate. Notably, GeLLM4O-Cs exhibit impressive 0-shot generalization to novel optimization tasks and unseen instructions. This offers a step toward a foundational LLM to support realistic, diverse optimizations with property-specific objectives. C-MuMOInstruct and code are accessible through https:// github.com/ninglab/GeLLMO-C.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的关键价值不只是“用 LLM 做分子优化”，而是把分子优化任务从粗粒度的“提高属性”推进到更接近真实药物项目的“属性级目标控制”。在真实 lead optimization 中，某些性质已经达标，继续大幅改变反而可能破坏已有优势；另一些性质则必须被提升或降低到足够有意义的范围。C-MuMOInstruct 正是把这种任务结构数据化、指令化。

从实验看，GeLLM4O-C 的优势主要来自两点：

1. 它不是单纯依赖 prompt 让通用 LLM 猜分子修改，而是通过大量分子对学习结构变化与属性变化之间的经验映射。
2. generalist 训练让模型见到足够多的属性组合，因此可以在 OOD 组合上迁移已学到的修改策略。

但这类方法仍然依赖计算 oracle。模型优化的是预测器分数，不一定等同于真实实验性质。因此它更适合作为虚拟筛选和 early-stage lead optimization 的候选生成模块，而不是直接替代实验验证。

另一个值得注意的问题是 similarity。表中很多 GeLLM4O-C 的 Sim 低于 baseline，这说明高 SR/RI 可能需要更大结构改动。实际药物优化中，是否接受这种改动取决于项目阶段、专利空间、合成可行性、靶点结合模式等因素。未来如果结合 docking、合成路线、实验反馈或多轮人机交互，可能会更实用。

## 后续问题

1. C-MuMOInstruct 中 10 个属性的预测器误差有多大？不同属性预测误差是否会影响模型学到的优化策略？
2. GeLLM4O-C 生成的分子在 novelty、SAS、validity 上的完整表现如何？正文只重点讨论 SR、Sim、RI。
3. 如果把 Sim 约束设得更严格，GeLLM4O-C 的 SR 会下降多少？
4. 该方法能否扩展到 docking score、binding affinity、selectivity、metabolic stability 等更接近项目决策的属性？
5. 多轮优化时如何避免模型每一步都朝 predictor loophole 方向偏移？
6. Generalist 模型中的任务冲突如何缓解？是否可以使用 task routing、adapter composition 或 preference-based multi-objective control？
7. C-MuMOInstruct 中的属性阈值 $\Theta_p$ 使用训练分子 60th percentile，是否足够代表真实药物相关阈值？
8. 论文提到代码、数据和模型均在 GitHub 可访问，具体是否包含完整训练数据、模型权重和评估脚本，需要进一步查看仓库确认。
