---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标黑箱优化与扩散模型推理时优化"
background: "included"
---
# Distributional Optimization

## 标准定义

Distributional Optimization 指的是：不直接优化单个解 x，而是把“解的分布 q(x)”作为优化对象，在期望目标值与分布约束之间做权衡。常见形式是最小化 <span>E_q[f(x)]</span> 并加入相对基分布 p_0(x) 的 [[KL散度]] 正则项，从而得到类似 [[Boltzmann分布]] 的指数倾斜最优分布。直观上，它强调“让采样分布更好”，而不是“只找一个最好点”。

## 在本知识库中的用法

在这篇论文中，Distributional Optimization 被用来重新表述[[多目标黑盒优化|多目标黑箱优化]]：先把每个目标写成带 [[KL散度]] 约束的[[分布式优化|分布优化]]问题，得到单目标的指数倾斜分布；再将多个目标分布组合成多目标 Boltzmann mixture 分布。随后在[[扩散模型]]推理阶段，把预训练反向转移分布当作 base distribution，用多目标权重对候选样本进行[[Weighted Resampling|重采样]]，从而把生成分布推向期望的多目标目标分布，并近似覆盖 [[Pareto front]]。

## 关键点

- 核心思想是优化“分布”而非单点：通过调整样本分布来间接提升多目标解集质量。
- 标准形式通常带有 [[KL散度]] 正则，因此既追求低目标值，也限制新分布偏离 base distribution 过远。
- 在该论文中，单目标分布优化给出指数倾斜形式，多个目标进一步组合成多目标 Boltzmann mixture。
- 该视角为 [[扩散模型]] [[Inference-time Optimization|推理时优化]]提供了接口：把反向采样分布视作 base distribution，再做[[Weighted Resampling|加权重采样]]。
- 对多目标任务而言，它更关注生成一组[[Non-dominated Solutions|非支配解]]，而不是一个唯一最优点。
- [[Preference Vector|偏好向量]]和温度参数用于控制不同目标之间的权衡，并影响最终样本覆盖的 trade-off 区域。

## 别名

- 分布优化
- Distributional Optimization
- KL正则化分布优化
- 分布式优化

## 外部背景

- 常见背景是 KL-regularized / entropy-regularized optimization：在目标项之外加入分布偏离惩罚，使最优解呈指数倾斜形式。
- 在统计物理和[[Energy-Based Model|能量模型]]中，类似思想可写成 [[Boltzmann分布]] 或 Gibbs 分布；待核对经典来源。
- 在[[强化学习]]与策略优化中，优化“策略分布”而非单个动作/轨迹，也是同一类分布优化思想的常见变体，待核对经典来源。
- 多目标版本通常会引入加权和、混合分布或 preference vector，用于表达不同目标之间的权衡。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
