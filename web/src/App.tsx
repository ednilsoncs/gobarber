import React from "react";
import SignIn from "./pages/SignIn";
// import SingUp from "./pages/SignUp";
import GlobalStyle from "./styles/global";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    </>
  );
};

export default App;
