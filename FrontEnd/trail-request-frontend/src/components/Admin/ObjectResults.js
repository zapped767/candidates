import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ObjectResults.css';


const ObjectResult = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/results')
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error('Error fetching results:', error);
      });
  }, []);
  const extractFilename = (fullPath) => {
    return fullPath.split("\\").pop(); // for Windows paths
  };

  return (
      <div className="object-result-container">
      <h2>Candidate Results</h2>
      <table className="object-result-table" border="0" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Candidate Name</th>
            <th>Candidate ID</th>
            <th>Video Path</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => {
            const filename = extractFilename(result.videoPath);
            const videoUrl = `http://localhost:8080/api/results/video/${filename}`;
          
          return(
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.candidate_name}</td>
              <td>{result.candidate_id}</td>
              <td>
                  <video width="250" controls>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </td>
            </tr>
          );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ObjectResult;
