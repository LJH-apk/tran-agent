# KPI 字典与治理解释

## 总旅行时间 / Total Time Spent
网络所有车辆时间累积。适合网络级效率，但对不同人群权重相同。

## 总延误
与自由流或期望旅行时间相比的超额时间。基准定义必须一致。

## Throughput / Completion Rate
单位时间离开瓶颈/完成行程的车辆数。对过饱和网络非常关键。

## Queue Length
平均队列不够；同时看最大值、P95、是否超过储存长度。

## Spillback
队列占满下游路段并阻塞上游路口。它是网络失稳的强信号。

## v/c 或 degree of saturation
接近/超过 1 提示结构性过载，但容量本身具有随机性和模型误差。

## Travel Time Reliability
P95、buffer index 等用于描述日常波动与事件风险。

## Person-delay
公交优先、HOV、共享出行场景应优先考虑。

## Network Accumulation / Production
MFD 区域控制核心状态；必须同时检查空间异质性。

## Recovery Time
事故/网格锁死治理的重要韧性指标。
