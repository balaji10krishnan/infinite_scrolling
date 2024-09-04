import { useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const sendRequest = async (req, onSuccess = () => {}, onError = () => {}) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    let data;
    try {
      const res = await fetch(req.url, req);
      data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
        onSuccess(data);
      } else {
        throw new Error();
      }
    } catch (err) {
      setIsError(true);
      onError(err, data);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, isSuccess, isError, sendRequest };
};
export default useHttp;
