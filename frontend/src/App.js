import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './component/Dashboard';
import IssueBoard from './component/Issueboard';


class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/issue/:issueId" element={<IssueBoard />} />

            <Route path="/create" element={<IssueBoard />} />

          </Routes>
          </div>
        </Router>
    );
  }
}
export default App;