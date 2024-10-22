# Project Details

## Table of Contents

1. [Project Overview](#project-overview)
2. [Existing Project Structure](#existing-project-structure)
3. [Google Maps API Integration](#google-maps-api-integration)
4. [Supabase Integration](#supabase-integration)
   - [Authentication](#authentication)
   - [Database Integration](#database-integration)
5. [Stripe Integration](#stripe-integration)
6. [Backend Development Tasks](#backend-development-tasks)
7. [Additional Considerations](#additional-considerations)
8. [Conclusion](#conclusion)

---

## Project Overview

The Chauffeur Platform is a web application that allows customers to book rides, manage their bookings, and access information about various services offered. The frontend is built using Next.js 14, Tailwind CSS, Shadcn UI, and Lucide Icons. Initially, Clerk was used for authentication, but the goal is to replace it with Supabase for authentication and database functionalities. Additionally, the payment process needs to be integrated with Stripe.

**Important Updates**:

- **Mandatory Authentication**: Customers are now required to be logged in before proceeding to the payment step. After entering their customer information, they must log in or create an account. Upon successful authentication, they will be redirected back to the booking process to complete the payment.
- **Google Maps Integration**: The booking components for the pickup and dropoff location forms need to integrate with the Google Maps Places Autocomplete API so that when a customer starts typing, it shows location results.

---

## Existing Project Structure

The current project structure is organized as follows:
├── README.md
├── app
│ ├── booking
│ │ ├── confirmation
│ │ └── page.tsx
│ ├── error.tsx
│ ├── faq
│ │ ├── [category]
│ │ └── page.tsx
│ ├── favicon.ico
│ ├── fonts
│ │ ├── GeistMonoVF.woff
│ │ └── GeistVF.woff
│ ├── globals.css
│ ├── layout.tsx
│ ├── manage-bookings
│ │ ├── [bookingId]
│ │ └── page.tsx
│ ├── not-found.tsx
│ ├── page.tsx
│ ├── partner-with-us
│ │ └── page.tsx
│ └── services
│ ├── chauffeur
│ └── hourly-rates
├── components
│ ├── auth
│ │ ├── reset-password.tsx
│ │ ├── sign-in.tsx
│ │ ├── sign-up.tsx
│ │ ├── update-password.tsx
│ │ └── verify.tsx
│ ├── booking
│ │ ├── booking-component.tsx
│ │ ├── booking-summary-card.tsx
│ │ ├── confirmation-page.tsx
│ │ ├── customer-details.tsx
│ │ ├── payment.tsx
│ │ ├── vehicle-selection.tsx
│ │ └── view
│ ├── faq
│ │ ├── faq-accordion.tsx
│ │ └── view
│ ├── footer
│ │ └── footer.tsx
│ ├── header
│ │ ├── header-data.ts
│ │ └── header.tsx
│ ├── home
│ │ ├── company-facts.tsx
│ │ ├── download-app.tsx
│ │ ├── download-buttons.tsx
│ │ ├── hero-section.tsx
│ │ ├── how-it-works.tsx
│ │ └── our-services.tsx
│ ├── manage-bookings
│ │ ├── booking-details-view.tsx
│ │ └── manage-bookings-view.tsx
│ ├── partner-with-us
│ │ └── partner-with-us-view.tsx
│ ├── services
│ │ ├── chauffeur-service.tsx
│ │ └── hourly-rates.tsx
│ └── ui
│ ├── accordion.tsx
│ ├── button.tsx
│ ├── calendar.tsx
│ ├── card.tsx
│ ├── carousel.tsx
│ ├── input.tsx
│ ├── label.tsx
│ ├── navigation-menu.tsx
│ ├── popover.tsx
│ ├── select.tsx
│ ├── separator.tsx
│ ├── table.tsx
│ └── tabs.tsx
├── components.json
├── hooks
│ └── use-carousel.ts
├── instructions
│ ├── half-step.png
│ ├── initial-step.png
│ ├── instructions.md
│ └── select-vehicle.png
├── lib
│ └── utils.ts
├── middleware.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│ ├── images
│ │ ├── app-mockup.jpeg
│ │ ├── business-class.webp
│ │ ├── business-meetings.jpeg
│ │ ├── chauffeur-hero.jpeg
│ │ ├── chauffeur-service.jpeg
│ │ ├── choose-vehicle.jpeg
│ │ ├── city-tours.jpeg
│ │ ├── create-route.jpeg
│ │ ├── electric-class.webp
│ │ ├── enjoy-journey.jpeg
│ │ ├── first-class.webp
│ │ ├── hero-background.jpeg
│ │ ├── hourly-rates-hero.jpeg
│ │ ├── hourly-rates.jpeg
│ │ ├── luxury-interior.jpeg
│ │ ├── suv-class.webp
│ │ ├── tailored-service.jpeg
│ │ └── van-suv.webp
│ ├── logo-white.png
│ └── logo.webp
├── tailwind.config.ts
└── tsconfig.json

### Explanation

- **app/**: Contains the Next.js pages for routing.

  - **booking/**: Pages related to the booking process.
  - **faq/**: Frequently Asked Questions pages.
  - **manage-bookings/**: Pages for authenticated users to manage their bookings.
  - **services/**: Pages providing information about services offered.
  - **partner-with-us/**: Page for potential partners.
  - **layout.tsx**: Root layout component with Header and Footer.
  - **page.tsx**: The landing page.
  - **error.tsx**, **not-found.tsx**: Error handling pages.

- **components/**: Reusable components organized by functionality.

  - **auth/**: Components related to authentication (currently using Clerk).
  - **booking/**: Components used in the booking process.
  - **faq/**: Components for FAQ pages.
  - **home/**: Components used on the landing page.
  - **manage-bookings/**: Components for the manage bookings pages.
  - **services/**: Components for the services pages.
  - **ui/**: Generic UI components like buttons, inputs, tables, etc.

- **hooks/**: Custom React hooks used throughout the project.

- **lib/**: Utility functions.

- **public/**: Static assets like images and logos.

- **middleware.ts**: Custom middleware for request handling.

---

## Google Maps API Integration

### Goals

- Integrate the Google Maps Places Autocomplete API into the booking components for pickup and dropoff location forms.
- Provide users with an interactive and user-friendly way to select locations by showing suggestions as they type.
- Ensure that the integration is seamless and does not negatively impact performance.

### Components to Update

- **components/booking/booking-component.tsx**
- **components/booking/customer-details.tsx** (if pickup/dropoff locations are entered here)
- Any other component where pickup and dropoff location inputs are used.

### Tasks

1. **Obtain Google Maps API Key**

   - Create a Google Cloud Platform (GCP) project if not already existing.
   - Enable the **Places API** and **Maps JavaScript API** for the project.
   - Obtain the API key.
   - Restrict the API key to prevent unauthorized use (e.g., restrict by HTTP referrers).

2. **Install Necessary Libraries**

   - Install any required libraries to facilitate Google Maps integration. Options include:

     - Using the Google Maps JavaScript API directly.
     - Installing packages like `@react-google-maps/api` for React components.

     ```bash
     npm install @react-google-maps/api
     ```

3. **Integrate Autocomplete in Booking Components**

   - **booking-component.tsx**:

     - Replace standard input fields for pickup and dropoff locations with autocomplete-enabled input fields.
     - As the user types, display location suggestions.
     - Allow the user to select a suggested location.
     - Ensure that the selected location's details (e.g., place ID, coordinates, formatted address) are stored for use in the booking process.

   - **Handle Both Pickup and Dropoff Fields**:
     - Implement the autocomplete functionality for both pickup and dropoff location inputs.
     - For the hourly booking option, where dropoff may not be required, adjust accordingly.

4. **Store Selected Location Data**

   - Ensure that when a location is selected, all necessary data is captured:
     - Formatted address
     - Place ID
     - Latitude and longitude (if needed)
   - Store this data in the booking state to be used later (e.g., for distance calculation, displaying in booking summary).

5. **Update Booking Summary Card**

   - **booking-summary-card.tsx**:
     - Display the selected pickup and dropoff locations.
     - Update in real-time as the user makes selections.

6. **Calculate Distance and Duration**

   - If the application needs to calculate the distance and estimated duration between the pickup and dropoff locations:
     - Use the **Distance Matrix API** or **Directions API**.
     - Obtain an API key for these services if necessary.
     - Integrate the API calls into the booking process to retrieve distance and duration information.
     - Use this data to calculate pricing if applicable.

7. **Handle API Key Security**

   - Store the Google Maps API key securely using environment variables.
   - Do not expose the API key in the frontend code.
   - If possible, set up a proxy server or use API key restrictions to enhance security.

8. **Testing**

   - Test the autocomplete functionality thoroughly.
     - Ensure that suggestions are accurate and relevant.
     - Verify that the selected locations are correctly captured and stored.
   - Test performance to ensure that the API integration does not slow down the application.

---

## Supabase Integration

Supabase will replace Clerk for authentication and will handle database functionalities, including saving booking details. The backend developer needs to integrate Supabase into the existing project, ensuring minimal disruption to the frontend structure.

### Authentication

#### Goals

- Replace Clerk authentication with Supabase Auth.
- Implement the following authentication functionalities:
  - Login
  - Signup
  - Update Password
  - Reset Password
- Modify the booking flow so that users must log in or sign up after entering customer details and before proceeding to payment.
- Ensure that after authentication, users are redirected back to the booking process to complete their payment.

#### Components to Update

- **components/auth/**
  - **reset-password.tsx**
  - **sign-in.tsx**
  - **sign-up.tsx**
  - **update-password.tsx**
- **components/booking/**
  - **customer-details.tsx**
  - **booking-steps.tsx** (if exists)
  - **payment.tsx**

#### Updated Booking Flow

1. **Vehicle Selection**: User selects a vehicle.
2. **Customer Details**: User enters their personal information.
3. **Authentication Step**: User is prompted to log in or create an account.
   - If the user chooses to sign up, they complete the registration process.
   - Upon successful login or signup, the user is redirected back to the booking process.
4. **Payment**: User proceeds to payment.
5. **Confirmation**: Booking is confirmed, and details are saved to the database.

#### Tasks

1. **Initialize Supabase Project**

   - Set up a Supabase project.
   - Obtain the Supabase URL and public API key.
   - Store these credentials securely (e.g., using environment variables).

2. **Install Supabase Client**

   - Add the Supabase client library to the project:

     ```bash
     npm install @supabase/supabase-js
     ```

3. **Set Up Supabase Auth**

   - Replace Clerk authentication methods with Supabase Auth in the authentication components.
   - Implement the following functionalities:

     - **Sign Up**: Allow users to create an account with email and password.
       - Handle email verification if required.
     - **Sign In**: Authenticate users with email and password.
     - **Reset Password**: Provide functionality to reset the password via email.
     - **Update Password**: Allow authenticated users to update their password.
     - **Email Verification**: Handle the email verification process if enabled.

4. **Modify Booking Process**

   - **components/booking/customer-details.tsx**:
     - After the user enters their customer information, redirect them to the authentication step.
     - Store the customer information temporarily (e.g., in local state or session storage) to use after authentication.
   - **Authentication Step**:
     - Ensure that after login or signup, the user is redirected back to the booking process.
     - Preserve the booking state throughout the authentication process.
   - **components/booking/payment.tsx**:
     - Proceed to payment only if the user is authenticated.
     - Retrieve the customer information from the temporary storage.

5. **Protect Routes**

   - Update **middleware.ts** to enforce authentication on the payment and confirmation steps.
   - Ensure that unauthenticated users cannot access payment pages directly.

6. **Update Header Component**

   - **components/header/header.tsx**
   - Replace Clerk authentication buttons with Supabase Auth state.
     - Show "Sign In" or "Sign Out" based on authentication status.
     - Update "Manage Bookings" tab visibility.

7. **Session Management**

   - Use Supabase Auth session management to maintain user sessions.
   - Ensure that session persistence is handled correctly on the client side.

### Database Integration

#### Goals

- Save booking details into the Supabase database after a booking is confirmed.
- Ensure that bookings are associated with authenticated users.
- Remove support for guest bookings since users must now be authenticated.
- Store the detailed location information obtained from the Google Maps API for pickup and dropoff locations.

#### Database Schema

1. **Users Table**

   - Supabase Auth automatically manages user accounts.
   - Additional user profile information can be stored in a separate table if needed.

2. **Bookings Table**

   - **Fields**:
     - `id` (UUID): Primary key.
     - `user_id` (UUID): Foreign key referencing `auth.users.id`.
     - `pickup_location` (string): Formatted address.
     - `pickup_place_id` (string): Google Places ID.
     - `dropoff_location` (string, nullable if hourly): Formatted address.
     - `dropoff_place_id` (string, nullable if hourly): Google Places ID.
     - `duration` (integer, nullable if one-way).
     - `date_time` (timestamp).
     - `vehicle_type` (string).
     - `passengers` (integer).
     - `luggage` (integer).
     - `special_requests` (text).
     - `payment_status` (string): e.g., 'Pending', 'Completed', 'Failed'.
     - `booking_status` (string): e.g., 'Confirmed', 'Completed', 'Cancelled'.
     - `created_at` (timestamp).
     - `updated_at` (timestamp).

3. **Tasks**

   - Update the database schema to include fields for `pickup_place_id` and `dropoff_place_id`.
   - Ensure that when saving bookings, the detailed location data is stored.

#### Tasks

1. **Define Database Schema**

   - Use Supabase SQL editor or migration scripts to create the `bookings` table.

2. **Implement Booking Saving Logic**

   - In **components/booking/payment.tsx**, after payment is confirmed:
     - Save the booking details to the Supabase `bookings` table.
     - Include the `pickup_location`, `pickup_place_id`, `dropoff_location`, and `dropoff_place_id`.
     - Associate the booking with the authenticated user's `user_id`.

3. **Update Manage Bookings Page**

   - **components/manage-bookings/manage-bookings-view.tsx**
     - Fetch bookings from the Supabase `bookings` table where `user_id` matches the authenticated user.
     - Display upcoming and past bookings.

4. **Booking Details Page**

   - **components/manage-bookings/booking-details-view.tsx**
     - Fetch detailed booking information from the `bookings` table using the booking ID.
     - Ensure only the owner of the booking can access the details.

5. **Data Validation and Security**

   - Validate all data before saving to the database.
   - Implement security rules in Supabase to protect data access.

---

## Stripe Integration

### Goals

- Replace the existing payment page with Stripe's payment integration.
- Connect the application to the Stripe account.
- Handle payment confirmation and update booking payment status.

### Components to Update

- **components/booking/payment.tsx**
- **components/booking/confirmation-page.tsx**

### Tasks

1. **Set Up Stripe Account**

   - Ensure that a Stripe account is created and configured.
   - Obtain the Stripe API keys (Publishable key and Secret key).
   - Store these credentials securely (e.g., using environment variables).

2. **Install Stripe Libraries**

   - Add the Stripe client library to the project:

     ```bash
     npm install @stripe/stripe-js
     npm install stripe
     ```

3. **Implement Stripe Checkout**

   - Update **payment.tsx** to initiate a Stripe Checkout session.
   - Create an API route (e.g., **pages/api/create-checkout-session.ts**) to create the Checkout session on the server side.
   - Pass the booking details and amount to the Checkout session.

4. **Handle Payment Success and Cancellation**

   - Configure Stripe to redirect to success and cancellation URLs after payment.
   - On success:
     - Update the booking's `payment_status` to 'Completed' in the Supabase `bookings` table.
     - Redirect the user to the booking confirmation page.
   - On cancellation:
     - Allow the user to retry payment or modify booking details.

5. **Webhooks (Optional but Recommended)**

   - Set up Stripe webhooks to handle asynchronous events.
   - Create an API route to receive webhook events from Stripe.
   - Verify the webhook signature for security.
   - Update booking statuses based on events (e.g., payment succeeded, payment failed).

6. **Display Payment Status**

   - In **booking-summary-card.tsx** and **confirmation-page.tsx**, display the payment status to the user.

7. **Test Payments**

   - Use Stripe's test mode to simulate payments during development.
   - Ensure all payment flows are tested thoroughly.

---

## Backend Development Tasks

1. **Set Up Supabase Project**

   - Initialize a new Supabase project.
   - Configure authentication settings.
   - Define database schemas for users and bookings.

2. **Integrate Supabase Auth**

   - Replace existing authentication components with Supabase.
   - Ensure all authentication flows are working:
     - Sign Up
     - Sign In
     - Password Reset
     - Email Verification
     - Update Password

3. **Modify Booking Process for Authentication**

   - Update the booking flow to require users to log in or sign up after entering customer details.
   - Ensure that booking data is preserved across authentication redirects.
   - Handle redirection back to the booking process after successful authentication.

4. **Set Up Google Maps API Integration**

   - Obtain and securely store the API key.
   - Ensure that API key restrictions are in place.

5. **Integrate Autocomplete Functionality**

   - Assist frontend developers if necessary in integrating the Google Maps Places Autocomplete API.
   - Ensure that location data is properly captured and stored.

6. **Update Database Schema**

   - Modify the `bookings` table to include fields for `pickup_place_id` and `dropoff_place_id`.

7. **Implement Database Operations**

   - Implement CRUD operations for bookings.
   - Ensure bookings are saved and retrieved correctly.
   - Protect endpoints and data using Supabase's Row Level Security (RLS) policies.

8. **Integrate Stripe Payments**

   - Replace the payment component with Stripe Checkout.
   - Set up server-side code to create Checkout sessions.
   - Handle payment confirmations and update booking statuses.

9. **Update Middleware and API Routes**

   - Modify **middleware.ts** to work with Supabase Auth.
   - Create necessary API routes for backend operations (e.g., creating Checkout sessions, handling webhooks).

10. **Ensure Data Security**

    - Implement validation and sanitization for all data inputs.
    - Use parameterized queries to prevent SQL injection.
    - Configure Supabase RLS policies to ensure users can only access their own data.

11. **Testing and Debugging**

    - Thoroughly test all authentication and booking functionalities.
    - Ensure payments are processed correctly.
    - Fix any bugs or issues that arise during integration.

---

## Additional Considerations

- **Environment Variables**

  - Store all sensitive credentials (Supabase keys, Stripe keys, Google Maps API key) securely.
  - Use `.env` files or environment variables in deployment settings.

- **Error Handling**

  - Implement robust error handling in authentication, booking, and payment processes.
  - Provide user-friendly messages for common errors.

- **User Experience**

  - Ensure that the new authentication requirement does not negatively impact user experience.
  - Provide clear prompts and guidance during the login/signup process.
  - Preserve booking information throughout the authentication flow.

- **Data Preservation**

  - Ensure that customer details and booking selections are not lost during the authentication process.
  - Consider using session storage or state management solutions to maintain data.

- **API Usage Limits**

  - Monitor Google Maps API usage to avoid exceeding quota limits.
  - Consider implementing caching strategies if applicable.

- **User Privacy**

  - Be transparent about the use of location data.
  - Comply with privacy regulations regarding the storage and handling of personal data.

- **Deployment**

  - Ensure that Supabase, Stripe, and Google Maps integrations are configured correctly in the deployment environment.
  - Update deployment scripts or configurations if necessary.

---

## Conclusion

By integrating Supabase and Stripe into the existing project structure and modifying the booking flow to require user authentication before payment, we enhance the security and user management of the platform. Additionally, integrating the Google Maps Places Autocomplete API improves the user experience during the booking process.

The backend developer's focus should be on:

- Replacing Clerk with Supabase Auth for user authentication.
- Modifying the booking process to include an authentication step after customer details.
- Integrating Google Maps Places Autocomplete API into the booking components.
- Implementing database functionalities to save and retrieve booking details, including detailed location data.
- Integrating Stripe for secure payment processing.
- Ensuring that all new integrations are compatible with the existing frontend components and overall project architecture.

This document provides a clear roadmap for the backend development tasks required to complete the integration successfully, taking into account the updated requirements for user authentication and Google Maps API integration.

---

If there are any questions or clarifications needed, please don't hesitate to reach out.
