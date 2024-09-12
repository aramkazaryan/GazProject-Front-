interface Headers {
  [key: string]: string;
}

const extendDefaultHeaders = (
  extendWith: Headers,
  unsetContentType?: boolean
): Headers => {
  const result: Headers = {
    "Content-Type": unsetContentType ? "" : "application/json",
    ...extendWith,
  };

  Object.keys(result).forEach(
    (key) => result[key] === "" && delete result[key]
  );

  return result;
};

export default extendDefaultHeaders;
