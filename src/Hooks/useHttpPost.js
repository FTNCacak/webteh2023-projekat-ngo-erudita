import { useState, useEffect } from "react";
import axios from "axios";
import { baseURI } from "../helpers/base";

const useHttpPost = (apiPath) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //
  const postData = async (body) => {
    try {
      //Api path je putanja do pristupnih tacaka ( team, projects, blog, etc.)
      const response = await axios.post(baseURI + apiPath, body);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {postData};
};

export default useHttpPost;
