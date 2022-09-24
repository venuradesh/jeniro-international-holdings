import React, { useState } from "react";
import styled from "styled-components";
import InputFeild from "../InputFeild";
import Lottie from "react-lottie";
import * as animationData from "../../assets/Lotties/submit-loading.json";
import axios from "axios";

//images
import Done from "../../assets/checked.png";

// const API_URL = "http://localhost:5000";
const API_URL = "https://jeniro-international-holdings.herokuapp.com";

function AddNews() {
  const [newsCreated, setNewsCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    isClickToPauseDisabled: true,
  };

  const onFileChange = () => {
    setFile(document.getElementById("news-cover").files[0]);
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);
    if (title && overview && content) {
      const formData = new FormData();
      if (file) {
        formData.append("cover", file, file.name);
      }
      formData.append("title", title);
      formData.append("overview", overview);
      formData.append("content", content);
      formData.append("authorId", localStorage.getItem("user"));

      axios
        .post(`${API_URL}/addnews`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          if (!result.data.error) {
            document.getElementById("reset-btn").click();
            setNewsCreated(true);
            setTimeout(() => {
              setNewsCreated(false);
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err.message);
          err.response.data ? setError(err.response.data.message) : setError("");
          err.message ? setError(err.message) : setError("");
          // setError(err.response.data.message ? err.response.data.message : "Network Error");
          setLoading(false);
        });
    } else {
      console.log(title);
      console.log(overview);
      console.log(content);
      setError("title, overview and content should be filled");
      setLoading(false);
    }
  };

  const onResetClick = () => {
    setLoading(false);
    setError("");
    setTitle("");
    setOverview("");
    setContent("");
    setFile(null);
  };

  return (
    <Container>
      <div className="title">Add a News</div>
      <form className="news-container">
        <div className="news-title">
          <InputFeild type="text" content="Enter the title" onInput={(e) => setTitle(e.target.value)} maxlength={70} />
          <InputFeild type="text" content="Overview of the content (max: 200ch)" onInput={(e) => setOverview(e.target.value)} maxlength={200} />
        </div>
        <div className="cover-input" onClick={() => document.getElementById("news-cover").click()}>
          {file ? file.name : "Insert a cover photo"}
          <input type="file" name="cover-input" id="news-cover" accept="image/jpeg, image/png, image/jpg" onChange={() => onFileChange()} />
        </div>
        <textarea name="news-content" className="news-content" id="news-content" placeholder="News Content" onInput={(e) => setContent(e.target.value)} />
        {error ? <div className="error-container">*{error}</div> : <></>}
        <div className="btn-container">
          <button type="submit" className="submit btn" onClick={(e) => onSubmitClick(e)}>
            {loading ? <Lottie options={lottieOptions} width={50} height={30} /> : "Submit"}
          </button>
          <button type="reset" id="reset-btn" className="reset btn" onClick={() => onResetClick()}>
            Reset
          </button>
        </div>
      </form>
      {newsCreated ? (
        <div className="news-added-container">
          <div className={`content ${newsCreated ? "active" : ""}`}>
            <img src={Done} alt="done" />
            News added successfully
          </div>
        </div>
      ) : (
        <></>
      )}
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

  .news-added-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);

    .content {
      width: max-content;
      height: max-content;
      padding: 20px 50px;
      background-color: var(--theme1);
      font-size: var(--small);
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 20px;
      transition: all 0.3s ease;
      transform-origin: center;
      opacity: 0;
      animation: zoomInOut 1s alternate infinite ease-in-out;

      img {
        width: 20px;
      }

      &.active {
        opacity: 1;
      }

      @keyframes zoomInOut {
        0% {
          transform: scale(0.98);
        }

        100% {
          transform: scale(1);
        }
      }
    }
  }

  .news-container {
    width: 80%;
    margin-inline: auto;

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

    .error-container {
      margin-top: 20px;
      width: 100%;
      font-size: var(--small);
      color: var(--btn-red);
      text-align: center;
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

  @media only screen and (max-width: 630px) {
    .news-container {
      width: 100%;
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
