import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { DefaultLayout } from "./layouts";
import { publicRoutes, privateRoutes } from "./routes";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const sideBarRoutes = route.data || {};

            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout sideBarRoutes={sideBarRoutes}>
                    <Page />
                  </Layout>
                }
                render={() => (
                  <Layout sideBarRoutes={sideBarRoutes}>
                    <Page />
                  </Layout>
                )}
              />
            );
          })}
          {privateRoutes.map((route, index) => {
            const sideBarRoutes = route.data || {};

            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout sideBarRoutes={sideBarRoutes}>
                    <Page />
                  </Layout>
                }
                render={() => (
                  <Layout sideBarRoutes={sideBarRoutes}>
                    <Page />
                  </Layout>
                )}
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
