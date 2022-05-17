import { useEffect } from "react";
import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { useHistory } from "react-router-dom";

const KEY =
  "pk_test_51Kj6TQJnBCTdvimVkijW8dWC8rjRvMERT5Z7IiYDGcd1w8eeuxlTSmiazncU6CR5EroY29j7jimEqpAzqjhup3Yf00rs7gjezq";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 2rem;
  ${mobile({ padding: "1rem" })};
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TopButton = styled.button`
  padding: 1rem;
  cursor: pointer;
  font-weight: 600;
  border: ${(props) => props.type === "filled" && "none"};
  background ${(props) => (props.type === "filled" ? "black" : "transparent")};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })};
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 1rem;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
`;
const Info = styled.div`
  flex: 3;
`;
const summary = styled.div`
  flex: 1;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Details = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Image = styled.img`
  width: 20rem;
`;
const ProductColor = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  background: ${(props) => props.color};
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductSize = styled.span``;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;
const ProductAmount = styled.div`
  font-size: 2.4rem;
  margin: 5px;
  ${mobile({ margin: "5px 1.5rem" })};
`;

const ProductPrice = styled.div`
  font-size: 3rem;
  font-weight: 200;
  ${mobile({ marginBottom: "2rem" })};
`;

const Hr = styled.hr`
  background: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgrey;
  border-radius: 1rem;
  padding: 2rem;
  height: 50vh;
`;
const SummaryTitle = styled.h1``;
const SummaryItem = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "2.4rem "};
`;

const Button = styled.button`
  border: none;
  background: black;
  width: 100%;
  padding: 1rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
const SummaryItemText = styled.div``;
const SummaryItemPrice = styled.span``;

const Cart = () => {
  const cart = useSelector((state) => state.cart.value);
  console.log(cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    // make request
    const makeRequest = async () => {
      try {
        const res = await userRequest.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: cart.total * 100,
          }
        );
        history.push("/sucess", { data: res.data });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG!</Title>
        <Top>
          <TopButton>Continue Shopping</TopButton>
          <TopTexts>
            <TopText>shopping Bag(2)</TopText>
            <TopText>Your wishlist(0)</TopText>
          </TopTexts>
          <TopButton type="filled">Check out Now!</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart?.product.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product?.img} />
                  <Details>
                    <ProductName>
                      <b>product</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product?._id}
                    </ProductId>
                    <ProductColor color={product?.color} />
                    <ProductSize>
                      <b>size</b> {product?.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product?.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>$ {product?.price}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}

            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart?.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Bolu shop"
              description="your total is $20"
              shippingAddress
              billingAddress
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>Check out Now</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
