import { HashRouter as Router } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./router/AppRouter";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <AppRouter />
      </Layout>
    </Router>
  );
}

export default App;
