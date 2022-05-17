import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
`;

const Message = styled.div`
  color: green;
  font-size: 4rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const Sucess = () => {
  const location = useLocation();
  console.log(location);
  return (
    <Container>
      <Message>Succesful</Message>
    </Container>
  );
};

export default Sucess;
