import React from "react";
import styled from "styled-components";

//component
import NewsCard from "../NewsCard";

function ShowNews() {
  return (
    <Container>
      <div className="title">Available News</div>
      <div className="news-container">
        <NewsCard admin={true} />
        <NewsCard admin={true} />
        <NewsCard admin={true} />
        <NewsCard admin={true} />
        <NewsCard admin={true} />
      </div>
    </Container>
  );
}

export default ShowNews;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  .title {
    font-size: var(--heading);
    text-transform: uppercase;
    color: var(--theme1);
    text-align: center;
    margin-bottom: 20px;
  }

  .news-container {
    width: 100%;
    height: 100%;
    display: flex;
    column-gap: 20px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    row-gap: 20px;
  }
`;
