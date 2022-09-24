import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import Lottie from "react-lottie";
import * as animationData from "../assets/Lotties/submit-loading.json";

// const API_URL = "http://localhost:5000";
const API_URL = "https://jeniro-international-holdings.herokuapp.com";

function NewsCard({ admin, data, newsId, loadComponent }) {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    isClickToPauseDisabled: true,
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/getUser`, {
        headers: {
          userid: data.data.authorId,
        },
      })
      .then((res) => {
        setUserName(res.data.userData.firstName + " " + res.data.userData.lastName);
      });
  });

  const onDeleteClick = () => {
    setLoading(true);
    if (localStorage.getItem("adminLogged") === "true") {
      axios
        .delete(`${API_URL}/delete-news`, {
          headers: {
            newsid: newsId,
          },
        })
        .then((res) => {
          setLoading(false);
          if (res.data.message === "done") {
            loadComponent(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container cover={data.data.cover} className={`${!data.data.cover ? "no-cover" : ""}`}>
      {data.data.cover ? <div className="cover-container"></div> : <></>}
      <div className={`content-container ${!data.data.cover ? "no-cover" : ""}`}>
        <div className="time-author">
          <div className="Author">{userName}</div>
          <div className="time">{moment(data.data.time).fromNow()}</div>
        </div>
        <div className="content">
          <div className="title-container">{data.data.title}</div>
          <div className="overview">{data.data.overview}</div>
        </div>
        <div className="bottom-btn">
          {admin ? (
            <div className="delete-news btn" onClick={() => setDeleteClicked(true)}>
              Delete
            </div>
          ) : (
            <></>
          )}
          <div className="read-more btn">Read More</div>
        </div>
      </div>
      {deleteClicked ? (
        <div className="delete-confirmation">
          <div className="delete-wrapper">
            <div className="content">Do you need to delete this news? (You cannot recover it later)</div>
            <div className="btn-container">
              <div className="yes btn" onClick={() => (!loading ? onDeleteClick() : "")}>
                {loading ? <Lottie options={lottieOptions} width={40} /> : "Yes"}
              </div>
              <div
                className="no btn"
                onClick={() => {
                  if (!loading) {
                    setDeleteClicked(false);
                  }
                }}
              >
                No
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default NewsCard;

const Container = styled.div`
  width: 350px;
  height: 480px;
  position: relative;
  z-index: 0;

  &.no-cover {
    height: max-content;
  }

  .cover-container {
    width: 100%;
    height: 250px;
    background-image: url(${(state) => state.cover});
    background-size: cover;
    background-position: center;
    border-radius: 12px;
  }

  .content-container {
    margin-inline: 20px;
    margin: 0 10px;
    min-height: 200px;
    background-color: white;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    top: 220px;
    padding: 10px;
    padding-bottom: 0;
    box-shadow: 0 0 5px 0 var(--gray);
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &.no-cover {
      border-radius: 12px;
      /* top: 100px; */
      top: 0;
      position: relative;
      /* transform: translateY(-50%); */
    }

    .time-author {
      display: flex;
      justify-content: space-between;
      font-size: var(--ex-small);
      color: var(--btn-color-alt);
    }

    .content {
      height: max-content;

      .title-container {
        font-size: var(--normal);
        color: var(--theme1);
        text-align: center;
        margin-top: 10px;
        font-weight: var(--font-w-700);
        margin-bottom: 10px;
      }

      .overview {
        height: max-content;
        font-size: var(--small);
        color: var(--btn-color-alt);
        text-align: center;
      }
    }

    .bottom-btn {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;

      .btn {
        background-color: var(--theme1);
        width: 100px;
        height: 30px;
        position: relative;
        font-size: var(--small);
        color: var(--white);
        transition: all 0.3s ease;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        &.delete-news {
          background-color: var(--btn-red);
          left: -10px;
          border-top-right-radius: 12px;

          &:hover {
            background-color: var(--btn-red-alt);
          }
        }

        &.read-more {
          right: -10px;
          border-top-left-radius: 12px;

          &:hover {
            background-color: var(--btn-color-alt);
          }
        }
      }
    }
  }

  .delete-confirmation {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    z-index: 10;
    border-radius: 12px;
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;

    .delete-wrapper {
      width: 80%;
      background-color: var(--theme1);
      border-radius: 12px;
      padding: 20px;
      text-align: center;

      .content {
        font-size: var(--small);
        color: var(--white);
        margin-bottom: 20px;
      }

      .btn-container {
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 20px;

        .btn {
          flex: 1;
          height: 30px;
          color: var(--white);
          font-size: var(--small);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;

          &.yes {
            background-color: var(--btn-color);

            &:hover {
              background-color: var(--btn-color-alt);
            }
          }

          &.no {
            background-color: var(--btn-red);

            &:hover {
              background-color: var(--btn-red-alt);
            }
          }
        }
      }
    }
  }
`;
