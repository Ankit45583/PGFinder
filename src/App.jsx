import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { PGProvider } from "./context/PGContext";

function App() {
  return (
    <AuthProvider>
      <PGProvider>
        <BrowserRouter>
          <Navbar />        
          <AppRoutes />     
        </BrowserRouter>
      </PGProvider>
    </AuthProvider>
  );
}

export default App;
