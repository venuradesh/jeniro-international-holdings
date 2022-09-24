import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AboutUs from "../Components/AboutUs";
import Contact from "../Components/Contact";
import Header from "../Components/Header";
import Login from "../Components/Login";
import NewsCard from "../Components/NewsCard";

const API_URL = "https://jeniro-international-holdings.herokuapp.com";

function NewsSection() {
  const [newsData, setNewsData] = useState([]);
  const [loginClicked, setLoginClicked] = useState(false);
  const [aboutUsClicked, setAboutUsClicked] = useState(false);
  const [contactClicked, setContactClicked] = useState(false);
  const [readmoreClicked, setReadMoreClicked] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/get-news`).then((results) => {
      setNewsData(results.data.result);
    });
  }, []);

  return (
    <Container>
      <Header loginClick={setLoginClicked} aboutUsClick={setAboutUsClicked} contactClick={setContactClicked} scrolled={true} />
      {aboutUsClicked || contactClicked || loginClicked ? (
        <div className="container-wrapper">
          <div className="blured-background"></div>
          {loginClicked ? <Login loginClick={setLoginClicked} /> : contactClicked ? <Contact contactClick={setContactClicked} /> : aboutUsClicked ? <AboutUs aboutUsClick={setAboutUsClicked} /> : <></>}
        </div>
      ) : (
        <></>
      )}
      <div className={`news-container ${readmoreClicked ? "hide-content" : ""}`}>
        {newsData.length > 0 ? (
          <>
            {newsData.map((news) => (
              <NewsCard readmore={setReadMoreClicked} data={news} newsId={news.id} key={news.id} admin={false} />
            ))}
          </>
        ) : (
          <>No News Available</>
        )}
      </div>
    </Container>
  );
}

export default NewsSection;

const Container = styled.div`
  width: 100vw;
  height: max-content;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;

  .container-wrapper {
    width: 100%;
    height: 100vh;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .blured-background {
      width: 100%;
      height: 100%;
      backdrop-filter: blur(8px);
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
  }

  .news-container {
    width: 85%;
    height: calc(100% - 70px);
    min-height: calc(100vh - 70px);
    padding-bottom: 30px;
    padding-top: 100px;
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: 20px;
    row-gap: 20px;
    overflow-y: auto;
  }
`;
