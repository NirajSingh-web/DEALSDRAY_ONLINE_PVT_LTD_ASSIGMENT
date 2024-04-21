import { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Loader from "./component/Loader";
import Navbar from "./component/Navbar";
import PrivateOutlet from "./component/PrivateOutlet";
const AddEmploye = lazy(() => import("./component/Employee/AddEmploye"));
const EditEmployee = lazy(() => import("./component/Employee/EditEmployee"));
const Dashboard = lazy(() => import("./component/Dahboard"));
const Login = lazy(() => import("./component/auth/Login"));
function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const Navigate = useNavigate();
  const Location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const path = Location.pathname;
    if (token) {
      setisAuthenticated(true);
      Navigate(path);
    } else {
      setisAuthenticated(false);
    }
  }, [isAuthenticated]);
  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        setisAuthenticated={setisAuthenticated}
      />
      <Routes>
        <Route
          path="/Login"
          element={
            <Suspense fallback={<Loader />}>
              <Login setisAuthenticated={setisAuthenticated} />
            </Suspense>
          }
        />
        <Route element={<PrivateOutlet isAuthenticated={isAuthenticated} />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/Employee/Edit"
            element={
              <Suspense fallback={<Loader />}>
                <EditEmployee />
              </Suspense>
            }
          />
          <Route
            path="/Employee/add"
            element={
              <Suspense fallback={<Loader />}>
                <AddEmploye />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
