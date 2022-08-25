import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "./context";

import MainHeader from "./components/MainHeader";
import MainFooter from "./components/MainFooter";
import UserMsg from "./components/UserMsg";
import HomePage from "./views/HomePage";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import AdminPage from "./views/AdminPage";
import MovieDetails from "./views/MovieDetails";
import ContactPage from "./views/Contact";
import ErrorPage from "./views/ErrorPage";
import AboutPage from "./views/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <MainHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <MainFooter />
        <UserMsg />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
