import logo from "./logo.svg";
import "./App.css";
import useHttp from "./api/useHttp";
import { useEffect, useState } from "react";

function App() {
  const { sendRequest: getRepoReq, isLoading: isRepoGeting } = useHttp();
  const [repoList, setRepo] = useState([]);
  const [page, setPage] = useState(1);
  const handleGetRepo = () => {
    getRepoReq(
      {
        url: `https://api.github.com/repositories/1300192/issues?page=${page}&per_page=15`,
        method: "GET",
      },
      (data) => {
        console.log("data", data);
      },
      (err, data) => {
        console.log("errdata", data);
      }
    );
  };
  useEffect(() => {
    handleGetRepo();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
