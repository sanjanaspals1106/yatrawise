import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={destination.image}
          className="card-img-top"
          alt={destination.name}
        />

        <div className="card-body d-flex flex-column">
          <h4 className="card-title">{destination.name}</h4>

          <p className="card-text">
            {destination.description}
          </p>

          <p>
            <strong>Best time:</strong> {destination.bestTime}
          </p>

          <div className="mb-3">
            {destination.category.map((item) => (
              <span
                key={item}
                className="badge bg-success me-2"
              >
                {item}
              </span>
            ))}
          </div>

          <Link
            to={`/destination/${destination.id}`}
            className="btn btn-success mt-auto"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DestinationCard;