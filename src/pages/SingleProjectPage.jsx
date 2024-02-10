import styles from "./SingleProjectPage.module.scss";
import { Col, Container, Fade, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import useHttpGet from "../Hooks/useHttpGet";
import { useEffect, useState } from "react";

//import ImageSlider from "../compontents/ImageSlider";

import { nameToPathFormat } from "../helpers/helpFunctions";


const SingleProjectPage = () => {
  const fetchData = useHttpGet("projects");
  const { projectUrl } = useParams();


 

  //State koji cuva podatke trenutno izabranog projekta
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    if (fetchData.error === null && fetchData.loading === false)
      //provera da li se naziv projekta podudara sa url
      setSelectedData(
        fetchData.data.filter((data) => {
          return nameToPathFormat(data.project_name) === projectUrl;
        })[0]
      );
  }, [fetchData]);

  return (
    <Container className={"containerFix"}>
      <div className={styles.projectContainer}>
        {
          <Row className={styles.projectDiv}>
            <Col>
              <h1>{selectedData?.id}</h1>
            </Col>
          </Row>
        }
      </div>

    </Container>
  );
};
export default SingleProjectPage;
