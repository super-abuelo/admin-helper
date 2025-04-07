import { HashRouter as Router } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./router/AppRouter";
import Layout from "./components/layout/Layout";
import { useState } from "react";

export interface User {
  uid: string;
  username: string;
  role: string;
}
function App() {

  const [user, setUser] = useState<User | null>(null);
  return (
    <Router>
      <Layout user={user} setUser={setUser}>
        <AppRouter user={user} setUser={setUser}/>
      </Layout>
    </Router>
  );
}

export default App;
