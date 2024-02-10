import styles from "./SingleProjectPage.module.scss";
import { Col, Container, Fade, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import useHttpGet from "../Hooks/useHttpGet";
import { useEffect, useState } from "react";
//import ImageSlider from "../compontents/ImageSlider";


const SingleProjectPage = () => {
    const fetchData = useHttpGet("projects");
    const {projectUrl} = useParams();

    //const images = ['./imgs/projects/Srusimo-4-zida-photo-1.jpg', './imgs/projects/Srusimo-4-zida-photo-2.jpg', './imgs/projects/Srusimo-4-zida-photo-3.jpg'];

    //State koji cuva podatke trenutno izabranog projekta
    const [selectedData, setSelectedData] = useState();

    useEffect(() => {
        if (fetchData.error === null && fetchData.loading === false)
        //provera da li se naziv projekta podudara sa url
        setSelectedData(fetchData.data.filter(data => {
          return data.project_name
          .replaceAll(" ","-").toLowerCase().replaceAll("š","s")
          .replaceAll("č","c").replaceAll("ć","c").replaceAll("ž","z")
          .replaceAll("đ","dj") === projectUrl;})[0]);
          console.log(selectedData)
    }, [fetchData]);

    
      return (
          <Container className={'containerFix'}>
            <div className={styles.projectContainer}>
              {
                <Row className={styles.projectDiv} >
                  <Col>
                  <img src={process.env.PUBLIC_URL + selectedData?.photo}>
                    </img>
                    <h1>{selectedData?.project_name}</h1>
                    <p>{selectedData?.long_description}</p>   
                  </Col>
                </Row>    
              }
              </div> 

              {/* <div>
                  <ImageSlider images={images} />
              </div>    */}
              
          </Container>
    );
  };
export default SingleProjectPage;