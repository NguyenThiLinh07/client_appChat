const REGEX = {
  USERNAME: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  EMAIL:
    /^[\w.+-]{1,64}@[a-z\d](?:[a-z\d-]{0,253}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,253}[a-z\d])?)+$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
};

export { REGEX };
