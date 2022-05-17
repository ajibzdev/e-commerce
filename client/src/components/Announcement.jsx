import styled from "styled-components";
const Container = styled.div`
  height: 3rem;
  width: 100vw;
  color: white;
  background: teal;
  font-size: 1.6rem;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Announcement = () => {
  return <Container>Get amazing hair right now, for just $50</Container>;
};

export default Announcement;
