import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "./context";

import MainHeader from "./components/MainHeader";
import Login from "./views/Login";
import HomePage from "./views/HomePage";
import UserMsg from "./components/UserMsg";
import Dashboard from "./views/Dashboard";
import AdminPage from "./views/AdminPage";

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
          {/* <Route path="/**" element={<Dashboard />} /> */}
        </Routes>
        <UserMsg />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
