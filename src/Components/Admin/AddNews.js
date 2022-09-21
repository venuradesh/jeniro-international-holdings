import React from "react";
import styled from "styled-components";
import InputFeild from "../InputFeild";

function AddNews() {
  return (
    <Container>
      <div className="title">Add a News</div>
      <form className="news-container">
        <div className="news-title">
          <InputFeild type="text" content="Enter the title" />
          <InputFeild type="text" content="Overview of the content" />
        </div>
        <div className="cover-input">
          Insert a cover photo
          <input type="file" name="cover-input" id="news-cover" accept="image/jpeg, image/png, image/jpg" />
        </div>
        <textarea name="news-content" className="news-content" id="news-content" placeholder="News Content" />
        <div className="btn-container">
          <button type="submit" className="submit btn">
            Submit
          </button>
          <button type="reset" className="reset btn">
            Reset
          </button>
        </div>
      </form>
    </Container>
  );
}

export default AddNews;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .title {
    font-size: var(--heading);
    color: var(--theme1);
    text-transform: uppercase;
    font-weight: var(--font-w-700);
    text-align: center;
    margin-bottom: 20px;
  }

  .news-container {
    .news-title {
      display: flex;
      column-gap: 30px;
    }

    .news-content {
      resize: none;
      width: 100%;
      height: 200px;
      margin-top: 20px;
      background-color: transparent;
      border: 1px solid var(--theme1);
      font-family: var(--font-family1);
      font-weight: var(--font-w-500);
      padding: 10px;
      outline: none;
      font-size: var(--normal);
      border-radius: 12px;

      &::placeholder {
        font-size: var(--small);
      }
    }

    .cover-input {
      width: 100%;
      height: 50px;
      background-color: var(--theme1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
      font-size: var(--small);
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 20px;

      &:hover {
        background-color: var(--btn-color-alt);
      }

      input[type="file"] {
        display: none;
      }
    }

    .btn-container {
      display: flex;
      width: 100%;
      height: 50px;
      margin-top: 20px;
      column-gap: 20px;

      .btn {
        width: 100%;
        height: 100%;
        background-color: var(--theme1);
        border: none;
        outline: none;
        color: var(--white);
        font-size: var(--small);
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
          background-color: var(--btn-color-alt);
        }

        &.reset {
          background-color: var(--btn-red);

          &:hover {
            background-color: var(--btn-red-alt);
          }
        }
      }
    }
  }

  @media only screen and (max-width: 480px) {
    .news-container {
      .news-title {
        flex-direction: column;
      }
    }
  }
`;
