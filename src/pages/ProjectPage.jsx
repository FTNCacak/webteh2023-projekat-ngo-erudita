import { Link } from "react-router-dom";
import styles from "./ProjectPage.module.scss";
import { Col, Row } from "react-bootstrap";
import useHttpGet from "../Hooks/useHttpGet";
import { useEffect } from "react";

const ProjectPage = () => {

  const fetchData = useHttpGet('projects');

  useEffect(()=>{
    if(fetchData.error==null && fetchData.loading == false)
        console.log(fetchData.data);
  }, []);

  return (
    <>
      <div className={styles.projectContainer}>
        <h1 className={styles.mainHeader}>Projekti</h1>
        <Row className={styles.projectDiv}>
          <Col md={4} sm={6} xs={12} className={styles.textCol}>
            <div className={styles.textProject}>
              <h3>Srusimo 4 zida</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex
                animi suscipit quibusdam nesciunt non sit hic voluptatem
                cupiditate labore optio atque eum autem minima voluptatum
                voluptate amet numquam, libero tenetur?
              </p>
              <Link to={"/o-nama"}>Saznajte više</Link>
            </div>
          </Col>
          <Col md={8} sm={6} xs={12}>
            <div className={styles.contentProject}>
              <img
                alt='projekat'
                src={
                  process.env.PUBLIC_URL +
                  "/imgs/projects/Srusimo-4-zida-photo-1.png"
                }
              ></img>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ProjectPage;
