# 2.2: Data

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/02%3A_Planning_Models/2.02%3A_Data

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

There are a variety of types of transportation data used in analysis. Some are listed below:

*   Infrastructure Status
*   Traffic Counts
*   Travel Behavior Inventory
*   Land Use Inventory
*   Truck/Freight Demand
*   External/Internal Demand (by Vehicle Type)
*   Special Generators

## Revealed Preference

Household travel surveys which ask people what they actually did are a type of _Revealed Preference_ survey data that have been obtained by direct observation of the choice that individuals make with respect to travel behavior. _Travel Cost Analysis_ uses the prices of market goods to evaluate the value of goods that are not traded in the market.

_Hedonic Pricing_ uses the market price of a traded good and measures of its component attributes to calculate value. There are other methods to attain Revealed Preference information, but surveys are the most common in travel behavior.

### Travel Behavior Inventory

While the Cleveland Regional Area Traffic Study in 1927 was the first metropolitan planning attempt sponsored by the US federal government, the lack of comprehensive survey methods and standards at that time precluded the systematic collection of information such as travel time, origin and destination, and traffic counts. The first US travel surveys appeared in urban areas after the Federal-Aid Highway Act of 1944 permitted the spending of federal funds on urban highways.[[1]](https://en.wikibooks.org/wiki/Fundamentals_of_Transportation/Data#cite_note-1) A new home- interview origin-destination survey method was developed in which households were asked about the number of trips, purpose, mode choice, origin and destination of the trips conducted on a daily basis. In 1944, the US Bureau of Public Roads printed the Manual of Procedures for Home Interview Traffic Studies.[[2]](https://en.wikibooks.org/wiki/Fundamentals_of_Transportation/Data#cite_note-2) This new procedure was first implemented in several small to mid-size areas. Highway engineers and urban planners made use of the new data collected after the 1944 Highway Act extended federally sponsored planning to travel surveys as well as traffic counts, highway capacity studies, pavement condition studies and cost-benefit analysis.

Attributes of a household travel survey, or travel behavior inventory include:

*   Travel Diary of ~ 1% sample of population (all trips made on one day) every 10 years
*   Socioeconomic/demographic data of survey respondents
*   Collection methodology:
    *   Phone,
    *   Mail,
    *   In-Person at Home,
    *   In-Person at Work,
    *   Roadside

Many such surveys are available online at: [Metropolitan Travel Survey Archive](http://surveyarchive.org/)

Thought Question

What are the advantages and disadvantages of Revealed Preference surveys?

## Stated Preference

In contrast with revealed preference, _Stated preference_ is a group of techniques used to calculate the utility functions of transport options based on the response of an individual decision-maker to certain given options. The options generally are based on descriptions of the transport scenario or are constructed by the researcher

*   _Contingent valuation_ is based on the assumption that the best way to find out the value that an individual places on something is known by asking.
*   _Compensating variation_ is the compensating payment that leaves an individual as well off as before the economic change.
*   _Equivalent variation_ for a benefit is the minimum amount of money one would have to be compensated to leave the person as well as they would be after the change.
*   _Conjoint analysis_ refers to the application of the design of experiments to obtain the preferences of the individual, breaking the task into a list of choices or ratings that enable us to compute the relative importance of each of the attributes studied

Thought Question

What are the advantages and disadvantages of Stated Preference surveys?

## Pavement conditions

_adapted from Xie, Feng and David Levinson (2008) The Use of Road Infrastructure Data for Urban Transportation Planning: Issues and Opportunities. Published in Infrastructure Reporting and Asset Management Edited by Adjo Amekudzi and Sue McNeil. pp- 93-98. Publisher: American Society of Civil Engineers, Reston, Virginia._

Road infrastructure represents the supply side of an urban transportation system. Pavement condition is a critical indicator to the quality of road infrastructure in terms of providing a smooth and reliable driving environment on roads. A series of indices have been developed to evaluate the pavement conditions of road segments in their respective jurisdictions: Pavement Condition Index (PCI) is scored as a perfect roadway (100 points) minus point deductions for “distresses” that are observed; Present Serviceability Rating (PSR) is measured as vertical movement per unit horizontal movement (e.g. millimeters of vertical displacement per meter of horizontal displacement) as one drives along the road; (SR) Surface Rating is calculated by reviewing images of the roadway based on the frequency and severity of defects; Pavement Quality Index (PQI) is calculated using the PSR and SR to evaluate the general condition of the road. A high PQI (up to 4.5) means a road will most likely not need maintenance soon, whereas a low PQI means it can be selected for maintenance.

These indices of pavement quality are basic measures for road maintenance and preservation, for which each county develops its own performance standards to evaluate pavement conditions and make decisions on maintenance and preservation projects. Typically, pavement preservation projects are prioritized based on PCI of road segments: the lower the PCI, the higher the likelihood of selection. Taking Washington County, Minnesota as an example, the county has determined that a reasonable standard to maintain is an average PCI of 72. Thus any road segment with its PCI below 72 has a chance to be selected for preservation. Dakota County, Minnesota on the other hand, scores its preservation projects according to the measure of PQI: a road segment will be allocated 17 points (out of a possible 100) if its PQI falls lower than 3.1.

The pavement data structure is incompatible with the link-node structure of the planning road network used by the Metropolitan Council and other planning agencies. Typically, the measures of PCI, PSR, and PQI are stored in records indexed by “highway segment numbers” along each highway route. Highway sections with the same highway segment number are differentiated by their starting and ending stations. There is no exact match between highway segments in the actual road network and links in the planning network, as stationing is a position along the curved centerline of a highway while a planning network is a simplified structure consisting of only straight lines intersecting at points. Historic pavement data is generally unavailable in electronic format, although the information on pavement history such as pavement life and the duration since last repaving are important to estimate the cost of a preservation project, also affecting the decision whether a specific project will get selected and how much funding will be allocated.

## Traffic flow

Traffic conditions reflect the travel demand loaded on a given road infrastructure. Traffic flows on roads, together with road capacity, can be used to calculate the volume/capacity (V/C) ratio, which is an approximate indicator for the level of service of road infrastructure, and is commonly adopted by the jurisdictions in their respective decision making processes. The traffic flows on the planning road network are predicted by the transportation planning model, but the results have to be calibrated with actual traffic data.

Loop detectors are the primary technology currently employed in many US metropolitan areas to collect actual traffic data. E.g. In the Twin Cities of Minneapolis-St. Paul, about one thousand detector stations have been buried on major highways, through which Mn/DOT’s Traffic Management Center collects, stores, and makes public traffic data every 30 seconds, including measured volume (flow) and occupancy, and calculated speed data for each detector station. Although the estimates of Annual Average Daily Traffic (AADT) for the planning road network are readily available, loop detectors provide more accurate measures of traffic volume, since they are collecting real-time data on a continuous basis. It also allows for calibrating models to hourly rather than daily conditions.

Due to the limited ability to convert raw data collected by loop detectors, however, most forecasting models rely on AADT data. The raw data are stored in a 30- second interval in binary codes. For planning uses they have to be converted and aggregated into desired measures, such as peak hour average, average for a particular month or a particular season, etc, in a systematic way.

Another issue in integrating loop detector data into a planning road network is to match the detector stations with the links in planning networks. Similar to the problem encountered in translating pavement data, detectors are located along major highways and mapped on the actual geometry of the network, while the planning road network is a simplified structure with only straight lines.

## Sampling Issues (Statistics)

*   Sample Size,
*   Population of Interest
*   Sampling Method,
*   Error:
    *   Measurement,
    *   Sampling,
    *   Computational,
    *   Specification,
    *   Transfer,
    *   Aggregation
*   Bias,
*   Oversampling
*   Extent of Collection
    *   Spatial
    *   Temporal
*   Span of Data
    *   Cross-section,
    *   Time Series, and
    *   Panel

## Metadata

_Adapted from Levinson, D. and Zofka, Ewa. (2006) “The Metropolitan Travel Survey Archive: A Case Study in Archiving” in_ Travel Survey Methods: Quality and Future Directions, Proceedings of 5th International Conference on Travel Survey Methods _(Peter Stopher and Cheryl Stecher, editors)_

Metadata allows data to function together. Simply put, metadata is information about information – labeling, cataloging and descriptive information structured to permit data to be processed. Ryssevik and Musgrave (1999) argue that high quality metadata standards are essential as metadata is the launch pad for any resource discovery, maps complex data, bridges the gap between data producers and consumers, and links data with its resultant reports and scientific studies produced about it. To meet the increasing needs for the proper data formats and encoding standards, the World Wide Web Consortium (W3C) has developed the generic Resource Description Framework (RDF) (W3C 2002). RDF treats metadata more generally, providing a standard way to use Extended Markup Language (XML) to “represent metadata in the form of statements about properties and relationships of items” (W3C 2002). Resources can be almost any type of file, including of course, travel surveys. RDF delivers detailed and unified data description vocabulary.

Applying these tools specifically to databases, the Data Documentation Initiative (DDI) for Document Type Definitions (DTD) applies metadata standards used for documenting datasets. DDI was first developed by European and North American data archives, libraries and official statistics agencies. “The Data Documentation Initiative (DDI) is an effort to establish an international XML-based standard for the content, presentation, transport, and preservation of documentation for datasets in the social and behavioral sciences” (Data Documentation Initiative 2004). As this international standardization effort gathers momentum it is expected more and more datasets to be documented using DDI as the primary metadata format. With DDI, searching data archives on the Internet no longer depends on an archivist's skill at capturing the information that is important to researchers. The standard of data description provides sufficient detail sorted in a user-friendly manner.
