import React from "react";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  width: 100vw;
  ${mobile({ height: "5rem" })};
`;

const Wrapper = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({ padding: "1rem 0" })};
`;

const Left = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center", flex: "2" })};
`;

const Language = styled.span`
  cursor: pointer;
  ${mobile({ display: "none" })};
`;

const SearchContainer = styled.div`
  border: 0.5px solid black;
  margin-left: 2.5rem;

  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 0.25rem;
  ${mobile({ width: "5rem" })};
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "2.4rem" })};
`;

const MenuItem = styled.div`
  font-size: inherit;
  cursor: pointer;
  margin-left: 2rem;

  ${mobile({ fontSize: "1.2rem", marginLeft: "1rem" })};
`;

const Navbar = () => {
  const cart = useSelector((state) => state.cart.value);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>

          <SearchContainer>
            <Input />
            <Search style={{ color: "grey", fontSize: "1.6rem" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>LAMBA</Logo>
        </Center>
        <Right>
          <MenuItem>LOGIN</MenuItem>
          <MenuItem>SIGN UP</MenuItem>
          <Link to={"/cart"}>
            <MenuItem>
              <Badge badgeContent={cart.quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
