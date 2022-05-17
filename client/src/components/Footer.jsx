import {
  Facebook,
  Instagram,
  MailOutlined,
  Phone,
  Room,
  Twitter,
  WhatsApp,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  // ${mobile({ flexDirection: "column" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;
const Logo = styled.h1``;

const Description = styled.div`
  margin: 2rem 0;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 4rem;
  height: 4rem;
  margin-right: 2rem;
  border-radius: 50%;
  color: white;
  background: #${(props) => props.color};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  padding: 2rem;
  ${mobile({ display: "none" })};
`;

const Title = styled.h3`
  margin-bottom: 3rem;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 1rem;
`;

const Right = styled.div`
  flex: 1;
  padding: 2rem;
  ${mobile({ backgroundColor: "#eee" })};
`;

const ContactItem = styled.div``;
const Payment = styled.img``;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>LAMA.</Logo>
        <Description>
          There are many variations of passages of Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Voluptatem rerum, sint temporibus
          provident animi, impedit dolores suscipit modi voluptate veniam
          soluta! A nemo itaque suscipit odio quia ab possimus quo.
        </Description>
        <SocialContainer>
          <SocialIcon color="385999">
            <Facebook />
          </SocialIcon>

          <SocialIcon color="E4405F">
            <Twitter />
          </SocialIcon>

          <SocialIcon color="55ACEE">
            <Instagram />
          </SocialIcon>

          <SocialIcon color="E60023">
            <WhatsApp />
          </SocialIcon>
        </SocialContainer>
      </Left>

      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Main Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>

      <Right>
        <Title></Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} />
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} />
          +2348888888
        </ContactItem>
        <ContactItem>
          <MailOutlined style={{ marginRight: "10px" }} />
          Contact@fuckyou.com
        </ContactItem>

        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png " />
      </Right>
    </Container>
  );
};

export default Footer;
