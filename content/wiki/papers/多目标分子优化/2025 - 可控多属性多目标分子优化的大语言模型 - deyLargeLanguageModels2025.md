---
type: paper
citekey: "deyLargeLanguageModels2025"
zotero_key: "X2QIHFRH"
title: "可控多属性多目标分子优化的大语言模型"
chinese_title: "可控多属性多目标分子优化的大语言模型"
authors: "Vishal Dey, Xiao Hu, Xia Ning"
year: "2025"
venue: ""
doi: "10.48550/ARXIV.2505.23987"
zotero_collections:
  - "多目标分子优化"
source_pdf: "raw/zotero/pdfs/多目标分子优化/2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025.pdf"
status: imported
reading_status: inbox
tags:
  - paper
aliases:
  - "可控多属性多目标分子优化的大语言模型"
  - "Large Language Models for Controllable Multi-property Multi-objective Molecule Optimization"
original_title: "Large Language Models for Controllable Multi-property Multi-objective Molecule Optimization"
---
# Large Language Models for Controllable Multi-property Multi-objective Molecule Optimization

## 一句话总结

这篇论文提出了面向可控多属性多目标分子优化的指令微调数据集 **C-MuMOInstruct**，并基于该数据集训练了 **GeLLM4O-Cs** 系列大语言模型，使模型能够按属性级目标选择性提升某些分子性质、同时保持其他已达标性质，在 IND 与 OOD 任务上显著优于通用 LLM 和化学基础 LLM。

## 研究问题

现实药物设计中的先导化合物优化并不是简单地“所有性质都同时提高”，而是经常需要：

- 对尚未达到药物相关水平的性质进行提升；
- 对已经达到较好水平的性质保持稳定；
- 在多个相互竞争或冲突的性质之间进行权衡；
- 尽量保持输入分子的结构相似性与核心骨架。

论文将这一问题定义为 **controllable multi-property, multi-objective optimization (C-MuMO)**，即可控多属性多目标优化。

具体任务是：给定一个 hit molecule $M_x$，通过结构修改生成 lead molecule $M_y$，使其满足：

1. 与原分子保持较高结构相似性；
2. 对 sub-optimal properties 按属性级阈值 $\Delta_p$ 进行改进；
3. 对 near-optimal properties 保持在允许变化范围内；
4. 通过自然语言指令显式指定每个属性的优化目标。

## 背景与动机

药物发现通常耗时超过十年、成本超过 20 亿美元。先导化合物优化是其中关键阶段，需要在生物活性、吸收、分布、代谢、排泄、毒性和药物相似性等多种性质之间做权衡。

传统分子优化方法存在几个问题：

- 许多方法主要处理单属性或双属性优化；
- 多目标优化方法往往依赖人工设计的 reward function；
- 不同任务需要任务特定调参，扩展性差；
- 部分方法可能生成全新 scaffold，不一定符合先导优化中“尽量小改”的实际需求；
- 现有 instruction-tuned LLM，如前作 **MuMOInstruct / GeLLM^3O**，虽然能处理多属性优化，但主要是“所有属性同时提升”，不能表达“提升 A、保持 B、降低 C”这类属性级目标。

论文认为，真实药物优化更需要属性特异性目标：

- CNS 药物可能需要较高 **BBBP** 以通过血脑屏障；
- 抗精神病药可能需要较高 **DRD2 inhibition**；
- 同时需要较低 **hERG inhibition**，以降低心脏毒性风险；
- 如果 **HIA** 已经较好，则应保持而非继续盲目修改。

因此，作者提出 **C-MuMOInstruct** 和 **GeLLM4O-Cs**，试图构建能够支持真实、多样、可控优化需求的分子优化 LLM。

## 核心思想

核心思想是：将多属性分子优化重构为一种可由自然语言指令控制的属性级目标优化问题。

论文中的关键设计包括：

1. **属性级控制**
   - 每个属性可以被指定为需要改善或需要保持；
   - 不再假设所有属性都要同时提升。

2. **阈值驱动优化**
   - 对每个属性设定药物相关阈值 $\Theta_p$；
   - 对每个需改善属性设定最小改善幅度 $\Delta_p$。

3. **成对分子优化**
   - 使用满足结构相似性、属性改进、属性稳定约束的 molecule pairs；
   - 让模型从 $M_x \rightarrow M_y$ 的样本中学习结构修改与属性变化之间的关系。

4. **指令微调 LLM**
   - 将分子优化表示为 SMILES-to-SMILES 的指令跟随任务；
   - 训练 LLM 根据自然语言说明修改分子。

5. **specialist 与 generalist 模型并行**
   - specialist model 专门学习某个属性组合；
   - generalist model 学习多种属性组合与目标，获得跨任务泛化能力。

## 方法框架

论文整体框架由两部分组成：

### 1. C-MuMOInstruct 数据集

**C-MuMOInstruct** 是论文提出的指令微调数据集，面向可控多属性多目标优化。

数据集特征：

- 涉及 10 个药物相关分子性质；
- 包含 28,266 个 optimization tasks；
- 其中 27,401 个任务涉及至少 3 个属性；
- 包含 433,166 个 molecules；
- 包含 256,185 个 molecule pairs；
- 提供属性级目标：哪些属性需要 improve，哪些属性需要 keep unchanged；
- 使用多样自然语言模板构造 instructions；
- 用于训练能够处理 property-specific objectives 的 LLM。

涉及的 10 个性质包括：

| 属性 | 含义 | 期望方向 |
|---|---|---|
| **PlogP** | Penalized LogP，综合溶解性、脂溶性、合成可及性和环复杂度 | 越高越好 |
| **QED** | Quantitative Estimate of Drug-Likeness | 越高越好 |
| **AMP** | Parallel Artificial Membrane Permeability Assay | 越高越好 |
| **BBBP** | Blood-Brain Barrier Permeability | 对 CNS 药物通常越高越好 |
| **HIA** | human Intestinal Absorption | 越高越好 |
| **hERG** | human Ether-à-go-go Related Gene inhibition | 越低越好 |
| **CARC** | Carcinogenicity | 越低越好 |
| **MUT** | Mutagenicity | 越低越好 |
| **LIV** | Drug-induced Liver Injury | 越低越好 |
| **DRD2** | Dopamine Receptor D2 Inhibition | 抗精神病药场景中越高越好 |

### 2. GeLLM4O-Cs 模型

**GeLLM4O-Cs** 是基于 **C-MuMOInstruct** 指令微调得到的一系列 LLM。

作者训练了两类模型：

#### Specialist GeLLM4O-C

记作 **GeLLM4O-C-N**。

特点：

- 针对单一 N 属性组合训练；
- 在该属性组合下学习多个 property-specific objectives；
- 更适合固定任务场景；
- 但训练数据少时泛化能力可能不足。

#### Generalist GeLLM4O-C

记作 **GeLLM4O-C-P(N)** 或 **GeLLM4O-C-P(10)**。

特点：

- 在多个属性组合和多种目标上联合训练；
- 目标是学习共享的化学语义和结构修改策略；
- 可作为更通用的分子优化基础模型；
- 能够 0-shot 泛化到未见过的属性组合和指令表达。

使用的 backbone LLM：

- **Mistral-7B-Instruct-v0.3**
- **Llama3.1-8B-Instruct**

微调方法：

- 使用 **LoRA**
- LoRA 应用于每个 projection layer 和 language modeling head
- 0-shot evaluation
- 每个输入分子通过 beam search 生成 20 个 candidate molecules

## 算法流程

### C-MuMO 任务定义

给定：

- 输入分子 $M_x$
- 目标输出分子 $M_y$
- 属性集合 $P$
- 每个属性的药物相关水平 $\Theta_p$
- 每个属性的最小改善或稳定阈值 $\Delta_p$

对于每个属性 $p$：

- 如果 $M_x$ 在属性 $p$ 上未达到 $\Theta_p$，则该属性为 sub-optimal，需要改善；
- 如果 $M_x$ 在属性 $p$ 上已达到 $\Theta_p$，则该属性为 near-optimal，需要保持。

优化目标是：

1. 对所有 sub-optimal properties 进行改善；
2. 对所有 near-optimal properties 保持稳定；
3. 保持 $M_y$ 与 $M_x$ 的结构相似性。

### 数据构建流程

论文基于 Chen et al. (2021) 的分子对数据构建训练集。

主要步骤：

1. 从已有 molecule pairs 中选取满足相似性约束的分子对；
   - Tanimoto similarity > 0.6；
2. 对每个分子对计算 10 个性质；
3. 根据 $\Theta_p$ 判断每个属性是否 sub-optimal 或 near-optimal；
4. 根据 $\Delta_p$ 判断该分子对是否满足：
   - property improvement constraint；
   - property stability constraint；
5. 为每个有效分子对构造 C-MuMO task；
6. 为每个任务生成多种自然语言 instruction；
7. 每个 task 最多使用 100 个 molecule pairs，以平衡任务多样性与训练成本。

### 测试集构建流程

1. 从 **ZINC** 随机采样 250K 个分子；
2. 所有分子满足 **Lipinski’s rule of 5**；
3. 与训练集无重叠，避免数据泄漏；
4. 对每个评价属性组合筛选合适的输入分子：
   - 需优化的属性低于阈值；
   - 需保持的属性高于阈值；
5. 每个评价属性组合随机采样 500 个 test molecules。

### 指令构造流程

每个 prompt 包含：

1. general instruction；
2. 输入 SMILES；
3. 需要调整的属性与目标阈值；
4. 输出目标 SMILES。

作者设计了：

- 6 个 general instruction templates；
- 5 个 adjustment templates；
- 共 30 种 instruction templates。

此外，每个任务保留一个 hold-out instruction，用于测试模型对 unseen instructions 的泛化能力。

## 实验设置

### 评价任务

作者选择 10 个代表性 property combinations，共 119 个 multi-objective tasks：

- 51 个 IND tasks；
- 68 个 OOD tasks。

#### IND tasks

IND 表示属性组合在训练集中出现过。

| 组合 | 属性 | 任务类别 |
|---|---|---|
| **BPQ** | BBBP, PlogP, QED | CS |
| **ELQ** | hERG, LIV, QED | GT |
| **ACEP** | AMP, CARC, hERG, PlogP | GT |
| **BDPQ** | BBBP, DRD2, PlogP, QED | CS |
| **DHMQ** | DRD2, HIA, MUT, QED | CS |

#### OOD tasks

OOD 表示属性组合和对应 multi-objective tasks 未在训练中出现，但单个属性在其他组合中见过。

| 组合 | 属性 | 任务类别 |
|---|---|---|
| **CDE** | CARC, DRD2, hERG | CS |
| **ABMP** | AMP, BBBP, MUT, PlogP | CS |
| **BCMQ** | BBBP, CARC, MUT, QED | CS |
| **BDEQ** | BBBP, DRD2, hERG, QED | CS |
| **HLMPQ** | HIA, LIV, MUT, PlogP, QED | GT |

其中：

- **GT**：General Drug-Likeness and Toxicity；
- **CS**：Context-Specific Objectives。

### Baselines

论文比较了两类 baseline：

#### 通用大语言模型

- **Mistral-7B Instruct-v0.3**
- **Llama-3.1 8B-Instruct**
- **Claude-3.5**
- **GPT-4o**

通用 LLM 使用：

- 0-shot prompting；
- 1-shot prompting。

#### 化学基础 LLM

- **LlaSMolMistral**
- 文中也提到 **ChemDFM** 在附录中表现不如 LlaSMol，主表主要报告 LlaSMolMistral。

### 评价指标

主要指标：

1. **Success Rate (SR)**
   - 至少一个生成分子同时满足所有属性目标的比例；
   - 体现模型能否遵循 property-specific objectives。

2. **Similarity with input (Sim)**
   - 生成分子与输入分子的 Tanimoto similarity；
   - 体现结构保持能力。

3. **Relative Improvement (RI)**
   - 对所有需改善属性的平均相对提升；
   - 体现优化幅度。

附录中还报告：

- **SRΘ**
  - 更严格的成功率；
  - 要求每个属性超过药物相关阈值 $\Theta_p$；
- **Validity**
- **Novelty**
- **Synthetic Accessibility Score (SAS)**
- **Average Property Score (APS)**

## 主要结果

### 1. IND 任务结果

在 5 个 IND 属性组合上，**GeLLM4O-Cs** 整体显著优于所有 baselines。

论文主要发现：

- specialist 和 generalist GeLLM4O-Cs 在所有 IND tasks 上均优于通用 LLM 和化学基础 LLM；
- **GeLLM4O-C-P(10)Mistral** 相比最佳 baseline，平均 SR 提高约 37%，RI 提高约 102%；
- 在挑战性任务 **BDPQ** 和 **DHMQ** 上，GeLLM4O-Cs 相比 baseline 成功优化的输入分子数量最高提升约 150% 和 126%；
- 在严格指标 **SRΘ** 下，GeLLM4O-Cs 与 baseline 的差距进一步扩大，generalist GeLLM4O-Cs 在部分任务上 SR 提高可达 218%，RI 提高可达 313%。

### 2. Generalist vs Specialist

Generalist GeLLM4O-Cs 在 5 个 IND 属性组合中的 4 个上优于 specialist models。

原因可能包括：

- generalist 模型能从不同属性组合中迁移结构修改知识；
- 在训练 pairs 较少的任务上，specialist 容易受限；
- 多任务训练带来更好的跨任务泛化能力。

但也存在例外：

- 在 **BDPQ** 上，某些 specialist 模型优于 generalist；
- 作者推测原因可能是 generalist **GeLLM4O-C-P(10)** 接触了更多存在竞争或冲突目标的任务，导致对 BDPQ 特定 trade-off 的专门化能力减弱。

这说明多任务指令微调在带来泛化能力的同时，也可能引入任务间冲突。

### 3. OOD 任务结果

在 OOD tasks 上，只有 generalist GeLLM4O-Cs 适用，因为 specialist 和 **GeLLM4O-C-P(N)** 依赖任务特定属性组合。

主要结果：

- **GeLLM4O-C-P(10)Mistral** 在所有 OOD 任务上均优于 baselines；
- 平均 SR 达到约 63%；
- 相比最佳 baseline **Mistral (1-shot)**，SR 最高提升约 35%，RI 提升约 77%；
- 表明模型能 0-shot 泛化到未见过的属性组合和多目标约束。

### 4. 对 unseen instructions 的泛化

作者用训练时保留的 hold-out instruction 测试语言表达泛化能力。

结果：

- specialist GeLLM4O-Cs 在部分 IND tasks 上 SR 下降超过 5%；
- generalist GeLLM4O-Cs 在所有任务上表现更稳定；
- **GeLLM4O-C-P(10)Llama** 对 unseen instructions 比 **GeLLM4O-C-P(10)Mistral** 更稳健。

这说明多任务、多模板训练有助于模型避免过拟合特定 wording。

### 5. Case studies

论文提供了两个案例：

#### ACEP 案例

任务目标：

- 提升 **AMP** 和 **PlogP**；
- 保持 **CARC** 和 **hERG**。

**GeLLM4O-C-P(10)Mistral** 通过将 morpholine 替换为 para-chlorophenyl group：

- 提升 AMP；
- 提升 PlogP；
- 同时保持 CARC 和 hERG 在可接受范围内。

相比之下，**LlaSMolMistral** 的修改导致 hERG 风险上升。

#### ABMP 案例

任务目标：

- 提升 **BBBP**；
- 保持 **AMP**, **MUT**, **PlogP**。

**GeLLM4O-C-P(10)Mistral** 通过简化 tri-amide backbone、降低极性、引入更疏水的结构，实现 BBBP 提升并保持其他属性。

**LlaSMolMistral** 则修改较保守，只带来有限 BBBP 提升，同时导致 PlogP 下降和 MUT 增加。

## 创新点

1. **提出 C-MuMO 问题设定**
   - 将真实药物优化中的“选择性改善 + 保持已有优势”形式化为可控多属性多目标优化。

2. **构建 C-MuMOInstruct 数据集**
   - 作者称其为首个专注于 property-specific objectives 的多属性多目标分子优化指令微调数据集；
   - 支持最多 10 个性质；
   - 包含 28,266 个 optimization tasks。

3. **引入属性级阈值控制**
   - 不只是“提高属性”，而是提高到用户指定或药物相关水平；
   - 同时要求已达标属性稳定。

4. **训练 GeLLM4O-Cs 系列模型**
   - 支持自然语言指令控制分子结构修改；
   - 包括 specialist 和 generalist 两类模型。

5. **展示强 OOD 泛化能力**
   - Generalist GeLLM4O-Cs 能在未见过的属性组合和任务上 0-shot 优于强 baseline。

6. **强调现实先导优化场景**
   - 保持 scaffold；
   - 最小结构修改；
   - 多性质 trade-off；
   - 属性级目标控制。

## 局限性

论文明确指出以下局限：

1. **当前框架是 single-step optimization**
   - 现实中要让所有性质达到药物相关阈值，可能需要多轮迭代修改；
   - 如何设计反馈机制或中间 reward signal 仍是未来工作。

2. **依赖计算预测器评估分子性质**
   - 使用 **ADMET-AI** 等工具预测性质；
   - 虽然这些工具被广泛使用，但可能与真实实验结果存在偏差；
   - 后续应结合实验验证数据或 wet-lab feedback。

3. **指令模板仍是合成生成的**
   - 虽然测试了 unseen instructions，但语言变化仍来自模板和 GPT-4o 改写；
   - 真正开放式自然语言场景下的鲁棒性仍需进一步验证。

4. **潜在安全与滥用风险**
   - 数据集中包含毒性相关属性，如 **CARC**, **hERG**, **LIV**, **MUT**；
   - 虽然模型目标是降低毒性，但开源 LLM 可能保留预训练中的危险化学知识；
   - 作者建议部署时结合毒性筛查、专家审查和使用控制。

5. **实验未与非 LLM 方法直接大规模比较**
   - 作者解释现有非 LLM 方法需要手工 reward 和任务特定调参；
   - 但这也意味着与传统强优化器的直接公平比较仍待补充原文/PDF 后确认是否充分。

## 相关概念

- [[多模态多目标优化]]
- [[多目标分子优化]]
- [[可控分子优化]]
- [[多属性分子优化]]
- [[可控多属性多目标优化]]
- [[C-MuMO]]
- [[先导化合物优化]]
- [[Hit-to-Lead Optimization]]
- [[Lead Optimization]]
- [[药物发现]]
- [[ADMET]]
- [[分子性质预测]]
- [[分子生成]]
- [[分子编辑]]
- [[SMILES]]
- [[Tanimoto Similarity]]
- [[Morgan Fingerprint]]
- [[Lipinski’s rule of 5]]
- [[Instruction Tuning]]
- [[LoRA]]
- [[大语言模型]]
- [[化学大语言模型]]
- [[分子优化基础模型]]
- [[属性特异性目标]]
- [[多任务学习]]
- [[OOD 泛化]]
- [[0-shot 泛化]]
- [[药物相似性]]
- [[QED]]
- [[PlogP]]
- [[BBBP]]
- [[hERG]]
- [[DRD2]]
- [[HIA]]
- [[MUT]]
- [[CARC]]
- [[DILI]]
- [[LIV]]
- [[AMP]]

## 相关方法

- [[GeLLM4O-C]]
- [[C-MuMOInstruct]]
- [[MuMOInstruct]]
- [[GeLLM^3O]]
- [[MolOpt-Instructions]]
- [[DrugAssist]]
- [[LlaSMol]]
- [[ChemDFM]]
- [[ChemLLM]]
- [[Mol-Instructions]]
- [[Mistral-7B-Instruct]]
- [[Llama3.1-8B-Instruct]]
- [[GPT-4o]]
- [[Claude-3.5]]
- [[ADMET-AI]]
- [[RDKit]]
- [[ZINC]]
- [[Modof]]
- [[MIMOSA]]
- [[f-RAG]]
- [[Chemformer]]
- [[Prompt-MolOpt]]
- [[GraphGA]]
- [[MolLeo]]
- [[GFlowNets]]
- [[Reinforcement Learning for Molecule Optimization]]
- [[Genetic Algorithm for Molecule Optimization]]
- [[Beam Search]]
- [[QSAR]]

## 相关论文

- [[Dey et al. 2025 - GeLLM^3O Generalizing Large Language Models for Multi-property Molecule Optimization]]
- [[Ye et al. 2025 - DrugAssist]]
- [[Chen et al. 2021 - A Deep Generative Model for Molecule Optimization via One Fragment Modification]]
- [[Gao et al. 2022 - Sample Efficiency Matters]]
- [[Jensen 2019 - Graph-based Genetic Algorithm]]
- [[You et al. 2018 - Graph Convolutional Policy Network]]
- [[Blaschke et al. 2020 - REINVENT 2.0]]
- [[Sun et al. 2022 - MolSearch]]
- [[Kim et al. 2024 - Genetic-guided GFlowNets]]
- [[Wu et al. 2024 - Prompt-MolOpt]]
- [[Yu et al. 2024 - LlaSMol]]
- [[Zhao et al. 2025 - ChemDFM]]
- [[Fang et al. 2024 - Mol-Instructions]]
- [[Irwin et al. 2022 - Chemformer]]
- [[Fu et al. 2021 - MIMOSA]]
- [[Lee et al. 2024 - f-RAG]]
- [[Wang et al. 2025 - MolLeo]]
- [[Liu et al. 2024 - ChatDrug]]
- [[Le and Chawla 2024 - Re3DF]]

## 源文件

- citekey: `deyLargeLanguageModels2025`
- title: **Large Language Models for Controllable Multi-property Multi-objective Molecule Optimization**
- authors: Vishal Dey, Xiao Hu, Xia Ning
- year: 2025
- DOI: `10.48550/ARXIV.2505.23987`
- arXiv: `2505.23987`
- collections: 多目标分子优化
- code/data: `https://github.com/ninglab/GeLLMO-C`

## 图表摘录

![[raw/zotero/images/多目标分子优化/2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025/page-001.png]]

## Zotero 原始摘要

In real-world drug design, molecule optimization requires selectively improving multiple molecular properties up to pharmaceutically relevant levels, while maintaining others that already meet such criteria. However, existing computational approaches and instructiontuned LLMs fail to capture such nuanced property-specific objectives, limiting their practical applicability. To address this, we introduce C-MuMOInstruct, the first instructiontuning dataset focused on multi-property optimization with explicit, property-specific objectives. Leveraging C-MuMOInstruct, we develop GeLLM4O-Cs, a series of instructiontuned LLMs that can perform targeted propertyspecific optimization. Our experiments across 5 in-distribution and 5 out-of-distribution tasks show that GeLLM4O-Cs consistently outperform strong baselines, achieving up to 126% higher success rate. Notably, GeLLM4O-Cs exhibit impressive 0-shot generalization to novel optimization tasks and unseen instructions. This offers a step toward a foundational LLM to support realistic, diverse optimizations with property-specific objectives. C-MuMOInstruct and code are accessible through https:// github.com/ninglab/GeLLMO-C.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的价值在于把“现实药物优化”中的一个关键细节明确建模出来：不是所有性质都应该无脑提高，而是不同属性有不同目标。有些属性要提高，有些属性要降低，有些已经达标的属性只需要保持稳定。

从机器学习角度看，论文贡献不只是训练了一个更好的分子优化 LLM，而是提出了一种更接近真实需求的任务分解方式：

- 输入不是单纯的分子；
- 也不是单一目标；
- 而是“分子 + 属性组合 + 每个属性的目标方向 + 阈值约束”。

这使得分子优化从固定 benchmark 转向更灵活的 instruction-following problem。

我认为 **C-MuMOInstruct** 的重要性可能高于模型本身。因为一旦有了这种属性级任务数据，其他模型架构也可以在同一设定下训练和比较。**GeLLM4O-C** 证明了 instruction-tuned LLM 可以学习一些跨属性组合的结构修改规律，并在 OOD 属性组合上迁移。

不过，它仍然主要是基于预测器和单步编辑的离线优化框架。真实药物发现更可能需要：

- 多轮生成；
- 实验反馈；
- 合成可行性约束；
- 结合 docking、binding affinity、PK/PD 等更复杂目标；
- 化学专家参与筛选。

因此，这篇论文更像是通向“自然语言可控分子优化代理”的一个基础模块，而不是完整药物发现系统。

## 后续问题

1. **多轮优化如何设计？**
   - 是否可以将 **GeLLM4O-C** 接入迭代式 agent 框架？
   - 每轮根据属性预测结果重新生成 instruction？

2. **如何缓解多任务冲突？**
   - **GeLLM4O-C-P(10)** 在某些任务上不如 specialist；
   - 是否可以引入 task routing、adapter selection 或 mixture-of-experts？

3. **阈值 $\Theta_p$ 的设定是否足够合理？**
   - 当前使用训练分子分布的 60th percentile；
   - 是否应该根据真实药物开发标准或适应症场景动态设定？

4. **如何引入实验数据？**
   - 当前依赖计算预测器；
   - 如果有 wet-lab feedback，应该如何进行在线微调或偏好优化？

5. **SMILES 表示是否限制结构修改质量？**
   - 是否可以结合 molecular graph representation 或 3D conformation？

6. **如何评估 scaffold preservation？**
   - 论文使用 Tanimoto similarity；
   - 是否需要更细粒度的 scaffold-level metric？

7. **生成分子的可合成性是否足够？**
   - 虽然附录报告 SAS，但主结果主要看 SR、Sim、RI；
   - 后续应更系统评估 synthetic accessibility 和 retrosynthesis feasibility。

8. **能否扩展到更多真实药物目标？**
   - 如 kinase inhibition、CYP inhibition、selectivity、off-target toxicity 等；
   - 待补充原文/PDF 后确认是否已有扩展计划。

9. **与传统优化方法的公平比较如何做？**
   - 非 LLM 方法需要 reward engineering；
   - 是否可以构建统一 reward 后比较 LLM、RL、GA、GFlowNet？

10. **安全治理如何实现？**
    - 模型虽然优化低毒性，但仍可能被恶意 prompting；
    - 是否需要加入安全过滤器、毒性约束解码或受控 API 部署？
