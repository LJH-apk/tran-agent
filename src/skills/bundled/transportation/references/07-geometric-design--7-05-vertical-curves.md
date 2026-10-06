# 7.5: Vertical Curves

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/07%3A_Geometric_Design/7.05%3A_Vertical_Curves

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

**Vertical Curves** are the second of the two important transition elements in geometric design for highways, the first being Horizontal Curves. A vertical curve provides a transition between two sloped roadways, allowing a vehicle to negotiate the elevation rate change at a gradual rate rather than a sharp cut. The design of the curve is dependent on the intended design speed for the roadway, as well as other factors including drainage, slope, acceptable rate of change, and friction. These curves are parabolic and are assigned stationing based on a horizontal axis.

## Fundamental Curve Properties

### **Parabolic Formulation**

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/c/cd/Centerline_Rumble_Strip.jpg/350px-Centerline_Rumble_Strip.jpg)

A Road Through Hilly Terrain with Vertical Curves in New Hampshire

Two types of vertical curves exist: (1) Sag Curves and (2) Crest Curves. Sag curves are used where the change in grade is positive, such as valleys, while crest curves are used when the change in grade is negative, such as hills. Both types of curves have three defined points: PVC (Point of Vertical Curve), PVI (Point of Vertical Intersection), and PVT (Point of Vertical Tangency). PVC is the start point of the curve while the PVT is the end point. The elevation at either of these points can be computed as \(e_{PVC}\) and \(e_{PVT}\) for PVC and PVT respectively. The roadway grade that approaches the PVC is defined as \(g_1\) and the roadway grade that leaves the PVT is defined as \(g_2\). These grades are generally described as being in units of (m/m) or (ft/ft), depending on unit type chosen.

Both types of curves are in parabolic form. Parabolic functions have been found suitable for this case because they provide a constant rate of change of slope and imply equal curve tangents, which will be discussed shortly. The general form of the parabolic equation is defined below, where \(y\) is the elevation for the parabola.

\[y=ax^2+bx+c\]

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/6/6b/Vertical_Curve.PNG/350px-Vertical_Curve.PNG)

A Typical Crest Vertical Curve (Profile View)

At x = 0, which refers to the position along the curve that corresponds to the PVC, the elevation equals the elevation of the PVC. Thus, the value of \(c\) equals \(e_{PVC}\). Similarly, the slope of the curve at x = 0 equals the incoming slope at the PVC, or \(g_1\). Thus, the value of \(b\) equals \(g_1\). When looking at the second derivative, which equals the rate of slope change, a value for \(a\) can be determined.

\[a=\frac{g_2-g_1}{2L}\]

Thus, the parabolic formula for a vertical curve can be illustrated.

\[y=e_{PVC}+g_1x+\frac{(g_2-g_1)x^2}{2L]\]

Where:

*   \(e_{pvc}\): elevation of the PVC
*   \(g_1\): Initial Roadway Grade (m/m)
*   \(g_2\): Final Roadway Grade (m/m)
*   \(L\): Length of Curve (m)

Most vertical curves are designed to be Equal Tangent Curves. For an Equal Tangent Curve, the horizontal length between the PVC and PVI equals the horizontal length between the PVI and the PVT. These curves are generally easier to design.

### **Offset**

Some additional properties of vertical curves exist. Offsets, which are vertical distances from the initial tangent to the curve, play a significant role in vertical curve design. The formula for determining offset is listed below.

\[Y=\frac{Ax^2}{200L}\]

Where:

*   \(A\): The absolute difference between \(g_2\) and \(g_1\), multiplied by 100 to translate to a percentage
*   \(L\): Curve Length
*   \(x\): Horizontal distance from PVC along curve

### **Stopping Sight Distance**

Sight distance is dependent on the type of curve used and the design speed. For crest curves, sight distance is limited by the curve itself, as the curve is the obstruction. For sag curves, sight distance is generally only limited by headlight range. AASHTO has several tables for sag and crest curves that recommend rates of curvature, \(K\), given a design speed or stopping sight distance. These rates of curvature can then be multiplied by the absolute slope change percentage, \(A\) to find the recommended curve length, \(L_m\).

\[L_m=KA\]

Without the aid of tables, curve length can still be calculated. Formulas have been derived to determine the minimum curve length for required sight distance for an equal tangent curve, depending on whether the curve is a sag or a crest. Sight distance can be computed from formulas in other sections (See Sight Distance).

#### **Crest Vertical Curves**

The correct equation is dependent on the design speed. If the sight distance is found to be less than the curve length, the first formula below is used, whereas the second is used for sight distances that are greater than the curve length. Generally, this requires computation of both to see which is true if curve length cannot be estimated beforehand.

\[S<L:L_m=\frac{AS^2}{200 \left(\sqrt{h_1}+\sqrt{h_2} \right)^2}\]

\[S>L:L_m=2s-\frac{200 \left(\sqrt{h_1}+\sqrt{h_2} \right)^2}{A}\]

Where:

*   \(L_m\): Minimum Curve Length (m)
*   \(A\): The absolute difference between \(g_2\) and \(g_1\), multiplied by 100 to translate to a percentage
*   \(S\): Sight Distance (m)
*   \(h_1\): Height of driver's eye above roadway surface (m)
*   \(h_2\): Height of objective above roadway surface (m)

#### **Sag Vertical Curves**

Just like with crest curves, the correct equation is dependent on the design speed. If the sight distance is found to be less than the curve length, the first formula below is used, whereas the second is used for sight distances that are greater than the curve length. Generally, this requires computation of both to see which is true if curve length cannot be estimated beforehand.

\[S<L:L_m=\frac{AS^2}{200(H+Stan \beta)}\]

\[S>L:L_m=2s=\frac{200(H+Stan \beta)}{A}\]

Where:

*   \(A\): The absolute difference between \(g_2\) and \(g_1\), multiplied by 100 to translate to a percentage
*   \(S\): Sight Distance (m)
*   \(H\): Height of headlight (m)
*   \(\beta\): Inclined angle of headlight beam, in degrees

To find the position of the low point on a SAG vertical curve: x is the horizontal distance between the PVC and Low Point

\[x=\frac{G1L}{G1-G2}\]

*   \(G_1\): Grade Down (%)
*   \(G_2\): Grade Up (%)
*   \(L\): Length of Vertical Curve (station) ei. 600 ft =6

### **Passing Sight Distance**

In addition to stopping sight distance, there may be instances where passing may be allowed on vertical curves. For sag curves, this is not an issue, as even at night, a vehicle in the opposing can be seen from quite a distance (with the aid of the vehicle's headlights). For crest curves, however, it is still necessary to take into account. Like with the stopping sight distance, two formulas are available to answer the minimum length question, depending on whether the passing sight distance is greater than or less than the curve length. These formulas use units that are in metric.

\[S<L:L_m=\frac{A(PSD^2)}{864}\]

\[S>L:L_m=2PSD-\frac{864}{A}\]

Where:

*   \(A\): The absolute difference between \(g_2\) and \(g_1\), multiplied by 100 to translate to a percentage
*   \(PSD\): Passing Sight Distance (m)
*   \(L_m\): Minimum curve length (m)

## Demonstrations

## Examples

Example 1: Basic Curve Information

A 500-meter equal-tangent sag vertical curve has the PVC at station 100+00 with an elevation of 1000 m. The initial grade is -4% and the final grade is +2%. Determine the stationing and elevation of the PVI, the PVT, and the lowest point on the curve.

**Solution**

The curve length is stated to be 500 meters. Therefore, the PVT is at station 105+00 (100+00 + 5+00) and the PVI is in the very middle at 102+50, since it is an equal tangent curve. For the parabolic formulation, \(c\) equals the elevation at the PVC, which is stated as 1000 m. The value of \(b\) equals the initial grade, which in decimal is -0.04. The value of \(a\) can then be found as 0.00006.

Using the general parabolic formula, the elevation of the PVT can be found:

\(y=0.00006x^2+-.04x+1000=0.00006(500)^2+-0.4(500)+1000=995 \text{ }m\)

Since the PVI is the intersect of the two tangents, the slope of either tangent and the elevation of the PVC or PVT, depending, can be used as reference. The elevation of the PVI can then be found:

\(y=-0.04x+1000=-0.04(250)+1000=990 \text{ }\)

To find the lowest part of the curve, the first derivative of the parabolic formula can be found. The lowest point has a slope of zero, and thus the low point location can be found:

\(dy/dx=0.00012x+-.04=0.00012x+-0.4=0\)

\(x=333.33 \text{ }m\)

Using the parabolic formula, the elevation can be computed for that location. It turns out to be at an elevation of 993.33 m, which is the lowest point along the curve.

Example 2: Adjustment for Obstacles

A current roadway is climbing a hill at an angle of +3.0%. The roadway starts at station 100+00 and elevation of 1000 m. At station 110+00, there is an at-grade railroad crossing that goes over the sloped road. Since designers are concerned for the safety of drivers crossing the tracks, it has been proposed to cut a level tunnel through the hill to pass beneath the railroad tracks and come out on the opposite side. A vertical crest curve would connect the existing roadway to the proposed tunnel with a grade of (-0.5)%. The prospective curve would start at station 100+00 and have a length of 2000 meters. Engineers have stated that there must be at least 10 meters of separation between the railroad tracks and the road to build a safe tunnel. Assume an equal tangent curve. With the current design, is this criteria met?

**Solution**

One way to solve this problem would be to compute the elevation of the curve at station 110+00 and then see if it is at least 10 meters from the tangent. Another way would be to use the Offset Formula. Since A, L, and x are all known, this problem can be easily solved. Set x to 1000 meters to represent station 110+00.

\(Y=\frac{Ax^2}{200L}=\frac{(3.5)(1000)^2}{200(2000)}=8.75 \text{ } m\)

The design DOES NOT meet the criteria.

![Vertical Curve Example 2.JPG](https://upload.wikimedia.org/Wikipedia/commons/thumb/b/bc/Vertical_Curve_Example_2.JPG/370px-Vertical_Curve_Example_2.JPG)

Example 3: Stopping Sight Distance

A current roadway has a design speed of 100 km/hr, a coefficient of friction of 0.1, and carries drivers with perception-reaction times of 2.5 seconds. The drivers use cars that allows their eyes to be 1 meter above the road. Because of ample roadkill in the area, the road has been designed for carcasses that are 0.5 meters in height. All curves along that road have been designed accordingly.

The local government, seeing the potential of tourism in the area and the boost to the local economy, wants to increase the speed limit to 110 km/hr to attract summer drivers. Residents along the route claim that this is a horrible idea, as a particular curve called "Dead Man's Hill" would earn its name because of sight distance problems. "Dead Man's Hill" is a crest curve that is roughly 600 meters in length. It starts with a grade of +1.0% and ends with (-1.0)%. There has never been an accident on "Dead Man's Hill" as of yet, but residents truly believe one will come about in the near future.

A local politician who knows little to nothing about engineering (but thinks he does) states that the 600-meter length is a long distance and more than sufficient to handle the transition of eager big-city drivers. Still, the residents push back, saying that 600 meters is not nearly the distance required for the speed. The politician begins a lengthy campaign to "Bring Tourism to Town", saying that the residents are trying to stop "progress". As an engineer, determine if these residents are indeed making a valid point or if they are simply trying to stop progress?

**Solution**

Using sight distance formulas from other sections, it is found that 100 km/hr has an SSD of 465 meters and 110 km/hr has an SSD of 555 meters, given the criteria stated above. Since both 465 meters and 555 meters are less than the 600-meter curve length, the correct formula to use would be:

\(S<L:L_m=\frac{AS^2}{200 \left(\sqrt{h_1}_\sqrt{h_2} \right)^2=\frac{2(555)^2}{200(\sqrt{1.0}+\sqrt{0.5})^2=1055 \text{ } m\)

Since the 1055-meter minimum curve length is greater than the current 600-meter length on "Dead Man's Hill", this curve would not meet the sight distance requirements for 110 km/hr.

This seems like a very large gap. The question becomes, was the curve even good enough at 100 km/hr? Using the same formula, the result is:

\(S<L:L_m=\frac{AS^2}{200 \left( \sqrt{h_1}+\sqrt{h_2} \right)^2=\frac{2(465)^2}{200(\sqrt{1.0}+\sqrt{0.5})^2}=740 \text{ }m\)

740 meters for a minimum curve length is far greater than the existing 600-meter curve. Therefore, the residents are correct in saying that "Dead Man's Hill" is a disaster waiting to happen. As a result, the politician, unable to hold public confidence by his "progress" comment, was forced to resign.

## Thought Question

**Problem**

Sag curves have sight distance requirements because of nighttime sight distance constraints. The headlights on cars have a limited angle at which they can shine with bright enough intensity to see objects far off in the distance. If the government were to allow a wider angle of light to be cast out on standard car headlights, would this successfully provide more stopping sight distance?

**Solution**

Yes, of course. For a single car traveling on a road with many sag curves, the design speed could be increased since more road could be seen. However, when additional cars were added to that same road, problems would begin to appear. With a greater angle of light being cast from headlights, drivers in opposing lanes would be severely blinded, forcing them to slow down to avoid causing an accident. Just think of the last time somebody drove by with their 'brights' on and blinded you. This problem could cause more accidents and force people to slow down, thus producing a net loss overall.

Sample Problem

To help prevent future collisions between cars and trains, an at-grade crossing of a rail road by a country road is being redesigned so that the county road will pass underneath the tracks. Currently the vertical alignment of the county road consists of an equal tangents crest vertical curve joining a 4% upgrade to a 3% downgrade. The existing vertical curve is 450 feet long, the PVC of this curve is at station 48+24.00, and the elevation of the PVC is 1591.00 feet. The centerline of the train tracks is at station 51+50.00. Your job is to find the shortest vertical curve that provides 20 feet of clearance between the new county road and the train tracks, and to make a preliminary estimate of the cut that will be needed to construct the new curve.

**Answer**

**Solution:**

**A.) What is the curve length?**

The curves are equal tangent, so we know that: PVI - PVC = PVT - PVI = L/2

From this, we know:

PVC of First Curve: 48+24 PVI of Both Curves (this is a constant): (48+24.00 + (450/2) = 50+49)

Use the offset formula for the first curve to find the vertical distance between the tangent and the curve:

*   \(x_{rr}\): Distance between PVI and railroad tracks: (51+50 - 50+49 = 101 feet)
*   PVI Elevation: 1591 + (0.04*225) = 1600 feet

Use the offset formula for the first curve to find the vertical distance between the tangent and the curve:

\(Y=\frac{Ax^2}{200L}\)

Where:

\(A\) = 7 (Change in Grade)

\(L\) = 450 feet

\(x\) = 51+50 - 48+24 = 326 feet

The offset, Y, at the railroad tracks's station is computed to be 8.27 feet.

The road is to be lowered an additional 20 feet. Therefore, the new offset at that sight would become 28.27 feet. The equation for the second curve becomes:

\(Y=28.27=\frac{7x^2}{200L}\)  

Neither L (length of curve) or x (distance of offset from PVC) are known. However, we know this is an equal tangent curve, meaning the distance from PVC to PVI is L/2 for the curve in question. Also, the distance between PVI and the railroad tracks is \(x_{rr}\), which is 101 feet. Therefore, (L/2) + \(x_{rr}\) equals the distance from PVC to the railroad tracks, which is what we want for x. Thus, we are left with one unknown and one equation.

\(Y=28.27=\frac{7(L+101)^2}{200L}\)

The new curve length is found to be 2812 feet.

**B.) How deep is the cut at the PVI?**

To find this, the offset formula can be used again, using the length L/2 as the distance from the PVC on any curve.

For the old curve, the offset is:

\(Y=\frac{A(L/2)^2}{200L}=\frac{7(450/2)^2}{200(450)}=3.935 \text{ } feet\)

For the new curve, using data found from before, the offset is:

\(Y=\frac{A(L/2)^2}{200L}=\frac{7(2812/2)^2}{200(2812)}=24.605 \text{ } feet\)

The difference between the two offsets is 20.67 feet. This is the depth of the cut at the PVI.

Homework

1. Which conic section forms the basis of vertical curves?

2. A section of a roadway goes up a 6% incline and includes no horizontal curves. Point A, which lies along this incline, has a station marker. Using a wheel measure, you measure the distance along the centerline from point A to the next PVC and find it is 880 meters. If point A is at Station 0+700, what is the station of the PVC?

3. Identify 4 criteria used to set the minimum length of a sag vertical curve (4 points), place them in order from most to least important (1 point):

4. An equal tangent sag vertical curve joins a –0.5 % grade with a +3.0% grade. Assume H=0.6, headlights are aimed upward at an angle of 1 degree

If the PVI of the grades is at metric station 10+100 and has an elevation of 300 meters, using the headlight criterion determine the station elevation of the PVC and PVT for a design speed of 100 km/hr and a coefficient of friction of 0.30. Draw a diagram with the values of your solution.

5. A crest vertical curve on a 2-way, 2-lane road is designed for 100 km/hr. The grades are 1.6% and – 1.4%. If the tangents intersect at metric station 2 + 000.00 (where 2 represents 2 km and 000.00 is 0 meters) and at an elevation of 100 meters above sea level, determine the stopping sight distance, the length of the curve, and the stations and elevations for the Beginning and End of the Vertical Curve. Assume h1 = 1.1 m and h2 = 0.15 m, perception reaction time is 2.5 seconds, f=0.30.

Draw a diagram with the values of your solution.

6. An equal tangent sag vertical curve joins a -2.5% grade with a +3.0% grade. Assume H=0.67, headlights are aimed upward at an angle of 1 degree. If the PVI of the grades is at metric station 5+750 and has an elevation of 0 meters, using the headlight criterion determine the station elevation of the PVC and PVT for a design speed of 120 km/hr and a coefficient of friction of 0.31. Draw a diagram with the values of your solution.

7. You have been asked to design an equal-tangent vertical curve to connect grades of the +1.0% and -2.0%. The design speed is 113 km/h. Assume a value of 3.4 m*s-2 for deceleration rate, a value of 2.5s for reaction time, and a value of 9.807m*s for gravitational constant.

A. Calculate the Stopping Sight Distance (SSD) if we assume vehicles travel at the design speed.

B. If we take this SSD as the required minimum Sight Distance, determine the minimum length of curve. (According to AASHTO, we assume a driver eye height, H1, of 1.08m and a roadway object height, H2, of 0.6m)

Additional Questions

### **Sag Vertical Curves**

1.  What are the considerations when designing sag vertical curves? Which is most important?
2.  What does the comfort criteria in a sag vertical curve describe? Is there a time when comfort criterion is the determining factor? Is there a time when the appearance criteria is determining?
3.  What values are used for H and b in determining L for sag vertical curve?
4.  When calculating SSD, which grade should be used?
5.  Is it true that whether a curve is a crest or sag vertical curve is determined by the initial and final grade?
6.  Are properties of headlights different for cars and trucks? → design for worst case (shorter car). Headlights are positioned by vehicle. Some vehicles have driver adjustments. Design is for normal headlights, not highbeams.
7.  Why are there different equations for L depending on S>L, S<L
8.  Is there any trick to knowing whether S<L or S>L before starting?
9.  How does rain/fog affect sight distance? → reduces it, so drivers should reduce speed and be more alert. Design is for normal conditions.
10.  What is the drainage criterion? How is water dealt with on sag curves?
11.  Why are headlights angled?

### **Crest Vertical Curves**

1.  Is there a limit on hill crests??
2.  What is the difference between crest and sag curves
3.  How can you determine if S > L or S < L when doing SSD calculations? --> If don’t know, trial and check. If use S > L equation and S is greater than L, great, otherwise, must solve again. Why are equations different? Think about the relationships. Solve them at S = L.
4.  If SSD or PSD is different in opposite directions over a crest vertical curve, is it common to have different speed limits/ warning signs. Usually speed is same in both directions, not always.
5.  Is darkness considered in speed/stopping calculations (since can’t see as far)? For Sag curves, there is a headlight criterion.
6.  What height is used in equations for L?
7.  Can the highest point on the curve be higher than the PVI? →:(No, but can be higher than the point on the curve under the PVI). How is it possible for the PVI elevation to be above the actual elevation
8.  When is SSD different from AASHTO guidelines? Do engineers assume different stopping sight distances under certain conditions?
9.  Why compute SSD for downgrade only?
10.  Why is it not always possible to allow passing on vertical curve two lane roads. Is passing sight regularly used ? → (on 2 lane rural roads with good sight lines, yes).
11.  Explain idea of stopping sign as it pertains to hills with (horizontal) curves → a bit complex for intro to transportation, covered in 4xxx level curve. Think about which governs, the horizontal SSD or the vertical SSD (i.e. whichever is lower, which depends on local conditions). Is passing sight distance based on big trucks or average sized cars? → cars (see h1 and compare it with where you are sitting in the vehicle). (Do trucks and small cars have enough sight to pass). → It is not the size of the car you are in so much as the size of the car you see (h2). You are more likely to see a big truck, so the equation is conservative for larger vehicles. When do you plan for each? (Always plan for SSD, consider PSD when there is possibility of dashed yellow line).
12.  What are 3 parameters that affect the design of vertical curves
13.  Explain crest vertical curve graphically
14.  Determine the minimum length of the curve.
15.  What type of curve is used in the design of crest vertical curves? (Ans: Parabola)
16.  Why is it necessary to curve roads that have different slopes on either side of the curve?
17.  Is L Arc length or horizontal displacement?
18.  Why is stopping distance important?
19.  Label PVC, PVI and PVT on a graph. What is the difference between PVC and PVT?
20.  What is an equal tangent cuve
21.  What does an aesthetically unappealing curve look like?
22.  What does SSD depend on?
23.  How does variable “a” used in elevation, differ from variable “A” used in length of curve.
24.  In what two ways can the SSD and L be related
25.  What is the first step in developing the profile of a curve -> Find the center of the curve.

### **Additional Problem**

1.  Compute length of crest vertical curve with +2.5% and –2.% grade, speed = 90 km/hr &S < L, f=0.25, PRT = 2.5 sec
    1.  Find the elevation along the curve?
    2.  Find the highest point on a crest vertical curve

## Variables

*   \(L\) - Curve Length
*   \(e\) - Elevation of designated point, such as PVC, PVT, etc.
*   \(g\) - Grade
*   \(A\) - Absolute difference of grade percentages for a certain curve, in percent
*   \(y\) - Elevation of curve
*   \(Y\) - Offset between grade tangent from PVC and curve elevation for a specific station
*   \(h_1\) - Height of driver's eye above roadway surface
*   \(h_2\) - Height of object above roadway surface
*   \(H\) - Height of headlight
*   \(\beta\) - Inclined angle of headlight beam, in degrees
*   \(S\) - Sight Distance in question
*   \(K\) - Rate of curvature
*   \(L_m\) - Minimum Curve Length

## Key Terms

*   PVC: Point of Vertical Curves
*   PVI: Point of Vertical Intersection
*   PVT: Point of Vertical Tangent
*   Crest Curve: A curve with a negative grade change (like on a hill)
*   Sag Curve: A curve with a positive grade change (like in a valley)
