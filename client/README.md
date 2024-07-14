# Cynomi Sleep Tracker App Client

This is the front-end client for the Cynomi Sleep Tracker App, built using Next.js, and styled with CSS modules and Tailwind CSS. It provides a user interface for tracking and analyzing sleep patterns.

## Features

- **Form Submission**: Users can enter their sleep data, including name, email, gender, date, and hours slept.
- **Data Visualization**: Displays a table of sleep data and a bar chart showing the last seven days of sleep trends.
- **Responsive Design**: Optimized for both desktop and mobile viewing.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.x or later)
- npm (v6.x or later)

## Installation

To set up the client locally, follow these steps:
 
1. navigate to the client/ folder
2. Install the dependencies: npm install
3. To run the application locally: npm run dev

This will start the Next.js development server on http://localhost:3000. Navigate to this URL in your web browser to view the application.

## Structure
- pages/: Contains all the page components. Each page is associated with a route based on its file name.
- components/: Reusable UI components.
- styles/: CSS and Tailwind configuration files.
- services/: Services for API interactions.
- contexts/: React contexts for state management across components.

## API Integration

The client interacts with a backend server via RESTful APIs. Make sure the backend server is running and accessible to fetch and post data as expected. Please make sure you have a dynamoDB set up for this application to run appropriately. You can find the respective documentation in the server/ folder.

