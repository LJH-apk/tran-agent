# 3.1: Agent-based Modeling

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/03%3A_Modeling_Methods/3.01%3A_Agent-based_Modeling

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

**Agent-based modeling**

Transportation engineers and planners rely on transportation forecasting models to address a wide range of increasingly complicated issues, from congestion and air quality, to social equity concerns. Two major strands of travel demand models have emerged over the past several decades, trip-based and activity-based approaches.

The traditional four-step travel demand model, often referred to as the trip-based approach, takes individual trips as the elementary subjects and considers aggregate travel choices in four steps: trip generation, trip distribution, modal split, and route assignment. This sequential travel demand modeling paradigm, which originated in the 1950s when limited data, computational power, and algorithms were available, ignores the diversity across individuals and does not have solid foundation in travel behavior theory. Discrete choice analysis, describes travel demand as a multi-dimensional hierarchical choice process, including residential and business location choice, trip origin, trip destination, travel modes and etc. Although discrete choice models could improve travel demand prediction by classifying travelers according to certain attributes such as age, gender and household incomes, it still in the end focuses on aggregate travel behaviors and ignores individual decision-making processes. Another flaw of four-step model lies in the fact that this sequential modeling process ignores the interaction between steps and could not predicts certain phenomenon such as induced travel or demand, which can be thought of as a feedback from traffic assignment to trip generation, distribution, and mode split. Although introducing feedback and iteratively applying four-step approach could mitigate this problem, researchers believe that a coherent framework should be introduced to address four steps simultaneously.

To overcome these inadequacies of conventional four-step modeling, activity-based models have been applied in travel demand analysis since the 1970s. Activity-based models predict activities and related travel choices by considering time and space constraints as well as individual characteristics. Individuals will follow a sequence of activities and make corresponding trips connecting those activities to maximize their utilities. Macroscopic travel patterns are predicted through aggregation of individual travel choice.

Although activity-based models have the potential to bridge the gap between individual decision-making processes and macroscopic travel demand, these models require solving many optimization problems simultaneously, which is computationally difficult and behaviorally unrealistic. Therefore, some models employs external aggregate methods such as User Equilibrium (Deterministic (DUE) or Stochastic (SUE)) to address route choice, which compromises their claims as microscopic decision-making models.

The agent-based travel demand model has emerged as a new generation of transportation forecasting tools and provides an alternative to address the topic of travel demand modeling. This modeling approach is flexible and capable to model individual decision making process. There have been many applications of agent-based model in transportation (Transportation Research Part C (2002) dedicated a special issue to this topic). This modeling strategy, however, has not yet been widely adopted in travel demand modeling practice.

To build a pedagogically appropriate model, this chapter introduces an Agent-based Demand and Assignment Model (ADAM), extending Zhang and Levinson (2004), which addresses the destination choice and route choice problems with consideration of congestion. Students have the opportunity to work with the ADAM model for several exercises.

## Introduction to agent-based models for transport

While agent-based models are not commonly used in travel demand forecasting as such, many activity-based models are agent-based models of a sort, at least in part, though the behaviors of the agents are typically very complex. Historically, agent-based models come from different fields such as genetics, artificial intelligence, cognitive science, social science. The advantage of using them in transportation begins first with the intuition they provide. It makes more sense to people to think of individual travelers behaving rather than flows. This is in part because it is also more realistic, in that it can be formulated to capture the process by which travelers make decisions, and because it is tracking individuals, can be internally consistent (so that a given traveler has a particular set of constraints (like income, obligations, and time available)

There are several elements in an agent-based model:

*   _Agents_ are like people who have characteristics, goals and behavioral rules. The actions of agents depend on the environment they inhabit.
*   The _environment_ provides a space where agents live. The environment is shaped by the actions of agents.
*   _Interaction rules_ describe how agents and the environment interact

An agent-based model evolves by itself once those micro-level elements are specified. Macro-level properties emerge from this evolutionary process.

An exploratory agent-based model is presented below. The advantage of this model is its simplicity. Clearly, it will lose some predictive detail, but hopefully gives you a flavor of the kinds of modeling approaches and things that can be modeled with agent-based models in the realm of travel demand.

## Agent-based Demand and Assignment Model (ADAM)

The agent-based modeling approach assumes that aggregate urban travel demand patterns emerge from multi-dimensional choice process of individuals. All agents have individual characteristics, goals, and rules of travel behaviors. Agents exchange information with the environment on their travel experiences and adjust their travel choices according to available information. In ADAM travelers are active agents and nodes are fixed point agents, while links comprise the environment.

ADAM can be thought of as modeling the AM commute. As shown in Figure 1, ADAM examines the status of each traveler after updating turning matrices at nodes. If a traveler has not found a satisfactory job (status = 1), that traveler will continue the random process of job searching following the rules presented later in this paper. The process will repeat until either all travelers have found jobs (chosen a destination) or some maximum number of iterations are reached. The key components of the agent-based model are introduced in turn below.

### Agents

Travelers aim to find a job on the network and a route leading from their origin to this destination with the lowest cost. In the searching process, each traveler visits a node and decides to either accept or reject a job available at that node according to rules discussed later in this paper. If they reject a job at that node, they proceed to another node. Travelers learn current link travel times in the neighborhood of the node when they visit a node through this link and they will only proceed through one link at each step. By accumulating link travel time information during the trip, travelers could derive travel cost between any two nodes they visited.

Nodes are geographic locations where links intersect in the real world. In this model, they also represent the abstract centroids of traffic zone where travelers originate from and are destined to. Furthermore, nodes are carriers of pooled, collective knowledge, including both shortest path information and attractiveness of adjacent nodes. Travelers would exchange knowledge with nodes once they arrived at a new node. The knowledge and exchanging behavior is an abstraction of information spread in a community and communications among travelers in the real world. Links represents roads in the real world and have attributes such as length, free flow travel time, and capacity. Links also provide information about traffic flow and travel time to travelers passing by, which abstracts travelers’ observation of traffic condition in the real world. Links impose geographic constraints to travelers since they are only able to visit adjacent nodes directly connected by a link with the node they are currently visiting.

### Rules

Rules are the most important attributes of an agent-based model, which drives the evolution of the model given initial condition. There are two fundamental rules in ADAM: turning rules for finding a destination and information exchange rules for improving paths.

#### Destination selection rules: Network Origin-Destination Exploration

The first element of ADAM is for each traveler, the discovery of a destination. The model which does this Network Origin-Destination Exploration (NODE) is described below.

Nodes provide turning guidance matrices to travelers, which decide the probability for each traveler to accept a job or proceed to the next node and which direction to go in the later case. Each node (![i](https://wikimedia.org/api/rest_v1/media/math/render/svg/add78d8608ad86e54951b8c8bd6c8d8416533d20)) has a set of supply nodes ![{\\displaystyle S(s\_{1}...s\_{S})}](https://wikimedia.org/api/rest_v1/media/math/render/svg/fb1e7b69a7dc9b7714d9742eea99bbf9a14a887f) and a set of demand nodes ![{\\displaystyle D(d\_{1},...,d\_{D})}](https://wikimedia.org/api/rest_v1/media/math/render/svg/733f07dc6edd7943a6899415fecdb1ee80a90ed2). Therefore, a ![{\\displaystyle SD}](https://wikimedia.org/api/rest_v1/media/math/render/svg/af326440837e67870d4bee5bf63f49c37c9d89c3) matrix will be provided and each term, ![{\\displaystyle p\_{s,d}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/67753943244ba5ace0c8045a4597967cb5392446) (for simplicity, ![i](https://wikimedia.org/api/rest_v1/media/math/render/svg/add78d8608ad86e54951b8c8bd6c8d8416533d20) is omitted), represents the probability to move from supply node ![s](https://wikimedia.org/api/rest_v1/media/math/render/svg/01d131dfd7673938b947072a13a9744fe997e632) to demand node ![d](https://wikimedia.org/api/rest_v1/media/math/render/svg/e85ff03cbe0c7341af6b982e47e9f90d235c66ab) .

(1) ![{\\displaystyle P=\\left\[{\\begin{matrix}{{p}\_{{{s}\_{1}},{{d}\_{1}}}}&{...}&{{p}\_{{{s}\_{1}},{{d}\_{D}}}}\\\\{...}&{...}&{...}\\\\{{p}\_{{{s}\_{S}},{{d}\_{1}}}}&{...}&{{p}\_{{{s}\_{S}},{{d}\_{D}}}}\\\\\\end{matrix}}\\right\]}](https://wikimedia.org/api/rest_v1/media/math/render/svg/ca9593d5ea8a47c73692c285e5cfac15199b4288)

The probability is determined by many factors, including travelers’ characteristics (\(\Omega_t\)), the opportunity (or attractiveness) at the current node (\(b_i\)), the opportunity at demand nodes (\(b_d\)) and the ease of reaching those opportunities (\(A\)).

(2) \[P=f(\Omega_t,b_i,b_d,A)\]

Different definitions of turning probability reflect assumptions of different underlying decision-making processes of travelers regarding where to work and may lead to very different travel demand patterns on the network. Zhang and Levinson (2004) assumed that this probability is proportional to jobs available at each node and ignored the ease of reaching them (travel cost). Another disadvantage of this assumption is that if a node does not have available jobs, travelers will never search in this direction even though more jobs may be available via this node.

Extending Zhang and Levinson (2004), a Logit-form probability is used, where \(c_d\) represents travel cost to a destination while \(c_i\) is the corresponding intrazonal travel cost. The parameter \(\theta\) indicates the importance of travel cost when travelers evaluate possible destinations, while \(\beta\) is related to people’s relative willingness to travel. A larger \(\beta\) implies that travelers are more likely to accept jobs at current node, thus have a shorter travel length.

(3) \[p_{s,d}=0 {if} s=d\]

(4) \[p_{s,d}=\dfrac{b_de^{-\theta c_d}{\beta b_ie^\theta c_d+\displaystyle \sum_{d\epsilon,d\cancel=i}b_de^{-\thetac_d}}

(5) ![{\\displaystyle {{p}\_{s,d}}={\\frac {\\beta {{b}\_{d}}{{e}^{-\\theta {{c}\_{d}}}}}{\\beta {{b}\_{i}}{{e}^{-\\theta {{c}\_{d}}}}+\\sum \\limits \_{d\\in D,d\\neq i}^{}{{{b}\_{d}}{{e}^{-\\theta {{c}\_{d}}}}}}}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/2ff7dfdd6dcf5d755ed3051c11be455a4569aa57) if ![{\\displaystyle s\\neq d}](https://wikimedia.org/api/rest_v1/media/math/render/svg/46648edcbbf115f7398ad9c5c9ba62d6660803c4) and ![{\\displaystyle d\\neq i}](https://wikimedia.org/api/rest_v1/media/math/render/svg/afdec56e38cde8f198d7702cb7524174315ac41e)

The variable \(b_d\) reflects the opportunity or attractiveness of a node and can be further generalized beyond the number of jobs. We could define it as the summation of jobs on all nodes adjacent to node d, which abstracts the regional accessibility discussed in many previous studies (Handy, 1993). This definition could mitigate the aforementioned problem of search direction. Using accessibility to the whole network is another possibility. However, this may lead to essentially random search since accessibility to the whole network of nearby nodes may be quite similar. In this study we adopt regional accessibility as the indicator of attractiveness to next node, while willingness to accept a job (to stay) is proportional to jobs available at current node.

#### Path learning rule: Agent-based route choice

The other important rule in ADAM is the path learning rule. Travelers will learn travel cost of links on their travel route, while nodes keep information about the shortest path from itself to all other nodes which have been visited by travelers to that node. Once a traveler arrives at a new node, that traveler compares their knowledge about travel cost from the current node to each node on the traveler’s travel route. Both of them will keep the shorter "shortest path" after knowledge exchange. Although nodes originally have very limited knowledge about the routes in the remaining network, information spreads rapidly on the network. With the congested link travel time, which can be simply defined as any available travel time-flow relationship, each traveler’s choice will change the link travel time on the network and thus affect destination and route choice of other travelers. Travelers’ route adjustments will trigger more significant change on the network thus other travelers’ behavior. This mechanism reflects the complexity of the real world.

The initial route choice can be either given or generated by a random-walk route searching process at iteration 0. In the random walk scenario, travelers set off from their origins and travel in a randomly chosen direction, updating directions after arriving at each node. However, directed cycles and U-turns are prevented. Once travelers arrive at the destination, their travel routes become the initial travel route and will be updated in subsequent iterations. The randomness of searching direction and the large number of travelers will ensure the diversity of initial route choices, which comprises the knowledge based on subsequent iterations.

On subsequent iterations, each traveler follows a fixed route chosen at the end of the previous iteration. Once arriving at a destination centroid, travelers will enrich the information set with their individual knowledge while benefiting from the pooled knowledge at the same time by exchanging both shortest path and toll information with centroids. Those travelers will also bring that updated information back to their origin and repeat the exchange process. The information exchange mechanism is illustrated by Figure 1.

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/5/5c/Agent-based_route_choice_with_Learning_and_Exchange_of_Information.png/220px-Agent-based_route_choice_with_Learning_and_Exchange_of_Information.png)

Agent-based route choice with Learning and Exchange of Information (Illustration of specific model in wikibook Fundamentals of Transportation

As illustrated in Figure 1, suppose that the traveler originating at node 1 is traveling to node 5, initially via node 4. His initial shortest path knowledge is 1-3-4-5. Suppose the shortest path information stored at node 5 is 4-5, 3-5, 2-3-5 and 1-2-3-5, respectively from nodes 4, 3, 2 and 1. The comparison starts from the node closest to the current node along the path chain in traveler's memory and repeats for each node on this chain until reaching the origin. After comparing the path from node 3 to 5, the traveler's path information is updated to 1-3-5 since the shortest path for this path segment proposed by the node is shorter than that held by the traveler. Notice that this improvement has also changed the shortest path from node 1 to 5 in the traveler's memory. Consequently, the node will adopt the path from node 1 proposed by the traveler since 1-3-5 is better than 1-2-3-5. The updated path from node 1 to 5 then becomes part of the traveler's shortest path information. This information exchange mechanism will naturally mutate the path chain and generate the most efficient route, sometimes better than all known existing routes. Since nodes store K alternative paths, nodes will insert the path proposed by the visitor in their information pool as long as this path is better than the longest path stored. This information will also be shared with those travelers visiting node 5 at subsequent steps.

After stopping at the destination node, travelers compare their travel route determined at the end of previous iterations and shortest path learned during the currently iteration. The path length is evaluated in dollar value by each traveler, considering their individual value of time and the toll charged by each link segment. Since travelers have different values of time, the cost of K alternatives should be reevaluated and sorted for each traveler. If the path suggested by the destination node is better than their current route, the travelers have a probability to switch to the better route that iteration. In general,

\[P=f(\sigma,\Delta,T\]

To apply this model, we choose a specific form:

T}}\\\end{array}}{\rm {}}}\\\end{array}}{\rm {}}\\{\begin{array}{*{20}c}{P=0}&

ParseError: invalid DekiScript (click for details)

Callstack:
    at (Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/03:_Modeling_Methods/3.01:_Agent-based_Modeling), /content/body/div[2]/div[2]/div[2]/p[8]/span, line 1, column 1

\\\end{array}}{\rm {}}\\\end{array}}\right.}" src="[https://wikimedia.org/api/rest_v1/me...433bb7fd723077](https://wikimedia.org/api/rest_v1/media/math/render/svg/02578418a7259efb35fed43591433bb7fd723077 "https://wikimedia.org/api/rest_v1/media/math/render/svg/02578418a7259efb35fed43591433bb7fd723077")">

Where:

*   \(\Delta\) represents the potential benefit by switching routes, which is defined as the time or money saving by choosing route proposed by the destination node instead of sticking to the current route.
*   \(T\) is the threshold of benefit perception, which reflects both the incapability to perceive small benefit and the inertia for people to change route.
*   \(\sigma\) denotes the probability of perceiving an existing better route in a given day, and captures the differentiation in the effectiveness of social networks defines the shape of the probability curve.

ARC simulates the day-to-day route choice behavior of travelers and this probability curve must account for two factors:

1.  the probability a traveler perceives this better path once its information is available and
2.  the probability a traveler takes this path once it is learned. It should be noted that information spreading takes time and not everyone learns immediately.

Travelers with more effective social networks are more likely to be exposed to such information and thus have a higher probability of learning the better path. Once a new road opens, it takes weeks or even months before the flow reaches a stable level. Even when people learn a better alternative, route change involves a certain switching cost preventing travelers from changing routes immediately. Or travelers may just resist changing because of inertia. Considering these factors, this curve should increase as benefits increase and reach some upper limit predicted by the willingness to learn. Estimation of this curve through survey or other psychological studies will enhance the empirical foundation of the model.

Figure 2 illustrates the flow chart of ARC. After travelers choose their routes according to the aforementioned probability, link flow and link travel time will be updated. Consequently, the cost of all possible paths stored both at nodes and travelers will be updated without changing the choice set. Then travelers will follow their new route and repeat the described process until an equilibrium pattern is reached (equilibrium is defined here as link flow variance smaller than a pre-determined threshold \(\epsilon\), we arbitrarily choose \(\epsilon=5\). Once this equilibrium is reached, no traveler has the incentive to change their travel route according to their behavioral rules and available information. Thus a link flow pattern would be reached and could be provided to other model components under a more comprehensive framework.

### Iterations

Traditional travel demand models disentangled this complexity by formulating an optimization problem, using either Deterministic or Stochastic User Equilibrium. However, algorithms employed to solve such optimization problems are computationally cumbersome and behaviorally unrealistic. Instead, ADAM introduces a heuristic learning process to address this challenge. Under this framework, travelers will reenter the network and choose their destination and route again according to the link travel time resulting from their previous choices. Updated shortest path information will be learned and spread by travelers. This process mimics people’s job change and route change behavior. Given the initial condition, ADAM evolves with previously defined rules and a pattern may be achieved according to certain convergence rules, from which macroscopic information such as trip distribution and traffic assignment can be extracted by summing up individual choices.
