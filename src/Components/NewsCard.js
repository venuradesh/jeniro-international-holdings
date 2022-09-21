import React from "react";
import styled from "styled-components";

import Images from "../assets/wallpaper3.jpg";

function NewsCard({ admin }) {
  return (
    <Container>
      <div className="cover-container"></div>
      <div className="content-container">
        <div className="time-author">
          <div className="Author">By Jeniro Int.</div>
          <div className="time">26 min ago</div>
        </div>
        <div className="title-container">Title Goes Here</div>
        <div className="overview">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis, quas. Ipsam non nostrum optio quo, perferendis ex veritatis recusandae alias animi iusto vel aut dolorem reiciendis ut voluptatum necessitatibus qui.</div>
        <div className="bottom-btn">
          {admin ? <div className="delete-news btn">Delete</div> : <></>}
          <div className="read-more btn">Read More</div>
        </div>
      </div>
    </Container>
  );
}

export default NewsCard;

const Container = styled.div`
  width: 350px;
  height: 480px;
  position: relative;
  z-index: 0;
  /* background-color: red; */

  .cover-container {
    width: 100%;
    height: 250px;
    background-image: url(${Images});
    background-size: cover;
    background-position: center;
    border-radius: 12px;
  }

  .content-container {
    margin: 0 10px;
    background-color: white;
    position: absolute;
    z-index: 1;
    top: 220px;
    padding: 10px;
    padding-bottom: 0;
    box-shadow: 0 0 5px 0 var(--gray);
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    overflow: hidden;

    .time-author {
      display: flex;
      justify-content: space-between;
      font-size: var(--ex-small);
      color: var(--btn-color-alt);
    }

    .title-container {
      font-size: var(--normal);
      color: var(--theme1);
      text-align: center;
      margin-top: 10px;
      font-weight: var(--font-w-700);
      margin-bottom: 10px;
    }

    .overview {
      font-size: var(--small);
      color: var(--btn-color-alt);
      text-align: center;
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
`;
