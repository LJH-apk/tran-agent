# 7.4: Horizontal Curves

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/07%3A_Geometric_Design/7.04%3A_Horizontal_Curves

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

**Horizontal Curves** are one of the two important transition elements in geometric design for highways (along with Vertical Curves). A horizontal curve provides a transition between two tangent strips of roadway, allowing a vehicle to negotiate a turn at a gradual rate rather than a sharp cut. The design of the curve is dependent on the intended design speed for the roadway, as well as other factors including drainage and friction. These curves are semicircles as to provide the driver with a constant turning rate with radii determined by the laws of physics surrounding centripetal force.

## Fundamental Horizontal Curve Properties

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/b/b3/Ring_3_and_E6_Oslo_Quevaal.jpg/350px-Ring_3_and_E6_Oslo_Quevaal.jpg)

A Horizontal Curve in Oslo, Norway

### **Physics Properties**

Aside from momentum, when a vehicle makes a turn, two forces are acting upon it. The first is gravity, which pulls the vehicle toward the ground. The second is centrifugal force, for which its opposite, centripetal acceleration is required to keep the vehicle on a curved path. For any given velocity, the centripetal force needs to be greater for a tighter turn (one with a smaller radius) than a broader one (one with a larger radius). On a level surface, side friction \(f_s\) serves as a countering force to the centrifugal force, but it generally provides very little resistance/force. Thus, a vehicle has to make a very wide circle in order to make a turn on the level.

Given that road designs usually are limited by very narrow design areas, wide turns are generally discouraged. To deal with this issue, designers of horizontal curves incorporate roads that are tilted at a slight angle. This tilt is defined as superelevation, or \(e\), which is the amount of rise seen on an angled cross-section of a road given a certain run, otherwise known as slope. The presence of superelevation on a curve allows some of the centripetal force to be countered by the ground, thus allowing the turn to be executed at a faster rate than would be allowed on a flat surface. Superelevation also plays another important role by aiding in drainage during precipitation events, as water runs off the road rather than collecting on it. Generally, superelevation is limited to being less than 14 percent, as engineers need to account for stopped vehicles on the curve, where centripetal force is not present.

The allowable radius \(R\) for a horizontal curve can then be determined by knowing the intended design velocity \(V\), the coefficient of friction, and the allowed superelevation on the curve.

\[R=\frac{v^2}{g(e+f_s)}\]

With this radius, practitioners can determine the degree of curve to see if it falls within acceptable standards. Degree of curve, \(D_a\), can be computed through the following formula, which is given in Metric.

\[%R=\frac{1746}{D_a}%\]

Where:

*   \(D_a\)= Degree of curve [angle subtended by a 30.5-m (100 ft) arc along the horizontal curve

### **Application of Superelevation**

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/3/33/-88_Navy_Chevrolet_Monte_Carlo.jpg/366px--88_Navy_Chevrolet_Monte_Carlo.jpg)

Bristol Motor Speedway

One place you will see steep banking is at automobile racetracks. These tracks do not operate in winter, and so can avoid the problems of banking in winter weather. Drivers are also especially skilled, though crashes are not infrequent. For NASCAR fans, the following table may be of interest.

Table: Banking at US Racetracks

| **Track** | **Length (miles)** | **Banking (degrees)** |
| --- | --- | --- |
| Chicago Motor Speedway | 1 | 0.00 |
| Infineon Raceway | 1.949 |  |
| Watkins Glen International | 2.45 |  |
| Pocono Raceway | 2.5 | 6.00 |
| Homestead-Miami Speedway | 1.5 | 8.00 |
| Indianapolis Motor Speedway | 2.5 | 9.00 |
| Memphis Motorsports Park | 0.75 | 11.00 |
| Phoenix International Raceway | 1 | 11.00 |
| Las Vegas Motor Speedway | 1.5 | 12.00 |
| Martinsville Speedway | 0.526 | 12.00 |
| New Hampshire Int'l Speedway | 1.058 | 12.00 |
| California Speedway | 2 | 14.00 |
| Kentucky Speedway | 1.5 | 14.00 |
| Richmond International Raceway | 0.75 | 14.00 |
| Kansas Speedway | 1.5 | 15.00 |
| Michigan International Speedway | 2 | 18.00 |
| Nashville Speedway USA | 0.596 | 18.00 |
| North Carolina Speedway | 1.017 | 22.00 |
| Darlington Raceway | 1.366 | 23.00 |
| Atlanta Motor Speedway | 1.54 | 24.00 |
| Dover Downs Int'l Speedway | 1 | 24.00 |
| Lowe's Motor Speedway | 1.5 | 24.00 |
| Texas Motor Speedway | 1.5 | 24.00 |
| Daytona International Speedway | 2.5 | 31.00 |
| Talladega Superspeedway | 2.66 | 33.00 |
| Bristol Motor Speedway | 0.533 | 36.00 |

### **Geometric Properties**

Horizontal curves occur at locations where two roadways intersect, providing a gradual transition between the two. The intersection point of the two roads is defined as the **Point of Tangent Intersection (PI)**. The location of the curve's start point is defined as the **Point of Curve (PC)** while the location of the curve's end point is defined as the **Point of Tangent (PT)**. The PC is a distance \(T\) from the PI, where \(T\) is defined as Tangent Length. Tangent Length can be calculated by finding the central angle of the curve, in degrees. This angle is equal to the supplement of the interior angle between the two road tangents.

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/b/b9/Horizontal_Curve.JPG/250px-Horizontal_Curve.JPG)

A Typical Horizontal Curve (Plan View)

\[T=Rtan \left( \frac{\Delta}{2} \right)\]

Where:

*   \(T\)= tangent length (in length units)
*   \(\Delta\)= central angle of the curve, in degrees
*   \(R\)= curve radius (in length units)

The PT is a distance \(L\) from the PC where \(L\) is defined as Curve Length. Curve length can be determined using the formula for semicircle length:

\[L=\frac{R \Delta \pi}{180}\]

The distance between the PI and the vertex of the curve can be easily calculated by using the property of right triangles with \(T\) and \(R\). Taking this distance and subtracting off the curve radius \(R\), the external distance \(E\), which is the smallest distance between the curve and PI, can be found.

\[E=R \left( \frac{1}{cos(\frac{\Delta}{2})}-1 \right)\]

Where:

*   \(E\)= external distance (in length units)

Similarly, the middle ordinate \(M\) can be found. The middle ordinate is the maximum distance between a line drawn between PC and PT and the curve. It falls along the line between the curve's vertex and the PI.

\[M=R \left(1-cos \left(\frac{\Delta}{2} \right) \right)\]

Where:

*   \(M\)= middle ordinate (in length units)

Similarly, the geometric formula for chord length can find \(C\), which represents the chord length for this curve.

\[C=2Rsin \left( \frac{\Delta}{2} \right)\]

### **Sight Distance Properties**

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/7/71/Costal_Redwood.jpg/200px-Costal_Redwood.jpg)Limited Curve Sight Distance Ahead

Unlike straight, level roads that would have a clear line of sight for a great distance, horizontal curves pose a unique challenge. Natural terrain within the inside of the curve, such as trees, cliffs, or buildings, can potentially block a driver's view of the upcoming road if placed too close to the road. As a result, the acceptable design speed is often reduced to account for sight distance restrictions.

Two scenarios exist when computing the acceptable sight distance for a given curve. The first is where the sight distance is determined to be less than the curve length. The second is where the sight distance exceeds the curve length. Each scenario has a respective formula that produces sight distance based on geometric properties. Determining which scenario is the correct one often requires testing both to find out which is true.

Given a certain sight distance \(S\) and a known curve length \(L\) and inner lane centerline radius \(R_v\), the distance a sight obstruction can be from the interior edge of the road, \(M_s\) can be computed in the following formulas.

\[S<L:M_s=R_v \left( 1-cos\frac{28.65S}{R_v} \right)\]

\[S>L:M_s=R_v \left( 1-cos\frac{28.65L}{R_v} \right)+\left( \frac{S-L}{2} \right)sin \left(\frac{28.56L}{R_v} \right)\]

## Demonstrations

*   [Flash animation: Roadside Clear Zone (by Karen Dixon and Thomas Wall)](http://street.umn.edu/flash_roadside.html)
*   [Flash animation: Superelevation (by Karen Dixon and Thomas Wall)](http://street.umn.edu/flash_superelevation.html)

## Examples

Example 1: Curve Radius

A curving roadway has a design speed of 110 km/hr. At one horizontal curve, the superelevation has been set at 6.0% and the coefficient of side friction is found to be 0.10. Determine the minimum radius of the curve that will provide safe vehicle operation.

**Solution**

\(R=\frac{v^2}{g(e+f_s)}=\frac{(110*(1000/3600))^2}{9.8(.06+0.10)}=595 /text{ } meters\)

Example 2: Determining Stationing

A horizontal curve is designed with a 600 m radius and is known to have a tangent length of 52 m. The PI is at station 200+00. Determine the stationing of the PT.

**Solution**

![](https://upload.wikimedia.org/Wikipedia/commons/7/73/Horizontal_Curve_Example_2.JPG)

What is known for this problem

\(T=Rtan \left(\frac{\Delta}{2} \right)\)

\(52=600tan \left(\frac{\Delta}{2} \right)\)

\(\Delta=9.9 \text{ } deg\)

\(L=\frac{R \pi \Delta}{180}=\frac{600 \pi 9.9}{180}=104\)

\(PC=PI-T=200+00-0+52=199+48\)

\(PT=PC+L=199+48+1+04=200+52\)

Example 3: Stopping Distance

A very long horizontal curve on a one-directional racetrack has 1750-meter centerline radius, two 4-meter lanes, and a 200 km/hr design speed. Determine the closest distance from the inside edge of the track that spectators can park without impeding the necessary sight distance of the drivers. Assume that the sight distance is less than the length of the curve, a coefficient of friction of 0.3, and a perception-reaction time of 2.5 seconds.

**Solution**

With a centerline radius of 1750 meters, the centerline of the interior lane is 1748 meters from the vertex (1750 - (4/2)). Using the stopping sight distance formula (See Sight Distance), SSD is computed to be 664 meters. With this, the distance from the track that spectators can be parked can easily be found.

\(S<L:M_s=R_v \left(1-cos\frac{28.65S}{R_v} \right)=1748 \left(1-cos\frac{28.65(664)}{1748} \right)=31.43 \text{ } meters\)

This gives the distance (31.43 m) to the center of the inside lane. Subtracting half the lane width (2m in this case) would give the distance to the edge of the track, 29.43 m.

Sample Problem

A given curve was very poorly designed. The two-lane road used has a lower-than-average coefficient of friction (0.05), no superelevation to speak of, and 4-meter lanes. 900 kg vehicles tend to go around this curve and are stylistically top heavy. County engineers have warned that this curve cannot be traversed as safely as other curves in the area, but politicians want to keep the speed up to boost tourism in the area. The curves have a radius of 500 feet and a design speed of 80 km/hr. Because the vehicles using the curve are top heavy, they have a tendency to roll over if too much side force is exerted on them (the local kids often race around the curve at night to get the thrill of "two-wheeling"). As an engineer, you need to prove that this curve is infeasible before an accident occurs. How can you show this?

**Answer**

The stated speed is 80 km/hr. The easiest way would be to prove that this is too high. We will look at the innermost lane, since forces will be greater there. Using the general curve radius formula and solving for v, we find:

\(R=\frac{v^2}{g(e+f_s)}=\frac{v^2}{9.8(0.05+0)=500-(4/2)\)

\(v=15.62 \text{ } m/s=56.23 \text{ } km/hr\)

80 km/hr is much greater than 56.23 km/hr, which by default means that more force is being exerted on the vehicle than the road can counter. Thus, the curve's speed limit is dangerous and needs to be changed.

## Demonstrations

## Additional Questions

Homework

1. Why might maximum superelevation be higher in South Texas than in Northern Minnesota?

2. Which conic section forms the basis of horizontal curves?

3. When a vehicle is traveling around a horizontal curve, it is subject to two forces. What are these forces, and how do they operate on the vehicle (draw a clear diagram illustrating the forces).

4. An existing horizontal curve has a radius of 100 meters, which restricts the maximum speed on this section of road. Highway officials want a maximum design speed of 150 km/hr.

Assume the coefficient of side friction is 0.15 and rate of superelevation on both the original and rebuilt sections is 0.06.

Compute the existing speed and find the new radius of curvature.

5. A flat horizontal curve on a 2-lane highway is designed with a 609.600 m radius, the curve has a tangent length of 121.920 m and the PI is at station 3+139.440

| **Design Speed (km/h)** | **Brake reaction distance (m)** | **Braking distance on level (m)** | **Calculated Stopping Sight Distance (m)** | **Design Stopping Sight Distance (m)** |
| --- | --- | --- | --- | --- |
| 80 | 55.2 | 73.4 | 129.0 | 130 |
| 90 | 62.6 | 92.9 | 155.5 | 160 |
| 100 | 69.5 | 114.7 | 184.2 | 185 |
| 110 | 76.5 | 138.8 | 215.3 | 220 |

Source: AASHTO: A Policy on Geometric Design of Highways and Streets

The road has 3.6 m lanes and a 96 km/h design speed.

a. Determine the stationing of the PT. Draw your solution. b. Determine the distance that must be cleared from the inside edge of the inside lane to provide sufficient stopping sight distance. Draw your solution.

6. A horizontal curve is designed with a 600 m radius. The curve has a tangent of 125 m and the PI is at metric station 10+000 (10 kilometers and 0 meters). Determine the stationing of the PT. Draw a diagram showing your answer.

Additional Questions

1.  Name 4 types of horizontal curves.
2.  When are the non-simple types most used? Why are reverse curves so bad? → Special applications, including mountains, restricted right-of-way, or anywhere that a simple curve cannot be feasibly used.
3.  How is weather accounted for (e.g. ice) → superelevation (e)
4.  Explain m? When would m and M be equal? Are the equations for “m” used in determining the placement of buildings or billboards on existing roadways? → Used as a justification to keep stuff off the side of the road. May be used in roadway construction to avoid unmovable objects, or when placing objects to avoid unmovable road.
5.  When should you design speed for curves rather than the curve for speed? → If it is new construction, design the radius to serve the desired speed. If you are setting speed limits, set the speed based on the existing curve.
6.  When the angle increases, does the tangent length increase or decrease
7.  Write the constraints on the calculation of horizontal curves
8.  What are the characteristics of horizontal curves
9.  Draw a simple horizontal curve and its components.
10.  Can one add T to the PI station to get the station of the PC? (No)
11.  How common is a horizontal curve on a vertical curve? → Depends on where you are, very common in mountainous areas. Not especially uncommon.
12.  Are most horizontal curves designed using circles? → (In US, almost uniformly yes. It is also easier for driver, who just needs to set the steering wheel, constant readjustment is not required )
13.  In English Units what does station 10+25 mean? It indicates the station is 1025 feet from 0+00.
14.  On concrete roads there are grooves perpendicular to the direction of traffic to increase stopping road friction. Do these grooves (rumblestrips) reduce side friction?
15.  What is maximum superelevation when a road is really icy? → superelevation cannot change seasonally (it would be too expensive to jack up the road). So Max \(e\) is annual.
16.  Why are side friction factors for urban and rural roads different? What are different factors in rural vs. urban areas?
17.  Why is Radius of curvature important when building roads?
18.  What are some of the highest values of e and \(f_s\) around the country?
19.  Why do the standards (maximums/minimums) for e and \(f_s\) change with location?
20.  Label all of the forces acting on a vehicle traveling up a hill (and around a corner)
21.  What is curve resistance? What affects is? Why does it matter?
22.  What are the main variables used in curvature problems, superelevation?
23.  Why do engineers bank curves?
24.  What is centrifugal force?
25.  Why would an engineer want to increase or decrease the radius of curvature?
26.  What does superelevation represent
27.  What shapes do horizontal and vertical curves have. Why is this helpful for the driver
28.  If you want to decrease \(R,\) what strategies do you have?
29.  Is side friction the same as static friction? What does it mean?
30.  When the max value of \(e\) is given, can a smaller number be used in the final answer → yes
31.  What is superelevation? How is it affected by centrifugal force?
32.  How does \(f_s\) affect design speeds

## Variables

*   \(R\) - Centerline Curve Radius
*   \(D_a\) - Degree of curve [angle subtended by a 30.5-m (100 ft) arc along the horizontal curve
*   \(T\) - tangent length (in length units)
*   \(\Delta\) - Deflection angle of curve tangents. Also central angle of the curve, in degrees.
*   \(E\) - External. Smallest distance between the curve and PI
*   \(M\) - Middle ordinate
*   \(L\) - Curve Length
*   \(C\) - Chord Length
*   \(S\) - Sight Distance
*   \(M_s\) - Acceptable distance from inner edge of road for a sight obstruction to be placed without impeding sight distance
*   \(R_v\) - Radius of innermost lane centerline

## Key Terms

*   PC: Point of Curve
*   PI: Point of Tangent Intersect
*   PT: Point of Tangent
