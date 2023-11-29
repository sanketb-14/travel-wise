import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home, Pricing, Product, NotFound, Login, AppLayout } from "./Pages";
import {
  Navbar,
  CityItem,
  CountryItem,
  SingleCity,
  Form,
  ProtectRoute,
} from "./components";
import { CitiesProvider } from "./contexts/CitiesContext";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/app"
              element={
                <ProtectRoute>
                  <AppLayout />
                </ProtectRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityItem />} />
              <Route path="cities/:id" element={<SingleCity />} />
              <Route path="countries" element={<CountryItem />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CitiesProvider>
    </AuthProvider>
  );
}
