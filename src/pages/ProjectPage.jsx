import { Link } from "react-router-dom";
import styles from "./ProjectPage.module.scss";
import { Col, Row } from "react-bootstrap";
import useHttpGet from "../Hooks/useHttpGet";
import { useEffect } from "react";

const ProjectPage = () => {
  const fetchData = useHttpGet("projects");

  useEffect(() => {
    if (fetchData.error === null && fetchData.loading === false)
      console.log(fetchData.data);
  }, []);

  return (
    <>
      <div className={styles.projectContainer}>
        <h1 className={styles.mainHeader}>Projekti</h1>

        
        {
          //Koristena je mapa da bi se proslo kroz sve elemente baze projekti
          //Znak pitanja je osiguranje da ne baca error dok se data ne ucita
          fetchData.data?.map((data) => {
            return (
                <Row className={styles.projectDiv} key={data.id}>
                  <Col md={4} sm={6} xs={12} className={styles.textCol}>
                    <div className={styles.textProject}>
                      <h3>{data.project_name}</h3>
                      <p>{data.short_description}</p>
                      <Link to={"/o-nama"}>Saznajte više</Link>
                    </div>
                  </Col>
                  <Col md={8} sm={6} xs={12}>
                    <div className={styles.contentProject}>
                      <img
                        alt="projekat"
                        src={process.env.PUBLIC_URL + data.photo}
                      ></img>
                    </div>
                  </Col>
                </Row>
            );
          })
        }
        </div>
    </>
  );
};
export default ProjectPage;
