import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { publicRequest, userRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/cartRedux";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 5rem;
  display: flex;
  ${mobile({ flexDirection: "column", padding: "1rem" })};
`;
const ImageContainer = styled.div`
  flex: 1;
  padding: 0 5rem;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 5rem;
  ${mobile({ padding: "1rem" })};
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40%" })};
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Description = styled.div`
  margin: 2rem 0;
`;
const Price = styled.div`
  font-weight: 100;
  font-size: 4rem;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })};
`;

const Filter = styled.div`\
display: flex;
align-items: center;
`;
const FilterTitle = styled.h1`
  font-size: 2rem;
  font-weight: 200;
`;
const FilterColor = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  margin: 0 5px;
  background: ${(props) => props.color};
  cursor: pointer;

  &.active {
    border: 2px solid blue;
  }
`;
const FilterSize = styled.select`
  padding: 5px;
  margin: 0 5px;
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  ${mobile({ width: "100%" })};
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Amount = styled.span`
  height: 30px;
  width: 30px;
  border-radius: 1rem;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;
const Button = styled.button`
  padding: 1.5rem;
  border: 2px solid teal;
  cursor: pointer;
  background: white;
  font-weight: 500;

  &:hover {
    background: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);

        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (query) => {
    if (query == "dec") {
      quantity < 1 ? setQuantity(quantity - 1) : setQuantity(1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <Price>$ {product.price} </Price>

          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor
                  color={c}
                  key={c}
                  onClick={(e) => {
                    setColor(c);
                  }}
                />
              ))}
            </Filter>

            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>

          <AddContainer>
            <AmountContainer>
              <Remove
                onClick={() => handleQuantity("dec")}
                style={{ cursor: "pointer" }}
              />
              <Amount>{quantity}</Amount>
              <Add
                onClick={() => handleQuantity("inc ")}
                style={{ cursor: "pointer" }}
              />
            </AmountContainer>
            <Button onClick={handleClick}>Add To Cart</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>

      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Product;
