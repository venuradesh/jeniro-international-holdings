import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

//component
import JobTile from "../JobTile";

// const API_URL = "http://localhost:5000";
const API_URL = "https://jeniro-international-holdings.herokuapp.com";

function ShowJobs() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [noData, setNoData] = useState(false);
  const [componentRerender, setComponentRerender] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/getJobs`)
      .then((response) => {
        if (!response.data.error) {
          if (response.data.jobs.length === 0) {
            setNoData(true);
            setIsLoaded(false);
          } else {
            setJobs(response.data.jobs);
            setIsLoaded(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [componentRerender]);

  return (
    <Container>
      <div className="title">Jobs Available</div>
      <div className="jobs-container">{isLoaded ? <>{jobs.length !== 0 && jobs.map((job) => <JobTile admin={true} jobDetails={job.jobDetails} id={job.id} key={job.id} componentRerender={setComponentRerender} />)}</> : <>{noData ? "No Jobs to be display" : "Loading"}</>}</div>
    </Container>
  );
}

export default ShowJobs;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 20px;
  padding-right: 10px;

  .title {
    font-size: var(--heading);
    text-transform: uppercase;
    font-weight: var(--font-w-700);
    color: var(--theme1);
    text-align: center;
    margin-bottom: 20px;
  }

  .jobs-container {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
`;
