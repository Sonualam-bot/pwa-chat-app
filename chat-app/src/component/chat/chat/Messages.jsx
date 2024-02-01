import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Footer from "./Footer";

const Wrapper = styled(Box)`
  background-image: url(${"https://i.pinimg.com/564x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg"});
  background-size: 50%;
`;

const Component = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
`;

function Messages() {
  return (
    <Wrapper>
      <Component></Component>
      <Footer />
    </Wrapper>
  );
}

export default Messages;
