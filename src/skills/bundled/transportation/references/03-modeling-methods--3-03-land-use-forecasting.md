# 3.3: Land Use Forecasting

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/03%3A_Modeling_Methods/3.03%3A_Land_Use_Forecasting

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

**Land use forecasting** undertakes to project the distribution and intensity of trip generating activities in the urban area. In practice, land use models are demand driven, using as inputs the aggregate information on growth produced by an aggregate economic forecasting activity. Land use estimates are inputs to the transportation planning process.

The discussion of land use forecasting to follow begins with a review of the Chicago Area Transportation Study (CATS) effort. CATS researchers did interesting work, but did not produce a transferable forecasting model, and researchers elsewhere worked to develop models. After reviewing the CATS work, the discussion will turn to the first model to be widely known and emulated: the Lowry model developed by Ira S. Lowry when he was working for the Pittsburgh Regional Economic Study. Second and third generation Lowry models are now available and widely used, as well as interesting features incorporated in models that are not widely used.

Today, the transportation planning activities attached to metropolitan planning organizations are the loci for the care and feeding of regional land use models. In the US, interest in and use of models is spotty, for most agencies are concerned with short run planning and day-to-day decisions. Interest is higher in Europe and elsewhere.

Even though there isn’t much use of full blown land use modeling in the US today, we need to understand the subject: the concepts and analytic tools pretty much define how land use-transportation matters are thought about and handled; there is a good bit of interest in the research community where there have been important developments; and when the next upturn in infrastructure development comes along the present models will form the starting place for work.

## Land Use Analysis at the Chicago Area Transportation Study

In brief, the CATS analysis of the 1950s was “by mind and hand” distribute growth. The product was maps developed with a rule-based process. The rules by which land use was allocated were based on state-of-the art knowledge and concepts, and it hard to fault CATS on those grounds. The CATS took advantage of Colin Clark’s extensive work on the distribution of population densities around city centers. Theories of city form were available, sector and concentric circle concepts, in particular. Urban ecology notions were important at the University of Chicago and University of Michigan. Sociologists and demographers at the University of Chicago had begun its series of neighborhood surveys with an ecological flavor. Douglas Carroll, the CATS director, had studied with Amos Hawley, an urban ecologist at Michigan.

![Stylized Urban Density Gradient](https://upload.wikimedia.org/Wikipedia/commons/thumb/2/29/DensityGradient.png/350px-DensityGradient.png)

Colin Clark studied the population densities of many cities, and he found traces similar to those in the figure. Historic data show how the density line has changed over the years. To project the future, one uses changes in the parameters as a function of time to project the shape of density in the future, say in 20 years. The city spreads glacier-like. The area under the curve is given by population forecasts.

The CATS did extensive land use and activity surveys, taking advantage of the City work done by the Chicago Planning Commission. Hock’s work forecasting activities said what the land uses-activities were that would be accommodated under the density curve. Existing land use data were arrayed in cross section. Land uses were allocated in a manner consistent with the existing pattern.

The study area was divided into transportation analysis zones: small zones where there was a lot of activity, larger zones elsewhere. The original CATS scheme reflected its Illinois State connections. Zones extended well away from the city. The zones were defined to take advantage of Census data at the block and minor civil division levels. They also strove for homogeneous land use and urban ecology attributes.

The first land use forecasts at CATS arrayed developments using “by hand” techniques, as stated. We do not fault the “by hand” technique – the then state of computers and data systems forced it. It was a rule based land use allocation. Growth was the forcing function, as were inputs from the economic study. Growth said that the population density envelope would have to shift. The land uses implied by the mix of activities were allocated from “Where is the land available?” and “What’s the use now?” Considerations. Certain types of activities allocate easily: steel mills, warehouses, etc.

Conceptually, the allocation rules seem important. There is lot of spatial autocorrelation in urban land uses; it’s driven by historical path dependence: this sort of thing got started here and seeds more of the same. This autocorrelation was lost somewhat in the step from “by hand” to analytic models.

The CATS procedure was not viewed with favor by the emerging Urban Transportation Planning professional peer group, and in the late 1950s there was interest in the development of analytic forecasting procedures. At about the same time, similar interests emerged to meet urban redevelopment and sewer planning needs, and interest in analytic urban analysis emerged in political science, economics, and geography.

## Lowry Model

![Flowchart of Lowry Model](https://upload.wikimedia.org/Wikipedia/commons/thumb/c/c5/LowryModel.png/600px-LowryModel.png)

Hard on the heels of the CATS work, several agencies and investigators began to explore analytic forecasting techniques, and between 1956 and the early 1960s a number of modeling techniques evolved. Irwin (1965) provides a review of the status of emerging models. One of the models, the Lowry model, was widely adopted.

Supported at first by local organizations and later by a Ford Foundation grant to the RAND Corporation, Ira S. Lowry undertook a three-year study in the Pittsburgh metropolitan area. (Work at RAND will be discussed later.) The environment was data rich, and there were good professional relationships available in the emerging emphasis on location and regional economies in the Economics Department at the University of Pittsburgh under the leadership of Edgar M. Hoover. The structure of the Lowry model is shown on the flow chart.

The flow chart gives the logic of the Lowry model. It is demand driven. First, the model responds to an increase in basic employment. It then responds to the consequent impacts on service activities. As Lowry treated his model and as the flow chart indicates, the model is solved by iteration. But the structure of the model is such that iteration is not necessary.

Although the language giving justification for the model specification is an economic language and Lowry is an economist, the model is not an economic model. Prices, markets, and the like do not enter.

A review of Lowry’s publication will suggest reasons why his approach has been widely adopted. The publication was the first full elaboration of a model, data analysis and handling problems, and computations. Lowry’s writing is excellent. He is candid and discusses his reasoning in a clear fashion. One can imagine an analyst elsewhere reading Lowry and thinking, “Yes, I can do that.”

The diffusion of innovations of the model is interesting. Lowry was not involved in consulting, and his word of mouth contacts with transportation professionals were quite limited. His interest was and is in housing economics. Lowry did little or no “selling.” We learn that people will pay attention to good writing and an idea whose time has come.

The model makes extensive use of gravity or interaction decaying with distance functions. Use of “gravity model” ideas was common at the time Lowry developed his model; indeed, the idea of the gravity model was at least 100 years old at the time. It was under much refinement at the time of Lowry’s work; persons such as Alan Voorhees, Mort Schneider, John Hamburg, Roger Creighon, and Walter Hansen made important contributions. (See Carrothers 1956).

The Lowry Model provided a point of departure for work in a number of places. Goldner (1971) traces its impact and modifications made. Steven Putnam at the University of Pennsylvania used it to develop PLUM (Projective Land Use Model) and I(incremental)PLUM. We estimate that Lowry derivatives are used in most MPO studies, but most of today’s workers do not recognize the Lowry heritage, the derivatives are one or two steps away from the mother logic.

## Penn-Jersey Model

![Flowchart of Penn-Jersey land use forecasting model](https://upload.wikimedia.org/Wikipedia/commons/thumb/e/e0/Penn-Jersey.png/600px-Penn-Jersey.png)

The P-J (Penn-Jersey, greater Philadelphia area) analysis had little impact on planning practice. It will now be discussed, even so, because it illustrates what planners might have done, given available knowledge building blocks. It is an introduction to some of the work by researchers who are not practicing planners.

The P-J study scoped widely for concepts and techniques. It scoped well beyond the CATS and Lowry efforts, especially taking advantage of things that had come along in the late 1950s. It was well funded and viewed by the State and the Bureau of Public Roads as a research and a practical planning effort. Its Director’s background was in public administration, and leading personnel were associated with the urban planning department at the University of Pennsylvania. The P-J study was planning and policy oriented.

The P-J study drew on several factors "in the air". First, there was a lot of excitement about economic activity analysis and the applied math that it used, at first, linear programming. T. J. Koopmans, the developer of activity analysis, had worked in transportation. There was pull for transportation (and communications) applications, and the tools and interested professionals were available.

There was work on flows on networks, through nodes, and activity location. Orden (1956) had suggested the use of conservation equations when networks involved intermediate modes; flows from raw material sources through manufacturing plants to market were treated by Beckmann and Jacob Marschak (1955) and Goldman (1958) had treated commodity flows and the management of empty vehicles.

Maximal flow and synthesis problems were also treated (Boldreff 1955, Gomory and Hu 1962, Ford and Fulkerson 1956, Kalaba and Juncosa 1956, Pollack 1964). Balinski (1960) considered the problem of fixed cost. Finally, Cooper (1963) considered the problem of optimal location of nodes. The problem of investment in link capacity was treated by Garrison and Marble (1958) and the issue of the relationship between the length of the planning time-unit and investment decisions was raised by Quandt (1960) and Pearman (1974).

A second set of building blocks was evolving in location economics, regional science, and geography. Edgar Dunn (1954) undertook an extension of the classic von Thünen analysis of the location of rural land uses. Also, there had been a good bit of work in Europe on the interrelations of economic activity and transportation, especially during the railroad deployment era, by German and Scandinavian economists. That work was synthesized and augmented in the 1930’s by August Lösch, and his The Location of Economic Activities was translated into English during the late 1940s. Edgar Hoover’s work with the same title was also published in the late 1940s. Dunn’s analysis was mainly graphical; static equilibrium was claimed by counting equations and unknowns. There was no empirical work (unlike Garrison 1958). For its time, Dunn’s was a rather elegant work.

William Alonso’s (1964) work soon followed. It was modeled closely on Dunn’s and also was a University of Pennsylvania product. Although Alonso’s book was not published until 1964, its content was fairly widely known earlier, having been the subject of papers at professional meetings and Committee on Urban Economics (CUE) seminars. Alonso’s work became much more widely known than Dunn’s, perhaps because it focused on “new” urban problems. It introduced the notion of bid rent and treated the question of the amount of land consumed as a function of land rent.

Wingo (1961) was also available. It was different in style and thrust from Alonso and Dunn’s books and touched more on policy and planning issues. Dunn’s important, but little noted, book undertook analysis of location rent, the rent referred to by Marshall as situation rent. Its key equation was:

\[R-Y(P-c)-Ytd\]

where: _R_ = rent per unit of land, _P_ = market price per unit of product, _c_ = cost of production per unit of product, _d_ = distance to market, and _t_ = unit transportation cost.

In addition, there were also demand and supply schedules.

This formulation by Dunn is very useful, for it indicates how land rent ties to transportation cost. Alonso’s urban analysis starting point was similar to Dunn’s, though he gave more attention to market clearing by actors bidding for space.

The question of exactly how rents tied to transportation was sharpened by those who took advantage of the duality properties of linear programming. First, there was a spatial price equilibrium perspective, as in Henderson (1957, 1958) Next, Stevens (1961) merged rent and transportation concepts in a simple, interesting paper. In addition, Stevens showed some optimality characteristics and discussed decentralized decision-making. This simple paper is worth studying for its own sake and because the model in the P-J study took the analysis into the urban area, a considerable step.

Stevens 1961 paper used the linear programming version of the transportation, assignment, translocation of masses problem of Koopmans, Hitchcock, and Kantorovich. His analysis provided an explicit link between transportation and location rent. It was quite transparent, and it can be extended simply. In response to the initiation of the P-J study, Herbert and Stevens (1960) developed the core model of the P-J Study. Note that this paper was published before the 1961 paper. Even so, the 1961 paper came first in Stevens’ thinking.

The Herbert-Stevens model was housing centered, and the overall study had the view that the purpose of transportation investments and related policy choices was to make Philadelphia a good place to live. Similar to the 1961 Stevens paper, the model assumed that individual choices would lead to overall optimization.

The P-J region was divided into _u_ small areas recognizing _n_ household groups and _m_ residential bundles. Each residential bundle was defined on the house of apartment, the amenity level in the neighborhood (parks, schools, etc.), and the trip set associated with the site. There is an objective function:

\[max Z = \displaystyle \sum_{k=1}^u \displaystyle \sum_{i=1}^n \displaystyle \sum_{h=1}^m x_{ih}^k(b_{ih}-c_{ih}^k)\]

\[x_{ih}^k \ge 0\]

wherein xihk is the number of households in group _i_ selecting residential bundle _h_ in area _k_. The items in brackets are bih (the budget allocated by _i_ to bundle _h_) and cihk, the purchase cost of _h_ in area _k_. In short, the sum of the differences between what households are willing to pay and what they have to pay is maximized; a surplus is maximized. The equation says nothing about who gets the surplus: it is divided between households and those who supply housing in some unknown way. There is a constraint equation for each area limiting the land use for housing to the land supply available.

\[\displaystyle \sum_{i=1}^n \displaystyle \sum_{h=1}^m s_{ih}x_{ih}^k \le L^k\]

where: sih = land used for bundle _h_ Lk = land supply in area _k_

And there is a constraint equation for each household group assuring that all folks can find housing.

\[\displaystyle \sum_{k=1}^u \displaystyle \sum_{h=1}^m x_{ih}^k = N_i\]

where: _Ni_ = number of households in group _i_

A policy variable is explicit, the land available in areas. Land can be made available by changing zoning and land redevelopment. Another policy variable is explicit when we write the dual of the maximization problem, namely:

\[min Z'= \displaystyle \sum_{k=1}^u r^kL^k+ \displaystyle \sum_{i=1}^n v_i(-N_i)\]

Subject to:

\[s_{ih}r^k-v_i \ge b_{ih}-c_{ih}^k\]

\[r^k \ge 0\]

The variables are _rk_ (rent in area _k_) and _vi_ an unrestricted subsidy variable specific to each household group. Common sense says that a policy will be better for some than others, and that is reasoning behind the subsidy variable. The subsidy variable is also a policy variable because society may choose to subsidize housing budgets for some groups. The constraint equations may force such policy actions.

It is apparent that the Herbert-Stevens scheme is a very interesting one. Its also apparent that it is housing centered, and the tie to transportation planning is weak. That question is answered when we examine the overall scheme for study, the flow chart of a single iteration of the model. How the scheme works requires little study. The chart doesn’t say much about transportation. Changes in the transportation system are displayed on the chart as if they are a policy matter.

The word “simulate” appears in boxes five, eight, and nine. The P-J modelers would say, “We are making choices about transportation improvements by examining the ways improvements work their way through urban development. The measure of merit is the economic surplus created in housing.”

Academics paid attention to the P-J study. The Committee on Urban Economics was active at the time. The committee was funded by the Ford Foundation to assist in the development of the nascent urban economics field. It often met in Philadelphia for review of the P-J work. Stevens and Herbert were less involved as the study went along. Harris gave intellectual leadership, and he published a fair amount about the study (1961, 1962). However, the P-J influence on planning practice was nil. The study didn’t put transportation up front. There were unsolvable data problems. Much was promised but never delivered. The Lowry model was already available.

## Kain Model

![Figure - Causal arrow diagram illustrating Kain’s econometric model for transportation demand](https://upload.wikimedia.org/Wikipedia/commons/0/04/KainModel.png)

About 1960, the Ford Foundation made a grant to the RAND Corporation to support work on urban transportation problems (Lowry’s work was supported in part by that grant). The work was housed in the logistics division of RAND, where the economists at RAND were housed. The head of that division was then Charles Zwick, who had worked on transportation topics previously.

The RAND work ranged from new technology and the cost of tunneling to urban planning models and analyses with policy implications. Some of the researchers at RAND were regular employees. Most, however, were imported for short periods of time. The work was published in several formats: first in the RAND P series and RM series and then in professional publications or in book form. Often, a single piece of work is available in differing forms at different places in the literature.

In spite of the diversity of topics and styles of work, one theme runs through the RAND work – the search for economic policy guides. We see that theme in Kain (1962), which is discussed by de Neufville and Stafford, and the figure is adapted from their book.

Kain’s model dealt with direct and indirect affects. Suppose income increases. The increase has a direct effect on travel time and indirect affects through the use of land, auto ownership, and choice of mode. Work supported at RAND also resulted in Meyer, Kain and Wohl (1964). These parts of the work at RAND had considerable influence on subsequent analysis (but not so much on practice as on policy). John Meyer became President of the National Bureau of Economic Research and worked to refocus its lines of work. Urban analysis Kain-style formed the core of a several-year effort and yielded book length publications (see, e.g., G. Ingram, et al., The NBER Urban Simulation Model, Columbia Univ. Press, 1972). After serving in the Air Force, Kain moved to Harvard, first to redirect the Urban Planning Department. After a time, he relocated at the Kennedy School, and he, along with José A. Gómez-Ibáñez, John Meyer, and C. Ingram, lead much work in an economic-policy analysis style. Martin Wohl moved on from RAND, eventually, to Carnegie-Mellon University, where he continued his style of work (e.g. Wohl 1984).

## Policy Oriented Gaming

The notion that the impact of policy on urban development might be simulated was the theme for a conference at Cornell in the early 1960s; collegiums were formed, several streams of work emerged. Several persons developed rather simple (from today’s view) simulation games. Land use development was the outcome of gravitational type forces and the issue faced was that of conflicts between developers and planners when planners intervened in growth. CLUG and METROPOLIS are two rather well known products from this stream of work (they were the SimCity of their day); there must be twenty or thirty other similar planner vs. developer in the political context games. There seems to have been little serious attempt to analyze use of these games for policy formulation and decision-making, except for work at the firm Environmetrics.

Peter House, one of the Cornell Conference veterans, established Environmetrics early in the 1960s. It, too, started with relatively simple gaming ideas. Over about a ten-year period, the comprehensiveness of gaming devices was gradually improved and, unlike the other gaming approaches, transportation played a role in their formulation. Environmetrics’ work moved into the Environmental Protection Agency and was continued for a time at the EPA Washington Environmental Studies Center.

A model known as River Basin was generalized to GEM (General Environmental Assessment Model) and then birthed SEAS (Strategic Environmental Assessment Model) and SOS (Son of SEAS). There was quite a bit of development as the models were generalized, too much to be discussed here.

The most interesting thing to be noted is change in the way the use of the models evolved. Use shifted from a “playing games” stance to an “evaluate the impact of federal policy” stance. The model (both equations and data) is viewed as a generalized city or cities. It responds to the question: What would be the impact of proposed policies on cities?

An example of generalized question answering is LaBelle and Moses (1983) La Belle and Moses implement the UTP process on typical cities to assess the impact of several policies. There is no mystery why this approach was used. House had moved from the EPA to the DOE, and the study was prepared for his office.

## University of North Carolina

A group at Chapel Hill, mainly under the leadership of Stuart Chapin, began its work with simple analysis devices somewhat similar to those used in games. Results include Chapin (1965), Chapin and H. C. Hightower (1966) and Chapin and Weiss (1968). That group subsequently focused on (1) the ways in which individuals make tradeoffs in selecting residential property, (2) the roles of developers and developer decisions in the urban development process, and (3) information about choices obtained from survey research. Lansing and Muller (1964 and 1967) at the Survey Research Center worked in cooperation with the Chapel Hill Group in developing some of this latter information.

The first work was on simple, probabilistic growth models. It quickly moved from this style to game-like interviews to investigate preferences for housing. Persons interviewed would be given “money” and a set of housing attributes – sidewalks, garage, numbers of rooms, lot size, etc. How do they spend their money? This is an early version of the game The Sims. The work also began to examine developer behavior, as mentioned. (See: Kaiser 1972).

## Reviews and Surveys

In addition to reviews at CUE meetings and sessions at professional meetings, there have been a number of organized efforts to review progress in land use modeling. An early effort was the May 1965 issue of the Journal of the American Institute of Planners edited by B. Harris. The next major effort was a Highway Research Board Conference in June, 1967 (HRB 1968) and this was most constructive. This reference contains a review paper by Lowry, comments by Chapin, Alonso, and others. Of special interest is Appendix A, which listed several ways that analysis devices had been adapted for use. Robinson (1972) gives the flavor of urban redevelopment oriented modeling. And there have been critical reviews (e.g. Brewer 1973, Lee 1974). Pack (1978) addresses agency practice; it reviews four models and a number of case studies of applications. (See also Zettel and Carll 1962 and Pack and Pack 1977). The discussion above has been limited to models that most affected practice (Lowry) and theory (P-J, etc.) there are a dozen more that are noted in reviews. Several of those deal with retail and industry location. There are several that were oriented to urban redevelopment projects where transportation was not at issue.

## Discussion

Lowry-derived land use analysis tools reside in the MPOs. The MPOs also have a considerable data capability including census tapes and programs, land use information of varied quality, and survey experiences and survey-based data. Although large model work continues, fine detail analysis dominates agency and consultant work in the US. One reason is the requirement for environmental impact statements. Energy, noise, and air pollution have been of concern, and techniques special to the analysis of these topics have been developed. Recently, interest has increased in the uses of developer fees and/or other developer transportation related actions. Perceived shortages for funds for highways and transit are one motive for extracting resources or actions from developers. There’s also the long-standing ethic that those who occasion costs should pay. Finally, there is a small amount of theoretical or academic work. Small is the operative word. There are few researchers and the literature is limited.

The discussion to follow will first emphasize the latter, theory-oriented work. It will then turn to a renewed interest in planning models in the international arena. Modern behavioral, academic, or theory-based analysis of transportation and land use date from about 1965. By modern we mean analysis that derives aggregate results from micro behavior. First models were Herbert-Stevens in character. Similar to the P-J model, they:

*   Treated land as the constraining resource and land use choices given land rent variations as the critical behavior.
*   Imagined roles for policy makers.
*   Emphasized residential land uses and ignored interdependencies in land uses.
*   Used closed system, comparative statics ways of thinking.
*   And gave no special attention to transportation.

There have been three major developments subsequently:

1.  Consideration of transportation activities and labor and capital inputs in addition to land inputs,
2.  Efforts to use dynamic, open system ways of thinking, and
3.  Inquiry into how micro choice behavior yields macro results.

The Herbert-Stevens model was not a behavioral model in the sense that it did not try to map from micro to macro behavior. It did assume rational, maximizing behavior by locators. But that was attached to macro behavior and policy by assumed some centralized authority that provided subsidies. Wheaton (1974) and Anderson (1982) modified the Herbert-Stevens approach in different, but fairly simple, ways to deal with the artificiality of the Herbert-Stevens formulation.

An alternative to the P-J, Herbert-Stevens tradition was seeded when Edwin S. Mills, who is known as the father of modern urban economics, took on the problem of scoping more widely. Beginning with Mills (1972), Mills has developed a line of work yielding more publications and follow on work by others, especially his students.

Using a Manhattan geometry, Mills incorporated a transportation component in his analysis. Homogeneous zones defined by the transportation system were analyzed as positioned x integer steps away from the central zone via the Manhattan geometry. Mills treated congestion by assigning integer measures to levels of service, and he considered the costs of increasing capacity. To organize flows, Mills assumed a single export facility in the central node. He allowed capital-land rent trade offs yielding the tallest buildings in the central zones.

Stating this in a rather long but not difficult to understand linear programming format, Mills’ system minimizes land, capital, labor, and congestion costs, subject to a series of constraints on the quantities affecting the system. One set of these is the exogenously gives vector of export levels. Mills (1974a,b) permitted exports from non-central zones, and other modifications shifted the ways congestion is measured and allowed for more than one mode of transport.

With respect to activities, Mills introduced an input-output type coefficient for activities; aqrs, denotes land input q per unit of output r using production technique s. T.J. Kim (1979) has followed the Mills tradition through the addition of articulating sectors. The work briefly reviewed above adheres to a closed form, comparative statics manner of thinking. This note now will turn to dynamics.

The literature gives rather varied statements on what consideration of dynamics means. Most often, there is the comment that time is considered in an explicit fashion, and analysis becomes dynamic when results are run out over time. In that sense, the P-J model was a dynamic model. Sometimes, dynamics are operationalized by allowing things that were assumed static to change with time. Capital gets attention. Most of the models of the type discussed previously assume that capital is malleable, and one considers dynamics if capital is taken as durable yet subject to ageing – e.g., a building once built stays there but gets older and less effective. On the people side, intra-urban migration is considered. Sometimes too, there is an information context. Models assume perfect information and foresight. Let’s relax that assumption.

Anas (1978) is an example of a paper that is “dynamic” because it considers durable capital and limited information about the future. Residents were mobile; some housing stock was durable (outlying), but central city housing stock was subject to obsolescence and abandonment.

Persons working in other traditions tend to emphasize feedbacks and stability (or the lack of stability) when they think “dynamics,” and there is some literature reflecting those modes of thought. The best known is Forester (1968), which set off an enormous amount of critique and some follow on thoughtful extensions (e.g., Chen (ed), 1972)

Robert Crosby in the University Research Office of the US DOT was very much interested in the applications of dynamics to urban analysis, and when the DOT program was active some work was sponsored (Kahn (ed) 1981). The funding for that work ended, and we doubt if any new work was seeded.

The analyses discussed use land rent ideas. The direct relation between transportation and land rent is assumed, e.g., as per Stevens. There is some work that takes a less simple view of land rent. An interesting example is Thrall (1987). Thrall introduces a consumption theory of land rent that includes income effects; utility is broadly considered. Thrall manages both to simplify analytic treatment making the theory readily accessible and develop insights about policy and transportation.

Wachs summarizes Lee's (1973) "Requiem for Large Scale Models."

Note

Lee couched his argument, as many of you will recall, in terms of what he called the seven deadly sins of modeling. The seven sins were:

1) Hypercomprehensiveness: Meaning that the models tried to replicate too complex a system in a single shot, and were expected to serve too many different purposes at the same time.

2) Grossness: In a way, the converse of hypercomprehensiveness. Even though they tried to do too much and serve too many purposes, their results or outputs were too coarse and aggregate, too simplistic to be useful for complicated and sophisticated policy requirements.

3) Data Hungriness: Even to produce, gross outputs (a few variables), the models required us to input many variables for many geographic units, and from at least several time periods in order to produce approximate projections, and very often we could not afford the data collection efforts needed to run the models. In other instances, data simply didn't exist at the levels of specificity which would be appropriate to run them.

4) Wrongheadedness: Lee meant that the models suffered from substantial and largely unrecognized deviations between the behavior claimed for them and the variables and equations which actually determined their behavior. As an example, when regional averages were used to calibrate models, but forecasts were made for local areas, the models deviated from reality because of specification errors which were often not even recognized by their users.

5) Complicatedness: Even though when you looked at them through one set of lenses the models seemed terribly simplistic, when looked at through another set of lenses they were outrageously complex. Too simplistic in replicating urban economic and social processes, the models were too complex in their computational algorithms. Errors were multiplied because there were so many equations, spatial units, and time periods. Even the theoretical notion of the model or its representation of an urban process was grossly simplistic compared with reality. Often, the user didn't know how the errors were propagated through series of sequential operations; and sometimes we needed to use systematic adjustments or "correction factors" to make the models more realistic even though we did not completely comprehend the sources of all the errors and could not interpret the correction factors in real-world terms.

6) Mechanicalness: Lee meant that we routinely went through many steps in a modeling process without completely understanding why we did so, and without fully comprehending the consequences in terms of validity or error magnification. He stated, for example, that even rounding errors could be compounded beyond reasonable bounds by mechanical steps taken to calibrate and apply many models without the user's knowledge.

7) Expensiveness: The costs of the models, derived from their grossness, data hungriness, complicatedness, and so on, placed them beyond the financial means of many agencies, or depleted the resources of agencies so much that the very use of models precluded having the resources available to improve them or to fine tune them to make them appropriate to their applications.

Lee argued in 1973 that the models should be improved in four ways:

1) Models should be made more transparent to users and policymakers.

2) Models should combine strong theoretical foundations, objectives information, and wisdom or good judgment. Without these elements, they remain exercises in empty-headed empiricism, abstract theorizing, or false consciousness of what is actually going on in our urban areas.

3) We should start with problems and match our methods to the needs of particular situations, gathering no more information and using no more modeling complexity than is really needed.

4) We should build the simplest models possible, since complex models do not work well, and certainly are unlikely to be understood by those who are asked to act on the basis of the model outputs.

– Martin Wachs, _Keynote Address: Evolution and Objectives of the Travel Model Improvement Program_, in Travel Model Improvement Program Conference Proceedings August 14–17, 1994, edited by Shunk, Gordon and Bass, Patricia

John Landis, has responded about seven challenges facing large scale models:

1.  Models - microbehavioral (actors and agents) ... Social Benefit/Social Action
2.  Simulation - multiple movies/scenarios
3.  Respond to constraints and investments
4.  Nonlinearity - path dependence in non-artifactual way (structure and outcomes, network effects)
5.  spatial vs. real autocorrelation, emergence - new dynamics, threshold network effects
6.  preference utility diversity and change over time
7.  Useful beyond calibration periods. Embed innovators and norming agents. Strategic and response function.
