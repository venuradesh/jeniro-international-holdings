import React from "react";
import styled from "styled-components";

//images
import Wallpaper from "../assets/wallpaper1.jpg";
import DownArraw from "../assets/down-arrow.png";

function LandingPage() {
  return (
    <Container>
      <div className="background-image"></div>
      <div className="background-tint"></div>
      <HeroContainer>
        <div className="content-container">
          <div className="title">
            <div>Browse. Apply.</div>
            <div>Prepare for your Future</div>
          </div>
          <div className="desc">Find jobs, Employment and Career opportunities</div>
          <div className="input-field-container">
            <input placeholder="Job Title" type="text" name="keyword" id="job-title" className="job-title" />
            <div className="select">
              <select name="job-type" id="job-type" className="job-type">
                <option value="none" hidden selected className="select-item">
                  Job Type
                </option>
                <option value="Nursing" className="select-item">
                  <div className="content">Nursing</div>
                </option>
                <option value="Engineering" className="select-item">
                  <div className="content">Engineering</div>
                </option>
                <option value="Doctor" className="select-item">
                  <div className="content">Doctor</div>
                </option>
              </select>
            </div>
            <div className="search-btn">Search</div>
          </div>
        </div>
      </HeroContainer>
      <div className="scroll-down">
        <img src={DownArraw} alt="move-down" />
      </div>
    </Container>
  );
}

export default LandingPage;

const Container = styled.div`
  width: 100vw;
  height: max-content;
  position: relative;
  z-index: 0;

  .background-image {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(${Wallpaper});
    background-position: center;
    background-size: cover;
    object-fit: cover;
    z-index: -1;
  }

  .background-tint {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--theme1);
    opacity: 0.7;
    z-index: -1;
  }

  .scroll-down {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--white);
    font-weight: var(--font-w-300);
    display: flex;
    align-items: center;
    column-gap: 10px;

    img {
      width: 30px;
      position: relative;
      animation: moveDown 0.5s ease-in-out alternate infinite;
    }

    @keyframes moveDown {
      0% {
        top: -5px;
      }

      100% {
        top: 5px;
      }
    }
  }
`;

const HeroContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  padding-left: 20vh;

  .content-container {
    display: flex;
    flex-direction: column;

    .title {
      div {
        font-size: var(--main-heading);
        color: var(--white);
        font-weight: var(--font-w-600);
        text-transform: capitalize;
      }
    }

    .desc {
      font-size: var(--normal);
      color: var(--white);
      font-weight: var(--font-w-300);
      margin-top: 10px;
    }

    .input-field-container {
      margin-top: 20px;
      display: flex;
      align-items: center;
      column-gap: 20px;

      .job-title {
        width: 200px;
        height: 50px;
        border-radius: 8px;
        background-color: var(--white);
        border: none;
        outline: none;
        padding: 5px 10px;
        font-size: var(--normal);
      }

      .select {
        width: 200px;
        background-color: var(--white);
        height: 50px;
        border-radius: 8px;
        cursor: pointer;
        position: relative;

        &::after {
          content: "";
          width: 0.8rem;
          height: 0.6rem;
          background-color: var(--theme1);
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          position: absolute;
          right: 15px;
          bottom: 50%;
          transform: translateY(50%);
        }

        .job-type {
          background-color: transparent;
          appearance: none;
          border: none;
          padding: 0 1em 0 1em;
          width: 100%;
          height: 50px;
          font-family: inherit;
          font-size: var(--normal);
          cursor: inherit;
          line-height: inherit;
          outline: none;
          color: gray;
          font-weight: var(--font-w-500);

          &::-ms-expand {
            display: none;
          }
        }
      }

      .search-btn {
        width: 200px;
        height: 50px;
        background-color: var(--btn-color);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--white);
        font-size: var(--normal);
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background-color: var(--btn-color-alt);
        }
      }
    }
  }

  @media only screen and (max-width: 1080px) {
    padding: 0;
    justify-content: center;
  }

  @media only screen and (max-width: 768px) {
    .content-container {
      .title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        div {
          text-align: center;
        }
      }

      .desc {
        text-align: center;
        margin-bottom: 20px;
      }

      .input-field-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        row-gap: 20px;
      }
    }
  }

  @media only screen and (max-width: 425px) {
    .content-container {
      .input-field-container {
        .job-title {
          width: 85%;
        }

        .select {
          width: 85%;

          .job-type {
            width: 100%;
          }
        }

        .search-btn {
          width: 85%;
        }
      }
    }
  }
`;
