import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { FileSearch } from '../components/FileSearch';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FileList } from '../components/FileList';
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons';
import defaultFiles from '../utils/defaultFiles';
import { BottomBtn } from '../components/BottomBtn';
import { TabList } from '../components/TabList';

function Hello() {
  return (
    <div className="Hello container-fluid px-0">
      <div className="row g-0">
        <div className="col-3  left-panel">
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
          <div className="row g-0">
            <div className="col">
              <BottomBtn text="Create" colorClass="btn-primary" icon={faPlus} />
            </div>
            <div className="col">
              <BottomBtn
                text="Import"
                colorClass="btn-success"
                icon={faFileImport}
              />
            </div>
          </div>
        </div>
        <div className="col-9  right-panel">
          <TabList
            files={defaultFiles}
            onTabClick={(id) => console.log(id)}
            activeId="1"
            onCloseTab={(id) => console.log(id)}
            unsavedIds={['1', '2']}
          />
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
