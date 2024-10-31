# **Pricing Model for Chauffeur Services**

This document outlines the pricing model for calculating ride prices for chauffeur services based on various factors such as distance, vehicle class, time of day (peak or off-peak), and additional fees like airport charges. The goal is to provide a precise and comprehensive formula that can be used to compute prices accurately.

---

## **Components of the Pricing Model**

1. **Base Fare (BF):** A fixed charge applied to every ride regardless of distance.
2. **Airport Fee (AF):** An additional fixed fee for pickups or drop-offs at airports.
3. **Per-Kilometer Charges (PKC):** The variable charge based on the distance traveled, calculated using degressive rates over distance bands.
4. **Class Multiplier (CM):** A multiplier that adjusts the fare based on the vehicle class selected.
5. **Van Class Multiplier Adjustment (VMA):** An additional adjustment for the Van class that increases with distance.
6. **Peak Surcharge (PS):** An additional percentage charge applied during peak hours.
7. **Total Price (TP):** The final price calculated after applying all the above components.

---

## **Pricing Formula**

The **Total Price (TP)** is calculated using the following formula:

TP=(BF+AF+PKC)×CM×(1+PS)

Where:

- BF = Base Fare
- AF = Airport Fee (if applicable; otherwise, AF = 0)
- PKC = Per-Kilometer Charges (calculated based on distance bands)
- CM = Class Multiplier (adjusted for vehicle class)
- PS = Peak Surcharge (as a decimal; e.g., 10% = 0.10)

---

## **Constants and Parameters**

### **1. Base Fare (BF)**

- **Value:** £30.00
- **Description:** A fixed starting charge applied to every ride.

### **2. Airport Fee (AF)**

- **Value:** £10.00
- **Description:** Additional fee for airport pickups or drop-offs.
- **Application:** Include only if the trip involves an airport.

### **3. Peak Surcharge (PS)**

- **Value:** 10% (0.10)
- **Description:** An extra charge applied during peak hours.
- **Peak Hours:** 06:00 AM to 13:00 PM (6:00 to 13:00).
- **Off-Peak Hours:** 13:01 PM to 05:59 AM (13:01 to 5:59).
- **Application:** Apply the surcharge during peak hours; otherwise, PS = 0.

### **4. Distance Bands and Rates**

The **Per-Kilometer Charges (PKC)** are calculated using degressive rates based on the total trip distance (D):

#### **Distance Bands**

- **Band 1:** 0 KM to 10 KM
  - **Rate (R_1):** £3.00 per KM
- **Band 2:** Over 10 KM up to 40 KM
  - **Rate (R_2):** £2.00 per KM
- **Band 3:** Over 40 KM
  - **Rate (R_3):** £1.50 per KM

#### **Calculating PKC**

1. **Determine the distance in each band:**

   - **Band 1 Distance** (D_1): min(D, 10)
   - **Band 2 Distance** (D_2): min(D - 10, 30) if D > 10 ; else 0 
   - **Band 3 Distance** (D_3): D - 40 if D > 40 ; else 0 

2. **Calculate charges for each band:**

   Charge_1 = D_1 * R_1
   Charge_2 = D_2 * R_2
   Charge_3 = D_3 * R_3

3. **Sum the charges:**

   PKC = Charge_1 + Charge_2 + Charge_3


### **5. Class Multipliers (CM)**

The **Class Multiplier** adjusts the subtotal based on the selected vehicle class.

#### **Vehicle Classes and Multipliers**

- **Business Class:**
  - **Multiplier** (CM_B): 1.0
- **First Class:**
  - **Multiplier** (CM_F): 1.3
- **Van Class:**
  - **Multiplier** (CM_V): Variable, increases with distance.

#### **Van Class Multiplier Adjustment (VMA)**

For the **Van Class**, the multiplier increases with distance to reflect higher operational costs at longer distances.

##### **Van Class Multiplier Formula**

  CM_V = 1.4 + k * D

- ( D ) = Total trip distance in KM
- ( k ) = Constant rate of increase (adjusted based on data)
- **Maximum Multiplier Cap:** To prevent excessively high multipliers at very long distances, a cap is applied.
  - **Cap Value:** 1.9

##### **Determining Constant ( k )**

- **Value:** 0.002
- **Description:** Determines how much the multiplier increases per KM.
- **Application:** Adjust ( k ) as needed based on observed data for accuracy.

##### **Applying the Cap**

  CM_V = min(1.4 + k * D, 1.9)

---

## **Step-by-Step Calculation**

Follow these steps to calculate the **Total Price (TP)** for a ride:

### **1. Determine the Trip Distance ( D )**

- **Measure the total distance** between the pickup and drop-off locations in kilometers.

### **2. Calculate Per-Kilometer Charges (PKC)**

1. **Calculate distances in each band:**

   - D_1 = min(D, 10)
   - D_2 = min(D - 10, 30) if D > 10; else 0 
   - D_3 = D - 40 if D > 40; else 0 

2. **Calculate charges for each band:**

   - Charge_1 = D_1 * R_1
   - Charge_2 = D_2 * R_2 
   - Charge_3 = D_3 * R_3 

3. **Sum the charges:**

   - PKC = Charge_1 + Charge_2 + Charge_3 

### **3. Calculate Subtotal Before Multipliers**

   Subtotal = BF + AF + PKC

- Include **AF** only if the trip involves an airport.

### **4. Apply Class Multiplier (CM)**

#### **For Business Class:**

   Subtotal_Class = Subtotal * CM_B

#### **For First Class:**

   Subtotal_Class = Subtotal * CM_F

#### **For Van Class:**

1. **Calculate Van Class Multiplier:**

   CM_V = min(1.4 + k * D, 1.9)

2. **Apply Multiplier:**

   Subtotal_Class = Subtotal * CM_V

### **5. Apply Peak Surcharge (PS)**

1. **Determine if Peak Surcharge Applies:**

   - If the pickup time is between 06:00 AM and 13:00 PM, **PS = 0.10**.
   - Otherwise, **PS = 0**.

2. **Calculate Total Price:**

   TP = Subtotal_Class * (1 + PS)

---

## **Example Calculation**

### **Scenario: Airport Transfer**

- **Trip Type:** Airport Transfer
- **Distance ( D )**: 20 KM
- **Vehicle Class:** Van
- **Pickup Time:** 9:00 AM (Peak Time)
- **Day:** Any day
- **Airport Involved:** Yes

### **Steps:**

#### **1. Calculate PKC**

1. **Distances in Bands:**

   - D_1 = min(20, 10) = 10KM
   - D_2 = min(20 - 10, 30) = 10KM
   - D_3 = 0KM (since D = 20KM)

2. **Charges for Each Band:**

   - Charge_1 = 10 * £3.00 = £30.00
   - Charge_2 = 10 * £2.00 = £20.00 
   - Charge_3 = 0 * £1.50 = £0.00 

3. **Total PKC:**

   - PKC = £30.00 + £20.00 + £0.00 = £50.00 

#### **2. Calculate Subtotal Before Multipliers**

- Subtotal = BF + AF + PKC 
- Subtotal = £30.00 + £10.00 + £50.00 = £90.00 

#### **3. Apply Van Class Multiplier**

1. **Calculate Van Class Multiplier:**

   - CM_V = min(1.4 + 0.002 * 20, 1.9) 
   - CM_V = min(1.4 + 0.04, 1.9) = 1.44 

2. **Apply Multiplier:**

   - Subtotal_Class = £90.00 * 1.44 = £129.60 

#### **4. Apply Peak Surcharge**

- PS = 0.10 (since pickup time is 9:00 AM)
- TP = £129.60 * (1 + 0.10) = £129.60 * 1.10 = £142.56 

#### **5. **Final Total Price**

- **Total Price:** £142.56

---

## **Notes and Considerations**

- **Rounding:** Round the final price to the nearest two decimal places (i.e., the nearest penny).
- **Maximum Van Class Multiplier:** The Van Class Multiplier is capped at **1.9** to prevent excessively high prices over very long distances.
- **Adjustments:** The constants and rates (e.g., Base Fare, Rates per KM, Multipliers) can be adjusted based on operational costs, competitive pricing, and market conditions.
- **Validation:** Test the formula with multiple scenarios and actual data to ensure accuracy and make adjustments as necessary.

---

## **Conclusion**

This pricing model provides a structured and precise method for calculating ride prices based on key variables. By adjusting the constants and parameters, you can tailor the model to fit your specific business needs and ensure competitive and profitable pricing.

---

**Disclaimer:** This model is based on observed data and estimations. It should be tested and validated with actual pricing data and adjusted accordingly to ensure accuracy and compliance with your business policies.