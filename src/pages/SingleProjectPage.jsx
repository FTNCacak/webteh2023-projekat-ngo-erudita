import styles from "./SingleProjectPage.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import useHttpGet from "../Hooks/useHttpGet";
import { useEffect, useState } from "react";

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
          return (
            data.project_name
              .replaceAll(" ", "-")
              .toLowerCase()
              .replaceAll("š", "s")
              .replaceAll("č", "c")
              .replaceAll("ć", "c")
              .replaceAll("ž", "z")
              .replaceAll("đ", "dj")
              .replaceAll("ð", "dj") === projectUrl
          );
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
