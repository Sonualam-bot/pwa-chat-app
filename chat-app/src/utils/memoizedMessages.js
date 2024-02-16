const cachedMessages = {};

export const memoizedMessages = (
  conversationKey,
  messages = null,
  setMemoizedState,
  newMessage = null
) => {
  if (
    Object.keys(cachedMessages).includes(conversationKey) &&
    newMessage === undefined
  ) {
    setMemoizedState(cachedMessages);
  } else if (newMessage && conversationKey) {
    const data = cachedMessages[conversationKey];
    const updatedData = [...data, newMessage];

    cachedMessages[conversationKey] = updatedData;

    setMemoizedState(cachedMessages);
  } else if (messages !== null && conversationKey !== undefined) {
    cachedMessages[conversationKey] = messages;
    setMemoizedState(cachedMessages);
  }
};
