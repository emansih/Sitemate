import React from 'react';

const Issue = (props) => {
    const { issueTitle, issueDescription, issueId } = props.issue;

    
    return (
        <div>
            <a href={`/issue/${issueId}`}>
                <div>
                    <h5>{issueTitle}</h5>
                    <p>{issueDescription}</p>
                </div>
            </a>
        </div>
    );
};

export default Issue;