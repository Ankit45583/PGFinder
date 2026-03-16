import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { PGProvider } from "./context/PGContext";
import Footer from "./components/common/Footer";

function App() {
  return (
    <AuthProvider>
      <PGProvider>
        <BrowserRouter>
          <Navbar />        
          <main style={{ flex: 1 }}>
            <AppRoutes />
          </main> 
          <Footer/>
        </BrowserRouter>
      </PGProvider>
    </AuthProvider>
  );
}

export default App;
