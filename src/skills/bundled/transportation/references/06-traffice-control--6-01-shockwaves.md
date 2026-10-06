# 6.1: Shockwaves

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/06%3A_Traffice_Control/6.01%3A_Shockwaves

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

**Shockwaves** are byproducts of traffic congestion and queueing. They are transition zones between two traffic states that move through a traffic environment like, as their name states, a propagating wave. On the urban freeway, most drivers can identify them as a transition from a flowing, speedy state to a congested, standstill state. However, shockwaves are also present in the opposite case, where drivers who are idle in traffic suddenly are able to accelerate. Shockwaves are one of the major safety concerns for transportation agencies because the sudden change of conditions drivers experience as they pass through a shockwave often can cause accidents.

## Visualization

While most people have probably experienced plenty of traffic congestion first hand, it is useful to see it systematically from three different perspectives: (1) That of the driver (with which most people are familiar), (2) a birdseye view, and (3) a helicopter view. Some excellent simulations are available here, please see the movies:

Visualization with the TU-Dresden 3D Traffic Simulator

This movie shows traffic jams without an "obvious source" such as an on-ramp, but instead due to randomness in driver behavior: [Shockwave traffic jams recreated for first time](https://www.youtube.com/watch?v=Suugn-p5C1M)

## Analysis of shockwaves

Shockwaves can be seen by the cascading of brake lights upstream along a highway. They are often caused by a change in capacity on the roadways (a 4 lane road drops to 3), an incident, a traffic signal on an arterial, or a merge on freeway. As seen above, just heavy traffic flow alone (flow above capacity) can also induce shockwaves. In general, it must be remembered that capacity is a function of drivers rather than just being a property of the roadway and environment. As the capacity (maximum flow) drops from \(C_1\) to \(C_2\), optimum density also changes. Speeds of the vehicles passing the bottleneck will of course be reduced, but the drop in speed will cascade upstream as following vehicles also have to decelerate.

The figures illustrate the issues. On the main road, far upstream of the bottleneck, traffic moves at density \(k_1\), below capacity (\(k_{opt}\)). At the bottleneck, density increases to accommodate most of the flow, but speed drops.

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/7/77/ShockwaveGraphic.png/300px-ShockwaveGraphic.png)

Shockwave Diagram

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/4/4c/ShockwaveGraphic02.png/300px-ShockwaveGraphic02.png)

Shockwave Diagram

## Shockwave Math

### **Shockwave speed**

If the flow rates in the two sections are \(q_1\) and \(q_2\), then \(q_1=k_1v_1\) and \(q_2=k_2v_2\).

\[v_w=\frac{q_2-q_1}{k_2-k_1}\]

### **Relative speed**

With \(v_1\) equal to the space mean speed of vehicles in area 1, the speed relative to the line \(w\) is:

\[v_{r1}=v_1-v_w\]

The speed of vehicles in area 2 relative to the line w is \(v_{r2}=v-v_w\]

### **Boundary crossing**

The number of vehicles crossing line 2 from area 1 during time period \(t\) is

\[N_1=v_{r1}k_1t=(v_1-v_w)k_1t\]

and similarly

\[N_2=v_{r2}k_2t=(v_2-v_w)k_2t\]

By conservation of flow, the number of vehicles crossing from left equals the number that crossed on the right

\(N_1=N_2\)

so:

\(v_2k_2-v_1k_1=v_w(k_2-k_1)\)

or

\(q_2-q_1=v_w(k_2-k_1)\)

which is equivalent to

\(v_w=\frac{q_2-q_1}{k_2-k_1}\)

## Examples

Example 1

The traffic flow on a highway is \(q_1=2000 \text{ } veh/hr\) with speed of \(v_1=80 \text{ } km/hr\). As the result of an accident, the road is blocked. The density in the queue is \(k_2=275 \text{ } veh/km\). (Jam density, vehicle length = 3.63 meters).

*   (A) What is the wave speed (\(v_w\))?
*   (B) What is the rate at which the queue grows, in units of vehicles per hour (\(q\))?

**Solution**

(A) At what rate does the queue increase?

1. Identify Unknowns:

\(k_1=q/v_1=2000/80=25 \text{ } veh/km\)

\(v_2=0, \text{ } q_2=k_2v_2=0\)

2. Solve for wave speed (\(v_w\))

\(v_w=\frac{q_2-q_1}{k_2-k_1}-\frac{0-2000}{275-25}=-8km/hr\)

Conclusion: the queue grows against traffic

(B) What is the rate at which the queue grows, in units of vehicles per hour?

\(N_1=(v_1-v_w)k_1t=(v_2-v_w)k_2t=N_2\)

dropping t (let t = 1)

\(v_1k_1-v_wk_1=v_2k_2-v_wk_2\)

\(q_1-v_wk_1=q_2-v_wk_2\)

\(2000-(-8)*25=0-(-8)*275\)

\(2200 \text{ } veh/hr = 2200 \text{ } veh/hr\)

## Thought Question

**Problem**

Shockwaves are generally something that transportation agencies would like to minimize on their respective corridor. Shockwaves are considered a safety concern, as the transition of conditions can often lead to accidents, sometimes serious ones. Generally, these transition zones are problems because of the inherent fallibility of human beings. That is, people are not always giving full attention to the road around them, as they get distracted by a colorful billboard, screaming kids in the backseat, or a flashy sports car in the adjacent lanes. If people were able to give full attention to the road, would these shockwaves still be causing accidents?

**Solution**

Yes, but not to the same extent. While accidents caused by driver inattentiveness would decrease nearly to zero, accidents would still be occurring between different vehicle types. For example, in a case where conditions change very dramatically, a small car (say, a Beetle) would be able to stop very quickly. A semi truck, however, is a much heavier vehicle and would require a longer distance to stop. If both were moving at the same speed when encountering the shockwave, the truck may not be able to stop in time before smashing into the vehicle ahead of them. That is why most trucks are seen creeping along through traffic with very big gaps ahead of them.

Sample Problem

Flow on a road is \(q_1=1800veh/hr/lane\), and the density of \(k_1=14.4veh/km/lane\). To reduce speeding on a section of highway, a police cruiser decides to implement a rolling roadblock, and to travel in the left lane at the speed limit (\(v_2=88km/hr\)) for 10 km. No one dares pass. After the police cruiser joins, the platoon density increases to 20 veh/km/lane and flow drops. How many vehicles (per lane) will be in the platoon when the police car leaves the highway?

How long will it take for the queue to dissipate?

**Answer**

Solve for Unknowns:

Original speed

\(v_1=\frac{q_1}{k_1}=\frac{1800}{14.4}=125km/hr\)

Flow after police cruiser joins

\(q_2=k_2v_2=88*20=1760veh/h\)

**Step 1**

Calculate the wave velocity:

\(v_w=\frac{q_2-q_1}{k_2-k_1}=\frac{1760-1800}{20-14.4}=-7.14km/hr\)

**Step 2**

Determine the growth rate of the platoon (relative speed)

\(v_{r2}=v_2-v_w=88-(-7.14)=95.1km/hr\)

**Step 3**

Determine the time spent by the policee cruiser on the highway

\(t=d/v=10km/88km/hr=0.11hr=6.8minutes\)

**Step 4**

Calculate the Length of platoon (not a standing queue)

**Step 5**

What is the rate at which the queue grows, in units of vehicles per hour?

\(\Deltaq=q_1-k_1v_w=q_2-k_2v_w=1800-(14.4*-7.14)=1760-(20*-7.14)=1902veh/hr\)

**Step 6**

The number of vehicles in platoon

\(L_pk_2=10.46km*20veh/km=209.2vehicles\)

OR

\(\Deltaqt=1902veh/hr*0.11hr=209.2veh\)

**How long will it take for the queue to dissipate?**

(a) Where does the shockwave go after the police cruiser leaves? Just reverse everything?

\(v_w=\frac{q_2-q_1}{k_2-k_1}=\frac{1800-1760}{14.4-20}=-7.14km/hr\)

Second wave never catches first.

(b) Return speed to 125, keep density @ 20? \(q_2=20*125=2500\)

\(v_w=\frac{q_2-q_1}{k_2-k_1}=\frac{2500-1760}{20-20}=\infty km/hr\)

Second wave instantaneously catches first

(c) Return speed to 125, keep density @ halfway between 14.4 and 20? \(q_2=20*125=2500\)

\(v_w=\frac{q_2-q_1}{k_2-k_1}=\frac{2150-1760}{17.2-20}=139 \text{ } km/hr\)

Second wave quickly catches first

\(139*t=7.14*(.11+t)\)

\((139-7.14)t=7.14*11\)

\(t=0.006h=.35 \text{ } min =21 \text{ } sec\)

(d) Drop upstream q,k to slow down formation curve.

\(v_w=\frac{q_2-q_1}{k_2-k_1}=\frac{1780-1760}{14.24-20}=-3.47 \text{ } km/hr\)

Second wave eventually catches first

(e) If \(q_{upstream}\) falls below downstream capacity, wave dissipates

\(v_w=\frac{q_2-q_1}{k_2-k_1}=\frac{1250-1760}{10-20}=+51 \text{ } km/hr\)

Forward moving wave.

Additional Questions

1.  What example or explanation can be given for shockwaves on freeways?
2.  Explain the 4 phases of traffic diagram and why each has the slope it has.
3.  How do microscopic and macroscopic models of traffic flow differ?
4.  Why does flow decrease in phase 3 of the traffic phase diagram?
5.  What types of events can create rolling roadblocks?
6.  How is speed calculated from a flow v. density diagram?
7.  What is a shockwave and how do you compute its speed?
8.  Can service rate decrease with increasing congestion?
9.  What factors affect the wave speed?
10.  What does the slope of the shockwave represent in the graph?
11.  Is it possible to increase the density of the queue and still have the shockwave going downstream? What would be a an example of this?
12.  Why is the bottleneck QK curve projected on the mainroad QB curve to find the speed?
13.  What is Greenshields model, does it accurately predict traffic flow?
14.  What is the phase in traffic flow, after density is at its max, called?
15.  What happens to speed when the density increases?
16.  What does the slope represent in a traffic phase diagram
17.  Give an example of density rising and speed dropping
18.  What is \(v_w\)?
19.  What does it mean when the flow rate begins to decrease in the traffic phase diagram?
20.  During the bottleneck phase, what happens to flow as density increases? (flow remains constant)
21.  How can you tell if the queue grows with or against traffic?
22.  Does the bottleneck always slow traffic?
23.  How can traffic avoid the bottleneck?
24.  How do incidents and rolling roadblocks affect shockwaves differently?
25.  How do speed, density, and flow change during the peak hour
26.  List six examples where gaps are important.

Homework

1. The upstream traffic flow on a road with two lanes in the relevant direction is q1= 1800 veh/hr with freeflow speed of v1=90 km/hr. As the result of a crash, one lane is blocked and flow is reduced to q2 = 900 veh/hr. The density in the queue is k2 = 70 veh/km. The value of time is $10/hour/vehicle

A. What is the shockwave speed (vw)?

B. If this continues for 1 hour, before the lane is cleared, how many vehicles long will the queue be?

C. How much did this crash cost society in terms of delay (travel time in excess of freeflow travel time)?

D. If a freeway service patrol (tow truck service) could clear the crash in 30 minutes instead of an hour, how much should society be willing to pay for that service?

E. If a variable message sign placed 2 km upstream of the crash site instantly (at the moment of the crash) advises travelers about a diversion to a frontage road 1 km upstream of the crash site, how valuable is the freeway service patrol (how much should society be willing to pay under these circumstances)?

2. A fixed-time ramp meter with unlimited storage space can serve 1 vehicle every 5 seconds. Vehicles approach the back of the ramp queue at 80 km/hr at a rate of 1 vehicle every 4 seconds. The density in the queue is 275 veh/km.

A. What is the wave speed?

B. What is the rate at which the queue grows, in units of vehicles per hour (q)?

## Variables

*   \(q\) - flow
*   \(c\) - capacity (maximum flow)
*   \(k\) - density
*   \(v\) - speed
*   \(v_r\) - relative speed (travel speed minus wave speed)
*   \(v_w\) - wave speed
*   \(N\) - number of vehicles crossing wave boundary

## Key Terms

*   Shockwaves
*   Time lag, space lag

## Videos
