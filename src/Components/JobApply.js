import React from "react";
import styled from "styled-components";

//images
import Point from "../assets/point.png";
import Close from "../assets/close.png";

function JobApply({ jobName, jobid, setApply }) {
  const documents = ["Lorem ipsum dolor sit, amet consectetur adipisicing elit.", "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", "Lorem ipsum dolor sit, amet consectetur adipisicing elit."];

  return (
    <Container>
      <div className="popup-container">
        <div className="close-btn" onClick={() => setApply(false)}>
          <img src={Close} alt="close-btn" />
        </div>
        <div className="title">Documents that you need to attach with</div>
        <div className="content">
          {documents.map((document, key) => (
            <div className="item" key={key}>
              <img src={Point} alt="item-point" />
              <span>{document}</span>
            </div>
          ))}
        </div>
        <div className="btn-container">
          <a href={`mailto:jeniromoving@gmail.com?subject=Application for the job ${jobName}&body=Upload the CV and all other necessary documents with this email`} className="btn">
            Apply
          </a>
        </div>
      </div>
    </Container>
  );
}

export default JobApply;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;

  .popup-container {
    width: 50%;
    min-width: 350px;
    min-height: 400px;
    background-color: white;
    box-shadow: 0 0 5px 0 var(--gray);
    border-radius: 12px;
    padding: 20px;
    overflow-y: auto;
    position: relative;

    .close-btn {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        background-color: var(--white);
        transform: scale(1.02);
      }

      img {
        width: 12px;
      }
    }

    .title {
      font-size: var(--heading);
      color: var(--theme1);
      margin-bottom: 20px;
      margin-top: 10px;
    }

    .content {
      padding-left: 30px;

      .item {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        column-gap: 10px;

        span {
          font-size: var(--small);
          color: var(--theme1);
          font-weight: var(--font-w-300);
        }

        img {
          width: 15px;
        }
      }
    }

    .btn-container {
      width: 100%;
      margin-top: 30px;

      .btn {
        width: 100%;
        height: 50px;
        background-color: var(--theme1);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        font-size: var(--small);
        color: var(--white);
        cursor: pointer;
        text-decoration: none;

        &:hover {
          background-color: var(--btn-color-alt);
        }
      }
    }
  }
`;
