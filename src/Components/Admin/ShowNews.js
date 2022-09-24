import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

//component
import NewsCard from "../NewsCard";

// const API_URL = "http://localhost:5000";
const API_URL = "https://jeniro-international-holdings.herokuapp.com";

function ShowNews() {
  const [newsArray, setNewsArray] = useState([]);
  const [loadComponentAgain, setLoadComponentAgain] = useState(false);

  useEffect(() => {
    setLoadComponentAgain(false);
    console.log("print");
    axios
      .get(`${API_URL}/get-news`)
      .then((res) => {
        setNewsArray(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loadComponentAgain]);

  return (
    <Container>
      <div className="title">Available News</div>
      <div className="news-container">
        {newsArray.length > 0 ? (
          <>
            {newsArray.map((news) => (
              <NewsCard admin={true} data={news} key={news.id} newsId={news.id} loadComponent={setLoadComponentAgain} />
            ))}
          </>
        ) : (
          <>{newsArray.length === 0 ? <div className="not-available">No news Available</div> : <></>}</>
        )}
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
