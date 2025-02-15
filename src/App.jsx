import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./components/ErrorBoundary";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#365f5f",
      },
      secondary: {
        main: "#365f5f",
        second: "#5F7479",
      },
    },
  });
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
        <ToastContainer />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
