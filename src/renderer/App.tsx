import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { FileSearch } from '../components/FileSearch';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FileList } from '../components/FileList';
import defaultFiles from '../utils/defaultFiles';

function Hello() {
  return (
    <div className="Hello container-fluid">
      <div className="row">
        <div className="col-4  left-panel">
          <FileSearch
            title={'My Cloud Files'}
            onFileSearch={(value) => {
              console.log(value);
            }}
          />
          <FileList
            files={defaultFiles}
            onFileClick={(id) => {
              console.log(id);
            }}
            onFileDelete={(id) => {
              console.log(id);
            }}
            onSaveEdit={(id, newValue) => {
              console.log(newValue);
            }}
          />
        </div>
        <div className="col-8 bg-primary right-panel">
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
