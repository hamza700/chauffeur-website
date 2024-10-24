# Project Requirements Document (PRD)

## Project Overview

**Project Name**: Chauffeur Platform

**Description**: Develop a chauffeur platform where customers can book rides, manage their bookings by creating an account, and access informational pages about the services offered.

**Technology Stack**:

- **Frontend**: Next.js 14, Tailwind CSS, Shadcn UI, Lucide Icons
- **Authentication**: Clerk
- **APIs**: Google Maps API (for location autocomplete and distance calculation)
- **Payment Processing**: Stripe

---

## Goals and Objectives

- **User-Friendly Booking**: Provide an intuitive platform for customers to easily book chauffeur services.
- **Account Management**: Enable users to create accounts to manage their bookings efficiently.
- **Informational Content**: Offer detailed information about services to attract and inform potential customers.
- **Seamless Integrations**: Ensure smooth integration with third-party services for authentication, mapping, and payments.
- **Responsive Design**: Deliver a consistent experience across all devices (desktop, tablet, mobile).
- **Accessibility**: Adhere to accessibility standards to make the platform usable for all users.

---

## Project File Structure

To ensure a clear and maintainable codebase, the following file structure is proposed. This structure is designed to minimize the number of files while providing clarity and separation of concerns for developers.

website
.
├── README.md
├── app
│   ├── booking
│   │   ├── confirmation
│   │   └── page.tsx
│   ├── error.tsx
│   ├── faq
│   │   ├── [category]
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── fonts
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── globals.css
│   ├── layout.tsx
│   ├── manage-bookings
│   │   ├── [bookingId]
│   │   └── page.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── partner-with-us
│   │   └── page.tsx
│   └── services
│       ├── chauffeur
│       └── hourly-rates
├── components
│   ├── auth
│   │   ├── reset-password.tsx
│   │   ├── sign-in.tsx
│   │   ├── sign-up.tsx
│   │   ├── update-password.tsx
│   │   └── verify.tsx
│   ├── booking
│   │   ├── booking-component.tsx
│   │   ├── booking-summary-card.tsx
│   │   ├── confirmation-page.tsx
│   │   ├── customer-details.tsx
│   │   ├── payment.tsx
│   │   ├── vehicle-selection.tsx
│   │   └── view
│   ├── faq
│   │   ├── faq-accordion.tsx
│   │   └── view
│   ├── footer
│   │   └── footer.tsx
│   ├── header
│   │   ├── header-data.ts
│   │   └── header.tsx
│   ├── home
│   │   ├── company-facts.tsx
│   │   ├── download-app.tsx
│   │   ├── download-buttons.tsx
│   │   ├── hero-section.tsx
│   │   ├── how-it-works.tsx
│   │   └── our-services.tsx
│   ├── manage-bookings
│   │   ├── booking-details-view.tsx
│   │   └── manage-bookings-view.tsx
│   ├── partner-with-us
│   │   └── partner-with-us-view.tsx
│   ├── services
│   │   ├── chauffeur-service.tsx
│   │   └── hourly-rates.tsx
│   └── ui
│       ├── accordion.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── navigation-menu.tsx
│       ├── popover.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── table.tsx
│       └── tabs.tsx
├── components.json
├── hooks
│   └── use-carousel.ts
├── instructions
│   ├── half-step.png
│   ├── initial-step.png
│   ├── instructions.md
│   └── select-vehicle.png
├── lib
│   └── utils.ts
├── middleware.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── images
│   │   ├── app-mockup.jpeg
│   │   ├── business-class.webp
│   │   ├── business-meetings.jpeg
│   │   ├── chauffeur-hero.jpeg
│   │   ├── chauffeur-service.jpeg
│   │   ├── choose-vehicle.jpeg
│   │   ├── city-tours.jpeg
│   │   ├── create-route.jpeg
│   │   ├── electric-class.webp
│   │   ├── enjoy-journey.jpeg
│   │   ├── first-class.webp
│   │   ├── hero-background.jpeg
│   │   ├── hourly-rates-hero.jpeg
│   │   ├── hourly-rates.jpeg
│   │   ├── luxury-interior.jpeg
│   │   ├── suv-class.webp
│   │   ├── tailored-service.jpeg
│   │   └── van-suv.webp
│   ├── logo-white.png
│   └── logo.webp
├── tailwind.config.ts
└── tsconfig.json


### Explanation and Justification

- **`app` Directory**: Contains all the pages and API routes (if any). Each page corresponds to a URL route.
  - **`layout.tsx`**: Defines the root layout, including the Header and Footer components, ensuring consistency across all pages.
  - **`page.tsx`**: The landing page that includes all seven sections as per the requirements.
  - **`error.tsx`**: A global error page to handle 404 and other HTTP errors.
  - **Subdirectories**:
    - **`booking/page.tsx`**: Manages the entire booking process within a single file, handling all three steps with state management.
    - **`contact-us/page.tsx`**: The Contact Us page with office locations, map, and inquiry form.
    - **`manage-bookings/page.tsx`**: The main page for authenticated users to view their bookings.
    - **`manage-bookings/[bookingId]/page.tsx`**: Dynamic route for displaying detailed information about a specific booking.
    - **`services/page.tsx`**: A single page that renders different content based on the service selected, reducing the number of files.
    - **`faq/page.tsx`**: The main FAQ page listing all categories.
    - **`faq/[category]/page.tsx`**: Dynamic route to display FAQs for a specific category.
  - **`api`**: Contains API routes if server-side functionality is needed.

- **`components` Directory**: Houses reusable components to maintain DRY (Don't Repeat Yourself) principles.
  - **`Header.tsx`** and **`Footer.tsx`**: Shared across all pages for consistent navigation and footer information.
  - **`BookingComponent.tsx`**: The booking form used on multiple pages.
  - **`BookingSteps.tsx`**: Manages the multi-step booking process within a single component.
  - **`BookingSummaryCard.tsx`**: Displays booking details throughout the booking process.
  - **`VehicleCard.tsx`**: Represents each vehicle option in the selection step.
  - **`FAQAccordion.tsx`**: Handles the expandable FAQ items.
  - **`ui`**: Contains shared UI elements like buttons, inputs, and modals.

- **`lib` Directory**: Contains utility functions and helpers.
  - **`utils.ts`**: Utility functions such as API calls to Google Maps, date formatting, and validation helpers.

- **`public` Directory**: Stores static assets that can be served directly.
  - **`images`**: All image files used in the project.
  - **`icons`**: SVG or PNG icons, including Lucide Icons.

- **Configuration Files**: Necessary for project setup and dependencies.
  - **`tailwind.config.ts`**: Configuration for Tailwind CSS.
  - **`next.config.mjs`**: Next.js configuration.
  - **`package.json`**: Project dependencies and scripts.

---

## Core Functionalities

### 1. Landing Page with Booking Component

#### Sections Overview

1. **Header**
2. **Hero Section with Booking Component**
3. **How It Works**
4. **Company Facts**
5. **Our Services**
6. **Download App**
7. **Footer**

#### Detailed Requirements

##### 1. Header

- **Logo**: Positioned on the top-left, links back to the homepage.
- **Navigation Menu**:
  - **Our Services**: Dropdown menu linking to:
    - Chauffeur Service Page
    - Hourly Rates Page
  - **Partner With Us**: Redirects to an external link (specified in configuration).
  - **Manage Bookings**: Visible only when the user is signed in.
  - **Authentication Button**:
    - **Sign In**: If the user is not authenticated.
    - **Sign Out**: If the user is authenticated.
- **Responsive Design**: Collapsible menu on mobile devices.

##### 2. Hero Section with Booking Component
¬
- **Background**: High-quality image representing luxury travel.
- **Booking Component** (`BookingComponent.tsx`):
  - **Tabs**:
    - **One Way**
    - **Hourly**
  - **Fields**:
    - **Pickup Location**:
      - Autocomplete dropdown using Google Maps API.
      - Validates that a location is selected.
    - **Date and Time**:
      - Date picker with a calendar interface.
      - Time selector in 15-minute intervals.
      - Validation to prevent past dates/times.
    - **Dropoff Location** (One Way tab only):
      - Same functionality as Pickup Location.
    - **Duration** (Hourly tab only):
      - Dropdown or input for hours (1 to 24).
      - Validation for numerical input within range.
  - **Search Button**:
    - Positioned at the end.
    - Disabled until all required fields are valid.
- **Layout**:
  - Horizontal alignment of all fields and the search button.
  - Responsive adjustments for smaller screens (fields stack vertically).

##### 3. How It Works

- **Format**: Horizontal timeline with three steps.
- **Steps**:
  1. **Create Route**: Select pickup and dropoff locations or duration.
     - Icon: Map marker.
  2. **Choose Vehicle**: Select from available vehicle types.
     - Icon: Car.
  3. **Enjoy Journey**: Confirmation and ride experience.
     - Icon: Smiley face.
- **Content**:
  - Each step includes:
    - An icon.
    - A title.
    - A brief description.
    - An illustrative image.

##### 4. Company Facts

- **Layout**: Three sections displayed horizontally.
- **Sections**:
  1. **Years of Experience**:
     - Icon: Calendar.
     - Title: "10+ Years in Business"
     - Description: Brief text about the company's history.
  2. **Satisfied Customers**:
     - Icon: Thumbs up.
     - Title: "5,000+ Happy Clients"
     - Description: Emphasize customer satisfaction.
  3. **Miles Driven**:
     - Icon: Road.
     - Title: "1 Million Miles"
     - Description: Showcase reliability and reach.
- **Design**:
  - Consistent styling across sections.
  - Hover effects to enhance interactivity.

##### 5. Our Services

- **Format**: Cards representing each service.
- **Services**:
  - Chauffeur Service
  - Hourly Rates
- **Card Components**:
  - Image representing the service.
  - Title of the service.
  - Brief description.
  - "Learn More" button linking to the respective service page.
- **Layout**:
  - Grid display on larger screens.
  - Stack vertically on mobile devices.

##### 6. Download App

- **Content**:
  - **Call to Action**: Encouraging users to download the mobile app.
  - **Buttons**:
    - **Download on the App Store**:
      - Links to the iOS app.
      - Uses official App Store badge.
    - **Get it on Google Play**:
      - Links to the Android app.
      - Uses official Google Play badge.
  - **Image**:
    - Display a smartphone mockup showcasing the app interface.
- **Layout**:
  - Buttons aligned horizontally next to the image.
  - Responsive design adjusts layout for smaller screens.

##### 7. Footer

- **Components**:
  - **Logo**: Positioned at the top of the footer.
  - **Social Media Links**:
    - Icons linking to official social media profiles.
    - Platforms: Facebook, Twitter, Instagram, LinkedIn.
  - **Quick Links**:
    - Our Services
    - Contact Us
    - FAQs
    - Manage Bookings
  - **Legal Links**:
    - Privacy Policy
    - Terms and Conditions
  - **Contact Information**:
    - Email address
    - Phone number
    - Physical address
- **Design**:
  - Organized into columns for clarity.
  - Consistent color scheme matching the overall branding.

---

### 2. Booking Page

#### Overview

- **Access**: Reached after the user clicks "Search" on the booking component.
- **Process**: Three-step booking process managed within `BookingSteps.tsx`.
- **Persistent Component**: Booking Summary Card (`BookingSummaryCard.tsx`) displayed on the right side (or bottom on mobile devices).

#### Detailed Requirements

##### Booking Summary Card

- **Displays**:
  - Selected pickup and dropoff locations or duration.
  - Date and time of the booking.
  - Total distance (calculated using Google Maps API).
  - Vehicle type (after selection in Step 1).
  - Total passengers and luggage (after Step 2).
  - Real-time price updates based on selections.
- **Interactivity**:
  - Editable fields if the user needs to make changes.
  - Updates automatically as the user progresses.

##### Step 1: Select Vehicle

- **Vehicle Options** (displayed using `VehicleCard.tsx`):
  - **Business Class**:
    - Image of the vehicle.
    - Features:
      - Up to 3 passengers.
      - 2 large luggage items.
      - Complimentary water.
    - Price per distance or time unit.
    - "Select" button.
  - **First Class**:
    - Similar structure with premium features.
  - **Van/SUV**:
    - Accommodates more passengers and luggage.
- **Display**:
  - Vehicles listed vertically.
  - Key features highlighted with icons (e.g., passenger icon, luggage icon).
- **Validation**:
  - Ensure the selected vehicle meets the requirements (e.g., number of passengers).

##### Step 2: Customer Details

- **Options**:
  - **Book as Guest**:
    - Input fields:
      - First Name
      - Last Name
      - Email Address
      - Phone Number (with country code selector)
  - **Sign In/Up**:
    - Integration with Clerk authentication component.
    - Option to sign in if the user already has an account.
- **Additional Details**:
  - **Total Passengers**:
    - Dropdown or input (validate against vehicle capacity).
  - **Total Luggage**:
    - Dropdown or input (validate against vehicle capacity).
  - **Special Requests/Notes**:
    - Text area for additional information.
- **Validation**:
  - All required fields must be completed.
  - Email and phone number formats validated.

##### Step 3: Payment

- **Payment Integration**:
  - **Stripe Checkout**:
    - Secure payment processing.
    - Support for major credit/debit cards.
- **Payment Details**:
  - Display total price, including any taxes or fees.
  - Option to enter promo codes or vouchers.
- **Confirmation**:
  - Upon successful payment, redirect to a confirmation page.

##### Confirmation Page

- **Content**:
  - Large checkmark icon indicating success.
  - Summary of booking details:
    - Booking reference number.
    - Date and time.
    - Vehicle type.
    - Pickup and dropoff locations or duration.
    - Customer details.
- **Actions**:
  - Option to print or download the confirmation.
  - Button to manage bookings (if signed in).
  - Prompt to create an account if booked as guest.

---

### 3. Services Pages

#### Overview

- **Purpose**: Provide detailed information about each service offered.
- **Implementation**:
  - Use a single `page.tsx` file under the `services` directory.
  - Content varies based on query parameters or state.

#### Detailed Requirements

- **Booking Component**:
  - Positioned at the top of each services page.
  - Same functionality as on the landing page.
- **Content Sections**:
  - **Introduction**:
    - Overview of the service.
    - High-quality banner image.
  - **Features**:
    - List of key benefits.
    - Icons and images to enhance readability.
  - **Information with images**:
    - Text with title on one side and image on the other
    - Have two of them but the images and texts inverted sides for the second one
  - **Pricing Information**:
    - Transparent pricing details.
    - Any special offers or packages.
  - **Testimonials**:
    - Customer reviews and ratings.
  - **Call to Action**:
    - Encouragement to book now.
    - Contact information for inquiries.
  - **FaQs**:
    - FaQs relaetd to teh servcie in accordions.
- **Design Elements**:
  - Consistent styling with the rest of the website.
  - Use of cards, sections, and grids to organize content.
  - Responsive images and icons for different screen sizes.

---

### 4. Contact Us Page

#### Detailed Requirements

- **Office Locations**:
  - **Display**:
    - Icons representing each office (e.g., building icon).
    - Office name.
    - Address.
    - Operating hours.
  - **Interactivity**:
    - Clicking on an office highlights its location on the map.

- **Map Integration**:
  - Embedded map (e.g., Google Maps iframe).
  - Pins marking each office location.
  - Zoom and pan controls for user interaction.

- **Inquiry Form**:
  - **Fields**:
    - Name (First and Last)
    - Email Address
    - Phone Number
    - Subject (Dropdown with common topics)
    - Message (Text area)
  - **Validation**:
    - Required fields marked with an asterisk.
    - Email and phone number format checks.
  - **Submission**:
    - On successful submission, display a confirmation message.
    - Option to receive a copy of the message via email.

---

### 5. Manage Bookings Pages for Authenticated Users

#### Access Control

- **Visibility**: "Manage Bookings" tab appears in the header only when the user is signed in.
- **Authentication**: Handled by Clerk, ensuring secure access.

#### Detailed Requirements

##### Main Page (`app/manage-bookings/page.tsx`)

- **Tabs**:
  - **Upcoming Bookings**
  - **Past Bookings**
- **Display**:
  - Bookings presented in a table format.
  - Columns:
    - Booking Reference Number
    - Date and Time
    - Pickup Location
    - Dropoff Location or Duration
    - Vehicle Type
    - Status (e.g., Confirmed, Completed, Cancelled)
- **Interactivity**:
  - Rows are clickable, leading to detailed booking pages.
  - Option to sort and filter bookings (e.g., by date, status).
- **Actions**:
  - **Upcoming Bookings**:
    - Option to cancel or modify (subject to terms).
  - **Past Bookings**:
    - Option to repeat booking or provide feedback.

##### Booking Details Page (`app/manage-bookings/[bookingId]/page.tsx`)

- **Content**:
  - Detailed information about the booking:
    - Full itinerary
    - Driver details (if assigned)
    - Payment summary
  - **Actions**:
    - Print or download booking confirmation.
    - Contact support regarding the booking.
- **Design**:
  - Clean layout with clear sections.
  - Emphasis on important details (e.g., dates, locations).

---

### 6. Error Pages

#### Detailed Requirements

- **Error Page**: `app/error.tsx`
- **Error Handling**:
  - Catch-all for 404 and other HTTP errors.
- **Content**:
  - Prominent error icon (e.g., sad face, broken link).
  - Message indicating the type of error (e.g., "Page Not Found").
  - Brief description or suggestion (e.g., "The page you're looking for doesn't exist or has been moved.").
- **Actions**:
  - Button to return to the homepage.
  - Link to contact support.
- **Design**:
  - Consistent with the site's branding.
  - Engaging and user-friendly tone.

---

### 7. FAQ Pages

#### Overview

- **Main FAQ Page**: `app/faq/page.tsx`
- **Category Pages**: `app/faq/[category]/page.tsx`

#### Detailed Requirements

- **Main FAQ Page**:
  - **Categories**:
    - Booking Process
    - Payment and Pricing
    - Services Offered
    - Account Management
    - Other Topics
  - **Format**:
    - Cards or sections representing each category.
    - Brief descriptions under each category title.
- **Category Pages**:
  - **URL Structure**: `/faq/[category]`
  - **Content**:
    - List of questions related to the category.
    - Implemented as collapsible dropdowns (accordions) using `FAQAccordion.tsx`.
    - Clicking a question expands to show the answer.
  - **Search Functionality**:
    - Optional search bar to find specific questions.
- **Design**:
  - Clean and easy-to-navigate layout.
  - Consistent styling for questions and answers.
  - Use of icons to indicate expandable sections.

---

### 8. Partner With Us Page

#### Overview

- **Purpose**: Provide detailed information about partnernign with the chauffeur company
- **Implementation**:
  - Use a single `page.tsx` file under the `partner-with-us` directory.

#### Detailed Requirements

- **Content Sections**:
  - **Introduction**:
    - Overview of the service.
    - High-quality banner image.
    - Apply now button in the middle that redirect to another link
  - **Features**:
    - List of key benefits.
    - Icons and images to enhance readability.
  - **Information with images**:
    - Text with title on one side and image on the other
    - Have two of them but the images and texts inverted sides for the second one
  - **Testimonials**:
    - Customer reviews and ratings.
  - **Call to Action**:
    - Encouragement to apply now.
    - Contact information for inquiries.
  - **FaQs**:
    - FaQs relaetd to teh servcie in accordions.
- **Design Elements**:
  - Consistent styling with the rest of the website.
  - Use of cards, sections, and grids to organize content.
  - Responsive images and icons for different screen sizes.

---

## Additional Technical Requirements

### Authentication and User Management

- **Clerk Integration**:
  - Handle sign-up, sign-in, and sign-out processes.
  - Securely manage user sessions and data.
- **User Data**:
  - Store user profiles with necessary information.
  - GDPR compliance for data handling.

### API Integrations

- **Google Maps API**:
  - Location autocomplete for pickup and dropoff fields.
  - Distance and duration calculations for pricing.
  - Map displays on Contact Us page.
- **Stripe Payment Processing**:
  - Secure payment collection.
  - Support for refunds and transaction history.
  - Compliance with PCI DSS standards.

### Responsive Design

- Ensure the platform is fully responsive across devices:

  - **Desktop**
  - **Tablet**
  - **Mobile**

- Use Tailwind CSS utilities to implement responsiveness.

### Accessibility

- **WCAG Compliance**:
  - Provide alt text for images.
  - Ensure sufficient color contrast.
  - Keyboard navigability.
  - ARIA labels where necessary.

### Performance Optimization

- **Lazy Loading**:
  - Images and components load as needed.
- **Code Splitting**:
  - Utilize Next.js features to optimize loading times.
- **Caching and CDN**:
  - Serve static assets via a CDN.
  - Implement caching strategies for dynamic content.

### Security

- **Input Validation**:
  - Sanitize all user inputs to prevent XSS attacks.
- **HTTPS Enforcement**:
  - All connections must use TLS/SSL.
- **Content Security Policy (CSP)**:
  - Define CSP headers to mitigate attacks.

### Testing

- **Unit Tests**:
  - Write tests for critical components and utilities.
- **Integration Tests**:
  - Test API integrations with Google Maps and Stripe.
- **User Acceptance Testing (UAT)**:
  - Ensure the application meets all user requirements.

### Deployment

- **Environment Variables**:
  - Securely manage API keys and secrets.
- **Continuous Integration/Continuous Deployment (CI/CD)**:
  - Automated testing and deployment pipeline.
- **Scalability**:
  - Infrastructure supports scaling with increased load.

---

## Data Models

### User

- **Fields**:
  - `userId` (string, unique identifier)
  - `firstName` (string)
  - `lastName` (string)
  - `email` (string, unique)
  - `phoneNumber` (string)
  - `bookings` (array of Booking IDs)

### Booking

- **Fields**:
  - `bookingId` (string, unique identifier)
  - `userId` (string, nullable for guest bookings)
  - `pickupLocation` (string)
  - `dropoffLocation` (string, nullable if hourly)
  - `duration` (number of hours, nullable if one-way)
  - `dateTime` (ISO 8601 string)
  - `vehicleType` (string)
  - `passengers` (number)
  - `luggage` (number)
  - `specialRequests` (string)
  - `paymentStatus` (enum: Pending, Completed, Failed)
  - `bookingStatus` (enum: Confirmed, Completed, Cancelled)

### Vehicle

- **Fields**:
  - `vehicleTypeId` (string, unique identifier)
  - `name` (string)
  - `description` (string)
  - `passengerCapacity` (number)
  - `luggageCapacity` (number)
  - `pricePerMile` (number)
  - `pricePerHour` (number)
  - `features` (array of strings)

---

## Risks and Mitigation

- **API Limitations**:
  - *Risk*: Exceeding Google Maps API usage limits.
  - *Mitigation*: Monitor usage and implement caching where possible.

- **Payment Processing Compliance**:
  - *Risk*: Non-compliance with payment regulations.
  - *Mitigation*: Ensure Stripe integration follows all guidelines.

- **Data Security**:
  - *Risk*: Potential data breaches.
  - *Mitigation*: Implement robust security measures and regular audits.

- **Third-Party Dependency Changes**:
  - *Risk*: Updates or deprecations in Clerk, Stripe, or Google Maps APIs.
  - *Mitigation*: Keep dependencies updated and monitor for announcements.

---

## Conclusion

This comprehensive PRD provides detailed guidance for developers to implement the chauffeur platform efficiently. By combining all requirements into a single document, it ensures that all team members are aligned with the project's objectives, file structure, and implementation strategies. The clear organization of functionalities, technical requirements, and file structure aims to facilitate a smooth development process while minimizing potential misunderstandings and redundancies.
