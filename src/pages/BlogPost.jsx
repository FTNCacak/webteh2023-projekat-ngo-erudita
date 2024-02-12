import styles from "./BlogPost.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import useHttpGet from "../Hooks/useHttpGet";
import { useEffect, useState } from "react";
import { nameToPathFormat } from "../helpers/helpFunctions";

import PhotoGallery from "../compontents/PhotoGallery";

const BlogPost = () => {
  const fetchData = useHttpGet("blogs");
  const { projectUrl } = useParams();

  //State koji cuva podatke trenutno izabranog projekta
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    if (fetchData.error === null && fetchData.loading === false)
      //provera da li se naziv projekta podudara sa url
      setSelectedData(
        fetchData.data.filter((data) => {
            // console.log(data.media_urls);
          return nameToPathFormat(data.title) === projectUrl;
        })[0]
      );
  }, [fetchData]);

  return (
    <Container className={"containerFix"}>
     <div className={styles.blogContainer}>
        <h1>{selectedData?.title}</h1>
        <div className={styles.imgContainer}>
          <img src={selectedData?.photo} />
        </div>
        <p>{selectedData?.long_description}</p>
      </div>
      {selectedData?.media_urls.length != 0 ? <PhotoGallery imageProps={selectedData?.media_urls}/> : null}

    </Container>
  );
};
export default BlogPost;
