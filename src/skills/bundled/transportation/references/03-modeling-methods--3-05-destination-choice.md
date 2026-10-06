# 3.5: Destination Choice

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/03%3A_Modeling_Methods/3.05%3A_Destination_Choice

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

_Everything is related to everything else, but near things are more related than distant things._ - Waldo Tobler's 'First Law of Geography’

**Destination Choice** (or **trip distribution** or **zonal interchange analysis**), is the second component (after Trip Generation, but before Mode Choice and Route Choice) in the traditional four-step transportation forecasting model. This step matches tripmakers’ origins and destinations to develop a “trip table”, a matrix that displays the number of trips going from each origin to each destination. Historically, trip distribution has been the least developed component of the transportation planning model.

_Table: Illustrative Trip Table_

| **Origin \ Destination** | **1** | **2** | **3** | **Z** |
| --- | --- | --- | --- | --- |
| 1 | T11 | T12 | T13 | T1Z |
| 2 | T21 |  |  |  |
| 3 | T31 |  |  |  |
| Z | TZ1 |  |  | TZZ |

Where: \(T_{ij}\) = Trips from origin _i_ to destination _j_.

Work trip distribution is the way that travel demand models understand how people take jobs. There are trip distribution models for other (non-work) activities, which follow the same structure.

## Fratar Models

The simplest trip distribution models (Fratar or Growth models) simply extrapolate a base year trip table to the future based on growth,

\[T_{ij,y+1}=g*T_{ij,y}\]

where:

*   \(T_{ij,y}\) - Trips from \(i\) to \(j\) in year \(y\)
*   \(g\) - growth factor

Fratar Model takes no account of changing spatial accessibility due to increased supply or changes in travel patterns and congestion.

## Gravity Model

The gravity model illustrates the macroscopic relationships between places (say homes and workplaces). It has long been posited that the interaction between two locations declines with increasing (distance, time, and cost) between them, but is positively associated with the amount of activity at each location (Isard, 1956). In analogy with physics, Reilly (1929) formulated Reilly's law of retail gravitation, and J. Q. Stewart (1948) formulated definitions of demographic gravitation, force, energy, and potential, now called accessibility (Hansen, 1959). The distance decay factor of ![{\\displaystyle distance^{-1}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/664e63dcdcce129771837345a5cee4b96470b8ac) has been updated to a more comprehensive function of generalized cost, which is not necessarily linear - a negative exponential tends to be the preferred form. In analogy with Newton’s law of gravity, a gravity model is often used in transportation planning.

The gravity model has been corroborated many times as a basic underlying aggregate relationship (Scott 1988, Cervero 1989, Levinson and Kumar 1995). The rate of decline of the interaction (called alternatively, the impedance or friction factor, or the utility or propensity function) has to be empirically measured, and varies by context.

Limiting the usefulness of the gravity model is its aggregate nature. Though policy also operates at an aggregate level, more accurate analyses will retain the most detailed level of information as long as possible. While the gravity model is very successful in explaining the choice of a large number of individuals, the choice of any given individual varies greatly from the predicted value. As applied in an urban travel demand context, the disutilities are primarily time, distance, and cost, although discrete choice models with the application of more expansive utility expressions are sometimes used, as is stratification by income or auto ownership.

Mathematically, the gravity model often takes the form:

\[T_{ij}=r_is_jT_{O,i}T_{D,j}F(C_{ij})\]

\[\displaystyle \sum{j}T_{ij}=T_{O,i}, \displaystyle \sum{i} T_{ij} = T_{D,j}\]

\[r_i = (\displaystyle \sum{j} s_jT_{D,j}f(C_{ij}))^{-1}\]

\[s_j=(\displaystyle \sum{i} r_iT_{O,i}f(C_{ij}))^{-1}\]

where

*   \(T_{ij}\) = Trips between origin ![i](https://wikimedia.org/api/rest_v1/media/math/render/svg/add78d8608ad86e54951b8c8bd6c8d8416533d20) and destination ![j](https://wikimedia.org/api/rest_v1/media/math/render/svg/2f461e54f5c093e92a55547b9764291390f0b5d0)
*   \(T_{O,i}\) = Trips originating at ![i](https://wikimedia.org/api/rest_v1/media/math/render/svg/add78d8608ad86e54951b8c8bd6c8d8416533d20)
*   \(T_{D,j}\) = Trips destined for ![j](https://wikimedia.org/api/rest_v1/media/math/render/svg/2f461e54f5c093e92a55547b9764291390f0b5d0)
*   \(C_{ij}\) = travel cost between ![i](https://wikimedia.org/api/rest_v1/media/math/render/svg/add78d8608ad86e54951b8c8bd6c8d8416533d20) and ![j](https://wikimedia.org/api/rest_v1/media/math/render/svg/2f461e54f5c093e92a55547b9764291390f0b5d0)
*   \(r_i,s_j\) = balancing factors solved iteratively.
*   \(f\) = impedance or distance decay factor

It is doubly constrained so that Trips from ![i](https://wikimedia.org/api/rest_v1/media/math/render/svg/add78d8608ad86e54951b8c8bd6c8d8416533d20) to ![j](https://wikimedia.org/api/rest_v1/media/math/render/svg/2f461e54f5c093e92a55547b9764291390f0b5d0) equal number of origins and destinations.

## Balancing a matrix

Balancing a matrix can be done using what is called the **Furness Method**, summarized and generalized below.

1. Assess Data, you have \(T_{O,i}\),\(T_{D,j}\), \(C_{ij}\)

2. Compute \(f(C_{ij})\), e.g.

\[f(C_{ij})=C_{ij}^{-2}\]

\[f(C_{ij})=e^{\beta C_{ij}}\]

3. Iterate to Balance Matrix

(a) Multiply Trips from Zone \(i(T_i)\) by Trips to Zone \(j(T_j)\) by Impedance in Cell \(ij(f(C_{ij})\) for all \(ij\)

(b) Sum Row Totals \(T'_{O,i}\), Sum Column Totals \(T'_{D,j}\)

(c) Multiply Rows by \(N{O,i}=T_{O,i}/T'_{O,i}\)

(d) Sum Row Totals \(T'_{O,i}\), Sum Column Totals \(T'_{D,j}\)

(e) Compare \(T_{O,i}\) and \(T'_{O,i}\), \(T_{D,j}\) \(T'_{D,j}\) if within tolerance stop, Otherwise go to (f)

(f) Multiply Columns by \(N_{D,j}=T_{D,j}/T'_{D,j}\)

(g) Sum Row Totals \(T'_{O,i}\), Sum Column Totals \(T'_{D,j}\)

(h) Compare \(T_{O,i}\) and \(T'_{O,i}\), \(T_{D,j}\) and \(T'_{D,j}\) if within tolerance stop, Otherwise go to (b)

## Issues

### Feedback

One of the key drawbacks to the application of many early models was the inability to take account of congested travel time on the road network in determining the probability of making a trip between two locations. Although Wohl noted as early as 1963 research into the feedback mechanism or the “interdependencies among assigned or distributed volume, travel time (or travel ‘resistance’) and route or system capacity”, this work has yet to be widely adopted with rigorous tests of convergence or with a so-called “equilibrium” or “combined” solution (Boyce et al. 1994). Haney (1972) suggests internal assumptions about travel time used to develop demand should be consistent with the output travel times of the route assignment of that demand. While small methodological inconsistencies are necessarily a problem for estimating base year conditions, forecasting becomes even more tenuous without an understanding of the feedback between supply and demand. Initially heuristic methods were developed by Irwin and Von Cube (as quoted in Florian et al. (1975) ) and others, and later formal mathematical programming techniques were established by Evans (1976).

### Feedback and time budgets

A key point in analyzing feedback is the finding in earlier research by Levinson and Kumar (1994) that commuting times have remained stable over the past thirty years in the Washington Metropolitan Region, despite significant changes in household income, land use pattern, family structure, and labor force participation. Similar results have been found in the Twin Cities by Barnes and Davis (2000).

The stability of travel times and distribution curves over the past three decades gives a good basis for the application of aggregate trip distribution models for relatively long term forecasting. This is not to suggest that there exists a constant travel time budget.

In terms of time budgets:

*   1440 Minutes in a Day
*   Time Spent Traveling: ~ 100 minutes + or -
*   Time Spent Traveling Home to Work: 20 – 30 minutes + or -

Research has found that auto commuting times have remained largely stable over the past forty years, despite significant changes in transportation networks, congestion, household income, land use pattern, family structure, and labor force participation. The stability of travel times and distribution curves gives a good basis for the application of trip distribution models for relatively long term forecasting.

## Examples

Example 1: Solving for impedance

You are given the travel times between zones, compute the impedance matrix \(f(C_{ij})\), assuming \(f(C_{ij})=C_{ij}^{-2}\).

**Travel Time OD Matrix (****![{\\displaystyle C\_{ij}\\,\\!}](https://wikimedia.org/api/rest_v1/media/math/render/svg/6937339d542a23ad5bcec3fc3cc076edb9c8243e)****)**

| **Origin Zone** | **Destination Zone 1** | **Destination Zone 2** |
| --- | --- | --- |
| 1 | 2 | 5 |
| 2 | 5 | 2 |

Compute impedances (\(f(C_{ij})\))

**Solution**

**Impedance Matrix (**\(f(C_{ij})\)**)**

| **Origin Zone** | **Destination Zone 1** | **Destination Zone 2** |
| --- | --- | --- |
| 1 | ![{\\displaystyle {\\frac {1}{2^{2}}}=0.25\\,\\!}](https://wikimedia.org/api/rest_v1/media/math/render/svg/be3e80c6c54839da2ad48d8a75788e7f3b23d233) | ![{\\displaystyle {\\frac {1}{5^{2}}}=0.04\\,\\!}](https://wikimedia.org/api/rest_v1/media/math/render/svg/9c24b14fc4a8d6f316c303201e8e027b83a9b8ab) |
| 2 | ![{\\displaystyle {\\frac {1}{5^{2}}}=0.04\\,\\!}](https://wikimedia.org/api/rest_v1/media/math/render/svg/9c24b14fc4a8d6f316c303201e8e027b83a9b8ab) | ![{\\displaystyle {\\frac {1}{2^{2}}}=0.25\\,\\!}](https://wikimedia.org/api/rest_v1/media/math/render/svg/be3e80c6c54839da2ad48d8a75788e7f3b23d233) |

Example 2:

You are given the travel times between zones, trips originating at each zone (zone1 =15, zone 2=15) trips destined for each zone (zone 1=10, zone 2 = 20) and asked to use the classic gravity model \(f(C_{ij})=C_{ij}^{-2}\)

**Travel Time OD Matrix (****![{\\displaystyle C\_{ij}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/70b3f8ea18a9b9a0dbe09dae212a623820b217d7)****)**

| **Origin Zone** | **Destination Zone 1** | **Destination Zone 2** |
| --- | --- | --- |
| 1 | 2 | 5 |
| 2 | 5 | 2 |

**Solution**

(a) Compute impedances (\(f(C_{ij})\))

**Impedance Matrix (**\(f(C_{ij})\)**)**

| **Origin Zone** | **Destination Zone 1** | **Destination Zone 2** |
| --- | --- | --- |
| 1 | 0.25 | 0.04 |
| 2 | 0.04 | 0.25 |

(b) Find the trip table

**Balancing Iteration 0 (Set-up)**

| **Origin Zone** | **Trips Originating** | **Destination Zone 1** | **Destination Zone 2** |
| --- | --- | --- | --- |
| Trips Destined |  | 10 | 20 |
| 1 | 15 | 0.25 | 0.04 |
| 2 | 15 | 0.04 | 0.25 |

**Balancing Iteration 1 (**\(T_{ij,iteration1}=T_{O,i}T_{D,j}f(C_{ij})\)**)**

| **Origin Zone** | **Trips Originating** | **Destination Zone 1** | **Destination Zone 2** | **Row Total ![{\\displaystyle T'\_{O,i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/65b3cd0cfb3f0b048cbf4860bc53250707e80a5b)** | **Normalizing Factor ![{\\displaystyle N\_{O,i}=T\_{O,i}/T'\_{O,i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/7a01396639f3d10e8d6ef843012fa2939c246917)** |
| --- | --- | --- | --- | --- | --- |
| Trips Destined |  | 10 | 20 |  |  |
| 1 | 15 | 37.50 | 12 | 49.50 | 0.303 |
| 2 | 15 | 6 | 75 | 81 | 0.185 |
| Column Total |  | 43.50 | 87 |  |  |

**Balancing Iteration 2 (**\(T_{ij,iteration2}=T_{ij,iteration1}*N_{O,i,iteration1\)**)**

| **Origin Zone** | **Trips Originating** | **Destination Zone 1** | **Destination Zone 2** | **Row Total ![{\\displaystyle T'\_{O,i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/65b3cd0cfb3f0b048cbf4860bc53250707e80a5b)** | **Normalizing Factor ![{\\displaystyle N\_{O,i}=T\_{O,i}/T'\_{O,i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/7a01396639f3d10e8d6ef843012fa2939c246917)** |
| --- | --- | --- | --- | --- | --- |
| Trips Destined |  | 10 | 20 |  |  |
| 1 | 15 | 11.36 | 3.64 | 15.00 | 1.00 |
| 2 | 15 | 1.11 | 13.89 | 15.00 | 1.00 |
| Column Total |  | 12.47 | 17.53 |  |  |
| Normalizing Factor ![{\\displaystyle N\_{D,j}=T\_{D,j}/T'\_{D,j}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/64654f9f1ddd51e12c08dfdf1c709f4ba6aa374d) |  | 0.802 | 1.141 |  |  |

**Balancing Iteration 3 (**​​​​\(T_{ij,iteration3}=T_{ij,iteration2}*N_{D,j,iteration2\)**)**

| **Origin Zone** | **Trips Originating** | **Destination Zone 1** | **Destination Zone 2** | **Row Total ![{\\displaystyle T'\_{O,i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/65b3cd0cfb3f0b048cbf4860bc53250707e80a5b)** | **Normalizing Factor ![{\\displaystyle N\_{O,i}=T\_{O,i}/T'\_{O,i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/7a01396639f3d10e8d6ef843012fa2939c246917)** |
| --- | --- | --- | --- | --- | --- |
| Trips Destined |  | 10 | 20 |  |  |
| 1 | 15 | 9.11 | 4.15 | 13.26 | 1.13 |
| 2 | 15 | 0.89 | 15.85 | 16.74 | 0.90 |
| Column Total |  | 10.00 | 20.00 |  |  |
| Normalizing Factor = ![{\\displaystyle N\_{D,j}=T\_{D,j}/T'\_{D,j}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/64654f9f1ddd51e12c08dfdf1c709f4ba6aa374d) |  | 1.00 | 1.00 |  |  |

**Balancing Iteration 4 (**​​​​​\(T_{ij,iteration4}=T_{ij,iteration3}*N_{O,i,iteration3\)**)**

| **Origin Zone** | **Trips Originating** | **Destination Zone 1** | **Destination Zone 2** | **Row Total ![{\\displaystyle T'\_{O,i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/65b3cd0cfb3f0b048cbf4860bc53250707e80a5b)** | **Normalizing Factor ![{\\displaystyle N\_{O,i}=T\_{O,i}/T'\_{O,i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/7a01396639f3d10e8d6ef843012fa2939c246917)** |
| --- | --- | --- | --- | --- | --- |
| Trips Destined |  | 10 | 20 |  |  |
| 1 | 15 | 10.31 | 4.69 | 15.00 | 1.00 |
| 2 | 15 | 0.80 | 14.20 | 15.00 | 1.00 |
| Column Total |  | 11.10 | 18.90 |  |  |
| Normalizing Factor = ![{\\displaystyle N\_{D,j}=T\_{D,j}/T'\_{D,j}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/64654f9f1ddd51e12c08dfdf1c709f4ba6aa374d) |  | 0.90 | 1.06 |  |  |

**Balancing Iteration 16 (**\(T_{ij,iteration16}=T_{ij,iteration15}*N_{D,i,iteration5\)**)**

| Origin Zone | Trips Originating | Destination Zone 1 | Destination Zone 2 | Row Total ![{\\displaystyle T'\_{O,i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/65b3cd0cfb3f0b048cbf4860bc53250707e80a5b) | Normalizing Factor ![{\\displaystyle N\_{O,i}=T\_{O,i}/T'\_{O,i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/7a01396639f3d10e8d6ef843012fa2939c246917) |
| --- | --- | --- | --- | --- | --- |
| Trips Destined |  | 10 | 20 |  |  |
| 1 | 15 | 9.39 | 5.61 | 15.00 | 1.00 |
| 1 | 15 | 9.39 | 5.61 | 15.00 | 1.00 |
| Column Total |  | 10.01 | 19.99 |  |  |
| Normalizing Factor = ![{\\displaystyle N\_{D,j}=T\_{D,j}/T'\_{D,j}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/64654f9f1ddd51e12c08dfdf1c709f4ba6aa374d) |  | 1.00 | 1.00 |  |  |

So while the matrix is not strictly balanced, it is very close, well within a 1% threshold, after 16 iterations. The threshold refers to the proximity of the normalizing factor to 1.0.

## Additional Questions

Homework

1. Identify five independent variables that you believe affect trip generation. Pose hypotheses about how each variable affects number of trips generated.

2. Identify three different types of trip distribution models. Which one includes the most information? Which one is most common?

3. You are given the following situation: The towns of Saint Cloud and Minneapolis, separated by 110 km as the crow flies, are to be connected by a railroad, a freeway, and a rural highway. Answer the following questions related to this problem

Trip Generation and Distribution

Your planners have estimated the following models for the AM Peak Hour

\[T_{O,i}=500+0.5*{HH}_i\]

\[T_{D,j}=250+0.5*{OFFEMP_j}+0.355*{OTHEMP_j}+0.094*{RETEMP_j}\]

Where: \(T_{O,i}=\) Person Trips Originating in Zone _i_

\(T_{D,j}=\)Person Trips Destined for Zone _j_

\(HH_i=\) Number of Households in Zone _i_

\({OFFEMP}_j=\)Office Employees in Zone _j_

\({OTHEMP}_j=\)Other Employees in Zone _j_

\({RETEMP}_j\)Retail Employees in Zone _j_

Your are also given the following data

|  | **Saint Cloud** | **Minneapolis** |
| --- | --- | --- |
| ![{\\displaystyle HH\_{i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/a8a6e959356e6a846a97ade46cc8bc7e47ab4416) | 47,604 | 476,040 |
| ![{\\displaystyle OFFEMP\_{j}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/2c78c931de82d1d016a70898ed52592302684d4e) | 33,675 | 336,750 |
| ![{\\displaystyle OTHEMP\_{j}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/2966cdac4806ff99d8cbe03eca4175919d7b00ba) | 14,500 | 145,000 |
| ![{\\displaystyle RETEMP\_{j}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/3ab7496b1ae448b5469ac8181a0ec8dfc2929964) | 22,000 | 220,000 |

The travel time between zones (in minutes) is given by the following matrix:

|  | **To Minneapolis** | **To Saint Cloud** |
| --- | --- | --- |
| From Minneapolis | 5 | 70 |
| From Saint Cloud | 70 | 5 |

(a) (10) What are the number of AM peak hour person trips originating in and destined for Saint Cloud and Minneapolis.

(b) (10) Assuming the origins are more accurate, normalize the number of destination trips for Saint Cloud and Minneapolis.

(c) (10) Assume a gravity model where the impedance \(f(C_{ij})=C_{ij}^{-2}\). Estimate the proportion of trips that go from Saint Cloud to Minneapolis. Solve your matrix within 5 percent of a balanced solution.

Additional Questions

1.  What are the different kinds of models for trip distribution? How do they differ?
2.  What factors do conventional Trip Distribution models neglect?
3.  In a day, how many minutes are spent traveling for the average person, traveling to work? Why might this be stable, not stable?
4.  Do travelers have a travel time tolerance or a travel time budget?
5.  What affects travel impedance?
6.  If impedance increases, will willingness to travel increase or decrease? Is a person more likely to travel to a closer place or a farther place?
7.  Why does willingness to travel have a negative exponential form?
8.  Briefly describe the gravity model? How might the gravity model be extended to depend on more than just size (opportunities) and distance (impedance)?
9.  Why is balancing a matrix an iterative procedure?
10.  What importance does impedance play in balancing iterations
11.  Give two functions of impedance (f(Cij)) used in gravity models.
12.  How do you calculate impedance between zones?
13.  What is congested travel time?
14.  Conventional trip distribution models are estimated for which mode?
15.  How is trip distribution applied?
16.  What can a trip distribution curve tell you about maximum and average trip times and willingness to take trips?
17.  What factors are multiplied to give a resulting trip distribution curve

## Variables

*   \(T_{O,i}\) - Trips leaving origin ![i](https://wikimedia.org/api/rest_v1/media/math/render/svg/add78d8608ad86e54951b8c8bd6c8d8416533d20)
*   \(T_{D,j}\) - Trips arriving at destination {\displaystyle j}![j](https://wikimedia.org/api/rest_v1/media/math/render/svg/2f461e54f5c093e92a55547b9764291390f0b5d0)
*   \(T'_{D,j}\) - Effective Trips arriving at destination ![j](https://wikimedia.org/api/rest_v1/media/math/render/svg/2f461e54f5c093e92a55547b9764291390f0b5d0), computed as a result for calibration to the next iteration
*   \(T_{ij}\) - Total number of trips between origin ![i](https://wikimedia.org/api/rest_v1/media/math/render/svg/add78d8608ad86e54951b8c8bd6c8d8416533d20) and destination ![j](https://wikimedia.org/api/rest_v1/media/math/render/svg/2f461e54f5c093e92a55547b9764291390f0b5d0)
*   \(r_i\) - Calibration parameter for Origins
*   \(s_j\) - Calibration parameter for Destinations
*   \(f(C_{ij})\) - Cost function between origin ![i](https://wikimedia.org/api/rest_v1/media/math/render/svg/add78d8608ad86e54951b8c8bd6c8d8416533d20) and destination ![j](https://wikimedia.org/api/rest_v1/media/math/render/svg/2f461e54f5c093e92a55547b9764291390f0b5d0)

## Videos
