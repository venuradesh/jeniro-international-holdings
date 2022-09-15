import React from "react";
import styled from "styled-components";

function InputFeild({ type, content, id }) {
  return (
    <Container>
      <input type={type} id={id} name={id} className={`${type} input`} autoComplete="off" required />
      <label htmlFor={id} className="label-container">
        <span className="label-content">{content}</span>
      </label>
    </Container>
  );
}

export default InputFeild;

const Container = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;

  .label-container {
    width: 100%;
    position: absolute;
    pointer-events: none;
    left: 0;
    bottom: 1px;
    border-bottom: 1px solid var(--theme1);

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      transition: all 0.3s ease;
      border-bottom: 2px solid var(--theme1);
      right: 100%;
    }

    .label-content {
      position: absolute;
      bottom: 0%;
      transition: all 0.3s ease;
      font-family: var(--font-family1);
      font-size: var(--small);
      font-weight: var(--font-w-500);
      opacity: 0.7;
    }
  }

  .input {
    width: 100%;
    height: 50px;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: var(--normal);
    padding-top: 25px;

    &:focus,
    &:valid {
      & + .label-container {
        &::after {
          right: 0%;
        }

        .label-content {
          font-size: var(--ex-small);
          bottom: 25px;
          opacity: 0.5;
        }
      }
    }
  }
`;
