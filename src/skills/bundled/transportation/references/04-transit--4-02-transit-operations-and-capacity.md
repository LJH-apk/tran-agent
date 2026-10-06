# 4.2: Transit Operations and Capacity

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/04%3A_Transit/4.02%3A_Transit_Operations_and_Capacity

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

From the supply side, most public transit systems operate service that has some common characteristics. The most salient of these are the _vehicle cycle_ and the notion of _capacity_. Later, we address some operating characteristics of specific modes, notably separating rail modes from fixed-route bus service.

## Concepts in operations and capacity

### **The vehicle cycle**

It is useful to refer to the operation of a vehicle (van, bus, or train) through the course of a day of transit service; this is commonly referred to as the vehicle “cycle” because it tends to repeat itself from one day to the next. This cycle is illustrated in the figure below.

![Caption The Vehicle Cycle](https://upload.wikimedia.org/Wikipedia/commons/thumb/b/bd/Vehicle_cycle.svg/600px-Vehicle_cycle.svg.png)

*   The cycle begins when a vehicle is started from a depot (a garage, yard, or other location). The depot serves as a common location where vehicles are stored or maintained.
*   The vehicle is positioned from the depot to a location where it can begin service. This is commonly at the terminus of a route. Such a movement, from the depot to this location, is called a “pull-out”.
*   The vehicle travels from its starting location to another route terminus, stopping at stations or stops along the route to allow passengers to board and to alight. We will call such movement of the vehicle a “trip” (or, vehicle trip).
*   While moving along the route, the vehicle incurs both running time and dwell time. Running time is the time spent traveling between stops or stations, and dwell time is the time spent stopped at locations to allow passengers to board and alight.
*   While moving along the route, the vehicle is engaged in “revenue service”, so that time and miles spent along the route while providing passenger service are called “revenue hours” and “revenue miles”.
*   When it reaches a route terminus, the vehicle is re-positioned for further service. If it returns along the same route or another route starting from the same terminus, there may be a short time for recovery before reentering revenue service, called a “layover”.
*   A vehicle may also be moved between termini to start service on a different route, resulting in what is called a “deadhead” trip, not in revenue service, between the two termini.
*   The vehicle continues in revenue service on the fixed routes, repeating the process of stopping at stations or stops to allow passengers to board and alight.
*   When the vehicle has reached its final terminus for its set of trips, it returns to the depot. Such movement from a route terminus to the depot is called a “pull-in”.

This vehicle cycle is common to fixed-route service, particularly for bus and rail transit systems. In the case of demand-responsive service, there are no formal “termini” for a route; rather, the “termini” represent specific locations where persons are picked up or dropped off. At any point, if the vehicle becomes empty, then it may dead-head to the next pick-up location, or it may return to the depot.

### **Capacity**

Capacity in transit operations is measured as the maximum number of passengers that can be carried past a single point on a fixed route, in a given period of time. The most common measure of capacity is in terms of passengers per hour.

In transit operations, we define the time between vehicles past a given point as the _headway_ (or time headway), usually in minutes. The inverse of the headway is called the _frequency_, essentially capturing the number of vehicles per unit time past a certain point on a route, usually measured in vehicles per hour.

\[Frequency \text{ } (veh/hr) \text{ } f=\dfrac{60\text { } min/hr}{h}\]

\[Headway \text{ } (in \text{ } min) \text{ } h=\dfrac{60 \text{ } min/hr}{f}\]

As an example, a route with a 10-minute headway has a frequency of 6 vehicles per hour.

With this in mind, the capacity of a transit route is given as the product of the frequency and the maximum number of persons per vehicle:

Capacity (passengers/hr) on the route = \(C_{route}=f\cdotN_{car}\cdotC_{car}\)

where: \(f=\) frequency on the route (veh/hr)

\(N_{car}=\) number or cars per train (=1 for bus)

\(C_{car}=\) maximum number of persons per car (or bus)

As examples, a bus route with a frequency of 6 buses/hr and a maximum of 55 persons on each bus has a capacity of 330 passengers per hour. A rail line with a frequency of 15 trains/hr (4 min headways) with 6 cars per train and a maximum of 150 persons per car has a capacity of 13,500 passengers per hour.

Capacity is a very important concept in comparing different transit modes.

## Bus operations

Bus operations generally follow the traditional vehicle cycle presented above. Operation of each bus is under control of an operator (the driver). That operator is responsible for operating the bus safely along the route, as well as managing passenger boarding and alighting at stops along the route. They may also have responsibility for managing fare payment on board, and for ensuring passenger safety and security.

One characteristic that is fairly common in bus operations is the notion of “hail-stop” operations. In practice, this means that a bus needs to stop at a stop or station only if a passenger wishes to board or alight; otherwise, the bus may simply bypass the stop at running speed. In this concept, passengers wishing to board or to alight must signal these intentions to the operator, so that he/she knows whether it is necessary to stop at the next stop or station.

In some cases, the bus may stop at all stops; this is more common where the bus has only a limited number of stops and/or high volumes of passengers boarding and alighting at these stops.

Capacity on a bus route is the product of the route’s frequency and the number of passengers on each bus. To get higher capacity, one may increase the frequency of buses or increase the passenger-carrying capacity of each bus, or both.

*   In the case of frequency, the primary limitation on very high-frequency service (e.g., higher than one bus per minute) is the limitation on the number of berths for buses to stop at each station. Buses must stop for dwell time to allow passenger boarding and alighting at a stop, and the number of buses that can access the stop during that time depends on how many berths there are. If the average dwell time at a stop is 20 seconds, and the bus stop has only one berth, then the highest frequency of buses serving that stop would be 3 buses in a minute. Of course, reducing dwell times (e.g., boarding and alighting at multiple doors, eliminating paying the fare while boarding) allows for higher capacities in such cases. Also, having multiple berths, especially on route segments where many routes overlap, can also allow for higher frequency service.
*   In the case of bus capacity, agencies may move away from a standard, single-level, 40-foot bus to higher-capacity buses, such as double-decked buses or articulated buses. These bus types may have significantly higher passenger loads than a standard bus.

Finally, when buses operate in mixed traffic, it is well known that maintaining a schedule can be a challenge. Signal timing, traffic congestion, traffic incidents, and other factors can disrupt the expected running times; the accommodation of passengers with bicycles or wheelchairs may similarly result in longer dwell times at stops. As a result, poor schedule adherence is a common challenge to service reliability. In many cases, transit agencies will allow for some “slack” in the normal schedule, including extra time in the schedule at various points along a route, and in the layover time at terminals, to allow any buses running behind schedule to catch up again.

It is well-known that higher-frequency bus service is prone to “bunching”: a preceding bus may fall behind schedule, and the subsequent bus runs ahead of schedule, until they form a pair of buses operating as one. To combat poor schedule adherence and bus bunching, bus operations may also include elements of real-time control. Such measures can include: (1) holding buses at stops to allow more equal headways; (2) encouraging drivers to speed up or slow down between stops to maintain the schedule; (3) in more extreme cases, allowing buses to skip stops or to “short-turn” (i.e., reverse direction on a route at a location other than the terminus) to improve schedule adherence or provide more capacity when the passenger demand surges on a certain segment of a route.

## Rail operations

Rail vehicles (trains) also follow the vehicle cycle shown earlier. Usually, however, the trains stop at every station on the route. Also, in many cases, fare collection is performed in the station, allowing all doors of the train to be used for passenger boarding and alighting.

Rail systems can run in a grade-separated environment with its own guideway and no conflicting traffic, in a mixed traffic environment with other road vehicles, or in some combination of these two environments. As may be obvious, having a grade-separated environment allows trains to operate with few limitations, allowing higher speeds and much more reliable service (with good schedule adherence and minimal travel time variability). Once rail becomes subject to mixed traffic, speeds can drop and service often becomes less reliable.

Rail systems most commonly operate on electric power being transmitted to the vehicle through either what is called a “third rail”, located just off the ground near the existing rails, or through an overhead catenary.

The operation of rail systems is usually controlled by signal systems which indicate appropriate operating conditions to the train operator, either through signals on the wayside or through signals in the train cab. Traditionally, these signal systems are arranged according to fixed segments of track called “blocks”. These blocks are defined in such a way as to control for safe operation of the train system: no two trains can be located in a single block at the same time. This may be left to the control of the train operator, or an automated or semi-automated system can be employed to enforce these block restrictions.

In a “fixed-block” signal system, the signals have indications with various colors and patterns that prescribe the proper train operation. In the system illustrated below, a red signal is used to indicate stop, a yellow signal to indicate to reduce speed for a red signal ahead, and a green signal to indicate clear to proceed. The most common logic dictating signal the signal indication is based on the occupancy of the block(s) ahead of the signal. In the case below, red indicates the subsequent block is occupied; yellow that the subsequent signal is red; and green that the two subsequent blocks are not occupied. As trains move from block to block (from time _t_ to _t_+1 to _t_+2), the indications in the signal system change accordingly.

![Caption Illustration of Rail Signaling](https://upload.wikimedia.org/Wikipedia/commons/thumb/e/e1/Rail_signal.svg/600px-Rail_signal.svg.png)

The capacity of a rail line is based on the frequency of trains, the number of cars per train, and the maximum number of persons per car.

*   The frequency is usually constrained at the upper end by the amount of time a train occupies a block. Since two trains cannot occupy the same block, the longest time to traverse a block becomes the minimum headway between trains; the highest frequency is then the inverse of the minimum headway. To increase frequency (and hence increase capacity), one must reduce the block length or determine other ways to control vehicle operation.
*   Usually, the number of cars per train is limited by the geometry of the station platforms, or of other route geometric features (e.g., the distance between two cross-streets in mixed operation). When the train stops at a station, all cars allow passengers to board and alight, meaning that all cars must fit on the platform. So, adding cars to trains is only possible if all stations on the line can allow the cars to fit on the platform.
*   Car capacity depends in part on the length of the car and the arrangement of seating and standing space within the car. Greater standing space means more capacity, although passengers will be less comfortable.

Additionally, in electric rail systems, the number of trains and cars per train can in practice be limited by the electric power capacity of the distribution system, because each additional car increases the electrical load.

Finally, some rail systems have fully automated or semi-automated operation, where the train speed may be controlled through an automated system. Signals are transmitted through the rails or through the power system to the train motors, indicating the appropriate speed for a given block.

Sample Problem

A transit agency has an existing 8.5-mile bus route (in one direction) where the average speed *between* stops is 16.9 miles per hour. The route has 22 stops along the route. If the average dwell time at each stop is 18 seconds, what is the average bus speed along the route as a whole?

And, if a 5-minute layover is required at the far end of the route, what is the total round-trip travel time? Assume the time for the inbound trip is identical in time to the outbound trip.

**Answer**

Total travel time = (8.5 mi) / (16.9 mi/hr) + (22 stops)*(18 sec/stop)*(1 hr / 3600 sec) = 0.613 hr = 37 minutes (rounded up to the nearest minute)

The average speed = (8.5 mi / 0.613 hr) = 13.9 mph.

The total round-trip time = 37 min + 5 min layover + 37 min = 79 min

## Glossary

*   Bunching: The phenomenon in which two buses become closer to one another on a route, in some cases even joining one another along the route.
*   Deadhead: A trip between route termini while the vehicle is not in revenue service; typically taken to reposition the vehicle to start service on a new route.
*   Hail-stop operation: A vehicle need only stop at a station if there are passengers desiring to board or to alight. Otherwise, the vehicle can continue without stopping.
*   Layover: A short period of time between the end of revenue service on one trip and the resumption of revenue service on the next (vehicle) trip, at a common terminus.
*   Pull-in: The movement of a vehicle from a route terminus back to the depot at the end of revenue service.
*   Pull-out: The movement of a vehicle from the depot to a route terminus to begin revenue service.
*   Revenue service: The movement of a vehicle along a route where passengers may board and alight.
*   Schedule slack: a short amount of time inserted into the schedule on a route to improve schedule adherence

## Related books

Avishai Ceder (2007). Public Transit Planning and Operation: Theory, Modeling, and Practice. Oxford: Butterworth-Heinemann.

Transportation Research Board (2003). Transit Capacity and Quality of Service Manual, Transit Cooperative Research Program, Report 100, 2nd Edition.

Vukan R. Vuchic (2005). Urban Transit: Operations, Planning, and Economics. Hoboken: John Wiley and Sons.
