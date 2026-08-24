import { useState } from "react";
import destinations from "../data/destinations";
import itineraryData from "../data/itineraryData";

function PlanTrip() {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [interests, setInterests] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [error, setError] = useState("");

  const interestOptions = [
    "heritage",
    "food",
    "nature",
    "shopping"
  ];

  function handleInterestChange(event) {
    const { value, checked } = event.target;

    if (checked) {
      setInterests([...interests, value]);
    } else {
      setInterests(
        interests.filter((interest) => interest !== value)
      );
    }
  }

  function generateItinerary(event) {
    event.preventDefault();

    if (!destination || !duration || interests.length === 0) {
      setError("Please select a destination, duration, and at least one interest.");
      return;
    }

    setError("");

    const tripPlan = [];
    const destinationActivities = itineraryData[destination];

    for (let day = 0; day < Number(duration); day++) {
      const selectedInterest =
        interests[day % interests.length];

      const activities =
        destinationActivities[selectedInterest];

      tripPlan.push({
        day: day + 1,
        theme: selectedInterest,
        activities
      });
    }

    setItinerary(tripPlan);
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1>Plan My Trip</h1>
        <p className="text-muted">
          Tell us what you enjoy, and we'll create a suggested itinerary.
        </p>
      </div>

      <form
        onSubmit={generateItinerary}
        className="card shadow-sm p-4 mb-5"
      >
        <div className="mb-4">
          <label className="form-label">
            Destination
          </label>

          <select
            className="form-select"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          >
            <option value="">Choose a destination</option>

            {destinations.map((place) => (
              <option key={place.id} value={place.id}>
                {place.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label">
            Trip Duration (Days)
          </label>

          <input
            type="number"
            className="form-control"
            min="1"
            max="7"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label d-block">
            Your Interests
          </label>

          {interestOptions.map((interest) => (
            <div className="form-check" key={interest}>
              <input
                className="form-check-input"
                type="checkbox"
                value={interest}
                id={interest}
                checked={interests.includes(interest)}
                onChange={handleInterestChange}
              />

              <label
                className="form-check-label text-capitalize"
                htmlFor={interest}
              >
                {interest}
              </label>
            </div>
          ))}
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <button className="btn btn-success" type="submit">
          Generate Itinerary
        </button>
      </form>

      {itinerary.length > 0 && (
        <section>
          <h2 className="text-center mb-4">
            Your Suggested Itinerary
          </h2>

          <div className="row">
            {itinerary.map((plan) => (
              <div
                className="col-md-6 col-lg-4 mb-4"
                key={plan.day}
              >
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h4>Day {plan.day}</h4>

                    <span className="badge bg-success text-capitalize mb-3">
                      {plan.theme}
                    </span>

                    <ul>
                      {plan.activities.map((activity) => (
                        <li key={activity}>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default PlanTrip;