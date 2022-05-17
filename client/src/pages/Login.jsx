import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../apiCalls";
import { mobile } from "../responsive";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.3)
    ),
    url("https://images.unsplash.com/photo-1646841238177-b3efeafe8b97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI1fFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60")
      no-repeat center center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 2rem;
  width: 25%;
  background: #fff;
  ${mobile({ width: "75%" })};
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 1rem 0;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 300;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 1.5rem 2rem;
  background: teal;
  cursor: pointer;
  color: white;
  margin-bottom: 1rem;

  &:disabled {
    color: teal;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0;
  font-size: 1.2rem;
  cursor: pointer;
  text-decoration: underline;
`;

const Error = styled.div`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { isFetching, error } = useSelector((state) => state.user.value);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title> SIGN IN</Title>
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link>Forgot password</Link>
          <Link>Sign up</Link>
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>something went wrong...</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
