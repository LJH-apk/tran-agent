# 3.6: 3-6 Route Choice

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/03%3A_Modeling_Methods/3.06%3A_3-6_Route_Choice

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

**Route assignment**, **route choice**, or **traffic assignment** concerns the selection of routes (alternative called paths) between origins and destinations in transportation networks. It is the fourth step in the conventional transportation forecasting model, following Trip Generation, Destination Choice, and Mode Choice. The zonal interchange analysis of trip distribution provides origin-destination trip tables. Mode choice analysis tells which travelers will use which mode. To determine facility needs and costs and benefits, we need to know the number of travelers on each route and link of the network (a route is simply a chain of links between an origin and destination). We need to undertake traffic (or trip) assignment. Suppose there is a network of highways and transit systems and a proposed addition. We first want to know the present pattern of travel times and flows and then what would happen if the addition were made.

## Link Performance Function

The cost that a driver imposes on others is called the marginal cost. However, when making decisions, a driver only faces his own cost (the average cost) and ignores any costs imposed on others (the marginal cost).

*   \[AverageCost=\dfrac{S_T}{Q}\]
*   \[MarginalCost=\dfrac{\delta S_T}{\delta Q}\]

where \(S_T\) is the total cost, and \(Q\) is the flow.

### BPR Link Performance Function

Suppose we are considering a highway network. For each link there is a function stating the relationship between resistance and volume of traffic. The Bureau of Public Roads (BPR) developed a link (arc) congestion (or volume-delay, or link performance) function, which we will term _Sa(Qa)_

\[S_a(Q_a)=t_a(1+0.15\dfrac ({Q_a}{c_a})^4)\]

_ta = free-flow travel time on link a per unit of time_

_Qa = flow (or volume) of traffic on link a per unit of time (somewhat more accurately: flow attempting to use link_ a_)_

_ca = capacity of link a per unit of time_

_Sa(Qa)_ is the average travel time for a vehicle on link _a_

There are other congestion functions. The CATS has long used a function different from that used by the BPR, but there seems to be little difference between results when the CATS and BPR functions are compared.

## Can Flow Exceed Capacity?

On a link, the capacity is thought of as “outflow.” Demand is inflow.

If inflow > outflow for a period of time, there is queueing (and delay).

For Example, for a 1 hour period, if 2100 cars arrive and 2000 depart, 100 are still there. The link performance function tries to represent that phenomenon in a simple way.

## Wardrop's Principles of Equilibrium

### User Equilibrium

Each user acts to minimize his/her own cost, subject to every other user doing the same. Travel times are equal on all used routes and lower than on any unused route.

### System optimal

Each user acts to minimize the total travel time on the system.

## Price of Anarchy

The reason we have congestion is that people are selfish. The cost of that selfishness (when people behave according to their own interest rather than society's) is the _price of anarchy_.

The ratio of system-wide travel time under User Equilibrium and System Optimal conditions.

Price of Anarchy = 1}" aria-hidden="true" src="wikimedia.org/api/rest_v1/me...d15c6e66395909">

For a two-link network with linear link performance functions (latency functions), Price of Anarchy is < 4/3.

Is this too much? Should something be done, or is 33% waste acceptable? [The loss may be larger/smaller in other cases, under different assumptions, etc.]

## Conservation of Flow

An important factor in road assignment is the conservation of flow. This means that the number of vehicles entering the intersection (link segment) equals the number of vehicles exiting the intersection for a given period of time (except for sources and sinks).

Similarly, the number of vehicles entering the back of the link equals the number exiting the front (over a long period of time).

## Auto assignment

### Long-standing techniques

The above examples are adequate for a problem of two links, however real networks are much more complicated. The problem of estimating how many users are on each route is long standing. Planners started looking hard at it as freeways and expressways (motorways) began to be developed. The freeway offered a superior level of service over the local street system and diverted traffic from the local system. At first, diversion was the technique. Ratios of travel time were used, tempered by considerations of costs, comfort, and level of service.

The Chicago Area Transportation Study (CATS) researchers developed diversion curves for freeways versus local streets. There was much work in California also, for California had early experiences with freeway planning. In addition to work of a diversion sort, the CATS attacked some technical problems that arise when one works with complex networks. One result was the Moore algorithm for finding shortest paths on networks.

The issue the diversion approach didn’t handle was the feedback from the quantity of traffic on links and routes. If a lot of vehicles try to use a facility, the facility becomes congested and travel time increases. Absent some way to consider feedback, early planning studies (actually, most in the period 1960-1975) ignored feedback. They used the Moore algorithm to determine shortest paths and assigned all traffic to shortest paths. That’s called all or nothing assignment because either all of the traffic from _i_ to _j_ moves along a route or it does not.

The all-or-nothing or shortest path assignment is not trivial from a technical-computational view. Each traffic zone is connected to _n - 1_ zones, so there are numerous paths to be considered. In addition, we are ultimately interested in traffic on links. A link may be a part of several paths, and traffic along paths has to be summed link by link.

An argument can be made favoring the all-or-nothing approach. It goes this way: The planning study is to support investments so that a good level of service is available on all links. Using the travel times associated with the planned level of service, calculations indicate how traffic will flow once improvements are in place. Knowing the quantities of traffic on links, the capacity to be supplied to meet the desired level of service can be calculated.

### Heuristic procedures

To take account of the affect of traffic loading on travel times and traffic equilibria, several heuristic calculation procedures were developed. One heuristic proceeds incrementally. The traffic to be assigned is divided into parts (usually 4). Assign the first part of the traffic. Compute new travel times and assign the next part of the traffic. The last step is repeated until all the traffic is assigned. The CATS used a variation on this; it assigned row by row in the O-D table.

The heuristic included in the FHWA collection of computer programs proceeds another way.

*   Step 0: Start by loading all traffic using an all or nothing procedure.
*   Step 1: Compute the resulting travel times and reassign traffic.
*   Step 2: Now, begin to reassign using weights. Compute the weighted travel times in the previous two loadings and use those for the next assignment. The latest iteration gets a weight of 0.25 and the previous gets a weight of 0.75.
*   Step 3. Continue.

These procedures seem to work “pretty well,” but they are not exact.

### Frank-Wolfe algorithm

Dafermos (1968) applied the Frank-Wolfe algorithm (1956, Florian 1976), which can be used to deal with the traffic equilibrium problem.

### Equilibrium Assignment

To assign traffic to paths and links we have to have rules, and there are the well-known Wardrop equilibrium (1952) conditions. The essence of these is that travelers will strive to find the shortest (least resistance) path from origin to destination, and network equilibrium occurs when no traveler can decrease travel effort by shifting to a new path. These are termed user optimal conditions, for no user will gain from changing travel paths once the system is in equilibrium.

The user optimum equilibrium can be found by solving the following nonlinear programming problem

\[min \displaystyle \sum_{a} \displaystyle\int\limits_{0}^{v_a}S_a(Q_a)\, dx\]

subject to:

\[Q_a=\displaystyle\sum_{i}\displaystyle\sum_{j}\displaystyle\sum_{r}\alpha_{ij}^{ar}Q_{ij}^r\]

\[sum_{r}Q_{ij}^r=Q_{ij}\]

\[Q_a\ge 0, Q_{ij}^r\ge 0\]

where \(Q_{ij}^r\) is the number of vehicles on path _r_ from origin _i_ to destination _j_. So constraint (2) says that all travel must take place: _i = 1 ... n; j = 1 ... n_

\(\alpha_{ij}^{ar}\)= 1 if link _a_ is on path _r_ from _i_ to _j_ ; zero otherwise.

So constraint (1) sums traffic on each link. There is a constraint for each link on the network. Constraint (3) assures no negative traffic.

## Transit assignment

There are also methods that have been developed to assign passengers to transit vehicles. In an effort to increase the accuracy of transit assignment estimates, a number of assumptions are generally made. Examples of these include the following:

*   All transit trips are run on a set and predefined schedule that is known or readily available to the users.
*   There is a fixed capacity associated with the transit service (car/trolley/bus capacity).

## Examples

Example 1

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/c/c2/TwoRouteNetwork.png/500px-TwoRouteNetwork.png)

Figure 1: Two Route Network

Solve for the flows on Links _a_ and _b_ in the Simple Network of two parallel links just shown if the link performance function on link _a_:

\(S_a=5+2*Q_a\)

and the function on link _b_:

\(S_b=10+Q_b\)

where total flow between the origin and destination is 1000 trips.

**Solution**

Time (Cost) is equal on all used routes so \(S_a=S_b\)

And we have Conservation of flow so, \(Q_a+Q_b=Q_o=Q_d=1000\)

\(5+2*(1000-Q_b)=10+Q_b\)

\(1995=3Q_b\)

\(Q_b=665;Q_a=335\)

Example 2

An example from Eash, Janson, and Boyce (1979) will illustrate the solution to the nonlinear program problem. There are two links from node 1 to node 2, and there is a resistance function for each link (see Figure 1). Areas under the curves in Figure 2 correspond to the integration from 0 to _a_ in equation 1, they sum to 220,674. Note that the function for link _b_ is plotted in the reverse direction.

\(S_a=15(1+0.15(\dfrac{Q_a}{1000})^4)\)

\(S_b=20(1+0.15(\dfrac{Q_a}{3000})^4)\)

\(Q_a+Q_b=8000\)

Show graphically the equilibrium result.

**Solution**

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/1/1f/EquilibriumAssignment2.png/500px-EquilibriumAssignment2.png)

Figure 2- Graphical Solution to the Equilibrium Assignment Problem

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/a/a9/EquilibriumAssignment3.png/500px-EquilibriumAssignment3.png)

Figure 3- Allocation of Vehicles not Satisfying the Equilibrium Condition

At equilibrium there are 2,152 vehicles on link _a_ and 5,847 on link _b_. Travel time is the same on each route: about 63.

Figure 3 illustrates an allocation of vehicles that is not consistent with the equilibrium solution. The curves are unchanged, but with the new allocation of vehicles to routes the shaded area has to be included in the solution, so the Figure 3 solution is larger than the solution in Figure 2 by the area of the shaded area.

Example 3

Assume the traffic flow from Milwaukee to Chicago, is 15000 vehicles per hour. The flow is divided between two parallel facilities, a freeway and an arterial. Flow on the freeway is denoted \(Q_f\), and flow on the two-lane arterial is denoted \(Q_a\).

The travel time (in minutes) on the freeway (\(C_f\)) is given by:

\(C_f=10+Q_f/1500\)

\(C_a=15+Q_a/1000\)

Apply Wardrop's User Equilibrium Principle, and determine the flow and travel time on both routes.

**Solution**

The travel times are set equal to one another

\(C_f=C_a\)

\(10+Q_f/1500=15+Q_a/1000\)

The total traffic flow is equal to 15000

\(Q_f+Q_a=15000\)

\(Q_a=15000-Q_f\)

\(10+Q_f/1500=15+(15000-Q_f)/1000\)

Solve for \(Q_f\)

\(Q_f=60000/5=12000\)

\(Q_a=15000-Q_f=3000\)

\(C_f=18\)

\(C_a=18\)

Thought Questions

*   How can we get drivers to consider their marginal cost?
*   Alternatively: How can we get drivers to behave in a “System Optimal” way?

## Sample Problems

Problem 1

Given a flow of six (6) units from origin “o” to destination “r”. Flow on each route ab is designated with Qab in the Time Function. Apply Wardrop's Network Equilibrium Principle (Users Equalize Travel Times on all used routes)

**A.** What is the flow and travel time on each link? (complete the table below) for Network A

**Link Attributes**

| **Link** | **Link Performance Function** | **Flow** | **Time** |
| --- | --- | --- | --- |
| o-p | \(C_{op}=5*Q_{op}\) |  |  |
| p-r | \(C_{pr}=25+Q_{pr}\) |  |  |
| o-q | \(C_{oq}=20+2*Q_{oq}\) |  |  |
| q-r | \(C_{qr}=5*Q_{qr}\) |  |  |

**B.** What is the system optimal assignment?

**C.** What is the Price of Anarchy?

**Answer**

What is the flow and travel time on each link? Complete the table below for Network A:

**Link Attributes**

| **Link** | **Link Performance Function** | **Flow** | **Time** |
| --- | --- | --- | --- |
| o-p | \(C_{op}=5*Q_{op}\) |  |  |
| p-r | \(C_{pr}=25+Q_{pr}\) |  |  |
| o-q | \(C_{oq}=20+2*Q_{oq}\) |  |  |
| q-r | \(C_{qr}=5*Q_{qr}\) |  |  |

These four links are really 2 links O-P-R and O-Q-R, because by conservation of flow Qop = Qpr and Qoq = Qqr.

**Link Attributes**

| **Link** | **Link Performance Function** | **Flow** | **Time** |
| --- | --- | --- | --- |
| o-p-r | \(C_{opr}=25+6*Q_{opr}\) |  |  |
| o-q-r | \(C_{oqr}=20+7*Q_{oqr}\) |  |  |

By Wardrop's Equilibrium Principle, the travel time (cost) on each used route must be equal. Therefore \(C_{opr}=C_{oqr}\)

OR  
\(25+6*Q_{opr}=20+7*Q_{oqr}\)

\(5+6*Q_{opr}=7*Q_{oqr}\)

\(Q_{oqr}=5/7+6*Q_{opr}/7\)

By the conservation of flow principle

\(Q_{oqr}+Q_{opr}=6\)

\(Q_{opr}=6-Q_{oqr}\)

By substitution

\Q_{oqr}=5/7+6/7(6-Q_{oqr})=41/7-6*Q_{oqr}/7\)

\(13*Q_{oqr}=41\)

\(Q_{oqr}=41/13=3.15\)

\(Q_{opr}=2.84\)

Check

\(42.01=25+6(2.84)\)

\(42.05=20+7(3.15)\)

Check (within rounding error)

**Link Attributes**

| **Link** | **Link Performance Function** | **Flow** | **Time** |
| --- | --- | --- | --- |
| o-p-r | \(C_{opr}=25+6*Q_{opr}\) | 2.84 | 42.01 |
| o-q-r | \(C_{oqr}=20+7*Q_{oqr}\) | 3.15 | 42.01 |

or expanding back to the original table:

**Link Attributes**

| **Link** | **Link Performance Function** | **Flow** | **Time** |
| --- | --- | --- | --- |
| o-p | \(C_{op}=5*Q_{op}\) | 2.84 | 14.2 |
| p-r | \(C_{pr}=25+Q_{pr}\) | 2.84 | 27.84 |
| o-q | \(C_{oq}=20+2*Q_{oq}\) | 3.15 | 26.3 |
| q-r | \(C_{qr}=5*Q_{qr}\) | 3.15 | 15.75 |

User Equilibrium: Total Delay = 42.01 * 6 = 252.06

**Part B**

What is the system optimal assignment?

Conservation of Flow:

\(Q_{opr}+Q_{oqr}=6\)

\(TotalDelay=Q_{opr}(25+6*Q_{oqr})+Q_{oqr}(20+7*Q_{oqr})\)

\(25Q_{opr}+6Q_{opr}^2+(6_Q_{opr})(20+7(6-Q_{opr}))\)

\(25Q_{opr}+6Q_{opr}^2+(6_Q_{opr})(62-7Q_{opr}))\)

\(25Q_{opr}+6Q_{opr}^2+372-62Q_{opr}-42Q_{opr}+7Q_{opr}^2\)

\(13Q_{opr}^2-79Q_{opr}+372\)

Analytic Solution requires minimizing total delay

\(\deltaC/\deltaQ=26Q_{opr}-79=0\)

\(Q_{opr}=79/26-3.04\)

\(Q_{oqr}=6-Q_{opr}=2.96\)

And we can compute the SO travel times on each path

\(C_{opr,SO}=25+6*3.04=43.24\)

\(C_{opr,SO}=20+7*2.96=40.72\)

Note that unlike the UE solution, \(C_{opr,SO}\g C_{oqr,SO}\)

Total Delay = 3.04(25+ 6*3.04) + 2.96(20+7*2.96) = 131.45+120.53= 251.98

Note: one could also use software such as a "Solver" algorithm to find this solution.

**Part C**

What is the Price of Anarchy?

User Equilibrium: Total Delay =252.06 System Optimal: Total Delay = 251.98

Price of Anarchy = 252.06/251.98 = 1.0003 < 4/3

Problem 2

The Marcytown - Rivertown corridor was served by 3 bridges, according to the attached map. The bridge over the River on the route directly connecting Marcytown and Citytown collapsed, leaving two alternatives, via Donkeytown and a direct. Assume the travel time functions Cij in minutes, Qij in vehicles/hour, on the five links routes are as given.

Marcytown - Rivertown Cmr = 5 + Qmr/1000

Marcytown - Citytown (prior to collapse) Cmc = 5 + Qmc/1000

Marcytown - Citytown (after collapse) Cmr = ∞

Citytown - Rivertown Ccr = 1 + Qcr/500

Marcytown - Donkeytown Cmd = 7 + Qmd/500

Donkeytown - Rivertown Cdr = 9 + Qdr/1000

Also assume there are 10000 vehicles per hour that want to make the trip. If travelers behave according to Wardrops user equilibrium principle.

**Answer**

A) Prior to the collapse, how many vehicles used each route?

Route A (Marcytown-Rivertown) = Ca = 5 + Qa/1000

Route B (Marcytown-Citytown-Rivertown) = Cb = 5 + Qb/1000 + 1 + Qb/500 = 6 + 3Qb/1000

Route C (Marcytown-Donkeytown-Rivertown)= Cc = 7 + Qc/500 + 9 + Qc/1000 = 16 + 3Qc/1000

At equilibrium the travel time on all three used routes will be the same: Ca = Cb = Cc

We also know that Qa + Qb + Qc = 10000

Solving the above set of equations will provide the following results:

Qa = 8467;Qb = 2267;Qc = −867

We know that flow cannot be negative. By looking at the travel time equations we can see a pattern.

Even with a flow of 0 vehicles the travel time on route C(16 minutes) is higher than A or B. This indicates that vehicles will choose route A or B and we can ignore Route C.

Solving the following equations:

Route A (Marcytown-Rivertown) = Ca = 5 + Qa /1000

Route B (Marcytown-Citytown-Rivertown) = Cb = 6 + 3Qb /1000

Ca = Cb

Qa + Qb = 10000

We can the following values:

Qa = 7750; Qb = 2250; Qc = 0

B) After the collapse, how many vehicles used each route?

We now have only two routes, route A and C since Route B is no longer possible. We could solve the following equations:

Route A (Marcytown-Rivertown) = Ca = 5 + Qa /1000

Route C (Marcytown- Donkeytown-Rivertown) = Cc = 16 + 3Qc /1000

Ca = Cc

Qa+ Qc= 10000

But we know from above table that Route C is going to be more expensive in terms of travel time even with zero vehicles using that route. We can therefore assume that Route A is the only option and allocate all the 10,000 vehicles to Route A.

If we actually solve the problem using the above set of equations, you will get the following results:

Qa = 10250; Qc = -250

which again indicates that route C is not an option since flow cannot be negative.

C) After the collapse, public officials want to reduce inefficiencies in the system, how many vehicles would have to be shifted between routes? What is the “price of anarchy” in this case?

User Equilibrium

TotalDelayUE =(15)(10,000)=150,000

System Optimal

TotalDelaySO =(Qa)(5+Qa/1000)+(Qc)(16+3Qc/1000)

Using Qa + Qc = 10,000

TotalDelaySO =(Qa2)/250−71Qa+460000

Minimize total delay ∂((Qa2)/250 − 71Qa + 460000)/∂Qa = 0

Qa/125−7 → Qa = 8875 Qc = 1125 Ca = 13,875 Cc = 19,375

TotalDelaySO =144938

Price of Anarchy = 150,000/144,938 = 1.035

## Variables

*   \(C_T\) - total cost
*   \(C_k\) - travel cost on link \(k\)
*   \(Q_k\) - flow (volume) on link \(k\)

## Abbreviations

*   VDF - Volume Delay Function
*   LPF - Link Performance Function
*   BPR - Bureau of Public Roads
*   UE - User Equilbrium
*   SO - System Optimal
*   DTA - Dynamic Traffic Assignment
*   DUE - Deterministic User Equilibrium
*   SUE - Stochastic User Equilibrium
*   AC - Average Cost
*   MC - Marginal Cost

## Key Terms

*   Route assignment, route choice, auto assignment
*   Volume-delay function, link performance function
*   User equilibrium
*   System optimal
*   Conservation of flow
*   Average cost
*   Marginal cost

## External Exercises

Use the ADAM software at the [STREET website](http://street.umn.edu/) and try Assignment #3 to learn how changes in network characteristics impact route choice.

## Additional Questions

Homework

1. If trip distribution depends on travel times, and travel times depend on the trip table (resulting from trip distribution) that is assigned to the road network, how do we solve this problem (conceptually)?

2. Do drivers behave in a system optimal or a user optimal way? How can you get them to move from one to the other.

3. Identify a mechanism that can ensure the system optimal outcome is achieved in route assignment, rather than the user equilibrium. Why would we want such an outcome? What are the drawbacks to the mechanism you identified?

4. Assume the flow from Dakotopolis to New Fargo, is 5300 vehicles per hour. The flow is divided between two parallel facilities, a freeway and an arterial. Flow on the freeway is denoted \(Q_f\), and flow on the two-lane arterial is denoted \(Q_r\). The travel time on the freeway \(C_f\) is given by:

\(C_f=5+Q_f/1000\)

The travel time on the arterial (Cr) is given by

\(C_r=7+Q_r/500\)

(a) Apply Wardrop's User Equilibrium Principle, and determine the flow and travel time on both routes from Dakotopolis to New Fargo.

(b) Solve for the System Optimal Solution and determine the flow and travel time on both routes.

5. Given a flow of 10,000 vehicles from origin to destination traveling on three parallel routes. Flow on each route A, B, or C is designated with \(Q_a\), \(Q_b\), \(Q_c\) in the Time Function Respectively. Apply Wardrop's Network Equilibrium Principle (Users Equalize Travel Times on all used routes), and determine the flow on each route.

\(T_A=500+20Q_A\)

\(T_B=1000+10Q_B\)

\(T_C=2000+30Q_C\)

Additional Questions

1.  How does average cost differ from marginal cost?
2.  How do System Optimal and User Equilibrium travel time differ?
3.  Why do we want people to behave in an SO way?
4.  How can you get people to behave in an SO way?
5.  Who was John Glen Wardrop?
6.  What are Wardrop’s Two Principles?
7.  What does conservation of flow require in route assignment?
8.  Can Variable Message Signs be used to encourage System Optimal behavior?
9.  What is freeflow travel time?
10.  If a problem has more than two routes, where does the extra equation come from?
11.  How can you determine if a route is unused?
12.  What is the difference between capacity and flow
13.  Draw a typical volume-delay function for a deterministic, static user equilibrium assignment.
14.  Can Q be negative?
15.  What is route assignment?
16.  Is it important that the output travel times from route choice be consistent with the input travel times for destination choice and mode choice? Why?

## Videos
