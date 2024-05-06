import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/appRouter"
import ApiError from "./ErrorRegistration/apiError";

function App() {
  return (
    <BrowserRouter>
        <ApiError></ApiError>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
