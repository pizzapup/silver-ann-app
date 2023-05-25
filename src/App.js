import {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Layout from "./routes/Layout";
import "./styles/global.css";
import "./styles/styles.scss";
const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));
export const pages = [
  {to: "/home", title: "Home"},
  {to: "/about", title: "About"},
];

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            // path="home"
            element={
              <Suspense fallback={<>...</>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="home"
            element={
              <Suspense fallback={<>...</>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<>...</>}>
                <About />
              </Suspense>
            }
          />

          <Route
            path="*"
            element={<p> yikes - there's nothing at this url. try again ? </p>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
