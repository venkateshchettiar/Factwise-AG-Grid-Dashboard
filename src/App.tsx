import Dashboard from "./components/Dashboard";
import "./App.css";
import { AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";

function App() {
  return (
    <AgGridProvider modules={[AllCommunityModule]}>
      <div className="container">
        <Dashboard />
      </div>
    </AgGridProvider>
  );
}

export default App;