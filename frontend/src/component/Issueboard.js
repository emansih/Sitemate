import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const IssueBoard = () => {

    const { issueId } = useParams();
    const baseURL = "http://127.0.0.1:8081/api/v1/issues"

    const [formData, setFormData] = useState({
        issueTitle: '',
        issueDescription: ''
    });

    const [deleteButton, setDeleteButton] = useState(false);

    useEffect(() => {
        if(issueId !== undefined){
            axios.get(baseURL + "/" + issueId).then((response) => {
                const issue = response.data;
                    setFormData({
                        issueTitle: issue.issueTitle,
                        issueDescription: issue.issueDescription
                    });
                setDeleteButton(true)
            }).catch((error) => {
                console.error('There was an error fetching the issue!', error);
            });
        }
        
    }, []);
    
    const handleDelete = () => {
        axios.delete(baseURL + "/" + issueId)
            .then(response => {
                alert('Issue successfully deleted');
            })
            .catch(error => {
                alert('There was an error deleting the issue!');
            });
    };


    const renderDeleteButton = (e) => {
        if(deleteButton){
            return (
                <button type="button" onClick={handleDelete}>Delete</button>
            )
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const data = new URLSearchParams();
        for (const key in formData) {
          data.append(key, formData[key]);
        }

        if(issueId !== undefined){
            axios.put(baseURL + "/" + issueId, data).then(response => {
                alert('Data successfully updated');
              })
              .catch(error => {
                alert('There was an error updating the data!');
              });
        } else {
            axios.post(baseURL, data).then(response => {
              alert('Issue created!');
            })
            .catch(error => {
              alert('There was an error sending the data!');
            });
        }
      };
    
      return (
        <div className="App">
          <h1>Create Issue</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <br />
              <input
                type="text"
                id="issueTitle"
                name="issueTitle"
                value={formData.issueTitle}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <br />
              <input
                type="text"
                id="issueDescription"
                name="issueDescription"
                value={formData.issueDescription}
                onChange={handleChange}
              />
            </div>
            <br />
            <button type="submit">Submit</button>
            <br />
            {renderDeleteButton()}
          </form>
        </div>
      );
    
}

export default IssueBoard