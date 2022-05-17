import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Info = styled.div`
  height: 100%;
  width: 100%;
  z-index: 3;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;

  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease-in;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 28rem;
  height: 35rem;
  background: #f5fbfd;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  height: 20rem;
  width: 20rem;
  border-radius: 50%;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Image = styled.img`
  width: 100%;
  height: 85%;
  object-fit: cover;
  z-index: 2;
`;
const Icon = styled.div`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  margin: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #e9f5f5;
    transform: scale(1.2);
  }
`;

const Product = ({ item }) => {
  return (
    <Container>
      <Circle />

      <Image src={item.img} alt="an Image" />

      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
