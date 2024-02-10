import styles from "./SingleProjectPage.module.scss";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import useHttpGet from "../Hooks/useHttpGet";
import { useEffect, useState } from "react";

const SingleProjectPage = () => {
    const fetchData = useHttpGet("projects");
    const {projectUrl} = useParams();
    const [selectedData, setSelectedData] = useState();

    useEffect(() => {
        if (fetchData.error === null && fetchData.loading === false)
        setSelectedData( fetchData.data.filter(data => {
          return data.project_name
          .replaceAll(" ","-").toLowerCase().replaceAll("š","s")
          .replaceAll("č","c").replaceAll("ć","c").replaceAll("ž","z")
          .replaceAll("đ","dj") === projectUrl;}))

        console.log(fetchData.data);
        console.log(projectUrl);
        console.log(selectedData);

    }, []);

    
      return (
          <>
            <div className={styles.projectContainer}>
              {
                
                      <Row className={styles.projectDiv} >
                        <Col>
                          <h1>{selectedData}</h1>
                        </Col>
                      </Row>
              }
            </div>
          </>
    );
  };
export default SingleProjectPage;