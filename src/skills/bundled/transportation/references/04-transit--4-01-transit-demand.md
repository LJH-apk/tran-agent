# 4.1: Transit Demand

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/04%3A_Transit/4.01%3A_Transit_Demand

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

In this module, we present some of the ways in which **transit demand** is measured. In this context, the word _demand_ is synonymous with _usage_ or other measures of use such as _ridership_. In addition, we discuss common methods of estimating ridership, particularly when service or fare changes are planned. A few notes and caveats about forecasting ridership for new transit systems are also provided.

## Measuring transit demand

As was described in the first module, transit use is generally measured through the metrics of unlinked passenger trips and passenger-miles. These are the most commonly reported measures for public transit use in the US, as all agencies that receive federal support are required to report them to the Federal Transit Administration at least annually.

Transit agencies generally collect this information using a common device called a ride check. A sample of the vehicle trips (trips from one route terminal to another) is selected, and a person (the “checker”) is placed on board the vehicle for the sampled scheduled trip(s). That person records the location and the number of people who get on (board) and who get off (alight) the vehicle at that location. An example is shown here for a route traveling 11.1 miles from one terminal (stop 1) to another (stop 10).

| **Stop** | **Distance (mi)** | **Boardings** | **Alightings** | **Load** |
| --- | --- | --- | --- | --- |
| 1 | 0 | 6 | 0 | 6 |
| 2 | 0.5 | 8 | 0 | 14 |
| 3 | 1 | 3 | 2 | 15 |
| 4 | 1.6 | 4 | 0 | 19 |
| 5 | 5.4 | 2 | 5 | 16 |
| 6 | 6.4 | 7 | 2 | 21 |
| 7 | 7 | 3 | 1 | 23 |
| 8 | 9.6 | 2 | 7 | 18 |
| 9 | 10.4 | 1 | 10 | 9 |
| 10 | 11.1 | 0 | 9 | 0 |

To help in visualization, the graph below plots the load by route segment, between stops. This is plotted using the “Distance” and the “Load” columns from the table above.

![Transit load](https://upload.wikimedia.org/Wikipedia/commons/c/cd/Transit_load.png)

Calculating these demand measures, the total number of unlinked trips is simply the sum of the number of people who board. In this example, the total boardings are 36, giving the total unlinked trips of 36.

The total number of passenger-miles is the combination of the number of persons on board (the “load”) between stops, multiplied by the distance between stops. The load is calculated after each stop, adding the number who board and subtracting the number who alight. This number is multiplied by the distance between stops to obtain the total passenger miles. This is just the shaded area in the graph. In this example:

\(Passenger-miles=(6 \text{ }passengers)\cdot(0.5 \text{ }miles)+(14 \text{ }passengers)\cdot(0.5\text{ }miles)+(15\text{ }passengers)\cdot(0.6\text{ }miles)+(19\text{ }passengers)\cdot(3.8\text{ }miles)+(16\text{ }passengers)\cdot(1\text{ }mile)+(21\text{ }passengers)\cdot(0.6\text{ }miles)+(23\text{ }passengers)\cdot(2.6\text{ }miles)+(18\text{ }passengers)\cdot(0.8\text{ }miles)+(9\text{ }passengers)\cdot(0.7\text{ }miles)=200.3\text{ }passenger-miles\)

Other travel information can also be obtained using various survey instruments, such as origin-destination or on-board surveys, which can capture transfer information, trip purpose, origin, destination, and demographic characteristics.

## Simple transit demand estimation methods

One of the more common issues for transit planners is how to estimate demand changes that might occur if various service characteristics or fares are changed. There are a wide variety of tools that could be used to estimate changes in demand, but one must be sure to apply a tool that fits the desired purpose. For a short planning horizon and with only one variable change, elasticities work reasonably well. Because of their widespread use in transit planning, we discuss these extensively here. For a longer time horizon, with multiple variables at play, more sophisticated models may be needed; these are mentioned briefly at the end of this unit.

### **Elasticities**

For transit demand, there are many cases where the analyst seeks to identify the major effects of a service change, or a fare change, over a relatively short time period (6 months, a year). In these cases, one might be interested in looking at a single change (only one variable is changing) over this time, with the assumption that there is little or no effect from all other factors (i.e., “all other things being equal”).

An “elasticity” is well-suited for this case. An elasticity is a measure of sensitivity of demand relative to a particular variable _X_. Specifically, an elasticity _eD,X_ is defined as the percent change in demand _D_ for a +1% change in some variable _X_. This can be specified by a percent change in demand, divided by the percent change in _X_. Mathematically:

\[e_{D,X}=\dfrac{\Delta D/D}{\Delta X/X}=\dfrac{\Delta D}{\Delta X}\cdot\dfrac{X}{D}\]

\[As \text{ } \DeltaX \to 0, e_{D,X}=\dfrac{\partial D}{\partial X}\cdot \dfrac{X}{D}\]

Conceptually, the elasticity indicates the sensitivity of demand to changes in _X_.

*   If the elasticity is positive, then an increase in _X_ results in an increase in demand.
*   If the elasticity is negative, then an increase in _X_ results in a decrease in demand.
*   The larger the absolute value of the elasticity, the more sensitive the demand is to _X_.
*   We say that demand is “elastic” with respect to _X_ if the absolute value of the elasticity is greater than 1.0. This occurs when demand changes by more than 1% if _X_ changes by 1%.
*   We say that demand is “inelastic” with respect to _X_ if the absolute value of the elasticity is less than 1.0. This occurs when demand changes by less than 1% if _X_ changes by 1%.

For transit elasticities, demand is most commonly measured through unlinked trips. Common variables (the _X_s) that a transit agency might consider changing are: fares; frequencies (the number of vehicles per hour visiting a stop or station); and, different measures of travel time, such as total time spent traveling, or time spent on board, waiting time, time spent walking to or from the stop or station, or time spent making transfers.

One of the common empirical observations is that the values of elasticities tend to be transferable; that is, the values of the elasticities often apply to similar circumstances, but in different locations. This makes values of elasticities useful for understanding transit demand in many urban areas.

An extensive set of reports on transit elasticities and other transit service measures has been compiled by the Transit Cooperative Research Program (TCRP) within the Transportation Research Board. Specific elasticities can be obtained from these reports.[[1]](https://en.wikibooks.org/wiki/Fundamentals_of_Transportation/Transit_Demand#cite_note-1) However, some general observations can be made:

*   Transit fare elasticities are negative and inelastic (e.g., _eD,Fare_ = –0.3). Demand drops with an increase in fares, but the demand does not drop as much, percentage-wise, as the fare increase. So, increasing fares will generally create more revenue for a transit agency.
*   Elasticities for frequency are positive and inelastic (e.g., _eD,Frequency_ = +0.5). Demand increases with an increase in service frequency, but not as much, percentage-wise, as the frequency increases.
*   Elasticities for travel times are negative, and can be inelastic or elastic. Transit users tend to be less sensitive (inelastic) to on-board travel times or total travel times (e.g., _eD,TotalTime_ = –0.6), but much more sensitive to access and egress time, waiting time, and transfer time (e.g., _eD,WaitTime_ = –1.2).

Elasticities also may differ on how sensitive the target rider population is to the service or fare change. Travelers in the morning and evening peak periods tend to be less sensitive to fare and service changes than those who ride in mid-day and in the evening or overnight. Also, travelers making discretionary travel tend to be more sensitive to fare and service changes than those making required trips for work or school.

### **Uses of elasticities**

The real value of elasticities is that they provide a clear way to estimate demand changes. That is, with a proposed change in _X_, and an elasticity _eD,X_, one can estimate the change in demand _D_. Re-arranging the equation for the elasticity,

\[\dfrac{\delta D}{D}=e_{D,X}\cdot \dfrac{\delta X}{X}\]

The values of _D_ and _X_ in this equation represent the current conditions, and the value of Δ_X_ is the change in the variable _X_. Then, the change in demand Δ_D_ can be estimated.

For example, consider a transit agency that is considering raising fares from $1.25 to $1.50. The current number of unlinked trips are 110,000 per day. If we use a fare elasticity of –0.35, what is the expected change in demand?

Answer:

\(\dfrac{\Delta D}{D}=e_{D,X}\cdot \dfrac{\Delta X}{X}\)

\(\dfrac{\Delta D}{110,000 \text{ }unlinked \text{ } trips}=-0.35\cdot \dfrac{$1.50-$1.25}{$1.25}\)

\(\Delta D= -7700 \text{ }unlinked\text{ }trips\)

So, the transit agency could expect to lose 7700 unlinked trips per day. But, it is easy to show that, with this fare elasticity, they would make more revenue from the riders after this change.

Sample Problem

A transit agency has an average annual demand of 21,650,000 unlinked trips, with a posted fare of $1.25. Transfers are free. If 25% of the unlinked trips are actually transfers, what are the expected ridership and revenue changes from an increase in the fare to $1.50? Assume a fare elasticity of -0.27, and that all other service conditions remain the same.

**Solution**

If 25% of the unlinked trips are actually transfers, then the real number of paid boardings is only 75% of the 21,650,000 unlinked trips, or 16,237,500 paid (linked) trips. At a fare of $1.25, this brings in (16,237,500 linked trips)*($1.25/linked trip) = $20,296,875.

With a fare elasticity of -0.27, the change in linked trips will be (-0.27)*(20% increase in fare) = -5.4%. So, the change in linked trips is (-5.4%)*(16,237,500), or -876,825 linked trips, yielding a net of 15,360,675 linked trips. With 25% transfers in the unlinked trips, and assuming this fraction does not change, this is equivalent to 20,480,900 unlinked trips.

These trips will bring in ($1.50/linked trip)*(15,360,675 linked trips) = $23,041,012.50. Hence, there is a net decrease in ridership of almost 1.2 million riders per year, but the total revenue will increase by more than $2.8 million.

## Advanced demand forecasting methods

When introducing major service changes, or a new service, more sophisticated demand models are needed. This is because such changes induce much larger changes in travelers’ behavior, such as possible changes in overall trip-making, origins, destinations, modes of travel, routes, and time of travel (among others). The interested reader is encouraged to consider other chapters related to long-term planning methods, to learn how these models are commonly developed and applied.

Perhaps most controversial in the area of transit demand estimation is the forecasting of future ridership (unlinked trips) on proposed new service. Since the 1970’s, many transit agencies have proposed new heavy rail and light rail systems, requiring an assessment of the potential ridership for these systems. In these cases, many forecasts have been overly optimistic in their forecasts of transit ridership, while underestimating the actual costs.

From these forecasting experiences, one might make a few observations:

*   There will be errors in any ridership forecast. Some forecasts have strongly over-predicted the actual ridership, while others have under-predicted ridership. Sources of error in these forecasts are many. More transparency about these possible errors, or some sensitivity analysis on assumptions in the models, can be useful in explaining uncertainties.
*   In the past, there were incentives to over-predict ridership, to make the rail transit investments seem more cost-effective in attracting riders to transit. This is especially true when the federal share of the capital costs (which often range in the hundreds of millions to billions of dollars) can be up to 80% or more.
*   There are a large number of factors that can be considered in developing new rail transit systems. Attracting new riders to public transit remains only one of many possible factors that could influence the political decisions on new transit systems. Specifically, political, economic, and social welfare considerations can often weigh heavily in the decision to develop new rail transit systems.

## Related books

Vukan R. Vuchic (2005). Urban Transit: Operations, Planning, and Economics. Hoboken: John Wiley and Sons.
