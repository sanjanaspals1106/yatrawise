import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function DestinationDetails() {
  const { id } = useParams();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/destinations/${id}`)
      .then((response) => (response.ok ? response.json() : null))
      .catch(() => null)
      .then((data) => {
        setDestination(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="container py-5 text-center">
        <h2>Destination not found</h2>
        <Link to="/explore" className="btn btn-success mt-3">
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-4">
          <img
            src={destination.image}
            alt={destination.name}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-6">
          <h1>{destination.name}</h1>

          <p className="lead">
            {destination.description}
          </p>

          <p>
            <strong>Best Time to Visit:</strong>{" "}
            {destination.bestTime}
          </p>

          <div>
            {destination.category.map((item) => (
              <span
                key={item}
                className="badge bg-success me-2"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="detail-card p-4 h-100">
            <h3>🕒 Best Visiting Time</h3>
            <p>
              Plan your visit between {destination.bestTime} for a
              more comfortable travel experience.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="detail-card p-4 h-100">
            <h3>👥 Crowd Awareness</h3>
            <p>
              Visit popular attractions early in the morning or during
              off-peak hours whenever possible.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="detail-card p-4 h-100">
            <h3>🤝 Local Etiquette</h3>
            <p>
              Respect local customs, traditions, and cultural spaces.
              Ask for permission before photographing people.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="detail-card p-4 h-100">
            <h3>🌱 Travel Responsibly</h3>
            <p>
              Carry a reusable water bottle, avoid littering, and
              support local businesses and communities.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <Link to="/plan-trip" className="btn btn-success btn-lg">
          Plan a Trip to {destination.name}
        </Link>
      </div>
    </div>
  );
}

export default DestinationDetails;