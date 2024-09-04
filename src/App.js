import logo from "./logo.svg";
import "./App.css";
import useHttp from "./api/useHttp";
import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const { sendRequest: getRepoReq, isLoading: isRepoGeting } = useHttp();
  const [repoList, setRepoList] = useState([]);
  const [page, setPage] = useState(1);
  const observer = useRef(null);
  const lastElementObserve = useCallback(
    (node) => {
      if (isRepoGeting) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((element) => {
        if (element[0].isIntersecting) {
          setPage((pre) => pre + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isRepoGeting]
  );
  const handleGetRepo = () => {
    getRepoReq(
      {
        url: `https://api.github.com/repositories/1300192/issues?page=${page}&per_page=15`,
        method: "GET",
      },
      (data) => {
        setRepoList((pre) => [...pre, ...data]);
      },
      (err, data) => {
        console.log("errdata", data);
      }
    );
  };
  useEffect(() => {
    handleGetRepo();
  }, [page]);

  return (
    <div>
      {repoList.map((repo, i) => (
        <div ref={repoList.length == i + 1 ? lastElementObserve : null}>
          <img src={repo.user.avatar_url} />
        </div>
      ))}
      {isRepoGeting && <p>Loading</p>}
    </div>
  );
}

export default App;
