---
type: paper
citekey: "royGoalconditionedGFlowNetsControllable"
zotero_key: "VPLF5P3D"
title: "目标条件GFlowNets可控多目标分子设计"
chinese_title: "目标条件GFlowNets可控多目标分子设计"
authors: "Julien Roy, Pierre-Luc Bacon, Christopher Pal, Emmanuel Bengio"
year: ""
venue: ""
doi: ""
zotero_collections:
  - "多目标分子优化"
source_pdf: "raw/zotero/pdfs/多目标分子优化/目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable.pdf"
status: imported
reading_status: inbox
tags:
  - paper
aliases:
  - "目标条件GFlowNets可控多目标分子设计"
  - "Goal-conditioned GFlowNets for Controllable Multi-Objective Molecular Design"
original_title: "Goal-conditioned GFlowNets for Controllable Multi-Objective Molecular Design"
---
## 一句话总结

《Goal-conditioned GFlowNets for Controllable Multi-Objective Molecular Design》提出用 Goal-conditioned GFlowNets 替代传统 preference-conditioning / 标量化偏好条件化方法，在 多目标分子设计 中通过显式指定目标区域（focus region）来更可控、更均匀地探索 Pareto front。

## 研究问题

本文关注 in-silico molecular design 中的 多目标优化 问题：在药物分子设计中，候选分子通常需要同时优化多个性质，例如：

- 与靶点的 binding energy
- synthesizability / synthetic accessibility
- toxicity
- EC50
- drug-likeness / QED

已有方法常将多目标问题通过 scalarization 转换为偏好条件化的单目标问题，即给不同目标分配权重，然后优化加权和。但当目标空间中的 Pareto front 呈现非凸或凹形结构时，这种方法容易偏向目标空间的极端点，难以均匀覆盖整个 Pareto front。

本文的问题是：

> 如何训练一个条件式分子生成模型，使其不仅能生成高质量分子，还能根据用户指定的目标区域，在整个 Pareto front 上更均匀、更可控地采样？

## 背景与动机

### 多目标分子设计的挑战

分子设计天然是 multi-objective optimization 问题。不存在一个分子在所有性质上都优于其他分子，因此通常需要寻找一组 Pareto optimal 解。所有 Pareto optimal 解在目标空间中的投影构成 Pareto front。

传统方法中常用 scalarization：

$$
R_w(x)=\sum_k w_k r_k,\quad \sum_k w_k=1,\quad w_k\ge 0
$$

其中 $w$ 是 preference vector，用来表示用户对不同目标的偏好。

这种方法的优势是容易与现有深度生成模型结合；但问题在于，标量化后的最优解分布强烈依赖 Pareto front 的形状。对于凹形 Pareto front，标量化方法可能更容易找到极端区域，而不是均匀覆盖整个前沿。

### GFlowNets 的相关背景

GFlowNet / Generative Flow Network 是一种用于训练能量型生成模型的方法，目标是学习：

$$
p_\theta(x)\propto R(x)
$$

即奖励越高的对象，被采样的概率越大。

GFlowNets 适合：

- 离散组合对象生成
- 分子图生成
- 多模态分布建模
- 多样化候选生成

在分子设计中，GFlowNets 的优势是能够从高奖励区域中采样多个多样化候选，而不是只寻找单个最优解。

已有的 Multi-objective GFlowNets 使用 preference-conditioning：将 preference vector $w$ 输入模型，并用加权奖励训练模型，使模型能根据偏好生成不同分子。

本文认为：preference-conditioning 仍然是一种软约束，不能保证模型在用户真正关心的目标区域中采样；因此提出用 goal-conditioning 显式约束生成目标区域。

## 核心思想

本文的核心思想是：

> 与其告诉模型“我更偏好哪些目标”，不如直接告诉模型“我希望生成的分子落在目标空间中的哪个区域”。

具体来说，作者借鉴 goal-conditioned reinforcement learning，将 GFlowNet 条件化在一个目标区域 $g$ 上。模型的目标不是最大化某个标量化偏好奖励，而是生成 reward vector 落入指定 goal region / focus region 的分子。

本文定义的 goal / focus region 是目标空间中的一个锥形区域。给定目标方向 $d_g$ 和余弦相似度阈值 $c_g$，若分子的 reward vector $r$ 满足：

$$
\frac{r\cdot d_g}{||r||\cdot ||d_g||}\ge c_g
$$

则认为该分子达到了目标 $g$。

其对应奖励为：

$$
R_g(x)=
\begin{cases}
\sum_k r_k, & r\in g \\
0, & otherwise
\end{cases}
$$

也就是说，只有落入指定 focus region 的分子才有正奖励；否则奖励为 0。

这种 hard constraint 使模型具有更强的可控性：用户可以指定想探索的目标方向，模型则尽量在该区域内生成分子。

## 方法框架

本文方法由以下几个部分组成：

### 1. Goal-conditioned GFlowNets

模型输入包括：

- 当前分子构造状态
- 条件向量：goal direction $d_g$，或与 goal region 相关的信息

模型输出：

- GFlowNet forward policy，用于逐步构造分子

目标：

- 学习在给定 goal region 下，从对应高奖励区域采样分子

与 preference-conditioning 的差异：

| 方法 | 条件输入 | 约束形式 | 奖励形式 | 潜在问题 |
|---|---|---|---|---|
| preference-conditioned GFN | preference vector $w$ | 软约束 | $\sum_k w_k r_k$ | 凹形 Pareto front 上易偏向极端点 |
| goal-conditioned GFN | goal direction $d_g$ / focus region | 硬约束 | 区域内为 $\sum_k r_k$，区域外为 0 | 不可行 goal 会降低采样效率 |

### 2. Focus region

本文使用目标方向 $d_g$ 与 cosine similarity threshold $c_g$ 定义 focus region。

focus region 可理解为目标空间中的一个锥形区域，表示用户希望探索的一类 trade-off。

例如在两个目标 $(seh, qed)$ 中：

- 一个 goal direction 可偏向 QED
- 一个 goal direction 可偏向 sEH binding score
- 一个 goal direction 可位于二者之间，表示折中解

### 3. Replay buffer 与 hindsight experience replay

由于 hard constraint 会使奖励更稀疏，目标区域外的样本奖励为 0，训练可能不稳定。因此作者使用：

- replay buffer
- hindsight experience replay

具体做法：

- 保存过去采样的 trajectories
- 从 replay buffer 中采样训练数据
- 对部分没有达到原 goal 的轨迹进行重新标注：如果它落入了另一个 goal region，则将其作为该 goal 的成功样本来学习

这有助于缓解奖励稀疏和训练不稳定问题。

### 4. Reward sharpening / limit reward coefficient

为了让模型更倾向于生成 focus region 中心附近的分子，而不是靠近边界的分子，作者引入 reward coefficient $\alpha_g$：

$$
R_g(x)=
\begin{cases}
\alpha_g\sum_k r_k, & r\in g \\
0, & otherwise
\end{cases}
$$

其中：

$$
\alpha_g=
\left(
\frac{r\cdot d_g}{||r||\cdot ||d_g||}
\right)^{\frac{\log m_g}{\log c_g}}
$$

当样本位于 focus region 边界时，奖励衰减到 $m_g$ 倍。论文中使用的超参数包括：

- focus region cosine similarity threshold $c_g=0.98$
- limit reward coefficient $m_g=0.20$

该设计增强了 goal-reaching accuracy。

### 5. Learned Goal Distribution / Tab-GS

hard constraint 的问题是：并非所有目标方向都是可行的。某些 goal region 中可能没有高质量分子，或者模型很难找到对应分子。如果仍然均匀采样这些 infeasible goals，会浪费大量采样。

为此，作者提出 Tabular Goal-Sampler / Tab-GS：

- 维护每个 goal direction 的可行性统计
- 训练初期均匀采样 goal directions
- 训练到 25% 后，根据已观察到的成功情况降低不可行方向的采样概率
- 训练到 75% 后停止更新 goal sampler，使 goal distribution 固定，便于模型微调

未归一化采样权重为：

$$
f(d_g)=
\begin{cases}
1, & d_g \text{ 从未被采样} \\
1, & 存在样本最接近该 } d_g \\
0.1, & otherwise
\end{cases}
$$

该方法用于 3 目标和 4 目标任务，以提高采样效率。

## 算法流程

根据论文内容，goal-conditioned GFN 的整体流程可以整理为：

1. 定义多目标奖励向量：
   
$$
R(x)\in \mathbb{R}^K
$$

2. 构造 goal region：
   - 采样或选择目标方向 $d_g$
   - 设置 cosine similarity threshold $c_g$
   - 定义 focus region：
     
$$
g := \{r\in \mathbb{R}^K:\frac{r\cdot d_g}{||r||\cdot ||d_g||}\ge c_g\}
$$

3. 将 goal direction / conditioning vector 输入 GFlowNet。

4. GFlowNet 从空图状态 $s_0$ 开始逐步构造分子：
   - 添加 fragment node
   - 添加 edge
   - 或选择 STOP action

5. 得到完整分子 $x$，计算 reward vector $r(x)$。

6. 判断 $r(x)$ 是否落入 focus region：
   - 若在区域内，奖励为 $\sum_k r_k$，或经过 $\alpha_g$ 调整后的奖励
   - 若在区域外，奖励为 0

7. 使用 Trajectory Balance 训练 GFlowNet。

8. 使用 replay buffer 稳定训练。

9. 使用 hindsight relabeling 重用失败轨迹。

10. 对高维目标任务，使用 Tab-GS 学习更有效的 goal direction 分布。

## 实验设置

### 任务

主要实验是基于 fragment-based molecule generation 的多目标分子生成任务。

分子由预定义 molecular fragments 逐步组合而成。状态表示为图：

- 节点表示 fragment
- 边表示 fragment 间连接
- 边带有 attachment point 属性
- 增加一个 fully-connected virtual node，其特征包含 conditioning information

模型使用 Graph Transformer 处理分子图状态。

### 目标

主要使用以下目标：

1. QED
   - drug-likeness heuristic
   - 数值本身在 0 到 1 之间

2. sEH binding energy prediction
   - 使用预训练公开模型
   - 输出除以 8，使其大致落在 0 到 1 范围内

3. synthetic accessibility / SA
   - 用于 3 目标任务

4. molecular weight penalty / MW penalty
   - 对分子量超过 300 的化合物施加惩罚
   - 用于 4 目标任务

### 对比方法

主要对比：

- preference-conditioned GFN
- goal-conditioned GFN

preference-conditioned GFN 使用：

$$
w\sim Dirichlet(1)
$$

goal-conditioned GFN 使用：

- Section 4.2：Uniform-GS
- Section 4.3：Tab-GS

### 训练细节

论文给出的主要超参数包括：

| 超参数 | Goal-conditioned GFN | Preference-conditioned GFN |
|---|---:|---:|
| Batch size | 64 | 64 |
| GFN temperature parameter $\beta$ | 60 | 60 |
| Number of training steps | 40,000 | 40,000 |
| Number of GNN layers | 2 | 2 |
| GNN node embedding size | 256 | 256 |
| Learning rate for $P_F$ | $10^{-4}$ | $10^{-4}$ |
| Learning rate for $Z$-estimator | $10^{-3}$ | $10^{-3}$ |
| Sampling moving average $\tau$ | 0.95 | 0.95 |
| Random action probability $\epsilon$ | 0.01 | 0.01 |
| Focus region threshold $c_g$ | 0.98 | - |
| Limit reward coefficient $m_g$ | 0.20 | - |
| Replay buffer length | 100,000 | - |
| Replay buffer warmups | 1,000 | - |
| Hindsight ratio | 0.30 | - |

### 评价指标

作者强调单一指标无法完整刻画多目标生成分布，因此使用三个指标：

#### 1. Inverted Generational Distance / IGD

衡量生成样本集合对参考 Pareto front 的覆盖程度：

$$
IGD(S,P)=\frac{1}{|P|}\sum_{p\in P}\min_{s\in S}||s-p||_2^2
$$

越低越好。

#### 2. Pareto-Clusters Entropy / PC-ent

衡量生成样本沿 Pareto front 分布是否均匀。

将样本分配到最近的 Pareto reference point，对 cluster histogram 计算熵。越高表示分布越均匀。

#### 3. Average Pearson Correlation Coefficient / Avg-PCC

衡量条件向量与实际 reward vector 之间的相关性，用于评估可控性：

$$
Avg\text{-}PCC(S,C)=\frac{1}{K}\sum_{k=1}^K PCC(s_{\cdot,k},c_{\cdot,k})
$$

越高表示条件控制越有效。

## 主要结果

### 1. 在复杂目标空间中，goal-conditioned GFN 更均匀、更可控

作者构造了多个二目标 $(seh,qed)$ 任务变体，通过人为设置不可达区域来模拟不同形状的 Pareto front，包括：

- unrestrained
- restrained-convex
- concave
- concave-sharp
- multi-concave
- 4-dots
- 16-dots

结果显示：

- preference-conditioned GFN 在 convex Pareto front 上表现较好
- 但在 concave 或更复杂目标空间中，容易偏向极端点
- goal-conditioned GFN 能显式针对不同 trade-off direction 采样，因此能覆盖更完整的目标空间

### 2. IGD 上两者相近，但 PC-ent 和 Avg-PCC 上 goal-conditioned GFN 明显更好

Table 1 显示，在多个复杂二目标 landscape 中：

- IGD：两种方法差距不大
- Avg-PCC：goal-conditioned GFN consistently 更高
- PC-ent：goal-conditioned GFN consistently 更高

这说明：

- preference-conditioned GFN 可能仍然生成少量中间区域样本，因此 IGD 不一定很差
- 但其整体分布不均匀，也不够可控
- goal-conditioned GFN 在可控性和 Pareto front 均匀覆盖方面明显更好

部分结果如下：

| Landscape | 方法 | IGD ↓ | Avg-PCC ↑ | PC-ent ↑ |
|---|---|---:|---:|---:|
| unrestrained | pref-cond | 0.087 | 0.905 | 2.170 |
| unrestrained | goal-cond | 0.095 | 0.967 | 2.472 |
| concave | pref-cond | 0.272 | 0.830 | 1.563 |
| concave | goal-cond | 0.266 | 0.926 | 1.997 |
| multi-concave | pref-cond | 0.152 | 0.700 | 1.867 |
| multi-concave | goal-cond | 0.173 | 0.946 | 2.380 |
| 16-dots | pref-cond | 0.109 | 0.770 | 1.610 |
| 16-dots | goal-cond | 0.115 | 0.948 | 2.262 |

注：表中省略了 sem，完整数值见原文 Table 1。

### 3. 目标数量增加时，goal-conditioned GFN 仍保持优势

作者进一步测试 2、3、4 个目标时的表现。结果显示 goal-conditioned GFN 在更高维目标空间中仍然具有更好的可控性和均匀性。

Table 2 结果：

| 目标数 | 方法 | IGD ↓ | Avg-PCC ↑ | PC-ent ↑ |
|---|---|---:|---:|---:|
| 2 objectives | pref-cond | 0.088 | 0.904 | 2.166 |
| 2 objectives | goal-cond | 0.094 | 0.961 | 2.471 |
| 3 objectives | pref-cond | 0.218 | 0.775 | 3.775 |
| 3 objectives | goal-cond | 0.199 | 0.909 | 4.571 |
| 4 objectives | pref-cond | 0.370 | 0.612 | 4.734 |
| 4 objectives | goal-cond | 0.303 | 0.893 | 6.320 |

这说明随着目标数增加，preference-conditioned GFN 的可控性下降明显，而 goal-conditioned GFN 配合 Tab-GS 能更好地维持控制能力。

### 4. Replay buffer 对 goal-conditioned GFN 很重要

附录实验显示，纯 on-policy 训练下 goal-conditioned GFN 更容易不稳定和 mode collapse。使用 replay buffer 后训练曲线更稳定。

原因可能是 hard constraint 会导致不同 goal 下 reward landscape 变化剧烈，replay buffer 可以缓解训练不稳定。

### 5. Tab-GS 提高高维目标任务中的 goal-reaching accuracy

附录 C.3 显示：

- 2 目标时 infeasible goals 较少，Uniform-GS 和 Tab-GS 差异不大
- 3、4 目标时，Tab-GS 在训练 25% 后开始调整 goal sampling distribution，goal-reaching accuracy 立即改善
- 这进一步提升 IGD 和 PC-ent

## 创新点

1. **将 goal-conditioned learning 引入 GFlowNets 多目标分子设计**

   本文不是通过 preference vector 做软偏好控制，而是显式定义目标空间中的 focus region，并训练 GFlowNet 在指定区域中采样。

2. **用 hard constraint 改善多目标生成的可控性**

   与 scalarization 相比，goal-conditioning 可以更直接表达用户意图：目标是“落入这个区域”，而不是“按这个权重加权”。

3. **针对凹形和复杂 Pareto front 提供更均匀覆盖**

   实验显示，goal-conditioned GFN 在 concave / multi-concave / disconnected objective landscapes 中比 preference-conditioned GFN 更能覆盖整个 Pareto front。

4. **提出 Pareto-Clusters Entropy / PC-ent 衡量 Pareto front 上的分布均匀性**

   该指标补充了 IGD 的不足，因为 IGD 只关心每个 reference point 是否有最近样本，而不充分反映样本整体分布是否均匀。

5. **提出 Tab-GS 缓解不可行目标区域带来的采样效率下降**

   Tabular Goal-Sampler 通过统计 goal direction 的可行性，降低 infeasible goal 的采样概率，尤其适用于 3、4 目标任务。

6. **结合 hindsight experience replay 处理 goal-conditioned GFN 的稀疏奖励问题**

   对未达到原目标但落入其他目标区域的轨迹进行重新标注，提高样本利用率。

## 局限性

1. **不可行 goal 会降低采样效率**

   hard constraint 的主要问题是：如果某个 goal region 中不存在可行分子或极难达到，模型只能观察到 0 reward，最终可能接近均匀采样无意义分子。

2. **Tab-GS 的参数规模随目标数指数增长**

   作者指出 Tab-GS 为每个 goal direction 维护参数或统计量，随着目标数 $K$ 增加，方向数量会迅速增长，带来统计和内存限制。

3. **高维目标空间中的目标采样仍未彻底解决**

   作者计划未来使用 GFlowNet-based Goal Sampler / GFN-GS 逐维构造 goal direction，以利用参数共享和层级结构提升效率；但这部分在本文中仍是 future work。

4. **实验主要是 fragment-based molecule generation 与有限目标数量**

   本文实验覆盖 2、3、4 目标，但更大规模、更真实药物设计任务中的效果仍需进一步验证。

5. **部分目标来自预测模型或启发式指标**

   例如 sEH binding energy 来自预训练模型，QED、SA、MW penalty 为启发式或代理目标。真实湿实验有效性待补充原文/PDF 后确认。

6. **年份、venue、DOI 元数据缺失**

   用户提供元数据中 year、venue、DOI 为空。PDF 文本显示该工作发表于 ICML 2023 Workshop on Challenges in Deployable Generative AI，arXiv:2306.04620v2，时间为 2023；但 Zotero 元数据未填，正式条目待补充原文/PDF 后确认。

## 相关概念

- [[多目标优化]]
- [[multi-objective optimization]]
- [[多目标分子设计]]
- [[in-silico molecular design]]
- [[Pareto optimality]]
- [[Pareto front]]
- [[Pareto set]]
- [[scalarization]]
- [[preference-conditioning]]
- [[goal-conditioning]]
- [[goal-conditioned reinforcement learning]]
- [[GFlowNet]]
- [[Generative Flow Network]]
- [[Trajectory Balance]]
- [[fragment-based molecule generation]]
- [[Graph Transformer]]
- [[QED]]
- [[synthetic accessibility]]
- [[sEH binding energy]]
- [[molecular weight penalty]]
- [[replay buffer]]
- [[hindsight experience replay]]
- [[reward sparsity]]
- [[controllable generation]]
- [[conditional generative model]]
- [[mode collapse]]
- [[Inverted Generational Distance]]
- [[IGD]]
- [[Pareto-Clusters Entropy]]
- [[PC-ent]]
- [[Pearson correlation coefficient]]
- [[Avg-PCC]]

## 相关方法

- [[Goal-conditioned GFlowNets]]
- [[preference-conditioned GFN]]
- [[Multi-objective GFlowNets]]
- [[Tabular Goal-Sampler]]
- [[Tab-GS]]
- [[GFlowNet-based Goal Sampler]]
- [[GFN-GS]]
- [[Trajectory Balance]]
- [[hindsight experience replay]]
- [[Dirichlet preference sampling]]
- [[reward shaping]]
- [[focus region]]
- [[hard constraint conditioning]]
- [[soft constraint conditioning]]
- [[fragment-based drug design]]
- [[graph-based molecular generation]]
- [[Graph Transformer Networks]]

## 相关论文

- [[Flow network based generative models for non-iterative diverse candidate generation]]
  - Bengio et al., 2021a
  - GFlowNet 基础工作之一。

- [[GFlowNet Foundations]]
  - Bengio et al., 2021b
  - GFlowNet 理论基础。

- [[Multi-Objective GFlowNets]]
  - Jain et al., 2022b
  - 本文主要对比的 preference-conditioned GFN 方法来源。

- [[Biological sequence design with GFlowNets]]
  - Jain et al., 2022a
  - GFlowNet 在生物序列设计中的应用。

- [[Trajectory Balance: Improved Credit Assignment in GFlowNets]]
  - Malkin et al., 2022a
  - 本文训练 GFlowNet 使用的 Trajectory Balance 目标相关。

- [[Universal Value Function Approximators]]
  - Schaul et al., 2015
  - goal-conditioned reinforcement learning 的相关基础。

- [[Hindsight Experience Replay]]
  - Andrychowicz et al., 2017
  - 本文用于重标注未达到目标轨迹的方法来源。

- [[Pareto Multi-Task Learning]]
  - Lin et al., 2019
  - 本文 focus region 设计灵感来源之一。

- [[Multi-objective molecule generation using interpretable substructures]]
  - Jin et al., 2020
  - 多目标分子生成相关工作。

- [[Optimization of molecules via deep reinforcement learning]]
  - Zhou et al., 2019
  - 分子优化与强化学习相关工作。

- [[Deep reinforcement learning for multiparameter optimization in de novo drug design]]
  - Ståhl et al., 2019
  - de novo drug design 中多参数优化相关工作。

- [[MoleculeNet]]
  - Wu et al., 2018
  - 分子机器学习数据集/基准相关。

- [[Guacamol]]
  - Brown et al., 2019
  - de novo molecular design benchmark。

## 源文件

- citekey: `royGoalconditionedGFlowNetsControllable`
- title: `Goal-conditioned GFlowNets for Controllable Multi-Objective Molecular Design`
- authors: Julien Roy, Pierre-Luc Bacon, Christopher Pal, Emmanuel Bengio
- year: 待补充原文/PDF 后确认；PDF 文本显示 arXiv:2306.04620v2，2023
- venue: 待补充原文/PDF 后确认；PDF 文本显示为 ICML 2023 Workshop on Challenges in Deployable Generative AI
- DOI: 待补充原文/PDF 后确认
- collections: 多目标分子优化

## 图表摘录

![[raw/zotero/images/多目标分子优化/目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable/page-001.png]]

## Zotero 原始摘要

In recent years, in-silico molecular design has received much attention from the machine learning community. When designing a new compound for pharmaceutical applications, there are usually multiple properties of such molecules that need to be optimised: binding energy to the target, synthesizability, toxicity, EC50, and so on. While previous approaches have employed a scalarization scheme to turn the multi-objective problem into a preference-conditioned single objective, it has been established that this kind of reduction may produce solutions that tend to slide towards the extreme points of the objective space when presented with a problem that exhibits a concave Pareto front. In this work we experiment with an alternative formulation of goal-conditioned molecular generation to obtain a more controllable conditional model that can uniformly explore solutions along the entire Pareto front.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的关键不是提出一个更高 IGD 的分子优化器，而是指出 多目标生成模型 的评价不能只看“是否靠近 Pareto front”，还要看：

1. 是否能根据用户意图控制生成位置；
2. 是否能均匀覆盖不同 trade-off；
3. 是否能避免只生成极端点附近的候选。

传统 preference-conditioning 本质上仍是 scalarization。它告诉模型“我比较重视哪个目标”，但没有直接规定“生成结果必须落在哪个目标空间区域”。当 Pareto front 是凹的或不连续时，加权和优化天然容易偏向某些区域。

goal-conditioning 的优势在于，它把用户意图变成一个目标空间中的区域约束。这样模型需要学习“给定这个区域，我该生成哪些分子”。这使模型更像一个可交互的 Pareto front 探索工具，而不是单纯的多目标优化器。

不过 hard constraint 也带来稀疏奖励和 infeasible goal 问题。本文用 replay buffer、hindsight experience replay 和 Tab-GS 做了实用修补。长远看，更优雅的方向可能是学习一个连续或层级的 goal sampler，让模型自动发现哪些目标区域值得探索。

从知识库角度看，这篇文章适合连接到以下主题：

- 多模态多目标优化
- 可控生成模型
- GFlowNet
- 药物分子生成
- Pareto front approximation
- goal-conditioned reinforcement learning
- 多目标强化学习

## 后续问题

1. 本文的 goal region 是基于 cosine similarity 的锥形区域。对于目标尺度不同、非归一化或存在负值的目标，这种定义是否仍然合适？

2. 如果目标之间存在强约束或非平滑边界，focus region 是否需要更复杂的形状，而不是简单锥形区域？

3. Tab-GS 在目标数量较大时会指数膨胀。作者提出的 GFN-GS 是否在后续论文中实现并验证？

4. goal-conditioned GFN 与 conditional diffusion model 或 reinforcement learning for molecular design 相比，在真实药物发现 pipeline 中的优势是什么？

5. PC-ent 依赖 reference points。真实任务中 Pareto front 未知时，reference points 的构造会不会显著影响评价？

6. 本文主要使用 QED、SA、MW penalty 和 sEH 预测分数。若换成 docking score、ADMET 预测、不确定性约束等更真实目标，goal-conditioned 方法是否仍然稳定？

7. hard constraint 会过滤掉 out-of-focus samples。实际部署时，是否应将 out-of-focus 率也作为模型效率指标？

8. 是否可以将用户交互反馈纳入 goal distribution，让模型逐步学习用户真正关心的 Pareto front 区域？

9. 与 Pareto Multi-Task Learning 中的 preference/gradient 方法相比，本文的 focus region 机制是否可以迁移到多任务学习？

10. 是否存在理论保证：goal-conditioned GFN 在 goal distribution 覆盖充分时能比 scalarization 更完整地覆盖非凸 Pareto front？
