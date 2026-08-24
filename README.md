# 🌍 YatraWise — Responsible Tourism Planner

YatraWise is a responsive React-based web application that helps users plan **personalized and responsible trips**. Unlike a generic tourism website, YatraWise focuses on sustainable travel, local experiences, travel preparation, and personalized itinerary planning.

## 🚩 Problem Statement

Tourists often face difficulties while planning a trip because information is scattered across different platforms. They may not know:

- The best time to visit a destination
- What activities match their interests
- What to carry for the trip
- Local etiquette and responsible travel practices
- How to support local businesses and communities
- How to reduce their environmental impact while travelling

YatraWise brings these aspects together into a single travel planning platform.

---

## ✨ Features

### 🗺️ Explore Destinations

Users can explore multiple destinations and view:

- Destination description
- Best time to visit
- Travel categories and interests
- Responsible travel suggestions
- Local etiquette and crowd awareness tips

### 🔍 Dynamic Destination Details

The application uses **React Router dynamic routes** to display destination-specific pages.

Example:

```text
/destination/hyderabad
/destination/hampi
/destination/jaipur
```

The same `DestinationDetails` component dynamically displays information based on the destination ID.

### 📅 Personalized Trip Planner

Users can select:

- Destination
- Trip duration
- Travel interests such as Heritage, Food, Nature, and Shopping

The application dynamically generates a **day-wise suggested itinerary** based on the selected preferences.

### 🤝 Local Experiences

Users can discover local experiences such as:

- Heritage walks
- Food experiences
- Cultural walks
- Tea garden experiences
- Local craft experiences

A reusable Bootstrap modal displays additional information about the selected experience.

### 🌱 Sustainable Travel

The application provides responsible travel recommendations and includes an interactive **Sustainability Score**.

Users select sustainable actions they plan to follow, and the score updates dynamically.

### 🎒 Interactive Travel Checklist

Users can select a destination and receive:

- Essential items
- Clothing recommendations
- Responsible travel items
- Destination-specific items

The application calculates and displays the user's preparation progress using a dynamic progress bar.

### 📩 Contact Form with Validation

The contact form uses:

- Controlled React components
- Form validation
- JavaScript regular expressions for email validation
- Dynamic error messages
- Success alerts

### 🔄 Fetch API and JSON

Destination data is asynchronously loaded using:

- `useEffect`
- Fetch API
- JSON
- Loading state
- Error handling

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- React.js
- Bootstrap 5

### React Concepts

- Functional Components
- JSX
- Props
- State Management with `useState`
- Side Effects with `useEffect`
- Controlled Forms
- Conditional Rendering
- Event Handling
- React Router
- Dynamic Routes
- Reusable Components

### JavaScript Concepts

- Arrays and Objects
- Array Methods such as `.map()` and `.filter()`
- `.find()`
- Spread Operator
- Loops and Conditional Statements
- Regular Expressions
- JSON
- Fetch API
- Asynchronous Data Handling

---

## 📂 Project Structure

```text
yatrawise/
│
├── public/
│   └── data/
│       └── destinations.json
│
├── src/
│   ├── components/
│   │   ├── DestinationCard.jsx
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   │
│   ├── data/
│   │   ├── destinations.js
│   │   └── itineraryData.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Explore.jsx
│   │   ├── DestinationDetails.jsx
│   │   ├── PlanTrip.jsx
│   │   ├── LocalExperiences.jsx
│   │   ├── SustainableTravel.jsx
│   │   ├── TravelChecklist.jsx
│   │   └── Contact.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── README.md
```

---

## ⚙️ How the Personalized Itinerary Works

1. The user selects a destination.
2. The user enters the trip duration.
3. The user selects one or more interests.
4. React stores these inputs using `useState`.
5. On form submission, the inputs are validated.
6. The application retrieves relevant activities from the itinerary data.
7. A day-wise itinerary is generated dynamically.
8. The generated itinerary is stored in state and displayed on the page.

For example:

```text
Destination: Hyderabad
Duration: 3 Days
Interests: Heritage, Food, Nature
```

The application can generate:

```text
Day 1 → Heritage
Day 2 → Food
Day 3 → Nature
```

For longer trips, the selected interests cycle using the modulo operator.

---

## 🔄 Fetch API Workflow

```text
Explore Component Loads
        ↓
useEffect() Runs
        ↓
fetch("/data/destinations.json")
        ↓
JSON Response Received
        ↓
Data Stored Using setDestinations()
        ↓
React Re-renders
        ↓
Destination Cards Displayed
```

The application also handles loading and error states.

---

## 📚 FSD Concepts Demonstrated

| Concept | Implementation in YatraWise |
|---|---|
| HTML5 | Forms, lists, images and layout |
| CSS | Custom styling and responsive design |
| Bootstrap 5 | Navbar, cards, grid, forms, alerts, modals and progress bars |
| JavaScript | Arrays, objects, loops, conditions and events |
| Regular Expressions | Email validation |
| JSON | Destination data |
| Fetch API | Asynchronous destination loading |
| React Components | Reusable UI components |
| Props | Data passed between components |
| `useState` | Forms and interactive features |
| `useEffect` | Fetching JSON data |
| React Router | Multi-page navigation |
| Dynamic Routes | Destination-specific pages |
| Controlled Forms | Trip planner and contact form |
| Conditional Rendering | Loading, errors and generated content |

---

## 🎯 Learning Outcomes

This project demonstrates practical understanding of:

- Building a multi-page application using React
- Managing application state
- Creating reusable components
- Handling user input and form validation
- Generating dynamic content based on user preferences
- Using React Router for navigation
- Fetching and handling JSON data asynchronously
- Building responsive interfaces using Bootstrap

---

## 🚀 Future Improvements

Possible future enhancements include:

- Real-time weather integration
- Live crowd-level information
- Map integration
- User authentication
- Saving and managing trip plans
- Backend database integration
- Real local business recommendations
- AI-powered itinerary recommendations
- Accessibility information for destinations

---

## 👩‍💻 Author

**Sanjana**

Developed as a **Full Stack Development case study project**.

---

## 📄 License

This project is licensed under the terms of the LICENSE file included in this repository.
