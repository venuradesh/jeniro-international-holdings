import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContentNotFound from "../../Screens/ContentNotFound";

//component
import Loading from "../../Screens/Loading";
import NewsCard from "../NewsCard";

// const API_URL = "http://localhost:5000";
const API_URL = "https://jeniro-international-holdings.herokuapp.com";

function ShowNews() {
  const [contentUnavailable, setContentUnAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newsArray, setNewsArray] = useState([]);
  const [loadComponentAgain, setLoadComponentAgain] = useState({ render: false });

  useEffect(() => {
    loadComponentAgain.render = false;
    setContentUnAvailable(false);
    setLoading(true);

    axios
      .get(`${API_URL}/get-news`)
      .then((res) => {
        setLoading(false);
        if (res.data.result.length === 0) {
          setContentUnAvailable(true);
        } else {
          setNewsArray(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loadComponentAgain]);

  return (
    <Container>
      <div className="title">Available News</div>
      <div className={`news-container ${loading || contentUnavailable ? "loading" : ""}`}>
        {newsArray.length > 0 ? (
          <>
            {newsArray.map((news) => (
              <NewsCard admin={true} data={news} key={news.id} newsId={news.id} loadComponent={setLoadComponentAgain} />
            ))}
          </>
        ) : (
          <>
            {contentUnavailable ? (
              <div className="not-available">
                <ContentNotFound content="News" />
              </div>
            ) : loading ? (
              <div className="loading-container">
                <Loading />
              </div>
            ) : (
              <></>
            )}
          </>
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

    &.loading {
      height: 80%;
    }
  }
`;
