import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/appRouter"
import "./app.css"

function App() {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
