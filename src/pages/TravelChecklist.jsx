import { useState } from "react";
import destinations from "../data/destinations";

function TravelChecklist() {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);

  const checklistData = {
    essentials: [
      "Valid ID",
      "Phone Charger",
      "Power Bank",
      "Cash / Digital Payment"
    ],
    clothing: [
      "Comfortable Footwear",
      "Weather-Appropriate Clothes",
      "Extra Clothes"
    ],
    responsible: [
      "Reusable Water Bottle",
      "Reusable Bag",
      "Avoid Single-Use Plastic"
    ]
  };

  const destinationSpecific = {
    hyderabad: ["Sunscreen", "Hat or Cap"],
    hampi: ["Sunscreen", "Comfortable Walking Shoes", "Water Bottle"],
    jaipur: ["Sunscreen", "Comfortable Footwear", "Hat or Cap"],
    munnar: ["Light Jacket", "Rain Protection", "Comfortable Shoes"],
    pondicherry: ["Sunscreen", "Beachwear", "Reusable Water Bottle"],
    goa: ["Sunscreen", "Beachwear", "Reusable Water Bottle"]
  };

  const allItems = selectedDestination
    ? [
        ...checklistData.essentials,
        ...checklistData.clothing,
        ...checklistData.responsible,
        ...destinationSpecific[selectedDestination]
      ]
    : [];

  function handleDestinationChange(event) {
    setSelectedDestination(event.target.value);
    setCheckedItems([]);
  }

  function toggleItem(item) {
    if (checkedItems.includes(item)) {
      setCheckedItems(
        checkedItems.filter((checkedItem) => checkedItem !== item)
      );
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  }

  const progress =
    allItems.length > 0
      ? Math.round((checkedItems.length / allItems.length) * 100)
      : 0;

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1>Travel Checklist</h1>
        <p className="text-muted">
          Prepare for your trip and travel responsibly.
        </p>
      </div>

      <div className="card shadow-sm p-4 mb-4">
        <label className="form-label">
          Select Your Destination
        </label>

        <select
          className="form-select"
          value={selectedDestination}
          onChange={handleDestinationChange}
        >
          <option value="">Choose a destination</option>

          {destinations.map((destination) => (
            <option
              key={destination.id}
              value={destination.id}
            >
              {destination.name}
            </option>
          ))}
        </select>
      </div>

      {selectedDestination && (
        <>
          <div className="card shadow-sm p-4 mb-4">
            <div className="d-flex justify-content-between mb-2">
              <strong>Preparation Progress</strong>
              <strong>{progress}%</strong>
            </div>

            <div className="progress">
              <div
                className="progress-bar bg-success"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
          </div>

          <div className="row">
            <ChecklistSection
              title="Essentials"
              items={checklistData.essentials}
              checkedItems={checkedItems}
              toggleItem={toggleItem}
            />

            <ChecklistSection
              title="Clothing"
              items={checklistData.clothing}
              checkedItems={checkedItems}
              toggleItem={toggleItem}
            />

            <ChecklistSection
              title="Responsible Travel"
              items={checklistData.responsible}
              checkedItems={checkedItems}
              toggleItem={toggleItem}
            />

            <ChecklistSection
              title="Destination Specific"
              items={destinationSpecific[selectedDestination]}
              checkedItems={checkedItems}
              toggleItem={toggleItem}
            />
          </div>
        </>
      )}
    </div>
  );
}

function ChecklistSection({
  title,
  items,
  checkedItems,
  toggleItem
}) {
  return (
    <div className="col-md-6 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h4>{title}</h4>

          {items.map((item) => (
            <div className="form-check mb-3" key={item}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={checkedItems.includes(item)}
                onChange={() => toggleItem(item)}
                id={item}
              />

              <label
                className="form-check-label"
                htmlFor={item}
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TravelChecklist;