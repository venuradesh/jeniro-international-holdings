import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import animationData from "../assets/Lotties/content-not-found.json";

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function ContentNotFound({ content }) {
  return (
    <Container>
      <Lottie options={lottieOptions} height={200} />
      <div className="content">Sorry, {content} Not available</div>
    </Container>
  );
}

export default ContentNotFound;

const Container = styled.div`
  width: max-content;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .content {
    font-size: var(--normal);
    font-weight: var(--font-w-700);
    color: var(--theme1);
  }
`;
