import { Send } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60vh;
  margin-top: 20rem;
  background: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 4rem;
  margin: 3rem;
`;
const Description = styled.div`
  font-size: 2.4rem;
  font-weight: 300;
  margin-bottom: 3rem;
  ${mobile({ textAlign: "center" })};
`;
const InputContainer = styled.div`
  height: 4rem;
  width: 50%;
  background: #fff;

  display: flex;
  justify-content: space-between;
  border: 1px solid light-grey;

  ${mobile({ width: "80%" })};
`;
const Input = styled.input`
  flex: 8;
  border: none;
  padding-left: 2rem;
  color: #333;
`;
const Button = styled.button`
  flex: 1;
  background: teal;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const NewsLetter = () => {
  return (
    <Container>
      <Title>News Letter</Title>
      <Description>Get Timely updates from your favorite products.</Description>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewsLetter;
