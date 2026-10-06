# 7.1: Sight Distance

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/07%3A_Geometric_Design/7.01%3A_Sight_Distance

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

**Sight Distance** is a length of road surface which a particular driver can see with an acceptable level of clarity. Sight distance plays an important role in geometric highway design because it establishes an acceptable design speed, based on a driver's ability to visually identify and stop for a particular, unforeseen roadway hazard or pass a slower vehicle without being in conflict with opposing traffic. As velocities on a roadway are increased, the design must be catered to allowing additional viewing distances to allow for adequate time to stop. The two types of sight distance are (1) stopping sight distance and (2) passing sight distance.

## Derivations

### **Stopping Sight Distance**

Stopping Sight Distance (SSD) is the viewable distance required for a driver to see so that he or she can make a complete stop in the event of an unforeseen hazard. SSD is made up of two components: (1) Braking Distance and (2) Perception-Reaction Time.

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/4/4c/AASHTOSSD.png/220px-AASHTOSSD.png)

Forces acting on a vehicle that is braking

For highway design, analysis of braking is simplified by assuming that deceleration is caused by the resisting force of friction against skidding tires. This is applicable to both an uphill or a downhill situation. A vehicle can be modeled as an object with mass \(m\) sliding on a surface inclined at angle \(\theta\).

While the force of gravity pulls the vehicle down, the force of friction resists that movement. The forces acting this vehicle can be simplified to:

\[F=W(sin (\theta)-fcos(\theta))\]

where

*   \(W=mg\) = object’s weight,
*   \(f\) = coefficient of friction.

Using Newton’s second law we can conclude then that the acceleration (\(a\)) of the object is

\[a=g(sin(\theta))-fcos(\theta))\]

Using our basic equations to solve for braking distance (\(d_b\)) in terms of initial speed (\(v_i\)) and ending speed (\(v_e\)) gives

\[d_b=\frac{v_i^2-v_e^2}{-2a}\]

and substituting for the acceleration yields

\[d_b=\frac{v_i^2-v_e^2}{2g(fcos(\theta)-sin(\theta))}\]

For angles commonly encountered on roads, \(cos(\theta) \approx 1\) and ![{\\displaystyle \\sin(\\theta )\\approx \\tan(\\theta )=G}](https://wikimedia.org/api/rest_v1/media/math/render/svg/bcff1902ff70c44baf822298e9c6a498a7ccfc37)\(sin(\theta) \approx tan(\theta)=G\), where \(G\) is called the road’s grade. This gives

\[d_b=\frac{v_i^2-v_e^2}{2g(f \pm G)\]

Using simply the braking formula assumes that a driver reacts instantaneously to a hazard. However, there is an inherent delay between the time a driver identifies a hazard and when he or she mentally determines an appropriate reaction. This amount of time is called perception-reaction time. For a vehicle in motion, this inherent delay translates to a distance covered in the meanwhile. This extra distance must be accounted for.

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/4/46/I-90_floating_bridges_looking_east.JPG/350px-I-90_floating_bridges_looking_east.JPG)

Ample Stopping Sight Distance

For a vehicle traveling at a constant rate, distance \(d_r\) covered by a specific velocity \(v\) and a certain perception-reaction time \(t_r\) can be computed using simple dynamics:

\[d_r=(vt_r)\]

Finally, combining these two elements together and incorporating unit conversion, the AASHTO stopping sight distance formula is produced. The unit conversions convert the problem to metric, with \(v_i\) in kilometers per hour and \(d_s\) in meters.

\[d_s=d_r+d_b=0.278t_rv_i+\frac{(0.278v_i)^2}{19.6(f \pm G)}\]

A Note on Sign Conventions

We said \(d_b=\frac{v_i^2-v_e^2}{2g(f \pm G)\)

Use: \((f-G)\) if going downhill and \((f+G)\) if going uphill, where G is the absolute value of the grade

### **Passing Sight Distance**

Passing Sight Distance (PSD) is the minimum sight distance that is required on a highway, generally a two-lane, two-directional one, that will allow a driver to pass another vehicle without colliding with a vehicle in the opposing lane. This distance also allows the driver to abort the passing maneuver if desired. AASHTO defines PSD as having three main distance components: (1) Distance traveled during perception-reaction time and accleration into the opposing lane, (2) Distance required to pass in the opposing lane, (3) Distance necessary to clear the slower vehicle.

The first distance component \(d_1\) is defined as:

\[d_1=1000t_1 \left( u-m+\frac{at_1}{2} \right)\]

where

*   \(t_1\) = time for initial maneuver,
*   \(a\) = acceleration (km/h/sec),
*   \(u\) = average speed of passing vehicle (km/hr),
*   \(m\) = difference in speeds of passing and impeder vehicles (km/hr).

The second distance component \(d_2\) is defined as:

\[d_2=(1000ut_2)\]

where

*   \(t_2\) = time passing vehicle is traveling in opposing lane,
*   \(u\) = average speed of passing vehicle (km/hr).

The third distance component \(d_3\) is more of a rule of thumb than a calculation. Lengths to complete this maneuver vary between 30 and 90 meters.

With these values, the total passing sight distance (PSD) can be calculated by simply taking the summation of all three distances.

\[d_p=(d_1+d_2+d_3)\]

## Demonstrations

*   [GIF animation: Stopping Sight Distance on Flat Surface (contributed by Oregon State University faculty and students)](http://street.umn.edu/flash_stop_flat.html)
*   [GIF animation: Stopping Sight Distance on Downhill Grade (contributed by Oregon State University faculty and students)](http://street.umn.edu/flash_downhill.html)
*   [Flash animation: Bicycle Crash Type (contributed by Oregon State University faculty and students)](http://www.street.umn.edu/flash_bike.html)

## Examples

Example 1: Stopping Distance

A vehicle initially traveling at 66 km/h skids to a stop on a 3% downgrade, where the pavement surface provides a coefficient of friction equal to 0.3. How far does the vehicle travel before coming to a stop?

**Solution**

\(d_b=\frac{\left( 66* (\frac{1000}{3600}) \right)^2 -(0)^2}{2*(9.8)*(0.3-0.03)}=63.5m\)

Example 2: Coefficient of Friction

A vehicle initially traveling at 150 km/hr skids to a stop on a 3% downgrade, taking 200 m to do so. What is the coefficient of friction on this surface?

**Solution**

\(d_b=\frac{\left( 150* (\frac{1000}{3600}) \right)^2-(0)^2}{2*(9.8)*(f-0.03)}=200m\)

\(f-0.03)=\frac{\left( 150* (\frac{1000}{3600}) \right)^2-(0)^2}{2*(9.8)*200}\)

\(f=0.47\)

Example 3: Grade

What should the grade be for the previous example if the coefficient of friction is 0.40?

**Solution**

\(d_b=\frac{\left( 150* (\frac{1000}{3600}) \right)^2-(0)^2}{2*(9.8)*(0.40-G)}=200m\)

\((0.40-G)=\frac{\left( 150* (\frac{1000}{3600}) \right)^2-(0)^2}{2*(9.8)*200}\)

\(G=0.44-0.40=0.04\)

Thus the road needs to be a 4 percent uphill grade if the vehicles are going that speed on that surface and can stop that quickly.

Example 4: Crash Reconstruction

You are shown an crash scene with a vehicle and a light pole. The vehicle was estimated to hit the light pole at 50 km/hr. The skid marks are measured to be 210, 205, 190, and 195 meters. A trial run that is conducted to help measure the coefficient of friction reveals that a car traveling at 60 km/hr can stop in 100 meters under conditions present at the time of the accident. How fast was the vehicle traveling to begin with?

**Solution**

First, Average the Skid Marks.

\((210+205+190+195)/4=200\)

Estimate the coefficient of friction.

\(d_b=\frac{\left( 60* (\frac{1000}{3600}) \right)^2-(0)^2}{2*(9.8)*(f-0)}=100m\)

\(f=\frac{\left( 60* (\frac{1000}{3600}) \right)^2-(0)^2}{2*(9.8)*100}=0.14\)

Third, estimate the unknown velocity

\(d_b=\frac{\left( v*(\frac{1000}{3600}) \right)^2- \left(50*(\frac{1000}{3600}) \right)^2}{2*(9.8)*(0.14-0)}=200m\)

\(\left( v*(\frac{1000}{3600}) \right)^2- \left(50*(\frac{1000}{3600}) \right)^2=200m*(2*(9.8)*(0.14))\)

\(548.8+192.9=v^2(\frac{1000}{3600})^2\)

\(v^2=\frac{741.7}{0.077}=9612.43\)

\(v=98km/h\)

Example 5: Compute Stopping Sight Distance

Determine the Stopping Sight Distance from Example 4, assuming an AASHTO recommended perception-reaction time of 2.5 seconds.

Solution

\(d_s=((1000/3600)*98*2.5)+(98*0.278)^2/(2*9.8*0.14)=338\)

## Thought Question

**Problem**

If the coefficient of friction is 0 (zero) and the grade is 0, how long does it take a moving vehicle to stop?

**Solution**

Forever

Note, the design conditions for roads are wet, i.e. a lower coefficient of friction

Sample Problem

You see a body lying across the road and need to stop. If your vehicle was initially traveling at 100 km/h and skids to a stop on a 2.5% upgrade, taking 75 m to do so, what was the coefficient of friction on this surface?

**Solution**

\(d_b=\frac{\left(100*(\frac{1000}{3600}\right)^2-(0)^2}{2*(9.8)*(f+0.025)}=75m\)

\((f+0.025)=\frac{(27.78)^2}{2*(9.8)*75}\)

\(f=0.50\)

Homework

1. Name five principal characteristics of visual reception important in driving.

2. You are shown an accident scene with a vehicle and a tree on uphill grade of 3%. The vehicle was estimated to hit the tree at 120 km*h−1 . The average length of skid marks was 20 meters. You have found that a car traveling that section under similar weather conditions at 60 km*h−1 can stop in 60 m. What was its initial speed?

3. Draw a road's cross-section and label the elements.

4. How do the calculations of stopping sight distance and passing sight distance differ?

5. What is the recommended value used for perception reaction time according to AASHTO?

6. What is a standard lane width used in new highway designs (to nearest foot or centimeter)?

Additional Questions

1.  What happens if an accident is caused by poorly designed roads? → Lawsuits
2.  Explain Stopping Sight Distance again → = perception reaction distance + braking distance
3.  Isn’t 200 m long distance for braking → Yes unless very high speed on very slick surface (or going downhill).
4.  Is higher coefficient of friction used in road design? → Not too often, more often taken as a function of materials and construction, and wear and tear on road (older roads have less friction).
5.  Does coefficient of friction properly account for the ways cars brakes work and the manner in which drivers apply the brakes?
6.  Are stopping distance (related to accident reconstruction) admissible as evidence in court? Would this be by a licensed professional engineer? → Yes
7.  How close are accident reconstruction calculations to be actual accidents? → Should be on average correct …
8.  For stopping distance, why don’t we have a factor to include vehicle size and weight?
9.  Why would the grade “G” be positive in the stopping distance equation? What would the sign be in the Stopping Distance Equation. What does a negative grade mean if you are were assuming to be going downhill?
10.  Describe the interaction between gravity and friction when going up or downhill. Is friction helped or hindered?
11.  Why can cosine and sine be ignored in calculations? --> Small angle approximations.
12.  What are the steps in accident reconstruction
13.  If you have an accident reconstruction problem, do you incorporate grade when finding friction? Yes, but the grade is known.
14.  How are skid marks useful in determining initial speed of vehicle?
15.  What affects the friction force?
16.  What can stopping distance measure be used for?
17.  What effect does grade have on stopping distance?
18.  What if more or less skid-marks found at an accident scene. How are averages computed when distances are far apart?
19.  What is average perception reaction time given by AASHTO
20.  What is the maximum grade of a driveway?
21.  What type of braking is assumed in the stopping distance equation?
22.  When an object is sliding on an inclined surface, what two forces are operating on it?
23.  When is the road grade equal to 0.
24.  Why is accident reconstruction performed? How does it work?

## Variables

*   \(d_s\) - stopping (sight) distance (m)
*   \(d_r\) - perception reaction distance (m)
*   \(d_b\) - braking distance (m)
*   \(d_p\) - passing distance (m)
*   \(v_i\) - initial speed (km/h)
*   \(t_r\) - perception/reaction time (seconds)
*   \(f\) - AASHTO stopping friction coefficient (dimensionless)
*   \(G\) - roadway grade (dimensionless)

## Key Terms

*   SSD : Stopping Sight Distance
*   PSD : Passing Sight Distance
*   PRT : Perception-Reaction Time

## Standards and Practices

AASHTO Recommended Friction Coefficients

| **(km/hr)** | **Coefficient of Skidding Friction (f)** |
| --- | --- |
| 30 | 0.40 |
| 40 | 0.38 |
| 50 | 0.35 |
| 60 | 0.33 |
| 70 | 0.31 |
| 80 | 0.30 |
| 90 | 0.30 |
| 100 | 0.29 |
| 110 | 0.28 |
| 120 | 0.28 |
