import {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Layout from "./routes/Layout";
import "./styles/global.css";
import "./styles/styles.scss";
const Home = lazy(() => import("./routes/Home"));
const Error = lazy(() => import("./routes/Error"));
export const pages = [
  {title: "Home", path: "home", element: "Home"},
  {title: "About", path: "about", element: "About"},
  {title: "Gallery", path: "gallery", element: "Gallery"},
  {title: "Create Post", path: "createpost", element: "CreatePost"},
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
