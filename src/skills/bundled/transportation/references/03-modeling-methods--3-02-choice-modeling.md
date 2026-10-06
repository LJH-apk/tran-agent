# 3.2: Choice Modeling

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/03%3A_Modeling_Methods/3.02%3A_Choice_Modeling

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

**Mode choice analysis** is the third step in the conventional four-step transportation forecasting model, following Trip Generation and Destination Choice but before Route Choice. While trip distribution's zonal interchange analysis yields a set of origin destination (OD) tables which tells where the trips will be made, mode choice analysis allows the modeler to determine what mode of transport will be used.

### Disaggregate Travel Demand models

Travel demand theory was introduced in the appendix on traffic generation. The core of the field is the set of models developed following work by Stan Warner in 1962 (Strategic Choice of Mode in Urban Travel: A Study of Binary Choice). Using data from the CATS, Warner investigated classification techniques using models from biology and psychology. Building from Warner and other early investigators, disaggregate demand models emerged. Analysis is disaggregate in that individuals are the basic units of observation, yet aggregate because models yield a single set of parameters describing the choice behavior of the population. Behavior enters because the theory made use of consumer behavior concepts from economics and parts of choice behavior concepts from psychology. Researchers at the University of California, Berkeley (especially Daniel McFadden, who won a Nobel Prize in Economics for his efforts) and the Massachusetts Institute of Technology (Moshe Ben-Akiva) (and in MIT associated consulting firms, especially Cambridge Systematics) developed what has become known as choice models, direct demand models (DDM), Random Utility Models (RUM) or, in its most used form, the multinomial logit model (MNL).

Choice models have attracted a lot of attention and work; the Proceedings of the International Association for Travel Behavior Research chronicles the evolution of the models. The models are treated in modern transportation planning and transportation engineering textbooks.

One reason for rapid model development was a felt need. Systems were being proposed (especially transit systems) where no empirical experience of the type used in diversion curves was available. Choice models permit comparison of more than two alternatives and the importance of attributes of alternatives. There was the general desire for an analysis technique that depended less on aggregate analysis and with a greater behavioral content. And, there was attraction too, because choice models have logical and behavioral roots extended back to the 1920s as well as roots in Kelvin Lancaster’s consumer behavior theory, in utility theory, and in modern statistical methods.

### The Logit Model

The Logit Model, widely used for transportation forecasting in various forms, was first theorized by Daniel McFadden. The Logit model says, the probability that a certain mode choice will be taken is proportional to ![e](https://wikimedia.org/api/rest_v1/media/math/render/svg/cd253103f0876afc68ebead27a5aa9867d927467) raised to the utility over the sum of \(e\) raised to the utility.

\[P_m=\dfrac{e^{u_{ijm}}}{\sum{} e^{u_{ijm}}}\]

For any Logit Model the sum of the probability of all modes will equal 1.

\[1=\sum{} P_m\]

The Logit Model also says that if a new mode of transportation is added to a system (or taken away) then the original modes will lose (or gain) an amount of travels proportional to their share originally.

Steps for the Logit Model:

*   Compute the Utility for each OD pair and mode
*   Compute Exponentiated utilities for each OD pair and mode
*   Sum Exponentiated utilities for each OD pair
*   Compute Probability for each mode by OD pair
*   Multiply Probability for OD pair by number of trips for each OD pair

### Psychological roots

Early psychology work involved the typical experiment: Here are two objects with weights, \(w_1\) and \(w_2\), which is heavier? The finding from such an experiment would be that the greater the difference in weight, the greater the probability of choosing correctly. Graphs similar to the one on the right result.

![Distribution of perceived weights](https://upload.wikimedia.org/Wikipedia/commons/thumb/6/60/ThurstonMC.png/500px-ThurstonMC.png)

Louis Leon Thurstone proposed (in the 1920s) that perceived weight,

\[w=v+e\]

where \(v\) is the true weight and \(e\) is random with \(E(e)=0\)

The assumption that ![e](https://wikimedia.org/api/rest_v1/media/math/render/svg/cd253103f0876afc68ebead27a5aa9867d927467) is normally and identically distributed (NID) yields the binary probit model.

### Econometric formulation

Economists deal with utility rather than physical weights, and say that

observed utility = mean utility + random term.

Utility in this context refers to the total satisfaction (or happiness) received from making a particular choice or consuming a good or service.

The characteristics of the object, x, must be considered, so we have

\[u(x)=v(x)+e(x)\]

If we follow Thurston's assumption, we again have a probit model.

An alternative is to assume that the error terms are independently and identically distributed with a Weibull, Gumbel Type I, or double exponential distribution (They are much the same, and differ slightly in their tails (thicker) from the normal distribution). This yields the multinomial logit model (MNL). Daniel McFadden argued that the Weibull had desirable properties compared to other distributions that might be used. Among other things, the error terms are normally and identically distributed. The logit model is simply a log ratio of the probability of choosing a mode to the probability of not choosing a mode.

\[log\left(\dfrac{P_i}{1-P_i}\right)=v(x_i)\]

Observe the mathematical similarity between the logit model and the S-curves we estimated earlier, although here share increases with utility rather than time. With a choice model we are explaining the share of travelers using a mode (or the probability that an individual traveler uses a mode multiplied by the number of travelers).

The comparison with S-curves is suggestive that modes (or technologies) get adopted as their utility increases, which happens over time for several reasons. First, because the utility itself is a function of network effects, the more users, the more valuable the service, higher the utility associated with joining the network. Second, because utility increases as user costs drop, which happens when fixed costs can be spread over more users (another network effect). Third, technological advances, which occur over time and as the number of users increases, drive down relative cost.

An illustration of a utility expression is given:

\[log\left(\dfrac{P_A}{1-P_A}\right)=\beta_0+\beta_1(c_A-c_T)+\beta_2(t_A-t_T)+\beta_3I+\beta_4N=v_A\]

where

*   _Pi_ = Probability of choosing mode i.
*   _PA_ = Probability of taking auto
*   _cA,cT_ = cost of auto, transit
*   _tA,tT_ = travel time of auto, transit
*   _I_ = income
*   _N_ = Number of travelers

With algebra, the model can be translated to its most widely used form:

\[\dfrac{P_A}{1-P_A}=e^{v_A}\]

\[P_A=e^{v_A}-P_Ae^{v_A}\]

\[P_A(1+e^{v_A})=e^{v_A}\]

\[P_A=\dfrac{e^{v_A}}{1+e^{v_A}}\]

It is fair to make two conflicting statements about the estimation and use of this model:

1.  It's a "house of cards", and
2.  Used by a technically competent and thoughtful analyst, it's useful.

The "house of cards" problem largely arises from the utility theory basis of the model specification. Broadly, utility theory assumes that (1) users and suppliers have perfect information about the market; (2) they have deterministic functions (faced with the same options, they will always make the same choices); and (3) switching between alternatives is costless. These assumptions don’t fit very well with what is known about behavior. Furthermore, the aggregation of utility across the population is impossible since there is no universal utility scale.

Suppose an option has a net utility _ujk_ (option _k_, person _j_). We can imagine that having a systematic part _vjk_ that is a function of the characteristics of an object and person _j_, plus a random part _ejk_, which represents tastes, observational errors, and a bunch of other things (it gets murky here). (An object such as a vehicle does not have utility, it is characteristics of a vehicle that have utility.) The introduction of _e_ lets us do some aggregation. As noted above, we think of observable utility as being a function:

\[v_A=\beta_0+\beta_1(c_A-c_T)+\beta_2(t_A-t_T)+\beta_3I+\beta_4N\]

where each variable represents a characteristic of the auto trip. The value _β0_ is termed an alternative specific constant. Most modelers say it represents characteristics left out of the equation (e.g., the political correctness of a mode, if I take transit I feel morally righteous, so _β0_ may be negative for the automobile), but it includes whatever is needed to make error terms NID.

### Econometric Estimation

Turning now to some technical matters, how do we estimate _v(x)_? Utility (_v(x)_) isn’t observable. All we can observe are choices (say, measured as 0 or 1), and we want to talk about probabilities of choices that range from 0 to 1. (If we do a regression on 0s and 1s we might measure for _j_ a probability of 1.4 or -0.2 of taking an auto.) Further, the distribution of the error terms wouldn’t have appropriate statistical characteristics.

![Figure: Likelihood Function for the Sample {1,1,1,0,1}.](https://upload.wikimedia.org/Wikipedia/commons/thumb/9/98/LikelihoodMC.png/500px-LikelihoodMC.png)

The MNL approach is to make a maximum likelihood estimate of this functional form. The likelihood function is:

\[L^*=\displaystyle \prod_{n=1}^N f(y_n|x_n, \theta)\]

we solve for the estimated parameters

\[\hat \theta\]

that max L*. This happens when:

\[\dfrac{\partial L}{\partial \hat \theta_N}=0\]

The log-likelihood is easier to work with, as the products turn to sums:

\[lnL^*=\displaystyle \prod_{n=1}^N lnf(y_n|x_n, \theta)\]

Consider an example adopted from John Bitzan’s Transportation Economics Notes. Let _X_ be a binary variable that is _gamma_ and 0 with probability (1- _gamma_). Then f(0) = (1- _gamma_) and f(1) = _gamma_. Suppose that we have 5 observations of X, giving the sample {1,1,1,0,1}. To find the maximum likelihood estimator of _gamma_ examine various values of _gamma_, and for these values determine the probability of drawing the sample {1,1,1,0,1} If _gamma_ takes the value 0, the probability of drawing our sample is 0. If _gamma_ is 0.1, then the probability of getting our sample is: f(1,1,1,0,1) = f(1)f(1)f(1)f(0)f(1) = 0.1*0.1*0.1*0.9*0.1=0.00009. We can compute the probability of obtaining our sample over a range of _gamma_ – this is our likelihood function. The likelihood function for n independent observations in a logit model is

\[L^*=\displaystyle \prod_{n=1}^N P_i^{Y_i}(1-P_i)^{1-Y_i}\]

where: _Yi_ = 1 or 0 (choosing e.g. auto or not-auto) and Pi = the probability of observing Yi=1

The log likelihood is thus:

\[\ell=lnL^*=\displaystyle \prod_{i=1}^n[Y_ilnP_i+(1-Y_i)ln(1-P_i)]\]

In the binomial (two alternative) logit model,

\[P_auto=\dfrac{e^{v(x_{auto})}{1+e^{v(x_{auto})}\], so

\[\ell=lnL^*=\displaystyle \prod_{i=1}^n[Y_iv(x_{auto})-ln(1+e^{v(x_{auto})}]\]

The log-likelihood function is maximized setting the partial derivatives to zero:

\[\dfrac{\partial L}{\partial \beta}=\displaystyle \prod_{i=1}^n(Y_i-\hat P_i)=0\]

The above gives the essence of modern MNL choice modeling.

### Independence of Irrelevant Alternatives (IIA)

Independence of Irrelevant Alternatives is a property of Logit, but not all Discrete Choice models. In brief, the implication of IIA is that if you add a mode, it will draw from present modes in proportion to their existing shares. (And similarly, if you remove a mode, its users will switch to other modes in proportion to their previous share). To see why this property may cause problems, consider the following example: Imagine we have seven modes in our logit mode choice model (drive alone, carpool 2 passenger, carpool 3+ passenger, walk to transit, auto driver to transit (park and ride), auto passenger to transit (kiss and ride), and walk or bike). If we eliminated Kiss and Ride, a disproportionate number may use Park and Ride or carpool.

Consider another example. Imagine there is a mode choice between driving and taking a red bus, and currently each has 50% share. If we introduce another mode, let's call it a blue bus with identical attributes to the red bus, the logit mode choice model would give each mode 33.3% of the market, or in other words, buses will collectively have 66.7% market share. Logically, if the mode is truly identical, it would not attract any additional passengers (though one can imagine scenarios where adding capacity would increase bus mode share, particularly if the bus was capacity constrained.

There are several strategies that help with the IIA problem. Nesting of choices allows us to reduce this problem. However, there is an issue of the proper Nesting structure. Other alternatives include more complex models (e.g. Mixed Logit) which are more difficult to estimate.

### Returning to roots

The discussion above is based on the economist’s utility formulation. At the time MNL modeling was developed there was some attention to psychologist's choice work (e.g., Luce’s choice axioms discussed in his Individual Choice Behavior, 1959). It has an analytic side in computational process modeling. Emphasis is on how people think when they make choices or solve problems (see Newell and Simon 1972). Put another way, in contrast to utility theory, it stresses not the choice but the way the choice was made. It provides a conceptual framework for travel choices and agendas of activities involving considerations of long and short term memory, effectors, and other aspects of thought and decision processes. It takes the form of rules dealing with the way information is searched and acted on. Although there is a lot of attention to behavioral analysis in transportation work, the best of modern psychological ideas are only beginning to enter the field. (e.g. Golledge, Kwan and Garling 1984; Garling, Kwan, and Golledge 1994).

## Modal Split

This page describes historical, but no longer standard, practice in Mode Choice models.

The early transportation planning model developed by the Chicago Area Transportation Study (CATS) focused on transit, it wanted to know how much travel would continue by transit. The CATS divided transit trips into two classes: trips to the CBD (mainly by subway/elevated transit, express buses, and commuter trains) and other (mainly on the local bus system). For the latter, increases in auto ownership and use were trade off against bus use; trend data were used. CBD travel was analyzed using historic mode choice data together with projections of CBD land uses. Somewhat similar techniques were used in many studies. Two decades after CATS, for example, the London study followed essentially the same procedure, but first dividing trips into those made in inner part of the city and those in the outer part. This procedure was followed because it was thought that income (resulting in the purchase and use of automobiles) drove mode choice.

### Diversion Curve techniques

The CATS had diversion curve techniques available and used them for some tasks. At first, the CATS studied the diversion of auto traffic from streets and arterial to proposed expressways. Diversion curves were also used as bypasses were built around cities to establish what percentage of the traffic would use the bypass. The mode choice version of diversion curve analysis proceeds this way: one forms a ratio, say:

\[\dfrac{c_{transit}}{c_{auto}}=R\]

where:

_cm_ = travel time by mode _m_ and

_R_ is empirical data in the form:

![Figure: Mode choice diversion curve](https://upload.wikimedia.org/Wikipedia/commons/thumb/4/4d/DiversionCurveMC.png/500px-DiversionCurveMC.png)

Given the _R_ that we have calculated, the graph tells us the percent of users in the market that will choose transit. A variation on the technique is to use costs rather than time in the diversion ratio. The decision to use a time or cost ratio turns on the problem at hand. Transit agencies developed diversion curves for different kinds of situations, so variables like income and population density entered implicitly.

Diversion curves are based on empirical observations, and their improvement has resulted from better (more and more pointed) data. Curves are available for many markets. It is not difficult to obtain data and array results. Expansion of transit has motivated data development by operators and planners. Yacov Zahavi's UMOT studies contain many examples of diversion curves.

In a sense, diversion curve analysis is expert system analysis. Planners could "eyeball" neighborhoods and estimate transit ridership by routes and time of day. Instead, diversion is observed empirically and charts can be drawn.

### Examples

Example 1: Mode Choice Model

You are given this mode choice model

\[U_{ijm}=-0.412(C_c/w)-0.0201*C_{ivt}-0.0531*C_{ovt}-0.89*D_1-1.783D_3-2.15D_4\]

Where:

*   \(C_c/w\) = cost of mode (cents) / wage rate (in cents per minute)
*   \(C_{ivt}\) = travel time in-vehicle (min)
*   \(C_{ovt}\) = travel time out-of-vehicle (min)
*   \(D\) = mode specific dummies: (dummies take the value of 1 or 0)
    *   \(D_1\) = driving,
    *   \(D_2\) = transit with walk access, [base mode]
    *   \(D_3\) = transit with auto access,
    *   \(D_4\) = carpool

With these inputs:

|  | **Driving** | **Walk**<br>**Connect**<br>**Transit** | **Auto**<br>**Connect**<br>**Transit** | **Carpool** |
| --- | --- | --- | --- | --- |
| t = travel time in-vehicle (min) | 10 | 30 | 15 | 12 |
| t0 = travel time out-of-vehicle (min) | 0 | 15 | 10 | 3 |
| \(D_1\) = driving, | 1 | 0 | 0 | 0 |
| \(D_2\) = transit with walk access, [base mode] | 0 | 1 | 0 | 0 |
| \(D_3\) = transit with auto access, | 0 | 0 | 1 | 0 |
| \(D_4\) = carpool | 0 | 0 | 0 | 1 |
| COST | 25 | 100 | 100 | 150 |
| WAGE | 60 | 60 | 60 | 60 |

What are the resultant mode shares?

**Solution**

| **Outputs** | **1: Driving** | **2: Walk**<br>**Connect**<br>**Transit** | **3:**<br>**Auto**<br>**Connect**<br>**Transit** | **4: Carpool** | **Sum** |
| --- | --- | --- | --- | --- | --- |
| Utilities | -1.26 | -2.09 | -3.30 | -3.58 |  |
| EXP(V) | 0.28 | 0.12 | 0.04 | 0.03 |  |
| P(V) | 59.96% | 26.31% | 7.82% | 5.90% | 100% |

Interpretation

Value of Time:

\[.0411/2.24=$0.0183/_min_=$1.10/hour\]

(in 1967 $, when the wage rate was about $2.85/hour)

implication, if you can improve the travel time (by more buses, less bottlenecks, e.g.) for less than $1.10/hour/person, then it is socially worthwhile.

Example 2: Mode Choice Model Interpretation

What mode would a perfectly rational, perfectly informed traveler choose in a deterministic world given these facts:

**Case 1**

| **'** | **Bus** | **Car** | **Parameter** |
| --- | --- | --- | --- |
| Tw | 10 min | 5 min | -0.147 |
| Tt | 40 min | 20 min | -0.0411 |
| C | $2 | $1 | -2.24 |

Car always wins (independent of parameters as long as all are < 0)

**Case 2**

| **'** | **Bus** | **Car** | **Parameter** |
| --- | --- | --- | --- |
| Tw | 5 min | 5 min | -0.147 |
| Tt | 40 min | 20 min | -0.0411 |
| C | $2 | $4 | -2.24 |
| Results | -6.86 | -10.51 |  |

### Sample Problem

Problem 1

You are given the following mode choice model.

\[U_{ijm}=-1C_{ijm}+5D_T\]

Where:

*   \(C_{ijm}\) = travel cost between \(i\) and \(j\) by mode \(m\)
*   \(D_T\) = dummy variable (alternative specific constant) for transit

and Travel Times

**Auto Travel Times**

| **Origin/Destination** | **Dakotopolis** | **New Fargo** |
| --- | --- | --- |
| Dakotopolis | 5 | 7 |
| New Fargo | 7 | 5 |

**Transit Travel Times**

| **Origin/Destination** | **Dakotopolis** | **New Fargo** |
| --- | --- | --- |
| Dakotopolis | 10 | 15 |
| New Fargo | 15 | 8 |

A. Using a logit model, determine the probability of a traveler driving.

B. Using the results from the previous problem (#2), how many car trips will there be?

**Answer**

A. Using a logit model, determine the probability of a traveler driving.

Solution Steps

1. Compute Utility for Each Mode for Each Cell

2. Compute Exponentiated Utilities for Each Cell

3. Sum Exponentiated Utilities

4. Compute Probability for Each Mode for Each Cell

5. Multiply Probability in Each Cell by Number of Trips in Each Cell

**Auto Utility:** \(U_{auto}\)

| **Origin\Destination** | **Dakotopolis** | **New Fargo** |
| --- | --- | --- |
| Dakotopolis | -5 | -7 |
| New Fargo | -7 | -5 |

**Transit Utility:** \(U_{transit}\)

| **Origin\Destination** | **Dakotopolis** | **New Fargo** |
| --- | --- | --- |
| Dakotopolis | -5 | -10 |
| New Fargo | -10 | -3 |

\(e^{U_{auto}}\)

| **Origin\Destination** | **Dakotopolis** | **New Fargo** |
| --- | --- | --- |
| Dakotopolis | 0.0067 | 0.0009 |
| New Fargo | 0.0009 | 0.0067 |

\(e^{U_{transit}}\)

| **Origin\Destination** | **Dakotopolis** | **New Fargo** |
| --- | --- | --- |
| Dakotopolis | 0.0067 | 0.0000454 |
| New Fargo | 0.0000454 | 0.0565 |

**Sum:** \(e^{U_{transit}}+e^{U_{auto}}\)

| **Origin\Destination** | **Dakotopolis** | **New Fargo** |
| --- | --- | --- |
| Dakotopolis | 0.0134 | 0.0009454 |
| New Fargo | 0.0009454 | 0.0498 |

**P(Auto) =** \(e^{U_{auto}}/(e^{U_{auto}}+e^{U_{transit}})\)

| **Origin\Destination** | **Dakotopolis** | **New Fargo** |
| --- | --- | --- |
| Dakotopolis | 0.5 | 0.953 |
| New Fargo | 0.953 | 0.12 |

**P(Transit) =** \(e^{U_{transit}}/(e^{U_{auto}}+e^{U_{transit}})\)

| **Origin\Destination** | **Dakotopolis** | **New Fargo** |
| --- | --- | --- |
| Dakotopolis | 0.5 | 0.047 |
| New Fargo | 0.047 | 0.88 |

**Part B**

B. Using the results from the previous problem (#2), how many car trips will there be?

Recall

**Total Trips**

| **Origin\Destination** | **Dakotopolis** | **New Fargo** |
| --- | --- | --- |
| Dakotopolis | 9395 | 5606 |
| New Fargo | 6385 | 15665 |

**Total Trips by Auto =** \(T_{ij}*P(Auto)\)

| **Origin\Destination** | **Dakotopolis** | **New Fargo** |
| --- | --- | --- |
| Dakotopolis | 4697 | 5339 |
| New Fargo | 6511 | 1867 |

Problem 2

Prior to the collapse, there were two modes serving the Marcytown-Rivertown corridor: driving alone (d) and carpool (c), which takes advantage of an uncongested carpool lane. The utilities of the modes are as given below.

\(U_d=-t_d\)

\(U_c=-12-t_c\)

where t is the travel time

Assuming a multinomial logit model, and

A) That the congested time by driving alone was 15 minutes and time by carpool was 5 minutes. What was the modeshare prior to the collapse?

B) How would you interpret the constant of -12 in the expression for Uc?

C) After the collapse, because of a shift in travelers from other bridges, the travel time by both modes increased by 12 minutes. What is the post-collapse modeshare?

**Answer**

A) That the congested time by driving alone was 15 minutes and time by carpool was 5 minutes. What was the modeshare prior to the collapse?

Ud = -15

Uc = -17

Pd = 0.88

Pc = 0.12

B) How would you interpret the constant of -12 in the expression for Uc?

The constant -12 is an alternative specific constant. In this example, even if the travel time for the drive and carpool modes were the same, the utility of the carpool mode is lesser than the drive alone due to the negative constant -12. This indicates that there is a lesser probability of an individual choosing the carpool mode due to its lower utility.

C) After the collapse, because of a shift in travelers from other bridges, the travel time by both modes increased by 12 minutes. What is the post-collapse modeshare?

In this question since the travel time for both modes increase by the same 12 minutes, the post-collapse mode share will be the same as before

D) The transit agency decides to run a bus to help out the commuters after the collapse. Again assuming the multinomial logit model holds, without knowing how many travelers take the bus, what proportion of travelers on the bus previously took the car? Why? Comment on this result. Does it seem plausible?

The logit model will indicate that 88% of the bus riders previously drove alone due to the underlying Independence of Irrelevant Alternatives (IIA) property. The brief implication of IIA is that when you add a new mode, it will draw from the existing modes in proportion to their existing shares. This doesnt seem plausible since the bus is more likely to draw from the carpool mode than the drive alone mode.

### Additional Questions

Homework

1. Identify five independent variables that you believe affect mode choice. Pose hypotheses about how each variable affects share of travel by each mode.

2. Explain Independence from Irrelevant Alternatives

3. You are given the following mode choice model.

\[U_{ij}=-2C_{ijm}+5D_T-5D_W\]

Where: \(C_{ijm}\) = trabel time between i and j by mode m

\(D_T\) = dummy variable (alternative specific constant) for transit

\(D_W\) = dummy variable (alternative specific constant) for walking

Here auto is assumed the baseline mode.

The auto travel time between zones (in minutes) is given by the following matrix:

| **Origin \ Destination** | **To Dakotopolis** | **To New Fargo** |
| --- | --- | --- |
| From Dakotopolis | 5 | 9 |
| From New Fargo | 9 | 4 |

The transit travel time between zones (in minutes) is given by the following matrix:

| **Origin \ Destination** | **To Dakotopolis** | **To New Fargo** |
| --- | --- | --- |
| From Dakotopolis | 10 | 15 |
| From New Fargo | 15 | 8 |

The walk travel time between zones (in minutes) is given by the following matrix:

| **Origin \ Destination** | **To Dakotopolis** | **To New Fargo** |
| --- | --- | --- |
| From Dakotopolis | 10 | 30 |
| From New Fargo | 30 | 10 |

Using a logit model, what is the probability of a traveler taking transit?

Additional Questions

1.  What factors determine mode choice, utility \(U_{mij}\)
2.  What role does socio-economics play in mode choice?
3.  What is an aggregate model, disaggregate model?
4.  How is probability (\(P_m\)) calculated?
5.  What happens to probability when utility increases or decreases?
6.  Why is it hard for transportation engineers to determine how many people will be taking one mode?
7.  Who developed the logit model for transportation mode choice?
8.  What is “kiss and ride”
9.  What happens when a new mode is introduced?
10.  Explain the red bus/blue bus paradox, and Independence of Irrelevant Alternatives feature of multinomial logit models.
11.  Compare the logit model with the gravity model.
12.  What is an alternative specific constant?

### Variables

*   \(U_{ijm}\)- Utility of traveling from i to j by mode m
*   \(D_n\) = mode specific dummies: (dummies take the value of 1 or 0)
*   \(P_m\) = Probability of mode m
*   \(C_c/w\) = cost of mode (cents) / wage rate (in cents per minute)
*   \(C_{ivt}\) = travel time in-vehicle (min)
*   \(C_{ovt}\) = travel time out-of-vehicle (min)
*   \(D_n\) = mode specific dummies: (dummies take the value of 1 or 0)

### Abbreviations

*   WCT - walk connected transit
*   ADT - auto connect transit (drive alone/park and ride)
*   APT - auto connect transit (auto passenger/kiss and ride)
*   AU1 - auto driver (no passenger)
*   AU2 - auto 2 occupants
*   AU3+ - auto 3+ occupants
*   WK/BK - walk/bike
*   IIA - Independence of Irrelevant Alternatives

### Key Terms

*   Mode choice
*   Logit
*   Probability
*   Independence of Irrelevant Alternatives (IIA)
*   Dummy Variable (takes value of 1 or 0)

### Videos
