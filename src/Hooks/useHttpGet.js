import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURI } from '../helpers/base';

const useHttpGet = ( apiPath ) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        //Api path je putanja do pristupnih tacaka ( team, projects, blog, etc.)
        const response = await axios.get(baseURI+apiPath);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiPath]);

  return { data, loading, error };
};

export default useHttpGet;