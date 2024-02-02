import { useContext, useEffect, useState } from "react";
import { getUsers } from "../../../service/api";
import { Box, Divider, styled } from "@mui/material";
import ConversationCard from "./ConversationCard";
import { AccountContext } from "../../../context/AccountProvider";

const Component = styled(Box)`
  height: 81vh;
  overflow: overlay;
`;

const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background-color: #e9edef;
  opacity: 0.6;
`;

function Conversations({ text }) {
  const [users, setUsers] = useState([]);
  const { account } = useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUsers();
      const filteredData = response?.users?.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setUsers(filteredData);
    };
    fetchData();
  }, [text]);

  return (
    <Component>
      {users?.map((user, index) => {
        return (
          user.sub !== account.sub && (
            <>
              <ConversationCard user={user} key={user._id} />

              {users.length !== index + 1 && <StyledDivider />}
            </>
          )
        );
      })}
    </Component>
  );
}

export default Conversations;
