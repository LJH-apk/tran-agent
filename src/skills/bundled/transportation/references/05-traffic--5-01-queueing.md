# 5.1: Queueing

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/05%3A_Traffic/5.01%3A_Queueing

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/4/42/Queue_System.svg/450px-Queue_System.svg.png)

A Schematic of a Queue System

**Queueing** is the study of traffic behavior near a certain section where demand exceeds available capacity. Queues can be seen in many common situations: boarding a bus or train or plane, freeway bottlenecks, shopping checkout, exiting a doorway at the end of class, waiting for a computer in the lab, a hamburger at McDonald’s, or a haircut at the barber. In transportation engineering, queueing can occur at red lights, stop signs, bottlenecks, or any design-based or traffic-based flow constriction. When not dealt with properly, queues can result in severe network congestion or "gridlock" conditions, therefore making them something important to be studied and understood by engineers.

## Cumulative Input-Output Diagram (Newell Curve)

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/9/98/Queueing_Ip-Op.svg/500px-Queueing_Ip-Op.svg.png)

Newell Curve showing the cumulative inputs and outputs from a queue

Based on the departure rate and arrival rate pair data, the delay of every individual vehicle can be obtained. Using the input-output (I/O) queueing diagram shown in the side figure, it is possible to find the delay for every individual vehicle: the delay of the \(i^{th}\) vehicle is time of departure - time of arrival (\(t_2-t_1\)). Total delay is the sum of the delays of each vehicle, which is the area in the triangle between the arrival (_A(t)_) and departure (_D(t)_) curves.

## Distributions

Arrival Distribution - Deterministic (uniform) OR Random (e.g. Poisson)

Service Distribution - Deterministic OR Random

Service Method:

*   First Come First Served (FCFS) or First In First Out (FIFO)
*   Last Come First Served (LCFS) or Last In First Out (LIFO)
*   Priority (e.g. HOV bypasses at ramp meters)

## Characterizing Queues

Queue Length Characteristics - Finite or Infinite

Number of Channels - Number of Waiting Lines (e.g. Ramps = 2, Supermarket = 12)

We use the following notation:

*   Arrival Rate = \(\lambda\)
*   Departure Rate = \(\mu\)

Utilization Rate \(\rho\) = \(\rho=\dfrac{\lambda}{\mu}\)

### **Degree of Saturation**

Oversaturated: \(\lambda > \mu\)

Undersaturated: \(\lambda < mu\)

Saturated: \(\lambda=\mu\)

## Little's Formula

Little's Formula: \[E(n)=\lambdaE(v)\]

his means that the average queue size (measured in vehicles) equals the arrival rate (vehicles per unit time) multiplied by the average waiting time (both delay time in queue plus service time) (in units of time). This result is independent of particular arrival distributions and, while perhaps obvious, is an important fundamental principle that was not proven until 1961.

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/e/ec/Traffic_Congestion_Brasilia.jpg/200px-Traffic_Congestion_Brasilia.jpg)

A traffic queue

## Uncapacitated Queues (M/D/1) and (M/M/1)

It has been shown that queue sizes, waiting times, and delays differ between M/D/1 and M/M/1 queueing. These differences are represented in formulas and shown below. Note the minor differences between the two.

**Comparison of M/D/1 and M/M/1 queue properties**

| **'** | **M/D/1** | **M/M/1** |
| --- | --- | --- |
| E(w) (average waiting time) | \(E(w)=\frac{\rho}{2\mu(1-\rho)}\) | \(E(w)=\frac{\lambda}{\mu(\mu-\lambda)}\) |
| E(v) (average total delay) | \(E(v)=\frac{2-\rho}{2\mu(1-\rho)}\) | \(E(v)=\frac{1}{(\mu-\lambda)}\) |
| E(n) (expected number of units in the system (including vehicles being served)) | \(E(n)=\frac{(2-\rho)\rho}{2\mu(1-\rho)}\) | \(E(n)=\frac{\rho}{(1 -\rho)}\) |

Notes:

*   Average wait time (E(w)) excludes service time.
*   Average total delay (E(v)) is (wait time + service time). This is sometimes referred to _average delay time_ due to the existence of the bottleneck.

*   Expected number of units in the system (E(n)) includes customers currently being served (in number of units). According to Little's Law this is arrival rate multiplied by the average time spent in the system (E(n)=\lambda*E(v)\).
*   Sometimes Expected number of units in the queue (E(m)) is requested, excluding customers being served, which is a different formula ( arrival rate multiplied by the average waiting time \(E(m)=\lambda*E(w)\)), and obviously results in a small number.

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/9/94/StochasticQueueingQueueLength.png/200px-StochasticQueueingQueueLength.png)

Stochastic Queueing Queue Length

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/a/ac/ComparisonOfStochasticAndDeterministicQueueingAndBPR.png/200px-ComparisonOfStochasticAndDeterministicQueueingAndBPR.png)

Comparison Of Stochastic And Deterministic Queueing And BPR.

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/7/76/ComparisonOfStochasticQueueingWithBPRAndAkcelikFormula.png/200px-ComparisonOfStochasticQueueingWithBPRAndAkcelikFormula.png)

Comparison Of Stochastic Queueing With BPR And Akcelik Formula.

## Uncapacitated queues (M/M/1) (random arrival and random service)

In addition to the properties stated before, M/M/1 queueing have a few additional ones of which to take note.

**Additional M/M/1 queue properties**

| ' | **M/M/1** |
| --- | --- |
| Probability of n units in the system | \(P(n)=\rho^n(1-\rho)\) |
| Average waiting time of arrival, including queue and service | \(E(v)=\frac{1}{(\mu-\lambda)}\) |
| Average waiting time in queue (excluding vehicles being served) | \(E(w)=\frac{\lambda}{\mu(\mu-\lambda)}\) |
| Expected number of units in the system (including vehicles being served) | \(E(n)=\lambdaE(v)=\frac{\lambda}{\mu-\lambda}\) |
| Mean queue length (excluding vehicles being served) | \(E(m)=\lambdaE(w)=\frac{\lambda^2}{\mu(\mu-\lambda})\) |
| Probability of spending time t or less in system | \(P(v \le t)=1-e^{-(1-\rho)\mut}\) |
| Probability of spending time t or less in the queue | \(P(w \le t)=1-\rhoe^{-(1-\rho)\mut}\) |
| Probability of spending more than time t in the queue, given the queue is not empty | \(P(w>t&#124;w>0)=1-e^{-(1-\rho)\mut}\) |
| Probability of more than N vehicles in queue | \(P(n>N)=\rho^{N+1}\) |

## Capacitated Queues (Finite)

Capacitated queues permit a maximum number of vehicles to wait, and thus have different properties than uncapacitated queues. For single channel undersaturated finite queues where the maximum number of units in system is specified as \(N\) and with random arrivals and departures (\(\lambda,\mu\)) we have:

**Additional M/M/1 queue properties**

| ' | **M/M/1** |
| --- | --- |
| Probability of n Units in System | \(P(n)=\frac{(1-\rho)}{1-\rho^(N+1)}(\rho)^n\) |
| Expected Number of Units in System | \(E(n)=\frac{(\rho)}{(1-\rho)}\frac{1-(N+1)(\rho)^N+N\rho^N+1}{1-\rho^{N+1}\) |

## Real Life Causes of Queue Generation

**For Roads**:

*   Geometric Bottlenecks (lane drops, hard curves, hills)
*   Accidents and Incidents
*   Traffic Signals and Intersection Controls
*   At-Grade Crossings with other Modes (Railroad crossings, drawbridges, etc.)
*   Toll Booths
*   Ramp Meters
*   "Gawker" Effect
*   Inclement Weather

**For Trains and Transit**:

*   Platform Capacities
*   Fare Gates
*   Ticket Windows/Ticket Machines
*   Minimum Safe Separation for Trains
*   Security Checkpoints
*   Efficiency of Trains Entering and Leaving Station (number of tracks, switches, etc.)

**For Aviation and Airports**:

*   Runways
*   Designated Minimum Safe Following Distances for Planes (by government)
*   Physical Minimum Safe Following Distance for Planes (creation of turbulence, etc.)
*   Available Airspace for Approaches and Departures
*   Ticketing Counters/Check-in Procedures
*   Security Checkpoints
*   Baggage Systems
*   Terminal Capacity for Planes
*   Internal Terminal Capacity for Passengers
*   Inclement Weather

**For Water and Maritime**:

*   Locks and Dams
*   Port Capacities
*   Minimum "Safe" Distances (determined by government and physics)
*   Inclement Weather

**For Space Flight**:

*   Launch Capacity
*   Minimum Spacings between Orbital Vehicles
*   Inclement Weather on Earth
*   Unfavorable Celestial Conditions

## Examples

Example 1

At the Krusty-Burger, if the arrival rate is 1 customer every minute and the service rate is 1 customer every 45 seconds, find the average queue size, the average waiting time, and average total delay. Assume an M/M/1 process.

**Solution**

To proceed, we convert everything to minutes.

Service time:

45/60 = 0.75 minutes per customer. Alternatively, you can say the server can handle 60/45 = 1/0.75 = 1.33 customers per minute.

The arrival rate is 1 customer per minute.

The utilization rate \(\rho=(60/60)/(60/45)=0.75\) Meaning the server is busy on average 75% of the time.

Average queue size (E(n)):

\(E(n)=\frac{\rho}{1-\rho}=\frac{0.75}{(1-0.75)}=3\)

\(E(n)=\lambdaE(v)=1*3.00\) Little's Formula

Average wait time:

\(E(w)=\frac{\lambda}{\mu(\mu-\lambda)}=\frac{1}{1.33(1.33-1)}=2.25\)

Average delay time:

\(E(v)=\frac{1}{(\mu-\lambda)}=\frac{1}{(1.33-1)}=3=E(w)+servicetime=2.25+0.75\)

Comparison:

We can compute the same results using the M/D/1 equations, the results are shown in the Table below.

**Comparison of M/D/1 and M/M/1 queue properties**

| ' | **M/D/1** | **M/M/1** |
| --- | --- | --- |
| E(n) (average queue size (#)) | 1.875 | 3 |
| E(w) (average waiting time) | 1.125 | 2.25 |
| E(v) (average total delay) | 1.875 | 3 |

As can be seen, the delay associated with the more random case (M/M/1, which has both random arrivals and random service) is greater than the less random case (M/D/1), which is to be expected.

Example 2

How likely was it that Homer got his pile of hamburgers in less than 1, 2, or 3 minutes?

**Solution**

\(P(t \le 1)=1-e^{-(1-\rho)\muT}=1-e^{-(1-0.75)1.333*1}=1-e^{-0.333}=0.283\)

\(P(t \le 2)=1-e^{-(1-\rho)\muT}=1-e^{-(1-0.75)1.333*2}=1-e^{-0.667}=0.487\)

\(P(t \le 3)=1-e^{-(1-\rho)\muT}=1-e^{-(1-0.75)1.333*3}=1-e^{-1}=0.631\)

Example 3

Before he encounters the “pimply faced teen” who serves burgers, what is the likelihood that Homer waited more than 3 minutes?

**Solution**

\(P(w \le 3)=1-\rhoe^{-(1-\rho)\muT}=1-0.75e^{-(1-0.75)1.333*3}\)

\(P(w>3)=1-P(w \le 3)\)

Example 4

How likely is it that there were more than 5 customers in front of Homer?

**Solution**

\(P(n>5)=\rho^{N+1}=0.75^6=0.178\)

## Thought Question

**Problem**

How does one minimize wait time at a queue?

**Solution**

Cutting in line always helps, but this problem will be answered without breaking any rules. Think about going out to dinner, only to find a long line at your favorite restaurant. How do you deal with that? Maybe nothing can be done at that time, but the next time you go to that restaurant, you might pick a new time. Perhaps an earlier one to avoid the lunch or dinner rush. Similar decisions can be seen in traffic. People that are tired of being in network queues on their way to work may attempt to leave earlier or (if possible) later than rush hour to decrease their own travel time. This typically works well until all the other drivers figure out the same thing and shift congestion to a different time.

To minimize wait time at a queue on the road, some places allow lane filtering and even lane splitting under certain circumstances. Some other places have considered these unsuccessfully.

> "There is evidence (Hurt, 1981) that traveling between lanes of stopped or slow-moving cars (i.e., lane splitting) on multiple-lane roads (such as interstate highways) slightly reduces crash frequency compared with staying within the lane and moving with other traffic."

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/a/ae/Two_riders_lane_splitting.jpg/220px-Two_riders_lane_splitting.jpg)

Two motorcycle riders lane splitting in California, USA

## Sample Problems

Sample Problem 1: Queueing at a Tollbooth

Application of Single-Channel Undersaturated Infinite Queue Theory to Tollbooth Operation. Poisson Arrival, Negative Exponential Service Time

*   Arrival Rate = 500 vph,
*   Service Rate = 700 vph

Determine

*   Percent of Time operator will be free
*   Average queue size in system
*   Average wait time for vehicles that wait

Note: For operator to be free, vehicles must be 0

**Answer**

\(\rho=\frac{\lambda}{\mu}=(\dfrac{500}{700})=0.714\)

\(P(n)=\rho^n(1-\rho)=(0.714)^0(1-0.714)=28.6%\)

\(Q=\frac{\rho}{1-\rho}=\frac{0.714}{0.286}=2.5\)

\(w=\frac{\lambda}{\mu-(\mu-\lambda)}=\frac{500}{700(700-500)}=0.003571 \text{ }hours=12.8571 \text{ } sec\)

\(Q=\lambdaw=500*0.00357=1.785\)

Service Time = \(\frac{1}{\mu}=\frac{1}{700}=0.001429 \text{ } hours=5.142 \text{ } sec\)

\(t=\frac{1}{(\mu-\lambda)}=\frac{1}{(700-500)}=0.005 \text{ } hours= 18 \text{ } seconds\)

Sample Problem 2: Queueing at a Ramp Meter

A ramp has an arrival rate of 200 cars an hour and the ramp meter only permits 250 cars per hour, while the ramp can store 40 cars before spilling over.

(A) What is the probability that it is half-full, empty, full?

(B) How many cars do we expect on the ramp?

**Answer**

\(\rho=200/250=0.8\)

**Part (A)**

What is the probability that it is half-full, empty, full?

Half-full

\(P(n)=\frac{(1-\rho)}{1-\rho^{N+1}}(\rho)^n \to P(20)=\frac{(1-0.8}{1-0.8^{40+1}(0.8)^{20}=0.0023\)

Empty

\(P(n)=\frac{(1-\rho)}{1-\rho^{N+1}}(\rho)^n \to P(0)=\frac{(1-0.8)}{1-0.8^{40+1}}(0.8)^0=0.20\)

Full

\(P(n)=\frac{(1-\rho)}{1-\rho^{N+1}}(\rho)^n \to P(40)=\frac{(1-0.8)}{1-0.8^{40+1}}(0.8)^{40}=2.65*10^{-5}\)

**Part (B)**

How many cars do we expect on the ramp?

\(E(n)=\frac{(\rho)}{(1-\rho)}\frac{1-(N+1)(\rho)^N+N\rho^{N+1}}{1-\rho^{N+1}}=\frac{(0.8)}{(1-0.8)}\frac{1-(40+1)(0.8)^{40}+40(0.8)^{40+1}}{1-(0.8)^{40+1}}=4\)

Sample Problem 3: Queueing at a Ramp Meter

In this problem we apply the properties of capacitated queues to an expressway ramp. Note the following

*   Ramp will hold 15 vehicles
*   Vehicles can enter expressway at 1 vehicle every 6 seconds
*   Vehicles arrive at ramp at 1 vehicle every 8 seconds

Determine:

(A) Probability of 5 cars,

(B) Percent of Time Ramp is Full,

(C) Expected number of vehicles on ramp in peak hour.

**Answer**

\(\lambda=\frac{3600}{8}=450\)

\(\mu=\frac{3600}{6}=600\)

\(\rho=\frac{\lambda}{\mu}=0.75\)

**Part A**

Probability of 5 cars,

\(P(n)=\frac{(1-\rho)}{1-\rho^{N+1}(\rho)^n=\frac{(1-0.75)}{1-0.75^{16}}(0.75)^{15}=0.0033=0.33%\)

**Part C**

Expected number of vehicles on ramp in peak hour.

\(E(n)=\frac{(\rho)}{(1-\rho)}\frac{1-(N+1)(\rho)^N+N\rho^{N+1}}{1-\rho^{N+1}}=\frac{(0.75)}{(1-0.75)}\frac{1-(15+1)(\rho)^{15}+15\rho^{16}}{1-\rho^16}=2.81 \approx 3\)

## Variables

*   A(t) = λ - Arrival Rate
*   D(t) = μ - Departure Rate
*   1/μ - service time
*   ρ = λ/ μ - Utilization
*   Q - average queue size including customers currently being served (in number of units)
*   w - average wait time
*   t - average delay time (queue time + service time)

## Key Terms

*   Queueing theory
*   Cumulative input-output diagram (Newell diagram)
*   average queue length
*   average waiting time
*   average total delay time in system
*   arrival rate, departure rate
*   undersaturated, oversaturated
*   D/D/1, M/D/1, M/M/1
*   Channels
*   Poisson distribution,
*   service rate
*   finite (capacitated) queues, infinite (uncapacitated) queues

## External Exercises

The assignment seeks to provide students with the opportunity to gain a better understanding of two queuing theories: M/D/1 and M/M/1. Two preformatted spreadsheets have been made available for assistance in computing the values sought after in this exercise. While these spreadsheets provide the computations for these results, the formula is listed below for reference:

\[WT_q=(\dfrac{C_{\lambda}^2+C_{\mu}^2}}{2C_{\lambda}^2})(\dfrac{\rho}{1-\rho})\frac{1}{\mu}

Where:

*   \(WT_q)\) : Average customer delay in the queue
*   \(C_{\lambda}\) : Coefficient of variation (CV) of the arrival distribution
*   \(C_\mu\) : Coefficient of variation of the departure distribution
*   \(CV\) : Standard deviation/mean; CV = (1/SqRt (mean)) for Poisson process and CV = 0 for constant distribution
*   \(\mu\) : Average departure rate
*   \(\lambda\) : Average arrival rate
*   \(\rho\) : Utilization = Arrival rate/service rate \((\rho=\lambda/\mu\)

**M/D/1 Queueing**

Download the file for M/D/1 Queueing from the University of Minnesota's STREET website: [M/D/1 Queue Spreadsheet](http://street.umn.edu/FOT/MD1Queue.xls)

With this spreadsheet, run 5 simulations for each of the 10 scenarios, using the arrival and departure information listed in the table below. In other words, program the same data into the spreadsheet 5 different times to capture a changing seed and, thus, produce slightly different answers because of the model's sensitivity. A total of 50 simulations will be run.

| **Scenario** | **1** | **2** | **3** | **4** | **5** | **6** | **7** | **8** | **9** | **10** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Arrival Rate | 0.01 | 0.025 | 0.05 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 |
| Service Rate | 0.5 | 0.5 | 0.5 | 0.5 | 0.5 | 0.5 | 0.5 | 0.5 | 0.5 | 0.5 |

Also, find the utilization for all ten scenarios. Based on the utilization and the distribution variability, use the above equation to compute the average delays for all scenarios with utilization values of less than 1.

Finally, summarize the average-delays obtained both from the simulation and from the WTq equation in the same delay-utilization plot. Interpret your results. How does the average user delay change as utilization increases? Does the above equation provide a satisfactory approximation of the average delays?

**M/M/1 Queueing**

Download the file for M/M/1 Queueing from the University of Minnesota's STREET website: [M/M/1 Queue Spreadsheet](http://street.umn.edu/FOT/MM1Queue.xls)

With this spreadsheet, run 5 simulations for each of the 10 scenarios, using the arrival and departure information listed in the table below. In other words, program the same data into the spreadsheet 5 different times to capture a changing seed and, thus, produce slightly different answers because of the model's sensitivity. A total of 50 simulations will be run.

| **Scenario** | **1** | **2** | **3** | **4** | **5** | **6** | **7** | **8** | **9** | **10** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Arrival Rate | 0.01 | 0.025 | 0.05 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 |
| Service Rate | 0.5 | 0.5 | 0.5 | 0.5 | 0.5 | 0.5 | 0.5 | 0.5 | 0.5 | 0.5 |
| Scenario | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |

Again, you need to use five different random seeds for each scenario. Summarize the results in a delay-utilization plot. Interpret your results (You do NOT need to use the WTq equation given above to compute delays for the M/M/1 queue).

**Additional Questions**

*   Finally compare the M/M/1 queue and the M/D/1 queue. What conclusion can you draw? (For the same average arrival rate, do users experience the same delays in the two queuing systems? Why or why not?).
*   Provide a brief example where M/M/1 might be the appropriate model to use.
*   Provide a brief example where M/D/1 might be the appropriate model to use.

Additional Questions

1.  What is a queue?
2.  Give examples of queueing in real life.
3.  What important variables affect queue length.
4.  How do you compute total delay from a Newell Curve? What is vehicle delay? How many vehicles are there in the system at a given time.
5.  What are some difficulties with calculating queueing times?
6.  Define over and under-saturated?
7.  Characterize a queue.
8.  Define arrival and service rates.
9.  If arrival rates > departure rates, what does that imply.
10.  Name three types of statistical distributions that describe the behavior of queues and explain them.
11.  Can queueing in succession of a length of road mediate arrival demand which reduces delay?
12.  Define congestion.
13.  Explain the bus bunching idea in relation to queue.
14.  How can you determine if a channel is saturated?
15.  What is a loop detector?
     1.  How do loop detectors communicate with stop lights?
     2.  How do large vehicles affect queue detectors?
16.  When does departure rate depend upon arrival rate?
17.  What are examples of service methods?
18.  What is the effect of controls systems in series?
19.  What is the difference between over and undersaturated queues? Give an example of an oversaturated queue.
20.  What is the difference between uncapacitated and capacitated queues?
21.  What does the variable ρ mean? What is meant when λ > μ, λ < μ
22.  Why is there random congestion if the hourly flow is less than hourly capacity (ρ < 1)?
23.  How can constraints be included in predicting how many vehicles are expected in a queue? (i.e. capacity of queue)
24.  What happens if the average number of cars exceeds ramp capacity?
25.  Do equations change for uncapacitated to capacitated queues?
26.  How do you calculate the expected number of units in the system?
27.  Explain why E(n) ≠ E(m) in words. Why is the average number of units in the system not the same as the mean queue length?
28.  Is the expected number of units in the system an average number of units?
29.  When μ and λ are random, what kind of queue is it?
30.  What does Poisson refer to?
31.  What happens to travel time as arrivals approach capacity?
32.  Are most systems under or oversaturated in general?
33.  What is the average service time?
34.  Graph average travel time vs. rho. How does this relate to the volume delay function in Route Choice.
35.  How accurate are these formulas for probability of waiting time and queue length?

**Additional Problems**

1.  What is probability you will wait 15 minutes or more if on average 15 cars/min arrive and 14 cars/min are serviced
2.  What is the average waiting time if there is a 600 vph arrival rate, and a 500 vph service rate.
3.  If there is an arrival rate of 100 vehicles per hour, what is the service time?
4.  How would you solve for an average time waiting in queue if the arrival rate is 400 vph and service rate is 450 vph?
5.  If the arrival rate is 250 vph and the service rate is 600 vph, what is the time for vehicles waiting to get on the system?
6.  With the arrival rate of 250 vph and service rate of 275 vph, ho wmuch free time is there on a ramp and how long is the average wait time.
7.  Calculate the average number of vehicles (wait) in the system with x arrivals and y departures.

Homework

1. Deterministic Queueing

A. Draw a typical queuing input-output diagram (Newell Curve) (for one lane) consistent with observed data on a freeway bottleneck with an uncongested capacity of 1800 vehicles per hour per lane and an arrival rate that starts at 1600 vehicles per hour for 15 minutes, rises to 2000 vehicles per hour for 30 minutes, and drops back to 1600 vehicles per hour for the final 15 minutes.

B. Show how to compute delay on the graph.

C. Show the delay for the 500th vehicle

D. How many vehicles are in the congested region at time the 500th vehicle enters the congested region.

E. How many vehicles are in the congested region at the time the 500th vehicle leaves the front of the queue.

2. You are asked to model a freeway ramp meter with one lane of SOV traffic, which waits at the meter, and an HOV bypass lane that has no delay. Assume vehicles arrive with a random Poisson distribution, and the service rate (the rate at which the light turns green) is stochastic (it is determined by freeway conditions, which from the point of view of travelers on the ramp is random, with a negative exponential distribution). In the peak hour, 800 vehicles arrive at the ramp, of which 100 are high occupancy vehicles with 2 passengers each. The traffic light is timed to turn green on average once every 4 seconds, and is only green long enough to let one vehicle through. Assume the ramp can hold as many vehicles as want to use it.

A. Determine the percent of time the ramp is empty, not empty

B. How much time will each HOV user save?

C. How much time does each SOV user save because the HOV users don’t wait in the queue?

D. Determine the average queue length

E. How often does the queue exceed 15 cars?

3. For the M\/D\/1 queuing model,

A. What is the arrival distribution?

B. What is the departure distribution?

C. How many servers are there?

D. Provide two examples where the model might apply (one transportation and one non-transportation).

4. Under what conditions are ramp meters beneficial, detrimental?

5. Who wins and who loses when ramp meters are installed, illustrate your argument with an example.

6. How might ramp meters be made more popular without reducing their effectiveness?

## Videos
