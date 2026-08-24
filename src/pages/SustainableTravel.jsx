import { useState } from "react";

function SustainableTravel() {
  const tips = [
    {
      title: "Use Reusable Items",
      description:
        "Carry reusable water bottles and bags to reduce single-use plastic."
    },
    {
      title: "Support Local Businesses",
      description:
        "Choose local guides, restaurants, artisans, and community experiences."
    },
    {
      title: "Choose Sustainable Transport",
      description:
        "Walk, cycle, or use public transport whenever possible."
    },
    {
      title: "Respect Nature",
      description:
        "Avoid littering and do not disturb wildlife or natural habitats."
    }
  ];

  const [choices, setChoices] = useState({
    reusable: false,
    local: false,
    transport: false,
    nature: false
  });

  function handleChoiceChange(event) {
    const { name, checked } = event.target;

    setChoices({
      ...choices,
      [name]: checked
    });
  }

  const score =
    Object.values(choices).filter((value) => value).length * 25;

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1>Sustainable Travel</h1>
        <p className="text-muted">
          Small choices can make your journey more responsible.
        </p>
      </div>

      <div className="row mb-5">
        {tips.map((tip) => (
          <div className="col-md-6 mb-4" key={tip.title}>
            <div className="detail-card p-4 h-100">
              <h4>🌱 {tip.title}</h4>
              <p className="mb-0">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card shadow-sm p-4">
        <h3>Your Sustainability Score</h3>

        <p className="text-muted">
          Select the actions you plan to follow.
        </p>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="reusable"
            checked={choices.reusable}
            onChange={handleChoiceChange}
          />

          <label className="form-check-label">
            I will carry reusable items.
          </label>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="local"
            checked={choices.local}
            onChange={handleChoiceChange}
          />

          <label className="form-check-label">
            I will support local businesses.
          </label>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="transport"
            checked={choices.transport}
            onChange={handleChoiceChange}
          />

          <label className="form-check-label">
            I will choose sustainable transport where possible.
          </label>
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="nature"
            checked={choices.nature}
            onChange={handleChoiceChange}
          />

          <label className="form-check-label">
            I will respect nature and avoid littering.
          </label>
        </div>

        <div className="progress mb-2">
          <div
            className="progress-bar bg-success"
            style={{ width: `${score}%` }}
          >
            {score}%
          </div>
        </div>

        <p className="mb-0">
          Sustainability Score: <strong>{score}/100</strong>
        </p>
      </div>
    </div>
  );
}

export default SustainableTravel;