import React from "react";
import styled from "styled-components";
import { categories } from "../data";
import CategoriesItem from "./CategoriesItem";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;

  ${mobile({ padding: "0", flexDirection: "column" })};
`;
const Categories = () => {
  return (
    <Container>
      {categories.map((items) => (
        <CategoriesItem item={items} key={items.id} />
      ))}
    </Container>
  );
};

export default Categories;
