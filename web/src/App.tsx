import React from "react";
import SignIn from "./pages/SignIn";
// import SingUp from "./pages/SignUp";
import GlobalStyle from "./styles/global";
import AppProvider from "./hooks";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppProvider>
        <SignIn />
      </AppProvider>
    </>
  );
};

export default App;
