import React from "react";
import styled from "styled-components";

function InputFeild({ type, content, id, onChange, onInput, error = false, maxlength }) {
  return (
    <Container onChange={onChange} onInput={onInput}>
      <input type={type} id={id} name={id} className={`${type} input`} autoComplete="off" required maxLength={maxlength} />
      <label htmlFor={id} className={`label-container ${error ? "error" : ""}`}>
        <span className={`label-content ${error ? "error" : ""}`}>{content}</span>
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

    &.error {
      border-bottom: 1px solid var(--btn-red);

      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        transition: all 0.3s ease;
        border-bottom: 2px solid var(--btn-red);
        right: 100%;
      }
    }

    .label-content {
      position: absolute;
      bottom: 0%;
      transition: all 0.3s ease;
      color: var(--theme1);
      font-family: var(--font-family1);
      font-size: var(--small);
      font-weight: var(--font-w-500);
      opacity: 0.7;

      &.error {
        color: var(--btn-red);
      }
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
