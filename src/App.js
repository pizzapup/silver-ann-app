import {lazy, Suspense, useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Layout from "./routes/Layout";
import "./styles/global.css";
import "./styles/styles.scss";
import {auth} from "./firebase/firebase";
import {onAuthStateChanged} from "firebase/auth";
import Login from "./routes/Login";

const Home = lazy(() => import("./routes/Home"));
const Error = lazy(() => import("./routes/Error"));
export const pages = [
  {title: "Home", path: "home", element: "Home"},
  {title: "Event Details", path: "details", element: "EventDetails"},
  {title: "Relationship Timeline", path: "timeline", element: "About"},
  {title: "Gallery", path: "gallery", element: "Gallery"},
  {title: "Create Post", path: "createpost", element: "CreatePost"},
  {title: "Guestbook", path: "guestbook", element: "Guestbook"},
  // {title: "Quiz", path: "quiz", element: "Quiz"},
  // {title: "Login", path: "login", element: "Login"},
];
function App() {
  const Pages = pages.map((page, i) => {
    const Component = lazy(() => import(`./routes/${page.element}`));
    return (
      <Route
        key={`page-${i}`}
        path={page.path}
        element={<Suspense fallback={<>...</>}>{<Component />}</Suspense>}
      />
    );
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<>...</>}>
                <Home />
              </Suspense>
            }
          />
          {Pages}
          <Route
            key={`page-login`}
            path="/login"
            element={<Suspense fallback={<>...</>}>{<Login />}</Suspense>}
          />
        </Route>

        <Route
          path="*"
          element={
            <Suspense fallback={<>...</>}>
              <Error />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
