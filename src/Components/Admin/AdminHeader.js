import React from "react";
import styled from "styled-components";

function AdminHeader() {
  return (
    <Container>
      <div className="user-name">Administrator</div>
    </Container>
  );
}

export default AdminHeader;

const Container = styled.div`
  position: fixed;
  width: calc(100vw - 20vw);
  height: 50px;
  background-color: var(--theme1);
  left: 20vw;
  z-index: 100;
  /* box-shadow: 0px 0px 5px 0 var(--theme1-alt); */
  padding-right: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .user-name {
    color: var(--white);
  }

  @media only screen and (max-width: 680px) {
    left: 0%;
    width: 100vw;
  }
`;
