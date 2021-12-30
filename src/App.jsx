import scss from "./App.module.scss";
import React, { useContext, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import AuthContext from "./Storage/auth-context";
import Loader from "react-loader-spinner";
import "antd/dist/antd.css";

const HomePage = React.lazy(() => import("./Components/Pages/HomePage"));
const PhotoEditPage = React.lazy(() => import("./Components/Pages/PhotoEditPage"));
const SignInPage = React.lazy(() => import("./Components/Pages/SignInPage"));
const SignUpPage = React.lazy(() => import("./Components/Pages/SignUpPage"));

const App = () => {
  const ctxAuth = useContext(AuthContext);

  return (
    <Layout>
      <Suspense
        fallback={
          <Loader
            type="TailSpin"
            color="#D2E1FF"
            height={100}
            width={100}
            timeout={Infinity}
          />
        }
      >
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/edit" exact element={<PhotoEditPage />} />
          <Route path="/signIn" exact element={<SignInPage />} />
          <Route path="/signUp" exact element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
