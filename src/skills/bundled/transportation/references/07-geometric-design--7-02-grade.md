# 7.2: Grade

Source: https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation/07%3A_Geometric_Design/7.02%3A_Grade

Authors/contributors: David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.

License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Retrieved: 2026-10-06T15:37:45.173Z

Adaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.

---

**Road Vehicle Performance** forms the basics that make up highway design guidelines and traffic analysis. Roads need to designed so that the vehicles traveling upon them are accommodated. For example, the Interstate Highway system in the United States has a maximum allowable grade that can be used, so that the semitrucks that frequently use these roads would be able to travel them without encountering grade problems. While this can pose quite a design challenge in mountainous regions like Colorado Rockies, without it those trucks would be forced to find better alternative routes, which costs time and money. The ability of a certain vehicle type to use a road is dependent on the power produced by its motor, as well as other road-based and environmental characteristics. When choosing a road design, these elements need to be considered.

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/7/7d/SF_Filbert_St_North_Beach_CA-e.jpg/366px-SF_Filbert_St_North_Beach_CA-e.jpg)

Filbert Street in San Francisco (North Beach)

## Illustration

How steep is the grade in San Francisco? The famous Lombard Street, the curviest street in the world only has a grade of 14.3%. Sources vary on the steepest street in San Francisco. Filbert Street between Hyde and Leavenworth has a grade of 31.5%, Prentiss between Chapman and Powhattan reportedly has a grade of 37%.

Driving in San Francisco at times is like a roller coaster, you can’t see below the nose of your car sitting at the top of the hill, though you can usually see the base of the hill.

What is max grade allowed by law?

Maximum grade is not regulated so much by law as by engineering standards. Maximum grade varies by type of road, and expected speed. In practice, it depends on the alternatives: Is the alternative no road at all? Max grade in the relatively flat Minnesota might be lower than Max grade in mountainous Colorado where there are fewer alternatives. Some typical values for illustration:

*   An interstate is out of standard if it has a grade > 7%.
*   The National Road (built in 1806) had a maximum grade of 8.75%.
*   Local roads are much higher (12% or 15% are sometimes allowed)
*   Otter Tail MN County roads 6%, alleys 8%
*   Driveways can be as much as 30% for a short distance

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/b/b1/Lombard_Street.jpg/366px-Lombard_Street.jpg)

Lombard Street in San Francisco

## Fundamental Characteristics

Tractive effort and resistance are the two main forces that oppose one another and determine the performance of roadway vehicles. Tractive effort is the force exerted against the roadway surface to allow a vehicle to move forward. Resistance encompasses all forces that push back and impede motion. Both of these are in units of force. The general formula for this is outlined below:

\[F_t=ma+R_a+R_{rl}+R_g\]

Where:

*   \(F_t\) = Tractive Effort
*   \(m\) = Vehicle Mass
*   \(a\) = Acceleration
*   \(R_a\) = Aerodynamic Resistance
*   \(R_{rl}\) = Rolling Resistance
*   \(R_g\) = Grade Resistance

These components are discussed in greater detail in the following sections.

![](https://upload.wikimedia.org/Wikipedia/commons/thumb/4/4c/AASHTOSSD.png/400px-AASHTOSSD.png)

Forces acting on a vehicle

### **Aerodynamic Resistance**

Aerodynamic resistance is a force that is produced by turbulent air flow around the vehicle body. This turbulence is dependent on the shape of the vehicle, as well as the friction of air passing over the vehicle's surface. A small portion of this resistance comes from air flow through vehicle components, such as interior ventilation. This resistance can be estimated through the following formula:

\[R_a=\frac{\rho}{2}AC_DV^2\]

Where:

*   \(\rho\) = Air Density
*   \(A\) = Frontal area of the vehicle
*   \(C_D\) = Coefficient of Drag
*   \(V\) = Speed of the vehicle

Air density is a function of elevation and temperature. Frontal area and coefficient of drag are generally unique to each vehicle or type of vehicle.

### **Rolling Resistance**

Rolling resistance is caused by the interaction of tires with the roadway surface. Three main causes exist that create this resistance. The first is the rigidity of the tire and the roadway surface. The second is tire pressure and temperature. The third is vehicular operating speed. This value of rolling friction can be calculated from a very simplified formula, given here in metric. \(V\) is in meters per second.

\[f_{rl}=0.01(1+\frac{V}{44.73})\]

The resistance caused by this friction will increase as weight is added to the vehicle. Therefore, rolling resistance can be calculated.

\[R_{rl}=f_{rl}W\]

Where:

*   \(W\) = Vehicle Weight
*   \(f_{rl}\) = Rolling Friction

### **Grade Resistance**

Grade resistance is the simplest form of resistance. It is the gravitational force acting on the vehicle. This force may not be exactly perpendicular to the roadway surface, especially in situations when a grade is present. Thus, grade resistance can be calculated in the following formula:

\[R_g=WG\]

Where:

*   \(W\) = Vehicle Weight
*   \(G\) = Grade (length/length)

### **Tractive Effort**

Tractive effort is the force that allows the vehicle to move forward, subject to the resistances of the previous three forces. The derivation of the formula comes from understanding the forces and moments that on around the various tires. It can be summarized into a simple concept, illustrated here.

For a rear-wheel drive car:

\[F_{max}=\frac{\mu W(l_f-f_{rl}h)/L}{1-\rho h/L}\]

For a front-wheel drive car:

\[F_{max}=\frac{\mu W(l_f+f_{rl}h)/L}{1+\rho h/L}\]

Where:

*   \(F_{max}\) = Maximum Tractive Effort
*   \(\mu\) = Coefficient of road adhesion
*   \(W\) = Vehicle Weight
*   \(l_r\) = Distance from rear axle to vehicle's center of gravity
*   \(l_f\) = Distance from front axle to vehicle's center of gravity
*   \(f_{rl}\) = Coefficient of rolling friction
*   \(h\) = Height of the center of gravity above the roadway surface
*   \(L\) = Length of wheelbase

### **Grade Computation**

Most of the work surrounding tractive effort is geared toward determining the allowable grade of a given roadway. With a certain known vehicle type using this road, the grade can be easily calculated. Using the force balance equation for tractive effort, a value for grade can be separating, producing the formula below:

\[G=\frac{F_t-F_a-F_{rl}}{W}\]

This calculation produces the maximum grade allowed for a given vehicle type. It assumes that the vehicle is operating at optimal engine capacity and, thus, no acceleration can occur, dropping that element from the overall equation.

## Examples

Example 1: Racecar Acceleration

A racecar is speeding down a level straightaway at 100 km/hr. The car has a coefficient of drag of 0.3, a frontal area of 1.5 \(m^2\), a weight of 10 kN, a wheelbase of 3 meters, and a center of gravity 0.5 meters above the roadway surface, which is 1 meter behind the front axle. The air density is 1.054 kg/\(m^3\) and the coefficient of road adhesion is 0.6. What is the maximum possible rate of acceleration for the vehicle?

**Solution**

Use the force balancing equation to solve for \(a\).

\(F_t=ma+R_a+R_{rl}+R_g\)

Since the straightaway is a level one, the grade is zero, thus removing grade resistance from the general problem.

\(R_g=0\)

Aerodynamic resistance is computed:

\(R_a=\frac{\rho}{2}AC_dV^2=\frac{1.054}{2}(1.5)(0.3)(100*1000/3600)^2=183 /text{ } N\)

Rolling resistance is computed:

\(f_{rl}=0.01(1+\frac{V}{44.73})=0.01(1+\frac{100*1000/3600}{44.73})=0.016\)

\(R_{rl}=f_{rl}W=0.016(10000)=160 \text{ } N\)

Tractive Effort is computed:

\(F_{max}=\frac{\mu W(l_f-f_{rl}h)/L}{1+ \muh/L}=\frac{0.6(10000)(1-0.016(0.5))/3}{1-0.6(0.5)/3}=2204 \text{ } N\)

Looking back to the force balancing equation:

\(ma=F_t-R_a-R_{rl}-R_g=2204-183-160-0=1861 \text{ } N\)

Divide out mass, which can be computed from weight by dividing out gravity.

\(W=mg\)

\(m=\frac{W}{g}={10000}{9.8}=1020 kg\)

Thus, divide mass from the force and acceleration can be found.

\(a=\frac{F}{m}={1861}{1020}=1.82 \text{ } m/s^2\)

Thus, the vehicle is accelerating at a rate of 1.82 meters per second squared.

Example 2: Going Up a Hill

Using the same case from Example 1, assume that instead the racecar encounters a steep hill that it must travel up. It is desired that the driver maintain the 100 km/h velocity at a very minimum. With that being said, what would be the maximum grade that the hill could be?

**Solution**

t the steepest eligible hill, the racecar would be able to maintain 100 km/h without any room for acceleration or deceleration. Therefore, acceleration goes to zero. All other values would stay the same from Example 1. Using the grade formula, the maximum grade can be calculated.

\(G=\frac{F_t-F_a-F_{rl}}{W}=\frac{2204-183-160}{10000}=0.1861\)

The maximum allowable grade is 18.61%.

## Thought Question

**Problem**

Why is it that, in mountainous country, trucks and cars have different speed limits?

**Answer**

Tractive effort is one of the leading reasons, as trucks have a harder time going up steep hills than typical passenger cars, but it is not the only one. Safety is another leading reason, surprisingly, as big rig trucks are obviously more difficult to control in a harsh environment, such as a mountain pass.

Sample Problem

It has been estimated that a Tour-de-France champion could generate a sustained 510 Watts of power while a healthy young human male (HYHM) can generate about 310 Watts of power. The bicycling champion and HYHM are going to race (on bicycles) up a hill with a 6% upgrade, that is five miles long, and the elevation at the top of the hill is 5000 feet. Both rider/bicycle combinations weigh 170 lbs, with frontal area 0.4m2 and coefficient of drag 0.9 (values being typical of bicyclists in crouched racing positions). The coefficient of rolling resistance for both bicycles is 0.01. Assume {\displaystyle \rho }![\\rho ](https://wikimedia.org/api/rest_v1/media/math/render/svg/1f7d439671d1289b6a816e6af7a304be40608d64) is 1.0567 kg/cubic-m. Remember, power equals the product of force and velocity. (1) Who gets to the top first? (2) How much longer does it take the loser to make it to the top?

**Answer**

The winner is obvious the Tour-de-France champion, as everything between the two is equal with the exception of power. Since the champion produces more power, he, by default, would win.

We need to find the maximum steady state speed for each racer to compute the differences in arrival time. At the steady state speed we must have:

\(F_t=R_a+R_{rl}+R_g\)

Where:

*   \(F_t\) = Tractive Effort
*   \(m\) = Vehicle Mass
*   \(a\) = Acceleration
*   \(R_a\) = Aerodynamic Resistance
*   \(R_{rl}\) = Rolling Resistance
*   \(R_g\) = Grade Resistance

We also know:

*   \(rho\) = 1.0567 kg/cubic-m
*   \(W|) = 756 N
*   \(f_{rl}\) = 0.01
*   \(G\) = 0.06
*   \(A\) = 0.4 \(m^2\)
*   \(C_D\) = 0.9

To estimate available tractive effort we can use the definition of power as time rate of work, P = FV, to get:

\(F=\frac{P}{v}\)

Substituting in the components of the individual formulas to the general one, we get:

\(\frac{P}{v}=\frac{\rho}{2}AC_DV^2+f_{rl}W+WG\)

If we compute rolling and grade resistance, we get:

\(R_{rl}=f_{rl}W=0.01(756)=7.56 \text{ } N\)

\(R_g=WG=756(0.06)=45.36 \text{ } N\)

Together, they add up to 52.92 N.

Aerodynamic Resistance can be found to be:

\(R_a=\frac{1.0567}{2}(0.4)(0.9)v^2=0.19v^2\)

With everything substituted into the general formula, the end result is the following formulation:

\(v=\frac{P}{[0.19v^2+52.92]}\)

This problem can be solved iteratively (setting a default value for v and then computing through iterations) or graphically. Either way, when plugging in 510 watts for the Tour-de-France champion, the resulting velocity is 7.88 meters/second. Similarly, when plugging in 310 watts for the HYHM, the resulting velocity is 5.32 meters/second.

The hill is five miles in length, which translates to 8.123 kilometers, 8,123 meters. It will take the champion 1030 seconds (or 17.1 minutes) to complete this link, whereas the HYHM will take 1527 seconds (or 25.4 minutes). The resulting difference is 8.3 minutes.

## Additional Questions

Homework

1. Determine the maximum grade an empty tractor-trailer with a mass of 10000 kg can climb at a sustained speed of 75 km/h.

The frontal area (A) of the truck is 10 m2, the drag coefficient = 1.00 and the available power is 280 kW, ρ=1.2 kg*m−3, g = 9.81 m*sec−2

2. What is the maximum grade a bicycle can climb at a sustained speed of 12 km/h assuming the following:

*   Rho = density of air (1.20 kg*m−3)
*   g = 9.81 m*sec−2
*   Mass (with bicyclist) = 100 kg
*   Nominal Power = 1 kW
*   Frontal Area (A) = 1 m2
*   Drag Coefficient = 0.5
*   Available power = 100 percent of nominal power
*   Fr = 0.020 W

3. Bicyclists get tired. Assume the bicyclist slowly loses power (and thus velocity) going up the hill of the grade you just determined in question 2 above. If available power drops continuously from 100% to 0% over the course of the hour, to the nearest kilometer, how far does the bicyclist travel? (Use appropriate approximations.)

Additional Questions

1.  What is maximum grade a vehicle can travel, what effects it? Explain how to find maximum grade at a given speed. Explain what each variable means and how it contributes to figuring max grade.
2.  Why are \(A\) and \(C_D\) the only things need to calculate air resistance. → Because it is a crude approximation of aerodynamics. Real aerodynamics are of course complicated, but the additional detail does not sufficiently improve accuracy.
3.  If there were no heavy vehicles, would planners design roads with steeper grades? → Yes, they should. There has been discussion for a number of years for separate car and truck highways, since car-only highways would be cheaper and truck-only highways could avoid congestion. However additional rights of way would be required
4.  Define rolling resistance. Why is rolling resistance different for cars and trucks? What is the difference between rolling resistance and maximum grade?
5.  What is the relationship between available power and nominal power? Why do trucks use more of their nominal power than cars.
6.  What is the mass/power ratio used for?
7.  What happens if air resistance is larger than tractive effort force.
8.  What is maximum grade a road can have?
9.  What forces affect vehicle motion?
10.  What are two relevant parameters for passenger car, type {\displaystyle P}![P](https://wikimedia.org/api/rest_v1/media/math/render/svg/b4dc73bf40314945ff376bd363916a738548d40a)?
11.  Define \(F_r\), \(F_a\), \(F_t\), \(F_g\).
12.  If given a grade of 3%, should you use 0.03 or 3 in the equation?
13.  How does coefficient of rolling resistance vary between vehicles.
14.  What kind of safety factors are in these equations.

## Variables

*   \(F_t\) - Tractive Effort Force
*   \(F_a\) - Aerodynamic resistance Force
*   \(F_{rl}\) - Rolling Resistance Force
*   \(F_g\) - Grade Resistance Force
*   \(W\) - Vehicle Weight
*   \(m\) - Vehicle Mass
*   \(a\) - Acceleration
*   \(\rho\) - Air Density
*   \(A\) - Frontal area of the vehicle
*   \(C_D\) - Coefficient of Drag
*   \(V\) - Speed of the vehicle
*   \(f_{rl}\) - Rolling Friction
*   \(G\) - Grade
*   \(\mu\) - Coefficient of road adhesion
*   \(l_r\) - Distance from rear axle to vehicle's center of gravity
*   \(l_f\) - Distance from front axle to vehicle's center of gravity
*   \(h\) - Height of the center of gravity above the roadway surface
*   \(L\) - Length of wheelbase

## Key Terms

*   Tractive Effort
*   Aerodynamic Resistance
*   Rolling Resistance
*   Grade Resistance
