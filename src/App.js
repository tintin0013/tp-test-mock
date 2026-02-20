import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import { useState } from "react";

function App() {

  const [users, setUsers] = useState([]);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <HashRouter>
      <div className="App">

        {/* Navigation globale */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "15px" }}>
            Accueil
          </Link>
          <Link to="/register">
            nouvelle inscription
          </Link>
        </nav>

        <Routes>
          <Route 
            path="/"
            element={<Home />} 
          />
          <Route 
            path="/register" 
            element={<Register onUserAdded={addUser} />} 
          />
        </Routes>

      </div>
    </HashRouter>
  );
}

export default App;