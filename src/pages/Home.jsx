import { Link } from "react-router-dom";
import destinations from "../data/destinations";
import DestinationCard from "../components/DestinationCard";

function Home() {
  return (
    <>
      <section className="hero-section text-center text-white d-flex align-items-center">
        <div className="container">
          <h1 className="display-4 fw-bold">
            Plan Responsibly. Travel Better.
          </h1>

          <p className="lead mx-auto hero-text">
            Discover destinations, create personalized itineraries,
            support local communities, and travel sustainably.
          </p>

          <Link to="/plan-trip" className="btn btn-light btn-lg mt-3">
            Plan My Trip
          </Link>
        </div>
      </section>

      <section className="container py-5">
        <div className="text-center mb-5">
          <h2>Why YatraWise?</h2>
          <p className="text-muted">
            Travel planning with people, places, and the planet in mind.
          </p>
        </div>

        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="p-4">
              <h3>🗺️ Smart Planning</h3>
              <p>
                Generate travel suggestions based on your destination,
                duration, and interests.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="p-4">
              <h3>🌱 Sustainable Travel</h3>
              <p>
                Get practical tips to reduce environmental impact while travelling.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="p-4">
              <h3>🏘️ Local Experiences</h3>
              <p>
                Discover experiences that encourage support for local communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Featured Destinations</h2>

          <Link to="/explore" className="btn btn-outline-success">
            View All
          </Link>
        </div>

        <div className="row">
          {destinations.slice(0, 3).map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;