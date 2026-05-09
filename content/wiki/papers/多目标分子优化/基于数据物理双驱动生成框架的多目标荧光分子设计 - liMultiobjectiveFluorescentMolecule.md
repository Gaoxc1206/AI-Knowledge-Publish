---
type: paper
citekey: "liMultiobjectiveFluorescentMolecule"
title: "基于数据物理双驱动生成框架的多目标荧光分子设计"
chinese_title: "基于数据物理双驱动生成框架的多目标荧光分子设计"
authors: "Yanheng Li, Zhichen Pu, Lijiang Yang, Zehao Zhou, Yi Qin Gao"
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
  - "基于数据物理双驱动生成框架的多目标荧光分子设计"
  - "Multi-objective fluorescent molecule design with a data-physics dual-driven generative framework"
original_title: "Multi-objective fluorescent molecule design with a data-physics dual-driven generative framework"
---
## 一句话总结

本文提出 **LUMOS (Latent Unified fraMework for fluOrophore deSign)**，一个面向荧光小分子反向设计的“数据-物理双驱动”生成框架，通过共享潜在空间、神经网络预测器、快速 TD-DFT 工作流、潜在扩散模型与 NSGA-III 多目标进化算法，实现可控的 多目标分子优化 和荧光分子生成。

## 研究问题

本文关注的问题是：如何在巨大的化学空间中，高效设计同时满足多个光物理与理化性质目标的荧光小分子。

具体目标包括：

- 定制吸收峰：absorption maximum, λabs
- 定制发射峰：emission maximum, λemi
- 提高摩尔消光系数：molar extinction coefficient, log ε
- 提高光致发光量子产率：photoluminescence quantum yield, PLQY / φ
- 增大 Stokes shift
- 在特定应用场景中同时优化 ADMET / 细胞通透性等性质
- 保持或探索新的荧光团 scaffold / fragment

核心难点在于：

1. 荧光分子设计是典型的 多目标优化 问题，目标之间可能冲突。
2. 化学空间离散且巨大，传统 generate-score-screen 工作流搜索效率低。
3. 纯 机器学习 预测器在 分布外泛化 上不稳定。
4. 量子化学计算如 TD-DFT 具有物理可解释性和迁移性，但计算成本高。
5. 荧光分子的实际设计还涉及溶剂、环境、结构 scaffold、fragment 局部改造等复杂约束。

## 背景与动机

荧光小分子广泛用于：

- 生物成像
- 化学传感
- 光电子学
- 荧光探针设计
- 细胞微环境检测

传统荧光分子发现通常依赖已知 scaffold，例如 rhodamines、BODIPYs，并通过局部化学修饰、合成、表征和筛选进行优化。这种方式有两个主要局限：

1. 强依赖专家经验和劳动密集型实验循环。
2. 主要围绕已有结构微调，限制了新 chemotype / scaffold 的发现。

近年来，AI 分子设计方法被用于荧光分子设计。例如：

- Sumita et al. 使用 RNN 生成器结合 Monte Carlo tree search。
- Han et al. 使用 GCN 预测逐步分子编辑。
- Zhu et al. 使用 强化学习 和机器学习性质预测器进行荧光团设计与高通量筛选。

但已有方法仍面临两个瓶颈：

1. **离散化学空间探索效率低**  
   许多方法直接在离散 SMILES 或分子图空间中进行 generate-score-screen，当目标、硬约束和 scaffold novelty 同时存在时效率不足。

2. **数据驱动预测与物理评价之间不充分对齐**  
   神经网络预测器在 OOD 分子上可能外推失败；而 TD-DFT 等物理方法更可迁移、更可解释，但计算昂贵，不适合直接高通量搜索。

因此，作者提出需要一个能够进行 objective-conditioned generation，同时结合 scalable physics-anchored evaluation 的荧光分子反向设计框架。

## 核心思想

LUMOS 的核心思想是把荧光分子设计拆成三个相互连接的模块：

1. **表示学习模块**  
   用 graph-to-sequence autoencoder 把离散分子图映射到连续、紧凑、语义化的 latent chemical space，使生成和优化可以在连续空间中进行。

2. **性质预测模块**  
   构建多层次预测器：
   - **AGP (Attentive Graph Predictor)**：快速、可解释的图神经网络预测器。
   - **LSP (Latent Surrogate Predictor)**：从潜在向量到性质的可微预测器，用于梯度引导生成。
   - **TD-DFT/NN hybrid predictor**：结合快速 TD-DFT 计算与神经网络偏差校正，提高 OOD 泛化和物理一致性。

3. **生成与优化模块**  
   在 latent space 上训练 latent diffusion model / Diffusion Transformer，支持：
   - prompt-conditioned de novo generation
   - gradient-guided generation
   - 与 NSGA-III 结合的多目标分子优化
   - scaffold-level 全局优化
   - fragment-level 局部优化
   - 带 ADMET 约束的实际荧光探针优化

整体上，LUMOS 试图把 生成模型、分子表示学习、量子化学计算 和 多目标进化算法 整合到一个荧光分子设计框架中。

## 方法框架

### 1. Representation learning：连续潜在化学空间

作者采用 graph-to-sequence autoencoder：

- 输入：分子图，由 RDKit 解析。
- 编码器：MolCT Graph Encoder / graph transformer。
- 为处理不同大小分子，引入 virtual atoms 作为 padding nodes。
- virtual atoms 的压缩 embedding 作为固定维度 latent vector。
- 解码器：transformer SMILES decoder，将 latent representation 还原为 SMILES。
- 训练目标：maximum likelihood estimation，latent vector 加 L2 regularization，避免模型简单记忆训练样本。

该 latent space 被用于：

- 分子重构
- 性质预测
- diffusion generation
- molecular optimization

表示学习结果：

- FluoDB test set 重构准确率：94.0%
- 外部 TADF dataset 重构准确率：77.8%
- 重构失败时，多数情况下仍生成有效且结构相近的分子，而非 invalid SMILES。
- latent cosine similarity 与 Tanimoto similarity 正相关。
- 相比 CDDD，LUMOS latent representation 在 t-SNE 上对不同 fluorophore scaffold 有更清晰的聚类。

### 2. Property prediction：双分支神经网络预测器

作者构建两个神经网络预测器：

#### AGP：Attentive Graph Predictor

用途：

- 快速预测
- 高通量筛选
- 原子级可解释性分析

结构：

- 分子图和溶剂图分别由 MPNN 编码。
- 使用 cross-attention module 和 learnable query vectors，为每个性质学习 property-specific representation。
- 多任务学习同时预测：
  - λabs
  - λemi
  - log ε
  - PLQY

特点：

- 参数量相对较少。
- 注意力权重可用于解释哪些原子 / 官能团对性质贡献大。
- 注意力分布与 DFT 计算的 HOMO/LUMO 分布有较好对应。

#### LSP：Latent Surrogate Predictor

用途：

- 学习 latent-to-property mapping。
- 与生成模型 latent space 对齐。
- 可微，用于 gradient-guided diffusion。

结构：

- 分子图经冻结的 MolCT encoder 得到 latent representation。
- 溶剂图由 MPNN 编码。
- 拼接后由 MLP 回归性质。

特点：

- 比 AGP 稍低准确，但可以直接对 latent vector 求梯度。
- 是后续 guided generation 的关键。

### 3. Physics-informed hybrid predictor：TD-DFT + NN

为提升 OOD 泛化，作者构建高通量 TD-DFT 工作流：

1. RDKit 生成初始构象并粗优化。
2. xTB 进行半经验优化：
   - GFN-FF
   - GFN2-xTB
   - ALPB implicit solvation
3. GPU4PySCF 执行 SCF 和 TD-DFT 计算。
4. 使用 PBE0 functional、def2-SVP basis set、IEF-PCM implicit solvent。
5. TDDFT-ris 计算前 5 个激发态。

性质估计：

- λabs：S0 到最大激发态 Smax 的 excitation wavelength。
- log ε：由对应 oscillator strength 估计。
- λemi：由于当前 pipeline 不支持 excited-state geometry optimization，使用 S0 到 S1 的 vertical excitation wavelength 近似。

局限：

- λemi 没有做 S1 优化，因此存在误差。
- oscillator strength 与 log ε 并非直接等价。
- PLQY 缺乏标准 TD-DFT 计算协议。

为校正 TD-DFT 系统偏差，作者加入 bias prediction network：

- 输入：分子图和溶剂图。
- 输出：动态 scaling factor wθ 和 shifting factor bθ。
- 对原始 TD-DFT 输出进行线性校准。

该 hybrid model 在 fluorophore split subset 上对 λabs 和 λemi 的 RMSE 与 R² 都优于 raw TD-DFT 和 pure NN。

### 4. Generative framework：latent diffusion

作者在 latent space 上构建 diffusion model：

- forward process：对 latent vector x0 逐步加 Gaussian noise。
- backward process：用 Diffusion Transformer 预测噪声并去噪。
- 解码：将生成的 latent representation 输入预训练 SMILES decoder 得到分子。

支持两种控制方式：

#### Prompt-conditioned generation

输入条件包括：

- solvent dielectric constant ε
- λabs
- λemi
- log ε
- PLQY

条件通过 Gaussian RBF embedding 编码，再通过 adaptive layer normalization, adaLN 注入 DiT。

优势：

- 推理快，不需要采样时反向传播。
- 可通过 dielectric constant 表示溶剂环境，潜在适用于混合溶剂或有效介电常数已知的微环境。

不足：

- 对 log ε 和 PLQY 的控制较弱。
- 在分布尾部 prompt 时 uniqueness 和 novelty 降低。
- 作者认为主要原因是荧光标注数据稀缺。

#### Gradient-guided generation

使用冻结的 LSP，根据目标性质定义 loss，并对 denoising trajectory 施加梯度引导。

优势：

- 灵活，可自定义目标函数。
- 适合多目标优化或新任务适配。
- 可通过微调 LSP 快速迁移到新数据。

### 5. Molecular optimization：扩散突变 + NSGA-III

作者将 partial noise-denoising cycle 作为 mutation operator，嵌入 evolutionary framework：

1. 输入父代分子 latent。
2. 加入部分噪声。
3. guided denoising 生成结构相似但性质改进的后代。
4. 用 NSGA-III 选择 Pareto-optimal population。
5. 最后用 hybrid model 进行精细筛选。

支持三种主要优化场景：

#### 全局优化

目标包括：

- λemi
- Stokes shift
- log ε
- PLQY

以一个 lead molecule 为起点，LUMOS 在四个目标上均实现提升。

#### Fragment optimization

固定核心 scaffold，只优化 fragment：

- 将分子拆成 fixed core 和 mutable fragment。
- 只对 fragment latent 进行 noise-denoising mutation。
- 生成 fragment 后重新接回 core。
- 用 AGP 评价，并用 NSGA-III 选择。

该模式适合保留已知荧光团核心，同时微调取代基。

#### Cell permeability constrained optimization

实际应用场景：Fluorescein 荧光性质较好，但生理 pH 下主要为阴离子，细胞膜通透性差。

优化目标：

- PAMPA permeability
- lipophilicity
- solubility

约束：

- 保持 λemi
- 保持 Stokes shift
- 保持 brightness = log ε × PLQY

作者整合 ADMET-AI，并通过 guided diffusion 与 NSGA-III 搜索兼顾 ADMET 与荧光约束的分子。

后续用 分子动力学模拟 验证膜通透性：

- 计算 PMF free energy profiles
- 计算 log Peff
- 初始 Fluorescein log Peff = -8.90
- 优化分子：
  - Opt-1: -0.69
  - Opt-2: -0.50
  - Opt-3: -1.87

这些结果表明优化分子膜通透性显著改善，同时保持或略微改善荧光性质。

## 算法流程

### LUMOS 总体流程

1. **数据准备**
   - 预训练数据：ZINC、ChEMBL、PubChem，约 150 million molecules。
   - 微调数据：FluoDB。
   - 外部测试：TADF dataset。
   - 性质预测数据：FluoDB。
   - 清洗规则：去除超过 128 个 heavy atoms、多个 fragments、metal ions、tautomers 等。

2. **训练 autoencoder**
   - 分子图输入 MolCT graph encoder。
   - 加入 virtual atoms。
   - 提取 virtual atoms embedding 作为 latent vector。
   - Transformer decoder 重构 SMILES。
   - 通过 MLE + L2 latent regularization 训练。

3. **构建 latent chemical space**
   - 检查重构准确率。
   - 检查 latent similarity 与 Tanimoto similarity。
   - 用 t-SNE 检查 scaffold 聚类。

4. **训练神经网络性质预测器**
   - AGP：图输入、cross-attention、多任务预测。
   - LSP：latent-to-property，可微预测。
   - 目标：λabs、λemi、log ε、PLQY。

5. **构建物理混合预测器**
   - RDKit 构象生成。
   - xTB 几何优化。
   - GPU4PySCF TD-DFT 激发态计算。
   - NN bias correction 校正 TD-DFT 系统误差。

6. **训练 latent diffusion model**
   - 在 autoencoder latent space 上训练 DiT。
   - 支持 prompt-conditioned generation。
   - 支持 gradient-guided generation。

7. **de novo generation**
   - 输入目标性质 prompt，或定义目标 loss。
   - diffusion 生成 latent。
   - decoder 转为 SMILES。
   - 用 NN / TD-DFT / hybrid predictor 验证。

8. **multi-objective molecular optimization**
   - 以初始分子为父代。
   - partial noise-denoising 作为 mutation。
   - guided diffusion 向目标性质区域移动。
   - NSGA-III 选择 Pareto population。
   - hybrid predictor 后筛。

9. **复杂应用验证**
   - Fluorescein 细胞通透性优化。
   - ADMET-AI 预测 ADMET 目标。
   - TD-DFT / hybrid model 验证荧光。
   - MD 计算 PMF 与 log Peff 验证膜通透性。

## 实验设置

### 数据集

- **FluoDB**
  - 用于 autoencoder 微调、性质预测、生成模型训练。
  - 总训练数据约 45,000 molecule-solvent pairs 带 fluorescence labels。
  - 单个性质可用样本约 10,000–20,000。
  - 同时具有四个标签的分子为 5,041 个。
- **TADF dataset**
  - 外部 OOD 重构测试数据集。
- **ZINC**
- **ChEMBL**
- **PubChem**
  - autoencoder 和 DiT 预训练数据来源，约 150 million molecules。
- 数据和验证数据可用链接：
  - https://doi.org/10.5281/zenodo.18295513

### 数据划分

性质预测评估使用三种 split：

1. **Random split**
   - 训练 / 验证 / 测试 = 8:1:1。

2. **Scaffold split**
   - 基于 Murcko scaffolds。
   - 训练 / 验证 / 测试 = 8:1:1。

3. **Fluorophore split**
   - 基于不同 fluorophore substructures。
   - BODIPY、coumarin、naphthalimide derivatives 作为测试集。
   - 其余分子按 8:2 划分训练和验证。
   - 用于减少 fluorophore-level data leakage，更接近实际新荧光团发现。

### Baseline models

预测任务：

- **MPNN**
- **FLSF**

表示学习对比：

- **CDDD**

优化任务：

- **QMO**
- **Gen-DL**
- **REINVENT4**

其他工具 / 方法：

- RDKit
- xTB
- GPU4PySCF
- Gaussian 16
- ADMET-AI
- GROMACS
- CHARMM-GUI
- CGenFF
- TIP3P
- WHAM

### 评价指标

预测任务：

- RMSE
- R²
- Stokes error rate

表示学习：

- Reconstruction accuracy
- Validity
- latent cosine similarity vs Tanimoto similarity
- t-SNE scaffold clustering

生成任务：

- Validity
- Uniqueness
- Novelty
- prompt-property correlation
- TD-DFT / NN validation

优化任务：

- Hypervolume, HV
- λemi maximum
- Stokes shift maximum
- log ε maximum
- PLQY maximum
- number of valid generated molecules
- success rate evaluated by NN
- success rate evaluated by NN + DFT

细胞通透性验证：

- PMF profile
- log Peff
- ADMET predicted percentile scores
- hybrid model fluorescence prediction

## 主要结果

### 1. 表示学习结果

- FluoDB in-distribution test set 重构准确率：94.0%。
- 外部 TADF dataset 重构准确率：77.8%。
- 重构失败时多数输出仍为有效且结构相关的分子。
- latent cosine similarity 与 Tanimoto similarity 正相关。
- t-SNE 显示 LUMOS latent space 对不同 fluorophore scaffold 的分离更清晰，优于 CDDD。

### 2. 性质预测结果

Table 1 中 RMSE 结果摘要：

#### Random split

| Model | Abs. | Emi. | LogE | PLQY |
|---|---:|---:|---:|---:|
| MPNN | 26.62 | 21.38 | 0.264 | 0.172 |
| FLSF | 26.32 | 22.65 | 0.280 | 0.173 |
| Attentive graph predictor | 26.80 | 23.30 | 0.266 | 0.186 |
| Latent surrogate predictor | 27.56 | 25.36 | 0.290 | 0.188 |

#### Scaffold split

| Model | Abs. | Emi. | LogE | PLQY |
|---|---:|---:|---:|---:|
| MPNN | 57.13 | 48.56 | 0.449 | 0.266 |
| FLSF | 63.98 | 57.14 | 0.471 | 0.285 |
| Attentive graph predictor | 58.34 | 47.74 | 0.432 | 0.258 |
| Latent surrogate predictor | 62.35 | 53.81 | 0.441 | 0.262 |

#### Fluorophore split

| Model | Abs. | Emi. | LogE | PLQY |
|---|---:|---:|---:|---:|
| MPNN | 48.62 | 49.45 | 0.327 | 0.342 |
| FLSF | 57.91 | 56.58 | 0.334 | 0.356 |
| Attentive graph predictor | 54.67 | 50.71 | 0.292 | 0.339 |
| Latent surrogate predictor | 46.77 | 51.15 | 0.333 | 0.348 |

主要结论：

- random split 上 AGP、MPNN、FLSF 表现接近。
- scaffold split 和 fluorophore split 中，AGP / LSP 在部分性质上更优，显示更好的泛化潜力。
- AGP 和 LSP 的参数量明显少于 MPNN 和 FLSF。
- AGP 注意力权重与 DFT HOMO/LUMO 分布一致，显示一定物理可解释性。
- AGP 和 LSP 的 Stokes error rate 低于 baseline，说明对 λabs 与 λemi 的物理关系建模更稳定。

### 3. TD-DFT/NN hybrid predictor 结果

- GPU 加速 TD-DFT 工作流相比 Gaussian 标准流程加速约三个数量级。
- 单分子计算成本降至约 10¹–10² 秒。
- 对 λabs 和 log ε，快速 TD-DFT pipeline 与 Gaussian 精度相近。
- 对 λemi，未做 S1 优化的计算与 Gaussian 同协议结果相近，但长波段偏差明显。
- Gaussian with S1-optimized geometries 对 λemi RMSE 最低。
- TD-DFT + NN hybrid model 对 λabs 和 λemi 的 RMSE 与 R² 均优于 raw TD-DFT 和 pure NN。

### 4. de novo generation 结果

Prompt-conditioned generation：

- 对 λabs 和 λemi，在 ε = 5.0 与 ε = 78.0 下，输入 prompt 与验证性质呈强正相关。
- 对 log ε 和 PLQY，控制较弱，可能由于数据稀缺。
- 双目标 prompt λabs + log ε 下，生成分子的二维性质分布与输入 prompt 相关，支持多目标生成。

Gradient-guided generation：

- 在 ethanol 环境中，通过 LSP 梯度引导最大化四个荧光性质。
- 相比 unconditional generation，guided generation 得到的分子性质显著增强。
- 对 log ε，NN 预测提升明显，但 TD-DFT oscillator strength 只显示轻微差异，原因可能是 oscillator strength 与 log ε 物理上不完全等价。

### 5. 多目标分子优化结果

#### Global optimization

目标：λemi、Stokes shift、log ε、PLQY。

| Method | HV | Emi | Stokes | LogE | PLQY | #Mols | Success rate (NN) | Success rate (NN + DFT) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| LUMOS | 0.814 | 670.57 | 225.20 | 5.23 | 0.89 | 793 | 52.2% | 8.1% |
| QMO | 0.241 | 582.94 | 155.80 | 4.86 | 0.37 | 7 | 85.7% | 14.3% |
| Gen-DL | 0.383 | 702.46 | 158.04 | 5.19 | 0.61 | 85 | 25.9% | 1.2% |
| REINVENT4 | 0.315 | 610.18 | 178.31 | 4.86 | 0.49 | 2601 | 17.3% | 2.2% |

LUMOS 在 HV 和综合性质上表现最好。

#### Fragment optimization

| Method | HV | Emi | Stokes | LogE | PLQY | #Mols | Success rate (NN) | Success rate (NN + DFT) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| LUMOS | 0.808 | 673.40 | 216.09 | 5.21 | 0.99 | 1241 | 61.3% | 50.3% |
| QMO | 0.082 | 427.09 | 64.34 | 4.18 | 0.46 | 3 | 0.0% | 0.0% |
| Gen-DL | 0.220 | 525.49 | 149.27 | 4.65 | 0.56 | 94 | 8.5% | 7.4% |
| REINVENT4 | 0.518 | 582.94 | 194.33 | 4.94 | 0.87 | 13112 | 11.8% | 10.3% |

LUMOS 在 fragment optimization 上优势更明显，尤其 NN + DFT success rate 达到 50.3%。

### 6. 细胞通透性优化结果

以 Fluorescein 为起点：

- 优化目标：PAMPA、lipophilicity、solubility。
- 约束：保持 λemi、Stokes shift、brightness。

结果：

- 优化分子 ADMET 相关性质持续改善。
- 荧光约束保持在阈值以上。
- MD 验证显示膜通透性显著改善：
  - Fluorescein: log Peff = -8.90
  - Opt-1: log Peff = -0.69
  - Opt-2: log Peff = -0.50
  - Opt-3: log Peff = -1.87

作者还指出：

- Opt-1 / Opt-2 可能通过中和可离子化基团改善通透性。
- Opt-3 带阳离子和长脂肪链，可能更像膜锚定探针。

## 创新点

1. **提出 LUMOS 数据-物理双驱动框架**  
   将 分子表示学习、性质预测、TD-DFT、扩散模型 和 多目标进化算法 整合到荧光小分子反向设计中。

2. **共享 latent representation 连接生成与预测**  
   通过 graph-to-sequence autoencoder 构建连续、语义化 latent chemical space，使生成、预测和优化在同一空间中协同工作。

3. **双分支神经网络预测器设计**
   - AGP：快速、可解释。
   - LSP：与 latent space 对齐且可微，支持梯度引导生成。

4. **高通量 TD-DFT + NN bias correction**
   通过 GPU4PySCF 和 bias prediction network，在速度、准确性和 OOD 泛化之间取得平衡。

5. **dual-mode diffusion generation**
   同时支持 prompt-conditioned generation 和 gradient-guided generation，兼顾推理效率与目标函数灵活性。

6. **diffusion mutation + NSGA-III**
   将 partial noise-denoising 用作分子优化中的 mutation operator，并结合 NSGA-III 搜索 Pareto-optimal molecules。

7. **支持 global 与 fragment 两个尺度的优化**
   既能探索 scaffold-level 结构，也能在固定核心的情况下进行局部 fragment refinement。

8. **面向实际荧光探针问题的复杂约束优化**
   将 ADMET-AI、荧光性质约束和 MD 验证结合，用于优化 Fluorescein 的细胞通透性。

## 局限性

1. **prompt-conditioned generation 的 novelty 和 uniqueness 有限**  
   特别是在 prompt 位于训练分布尾部时，生成分子的 novelty / uniqueness 下降。

2. **对 log ε 和 PLQY 的控制较弱**  
   作者认为主要原因是数据稀缺。FluoDB 中同时具备四个标签的分子只有 5,041 个。

3. **TD-DFT pipeline 对 λemi 的近似仍有限**  
   当前 workflow 不支持 excited-state geometry optimization，因此用 S0 → S1 vertical excitation wavelength 近似 λemi。

4. **oscillator strength 与 log ε 不是直接等价**
   因此 TD-DFT 对 log ε 的验证存在物理映射上的局限。

5. **PLQY 缺少标准 TD-DFT 计算协议**
   因此 PLQY 主要依赖 NN 预测，物理验证不如 λabs / λemi 充分。

6. **复杂环境下的荧光行为建模不足**
   例如：
   - pH-responsive probes
   - aggregation-induced emission
   - heterogeneous microenvironment
   - protein / membrane / organelle local environment  
   这些数据在现有数据库中不足，通用量子化学协议也尚不成熟。

7. **实验合成与真实测量验证不足**
   文中主要通过 TD-DFT、hybrid predictor 和 MD 验证生成结果。是否有实际合成与实验测试，依据当前摘取文本不足，待补充原文/PDF 后确认。

8. **year、venue、DOI 缺失**
   Zotero 元数据未提供，待补充原文/PDF 后确认。

## 相关概念

- [[荧光分子设计]]
- [[荧光小分子]]
- [[荧光探针]]
- [[多目标分子优化]]
- [[多目标优化]]
- [[反向分子设计]]
- [[de novo molecular generation]]
- [[分子表示学习]]
- [[latent chemical space]]
- [[分子自编码器]]
- [[graph-to-sequence autoencoder]]
- [[分子图神经网络]]
- [[MPNN]]
- [[Graph Transformer]]
- [[MolCT]]
- [[SMILES decoder]]
- [[latent diffusion model]]
- [[Diffusion Transformer]]
- [[adaptive layer normalization]]
- [[gradient-guided diffusion]]
- [[prompt-conditioned generation]]
- [[TD-DFT]]
- [[time-dependent density functional theory]]
- [[量子化学计算]]
- [[GPU4PySCF]]
- [[xTB]]
- [[RDKit]]
- [[Gaussian]]
- [[分布外泛化]]
- [[OOD generalization]]
- [[物理一致性]]
- [[Stokes shift]]
- [[Kasha's rule]]
- [[HOMO]]
- [[LUMO]]
- [[oscillator strength]]
- [[molar extinction coefficient]]
- [[photoluminescence quantum yield]]
- [[NSGA-III]]
- [[Pareto optimality]]
- [[Hypervolume]]
- [[ADMET]]
- [[ADMET-AI]]
- [[细胞膜通透性]]
- [[PAMPA]]
- [[lipophilicity]]
- [[solubility]]
- [[分子动力学模拟]]
- [[PMF]]
- [[umbrella sampling]]
- [[WHAM]]

## 相关方法

- [[LUMOS]]
- [[Attentive Graph Predictor]]
- [[Latent Surrogate Predictor]]
- [[TD-DFT/NN hybrid predictor]]
- [[graph-to-sequence autoencoder]]
- [[MolCT Graph Encoder]]
- [[Transformer SMILES decoder]]
- [[Diffusion Transformer]]
- [[latent diffusion]]
- [[prompt-conditioned generation]]
- [[gradient-guided generation]]
- [[NSGA-III]]
- [[QMO]]
- [[Gen-DL]]
- [[REINVENT4]]
- [[FLSF]]
- [[MPNN]]
- [[CDDD]]
- [[ADMET-AI]]
- [[GPU4PySCF]]
- [[TDDFT-ris]]
- [[GFN2-xTB]]
- [[IEF-PCM]]
- [[PBE0]]
- [[def2-SVP]]
- [[GROMACS]]
- [[CHARMM-GUI]]
- [[CGenFF]]

## 相关论文

- [[Multi-objective fluorescent molecule design with a data-physics dual-driven generative framework]]
- [[MolSculptor: an adaptive diffusion-evolution framework enabling generative drug design for multi-target affinity and selectivity]]
- [[A modular artificial intelligence framework to facilitate fluorophore design]]
- [[Generative Deep Learning-Based Efficient Design of Organic Molecules with Tailored Properties]]
- [[De novo creation of a naked eye-detectable fluorescent molecule based on quantum chemical computation and machine learning]]
- [[Learning continuous and data-driven molecular descriptors by translating equivalent chemical representations]]
- [[Junction Tree Variational Autoencoder for Molecular Graph Generation]]
- [[Structure-based drug design with equivariant diffusion models]]
- [[Chemprop: A Machine Learning Package for Chemical Property Prediction]]
- [[Scalable Diffusion Models with Transformers]]
- [[Universal Guidance for Diffusion Models]]
- [[Optimizing molecules using efficient queries from property evaluations]]
- [[Reinvent 4: Modern AI-driven generative molecule design]]
- [[ADMET-AI: a machine learning ADMET platform for evaluation of large-scale chemical libraries]]
- [[Predicting a Drug’s Membrane Permeability: A Computational Model Validated With in Vitro Permeability Assay Data]]

## 源文件

- citekey: `liMultiobjectiveFluorescentMolecule`
- title: `Multi-objective fluorescent molecule design with a data-physics dual-driven generative framework`
- authors: Yanheng Li, Zhichen Pu, Lijiang Yang, Zehao Zhou, Yi Qin Gao
- year: 待补充原文/PDF 后确认
- venue: 待补充原文/PDF 后确认
- DOI: 待补充原文/PDF 后确认
- collections: 多目标分子优化
- data availability: https://doi.org/10.5281/zenodo.18295513
- code availability: https://github.com/egg5154/LUMOS

## 图表摘录

![[raw/zotero/images/多目标分子优化/基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule/page-001.png]]

## Zotero 原始摘要

无

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的关键价值不只是提出一个新的生成模型，而是将荧光分子设计中常见的三个痛点放在一个统一框架内解决：

1. **搜索空间问题**  
   通过 autoencoder 把离散分子结构压缩到连续 latent space，使扩散模型和进化优化更容易进行。

2. **预测可信度问题**  
   纯 NN 很快但 OOD 不可靠；TD-DFT 更物理但太慢。LUMOS 用 AGP / LSP / hybrid predictor 分层使用：
   - 优化过程中用快模型。
   - 最后筛选用 TD-DFT + NN 校正。
   这是一种比较实用的 hierarchical screening 策略。

3. **多目标优化问题**  
   荧光分子设计不是单性质优化。LUMOS 把 gradient-guided diffusion 当作 mutation operator，再用 NSGA-III 维护 Pareto front，这个设计适合同时处理多个目标和约束。

我认为这篇工作的一个重要启发是：在科学分子设计任务中，生成模型本身不是全部，真正有效的系统需要同时具备：

- 可导航的表示空间
- 多层次预测器
- 物理验证或物理校正
- 多目标优化机制
- 任务特定约束接口
- 后验筛选流程

它也说明荧光分子设计比一般药物性质优化更依赖物理一致性，因为 λabs、λemi、Stokes shift、PLQY 等性质之间存在电子结构和热力学关系，不能完全当作独立标签处理。

## 后续问题

1. LUMOS 生成的候选分子是否经过真实合成和实验验证？当前摘取文本中未看到明确湿实验验证，待补充原文/PDF 后确认。

2. 对 PLQY 的预测是否足够可靠？  
   PLQY 机制复杂，和非辐射跃迁、构象、环境等有关，仅用 NN 是否会有较大误差？

3. 当前 TD-DFT pipeline 未做 excited-state geometry optimization，对 λemi 的误差在实际设计中会带来多大影响？

4. prompt-conditioned generation 的 novelty / uniqueness 如何进一步提升？  
   是否可以通过更大规模荧光数据、主动学习或 self-training 改善？

5. LUMOS 是否可以扩展到：
   - aggregation-induced emission
   - pH-responsive fluorescent probes
   - solvatochromic probes
   - protein-bound fluorophores
   - organelle-specific probes

6. fragment optimization 中 fragment 重新连接规则是否会限制化学可合成性？

7. NSGA-III 与 diffusion mutation 的耦合是否可以替换为其他 多目标贝叶斯优化 或 质量多样性搜索 方法？

8. hybrid TD-DFT/NN predictor 的 bias correction 是否会在极端 OOD scaffold 上失效？

9. 对溶剂只使用 dielectric constant ε 是否足以描述真实溶剂效应？氢键、极性、黏度、特异性相互作用可能需要更丰富的环境表示。

10. LUMOS 中 latent space 的 smoothness 与 molecular validity 的关系是否可以定量评估，例如局部插值、扰动稳定性、合成可达性变化？
