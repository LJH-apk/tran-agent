# 7.3: Earthwork

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/07%3A_Geometric_Design/7.03%3A_Earthwork

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

**Earthwork** is something that transportation projects seldom avoid. In order to establish a properly functional road, the terrain must often be adjusted. In many situations, geometric design will often involve minimizing the cost of earthwork movement. Earthwork is expressed in units of volumes (cubic meters in metric). Increases in such volumes require additional trucks (or more runs of the same truck), which cost money. Thus, it is important for designers to engineer roads that require very little earthwork.

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/7/78/Triaxle_dump_truck_2005-10-06.km.jpg/375px-Triaxle_dump_truck_2005-10-06.km.jpg)

The dump truck is amongst the equipment necessary for earthwork to occur

## Cross Sections and Volume Computation

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/4/4e/Cross-section.PNG/350px-Cross-section.PNG)

A Roadway Cross Section on otherwise Level Ground

To determine the amount of earthwork to occur on a given site, one must calculate the volume. For linear facilities, which include highways, railways, runways, etc., volumes can easily be calculated by integrating the areas of the cross sections (slices that go perpendicular to the centerline) for the entire length of the corridor. More simply, several cross sections can be selected along the corridor and an average can be taken for the entire length. Several different procedures exist for calculating areas of earthwork cross sections. In the past, the popular method was to draw cross sections by hand and use a planimeter to measure area. In modern times, computers use a coordinate method to assess earthwork calculations. To perform this task, points with known elevations need to be identified around the cross section. These points are considered in the (X, Y) coordinate plane, where X represents the horizontal axis paralleling the ground and Y represents the vertical axis that is elevation. Area can be computed with the following formula:

\[| A=\frac{1}{2} \sum_{i=1}^n X_i(Y_{i+1}-Y_{i-1} |\]

Where:

*   \(A\) = Area of Cross-Section
*   \(n\) = Number of Points on Cross Section (Note: n+1 = 1 and 1-1=n, for indexing)
*   \(X\) = X-Coordinate
*   \(Y\) = Y-Coordinate

With this, earthwork volumes can be calculated. The easiest means to do so would by using the average end area method, where the two end areas are averaged over the entire length between them.

\[V=\frac{A_1+A_2}{2}L\]

Where:

*   \(V\) = Volume
*   \(A_1\) = Cross section area of first side
*   \(A_2\) = Cross section area of second side
*   \(L\) = Length between the two areas

If one end area has a value of zero, the earthwork volume can be considered a pyramid and the correct formula would be:

\[V=\frac{AL}{3}\]

A more accurate formula would the prismoidal formula, which takes out most of the error accrued by the average end area method.

\[V_p=\frac{L(A_1+4A_m+A_2)}{6}\]

Where:

*   \(V_p\) = Volume given by the prismoidal formula
*   \(A_m\) = Area of a plane surface midway between the two cross sections

## Cut and Fill

Various sections of a roadway design will require bringing in earth. Other sections will require earth to be removed. Earth that is brought in is considered **Fill** while earth that is removed is considered **Cut**. Generally, designers generate drawings called Cut and Fill Diagrams, which illustrate the cut or fill present at any given site. This drawing is quite standard, being no more than a graph with site location on the X-axis and fill being the positive range of the Y-axis while cut is the negative range of the Y-axis.

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/2/24/CutFillDiagram.PNG/350px-CutFillDiagram.PNG)

A Typical Cut/Fill Diagram

## Mass Balance

Using the data for cut and fill, an overall mass balance can be computed. The mass balance represents the total amount of leftover (if positive) or needed (if negative) earth at a given site based on the design up until that point. It is a useful piece of information because it can identify how much remaining or needed earth will be present at the completion of a project, thus allowing designers to calculate how much expense will be incurred to haul out excess dirt or haul in needed additional. Additionally, a mass balance diagram, represented graphically, can aid designers in moving dirt internally to save money.

Similar to the cut and fill diagram, the mass balance diagram is illustrated on two axes. The X-axis represents site location along the roadway corridor and the Y-axis represents the amount of earth, either in excess (positive) or needed (negative).

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/d/d0/MassDiagram.PNG/350px-MassDiagram.PNG)

A Typical Mass Diagram (Note: Additional Dirt is Needed in this Example)

## Demonstrations

*   [Flash animation: Shrinkage (contributed by Oregon State University faculty and students)](http://street.umn.edu/flash_earthwork_shrink.html)
*   [Flash animation: Swell (contributed by Oregon State University faculty and students)](http://street.umn.edu/flash_earthwork_swell.html)

## Examples

Example 1: Computing Volume

A roadway is to be designed on a level terrain. This roadway is 150 meters in length. Four cross sections have been selected, one at 0 meters, one at 50 meters, one at 100 meters, and one at 150 meters. The cross sections, respectively, have areas of 40 square meters, 42 square meters, 19 square meters, and 34 square meters. What is the volume of earthwork needed along this road?

**Solution**

Three sections exist between all of these cross sections. Since none of the sections end with an area of zero, the average end area method can be used. The volumes can be computed for respective sections and then summed together.

Section between 0 and 50 meters:

\(V=\frac{A_1+A_2}{2}L=\frac{40 \text{ } m^2+42 \text{ } m^2}{2} \cdot 50 \text{ } m= 2050 \text{ } m^3\)

Section between 50 and 100 meters:

\(V=\frac{A_1+A_2}{2}L=\frac{42 \text{ } m^2+19 \text{ } m^2}{2} \cdot 50 \text{ } m= 1525 \text{ } m^3\)

Section between 100 and 150 meters:

\(V=\frac{A_1+A_2}{2}L=\frac{19 \text{ } m^2+34 \text{ } m^2}{2} \cdot 50 \text{ } m= 1325 \text{ } m^3\)

Total volume is found to be:

\(2050 \text{ } m^3 + 1525 \text{ } m^3 + 1325 \text{ } m^3=4900 \text{ }m^3\)

Example 2: Mass Balance

Given the following cut/fill profile for each meter along a 10-meter strip of road built on very, very hilly terrain, estimate the amount of dirt left over or needed for the project.

*   0 meters: 3 meters of fill
*   1 meter: 1 meter of fill
*   2 meters: 2 meters of cut
*   3 meters: 5 meters of cut
*   4 meters: 7 meters of cut
*   5 meters: 8 meters of cut
*   6 meters: 2 meters of cut
*   7 meters: 1 meter of fill
*   8 meters: 3 meters of fill
*   9 meters: 6 meters of fill
*   10 meters: 7 meters of fill

**Solution**

If 'cut' is considered an excess of available earth and 'fill' is considered a reduction of available earth, the problem becomes one of simple addition and subtraction.

\([(-3 \text{ }m)+(-1 \text{ } m)+ 2 \text{ } m+ 5 \text{ } m + 7 \text{ } m + 8 \text{ } m +2 \text{ } m+ (-1 \text{ } m)+ (-3 \text{ }m) + (-6 \text{ } m) +(-7 \text{ }m)] \cdot 1 \text{ }m^2 = 3 \text{ }m^3\)

3 m3 of dirt remain in excess.

## Thought Question

**Problem**

If it is found that the mass balance is indeed balanced (end value of zero), does that automatically mean that no dirt transport, either out of or into the site, is needed?

**Solution**

No. Any soil scientist will eagerly state that dirt type can change with location quite quickly, depending on the region. So, if half a highway cuts from the earth and the other half needs fill, the dirt pulled from the first half cannot be simply dumped into the second half, even if mathematically it balances. If the soil types are different, the exact numbers of volume needed may be different, as different soil types have different properties (settling, water storage, etc.). In the worse case, not consulting a soil scientist could result in your road being washed out!

Sample Problem

Given the end areas below, calculate the volumes of cut (in cubic meters) and fill between stations 0+00 and 2+50. Determine the true amount of excess cut or fill to be removed.

*   0+00: Fill = 60
*   0+50: Fill = 50
*   0+75: Cut = 0, Fill = 25
*   1+00: Cut = 10, Fill = 5
*   1+15: Cut = 15, Fill = 0
*   1+50: Cut = 30

**Answer**

wo different methods need to be used here to compute earthwork volumes along the five strips. The average end area method can be used for non-zero sections. The pyramid method needs to be used for areas with zero ends.

For 0+00 to 0+50, use average end area:

\(Fill=\frac{60+50}{2}(50)=2750\)

For 0+50 to 0+75, use average end area:

\(Fill=\frac{50+25}{2}(25)=937.5\)

For 0+75 to 1+00, use the average end area method for the fill section and the pyramid method for the cut section:

\(Fill=\frac{25+5}{2}(25)=375\)

\(Cut=\frac{10(25)}{3}=83.3\)

For 1+00 to 1+15, use the pyramid method for the fill section and the average end area method for the cut section:

\(Fill=\frac{5(15)}{3}=25\)

\(Cut=\frac{10+15}{2}(15)=187.5\)

For 1+15 to 1+50, use the average end area method:

\(Cut=\frac{15+30}{2}(35)=787.5\)

The sums of both cut and fill can be found:

Fill = 4087.5 cubic-meters

Cut = 1058.3 cubic-meters

Thus, 3029.2 cubic-meters of dirt are needed to meet the earthwork requirement for this project.

Homework

1. What is a Mass Diagram and why is it important? What are the units on the vertical axis of a Mass Diagram (Metric)?

2. Looking at a mass diagram, suppose you see that at Station 1+750 the ordinate equals -1000, at Station 1+780 the ordinate is -2750, and at Station 1+900 the ordinate is zero. A) Describe what happens between stations 1+750 and 1+780. B) If the project ends at Station 1+900, what can you conclude about the earthwork required for this project?

## Demonstrations

*   [Road construction and earthmoving](https://www.youtube.com/watch?v=klT8xJksuBw)

## Variables

*   \(A\) - Area of Cross-Section
*   \(n\) - Number of Points on Cross Section (Note: n+1 = 1 and 1-1=n, for indexing)
*   \(X\) - X-Coordinate
*   \(Y\) - Y-Coordinate
*   \(V\) - Volume
*   \(A_1\) - Cross section area of first side
*   \(A_2\) - Cross section area of second side
*   \(L\) - Length between the two areas
*   \(V_p\) - Volume given by the prismoidal formula
*   \(A_m\) - Area of a plane surface midway between the two cross sections

## Key Terms

*   Cut
*   Fill
*   Mass Balance
*   Area
*   Volume
*   Earthwork
*   Prismoidal Volume
