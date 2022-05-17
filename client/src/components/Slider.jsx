import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;

  position: relative;
  overflow: hidden;

  ${mobile({ display: "none" })};
`;

const Arrow = styled.div`
  font-size: 2rem;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  background: #fff7f7;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;

  cursor: pointer;
  left: ${(props) =>
    // @ts-ignore
    props.direction == "left" && "1rem"};
  right: ${(props) =>
    // @ts-ignore
    props.direction == "right" && "1rem"};

  opacity: 0.5;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(
    ${(props) =>
      // @ts-ignore
      props.slideIndex * -100}vw
  );
  transition: all 0.3s ease;
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #${(props) =>
      // @ts-ignore
      props.bg};
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;

  text-align: center;
`;

const Image = styled.img`
  height: 70%;
  width: 50%;
  margin: 2rem 0;
`;

const InfoContainer = styled.div`
  flex: 1;
  height: 100%;
  width: 80%;
`;

const Title = styled.h1`
  font-size: 7rem;
  font-weight: bold;
`;

const Description = styled.p`
  margin: 3rem 0;
  letter-spacing: 3px;
  text-transform: uppercase;
`;

const Button = styled.button`
  padding: 1rem;
  cursor: pointer;
  font-size: 2rem;
  background: transparent;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction == "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow
        // @ts-ignore
        direction="left"
        onClick={() => handleClick("left")}
      >
        <ArrowLeftOutlined />
      </Arrow>

      <Wrapper
        // @ts-ignore
        slideIndex={slideIndex}
      >
        {sliderItems.map((item) => (
          <Slide
            // @ts-ignore
            key={item.id}
            bg={item.bg}
          >
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>

            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
              <Button>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>

      <Arrow
        // @ts-ignore
        direction="right"
        onClick={() => handleClick("right")}
      >
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
