import { Box, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { InputBase } from "@mui/material";

const Container = styled(Box)`
  background: #fff;
  height: 45px;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
`;

const Wrapper = styled(Box)`
  background-color: #f0f2f5;
  position: relative;
  margin: 0px 13px;
  width: 100%;
  border-radius: 10px;
`;

const Icon = styled(Box)`
  position: absolute;
  height: 100%;
  padding: 6px 8px;
  color: #919191;
`;

const InputField = styled(InputBase)`
  width: 100%;
  height: 15px;
  padding: 16px;
  padding-left: 65px;
  font-size: 14px;
`;

function Search() {
  return (
    <Container>
      <Wrapper>
        <Icon fontSize={"small"}>
          <SearchIcon />
        </Icon>
        <InputField placeholder="Search or start new chat" />
      </Wrapper>
    </Container>
  );
}

export default Search;
