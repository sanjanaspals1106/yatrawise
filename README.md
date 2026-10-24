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

## 🧩 Full-Stack Setup (MERN)

The React frontend talks to an Express + MongoDB (Mongoose) backend in `server/`.

### Prerequisites

- Node.js 20+
- A MongoDB instance (local `mongod` or a MongoDB Atlas connection string)

### Setup

```bash
npm install
cp .env.example .env      # then set MONGODB_URI (never commit .env)
npm run seed              # idempotent: upserts destinations + itinerary data
npm run dev:all           # API on :5001 + Vite on :5173 (proxies /api)
```

Run separately with `npm run server` and `npm run dev`. Other scripts: `npm run build`, `npm test`.
Port 5001 is the default because macOS uses 5000 for AirPlay.

Tests: unit tests always run; API integration tests use `TEST_MONGODB_URI`
(default `mongodb://127.0.0.1:27017/yatrawise_test`, dropped after the run) and skip if MongoDB is unreachable.

### Environment variables (`.env.example`)

| Variable | Purpose |
| --- | --- |
| `PORT` | API port (default 5001) |
| `MONGODB_URI` | MongoDB connection string |
| `EXPORT_DIR` / `LOG_DIR` | Where itinerary exports and event logs are written |
| `CORS_ORIGIN` | Allowed frontend origin |
| `ADMIN_API_KEY` | Sent as `x-api-key` to use admin endpoints (destination POST/PATCH/DELETE, `GET /api/trips`, `GET /api/contact`, trip metrics). If blank, these are open in development and return 403 when `NODE_ENV=production` |

### REST API

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| GET | `/api/destinations?category=` | List destinations |
| GET | `/api/destinations/:id` | One destination (slug id) |
| POST | `/api/destinations` | Create (validated) |
| PATCH | `/api/destinations/:id` | Partial update |
| DELETE | `/api/destinations/:id` | Delete |
| GET | `/api/trips` | List trips |
| GET | `/api/trips/:id` | One trip |
| POST | `/api/trips` | Create trip; server generates the day-wise itinerary. Body: `{destination, duration (1-7), interests[], travelerName?, notes?}` |
| PATCH | `/api/trips/:id` | Update duration/interests/notes (regenerates itinerary) |
| DELETE | `/api/trips/:id` | Delete trip |
| GET | `/api/trips/:id/export` | Writes itinerary to disk and downloads it as `.txt` |
| GET | `/api/trips/stats/metrics` | In-memory event counters |
| POST | `/api/contact` | Save a contact message (validated) |
| GET | `/api/contact` | List messages |

Admin endpoints (see `ADMIN_API_KEY`) are the destination writes, the trips list, metrics and the contact list. Errors return JSON: `400` validation (`details` per field), `404`, `409` duplicate, `500`.

### FSD Units IV & V Mapping

| Concept | Where |
| --- | --- |
| Async file system (`fs/promises`) | `server/services/itinerary.js` (itinerary export), `server/events/tripEvents.js` (log append) |
| `EventEmitter` custom events | `server/events/tripEvents.js` — `tripCreated`, `tripDeleted`, `tripExported` listeners log and count metrics |
| Custom middleware | `server/middleware/index.js` — request logger, ObjectId validator, 404 handler, central error handler |
| Express routing, REST verbs | `server/routes/*.js`, `server/app.js` |
| Mongoose schemas + validation | `server/models/*.js` |
| Idempotent seeding | `server/scripts/seed.js` (reads `src/data/*.js`, upserts by slug) |
| React ↔ API integration | `Explore`, `DestinationDetails`, `PlanTrip`, `Contact` pages use `fetch` |

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
│       └── destinations.json   (legacy static copy, no longer fetched)
│
├── server/                     (Express API, models, events, seed, tests)
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
fetch("/api/destinations")
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
