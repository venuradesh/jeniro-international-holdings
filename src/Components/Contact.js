import React from "react";
import styled from "styled-components";

//images
import Cover from "../assets/contact.png";
import Close from "../assets/close.png";
import Facebook from "../assets/facebook.png";
import Twitter from "../assets/twitter.png";
import Instagram from "../assets/instagram.png";

//components
import InputFeild from "./InputFeild";

function Contact({ contactClick }) {
  return (
    <Container>
      <div className="cover-container">
        <div className="cover"></div>
        <div className="content-container-left">
          <div className="title">Lets talk.</div>
          <div className="desc">Please get in touch and our expert team will answer all your questions.</div>
          <div className="social-media-links">
            <div className="facebook">
              <img src={Facebook} alt="facebook-logo" />
            </div>
            <div className="instagram">
              <img src={Instagram} alt="instagram-logo" />
            </div>
            <div className="twitter">
              <img src={Twitter} alt="twitter-logo" />
            </div>
          </div>
        </div>
      </div>
      <div className="separator"></div>
      <div className="content-container-right">
        <div className="close-btn" onClick={() => contactClick(false)}>
          <img src={Close} alt="close-btn" className="close-btn-icon" />
        </div>
        <div className="content">
          <div className="title">Contact</div>
          <div className="message">
            <div className="name">
              <InputFeild content="Full Name" id="full-name" type="text" />
            </div>
            <div className="email">
              <InputFeild content="Email" id="email" type="email" />
            </div>
            <div className="problem">
              <textarea name="message" id="message" placeholder="Enter your message"></textarea>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <div className="submit">Submit</div>
        </div>
        <div className="social-media-links">
          <div className="facebook">
            <img src={Facebook} alt="facebook-logo" />
          </div>
          <div className="instagram">
            <img src={Instagram} alt="instagram-logo" />
          </div>
          <div className="twitter">
            <img src={Twitter} alt="twitter-logo" />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Contact;

const Container = styled.div`
  width: 800px;
  height: 500px;
  background-color: var(--white);
  display: flex;
  border-radius: 12px;
  box-shadow: 0 0 10px 0 var(--theme1);
  overflow: hidden;
  position: relative;

  .cover-container {
    width: 50%;
    position: relative;
    z-index: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 20px;

    .cover {
      margin: 20px;
      padding-right: 30px;
      width: 100%;
      height: 100%;
      background-image: url(${Cover});
      background-size: contain;
      object-fit: contain;
      background-repeat: no-repeat;
      background-position: center;
      position: absolute;
      top: 40px;
      left: 0;
      z-index: -2;
    }

    .content-container-left {
      width: 100%;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 20px;
      padding-left: 40px;

      .title,
      .desc {
        color: var(--theme1);
      }

      .title {
        font-size: var(--heading);
      }

      .desc {
        font-size: var(--small);
      }

      .social-media-links {
        width: 40%;
        margin-top: 10px;
        height: 50px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .facebook,
        .instagram,
        .twitter {
          cursor: pointer;
          width: 30px;

          img {
            width: 100%;
          }
        }
      }
    }
  }

  .separator {
    width: 1px;
    height: 85%;
    position: absolute;
    background-color: var(--theme1-alt);
    left: 55%;
    top: 50%;
    transform: translateY(-50%);
  }

  .content-container-right {
    width: 48%;
    height: 100%;
    padding: 20px;
    padding-top: 30px;
    position: relative;
    left: 20px;
    margin-top: auto;

    .close-btn {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;

      .close-btn-icon {
        width: 12px;
        transition: all 0.3s ease;
      }

      &:hover {
        .close-btn-icon {
          transform: scale(1.04);
        }
      }
    }

    .content {
      width: 100%;
      height: max-content;
      margin-top: auto;

      .title {
        font-size: var(--heading);
        font-weight: var(--font-w-700);
        color: var(--theme1);
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 10px;
      }

      .message {
        padding: 0 30px;
        display: flex;
        flex-direction: column;

        .problem {
          margin-top: 20px;

          textarea {
            width: 100%;
            height: 120px;
            font-size: var(--normal);
            background-color: transparent;
            border: 1px solid var(--theme1);
            resize: none;
            outline: none;
            font-family: var(--font-family1);
            color: var(--theme1);

            &::placeholder {
              font-family: var(--font-family1);
              font-size: var(--small);
              color: var(--theme1);
              opacity: 0.8;
            }
          }
        }
      }
    }

    .btn-container {
      width: 100%;
      height: 40px;
      padding: 0 30px;
      margin-top: 20px;

      .submit {
        width: 100%;
        height: 100%;
        background-color: var(--theme1);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--white);
        font-size: var(--small);
      }
    }

    .social-media-links {
      width: 60%;
      padding: 0 30px;
      margin-top: 20px;
      height: 50px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: auto;
      margin-right: auto;
      display: none;

      .facebook,
      .instagram,
      .twitter {
        cursor: pointer;
        width: 30px;

        img {
          width: 100%;
        }
      }
    }
  }

  @media only screen and (max-width: 860px) {
    width: 700px;
    height: 450px;
  }

  @media only screen and (max-width: 768px) {
    width: 80%;
    height: 50%;
  }

  @media only screen and (max-width: 680px) {
    width: 50%;
    padding: 0;

    .cover-container {
      display: none;
    }

    .separator {
      display: none;
    }

    .content-container-right {
      flex: 1;
      left: 0;

      .social-media-links {
        display: flex;
      }
    }
  }

  @media only screen and (max-width: 520px) {
    width: 80%;
    height: max-content;

    .content-container-right {
      padding-top: 20px;

      .content {
        .message {
          width: 100%;
          padding: 0 10px;
        }
      }

      .btn-container {
        padding: 0 10px;
      }

      .social-media-links {
        width: 70%;
      }
    }
  }
`;
