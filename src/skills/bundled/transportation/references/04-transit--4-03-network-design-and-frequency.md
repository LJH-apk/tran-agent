# 4.3: Network Design and Frequency

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/04%3A_Transit/4.03%3A_Network_Design_and_Frequency

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

In this unit on service planning, the strategic decisions of **network and route design**, stop layout, and **frequency determination** are described. In the next unit, the tactical decisions associated with creating a service schedule (timetabling), creating a schedule for vehicles to operate the service (vehicle scheduling), and creating work shifts for operators (crew scheduling) are presented.

## Overview

The process of planning and designing public transit service is called “service planning”. There are a number of activities commonly associated with service planning:

1.  Network design
2.  Route design and stop layout
3.  Frequency determination
4.  Timetabling
5.  Vehicle scheduling
6.  Crew scheduling

These are ordered roughly in terms of a general sequence in time, as well as of a dependence upon higher-level activities. The general design of a transit network is the highest level activity, undertaken only rarely or when major new systems (e.g., rail or express bus) are introduced. The network design then feeds an element of route design and stop layout, in which the more specific physical facilities for the routes and stops or stations are implemented. Once routes are in place, the frequency of service may be determined, and a timetable for vehicle trips (the service) along the route can be constructed. Once the timetable is created, schedules for vehicles on the route and throughout the network (i.e., the vehicle cycle for each vehicle in the fleet) can be created. Finally, work shifts for operators can be generated (a crew schedule), and those operators are assigned to the work.

The first three activities, in network and route design and frequency determination, tend to be more strategic in nature, and may only be considered infrequently by transit planners. These decisions tend to be driven in part by political and economic considerations, and as such may require careful and strategic thinking on the part of transit planners. This unit discusses these strategic issues.

The activities of timetabling and vehicle and crew scheduling are considered more tactical decisions, as these decisions are made as often as the transit agency may consider reviewing or changing schedules. In many cases, these tactical activities are assisted by software tools that can generate high quality solutions in a short period of time, often with direct interaction with the planner. These topics are discussed in the next unit.

## Network and route design

### **Network design**

There are many different ways of structuring a set of transit routes into a network to provide transit service to a given area. These might include any combination of:

*   Radial services, focusing on collecting passengers from outlying areas and bringing them into a major trip generator (e.g., a downtown area, major employment center, or other significant destination);
*   Cross-town or grid-like routes, focusing on connecting passengers across the area, perhaps between radial services or among several smaller trip generators; and,
*   Direct connections, focusing on moving passengers between major trip generators (e.g., between downtown and a high-density residential area, or between a major employer and downtown).
*   Circulators, focusing on collecting and distributing passengers in smaller sub-areas.

Usually, transit networks are made up of some combination of these types of routes, allowing a satisfactory level of access to most of the region, with a high degree of direct service to major trip generators. Sometimes, this may involve a combination of modes. For example, in Boston, the rail systems are strongly radial, while the bus system provides cross-town and circulator services. The scale image below shows the strong radial nature of these lines, directed to downtown Boston.

![Boston Rail Lines](https://upload.wikimedia.org/Wikipedia/commons/thumb/e/e7/MBTA_Boston_subway_map.png/800px-MBTA_Boston_subway_map.png)

Other systems, particularly bus systems, can include both cross-town and radial services, allowing more coverage and greater direct access to destinations. One example is the bus network of New Jersey Transit in and around Newark, shown in the figure below. One can clearly see both radial routes as well as a strong grid-like structure on the west side of downtown.

![Newark Bus Lines](https://upload.wikimedia.org/Wikipedia/commons/thumb/d/d9/Newark_buses.svg/500px-Newark_buses.svg.png)

Regardless, in the US, the network structure is usually strongly influenced by political and economic realities, with strong citizen and political input as well as hard budget constraints. However, from a transportation perspective, the resulting network may be characterized in several important ways:

*   _Geographic coverage_, often influenced by political considerations as well as objectives to provide mobility for lower-mobility populations;
*   _Temporal coverage_, determining what time periods on weekdays and on weekends to offer service; and,
*   _Connectivity_ (direct vs. indirect service), with the desire to connect major trip generators with direct routes but perhaps allowing transfer trips to serve lower-demand areas.

These characteristics play a major role in estimating demand for the service. Specifically, the analyst may wish to experiment with a variety of network structures and routes, in order to estimate the level of demand that each network might support. Well-specified travel demand models should be able to account for geographic and temporal coverage, as well as trip connectivity, in forecasting transit usage.

As an important caveat, most transit agencies do not usually approach network design as if from scratch. Most agencies do have some existing route patterns, and associated infrastructure (stops, terminals, guideways, etc.) that may often constrain certain route structures or at least strongly favor maintaining some of the existing routes. As a result, most agencies consider new elements of the network (new routes and services) as a complement to existing services, with more modest adjustments to the existing route structures. However, where new modes of service may be introduced (e.g., rail systems in traditionally bus-oriented networks), more significant restructuring of service may be possible, perhaps extending service to new geographic areas, intensifying service in existing service areas, or supplementing the new mode by directing routes to connect to and from the new mode.

### **Route design**

In conjunction with network design, a planner must also consider specific routes and their purpose. The layout of individual routes usually involves some trade-offs in design, most notably:

*   _Stop density_. Stop density involves the trade-off of passenger access vs. route speed. Higher stop densities mean that passengers will not have to walk or travel far to get to a stop, allowing easier access to transit service. However, higher stop densities also mean that the vehicle may be stopping frequently, reducing the overall operating speed.
*   _Route length and circuitousness_. Route length involves the trade-off of direct service vs. service reliability. Longer routes allow passengers to get to more potential destinations, as the route provides direct service to a larger geographic area. But, longer routes may lead to poor schedule adherence, as service may be more prone to travel time variability and/or service disruptions.
*   _Trip generators_. The route can serve major trip generators or more minor trip generators, or some combination of these. Often, routes have termini that coincide with major trip generators, with higher passenger flows occurring between these major generators. However, there may also be a need to serve certain geographic areas with modest demand.

In many cases, some combination of routes can be built into the transit network that provides some balance in each of these areas. Common route designs include the following:

*   Line haul: high frequency and/or high capacity service on major travel corridors
*   Loops (one-way or two-way): coverage for lower-density areas or circulation in and among activity centers
*   Short turn routes: to complement a full route, additional service provided on a shorter segment (the “short turn”) of the route
*   Branching (or split) routes: branching toward the end of the route, with areas served by only some buses
*   Feeder routes: connect to/from line haul from/to lower density areas
*   Limited and express routes: only stop at major stops/stations to improve travel times, balance loads
*   Zonal service: only serve some sections in a major corridor

## Stop density and location

As noted above, stop density can affect both access and the overall speed of transit service. Given the time and distance necessary for vehicle acceleration and deceleration, a high density of stops will lead to much slower overall speeds, when the vehicles must stop at many or all of the stops. Yet, this provides much easier access for passengers, who must only travel a short distance to their nearest stop.

General guidelines suggest higher stop densities where land uses are likewise at higher density (downtown areas, major activity centers) and much lower where land uses are at much lower densities. But, this guidance may depend on a number of factors. If the probability of stopping is low, then increasing the stop density may come at only a modest cost, in terms of providing additional stop infrastructure. In addition, the lack of easy stop access may also serve as a deterrent to ridership, or may require other accommodations for access, such as large garages or lots for park-and-ride access.

A second area for design involves the suitable location for stops. As may be obvious, the best location for stops is as close to supportive land uses as possible. So, for major trip generators such as high-density work locations (office buildings, retail areas, etc.) and other locations, having a stop directly at or adjacent to the location is best. In many other instances, having stops near intersections may improve pedestrian access to land uses at the intersection or in nearby areas on any cross-street.

In bus operations, stops at intersections include “near-side” and “far-side” stops, referring to whether the stop occurs before or after the bus traverses through the intersection, respectively. Because of the potential conflicts with traffic flow at intersections, however, there are some who might advocate for locating stops away from intersections (“mid-block” locations). An excellent discussion of the advantages and disadvantages of near-side, far-side, and mid-block stops can be found in a recent TCRP Report. Many agencies have specific policies regarding near-side or far-side stops, but these are in general much preferred to mid-block stops.

## Frequency determination

There are a number of ways that planners may determine a reasonable frequency of service on a route. The most common methods are:

*   **Policy headways**. Many transit agencies will determine specific headways that meet policy goals, usually related to providing a minimum level of service along a route when demand on the route is low. This could include 30-minute or 60-minute headways, for example.
*   **Minimum headways**. As discussed in the unit on transit operations, bus and rail systems have minimum headways, based on capacity limitations. In cases when demand on a route is very high, these minimum headways can be used to assign the maximum frequencies on the route.
*   **Load management**. In many cases where policy headways or minimum headways do not apply, the typical way of determining frequencies is based on managing load at the _peak load point_ along the route. The peak load point is that point along the route that experiences the largest number of passengers per hour. Let _X_ be the highest allowable ratio of demand to supply (volume to capacity), with values between 0 and 1 (with 1 when volume = capacity). Then:

\[\dfrac{P}{f\cdot N_{car}\cdot C_{car}}\le X \text{ } or, f\ge \dfrac{P}{X\cdot N_{car}\cdot C_{car}}\]

with \(P=\) volume at peak load point (passengers/hr)

\(X=\) maximum allowable volume-to-capacity ratio, \(0\le X \le 1\)

\(N_{car}=\) number of cars in a train (=1 for buses)

\(C_{car}=\) number of passengers per car

For a bus route operated with 55-passenger buses, a demand of 360 passengers per hour past the peak load point, and an allowable load factor of X = 0.90, the frequency must be:

\(f \ge \dfrac{360 \text{ } passengers/hr}{0.90 \cdot 1 \cdot (55 \text{ } passengers/bus)}=7.27 \text{ } buses/hr\)

This would give the planner options for this route such as 7.5 buses/hr (8-min headways) or 8 buses/hr (7.5-min headways), or even higher frequencies.

These are the most common methods for determining frequencies.

From a more rigorous perspective, it can be shown that if one combines operating costs with passenger waiting costs, the “optimal” (cost-minimizing) frequency is given by:

\[f=\sqrt{\frac{VOT\cdot p}{2 \cdot C \cdot T}}\]

with: \(VOT=\) value of passenger waiting time ($ per passenger-hour)

\(p=\) total boardings per hour on the route, both directions (passengers per hour)

\(C=\) operating cost per hour per vehicle ($ per vehicle-hour)

\(T=\) total round trip travel time along the route (hours)\)

The important observation from this formula is that the frequency increases with the square root of the total passenger boardings. The square root balances the operating costs, which grow linearly with the frequency, with the passenger waiting time, which decreases inversely with the frequency.

With a value of waiting time of $15/hr, passenger boardings of 750 passengers per hour, operating costs of $80/vehicle-hour, and a round-trip travel time of 1.75 hours, we have:

\(f=\sqrt{\frac{($15/passenger-hr)\cdot (750 \text{ } passengers/hr)}{2 \cdot ($80/veh-hr) \cdot (1.75 \text{ } hr/veh)}}=6.34 \text{ } veh/hr\)

which could be rounded to 6 veh/hr (10 min headways) or to 6.67 veh/hr (9 min headways), assuming that the transit agency would prefer to have integer-valued headways.

## Vicious/Virtuous Cycles

When the elasticity of transit is appropriately high, Mohring’s Formula may result in what is known as a “vicious circle”. When service is reduced in order to reduce costs (or any other reason), if the elasticity is positive, then demand will also decrease, meaning fewer riders. If we apply Mohring’s formula for this number of riders, then we will again see demand drop with the frequency and thus fewer riders again. This cycle is known as a “vicious” circle. On the other hand, increasing frequency can increase demand and thus the number of riders. If we apply Mohring’s Formula to this new number, the frequency will again increase. This is what is known as a “virtuous cycle”.

Sample Problem 1:

A transit agency is considering changing the frequency on a popular route. Currently, the route serves 1175 passengers in the peak hour, operating at a frequency of 10 buses per hour.

Using Mohring's formula, what is the "optimal" frequency on this route? Use a cost per bus-hour of operation of $66, a value of time of $11 per hour, and a route round-trip time of 95 minutes.

If a comparable demand elasticity with respect to frequency is +0.37 for the peak hour, estimate the total number of passengers in the peak hour for this "optimal" frequency.

**Answer**

The optimal frequency is given as:

\(f=\sqrt{\frac{VOT\cdot p}{2 \cdot C \cdot T}}=\sqrt{\frac{$11 \cdot 1175 \text{ } passengers}{2 \cdot $66 \cdot 95min/60min/hr)}}=7.86 \text{ } buses/hr\)

which we might round up to 8 buses/hr.

At 8 buses/hr, the net change in the frequency is -20%, yielding a percentage change in ridership of (+0.37)*(-20%) = -7.4%, or (-7.4%)*(1175 passengers) = 87 passengers. The new ridership would then be 1088 passengers.

Sample Problem 2:

A transit agency is considering reducing service on a route in order to minimize costs. Currently, the route serves 1088 passengers in the peak hour, operating at a frequency of 8 buses per hour. The route currently serves 1113 passengers per peak hour, operating at 8 buses per hour. Using Mohring's formula, what is the "optimal" frequency on this route? The agency uses a cost per bus-hour of operation of $70, a value of time of $11 per hour, and a route round-trip time of 95 minutes. If the demand elasticity is 0.35 for the peak hour, estimate the total number of passengers in the peak hour for this optimal frequency.

**Answer**

The optimal frequency is given as:

\(f_{opt}=\sqrt{\frac{VOT\cdot p}{2 \cdot C \cdot T}}=\sqrt{\frac{(11)(1113)}{2(70)(\frac{95}{60})}}=7.43 \text{ } bus/hr\)

At 7.43 buses/hr, the change in the frequency is -0.257, giving a change in ridership of (+0.35)*(-24.2%) = -9.0%, or (-9.0%)*(1113 passengers) = -100 passengers. The new ridership would then be 1013 passengers. Using this new ridership, we can iterate the equation again to find a new optimal

frequency: \(f_{opt}=\sqrt{\frac{VOT\cdot p}{2 \cdot C \cdot T}}=\sqrt{\frac{(11)(1013)}{2(70)(\frac{95}{60})}}=7.10 \text{ } bus/hr\)

Which corresponds to a loss of ridership of 16.2 riders, which could again be iterated to find a new, lower frequency, further decreasing the ridership.

## Related books

Avishai Ceder (2007). Public Transit Planning and Operation: Theory, Modeling, and Practice. Oxford: Butterworth-Heinemann.

Vukan R. Vuchic (2005). Urban Transit: Operations, Planning, and Economics. Hoboken: John Wiley and Sons.
