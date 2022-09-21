import React from "react";
import styled from "styled-components";

//component
import JobTile from "../JobTile";

function ShowJobs() {
  return (
    <Container>
      <div className="title">Jobs Available</div>
      <div className="jobs-container">
        <JobTile admin={true} />
        <JobTile admin={true} />
        <JobTile admin={true} />
        <JobTile admin={true} />
        <JobTile admin={true} />
        <JobTile admin={true} />
        <JobTile admin={true} />
        <JobTile admin={true} />
      </div>
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
