---
type: paper
citekey: "royGoalconditionedGFlowNetsControllable"
title: "目标条件GFlowNets可控多目标分子设计"
chinese_title: "目标条件GFlowNets可控多目标分子设计"
authors: "Julien Roy, Pierre-Luc Bacon, Christopher Pal, Emmanuel Bengio"
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
  - "目标条件GFlowNets可控多目标分子设计"
  - "Goal-conditioned GFlowNets for Controllable Multi-Objective Molecular Design"
original_title: "Goal-conditioned GFlowNets for Controllable Multi-Objective Molecular Design"
---
## 一句话总结

**Goal-conditioned GFlowNets for Controllable Multi-Objective Molecular Design** 提出用目标区域（focus region）而不是偏好权重标量化来条件化 GFlowNets，使分子生成模型在复杂或凹形 Pareto front 上能更均匀、更可控地覆盖多目标折中解。

## 研究问题

药物分子设计通常需要同时优化多个属性，例如靶点结合能、类药性、可合成性、毒性、EC50 等。传统多目标分子生成方法常把多个目标通过偏好向量加权求和，转化为单目标奖励，再训练条件生成模型。然而，当真实 Pareto front 呈现凹形或更复杂形状时，基于标量化的 preference-conditioned 方法容易偏向目标空间的极端点，导致中间折中区域覆盖不足。

本文要解决的问题是：如何训练一个多目标分子生成模型，使用户能够明确指定想要的目标空间区域，并且在整个 Pareto front 上获得更均匀、更可控的候选分子分布。

## 背景与动机

多目标优化问题可以表示为在分子空间 $\mathcal{X}$ 上最大化 $K$ 个目标：

$$
\mathbf{R}(x) \in \mathbb{R}^K
$$

通常不存在一个分子在所有目标上都优于其他分子，因此解集由 Pareto optimal points 构成，其在目标空间中的投影形成 Pareto front。

已有的 Multi-objective GFlowNets 使用 preference-conditioning：给定偏好向量 $w$，将多个目标线性标量化为：

$$
R _ {w} (x) = \sum_ {k} w _ {k} r _ {k}, \quad \sum_ {k} w _ {k} = 1, \quad w _ {k} \geq 0
$$

训练时从 Dirichlet 分布等分布中采样不同偏好向量，使模型学会根据偏好强调不同目标。该方式在凸 Pareto front 上较有效，但在凹形或复杂 Pareto front 上，线性标量化可能无法稳定覆盖中间区域，生成结果容易滑向目标空间两端。

本文的动机是：与其用偏好权重“软性”引导模型，不如直接把用户想要的目标空间区域作为条件，要求模型生成落入该区域的分子，从而提升可控性与 Pareto front 覆盖均匀性。

## 核心思想

本文提出 **goal-conditioned GFlowNets**。核心做法是把多目标分子生成改写为目标条件生成任务：给定一个目标区域 $g$，模型应生成奖励向量落入该区域的分子。

目标区域被定义为目标空间中的一个锥形 focus region。给定目标方向 $d_g$ 和余弦相似度阈值 $c_g$，如果分子奖励向量 $r$ 与 $d_g$ 的余弦相似度不低于阈值，则认为该分子满足目标：

$$
g := \left\{r \in \mathbb{R}^{K} : \frac{r \cdot d_{g}}{||r|| \cdot ||d_{g}||} \geq c_{g}\right\}
$$

对应的 goal-conditioned 奖励为：

$$
R _ {g} (x) =
\begin{cases}
\sum_ {k} r _ {k}, & \text{if } r \in g \\
0, & \text{otherwise}
\end{cases}
$$

这种 hard constraint 让模型直接学习“生成落入指定目标区域的分子”，因此可以通过采样不同目标方向来覆盖 Pareto front 的不同部分。为缓解硬约束导致的奖励稀疏问题，作者使用 replay buffer、hindsight experience replay，并进一步引入 reward shaping 使模型偏向 focus region 中心。

## 方法框架

本文方法建立在 fragment-based molecule generation 的 GFlowNet 框架上。模型从空图状态出发，逐步添加分子片段节点或边，直到选择 STOP 动作形成完整分子。状态图中加入一个 fully-connected virtual node，其特征嵌入来自条件向量，例如 preference vector $w$ 或 goal direction $d_g$。图状态由 Graph Transformer 处理，输出动作分布。

![[raw/zotero/images/多目标分子优化/目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable/mineru-figure-01.jpg]]

图 1 展示了 GFlowNet 分子生成器如何在目标空间中根据 focus region 生成分子。左侧示意 GFlowNet 逐步构造分子；右侧说明单个 focus region 可以让模型集中生成某一区域的分子，而多个 focus region 可以覆盖更宽的目标空间区域。

方法包含三个关键组成：

1. **Goal-conditioned GFlowNets**  
   将目标方向 $d_g$ 和 focus region 作为条件输入，要求生成分子的奖励向量落入指定区域。

2. **Replay buffer 与 hindsight experience replay**  
   由于 hard constraint 会让大量样本奖励为 0，作者用 replay buffer 稳定训练，并对未达到原目标的轨迹进行目标重标注，使其仍能提供学习信号。

3. **Learned Goal Distribution / Tab-GS**  
   并非所有目标方向都可行，尤其目标数增加时不可行区域会增多。作者提出 tabular goal-sampler（Tab-GS）维护每个目标方向可行性的简单统计信念，降低不可行方向的采样概率，提高样本效率。

在未来工作部分，作者还提出用 GFlowNet-based Goal Sampler（GFN-GS）替代 Tab-GS，使目标方向逐维生成，以减少 Tab-GS 参数量随目标数指数增长的问题。

## 算法流程

整体训练流程可概括为：

1. 采样一个条件向量：
   - preference-conditioned baseline：采样偏好向量 $w \sim Dirichlet(1)$；
   - goal-conditioned GFN：采样目标方向 $d_g$，来自 Uniform-GS 或 Tab-GS。

2. 将条件向量嵌入到分子图状态中的 virtual node。

3. GFlowNet 从空图状态 $s_0$ 开始，逐步选择动作：
   - 添加片段节点；
   - 添加片段间边；
   - 或选择 STOP 结束生成。

4. 对生成分子计算多目标奖励向量 $r$。

5. 对 goal-conditioned GFN，判断 $r$ 是否落入 focus region：
   - 若满足目标区域，奖励为各目标之和或 shaped reward；
   - 若不满足，则奖励为 0。

6. 使用 trajectory balance criterion 训练 GFlowNet 的 forward policy $P_F$ 和 partition function estimator $Z$。

7. 将轨迹加入 replay buffer，并对部分失败轨迹执行 hindsight relabeling。

8. 对 Tab-GS：
   - 训练前 25%：均匀采样目标方向；
   - 从 25% 开始：根据目标方向是否已有成功样本调整采样权重；
   - 到 75% 后：停止更新 goal-sampler，使目标分布固定，便于模型 fine-tuning。

奖励 shaping 形式为：

$$
R _ {g} (x) =
\begin{cases}
\alpha_ {g} \sum_ {k} r _ {k}, & \text{if } r \in g \\
0, & \text{otherwise}
\end{cases}
$$

其中：

$$
\alpha_ {g} =
\left(
\frac {r \cdot d _ {g}}{| | r | | \cdot | | d _ {g} | |}
\right) ^ {\frac {\log m _ {g}}{\log c _ {g}}}
$$

该系数鼓励模型生成更接近 focus region 中心的样本，从而提升 goal-reaching accuracy。

## 实验设置

本文主要在 fragment-based molecule generation 任务上评估方法。分子由预定义分子片段集合组装而成。使用的目标包括：

- **seh**：sEH binding energy prediction，由公开预训练模型给出，并除以 8 以使数值大致落在 0 到 1；
- **qed**：Quantitative Estimate of Drug-likeness，已在 0 到 1 范围内；
- **sa**：synthetic accessibility heuristic；
- **mw**：对分子量超过 300 的惩罚。

实验包括两类：

1. **二维复杂目标地形实验**  
   在 seh 与 qed 两目标任务上人为设置不可达区域，使目标空间形成 unrestrained、restrained-convex、concave、concave-sharp、multi-concave、4-dots、16-dots 等不同地形，用于测试算法在复杂 Pareto front 下的覆盖能力。

2. **目标数量增加实验**  
   分别测试 2、3、4 个目标下 preference-conditioned GFN 与 goal-conditioned GFN 的表现。

主要评价指标：

- **IGD（Inverted Generational Distance，越低越好）**：衡量生成样本对参考 Pareto front 的覆盖深度和宽度；
- **PC-ent（Pareto-Clusters Entropy，越高越好）**：衡量样本沿 Pareto front 的分布均匀性；
- **Avg-PCC（越高越好）**：计算条件向量与最终奖励向量之间的平均 Pearson 相关系数，用于衡量可控性。

关键训练超参数包括：

| 超参数 | Goal-conditioned GFN | Preference-conditioned GFN |
|---|---:|---:|
| Batch size | 64 | 64 |
| GFN temperature parameter $\beta$ | 60 | 60 |
| Training steps | 40,000 | 40,000 |
| GNN layers | 2 | 2 |
| GNN node embedding size | 256 | 256 |
| Learning rate for $P_F$ | $10^{-4}$ | $10^{-4}$ |
| Learning rate for Z-estimator | $10^{-3}$ | $10^{-3}$ |
| Sampling moving average $\tau$ | 0.95 | 0.95 |
| Random action probability $\epsilon$ | 0.01 | 0.01 |
| Focus region threshold $c_g$ | 0.98 | - |
| Limit reward coefficient $m_g$ | 0.20 | - |
| Replay buffer length | 100,000 | - |
| Replay buffer warmups | 1,000 | - |
| Hindsight ratio | 0.30 | - |
| 条件采样分布 | Uniform-GS 或 Tab-GS | $Dirichlet(1)$ |

## 主要结果

在复杂二维目标地形中，preference-conditioned GFN 在凸 Pareto front 上能够较好求解，但在凹形和更复杂目标地形中，生成样本明显偏向极端区域；goal-conditioned GFN 通过显式采样不同目标方向，可以在整个对角方向上覆盖目标空间，且更均匀、更可控。

![[raw/zotero/images/多目标分子优化/目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable/mineru-figure-02.jpg]]

图 2 对比了 preference-conditioned GFN 与 goal-conditioned GFN 在多种二维复杂目标地形上的生成结果。颜色表示偏好向量或目标方向的角度；在 concave 等复杂场景中，goal-conditioned 方法明显比 preference-conditioned 方法更能覆盖中间折中区域。

![[raw/zotero/images/多目标分子优化/目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable/mineru-figure-03.jpg]]

图 3 展示了不同目标数下的定量比较表。随着目标数量从 2 增加到 4，goal-conditioned GFN 在 Avg-PCC 和 PC-ent 上保持明显优势，说明其可控性和 Pareto front 覆盖均匀性更好。

二维复杂目标地形上的结果如下：

| 指标 | 方法 | unrestrained | restrained-convex | concave | concave-sharp | multi-concave | 4-dots | 16-dots |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| IGD ↓ | pref-cond | 0.087 ± 0.001 | 0.316 ± 0.002 | 0.272 ± 0.001 | 0.180 ± 0.002 | 0.152 ± 0.006 | 0.130 ± 0.011 | 0.109 ± 0.009 |
| IGD ↓ | goal-cond | 0.095 ± 0.002 | 0.310 ± 0.001 | 0.266 ± 0.001 | 0.197 ± 0.002 | 0.173 ± 0.004 | 0.134 ± 0.002 | 0.115 ± 0.004 |
| Avg-PCC ↑ | pref-cond | 0.905 ± 0.001 | 0.673 ± 0.009 | 0.830 ± 0.002 | 0.855 ± 0.004 | 0.700 ± 0.009 | 0.768 ± 0.038 | 0.770 ± 0.011 |
| Avg-PCC ↑ | goal-cond | 0.967 ± 0.002 | 0.953 ± 0.001 | 0.926 ± 0.002 | 0.915 ± 0.001 | 0.946 ± 0.004 | 0.928 ± 0.002 | 0.948 ± 0.001 |
| PC-ent ↑ | pref-cond | 2.170 ± 0.004 | 1.913 ± 0.019 | 1.563 ± 0.009 | 1.629 ± 0.002 | 1.867 ± 0.015 | 1.521 ± 0.022 | 1.610 ± 0.019 |
| PC-ent ↑ | goal-cond | 2.472 ± 0.006 | 2.242 ± 0.013 | 1.997 ± 0.002 | 1.918 ± 0.001 | 2.380 ± 0.020 | 2.270 ± 0.025 | 2.262 ± 0.014 |

可以看到，IGD 上两者差距不总是很大，因为 IGD 只关注每个参考点最近的一个样本；即使 preference-conditioned 方法只在中间区域生成少量样本，也可能得到相近 IGD。但在 Avg-PCC 和 PC-ent 上，goal-conditioned GFN 显著更好，表明其生成分布更受条件控制，且沿 Pareto front 更均匀。

目标数增加实验结果如下：

| 指标 | 方法 | 2 objectives | 3 objectives | 4 objectives |
|---|---|---:|---:|---:|
| IGD ↓ | pref-cond | 0.088 ± 0.001 | 0.218 ± 0.003 | 0.370 ± 0.000 |
| IGD ↓ | goal-cond | 0.094 ± 0.004 | 0.199 ± 0.002 | 0.303 ± 0.001 |
| Avg-PCC ↑ | pref-cond | 0.904 ± 0.002 | 0.775 ± 0.004 | 0.612 ± 0.002 |
| Avg-PCC ↑ | goal-cond | 0.961 ± 0.001 | 0.909 ± 0.001 | 0.893 ± 0.002 |
| PC-ent ↑ | pref-cond | 2.166 ± 0.007 | 3.775 ± 0.016 | 4.734 ± 0.004 |
| PC-ent ↑ | goal-cond | 2.471 ± 0.001 | 4.571 ± 0.008 | 6.320 ± 0.009 |

随着目标数增加，goal-conditioned GFN 的优势更明显，尤其在 Avg-PCC 与 PC-ent 上。这说明 goal-conditioning 更适合高维目标空间中的可控分子生成。

![[raw/zotero/images/多目标分子优化/目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable/mineru-figure-04.jpg]]

图 4 展示了 Tab-GS 与 Uniform-GS 的学习曲线对比。对于 2 目标任务，两者差别较小；但在 3 和 4 目标任务中，Tab-GS 在训练 25% 后开始根据可行性采样目标方向，goal-reaching accuracy 出现明显提升，并进一步改善 IGD 和 PC-ent。

![[raw/zotero/images/多目标分子优化/目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable/mineru-figure-05.jpg]]

图 5 是 2 目标任务的附加结果，对比 preference-conditioned 与 goal-conditioned 模型在目标分布、条件-奖励相关性和目标空间密度上的差异。goal-conditioned 方法生成的样本更均匀，并且条件向量与实际奖励之间相关性更清晰。

![[raw/zotero/images/多目标分子优化/目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable/mineru-figure-06.jpg]]

图 6 是 3 目标任务的附加结果。相较 preference-conditioned 方法，goal-conditioned 方法在多对目标平面上的覆盖更均匀，并在条件控制上表现更强。

![[raw/zotero/images/多目标分子优化/目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable/mineru-figure-07.jpg]]

图 7 是 4 目标任务的附加结果。由于高维目标空间更难覆盖，goal-conditioned 方法相对 preference-conditioned 方法的均匀性和可控性优势更重要。

![[raw/zotero/images/多目标分子优化/目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable/mineru-figure-08.jpg]]

图 8 对应论文附录中 2 目标任务的更多可视化面板，用于观察各目标维度上的样本分布、条件向量与奖励值的关系，以及目标对之间的密度分布。

![[raw/zotero/images/多目标分子优化/目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable/mineru-figure-09.jpg]]

图 9 进一步展示了 2 目标任务下不同条件模型的样本分布细节。对角线图反映单个目标维度上的奖励分布与条件控制关系，非对角线图反映目标对之间的分布密度或可控性。

![[raw/zotero/images/多目标分子优化/目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable/mineru-figure-10.jpg]]

图 10 展示了 3 目标任务下的附加面板。该图用于辅助判断模型是否能同时在多个目标维度上保持样本分散性与条件可控性。

![[raw/zotero/images/多目标分子优化/目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable/mineru-figure-11.jpg]]

图 11 展示了 4 目标任务下的附加可视化。随着目标维度增加，能够在不同目标对平面上保持稳定覆盖，是 goal-conditioned 方法的重要优势之一。

![[raw/zotero/images/多目标分子优化/目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable/mineru-figure-12.jpg]]

图 12 同样来自附录的高维目标实验可视化，用于补充确认模型在不同目标维度组合上的分布情况。当前解析文本未能精确恢复该图片对应的完整原始图号与图注，待补充原文/PDF 后确认。

## 创新点

1. **用目标区域替代偏好标量化**  
   本文不是把多目标问题转化为加权单目标问题，而是直接让模型以目标空间中的 focus region 为条件，生成落入指定区域的分子。

2. **提升复杂 Pareto front 上的可控覆盖**  
   对于凹形或多段复杂 Pareto front，goal-conditioned GFN 能显式覆盖不同折中方向，避免 preference-conditioned 方法偏向极端点。

3. **引入 goal-reaching accuracy 作为可控性监控信号**  
   由于目标区域被明确定义，可以直接统计生成样本是否落入目标区域，这为训练监控、样本过滤和 hindsight relabeling 提供依据。

4. **结合 hindsight experience replay 缓解稀疏奖励问题**  
   对未达到原目标的轨迹进行目标重标注，使失败样本也能贡献训练信号。

5. **提出 Tab-GS 应对不可行目标方向**  
   Tab-GS 根据训练中观察到的可行性统计，降低不可行目标方向的采样概率，在 3、4 目标任务中显著改善训练效率和效果。

## 局限性

1. **硬约束导致样本效率下降**  
   当采样到不可行 goal region 时，模型只能观察到 0 奖励样本，这会降低训练与采样效率。

2. **Tab-GS 随目标数增长存在扩展性问题**  
   Tab-GS 需要为每个离散目标方向维护参数。目标数 $K$ 增加时，方向数量可能指数增长，带来统计效率和内存限制。

3. **目标区域设计依赖余弦相似度阈值**  
   focus region 的宽度由 $c_g$ 控制，过宽会降低可控性，过窄会增加到达难度。如何自适应设定目标区域仍需进一步研究。

4. **实验主要集中在 fragment-based 分子生成和若干启发式目标上**  
   是否能稳定推广到更真实的药物发现约束，例如 ADMET、多靶点活性、合成路线可行性等，待补充原文/PDF 或后续工作确认。

5. **GFN-GS 只是未来工作设想**  
   作者提出用 GFlowNet-based Goal Sampler 改善 Tab-GS 扩展性，但本文未报告其完整实验结果。

## 相关概念

- [[分子生成]]
- [[分子优化]]
- [[多目标优化]]
- [[Pareto Front]]
- [[可控生成]]
- [[目标空间]]
- [[Goal-conditioned Reinforcement Learning]]
- [[GFlowNet]]
- [[Inverted Generational Distance]]
- [[目标区域]]
## 相关方法

- [[Multi-objective GFlowNets]]
- [[Preference-conditioned GFlowNets]]
- [[Tabular Goal Sampler]]
- [[Trajectory Balance]]
- [[Hindsight Experience Replay]]
- [[Linear Scalarization]]
## 相关数据集

- 待补充。
## 相关模型

- [[Graph Transformer]]
## 相关论文

- [[Multi-objective GFlowNets]]
- [[Flow Network based Generative Models for Non-Iterative Diverse Candidate Generation]]
- [[GFlowNet Foundations]]
- [[Trajectory Balance]]
- [[Hindsight Experience Replay]]
- [[Pareto Multi-Task Learning]]

## 源文件

- Zotero citekey：`royGoalconditionedGFlowNetsControllable`
- 论文标题：**Goal-conditioned GFlowNets for Controllable Multi-Objective Molecular Design**
- 作者：Julien Roy, Pierre-Luc Bacon, Christopher Pal, Emmanuel Bengio
- 年份：当前元数据缺失；正文显示为 ICML Workshop on Challenges in Deployable Generative AI, 2023。
- venue：元数据缺失；正文显示为 Workshop on Challenges in Deployable Generative AI at International Conference on Machine Learning (ICML), Honolulu, Hawaii, USA, 2023。
- DOI：元数据缺失。
- collections：多目标分子优化
- 正文来源：MinerU full.md

## 代码与数据

### 代码

未在当前解析文本中发现明确代码仓库。

### 数据集 / Benchmark

- https://books.google.ca/books?id=GPE6ZAqGrnoC

### 其他链接

未在当前解析文本中发现其他外部资源链接。

## Zotero 原始摘要

In recent years, in-silico molecular design has received much attention from the machine learning community. When designing a new compound for pharmaceutical applications, there are usually multiple properties of such molecules that need to be optimised: binding energy to the target, synthesizability, toxicity, EC50, and so on. While previous approaches have employed a scalarization scheme to turn the multi-objective problem into a preference-conditioned single objective, it has been established that this kind of reduction may produce solutions that tend to slide towards the extreme points of the objective space when presented with a problem that exhibits a concave Pareto front. In this work we experiment with an alternative formulation of goal-conditioned molecular generation to obtain a more controllable conditional model that can uniformly explore solutions along the entire Pareto front.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的关键不是提出一个新的分子属性预测器，而是改变多目标生成模型的“条件控制接口”。preference-conditioning 的接口是“我更重视哪个目标”，而 goal-conditioning 的接口是“我希望生成结果落在目标空间的哪个方向/区域”。前者依赖线性标量化，容易受到 Pareto front 几何形状影响；后者直接把目标区域变成 hard constraint，因此更适合需要覆盖不同折中解的场景。

从实用角度看，goal-conditioned GFN 对药物发现很有吸引力：药物设计者往往不是只想最大化一个综合分数，而是希望探索一批满足不同折中策略的候选分子。例如有些候选可以牺牲一点 QED 换取更高结合能，有些候选则希望保持更好可合成性。goal-conditioned 形式更接近这种交互式、多策略探索需求。

不过，这种方法的代价是奖励更稀疏。只要目标区域不可行或很难达到，训练信号就会变差。因此 Tab-GS 是本文非常关键的工程补丁。它说明 hard constraint 虽然带来更强可控性，但必须配合合理的 goal distribution 学习，否则会浪费大量采样预算。

## 后续问题

1. focus region 的形状是否必须是基于余弦相似度的锥形区域？能否使用 box constraint、球形区域或由专家规则定义的非凸区域？
2. Tab-GS 在目标数更高时会遇到指数扩展问题，GFN-GS 是否真的能解决这一问题？是否有后续论文验证？
3. goal-conditioned GFN 在真实药物发现中的多目标约束，例如 ADMET、选择性、合成路线成本等，是否仍能保持可控性？
4. 对不可行 goal region 的识别是否可以与 uncertainty estimation 结合，主动避免无效目标区域？
5. 本文评估中过滤 out-of-focus samples 后再计算指标，这对实际采样效率的影响有多大？是否需要同时报告未过滤前的有效样本比例？
6. 与基于 hypervolume improvement 或 Pareto front active learning 的方法相比，goal-conditioned GFN 的样本效率和分子多样性如何？
