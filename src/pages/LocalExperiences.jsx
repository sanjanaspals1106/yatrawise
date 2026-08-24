import { useState } from "react";

const experiences = [
  {
    id: 1,
    title: "Hyderabad Heritage Walk",
    location: "Hyderabad",
    category: "Heritage",
    duration: "2 Hours",
    description:
      "Explore historic streets, monuments, and stories with a local guide."
  },
  {
    id: 2,
    title: "Traditional Food Experience",
    location: "Hyderabad",
    category: "Food",
    duration: "3 Hours",
    description:
      "Discover local flavours and learn about traditional Hyderabadi cuisine."
  },
  {
    id: 3,
    title: "Hampi Cultural Walk",
    location: "Hampi",
    category: "Heritage",
    duration: "3 Hours",
    description:
      "Explore the history and architecture of Hampi with local insights."
  },
  {
    id: 4,
    title: "Tea Garden Experience",
    location: "Munnar",
    category: "Nature",
    duration: "2 Hours",
    description:
      "Learn about tea cultivation and experience the natural beauty of Munnar."
  },
  {
    id: 5,
    title: "Local Craft Experience",
    location: "Jaipur",
    category: "Culture",
    duration: "2 Hours",
    description:
      "Discover traditional craftsmanship and support local artisans."
  },
  {
    id: 6,
    title: "Community Beach Walk",
    location: "Pondicherry",
    category: "Nature",
    duration: "2 Hours",
    description:
      "Experience the coastline responsibly while learning about local life."
  }
];

function LocalExperiences() {
  const [selectedExperience, setSelectedExperience] = useState(null);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1>Local Experiences</h1>
        <p className="text-muted">
          Discover experiences that support local communities and cultures.
        </p>
      </div>

      <div className="row">
        {experiences.map((experience) => (
          <div className="col-md-6 col-lg-4 mb-4" key={experience.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h4>{experience.title}</h4>

                <p className="text-muted">
                  📍 {experience.location}
                </p>

                <span className="badge bg-success mb-3">
                  {experience.category}
                </span>

                <p>{experience.description}</p>

                <p>
                  <strong>Duration:</strong> {experience.duration}
                </p>

                <button
                  className="btn btn-outline-success mt-auto"
                  onClick={() => setSelectedExperience(experience)}
                  data-bs-toggle="modal"
                  data-bs-target="#experienceModal"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="modal fade"
        id="experienceModal"
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {selectedExperience && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedExperience.title}
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>

                <div className="modal-body">
                  <p>
                    <strong>Location:</strong>{" "}
                    {selectedExperience.location}
                  </p>

                  <p>
                    <strong>Category:</strong>{" "}
                    {selectedExperience.category}
                  </p>

                  <p>
                    <strong>Duration:</strong>{" "}
                    {selectedExperience.duration}
                  </p>

                  <p>{selectedExperience.description}</p>

                  <hr />

                  <p>
                    This experience promotes responsible tourism by
                    encouraging travellers to engage with and support
                    local communities.
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocalExperiences;