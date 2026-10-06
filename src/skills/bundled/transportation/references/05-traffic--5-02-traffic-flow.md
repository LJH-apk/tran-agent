# 5.2: Traffic Flow

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/05%3A_Traffic/5.02%3A_Traffic_Flow

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

**Traffic Flow** is the study of the movement of individual drivers and vehicles between two points and the interactions they make with one another. Unfortunately, studying traffic flow is difficult because driver behavior cannot be predicted with one-hundred percent certainty. Fortunately, drivers tend to behave within a reasonably consistent range; thus, traffic streams tend to have some reasonable consistency and can be roughly represented mathematically. To better represent traffic flow, relationships have been established between the three main characteristics: (1) flow, (2) density, and (3) velocity. These relationships help in planning, design, and operations of roadway facilities.

## Traffic flow theory

### **Time-Space Diagram**

Traffic engineers represent the location of a specific vehicle at a certain time with a time-space diagram. This two-dimensional diagram shows the trajectory of a vehicle through time as it moves from a specific origin to a specific destination. Multiple vehicles can be represented on a diagram and, thus, certain characteristics, such as flow at a certain site for a certain time, can be determined.

![Road Space Requirements.png](https://upload.wikimedia.org/Wikipedia/commons/thumb/3/3c/Road_Space_Requirements.png/220px-Road_Space_Requirements.png)

### **Flow and density**

Flow (q) = the rate at which vehicles pass a fixed point (vehicles per hour) ,

\[ t_{measured}=Average \text{ } measured \text{ } time \text{ } headway\)

\[q=\frac{3600 N}{t_{measured}}

Density (Concentration) (k) = number of vehicles (N) over a stretch of roadway (L) (in units of vehicles per kilometer)

\[k=\frac{N}{L}\]

where:

*   \(N\) = number of vehicles occupying a highway segment of length {\displaystyle L}![L](https://wikimedia.org/api/rest_v1/media/math/render/svg/103168b86f781fe6e9a4a87b8ea1cebe0ad4ede8)
*   \(q\) = equivalent hourly flow
*   \(L\) = length of roadway
*   \(k\) = density

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/f/f0/TimeSpaceDiagram.svg/300px-TimeSpaceDiagram.svg.png)

Time-space diagram showing trajectories of vehicles over time and space

### **Speed**

Measuring speed of traffic is not as obvious as it may seem; we can average the measurement of the speeds of individual vehicles over time or over space, and each produces slightly different results.

#### **Time mean speed**

Time mean speed (\(\bar t\)) = arithmetic mean of speeds of vehicles passing a point

\[\bar v_t=\frac{1}{N} \sum_{n=1}^Nv_n\]

#### **Space mean speed**

Space mean speed (\(\bar {v_s}\)) is defined as the harmonic mean of speeds passing a point during a period of time. It also equals the average speeds over a length of roadway.

\[\bar v_t=\dfrac{N}{\sum_{n=1}^N \frac{1}{v_n}}\)

#### **Relating time and space mean speed**

Note that the time mean speed is average speed past a point as distinct from space mean speed which is average speed along a length.

The two speeds are related as

\[\bar v_t=\bar v_s + \frac{\sigma_s^2}{\bar v_s}\]

The time mean speed higher than the space mean speed, but the differences vary with the amount of variability within the speed of vehices. At high speeds (free flow), differences are minor, whereas in congested times, they might differ a factor 2.

### **Headway**

The following definitions give what is referred to as the _brutto_ gap (Asela) (Italian for _gross_), in contrast to _netto_ gaps (Italian for _net_). _Netto_ gaps give the distance or time between the rear bumper of a vehicle and the front bumper of the next.

#### **Time headway**

Time headway (\(h_t\)) = difference between the time when the front of a vehicle arrives at a point on the highway and the time the front of the next vehicle arrives at the same point (in seconds)

Average Time Headway (\(\bar h_t\)) = Average Travel Time per Unit Distance * Average Space Headway

\[\bar h_t=\bar t *\bar h_s\]

#### **Space headway**

Space headway (\(h_s\)) = difference in position between the front of a vehicle and the front of the next vehicle (in meters)

Average Space Headway (\(\bar h_s\))= Space Mean Speed * Average Time Headway

\[\bar h_s = \bar v_s * \bar h_t\]

Note that density and space headway are related:

\[k=\frac{1}{\bar{h_s}\]

## Fundamental Diagram of Traffic Flow

The variables of flow, density, and space mean speed are related definitionally as:

\[q=k\bar v_s\]

### **Traditional Model (Parabolic)**

Properties of the traditional fundamental diagram.

*   When density on the highway is zero, the flow is also zero because there are no vehicles on the highway
*   As density increases, flow increases
*   When the density reaches a maximum jam density (\(k_j\)), flow must be zero because vehicles will line up end to end
*   Flow will also increase to a maximum value (\(q_m\)), increases in density beyond that point result in reductions of flow.
*   Speed is space mean speed.
*   At density = 0, speed is freeflow (\(v_f\)). The upper half of the flow curve is uncongested, the lower half is congested.
*   The slope of the flow density curve gives speed. Rise/Run = Flow/Density = Vehicles per hour/ Vehicles per km = km / hour

![](https://upload.wikimedia.org/Wikipedia/commons/b/b8/TraditionalTrafficFlowModel.png)

Traditional fundamental diagram of traffic

### **Observation (Triangular or Truncated Triangular)**

Actual traffic data is often much noisier than idealized models suggest. However, what we tend to see is that as density rises, speed is unchanged to a point (capacity) and then begins to drop if it is affected by downstream traffic (queue spillbacks). For a single link, the relationship between flow and density is thus more triangular than parabolic. When we aggregate multiple links together (e.g. a network), we see a more parabolic shape.

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/1/1a/TriangularTrafficFlowModel.png/300px-TriangularTrafficFlowModel.png)

Flow varying by density on detector 688 (I-94 at 49th/53rd Avenue in Minneapolis) on November 1st 2000

## Microscopic and Macroscopic Models

Models describing traffic flow can be classed into two categories: microscopic and macroscopic. Ideally, macroscopic models are aggregates of the behavior seen in microscopic models.

### **Microscopic Models**

Microscopic models predict the following behavior of cars (their change in speed and position) as a function of the behavior of the leading vehicle.

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/c/cd/TrafficPhases.png/300px-TrafficPhases.png)  
Traffic phases in a the microscopic fundamental diagram (truncated triangular)

### **Macroscopic Models**

Macroscopic traffic flow theory relates traffic flow, running speed, and density. Analogizing traffic to a stream, it has principally been developed for limited access roadways (Leutzbach 1988). The fundamental relationship “q=kv” (flow (q) equals density (k) multiplied by speed (v)) is illustrated by the fundamental diagram. Many empirical studies have quantified the component bivariate relationships (q vs. v, q vs. k, k vs. v), refining parameter estimates and functional forms (Gerlough and Huber 1975, Pensaud and Hurdle 1991; Ross 1991; Hall, Hurdle and Banks 1992; Banks 1992; Gilchrist and Hall 1992; Disbro and Frame 1992).

The most widely used model is the Greenshields model, which posited that the relationships between speed and density is linear. These were most appropriate before the advent of high-powered computers enabled the use of microscopic models. Macroscopic properties like flow and density are the product of individual (microscopic) decisions. Yet those microscopic decision-makers are affected by the environment around them, i.e. the macroscopic properties of traffic.

While traffic flow theorists represent traffic as if it were a fluid, queueing analysis essentially treats traffic as a set of discrete particles. These two representations are not-necessarily inconsistent. The figures to the right show the same 4 phases in the fundamental diagram and the queueing input-output diagram. This is discussed in more detail in the next section.

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/c/c5/QueueingIOPhases.png/300px-QueueingIOPhases.png)

Traffic phases in the queueing cumulative input-output (Newell) diagram

## Examples

Example 1: Time-Mean and Space-Mean Speeds

Given five observed velocities (60 km/hr, 35 km/hr, 45 km/hr, 20 km/hr, and 50 km/hr), what is the time-mean speed and space-mean speed?

**Solution**

Time-Mean Speed:

\(\bar v_t=\dfrac{1}{5}(60+35+45+20+50)=42\)

Space-Mean Speed:

\(\bar v_s=\frac{N}{\sum_{n=1}^N\dfrac{1}{v_n}=\frac{5}{\dfrac{1}{60}+\dfrac{1}{35}+\dfrac{1}{45}+\dfrac{1}{20}+\dfrac{1}{50}}=36.37\)

The time-mean speed is 42 km/hr and the space-mean speed is 36.37 km/hr.

Example 2: Computing Traffic Flow Characteristics

Given that 40 vehicles pass a given point in 1 minute and traverse a length of 1 kilometer, what is the flow, density, and time headway?

**Solution**

Compute flow and density:

\(q=\frac{3600(40)}{60s}=2400 \text{ } veh/hr\)

\(k=\frac{40}{1}=40 \text{ } veh/km\)

Find space-mean speed:

\(q=k \bar v_s=2400 =40 \bar v_s\)

\(\bar v_s=60 km/hr\)

Compute space headway:

\(k=40=\frac{1}{\bar h_s}\)

\(\bar h_s=0.025 km =25m\)

Compute time headway:

\(\bar h_s = \bar v_s* \bar h_t=25=(60*1000/3600)\bar h_t\)

\(\bar h_t=1.5s\)

The time headway is 1.5 seconds.

EXAMPLE 3: The spot speeds (expressed in km/hr) observed at a road section are 66, 62, 45, 79, 32, 51,56,60,53 and 49. The median speed (expressed in km/hr) is .

Solution: Median speed is the speed at the middle value in series of spot speeds that are arranged in ascending order. 50% of speed values will be greater than the median 50% will be less than the median. Ascending order of spot speed studies are 32,39,45,51,53,56,60,62,66,79

Median speed = (53 +56 )/2=54.5 km/hr.

## Thought Question

**Problem**

Microscopic traffic flow simulates the behaviors of individual vehicles while macroscopic traffic flow simulates the behaviors of the traffic stream overall. Conceptually, it would seem that microscopic traffic flow would be more accurate, as it would be based on driver behavior than simply flow characteristics. Assuming microscopic simulation could be calibrated to truly account for driver behaviors, what is the primary drawback to simulating a large network?

**Solution**

Computer power. To simulate a very large network with microscopic simulation, the number of vehicles that needed to be assessed is very large, requiring a lot of computer memory. Current computers have issues doing very large microscopic networks in a timely fashion, but perhaps future advances will do away with this issue.

Sample Problem

Four vehicles are traveling at constant speeds between sections X and Y (280 meters apart) with their positions and speeds observed at an instant in time. An observer at point X observes the four vehicles passing point X during a period of 15 seconds. The speeds of the vehicles are measured as 88, 80, 90, and 72 km/hr respectively. Calculate the flow, density, time mean speed, and space mean speed of the vehicles.

**Answer**

**Flow**

\(q=N(\dfrac{3600}{t_{measured}})=4(\dfrac{3600}{15})=960 \text{ } veh/hr\)

**Density**

\(k=\frac{N}{L}=\frac{4*1000}{280}=14.2 \text{ } veh/km

**Time Mean Speed**

\(\bar v_t=\frac{1}{N} \sum_{n=1}^N v_n=\frac{1}{4}(72+90+80+88)=82.5 \text{ } km/hr\)

**Space Mean Speed**

\(\bar v_s=\frac{N}{\sum_{n=1}^N \frac{1}{v_i}}=\frac{4}{\frac{1}{72} \frac{1}{90} \frac{1}{80} \frac{1}{88}}=81.86

\(t_i=L/v_i\)

\(t_A=L/v_A=0.28/88=0.00318hr\)

\(t_B=L/v_B=0.28/80=0.00350hr\)

\(t_C=L/v_C=0.28/90=0.00311hr\)

\(t_D=L/v_D=0.28/72=0.00389hr\)

\(\bar v_s=\frac{NL}{\sum_{n=1}^N i_n}=\frac{4*0.28}{(0.00318+0.00350+0.00311+0.00389)}=81.87 \text{ } km/hr\)

## Variables

*   \(d_n\) = distance of nth vehicle
*   \(t_n\) = travel time of nth vehicle
*   \(v_n\) = speed (velocity) of nth vehicle
*   \(h_{t,nm}\) = time headway between vehicles \(n\) and \(m\)
*   \(h_{s,nm}\) = space (distance) headway between vehicles \(n\) and \(m\)
*   \(q\) = flow past a fixed point (vehicles per hour)
*   \(N\) = number of vehicles
*   \(t_{measured}\) = time over which measurement takes place (number of seconds)
*   \(t\) = travel time
*   \(k\) = density (vehicles per km)
*   \(L\) = length of roadway section (km)
*   \(v_t\) = time mean speed
*   \(v_s\) = space mean speed
*   \(v_f\) = freeflow (uncongested speed)
*   \(k_j\) = jam density
*   \(q_m\) = maximum flow

## Key Terms

*   Time-space diagram
*   Flow, speed, density
*   Headway (space and time)
*   Space mean speed, time mean speed
*   Microscopic, Macroscopic

## Supplementary Reading

*   [Revised Monograph on Traffic Flow Theory](http://www.fhwa.dot.gov/publications/research/operations/tft/)

## Videos
