exports.getRandomString = () => {
  const res =
    Math.random().toString(36).substring(2, 10) +
    Math.random().toString(36).substring(2, 10);

  return res;
};
