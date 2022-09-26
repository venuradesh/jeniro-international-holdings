import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import animationData from "../assets/Lotties/loading.json";

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Loading() {
  return (
    <Container>
      <Lottie options={lottieOptions} height={200} />
    </Container>
  );
}

export default Loading;

const Container = styled.div`
  width: max-content;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
