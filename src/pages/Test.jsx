import axios from "axios";
import { useState } from "react";


function Test() {
    const [testData, setTestData] = useState({"":""});
    const getCustomersData = () => {
        axios
            .get("https://httpbin.org/get?test=test")
            .then(data => setTestData(data))
            .catch(error => console.log(error));
    };

  return (
    <div>
        <h1>Ovo je test za Kepa</h1>
        <button onClick={getCustomersData}>Axios Test</button>
        <p>{testData?.data?.args?.test ?testData?.data.args.test : "Change this text" }</p>
        {console.log(testData)}
    </div>
  );
}

export default Test;