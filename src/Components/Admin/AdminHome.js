import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

//components
import Loading from "../../Screens/Loading";

//images
import Cover from "../../assets/admin-cover.jpg";

// const API_URL = "http://localhost:5000";
const API_URL = "https://janiromoving-backend.herokuapp.com";

function AdminHome() {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/homeDetails`, {
        headers: {
          userid: localStorage.getItem("user"),
        },
      })
      .then((response) => {
        if (!response.data.error) {
          setHomeData(response.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      {homeData ? (
        <>
          <div className="welcome">Welcome to Admin Dashboard</div>
          <div className="cover">
            <img src={Cover} alt="admin-cover" />
            <div className="content-container">
              <div className="title">Hello {homeData.userName}</div>
              <div className="desc">You can use this dashboard to view all users, add new jobs, add news to the users, and see how they are displayed at the user's view</div>
            </div>
          </div>
          <div className="cards">
            <div className="card">
              <div className="title">Users</div>
              <div className="desc">User count that are registerd on the site</div>
              <div className="count">{homeData.userCount}</div>
              <div className="count-alt">users</div>
            </div>
            <div className="card">
              <div className="title">Jobs</div>
              <div className="desc">Job count that the users can apply</div>
              <div className="count">{homeData.jobsCount}</div>
              <div className="count-alt">jobs</div>
            </div>
            <div className="card">
              <div className="title">News</div>
              <div className="desc">News count that the users can view</div>
              <div className="count">{homeData.newsCount}</div>
              <div className="count-alt">news available</div>
            </div>
          </div>
        </>
      ) : (
        <div className="loading-container">
          <Loading />
        </div>
      )}
    </Container>
  );
}

export default AdminHome;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: auto;

  .loading-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .welcome {
    font-size: var(--normal);
    color: var(--theme1);
    font-weight: var(--font-w-700);
  }

  .cover {
    width: 100%;
    height: 45%;
    margin-top: 30px;
    padding: 20px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 0 10px 0 var(--gray);
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 30px;

    img {
      height: 100%;
    }

    .content-container {
      padding-right: 30px;

      .title {
        font-size: var(--heading);
        color: var(--theme1);
        font-weight: var(--font-w-700);
        margin-bottom: 20px;
      }

      .desc {
        font-size: var(--small);
        color: var(--btn-color-alt);
      }
    }
  }
  .cards {
    width: 100%;
    height: 40%;
    margin-top: 30px;
    display: flex;
    align-items: cener;
    column-gap: 30px;

    .card {
      width: 30%;
      height: max-content;
      background-color: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 0 10px 0 var(--gray);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .title {
      font-size: 1.4rem;
      font-weight: var(--font-w-700);
      color: var(--theme1);
      margin-bottom: 10px;
    }

    .desc {
      font-size: var(--ex-small);
      color: var(--btn-color-alt);
    }

    .count {
      font-size: var(--heading);
      color: var(--btn-red);
      margin: 10px 0 0 0;
    }

    .count-alt {
      font-size: var(--small);
      color: var(--theme1);
    }
  }

  @media only screen and (max-width: 1280px) {
    .cover {
      img {
        height: 80%;
      }
    }
  }

  @media only screen and (max-width: 1100px) {
    .cover {
      height: 40%;

      img {
        height: 60%;
      }
    }
  }

  @media only screen and (max-width: 880px) {
    .cover {
      height: 100%;

      img {
        display: none;
      }

      .content-container {
        .title,
        .desc {
          text-align: center;
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .cover {
      height: 100%;
      margin-bottom: 90px;
    }
  }

  @media only screen and (max-width: 680px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    .cards {
      justify-content: center;

      .card {
        width: 100%;
      }
    }
  }

  @media only screen and (max-width: 580px) {
    .cover {
      .content-container {
        padding-right: 0;

        .title {
          text-align: center;
        }
      }
    }

    .cards {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      row-gap: 20px;
      margin-top: 60px;

      .card {
        width: 100%;
      }
    }
  }
`;
