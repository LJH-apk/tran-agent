# 6.2: Traffic Signals

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/06%3A_Traffice_Control/6.02%3A_Traffic_Signals

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

**Traffic Signals** are one of the more familiar types of intersection control. Using either a fixed or adaptive schedule, traffic signals allow certain parts of the intersection to move while forcing other parts to wait, delivering instructions to drivers through a set of colorful lights (generally, of the standard red-yellow (amber)-green format). Some purposes of traffic signals are to (1) improve overall safety, (2) decrease average travel time through an intersection, and (3) equalize the quality of services for all or most traffic streams. Traffic signals provide orderly movement of intersection traffic, have the ability to be flexible for changes in traffic flow, and can assign priority treatment to certain movements or vehicles, such as emergency services. However, they may increase delay during the off-peak period and increase the probability of certain accidents, such as rear-end collisions. Additionally, when improperly configured, driver irritation can become an issue. Traffic signals are generally a well-accepted form of traffic control for busy intersections and continue to be deployed. Other intersection control strategies include signs (stop and yield) and roundabouts. Intersections with high volumes may be grade separated.

Traffic signals can be pretimed, semi-actuated, or fully-actuated. Pretimed intersections have a fixed cycle length. This is easy to implement but can cause excessive delay at some intersections. Semi-actuated intersections have vehicle detectors on the minor roadway. When a vehicle approaches on the minor roadway, the detector receives a signal to change the light to green. In a fully-actuated intersection, all approaches have a detector. Each phase has an initial green light interval to provide time for standing vehicles to get through the intersection. This initial time is extended if the detector at the approach detects a car moving through the intersection. If there are no cars moving through the intersection for a given period of time, the light will change. This is called a "gap out". After the maximum amount of time has passed for the light to be green, the light will change even if there are still cars moving through the intersection. This is called a "max out".

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/4/4d/Feuvert2.jpg/200px-Feuvert2.jpg)

A Traffic Light

## Intersection Queuing

At an intersection where certain approaches are denied movement, queuing will inherently occur. Of the various queuing models, one of the more commons and simple ones is the D/D/1 Queuing Model. This model assumes that arrivals and departures are deterministic (D) and one departure channel exists. D/D/1 is quite intuitive and easily solvable. Using this form of queuing with an arrival rate \(\lambda\) and a departure rate \(\mu\), certain useful values regarding the consequences of queues can be computed.

One important piece of information is the duration of the queue for a given approach. This time value can be calculated through the following formula:

\[t_c=\frac{\rho r}{1-\rho}\]

Where:

*   \(t_c\) = Time for queue to clear
*   \(\rho\) = Arrival Rate divided by Departure Rate
*   \(r\) = Red Time

With this, various proportions dealing with queues can be calculated. The first determines the proportion of cycle with a queue.

\[P_q=\frac{r+t_c}{C}\]

Where:

*   \(P_q\) = Proportion of cycle with a queue
*   \(C\) = Cycle Length

Similarly, the proportion of stopped vehicles can be calculated.

\[P_s=\frac{\lambda(r+t_C)}{\lambda(r+g)}=\frac{r+t_c}{C}=P_q\]

\[P_s=\frac{\lambda(r+t_C)}{\lambda(r+g)}=\frac{\mu t_C}{\lambda C}=\frac{t_C}{\rho C}\]

Where:

*   \(P_s\) = Proportion of Stopped Vehicles
*   \(g\) = Green Time

Therefore, the maximum number of vehicles in a queue can be found.

\(Q_{max}=\lambda r\)

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/8/86/Typical_Signal_Schedule_and_Traffic_Flow_Diagram%2C_North-South_across_Market_%281929%29.png/220px-Typical_Signal_Schedule_and_Traffic_Flow_Diagram%2C_North-South_across_Market_%281929%29.png)

Typical Signal Schedule and Traffic Flow Diagram, North-South across Market (1929) From Signal Timing Schedule for Traffic Control Plan, June 15, 1929. Attempted "green wave": 8.5mph on Market; 50 vara district: 10.5 mph north-south, 14.5 mph east-west; 100 vara district: 14.5mph north-south, 20.5mph east-west.

## Intersection delay

Various models of intersection delay at isolated intersections have been put forward, combining queuing theory with empirical observations of various arrival rates and discharge times (Webster and Cobbe 1966; Hurdle 1985; Hagen and Courage 1992). Intersections on arterials are more complex phenomena, including factors such as signal progression and spillover of queues between adjacent intersections. Delay is broken into two parts: _uniform delay_, which is the delay that would occur if the arrival pattern were uniform, and _overflow delay_, caused by stochastic variations in the arrival patterns, which manifests itself when the arrival rate exceeds the service flow of the intersection for a time period.

Delay can be computed with knowledge of arrival rates, departure rates, and red times. Graphically, total delay is the product of all queues over the time period in which they are present.

\[D_t=\frac{\lambda r^2}{2(1-\rho)}\]

Similarly, average vehicle delay per cycle can be computed.

\[d_{avg}=\frac{\lambda r^2}{2(1-\rho)}\frac{1}{\lambda C}\]

\[d_{avg}=\frac{r^2}{2C(1-\rho)}\]

From this, maximum delay for any vehicle can be found.

\(d_{max}=r\)

## Level of Service

In order to assess the performance of a signalized intersection, a qualitative assessment called Level of Service (LOS) is assessed, based upon quantitative performance measures. For LOS, the performance measured used is average control delay per vehicle. The general procedure for determining LOS is to calculate lane group capacities, calculate delay, and then make a determination.

Lane group capacities can be calculated through the following equation:

\[c=s\frac{g}{C}\]

Where:

*   \(c\) = Lane Group Capacity
*   \(s\) = Adjusted Saturation Flow Rate
*   \(g\) = Effective Green Length
*   \(C\) = Cycle Length

Average control delay per vehicle, thus, can be calculated by summing the types of delay mentioned earlier.

\[d=(d_1(PF))+d_2+d_3\]

If your intersection is D/D/X: \(d=((d_1(PF))+d_3\)

This is because there are no random arrivals.

If your intersection is M/D/X: \(d=(d_1(PF))+d_2+d_3\)

You might think that there would be no deterministic arrivals because the intersection is M/D/X, however, this is incorrect. d_1 can be thought of as the baseline for the intersection.

Where:

*   \(d\) = Average Signal Delay per vehicle (sec)
*   \(d_1\) = Average Delay per vehicle due to uniform arrivals (sec) (equivalent to \(D_T\) in previous section)
*   \(PF\) = Progression Adjustment Factor
*   \(d_2\) = Average Delay per vehicle due to random arrivals (sec)
*   \(d_3\) = Average delay per vehicle due to initial queue at start of analysis time period (sec)

Uniform delay can be calculated through the following formula:

\[d_1=\frac{0.5C \left(1-\dfrac{g}{C} \right)^2}{1- \left[min(1,X) \dfrac{g}{C} \right]}\]

Where:

\(X\) = Volume/Capacity (v/c) ratio for lane group.

Similarly, random delay can be calculated:

\(d_2=900T \left[(X-1+\sqrt{(X-1)^2+\frac{8kIX}{cT}} \right]\)

Where:

*   \(T\) = Duration of Analysis Period (in hours)
*   \(k\) = Delay Adjustment Factor that is dependent on signal controller mode
*   \(I\) = Upstream filtering/metering adjustment factor

Overflow delay generally only applies to densely urban corridors, where queues can sometimes spill over into previous intersections. Since this is not very common (usually the consequence of a poorly timed intersection sequence, the rare increase of traffic demand, or an emergency vehicle passing through the area), it is generally not taken into account for simple problems.

Delay can be calculated for individual vehicles in certain approaches or lane groups. Average delay per vehicle for an approach A can be calculated using the following formula:

\[d_A=\frac{\sum_i d_iv_i}{\sum_i v_i}\]

Where:

*   \(d_A\) = Average Delay per vehicle for approach A (sec)
*   \(d_i\) = Average Delay per vehicle for lane group i on approach A (sec)
*   \(v_i\) = Analysis flow rate for lane group i

## Critical Lane Groups

For any combination of lane group movements, one lane group will dictate the necessary green time during a particular phase. This lane group is called the Critical Lane Group. This lane group has the highest traffic intensity (v/s) and the allocation of green time for each phase is based on this ratio.

The sum of the flow ratios for the critical lane groups can be used to calculate a suitable cycle length.

\[Y_c=\sum_{i=1}^n (\dfrac{v}{s})_{ci}\]

Where:

*   \(Y_c\) = Sum of Flow Ratios for Critical Lane Groups
*   \((v/s)_{ci}\) = Flow Ratio for Critical Lane Group i
*   \(n\) = Number of Critical Lane Groups

Similarly, the total lost time for the cycle is also an element that can be used in the calculation of cycle length.

\[L=\sum_{i=1}^n(t_L)_{ci}\]

Where:

*   \(L\) = Total lost Time for Cycle
*   \((t_L)_{ci}\) = Total Lost Time for Critical Lane Group i

## Cycle Length Calculation

Cycle lengths are calculated by summing individual phase lengths. Using the previous formulas for assistance, the minimum cycle length necessary for the lane group volumes and phasing plan can be easily calculated.

\[C_{min}=\frac{L*X_C}{X_c- \displaystyle \sum_{i=1}^n Y_i}\]

Where:

*   \(C_{min}\) = Minimum necessary cycle length
*   \(X_c\) = Critical v/c ratio for the intersection
*   \(v/s)_{ci}\) = Flow Ratio for Critical Lane Group
*   \(n\) = Number of Critical Lane Groups

This equation calculates the minimum cycle length necessary for the intersection to operate at an acceptable level, but it does not necessarily minimize the average vehicle delay. A more optimal cycle length usually exists that would minimize average delay. Webster (1958) proposed an equation for the calculation of cycle length that seeks to minimize vehicle delay. This optimum cycle length formula is listed below.

\[C_{opt}=\frac{[(1.5L)+5]}{\left(1.0- \displaystyle \sum_{i=1}^n Y_i \right)}\]

Where:

\(C_{opt}\) = Optimal Cycle Length for Minimizing Delay

## Green Time Allocation

Once cycle length has been determined, the next step is to determine the allocation of green time to each phase. Several strategies for allocating green time exist. One of the more popular ones is to distribute green time such that v/c ratios are equalized over critical lane groups. Similarly, v/c ratios can be found with predetermined values for green time.

\[X_i=\frac{v_i}{c_i}=\frac{v_i}{s_i*g_i/C}\]

Where:

\(X_i\) = v/c ratio for lane group i

With knowledge of cycle lengths, lost times, and v/s ratios, the degree of saturation for an intersection can be found.

\[X_c=\sum \frac{v_i}{s_i} \frac{C}{C-L}\]

Where:

\(X_c\) = Degree of saturation for an intersection cycle

From this, the total effective green for all phases can be computed.

\[\sum g_i= \sum \frac{v_i}{s_i} \frac{C}{X_c} =C-L\]

## Second Method For Green Time

Another method for calculating the effective red and green time for a given cycle is to minimize the total delay of the intersection. By assuming the intersection is controlled based on D/D/1 queuing the above equations for total delay can be used. Since the light will contain at least two or more directions the total delay must be calculated for each direction, and then added together to determine the total delay of the intersection. For a two way intersection with opposing lights a and b

\[D_t=\frac{\lambda_a r^2_a}{2(1- \rho_a)}+ \frac{\lambda_b r^2_b}{2(1-\rho_b)}\]

Also the effective red time is the cycle length minus the effective green time for the other directions.

\[C=r_a+g_a\]

\[g_a=r_b\]

By substituting the two above equation for cycle length and effective red time into the total delay equation, it can then be written with only one variable red time.

\[D_t=\frac{\lambda_a r^2_a}{2(1- \rho_a)}+\frac{\lambda_b (C-r_a)^2}{2(1- \rho_b)}\]

By taking the derivative and setting it equal to zero, the minimum effective red time can be calculated. The other directions effective red time, and the effective green times for each directions can then be calculated by using the two above equations involving the cycle length.

## Demonstrations

*   [Flash animation: Signal Phasing (by Karen Dixon and Thomas Wall of Oregon State University)](http://street.umn.edu/flash_signal_phasing.html)
*   [Flash animation: Signal Progression (by Karen Dixon and Thomas Wall of Oregon State University)](http://street.umn.edu/flash_signal_progression.html)

## Examples

Example 1: Intersection Queuing

An approach at a pretimed signalized intersection has an arrival rate of 0.1 veh/sec and a saturation flow rate of 0.7 veh/sec. 20 seconds of effective green are given in a 60-second cycle. Provide analysis of the intersection assuming D/D/1 queuing.

**Solution**

Traffic intensity, \(\rho\), is the first value to calculate.

\(\rho=\frac{\lambda}{\mu}=\frac{0.1}{0.7}=0.14\)

Red time is found to be 40 seconds (C - g = 60 - 20). The remaining values of interest can be easily found.

Time to queue clearance after the start of effective green:

\(t_c=\frac{\rho r}{1- \rho}=\frac{0.14(40)}{1-0.14}=6.51 s\)

Proportion of the cycle with a queue:

\(P_q=\frac{r+t_c}{C}=\frac{40+6.51}{60}=0.775\)

Proportion of vehicles stopped:

\(P_s=\frac{\lambda(r+t_C)}{\lambda(r+g)}=\frac{0.1(40+6.51)}{0.1(40+20)}=0.775\)

Maximum number of vehicles in the queue:

\(Q_max=\lambda r =0.1(40)=4\)

Total vehicle delay per cycle:

\(D_t=\frac{\lambda r^2}{2(1-\rho)}=\frac{0.1(40^2)}{2-(1-0.14)}=93veh-s\)

Average delay per vehicle:

\(d_{avg}=\frac{r^2}{2C(1-\rho)}=\frac{(40)^2}{2(60)(1-0.14)}=15.5s\)

Maximum delay of any vehicle:

\(d_{max}=r=40 \text{ } s\)

Example 2: Total Decay

Compute the average approach delay given certain conditions for a 60-second cycle length intersection with 20 seconds of green, a v/c ratio of 0.7, a progression neutral state (PF=1.0), and no chance of intersection spillover delay (overflow delay). Assume the traffic flow accounts for the peak 15-minute period and a lane capacity of 840 veh/hr, and that the intersection is isolated.

**Solution**

Uniform Delay:

\(d_1=\frac{0.5C \left(1-\frac{g}{C} \right)^2}{1- \left[min(1,X) \frac{g}{C} \right]}=\frac{0.5(60) \left( 1-\frac{20}{60} \right)^2}{1- \left[ min(1,0.7) \frac{20}{60} \right]}=17.39s\)

Random Delay:

\(T=0.25\) (from problem statement)

\(X=0.7\)

\(k=0.5\) (for pretimed control)

\(I=1.0\) (isolated intersection)

\(c=840\)

\(d_2=900T \left[ (X-1)+\sqrt{(X-1)^2+\frac{8kIX}{cT}} \right]=900(0.25) \left[(0.7-1)+ \sqrt{(0.7-1)^2+\frac{8(0.5)(1)(0.7)}{840(0.25)}} \right]=4.83s\)

Overflow Delay:

Overflow delay is zero because it is assumed that there is no overflow.

\(d_3=0\)

Total Delay:

\(d=d_1(PF)+d_2+d_3=17.39(1)+4.83+0=22.22s\)

The average total delay is 22.22 seconds.

Example 3: Cycle Length Calculation

Calculate the minimum and optimal cycle lengths for the intersection of Oak Street and Washington Avenue, given that the critical v/c ratio is 0.9, the two critical approaches have a v/s ratio of 0.3, and the Lost Time equals 15 seconds.

**Solution**

Minimum Cycle Length:

\(C_{min}=\frac{L*X_c}{X_c- \sum_{i=1}^n Y_i}=\frac{15*0.9}{[0.9-(2(0.3))]}=45s\)

Optimal Cycle Length:

\(C_{opt}=\frac{[(1.5L)+5]}{\left( 1.0- \sum_{i=1}^n Y_i \right)}=\frac{1.5(15)+5}{1.0-2(0.3)}=68.75s\)

The minimum cycle length is 45 seconds and the optimal cycle length is 68.75 seconds.

## Thought Question

**Problem**

Why don't signalized intersections perform more efficiently than uncontrolled intersections?

**Solution**

The inherent lost time that comes from each signal change is wasted time that does not occur when intersections are uncontrolled. It comes at quite a surprise to most of the Western World, where traffic signals are plentiful, but there are intersections that perform quite well without any form of control. There is an infamous video on YouTube that shows an uncontrolled intersection in India where drivers somehow navigate through a busy, chaotic environment smoothly and efficiently. The video is humorous to watch, but it shows a valid point that uncontrolled intersections can indeed work and are quite efficient. However, the placement of traffic signals is for safety, as drivers entering an uncontrolled intersection have a higher likelihood of being involved in a dangerous accident, such as a T-bone or head-on collision, particularly at high speed.

Sample Problem

An approach at a pretimed signalized intersection has an arrival rate of 500 veh/hr and a saturation flow rate of 3000 veh/hr. 30 seconds of effective green are given in a 100-second cycle. Analyze the intersection assuming D/D/1 queueing by describing the proportion of the cycle with a queue, the maximum number of vehicles in the queue, the total and average delay, and the maximum delay.

**Answer**

With the statements in the problem, we know:

Green Time = 30 seconds

Red Time = 70 seconds

Cycle Length = 100 seconds

Arrival Rate = 500 veh/hr (0.138 veh/sec)

Departure Rate = 3000 veh/hr (0.833 veh/sec)

Traffic intensity, \(\rho\), is the first value to calculate.

\(\rho=\frac{\lambda}{\mu}=\frac{500}{3000}=0.167\)

Time to queue clearance after the start of effective green:

\(t_c=\frac{\rho r}{1- \rho}=\frac{0.167(70)}{1-0.167}=14.03 s\)

Proportion of the cycle with a queue:

\(P_q=\frac{r+t_c}{C}=\frac{70+14.03}{100}=0.84\)

Proportion of vehicles stopped:

\(P_s=\frac{\lambda(r+t_C)}{\lambda(r+g)}=\frac{0.138(70+14.03)}{0.138(70+30)}=0.84\)

Maximum number of vehicles in the queue:

\(Q_max=\lambda r =0.138(70)=9.66\)

Total vehicle delay per cycle:

\(D_t=\frac{\lambda r^2}{2(1-\rho)}=\frac{0.138(70^2)}{2-(1-0.157)}=406veh-s\)

Average delay per vehicle:

\(d_{avg}=\frac{r^2}{2C(1-\rho)}=\frac{(70)^2}{2(100)(1-0.167)}=29.41s\)

Maximum delay of any vehicle:

\(d_{max}=r=70 \text{ } s\)

Thus, the solution can be determined:

Proportion of the cycle with a queue = 0.84 Maximum number of vehicles in the queue = 9.66 Total Delay = 406 veh-sec Average Delay = 29.41 sec Maximum Delay = 70 sec

## Additional Questions

Homework

1. Define the following terms

A. Signal phase Answers: A signal phase is the signal combinations in a signal controller that controls a group of traffic movement off and on. B. Signal cycle Answers: The loop time for a specific traffic phase. The time length between the starting of the phase to it apears again. C. Max-out Answers: the maximum flow of the approach D. Gap-out Answers: the flow of approach accounting for the time of green light period E. Lost time Answers: sources of "lost time" at a signalized intersection are: Start-up lost time, clearance lost time and the yield the pedestrians.

2. A pretimed signal controls a four-way intersection with no turning permitted and zero lost time. The EB and WB traffic volumes are 900 and 800veh/h, and the two movements share the same effective green and effective red portions of cycles. The NB and SB directions also share cycle times, with volumes of 300 and 250 veh/h, respectively. If the saturation flow of all approaches is 1800veh/h, the cycle length is 75 seconds, and D/D/1 queuing applies, determine the effective red and green times that must be allocated to each directions combination (N-S, E-W) to minimize the total vehicle delay and compute the total delay per cycle.

3 AADT (Average Annual Daily Traffic) data on a single intersection between an arterial street (East-West) and a minor street (North-South) has been collected for the current year. Approximate saturation flow rates and collected traffic volumes are given in the table below.

| **Approach** | **Volume (veh/hr)** | **Saturation Flow (veh/hr)** |
| --- | --- | --- |
| North Bound (NB) | 380 | 1200 |
| South Bound (SB) | 295 | 1200 |
| East Bound Left Turn (EBLT) | 260 | 1800 |
| East Bound (EB) | 1160 | 3000 |
| West Bound Left Turn (WBLT) | 250 | 1800 |
| West Bound (WB) | 1050 | 3000 |

Based on the traffic demand forecast, it is expected demand for the EB and WB directions (including left turn traffic) will increase by 10% each in the next year, and that for the NB and SB directions by 5% each, while the saturated flow rates remain unchanged. The traffic demand has changed so significantly that, as a city traffic engineer, you are asked to develop a new signal design at this intersection for the NEXT YEAR.

A. The design is required by the city to be a three-phase cycle with leading left turn and no overlap. Draw a sketch of the intersection with arrows indicating the directions of traffic to illustrate your design.

B. The signal at this intersection is traffic-actuated, but you are going to work out a pre-timed signal design in your proposal. Describe the differences between a pre-time signal and a traffic-actuated signal. Under which circumstance a pre-timed signal design can be used for a traffic-actuated signal?

C. You are also asked to develop an alternative design for this intersection because the city received complaints of too much travel delay at this intersection. Based on the calculated cycle length, how are you going to develop this plan?

## Variables

*   \(t_c\) - Time for queue to clear
*   \(\rho\) - Arrival Rate divided by Departure Rate
*   \(r\) - Red Time
*   \(P_q\) - Proportion of cycle with a queue
*   \(P_s\) - Proportion of Stopped Vehicles
*   \(c\) - Lane Group Capacity
*   \(s\) - Adjusted Saturation Flow Rate
*   \(g\) - Effective Green Length
*   \(C\) - Cycle Length
*   \(d\) - Average Signal Delay per vehicle (sec)
*   \(d_1\) - Average Delay per vehicle due to uniform arrivals (sec)
*   \(PF\) - Progression Adjustment Factor
*   \(d_2\) - Average Delay per vehicle due to random arrivals (sec)
*   \(d_3\) - Average delay per vehicle due to initial queue at start of analysis time period (sec)
*   \(X\) - Volume/Capacity (v/c) ratio for lane group.
*   \(T\) - Duration of Analysis Period (in hours)
*   \(k\) - Delay Adjustment Factor that is dependent on signal controller mode
*   \(I\) - Upstream filtering/metering adjustment factor
*   \(d_A\) - Average Delay per vehicle for approach A (sec)
*   \(d_i\) - Average Delay per vehicle for lane group i on approach A (sec)
*   \(v_i\) - Analysis flow rate for lane group i
*   \(d_I\) - Average Delay per vehicle for the intersection (sec)
*   \(v_A\) - Analysis flow rate for approach A
*   \(Y_c\) - Sum of Flow Ratios for Critical Lane Groups
*   \((v/c)_{ci}\) - Flow Ratio for Critical Lane Group i
*   \(n\) - Number of Critical Lane Groups
*   \(C_{min}\) - Minimum necessary cycle length
*   \(X_c\) - Critical v/c ratio for the intersection
*   \((v/s)_{ci}\) - Flow Ratio for Critical Lane Group
*   \(C_{opt}\) - Optimal Cycle Length for Minimizing Delay
*   \(X_i\) - v/c ratio for lane group i
*   \(X_c\) - Degree of saturation for an intersection cycle

## Key Terms

*   Delay
*   Total Delay
*   Average Delay
*   Uniform Delay
*   Random Delay
*   Overflow Delay
*   Cycle Length
*   v/c ratio
*   v/s ratio
*   Saturation Flow Rate
*   Red Time
*   Effective Green
*   Minimum Cycle Length
*   Optimal Cycle Length
*   Critical Lane Group
*   Degree of Saturation
*   Progression Adjustment Factor
*   Lost Time
*   Queue

## Videos

## External Exercises

Use the GAME software at the [STREET website](http://street.umn.edu/) to learn how to coordinate traffic signals to reduce delay.

Use the OASIS software at the [STREET website](http://street.umn.edu/) to study how signals change when given information about time-dependent vehicle arrivals.
