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
  const { account, socket, setActiveUsers } = useContext(AccountContext);

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

  useEffect(() => {
    socket.current.emit("addUsers", account);
    socket.current.on("getUsers", (users) => setActiveUsers(users));
  }, [account]);

  return (
    <Component>
      {users &&
        users?.map((user, index) => {
          return (
            user.sub !== account.sub && (
              <Box key={user._id}>
                <ConversationCard user={user} key={user._id} />

                {users.length !== index + 1 && <StyledDivider />}
              </Box>
            )
          );
        })}
    </Component>
  );
}

export default Conversations;
