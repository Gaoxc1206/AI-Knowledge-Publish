---
type: paper
citekey: "tagasovskaParetooptimalCompositionalEnergybased"
title: "用于蛋白质序列采样与优化的帕累托最优组合能量模型"
chinese_title: "用于蛋白质序列采样与优化的帕累托最优组合能量模型"
authors: "Nataša Tagasovska, Nathan C Frey, Andreas Loukas, Isidro Hötzel, Ryan Lewis Kelly, Yan Wu, Arvind Rajpal, Richard Bonneau, Kyunghyun Cho, Stephen Ra, Vladimir Gligorijevic"
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
  - "用于蛋白质序列采样与优化的帕累托最优组合能量模型"
  - "A Pareto-optimal compositional energy-based model for sampling and optimization of protein sequences"
original_title: "A Pareto-optimal compositional energy-based model for sampling and optimization of protein sequences"
---
## 一句话总结

这篇论文提出 **Pareto-compositional energy-based model (pcEBM)**，将 Energy-Based Model 的组合式采样与 多目标优化 中的 Multiple Gradient Descent 结合，用于生成或优化同时满足多个性质约束的蛋白质/抗体序列，并在抗体设计任务中展示了学习非凸 Pareto front、提升多性质权衡采样质量的能力。

## 研究问题

论文关注的问题是：如何在 蛋白质序列设计，尤其是 抗体设计 中，生成同时满足多个目标性质的新序列。

具体来说，生命科学中的 inverse design 通常不仅要求生成样本符合训练数据分布，还要求满足多个下游性质。例如治疗性抗体需要同时考虑：

- 与已知人源抗体的相似性，即 **Ab-like**；
- 对目标抗原的结合能力，即 **binding affinity / Aff**；
- 非特异性结合风险，即 **nonspecificity / BV score**；
- 其他 developability 相关性质，如黏度、可制造性、临床可开发性等。

这些性质之间可能相互独立、正交，甚至冲突。因此，单目标优化或简单加权求和可能无法得到合理的候选序列。论文希望解决：

> 如何从多个属性模型中采样，使生成的序列落在或接近 Pareto front，从而提供一组在多个目标之间达到不同权衡的候选抗体序列。

## 背景与动机

深度生成模型 已被广泛用于生命科学中的反向设计问题，包括：

- GAN
- VAE
- EBM
- Diffusion Model

但论文指出，尽管这些模型在图像等领域有许多成功案例，在真实工业生命科学应用中仍面临困难：

1. 许多生成模型评估集中在图像数据集，生命科学任务中的评价协议和指标不足。
2. 可控生成较难，例如生成结果需要满足多个明确性质。
3. 模型可能生成与训练集过于相似或缺乏新颖性的样本。
4. 对分子或抗体而言，单纯生成“看起来合理”的样本并不保证实验或开发成功。

在治疗性抗体设计中，一个分子需要同时满足多种性质。只优化结合亲和力可能牺牲 developability，例如导致非特异性结合、黏度问题或制造风险。论文认为，在多个目标冲突时，通常不存在一个样本能同时最优满足所有目标，因此更合理的目标是生成一组 Pareto optimal 候选，从中根据实际偏好选择。

论文的动机可以概括为：

> 将 多目标优化 的 Pareto 最优思想引入 Energy-Based Model 的组合式生成，使生成过程不仅考虑多个属性模型，还能沿着 Pareto 改进方向采样。

## 核心思想

论文的核心方法是 **Pareto-compositional energy-based model (pcEBM)**。

其关键思想包括：

1. **每个性质对应一个 EBM**
   - 论文训练多个属性相关的 Energy-Based Model。
   - 每个 EBM 对应一个性质，例如 **Ab-like**、**Aff**、**BV score**。
   - 能量越低表示该序列越符合对应性质。

2. **组合多个 EBM 以表达多性质约束**
   - 传统 compositional EBM 可以通过 product of experts 组合多个能量函数：
     
$$
p(x|f_1 \wedge f_2 \wedge \cdots \wedge f_m) \propto e^{-\sum_i E(x|f_i)}
$$

   - 这相当于直接最小化多个能量的和。

3. **用 Multiple Gradient Descent 寻找 Pareto 改进方向**
   - 简单求和会隐含固定权重，可能偏向某些目标。
   - pcEBM 不使用固定权重，而是在每一步采样时根据当前序列动态计算一个方向，使所有目标尽可能同时下降。
   - 该方向来自 Multiple Gradient Descent，目标是最大化所有目标中最慢的下降速率。

4. **在 Langevin Dynamics 中加入 Pareto 改进方向和噪声**
   - pcEBM 不是纯优化，而是采样。
   - 它结合了 MGD 的 Pareto 改进方向和 Langevin Dynamics 的噪声项。
   - 噪声有助于探索更宽的 Pareto front，而 MGD 方向有助于向多目标更优区域移动。

直观理解：

> cEBM 是“把多个目标能量加起来一起降”；pcEBM 是“每一步动态寻找能让多个目标都尽量下降的 Pareto 方向，再加噪声进行探索”。

## 方法框架

论文方法由以下部分组成。

### 1. 问题设定

抗体由两个氨基酸链组成，可以表示为字符序列。每个氨基酸来自 20 种氨基酸字母表。

论文记序列为：

$$
x = (x_1, ..., x_L)
$$

其中：

$$
x_l \in \{1, ..., 20\}
$$

表示第 $l$ 个位置的氨基酸类型。序列总长度约为：

$$
L \sim 250
$$

对每个序列，有 $m$ 个待优化性质：

$$
f_i: \mathbb{R}^L \rightarrow \mathbb{R}, \quad i = 1, ..., m
$$

目标是生成新序列 $x^*$，使其在多个性质上都具有期望值。

由于多个目标可能相互冲突，论文不追求一个全局同时最优解，而是追求 Pareto optimality。

### 2. Pareto optimality

论文采用的定义大意如下：

对于两个点 $x_1, x_2$，如果：

$$
f_i(x_2) \leq f_i(x_1), \forall i \in [m]
$$

则称 $x_2$ 支配 $x_1$。

如果一个点不被任何其他点支配，则称为全局 Pareto 最优点。所有 Pareto 最优点的函数值集合称为 Pareto front。

### 3. 线性标量化 baseline

一种简单多目标优化方式是 linear scalarization：

$$
f_\lambda(x) = \sum_{i=1}^{m} \lambda_i f_i(x)
$$

其中 $\lambda$ 是概率单纯形上的偏好向量：

$$
\sum_i \lambda_i = 1, \lambda_i \geq 0
$$

但线性标量化更适用于凸 Pareto front。对于非凸 Pareto front，它可能无法覆盖全部 Pareto 最优区域。

### 4. Multiple Gradient Descent

Multiple Gradient Descent 的思想是每一步选择一个更新方向 $g(x)$，使所有目标尽可能同时下降。

更新形式为：

$$
x_k \leftarrow x_{k-1} - \eta g(x)
$$

其中 $g(x)$ 通过以下优化问题得到：

$$
g(x) \propto \arg\max_{g \in \mathbb{R}^d}
\left\{
\min_{i \in [m]} \langle g, \nabla_x f_i(x) \rangle
\quad \text{subject to } \|g\|_2 \leq 1
\right\}
$$

这个方向试图最大化最慢下降目标的下降速率。若不同目标的梯度冲突严重，可能得到 $g(x)=0$，过程在局部 Pareto 点终止。

根据 Désidéri 的结果，该方向可由以下加权梯度组合得到：

$$
g(x) \approx \sum_{i=1}^{m} \lambda_i^* \nabla_x f_i(x)
$$

其中 $\lambda_i^*$ 由一个凸优化问题确定：

$$
\min_{\lambda_i}
\left\|
\sum_{i=1}^{m} \lambda_i \nabla_x f_i(x)
\right\|^2
$$

约束为：

$$
\sum_{i=1}^{m} \lambda_i = 1,\quad \lambda_i \geq 0
$$

当 $m=2$ 时有闭式解；当 $m>2$ 时可用快速算法求解。

### 5. Compositional Energy-Based Model

Energy-Based Model 学习一个能量函数：

$$
E_\theta(x)
$$

并通过 Boltzmann 分布表示数据概率：

$$
p_\theta(x) \propto e^{-E_\theta(x)}
$$

通常使用 contrastive divergence 训练。

采样时可使用 Langevin Dynamics：

$$
x = x_{k-1} - \frac{\eta}{2}\nabla_x E_\theta(x_{k-1}) + \omega_k
$$

其中：

$$
\omega \sim \mathcal{N}(0, \sigma^2)
$$

compositional EBM 将多个性质对应的 EBM 组合起来，例如合取形式：

$$
p(x|f_1 \wedge f_2 \wedge \cdots \wedge f_m)
= \prod_i p(x|f_i)
\propto e^{-\sum_i E(x|f_i)}
$$

其采样为：

$$
x = x_{k-1}
- \frac{\eta}{2}
\nabla_x \sum_i E_\theta(x_{k-1}|f_i)
+ \omega_k
$$

### 6. pcEBM

论文提出的 **pcEBM** 将 MGD 的方向选择加入 compositional EBM 采样：

$$
x_k \leftarrow x_{k-1}
- \eta
\arg\max_{g \in \mathbb{R}^d}
\left\{
\min_{i \in [m]} \langle g, \nabla_x f_i(x_{k-1}) \rangle
\quad \text{subject to } \|g\|_2 \leq 1
\right\}
+ \sqrt{2\alpha}\omega
$$

其中：

- 内部优化问题与 MGD 相同；
- 外层采样类似 Langevin diffusion；
- $\alpha$ 是正数；
- $\omega$ 是噪声项。

论文认为：

- 当样本远离 Pareto front 且梯度明显时，pcEBM 会把样本推向 Pareto front；
- 当样本接近 Pareto front 且梯度接近消失时，噪声主导，使样本进行类似 Brownian motion 的探索；
- 噪声帮助 pcEBM 比纯 MGD 更好覆盖 Pareto front；
- 动态 Pareto 方向使 pcEBM 比 cEBM 更有效地优化多个性质。

## 算法流程

根据论文内容，pcEBM 的流程可整理如下。

### 输入

- 初始序列 $x_0$，可以是：
  - 随机噪声初始化；
  - 已有抗体 seed sequence。
- 多个属性 EBM：
  - $E_1(x)$
  - $E_2(x)$
  - ...
  - $E_m(x)$
- 步长 $\eta$
- 采样步数 $k$
- 噪声强度参数 $\alpha$

### 每一步迭代

对于第 $t$ 步：

1. 计算当前序列 $x_{t-1}$ 在各属性 EBM 上的梯度：
   
$$
\nabla_x E_i(x_{t-1})
$$

2. 求解 MGD 权重：
   
$$
\lambda^* =
   \arg\min_{\lambda}
   \left\|
   \sum_i \lambda_i \nabla_x E_i(x_{t-1})
   \right\|^2
$$

   约束：
   
$$
\sum_i \lambda_i = 1,\quad \lambda_i \geq 0
$$

3. 得到 Pareto 改进方向：
   
$$
g(x_{t-1}) = \sum_i \lambda_i^* \nabla_x E_i(x_{t-1})
$$

4. 加入噪声并更新序列：
   
$$
x_t = x_{t-1} - \eta g(x_{t-1}) + \sqrt{2\alpha}\omega
$$

5. 重复直到达到采样步数或收敛。

### 输出

- 一组候选抗体序列；
- 这些序列在多个属性能量空间中应接近或覆盖 Pareto front。

## 实验设置

### 任务

论文在真实抗体设计任务上评估方法，目标是生成或优化符合多个性质的抗体序列。

考虑的主要性质包括：

1. **Ab-like**
   - 与已知人源抗体相似。
   - 数据来自 public database of observed antibodies。
   - 文中引用为 Observed Antibody Space。

2. **Aff**
   - binding affinity，即与目标抗原的结合亲和力。

3. **BV score**
   - nonspecificity 的实验度量。
   - 来源为对 baculovirus particles 非特异性结合的 ELISA。
   - 论文中较高的 BV score 在部分实验图中表示更好；但在 EBM 能量指标中，能量越低越好。

### 数据来源

论文称使用 public and proprietary sources 训练三个独立 EBM，每个 EBM 对应一个目标性质。

具体 proprietary 数据集细节未在摘取文本中给出，需：

- 待补充原文/PDF 后确认。

### 模型架构

所有属性模型和 baseline 使用相同的神经网络架构：

- sequence-based convolution networks；
- 每条蛋白链一个模型；
- 三层 Conv1D；
- kernel size = 9；
- padding = 1；
- ReLU 非线性；
- penultimate layer size = 256。

训练细节：

- 所有 EBM 使用 contrastive training；
- 优化器为 Adam；
- 使用 early stopping criterion。

具体学习率、batch size、训练轮数等信息在摘取文本中未给出：

- 待补充原文/PDF 后确认。

### 对比方法

论文比较了 **pcEBM** 与三个 baseline：

1. **MGD**
   - Multiple Gradient Descent
   - 不加入噪声。

2. **cEBM**
   - compositional EBM
   - 使用 Langevin Dynamics
   - 对所有属性使用均匀权重。

3. **ls-cEBM**
   - linearly scaled cEBM
   - 与 cEBM 类似，但使用 domain-informed weights。

4. **pcEBM**
   - 每个序列、每一步动态学习/计算各属性最优权重；
   - 使用 Pareto 方向和噪声采样。

### 超参数搜索

论文附录给出的多属性采样 baseline 超参数网格：

- step size：
  
$$
\eta \in \{1e^{-4}, 1e^{-2}, 1, 10, 40\}
$$

- number of steps：
  
$$
k \in \{100, 200, 300, 400\}
$$

- noise type：
  
$$
\omega \in \{\mathcal{N}, U\}
$$

即噪声类型包括正态分布和均匀分布。

### 评价指标

#### 1. Hypervolume, HV

论文采用 Hypervolume 指标评价多目标优化解集质量。

在实验中：

- 每个属性的 EBM energy score 被视为目标函数；
- 能量越低越好；
- reference point 设为：
  
$$
r = (1.0, 1.0, 1.0)
$$

- 使用 PyMoo 实现计算 HV。

HV 越大表示 Pareto 解集覆盖的目标空间越大，整体多目标优化效果越好。

#### 2. Edit distance, edist

论文使用 edit distance 衡量生成序列与训练集中具有相应性质的真实序列之间的相似性。

具体采用：

- Levenshtein distance；
- 考虑 insertion、deletion、substitution；
- 使用 edist / Edlib 实现。

edist 越小，说明生成序列与真实数据中具有该性质的序列越相似。

### 研究问题

论文实验试图回答四个问题：

- **Q1**：能否使用 EBMs 生成有效/合理、同时满足多属性的抗体序列？
- **Q2**：使用 Langevin Dynamics 采样是否能提出更多 Pareto optimal 序列？
- **Q3**：pcEBM 是否优于 cEBM？
- **Q4**：从 seed sequence 出发，能否使用 (p)cEBM 改善某个目标性质？

## 主要结果

### 1. pcEBM 在小步长下 HV 表现较好

论文 Table 1 比较不同方法在不同 step size 下的 Hypervolume。

在 $\eta = 0.01$ 时：

| 方法 | HV(Ab-Like, Aff, BV) | HV(Aff, BV) | HV(Ab-Like, BV) | HV(Ab-Like, Aff) |
|---|---:|---:|---:|---:|
| MGD | 0.04 | 0.22 | 0.23 | 0.29 |
| ls-cEBM | 0.00 | 0.24 | 0.24 | 0.23 |
| cEBM | 0.00 | 0.25 | 0.24 | 0.25 |
| pcEBM | 0.049 | 0.30 | 0.29 | 0.30 |

可以看到，在较小步长下，pcEBM 在多数组合上取得最高 HV。

论文认为这说明 pcEBM 更好地覆盖了多属性 Pareto front。

### 2. pcEBM 在 edit distance 上整体更接近多属性真实数据

Table 2 显示，在多属性生成中，pcEBM 的平均 edit distance 较低。

例如在 $\eta = 40$ 时：

| 方法 | edist to Ab-like | edist to BV | edist to Aff | average edist |
|---|---:|---:|---:|---:|
| MGD | 83.51 ± 16.1 | 71.49 ± 15.7 | 85.84 ± 16.3 | 80.28 |
| cEBM | 92.96 ± 19.03 | 86.86 ± 17.99 | 97.97 ± 17.28 | 92.60 |
| ls-cEBM | 92.4 ± 19.3 | 87.14 ± 17.94 | 97.93 ± 17.25 | 92.49 |
| pcEBM | 82.24 ± 16.16 | 71.47 ± 15.82 | 85.76 ± 16.34 | 79.82 |

在 $\eta = 0.01$ 时：

| 方法 | average edist |
|---|---:|
| MGD | 89.46 |
| cEBM | 221.23 |
| ls-cEBM | 218.51 |
| pcEBM | 86.02 |

这表明在该设置下，pcEBM 相比 cEBM / ls-cEBM 明显更接近具有目标性质的真实序列。

### 3. pcEBM 比 cEBM 收敛更快

论文 Figure 3 比较了 pcEBM 和 cEBM 在相同初始序列、相同步长 $\eta=0.01$ 下，每一步各属性能量的变化。

结果显示：

- pcEBM 的 energy score 下降更快；
- 说明其动态 Pareto 方向可能比 cEBM 的固定均匀组合更有效。

### 4. pcEBM 覆盖更宽的 Pareto front

论文 Figure 2 展示了在 Aff 和 BV 两个能量目标空间中的 Pareto front。

作者观察到：

- pcEBM 得到的 Pareto front 比 MGD 更宽；
- 说明加入 Langevin Dynamics 的噪声有助于探索 Pareto front；
- pcEBM 和 MGD 的前沿更接近原点，说明它们在降低两个目标能量上优于直接 LD 式的 cEBM。

这支持了：

- Langevin Dynamics 有助于 Pareto front 覆盖；
- Multiple Gradient Descent 有助于多目标同步优化；
- pcEBM 综合了二者优势。

### 5. 从 seed sequence 出发可改善 nonspecificity

针对 Q4，论文使用已有抗体序列作为 seed，选择 BV score 较差的序列作为优化起点。

然后使用多种方法生成候选设计，并用外部 SeqCNN classifier 作为 nonspecificity pseudo-oracle 评估。

结果显示：

- 多目标方法可将较差 BV score 从约 0.27 提升到 0.9 以上；
- MGD 和 pcEBM 的平均分略低于 cEBM，但所有方法都得到较高 BV score；
- tSNE 可视化显示 cEBM 和 pcEBM 都能将 seed sequence 移向 BV score 更好的序列流形区域。

需要注意的是，具体 wet-lab 实验验证未在摘取文本中出现：

- 待补充原文/PDF 后确认。

## 创新点

1. **提出 pcEBM**
   - 将 Pareto optimality 引入 compositional EBM 采样。
   - 目标不是简单生成满足单一属性的序列，而是生成一组多目标权衡候选。

2. **动态计算多目标组合权重**
   - 与 cEBM 的固定均匀加权不同，pcEBM 每一步根据当前样本的多个目标梯度动态确定权重。
   - 这使得采样方向更符合局部 Pareto 改进。

3. **结合 MGD 与 Langevin Dynamics**
   - MGD 提供多目标共同下降方向；
   - Langevin noise 提供探索能力；
   - 二者结合使 pcEBM 能更好覆盖非凸 Pareto front。

4. **面向真实抗体设计任务验证**
   - 论文不是只做 toy problem，而是在抗体序列生成与优化上评估。
   - 涉及 Ab-like、Aff、BV score 等实际相关性质。

5. **展示非凸 Pareto front 学习能力**
   - 论文强调 pcEBM 能学习 non-convex Pareto fronts，而线性标量化方法在非凸情况下可能受限。

## 局限性

1. **评价主要基于模型能量和代理指标**
   - HV 是基于属性 EBM 的 energy score 计算。
   - 作者自己指出，这种评价可能有偏，因为 cEBM / ls-cEBM 使用同一类模型进行采样和评估。
   - 更公平的比较应使用外部预测器、surrogate oracle 或 wet-lab 结果。

2. **缺少湿实验验证**
   - 摘取文本中未看到真实实验合成或生物物理实验验证生成抗体性质。
   - 待补充原文/PDF 后确认。

3. **数据细节不足**
   - 部分数据来自 proprietary sources，具体规模、分布、抗原类型、训练/测试划分等信息未在摘取文本中充分给出。
   - 待补充原文/PDF 后确认。

4. **离散序列上的连续梯度采样细节不完全明确**
   - 抗体序列是离散氨基酸序列，但方法中使用对 $x$ 的梯度更新。
   - 摘取文本中未充分说明如何在连续表示和离散氨基酸序列之间转换。
   - 待补充原文/PDF 后确认。

5. **pcEBM 的计算成本可能较高**
   - 每一步需要计算多个属性梯度并求解 MGD 权重。
   - 摘取文本中未给出运行时间或复杂度比较。
   - 待补充原文/PDF 后确认。

6. **多目标数量扩展性待进一步验证**
   - 实验主要围绕三个性质 Ab-like、Aff、BV。
   - 当目标数量更多、目标冲突更复杂时效果如何，仍需验证。

7. **生成序列的新颖性与可开发性评估有限**
   - edit distance 衡量相似性，但无法完全评价结构稳定性、表达量、免疫原性、聚集风险等真实 developability 问题。
   - 待补充原文/PDF 后确认。

## 相关概念

- [[多目标优化]]
- [[Pareto optimality]]
- [[Pareto front]]
- [[Pareto set]]
- [[非凸 Pareto front]]
- [[linear scalarization]]
- [[Multiple Gradient Descent]]
- [[MGDA]]
- [[Energy-Based Model]]
- [[compositional EBM]]
- [[Product of Experts]]
- [[Langevin Dynamics]]
- [[Markov Chain Monte Carlo]]
- [[contrastive divergence]]
- [[Boltzmann distribution]]
- [[蛋白质序列设计]]
- [[抗体设计]]
- [[inverse design]]
- [[therapeutic antibody]]
- [[developability]]
- [[binding affinity]]
- [[nonspecificity]]
- [[BV score]]
- [[Observed Antibody Space]]
- [[Hypervolume]]
- [[edit distance]]
- [[Levenshtein distance]]
- [[SeqCNN]]
- [[tSNE]]
- [[surrogate oracle]]

## 相关方法

- [[Pareto-compositional energy-based model]]
- [[pcEBM]]
- [[compositional EBM]]
- [[cEBM]]
- [[linearly scaled cEBM]]
- [[ls-cEBM]]
- [[Multiple Gradient Descent]]
- [[MGD]]
- [[Langevin Dynamics]]
- [[linear scalarization]]
- [[Stein Variational Gradient Descent]]
- [[Multi-objective Stein Variational Gradient Descent]]
- [[Energy-Based Model]]
- [[Generative Adversarial Network]]
- [[Variational Autoencoder]]
- [[Diffusion Model]]
- [[Function-guided protein design]]
- [[Deep manifold sampling]]

## 相关论文

- [[Implicit generation and modeling with energy based models]]  
  Du and Mordatch, 2019。本文使用的 EBM 背景方法之一。

- [[Compositional visual generation with energy based models]]  
  Du, Li and Mordatch, 2020。本文 cEBM baseline 和组合式 EBM 思想的重要来源。

- [[Multiple-gradient descent algorithm for multiobjective optimization]]  
  Désidéri, 2012。本文使用的 MGD / MGDA 多目标下降方向来源。

- [[Multi-task learning as multi-objective optimization]]  
  Sener and Koltun, 2018。与多目标优化和梯度组合相关。

- [[Profiling Pareto front with multi-objective Stein variational gradient descent]]  
  Liu, Tong and Liu, 2021。与 Pareto front 建模和多目标 SVGD 相关。

- [[Observed antibody space: A diverse database of cleaned, annotated, and translated unpaired and paired antibody sequences]]  
  Olsen, Boyles and Deane, 2022。Ab-like 数据来源相关。

- [[A strategy for risk mitigation of antibodies with fast clearance]]  
  Hötzel et al., 2012。BV score / baculovirus ELISA 相关。

- [[Function-guided protein design by deep manifold sampling]]  
  Gligorijevic et al., 2021。与功能引导蛋白设计相关。

- [[Expanding functional protein sequence spaces using generative adversarial networks]]  
  Repecka et al., 2021。蛋白质序列生成相关。

- [[Tartarus: A benchmarking platform for realistic and practical inverse molecular design]]  
  Nigam et al., 2022。现实分子反向设计评测相关。

## 源文件

- citekey: `tagasovskaParetooptimalCompositionalEnergybased`
- title: **A Pareto-optimal compositional energy-based model for sampling and optimization of protein sequences**
- authors: Nataša Tagasovska, Nathan C Frey, Andreas Loukas, Isidro Hötzel, Ryan Lewis Kelly, Yan Wu, Arvind Rajpal, Richard Bonneau, Kyunghyun Cho, Stephen Ra, Vladimir Gligorijevic
- year: 待补充原文/PDF 后确认  
  - PDF 文本显示 arXiv:2210.10838v1，日期为 19 Oct 2022。
- venue: 待补充原文/PDF 后确认  
  - PDF 文本显示 “Preprint. Under review.”
- DOI: 待补充原文/PDF 后确认
- collections: 多目标分子优化

## 图表摘录

![[raw/zotero/images/多目标分子优化/用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased/page-001.png]]

## Zotero 原始摘要

Deep generative models have emerged as a popular machine learning-based approach for inverse design problems in the life sciences. However, these problems often require sampling new designs that satisfy multiple properties of interest in addition to learning the data distribution. This multi-objective optimization becomes more challenging when properties are independent or orthogonal to each other. In this work, we propose a Pareto-compositional energy-based model (pcEBM), a framework that uses multiple gradient descent for sampling new designs that adhere to various constraints in optimizing distinct properties. We demonstrate its ability to learn non-convex Pareto fronts and generate sequences that simultaneously satisfy multiple desired properties across a series of real-world antibody design tasks.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的重点不是提出新的抗体属性预测器，而是提出一种多属性生成/优化的采样机制。它把每个属性模型看成一个能量函数，然后在生成时不再简单地把所有能量加起来，而是根据当前序列在多个能量面上的梯度关系，动态选择一个 Pareto 改进方向。

我认为 pcEBM 的核心优势在于它处理了两个问题：

1. **固定加权不可靠**
   - cEBM 默认所有属性等权，ls-cEBM 使用人为权重。
   - 但在不同序列位置、不同采样阶段，各目标的重要性和冲突关系可能变化。
   - pcEBM 的动态权重更适合这种局部变化。

2. **纯优化缺少探索**
   - MGD 可以朝 Pareto 方向优化，但容易得到较窄的解集。
   - 加入 Langevin noise 后，pcEBM 更像是“沿 Pareto front 附近扩散”，因此能覆盖更宽的候选集合。

从分子优化角度看，这篇论文属于 多目标分子优化 中很有代表性的思路：不把多目标问题强行压成单目标，而是承认目标之间存在 trade-off，并显式生成 Pareto front 上的候选。

不过，这篇论文的实证说服力仍主要来自计算指标，包括 EBM energy、HV、edit distance 和 surrogate classifier。对于抗体设计而言，最终仍需要实验验证，例如真实 binding affinity、non-specific binding、表达量、稳定性、聚集、黏度等。因此 pcEBM 更像是一个有潜力的候选生成器，而不是完整闭环的抗体发现平台。

## 后续问题

1. pcEBM 如何处理离散氨基酸序列与连续梯度更新之间的映射？
   - 是在 one-hot relaxation、embedding space，还是 logits space 中采样？
   - 待补充原文/PDF 后确认。

2. 生成序列是否经过有效性过滤？
   - 例如是否保证没有非法氨基酸、长度合理、链配对合理？
   - 待补充原文/PDF 后确认。

3. 论文中的 proprietary affinity 数据具体来自哪些抗原或抗体项目？
   - 数据规模是多少？
   - 是否存在训练/测试泄漏风险？
   - 待补充原文/PDF 后确认。

4. pcEBM 生成的序列与训练集相似，是否意味着新颖性不足？
   - edit distance 越小被视为更接近真实属性分布，但过小也可能意味着记忆训练集。
   - 需要进一步用 novelty / diversity 指标评价。

5. HV 使用 EBM energy 作为目标是否会偏向某些方法？
   - 作者已指出存在偏差。
   - 后续应使用独立 oracle 或实验结果验证。

6. pcEBM 在目标数量更多时是否稳定？
   - 例如同时优化 affinity、specificity、solubility、viscosity、stability、immunogenicity。
   - MGD 权重求解和目标冲突会变得更复杂。

7. 是否可以把 pcEBM 与 Diffusion Model 结合？
   - 例如在蛋白质序列 diffusion 或结构 diffusion 中使用 Pareto guidance。

8. 是否可以在训练阶段也加入 Pareto optimality？
   - 作者在结论中提到未来方向之一是 Pareto-optimal training for EBMs。

9. pcEBM 是否适用于图结构分子？
   - 作者提到未来可扩展到 graph structures suitable for molecules。
   - 需要研究如何在图离散空间中做 Pareto compositional sampling。

10. 如果某些属性模型不确定性很高，pcEBM 是否会被错误梯度误导？
    - 作者提到未来可加入 uncertainty estimates。
    - 对真实分子优化尤其重要。
