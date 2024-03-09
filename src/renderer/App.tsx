import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Hello() {
  return (
    <div className="Hello container-fluid">
      <div className="row">
        <div className="col-3 bg-danger left-panel">
          <h1>this is the left</h1>
        </div>
        <div className="col-9 bg-primary right-panel">
          <h1>this is the right</h1>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
