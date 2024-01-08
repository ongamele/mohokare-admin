import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MaterialTailwindControllerProvider } from "@/context";
import { AuthProvider } from "./context-auth/auth";
import "../public/css/tailwind.css";
import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  // uri: 'https://mdt-bk.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ThemeProvider>
            <MaterialTailwindControllerProvider>
              <App />
            </MaterialTailwindControllerProvider>
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>
);
