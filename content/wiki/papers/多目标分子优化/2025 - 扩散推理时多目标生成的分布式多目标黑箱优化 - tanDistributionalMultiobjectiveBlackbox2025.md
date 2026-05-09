---
type: paper
citekey: "tanDistributionalMultiobjectiveBlackbox2025"
title: "扩散推理时多目标生成的分布式多目标黑箱优化"
chinese_title: "扩散推理时多目标生成的分布式多目标黑箱优化"
authors: "Kim Yong Tan, Yueming Lyu, Ivor Tsang, Yew-Soon Ong"
year: "2025"
venue: ""
doi: "10.48550/ARXIV.2510.26278"
zotero_collections:
  - "多目标分子优化"
status: imported
reading_status: inbox
tags:
  - paper
aliases:
  - "扩散推理时多目标生成的分布式多目标黑箱优化"
  - "Distributional Multi-objective Black-box Optimization for Diffusion-model Inference-time Multi-Target Generation"
original_title: "Distributional Multi-objective Black-box Optimization for Diffusion-model Inference-time Multi-Target Generation"
---
## 一句话总结

**Distributional Multi-objective Black-box Optimization for Diffusion-model Inference-time Multi-Target Generation** 提出 **Inference-time Multi-target Generation (IMG)**：在扩散模型反向生成过程中通过基于多目标期望值的加权重采样，把预训练扩散模型的生成分布推向多目标 Boltzmann 目标分布，从而在单次推理中生成覆盖Pareto front的多目标候选样本，并在多目标分子生成任务上显著提升Hypervolume与样本效率。

## 研究问题

本文研究的是多目标黑盒优化与扩散模型推理时优化的结合问题：

- 给定多个可能相互冲突的黑盒目标函数：
  - $f_1(\cdot), \dots, f_n(\cdot)$
- 目标不是找到单个最优解，而是生成一组非支配解，近似Pareto front。
- 目标函数为黑盒：
  - 只能评估；
  - 不可微；
  - 无显式数学表达式；
  - 不适合直接使用梯度优化。
- 应用场景包括：
  - 药物设计
  - 分子生成
  - 工程设计
  - 材料科学
  - 经济学优化

本文特别关注一个问题：

> 如何在不重新训练扩散模型、不训练可微 surrogate model 的情况下，在扩散模型推理阶段直接引导生成结果满足多个黑盒目标？

## 背景与动机

### 多目标黑盒优化的困难

多目标优化的核心困难在于目标之间往往冲突。例如在药物设计中，可能同时希望：

- 提高 binding affinity；
- 提高 synthesizability；
- 提高 drug-likeness。

这些目标之间不一定一致，提升一个目标可能损害另一个目标。因此，多目标优化通常追求Pareto front，而不是单一最优点。

在黑盒优化中，目标函数不可微，只能通过评估得到数值，因此难以使用高效的梯度方法。

### 传统 evolutionary algorithm 的局限

传统进化算法如 EA、MOEA/D、NSGA-II、SPEA2 常用于多目标黑盒优化，但在高维空间中效率较低。尤其在分子生成这类高维结构生成任务中，传统 mutation / crossover 很难稳定地产生高质量候选样本。

### 扩散模型的机会与不足

Diffusion models擅长学习复杂高维数据分布，因此近年来被用于分子优化和高维黑盒优化。

已有方法大致分为两类：

1. **训练或微调扩散模型以适应目标分布**
   - 例如为数据标注多目标值，再训练 conditional diffusion model 或 fine-tune diffusion model。
   - 缺点：
     - 数据需求大；
     - 训练成本高；
     - 不适合快速适配新目标。

2. **将预训练扩散模型作为外部优化循环中的 refiner**
   - 例如 DiffSBDD、EGD。
   - 使用进化算法产生候选，再通过扩散模型 refinement。
   - 缺点：
     - 扩散模型被当成 frozen black-box refiner；
     - 没有利用扩散生成过程内部的分布转移；
     - 可能受限于预训练模型原始分布，导致优化效率不足。

本文的动机是：

> 与其把扩散模型当作外部优化循环中的黑盒 refinement 模块，不如直接在扩散模型的反向推理过程中进行多目标分布引导。

## 核心思想

本文核心思想是：

> 在扩散模型反向生成的每一步，不直接从预训练模型的转移分布采样，而是生成多个候选，然后根据多目标偏好权重计算加权得分，并进行重采样，使最终样本逐步服从期望的多目标 Boltzmann 分布。

具体包括三层思想：

1. **分布式多目标优化视角**
   - 对每个目标函数 $f_k$，定义一个 KL-regularized distributional optimization 问题。
   - 目标是在降低期望目标值的同时，不偏离 base distribution 太远。
   - 得到指数倾斜形式的最优分布：
     
$$
q^*_k(x;\lambda) \propto p_{base}(x)e^{-f_k(x)/\lambda_k}
$$

2. **多目标 Boltzmann mixture distribution**
   - 将多个单目标最优分布混合，得到多目标目标分布：
     
$$
q^*_{mix}(x;\lambda) = p_{base}(x) \sum_k e^{-(f_k(x)-c_k)/\lambda_k}
$$

   - 其中权重项：
     
$$
W(x;\lambda)=\sum_k e^{-(f_k(x)-c_k)/\lambda_k}
$$

3. **Inference-time weighted resampling**
   - 在扩散模型每个反向步骤中，把预训练转移分布 $p_\theta(x_t,t)$ 当作 base distribution。
   - 从中采样多个候选；
   - 评估其多目标函数值；
   - 按 $W(x;\lambda)$ 进行重采样或贪婪选择；
   - 从而将扩散生成过程推向目标多目标分布。

## 方法框架

### 1. Distributional Multi-Objective Black-box Optimization

本文首先从分布优化角度形式化多目标黑盒优化。

对于单个目标 $f_k$，定义：

$$
q^*_k(x;\lambda)=\arg\min_{q(x)\in P} \left\{ \mathbb{E}_{q(x)}[f_k(x)] + \lambda_k KL(q(x)||p_0(x)) \right\}
$$

其闭式解为：

$$
q^*_k(x;\lambda) \propto p_{base}(x)e^{-f_k(x)/\lambda_k}
$$

然后对所有目标构建 mixture：

$$
q^*_{mix}(x;\lambda)=\sum_k \pi_k q^*_k(x;\lambda)
$$

可写为：

$$
q^*_{mix}(x;\lambda)=p_{base}(x)\sum_k e^{-(f_k(x)-c_k)/\lambda_k}
$$

其中：

- $p_{base}$：基础分布；
- $\lambda_k$：第 $k$ 个目标的偏好/温度参数；
- $c_k$：吸收归一化常数与 mixture weight 的项；
- $W(x;\lambda)$：将 base distribution 转换为 target distribution 的权重因子。

### 2. IMG: Inference-time Multi-target Generation

Inference-time Multi-target Generation，简称 **IMG**，是在扩散模型推理时执行的多目标生成算法。

在每个扩散时间步 $t$：

- 将预训练 reverse transition $p_\theta(x_t,t)$ 视作 base distribution；
- 生成候选 $x_{t-1}$；
- 用目标函数 $f_1,\dots,f_n$ 评估候选；
- 根据偏好向量 $\lambda_i$ 计算权重；
- 重采样得到该实例下一步状态。

目标转移分布为：

$$
x_{t-1} \sim q^*_{mix}(x_t,t;\lambda)
$$

近似为：

$$
x_{t-1} \sim p_\theta(x_t,t)W(x;\lambda)
$$

### 3. Batch-level multi-target generation

为了生成覆盖不同 trade-off 的样本，IMG 对 batch 中不同样本分配不同 preference vector：

$$
\lambda_i \in \mathbb{R}^n
$$

这样一个 batch 中的不同实例对应不同目标分布，可以同时生成多种目标权衡解。

### 4. Preference vector generation

当用户没有指定 preference distribution $p(\lambda)$ 时，作者提出用Quasi-Monte Carlo方法在正超球面表面均匀生成 preference vectors。

该方法对应论文中的 **Algorithm 2: Preference Weight Vectors Generation**。

其目的：

- 让 preference vectors 更均匀覆盖多目标偏好空间；
- 避免普通 Monte Carlo 采样出现聚集和空洞；
- 提高生成样本在Pareto front上的覆盖多样性。

## 算法流程

### Algorithm 1: Inference-time Multi-Target Generation (IMG)

输入：

- 预训练扩散模型 $p$
- batch size $N$
- resampling size $M$
- 多目标函数：
  
$$
f:\mathbb{R}^d \to \mathbb{R}^n
$$

输出：

- 生成样本集合：
  
$$
\{x^0_0,\dots,x^N_0\}
$$

流程概括：

1. 为 batch 中每个样本初始化 preference vector：
   
$$
\lambda_i \sim p(\lambda), \quad i\in[N]
$$

2. 初始化扩散起点：
   - 通用形式为：
     
$$
x^i_T \sim \mathcal{N}(0,I)
$$

   - 分子生成实验中使用 DiffSBDD 的 diversify strategy，从 reference molecule 加噪得到 $x_\tau$。

3. 对每个反向扩散时间步 $t=T,\dots,1$：

   1. 对每个 batch 样本 $x^i_t$，采样 $M$ 个候选：
      
$$
\tilde{x}^{ij}_{t-1}\sim p_\theta(x^i_t,t)
$$

   2. 计算每个候选的多目标值：
      
$$
y^{ij}_{t-1}=f(\tilde{x}^{ij}_{t-1})
$$

   3. 收集全部候选形成 buffer：
      
$$
B=N\times M
$$

   4. 对每个 preference vector $\lambda_i$，从 buffer 中选择一个候选作为 $x^i_{t-1}$。

4. 返回最终生成样本。

### Practical implementation

#### 预计算 objective values

为了避免重复评估目标函数，论文先为 buffer 中所有候选预计算：

$$
y^b=[f_1(x^b),\dots,f_n(x^b)]
$$

然后用：

$$
\tilde{W}(y^b;\lambda_i)=\sum_k e^{-(y^b_k-c_k)/\lambda^i_k}
$$

进行选择。

#### Greedy Sampling Without Replacement

虽然理论上可以按 categorical distribution 概率采样，但小 batch 时近似可能不稳定。论文实际采用 greedy sampling without replacement：

- 对每个 $\lambda_i$，选择权重最大的候选；
- 一旦候选被选中，就从 buffer 中移除；
- 防止多个 preference vector 选择同一个样本；
- 增加 batch 内多样性。

论文算法中公式写作：

$$
b^*=\arg\min_{b\in[B]}\tilde{W}(y^b;\lambda_i)
$$

但正文描述为选择最大权重候选。这里存在符号/方向上的潜在不一致，需待补充原文/PDF 后确认。

#### Coefficient $c_k$

理论上：

$$
c_k=\lambda_k\log(Z_k/\pi_k)
$$

其中 $Z_k$ 是不可解归一化常数。

实际实现中，作者将 $c_k$ 设置为优化过程中的 running upper bound，即每个目标当前观察到的最差 objective value。

#### Preference vector

preference vector 的设计影响最终样本多样性。本文提出用基于Quasi-Monte Carlo的采样方法，在正超球面表面生成较均匀的 preference vectors。

## 实验设置

### 任务

实验任务为多目标分子生成，具体是结构基础药物设计中的 oncology inhibitor generation。

目标蛋白：

- PDB ID: **5ndu**

参考分子：

- **8V2**

### 预训练模型

使用 **DiffSBDD** 作为预训练分子生成模型。

具体模型：

- `crossdocked_fullatom_cond model`

训练数据：

- **CrossDocked dataset**
- 包含约 100,000 protein-ligand complexes。

DiffSBDD 是一个条件扩散模型，可基于目标蛋白 binding pocket 生成 3D molecules。

### 多目标函数

实验使用 3 个目标：

1. **Vina score**
   - 用于估计 binding affinity；
   - 目标是最大化 binding affinity。

2. **SA score**
   - 衡量 synthesizability；
   - 目标是提高可合成性。

3. **QED value**
   - 衡量 drug-likeness；
   - 目标是提高类药性。

论文中将所有目标取负号，使问题符合最小化形式，并归一化到 $[-1,0]$ 以提升数值稳定性和简化Hypervolume计算。

### 生成方式

虽然 Algorithm 1 描述从 Gaussian noise 开始：

$$
x_T\sim \mathcal{N}(0,I)
$$

但在实验中，作者采用 DiffSBDD 的 diversify strategy：

$$
x_\tau \sim p(x_\tau|x_{ref})
$$

即从参考分子加噪后的状态开始反向生成。

使用参数：

- diversify steps：
  
$$
\tau=100
$$

### IMG 参数

- batch size：
  
$$
N=64
$$

- resampling size：
  
$$
M\in\{4,8,16\}
$$

- 总 objective evaluations：
  
$$
N\times M\times \tau
$$

### Baselines

比较方法包括：

1. **EGD**
   - 来自 Sun et al. 2025；
   - 面向多目标 3D molecular generation；
   - 使用扩散模型辅助 evolutionary search；
   - 原实现当时未开源，本文作者自行实现。

2. **DiffSBDD-EA (Mean)**
   - 基于 DiffSBDD 的 evolutionary algorithm；
   - 原方法偏单目标；
   - 本文用目标均值作为聚合 fitness。

3. **DiffSBDD-EA (SPEA2)**
   - 使用 SPEA2 fitness function 聚合/选择。

Baseline 设置：

- population size：
  
$$
64
$$

- evolutionary steps：
  
$$
3000
$$

- full run objective evaluations：
  
$$
64\times3000=192k
$$

### Hybrid 方法

作者还测试了 **EGD+IMG**：

- 先运行 EGD 500 steps；
- 用 EGD 最终 population 作为 IMG 起点；
- IMG resampling size：
  
$$
M=8
$$

用于验证 IMG 是否可以集成进现有迭代优化框架中。

### 评估指标

主要指标为Hypervolume。

给定解集：

$$
X=\{x_1,\dots,x_N\}
$$

参考点为原点：

$$
0\in\mathbb{R}^n
$$

因为目标归一化后上界为 0。

Hypervolume 计算为 Pareto front 与 reference point 围成的体积。HV 越大，表示解集在收敛性和多样性上越好。

实验重复：

- 每个算法独立运行 3 次；
- 报告平均 HV 和标准差。

## 主要结果

### 表 1 结果摘要

#### 25.6k objective evaluations

| Algorithm | Hypervolume | Pareto Front 数量 | Run Time |
|---|---:|---:|---:|
| IMG | 0.5732 ± 0.0387 | 12.33 | 1h 12m |
| EGD | 0.5379 ± 0.0301 | 17.00 | 2h 34m |
| DiffSBDD-EA (Mean) | 0.5366 ± 0.0374 | 9.00 | 2h 39m |
| DiffSBDD-EA (SPEA2) | 0.5149 ± 0.0375 | 18.00 | 2h 41m |

#### 51.2k objective evaluations

| Algorithm | Hypervolume | Pareto Front 数量 | Run Time |
|---|---:|---:|---:|
| IMG | 0.6450 ± 0.0964 | 12.00 | 1h 59m |
| EGD | 0.5747 ± 0.0480 | 18.00 | 5h 8m |
| DiffSBDD-EA (Mean) | 0.5619 ± 0.0501 | 8.00 | 5h 18m |
| DiffSBDD-EA (SPEA2) | 0.5253 ± 0.0623 | 10.00 | 5h 22m |

#### 102.4k objective evaluations

| Algorithm | Hypervolume | Pareto Front 数量 | Run Time |
|---|---:|---:|---:|
| IMG | 0.6972 ± 0.0394 | 7.67 | 3h 42m |
| EGD | 0.5732 ± 0.0396 | 19.00 | 10h 13m |
| DiffSBDD-EA (Mean) | 0.5824 ± 0.0373 | 3.00 | 10h 37m |
| DiffSBDD-EA (SPEA2) | 0.5515 ± 0.0318 | 19.00 | 10h 44m |

#### 204.8k objective evaluations / hybrid

| Algorithm | Hypervolume | Pareto Front 数量 | Run Time |
|---|---:|---:|---:|
| IMG | 0.7413 ± 0.0119 | 13.00 | 7h 24m |
| EGD+IMG | 0.7447 ± 0.0496 | 13.67 | 5h 11m |

### 主要观察

1. **IMG 在相同 objective evaluation 数量下取得更高 Hypervolume**
   - 尤其在 $M=8,16,32$ 时明显优于 baselines。

2. **IMG 样本效率更高**
   - Baselines 往往需要数百甚至数千轮扩散生成/进化；
   - IMG 在单次 diffusion inference pass 中即可得到强结果。

3. **IMG 的性能随 resampling size 增大而提升**
   - 表明更大的候选 buffer 有助于选择更优多目标 trade-off。

4. **Baseline 在约 50k objective evaluations 后性能趋于平坦**
   - 论文认为可能是因为 EA-based baseline 将预训练扩散模型作为 frozen refiner，优化分布受限于模型原始分布。

5. **IMG 可以与 baseline 结合**
   - EGD+IMG 进一步提升性能；
   - 说明 IMG 可作为一个可插拔模块集成到现有优化流程中。

### Appendix 结果

#### 生成分子可视化

论文展示了 IMG 在单次扩散推理中生成的 9 个分子，目标蛋白 pocket 为 **5ndu**。

#### Ablation: coefficient $c$

- 固定：
  - $N=32$
  - $M=8$
- 改变统一系数：
  
$$
c\in[-1.0,1.0]
$$

- 结果显示 HV 对 $c$ 不高度敏感，说明 IMG 对该超参数较鲁棒。

#### Ablation: batch size $N$

- 固定：
  
$$
M=32
$$

- 改变：
  
$$
N\in\{2,4,8,16,32\}
$$

- 结果显示 batch size 越大，最终 HV 越高。
- 原因：
  - 更多 preference vectors；
  - 更完整覆盖 Pareto front；
  - 更大的 candidate buffer $B=NM$。

#### QMC preference vector

作者展示 Algorithm 2 相比 Tashiro (1977) 的 uniform Monte Carlo sampling，可以更均匀地产生 preference vectors，减少聚集和空洞。

#### Pareto front 分析

在 204.8k objective evaluations 下：

- IMG 从 64 个样本中得到 16 个非支配 Pareto points；
- HV 为 0.7640。

将四个算法各 64 个样本合并，共 256 个解：

- combined Pareto front 有 31 个非支配点；
- combined HV 为 0.8103。

各算法贡献：

| Algorithm | Combined Pareto Front 贡献点数 |
|---|---:|
| IMG | 16 |
| EGD | 6 |
| DiffSBDD-EA (Mean) | 8 |
| DiffSBDD-EA (SPEA2) | 1 |

说明 IMG 对最终 combined Pareto front 贡献超过一半，且覆盖更均匀。

## 创新点

1. **提出 Distributional Multi-objective Black-box Optimization 框架**
   - 将多目标黑盒优化转化为 KL-regularized distributional optimization。
   - 推导出多目标 Boltzmann mixture distribution。

2. **提出 Inference-time Multi-target Generation (IMG)**
   - 不需要重新训练扩散模型；
   - 不需要 surrogate model；
   - 不需要目标函数可微；
   - 直接在扩散反向推理过程中进行多目标 weighted resampling。

3. **单次 diffusion inference pass 生成多目标 Pareto 解集**
   - 相比需要多轮 EA 循环的 baseline，IMG 样本效率更高。

4. **提出多目标 Boltzmann 分布的 negative log-likelihood 解释**
   - 定义：
     
$$
L(x;\lambda)=-\log\left(\sum_k e^{-(f_k(x)-c_k)/\lambda_k}\right)
$$

   - 当 temperature $\beta=1$ 时，mixture optimal distribution 等价于该 NLL 目标的 KL-regularized distributional optimization 解。

5. **提出基于 Quasi-Monte Carlo 的 preference vector generation**
   - 在正超球面表面更均匀生成 preference vectors；
   - 改善多目标偏好空间覆盖。

6. **可插拔性**
   - IMG 可以与现有 EA-based methods 结合，例如 EGD+IMG。

## 局限性

1. **每个 diffusion step 需要多次 objective evaluation**
   - IMG 的成本为：
     
$$
N\times M\times \tau
$$

   - 如果目标函数评估非常昂贵，成本仍可能较高。

2. **需要目标函数能在中间 noisy state 上评估**
   - 实验中作者在每个 reverse diffusion step 对候选进行 objective evaluation。
   - 对于某些数据类型，中间状态可能不是合法样本，如何评估目标需要具体处理。
   - 该问题在本文中未充分展开，待补充原文/PDF 后确认。

3. **实验主要集中在单个分子生成任务**
   - 使用目标蛋白 **5ndu** 和参考分子 **8V2**。
   - 是否能泛化到更多蛋白、更多分子任务或非分子任务，需要更多实验验证。

4. **EGD baseline 为作者自行实现**
   - 因为 EGD 原实现当时未开源。
   - 复现公平性和实现细节需进一步检查，待补充原文/PDF 后确认。

5. **greedy selection 公式与文字描述可能存在方向不一致**
   - 文中描述选择 largest weight；
   - Algorithm 中写为 `arg min`；
   - 需要确认是否由于目标取负、权重定义或排版导致。

6. **preference vector 的实际影响仍依赖 batch size**
   - 当 batch size 较小、目标维度较高时，Pareto front 覆盖可能不足。

7. **理论分布与有限 batch 近似之间存在差距**
   - weighted resampling 在足够大 batch 下近似目标分布；
   - 小 batch 时作者采用 greedy strategy，但其理论误差未充分分析。

## 相关概念

- [[多目标优化]]
- [[多目标黑盒优化]]
- [[黑盒优化]]
- [[分布式优化]]
- [[Distributional Optimization]]
- [[KL-regularized Optimization]]
- [[Boltzmann Distribution]]
- [[Multi-target Boltzmann Distribution]]
- [[Pareto front]]
- [[Pareto optimality]]
- [[Non-dominated Solutions]]
- [[Hypervolume]]
- [[Preference Vector]]
- [[Weighted Resampling]]
- [[Greedy Sampling Without Replacement]]
- [[Quasi-Monte Carlo]]
- [[扩散模型]]
- [[Denoising Diffusion Probabilistic Models]]
- [[Reverse Diffusion Process]]
- [[Inference-time Optimization]]
- [[分子生成]]
- [[Structure-based Drug Design]]
- [[3D Molecule Generation]]
- [[Drug-likeness]]
- [[Binding Affinity]]
- [[Synthesizability]]
- [[Vina Score]]
- [[SA Score]]
- [[QED]]

## 相关方法

- [[Inference-time Multi-target Generation]]
- [[IMG]]
- [[DiffSBDD]]
- [[EGD]]
- [[Evolutionary Algorithm]]
- [[NSGA-II]]
- [[MOEA/D]]
- [[SPEA2]]
- [[Diffusion Posterior Sampling]]
- [[Conditional Diffusion Model]]
- [[Preference-Guided Diffusion]]
- [[Surrogate-assisted Optimization]]
- [[Diffusion Model for Black-box Optimization]]
- [[Training-free Guidance]]
- [[Quasi-Monte Carlo Sampling]]
- [[Tashiro Sphere Sampling]]

## 相关论文

- [[Distributional Multi-objective Black-box Optimization for Diffusion-model Inference-time Multi-Target Generation]]
- [[DiffSBDD]]
  - Schneuing et al. 2024, *Structure-based drug design with equivariant diffusion models*
- [[EGD]]
  - Sun et al. 2025, *Evolutionary training-free guidance in diffusion model for 3D multi-objective molecular generation*
- [[Preference-Guided Diffusion for Multi-Objective Offline Optimization]]
  - Annadani et al. 2025
- [[BInD]]
  - Lee et al. 2024, *Bond and Interaction-Generating Diffusion Model for Multi-Objective Structure-Based Drug Design*
- [[EmoDM]]
  - Yan and Jin 2024, *A diffusion model for evolutionary multi-objective optimization*
- [[Diffusion Models for Black-box Optimization]]
  - Krishnamoorthy et al. 2023
- [[Training-free multi-objective diffusion model for 3D molecule generation]]
  - Han et al. 2023
- [[Denoising Diffusion Probabilistic Models]]
  - Ho et al. 2020
- [[Diffusion Models Beat GANs on Image Synthesis]]
  - Dhariwal and Nichol 2021
- [[MOEA/D]]
  - Zhang and Li 2007
- [[NSGA-II]]
  - Deb et al. 2000
- [[SPEA2]]
  - Zitzler et al. 2001
- [[GuacaMol]]
  - Brown et al. 2019
- [[DrugEx v2]]
  - Liu et al. 2021

## 源文件

- citekey: `tanDistributionalMultiobjectiveBlackbox2025`
- title: **Distributional Multi-objective Black-box Optimization for Diffusion-model Inference-time Multi-Target Generation**
- authors: Kim Yong Tan, Yueming Lyu, Ivor Tsang, Yew-Soon Ong
- year: 2025
- venue: 待补充原文/PDF 后确认
- DOI: `10.48550/ARXIV.2510.26278`
- arXiv: `2510.26278`
- collections: 多目标分子优化

## 图表摘录

![[raw/zotero/images/多目标分子优化/2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025/page-001.png]]

## Zotero 原始摘要

Diffusion models have been successful in learning complex data distributions. This capability has driven their application to high-dimensional multi-objective black-box optimization problem. Existing approaches often employ an external optimization loop, such as an evolutionary algorithm, to the diffusion model. However, these approaches treat the diffusion model as a black-box refiner, which overlooks the internal distribution transition of the diffusion generation process, limiting their efficiency. To address these challenges, we propose the Inference-time Multi-target Generation (IMG) algorithm, which optimizes the diffusion process at inferencetime to generate samples that simultaneously satisfy multiple objectives. Specifically, our IMG performs weighted resampling during the diffusion generation process according to the expected aggregated multi-objective values. This weighted resampling strategy ensures the diffusion-generated samples are distributed according to our desired multi-target Boltzmann distribution. We further derive that the multi-target Boltzmann distribution has an interesting log-likelihood interpretation, where it is the optimal solution to the distributional multi-objective optimization problem. We implemented IMG for a multi-objective molecule generation task. Experiments show that IMG, requiring only a single generation pass, achieves a significantly higher hypervolume than baseline optimization algorithms that often require hundreds of diffusion generations. Notably, our algorithm can be viewed as an optimized diffusion process and can be integrated into existing methods to further improve their performance.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的关键价值在于，它没有把扩散模型仅仅当成一个外部优化器中的“生成候选/修复候选”的黑盒模块，而是直接进入扩散模型的反向生成链，在每一步用多目标权重重采样来改变生成轨迹。

从优化角度看，IMG 像是在做一种“推理时分布搬运”：

- 原始扩散模型给出的是数据分布附近的高质量候选；
- 多目标 Boltzmann 权重告诉模型哪些候选更符合当前 preference vector；
- 多个 preference vectors 同时运行，使一个 batch 覆盖多个 trade-off；
- 最终生成的不是单点最优，而是一组近似 Pareto front 的样本。

相比 EA-based 方法，IMG 的优势在于：

- EA 通常在外层循环中反复调用扩散模型；
- IMG 则把选择压力注入每个 reverse diffusion step；
- 因此每一步生成都在朝多目标分布偏移，而不是等生成后再筛选。

这也解释了为什么 IMG 在相同 objective evaluation 数量下能有更高 HV：它不是“生成后优化”，而是“生成中优化”。

不过我认为这类方法的实际适用性高度依赖一个条件：目标函数必须能频繁、稳定、低成本地评估。如果目标函数是昂贵 wet-lab 实验或复杂模拟，那么每个 diffusion step 都评估 $N\times M$ 个候选可能不现实。分子任务中 Vina / SA / QED 相对可计算，因此比较适合 IMG。

另一个值得注意的问题是中间 noisy state 的语义。对于分子 3D 结构，中间扩散状态是否总是可被 Vina / SA / QED 合理评估？论文似乎直接进行了评估，但这个细节可能影响方法的可靠性。若中间状态不是合法分子，则 objective evaluation 可能需要解码、修复或特殊处理。该点需要进一步查阅实现代码或 PDF 细节。

整体上，IMG 可以被理解为一种针对多目标分子优化的 training-free、inference-time、distributional steering 方法。它与 classifier guidance / reward guidance 有相似精神，但不要求目标可微，也不训练 reward model，而是用 resampling 完成分布偏移。

## 后续问题

1. IMG 在每个 reverse diffusion step 中评估的候选是否都是合法分子？如果不是，目标函数如何计算？

2. Algorithm 1 中 greedy selection 写作 `arg min W`，但正文说选择 largest weight，这是否是论文排版错误？

3. $c_k$ 设置为 running upper bound 的具体实现细节是什么？
   - 是全局历史最差值？
   - 还是当前 batch 最差值？
   - 是否对不同目标分别维护？

4. preference vector $\lambda$ 的尺度如何影响搜索？
   - 是否需要归一化？
   - 是否对不同目标敏感？

5. IMG 是否适用于目标评估昂贵的场景？
   - 是否可以结合 surrogate model 减少 objective evaluations？
   - 是否可以只在部分 diffusion steps 进行 resampling？

6. IMG 对目标数量 $n$ 的扩展性如何？
   - 当目标从 3 个增加到 5 个、10 个时，batch size 需求是否急剧增加？

7. QMC preference vector generation 在高维目标空间中是否仍然均匀有效？

8. IMG 与 classifier-free guidance、classifier guidance、DPS 等扩散引导方法之间的理论关系是什么？

9. 是否可以将 IMG 与 Bayesian Optimization 或 Active Learning 结合，用于昂贵黑盒目标？

10. 在更多蛋白靶点和更多 reference molecules 上，IMG 的性能是否仍然稳定？

11. 是否可以把 IMG 应用于非分子任务，例如材料结构生成、工程设计或图结构优化？

12. 与直接训练 preference-conditioned diffusion model 相比，IMG 在性能、效率和泛化上的边界在哪里？
