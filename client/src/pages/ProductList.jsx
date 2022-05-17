import styled from "styled-components";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
const Container = styled.div``;
const Title = styled.h1`
  margin: 2rem;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 2rem;
  ${mobile({ width: "0 2rem", display: "flex", flexDirection: "column" })};
`;

const FilterText = styled.span`
  font-weight: 600;
  font-size: 2rem;
  margin-right: 2rem;

  ${mobile({ marginRight: "0" })};
`;

const Select = styled.select`
  padding: 2rem;
  margin: 1rem;
  ${mobile({ margin: "1rem 0" })};
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("newest");
  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilter}>
            <Option disabled>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>green</Option>
            <Option>yellow</Option>
          </Select>

          <Select name="size" onChange={handleFilter}>
            <Option disabled>Size</Option>
            <Option>Xs</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>Xl</Option>
            <Option>Fat</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select
            name="price"
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price(desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      {/* passsing the value of cat(from the url) sort(from the sort state) filters(from the filter state) */}
      <Products cat={cat} sort={sort} filters={filter} />

      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default ProductList;
