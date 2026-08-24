import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import DestinationDetails from "./pages/DestinationDetails";
import PlanTrip from "./pages/PlanTrip";
import LocalExperiences from "./pages/LocalExperiences";
import SustainableTravel from "./pages/SustainableTravel";
import TravelChecklist from "./pages/TravelChecklist";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/destination/:id" element={<DestinationDetails />} />
          <Route path="/plan-trip" element={<PlanTrip />} />
          <Route path="/experiences" element={<LocalExperiences />} />
          <Route path="/sustainable" element={<SustainableTravel />} />
          <Route path="/checklist" element={<TravelChecklist />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;