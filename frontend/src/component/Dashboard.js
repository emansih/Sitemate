import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Issue from './Issue';

const Dashboard = () => {

  const [issues, setIssues] = useState([]);


  useEffect(() => {
    const client = axios.create({
        baseURL: "http://127.0.0.1:8081/api/v1" 
    });
    client.get('/issues').then((response) => {
        setIssues(response.data);
    });
  }, []);

  const showIssues = () => {
    if(issues.length !== 0){
        return issues.map(issue => {
            return <Issue key={issue.issueId} issue={issue}/>
        })
    }
    return <div>No issues found</div>
   }

    return (
        <div className="container">
            <div className="row">
                <Link to="/create">Create Issues</Link>
                <br />
                <br />
                <br />
                {showIssues()}
            </div>
        </div>
    );
};

export default Dashboard