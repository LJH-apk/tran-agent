# 6.4: Metering and Analogs

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/06%3A_Traffice_Control/6.04%3A_Metering_and_Analogs

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

## Metering

**Metering** (or Ramp Metering) is the application of traffic control to freeway on-ramps to limit the rate of flow entering freeway sections.

Metering has several purposes. The primary purpose is to optimize traffic flow. Metering keeps traffic flowing at or near freeflow speed and at or near maximum flow. Since it is just below the maximum flow, it can be thought of as risk averse. How far below the maximum you set the metered flow rate is an indication of risk aversion (how important it is to avoid breakdown). However, by maximizing total output flow, while avoiding throughput-reducing traffic breakdowns, metering flow should maximize traffic flow on other facilities as well.

Metering has other objectives, including the break-up of platoons entering freeways. Limiting the number of vehicles that enter the freeway all at once increases the likelihood of each vehicle finding a suitable gap into which it can merge, thus decreasing the likelihood of shockwaves being generated at freeway on-ramps.

Metering similarly improves safety by reducing the number of stop-and-start maneuvers required, and decreasing the likelihood of crashes.

Finally, metering provides a tool to manage incident conditions dynamically. Incidents may block lanes, and metering restricts inflow so that congestion on the freeway is diminished. If ramp queues are long enough, vehicles may divert to other routes.

Metering does not come for free, it imposes costs, which are increased delays on ramps. When determining the appropriate metering rate, ramp delays created must be considered along with freeway delays reduced.

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/1/19/Sweetspot.png/220px-Sweetspot.png)

Ramp metering works by keeping traffic just below capacity, at the sweet spot of freeflow speed and maximum throughput

### Metering to control bottleneck flow

The Minnesota Algorithm is one strategy for implementing ramp metering. The objective is to meet target flow for each "zone", which is the set of on-ramps upstream of a bottleneck.

The flow balance equation used in ramp metering is given below, with \(M\) and \(F\) being the control variables. The method is to adjust inflow to meet targeted outflow:

\(A+U+M+F=X+B+S\)

Where:

*   \(A\) upstream mainline volume (measured variable);
*   \(U\) sum of unmetered entrance ramp volumes (measured variable);
*   \(M\) sum of metered local access ramp volumes (controlled variable);
*   \(F\) sum of metered freeway to freeway access ramp volumes (controlled variable)
*   \(X\) sum of exit ramp volumes (measured variables);
*   \(B\) downstream bottleneck volume at capacity (constant);
*   \(S\) space available within the zone (volume based on a measured variable).

### Twin Cities Ramp Metering Holiday

#### **Timeline**

*   Late 1990s: Long delays at some ramps (up to 20 minutes);
*   1999 Republican State Senator Dick Day, who “drives over 70,000 miles per year” from Owatonna, Minnesota pushes “Freedom to Drive” package: shut-off meters, revert HOV lanes, left lane is passing-only lane.
*   Nov. 28, 1999 : Star-Tribune does large Sunday, Front Page piece on Ramp Meters.
*   Early 2000: MnDOT commission’s 3 University of Minnesota studies (Levinson, Michalopoulos, Kwon) to evaluate meters. MnDOT engineers believe results would be ``catastrophic _for traffic._
*   May 2000 Legislature insists on shut-down experiment, at least 4 weeks.
*   Cambridge Systematics hired to conduct study (outsiders).
*   Meters shut off for 8 weeks from Oct. to Dec., 2000.

#### **Consequence of ramp metering shutoff**

The absence of metering resulted in increased freeway system (freeway plus ramp) travel time (reduced speeds) for most travelers. However short trips were advantaged as they did not need to wait at ramp meters to use the freeway system. Travel time variability on the freeway system increased, as freeway congestion was more frequent (though ramp delays were now nonexistent). However the equity of the system increased, as delays were more uniformly distributed.

The number of trips using the freeway system tended to increase. Average weekday peak period trip lengths on the freeway system dropped. We can infer that more non-work trips used the freeway during this period.

### Control Logics

It turns out, the most efficient ramp metering control logic is the one metering the nearest entrance ramp(s) to a critical freeway section so as to keep the flow of this section strictly below capacity. This is also the least equitable, as it implies travelers from one ramp may receive all of the delay while others don't.

In determining a control strategy, equity and efficiency are traded-off. There are a number of implementation considerations:

*   Control – how to “keep the flow of this section strictly below capacity”.
*   Control variables: Flow vs. Density,
*   Feedback vs. Feed-forward,
*   Linear vs. Nonlinear
*   Selection of the threshold values for the controller
*   Reliability: Risk averse vs. Risk seeking
*   Equity considerations – Can one only meter the “nearest entrance ramp(s)”

There are a set of practical coordination mechanisms:

*   Maximum delay/queue length restrictions
*   Coordination group: zones, helper groups, no coordination
*   Theoretical approach: minimize non-linear weighted travel time
*   Optional constraints: smooth of operation etc.

## Analogs

Transportation networks have analogs with network processes in other systems, such as water networks, structures, and electrical networks. Some of the relationships are outlined below.

| ' | **Transportation** | **Water: Hydrostatics** | **Structures** | **Electrical** |
| --- | --- | --- | --- | --- |
| Node Conservation Law | Flow (q) |  |  | Current (Kirchoff’s Current Law) |
| Fundamental Law | q = kv | P = ρgh | F=δ (mv)/ δ (T) | V=IR |
|  | k = q/v |  | F= v δ (m)/ δ (T) | V=I/G |
|  | v=q/k | Bernoulli’s Equation: |  | Ohm’s Law on resistor |
|  |  | Constant=p+1/2ρ V2+ ρgh |  |  |
|  |  | P=F/A (area) |  |  |
|  |  | F=ma |  |  |
| Analogs | flow (q) | Pressure (P*A) | δm/δT | Current (I) |
|  | density (k) | Density (ρ) | Force (F) | Voltage (V) |
|  | velocity (v) | velocity (v) | velocity | Conductance (G) |
| Equilibrium Conditions | Wardrop (time equal on used pairs in parallel) |  | Sum of horizontal (and sum of vertical) forces on a structure = 0, sum of moments = 0. | Voltage drop across two components in parallel are equal |

### Structures

*   F= force
*   m = Mass
*   a = acceleration
*   T = Time

### Transportation

*   q = flow
*   k = density
*   v = velocity

### Electricity

*   V= Voltage
*   I = Current
*   R = Resistance
*   G = Conductance = 1 / Resistance

### Water

*   P = hydrostatic pressure
*   ρ = fluid density =mV = mass *volume
*   g = acceleration due to gravity
*   h = height
*   c= constant
*   A = area
