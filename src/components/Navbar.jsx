import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          YatraWise
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/explore">Explore</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/plan-trip">Plan My Trip</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/experiences">Experiences</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/sustainable">Sustainable Travel</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/checklist">Checklist</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;