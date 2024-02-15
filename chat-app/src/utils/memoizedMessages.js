const cachedMessages = {};

export const memoizedMessages = (conversationKey, messages = null) => {
  if (Object.keys(cachedMessages).includes(conversationKey)) {
    return { data: cachedMessages[conversationKey], isCached: true };
  } else if (messages !== null) {
    cachedMessages[conversationKey] = messages;
    return { data: null, isCached: false };
  } else {
    return { data: null, isCached: false };
  }
};
