# 2.1: Modeling

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/02%3A_Planning_Models/2.01%3A_Modeling

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

_All forecasts are wrong; some forecasts are more wrong than others._ - anonymous

**Modeling** is a means for representing reality in an abstracted way. Your mental models are your **world view**: your outlook on life, and the world. The world view is your _internal model of how the world works_; it is employed every time you make a prediction: what do you expect, what is a surprise. The expression “Where you stand depends on where you sit” epitomizes this idea. Your world view is shaped by your experience and your position.

When modeling, the issue of **Point of View** should be considered. It must be clear who (and what) the results are for. If you are modeling for personal pleasure, it will naturally reflect your own worldview, but if you are working for an employer or client, their point of view must also be considered, if the inputs or results deviate significantly from their worldview, they may adapt their worldview, but more likely will dismiss the model.

Modeling can be conducted both for subjective **advocacy** and for objective **analysis**. The same methods may be employed in either, and the ethical modeler will produce the same results in either case, but they may be used differently.

## Why Model?

There are a variety of reasons to model. Modeling helps

*   gain insight into complex situations by understanding simpler situations resembling them
*   optimize the use of resources in building or maintaining systems
*   operate system, particularly by testing alternative operational scenarios
*   educate and provide experience for model-builders
*   provide a platform for testing contending ideas and use in negotiations.

Particular applications in transportation include:

*   Forecasting traffic
*   Testing scenarios (alternative land uses, networks, policies)
*   Planning projects/corridor studies
*   Regulating land use: Growth management/public facility adequacy
*   Managing complexity, when eyeballs are insufficient, (different people have different intuitions)
*   Understanding travel behavior
*   Influencing decisions
*   Estimating traffic in the absence of data

## Developing Models

As an engineer, economist, or planner you may be given a model to use. But that model was not spontaneously generated, it came from other engineers, economists, or planners who undertook a series of steps to translate raw data into a tool that could be used to generate useful information.

The first step, specification, tells us what depends on what (the number of trips leaving a zone may depend on the number of households). The estimation step tells us how strong these relationships mathematically are, (each household generates two trips in the peak hour). Implementation takes those relationships and puts them into a computer program. Calibration looks at the output of the computer program and compares it to other data, if they don't match exactly, adjustments to the models may be made. Validation compares the results to data at another point in time. Finally the model is applied to look at a project (e.g. how much traffic will use Granary Road after Washington Avenue is closed to traffic).

*   Specification:
    *   \[y=f(X)\]
*   Estimation:
    *   \[y=mX+b;m=1,b=2\]
*   Implementation
    *   If Z > W, Then \[y=mX+b\]
*   Calibration
    *   \[y_{predicted}+k=y_{observed}\]
*   Validation
    *   \[y_{predicted1990}+k=y_{observed1990}\]
*   Application

## Specification

When building a model system, numerous decisions must be made. These are discussed below:

### Types of Models

There are numerous types of models, a short list is below. Each has different applicability, multiple methods may be used in pursuit of the same question, sometimes they are complementary, and sometimes competitive techniques.

*   Network analysis
*   Linear Programming
*   Nonlinear Programming
*   Simulation
*   Deterministic queuing
*   Probabilistic queuing
*   Regression
*   Neural Nets
*   Genetic Algorithm
*   Cost/ Benefit Analysis
*   Life-cycle costing
*   System Dynamics
*   Control Theory
*   Difference Equations
*   Differential Equations
*   Probabilistic Risk Assessment
*   Supply/Demand Equilibrium
*   Game Theory
*   Statistical Decision Theory
*   Markov Models
*   Cellular Automata
*   Etc.

### Model Trade-offs

Building a model requires trading-off time and resource constraints. One could always be more detailed, more accurate, or more comprehensive if resources were not constrained. However, the following must also be considered.

*   Money,
*   Data,
*   Computation,
*   Labor,
*   Ease of Use,
*   Convincing (e.g. Graphic Displays),
*   Extendable,
*   Evidence of Model Benefits,
*   Measuring Model Success

### Organization of Model System

*   Hierarchy of Models
*   Centralized vs. Decentralized (Optimization (Global) vs. Agent, Local Optimization)

### Time

*   Time Frame
*   Static vs. Dynamic
*   Real Time vs. Offline
*   Short Term vs. Long Term (Partial vs. General Equilibrium)
*   Proactive vs. Reactive (Predictive vs. Responsive)

### Space

*   Scale/Detail
*   Spatial Extent
*   Boundaries (Boundary Effects)
*   Macroscopic vs. Microscopic (Zones, Flows vs. Individuals, Vehicles)

### Process

*   Stochastic vs. Deterministic
*   Linear vs. Nonlinear
*   Continuous vs. Discrete
*   Numerical Simulation vs. Closed Form Solution
*   Equilibrium vs. Disequilibrium

### Type

*   Behavioral vs. Aggregate Model
*   Physical vs. Mathematical Models

## Solution Techniques

When solving the model, the system as a whole must be understood. Several questions arise:

*   Does the solution exist?
*   Is the solution unique?
*   Is the solution feasible?

Solution techniques often trade-off accuracy vs. speed. Some solution techniques may only guarantee a local optima, while others (such as brute force techniques) can guarantee a global optimum, but may be much slower.

## “Four-Step” Urban Transportation Planning Models

We want to answer a number of related questions (who, what, where, when, why, and how):

*   Who is traveling or what is being shipped?
*   Where are the origin and destination of those trips, shipments?
*   When do those trips begin and end (how long do they take, how far away are the trip ends)?
*   Why are the trips being made, what is their purpose?
*   How are the trips getting there, what routes or modes are they taking?

If we know the answers to those questions, we want to know what are the answers to those questions a function of?

*   Cost: Money, Time spent on the trip,
*   Cost: Money and Time of alternatives.
*   Benefit (utility) of trip (e.g. the activity at the destination)
*   Benefit of alternatives

The reason for this is to understand what will happen under various circumstances:

*   How much “induced demand” will be generated if a roadway is expanded?
*   How many passengers will be lost if bus services are cut back?
*   How many people will be “priced off” if tolls are implemented?
*   How much traffic will a new development generate?
*   How much demand will I lose if I raise shipping costs to my customers?

In short, for urban passenger travel, we are trying to predict the number of trips by:

*   Origin Activity,
*   Destination Activity,
*   Origin Zone,
*   Destination Zone,
*   Mode,
*   Time of Day, and
*   Route.

This is clearly a multidimensional problem.

In practice, the mechanism to do this is to employ a "four-step" urban transportation planning model, each step will be detailed in subsequent modules. These steps are executed in turn, though there may be feedback between steps:

*   Trip Generation - How many trips \(T_i\) or \(T_j\) are entering or leaving zone \(i\) or \(j\)
*   Trip Distribution or Destination Choice - How many trips \(T_{ij}\) are going from zone \(i\) to zone \(j\)
*   Mode Choice - How many trips \(T_{ijm}\) from \(i\) to \(j\) are using mode \(m\)
*   Route Choice - Which links are trips \(T_{ijmr}\) from \(i\) to \(j\) by mode \(m\) using route \(r\)

## Thought Questions

*   Is past behavior reflective of future behavior?
*   Can the future be predicted?
*   Is the future independent of decisions, or are prophecies self-fulfilling?
*   How do we know if forecasts were successful?
*   Against what standard are they to be judged?
*   What values are embedded in the planning process?
*   What happens when values change?

## Additional Problems

Homework

1. Explain the four-step transportation planning model?

2. What are the outputs of the planning model and what they are used for?

3. What are the strength and weaknesses of this type of the forecasting procedure?

4. List 4 applications of transportation planning models.

5. List 4 typical data sources used in estimating, calibrating, and validating transportation planning models.

6. What is the rational planning model, and how does the four-step transportation planning model relate to it?

7. Identify 5 ways in which the conventional 4-step transportation planning model is imperfect.

Additional Problems

1.  List five inputs to transportation planning models – are they measured or forecast?
2.  Why is modeling important, (give reasons, purposes of modeling)?
3.  What would be a possible complication or problem that would arise if in the planning of a project no forecasting was used?
4.  What are the steps in the rational planning model?
5.  Why is the rational planning model not always used (examples when it is not used)?
6.  What are some of the factors preventing accurate forecasting?
7.  List the steps in the four-step urban transportation planning model?
8.  Explain the advantages and disadvantages of public vs. privately owned transportation?
9.  What types of matrices are there in the transportation model, how do they differ?
10.  How does the effect of population increase effect transportation planning?
11.  What are the step in the generic modeling process?
12.  Are all transportation modes publicly owned? Give examples of public and private.
13.  When would it be reasonable to use the rational planning model?
14.  What significance does the equilibrium point in transportation economics have in design?
15.  What makes forecasting with one method better than another, and how are differences resolved?
16.  How do measured inputs affect the forecasting inputs?
17.  What is the idealized model to plan for a transportation project?
18.  On what type of economic model does transportation depend?
19.  Who, other than planners and engineers, should be involved in defining the needs and objectives for future projects?
20.  Can we steer development and growth trends through transportation planning decision?
21.  Give three examples of intermodalism?
22.  Are actual transportation routes planned using the Rational Planning model?
23.  List at least 10 things that must be considered before undertaking a major transit project?
24.  How is the rational planning model used?
25.  Why do we combine vector matrices to a full matrix?
26.  Is household income measured or forecast?
27.  What statistical methods play a role in transportation engineering/planning?
28.  Who measures transit use or travel times?
29.  What is a zone centroid?
30.  What is forecasting?
31.  How are various transportation needs provided?
32.  What is considered a carrier?
33.  How does vehicle occupancy influence our design process?
34.  Is rational planning process more likely to be used on major projects or small ones?
35.  What are the axes labels on the supply / demand curve?
36.  Explain why all forecasts are wrong?
37.  How does supply and demand work? How do they relate?
38.  How does intermodealism affect forecasting?
39.  What is the difference between modalism and intermodalism?

## Key Terms

*   Rational Planning
*   Transportation planning model
*   Matrix, Full Matrix, Vector Matrix, Scalar Matrix
*   Trip table
*   Travel time matrix
*   Origin, Destination
*   Purpose
*   Network
*   Zone (Traffic Analysis Zone or Transportation Analysis Zone, or TAZ)
*   External station or external zone
*   Centroid
*   Node
*   Link
*   Turn
*   Route
*   Path
*   Mode

## Video
