import { useEffect, useState } from "react";
import DestinationCard from "../components/DestinationCard";

function Explore() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/destinations")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load destinations.");
        }

        return response.json();
      })
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success"></div>
        <p className="mt-3">Loading destinations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1>Explore Destinations</h1>

        <p className="text-muted">
          Discover places and travel more responsibly.
        </p>
      </div>

      <div className="row">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
          />
        ))}
      </div>
    </div>
  );
}

export default Explore;