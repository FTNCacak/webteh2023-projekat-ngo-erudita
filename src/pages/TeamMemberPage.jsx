import { useEffect, useState } from "react";
import { nameToPathFormat } from "../helpers/helpFunctions";
import styles from "./TeamMemberPage.module.scss";
import { useParams } from "react-router";
import useHttpGet from "../Hooks/useHttpGet";
import { Col, Container, Row } from "react-bootstrap";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


const TeamMemberPage = () => {
  const fetchData = useHttpGet("team");
  const { projectUrl } = useParams();

  //State koji cuva podatke trenutno izabranog projekta
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    if (fetchData.error === null && fetchData.loading === false)
      //provera da li se naziv projekta podudara sa url
      setSelectedData(
        fetchData.data.filter((data) => {
          return (
            `${nameToPathFormat(data.first_name)}-${nameToPathFormat(
              data.last_name
            )}` === projectUrl
          );
        })[0]
      );
  }, [fetchData]);

  if(selectedData?.content === "place holder")
      {
        selectedData.content= `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
        Commodi id eaque assumenda autem aspernatur saepe fugit perferendis ut culpa ipsam,
         illum unde eius animi reprehenderit sed ab et? Pariatur, aut.`
      }

      if(selectedData?.linkedin === null)
      {
        
      }

  return(
    <Container className="containerFix"> 
      <Row>
        <Col  lg={4} md={12} sm={12} xs={12} className={styles.teamDesc}>
            <div className={styles.teamPicture}>
              <img
                    decoding="async"
                    width="300"
                    height="300"
                    src={process.env.PUBLIC_URL + selectedData?.photo}
                    alt={selectedData?.first_name}
                 />  
              <h4>{selectedData?.first_name} {selectedData?.last_name}</h4>
              <h4>{selectedData?.title}</h4>
            </div>
        </Col>
        <Col lg={5} md={8} sm={12} xs={12} className={styles.teamText}>
                <p>{selectedData?.content}</p>
        </Col>
        <Col lg={3} md={4} sm={12} xs={12} className={styles.teamContact}>
            <div>
                <h5><FontAwesomeIcon icon={faEnvelope}/> {selectedData?.email}</h5>
                <hr />
                <h5>Društvene mreže:</h5>
                <br />
                <ul>
                  {selectedData?.instagram ?
                  <li>
                    <Link target="_blank" rel="noreferrer" to={selectedData?.instagram}>
                      Instagram
                    </Link></li>: null}

                 {selectedData?.facebook ? 
                  <li>
                  <Link target="_blank" rel="noreferrer" to={selectedData?.facebook}>
                    Facebook
                  </Link></li>: null}

                  {selectedData?.linkedin ?
                  <li>
                  <Link target="_blank" rel="noreferrer" to={selectedData?.linkedin}>
                  LinkedIn
                  </Link></li>: null}

                  {selectedData?.twitter ?
                  <li>
                  <Link target="_blank" rel="noreferrer" to={selectedData?.twitter}>
                  Twitter
                  </Link></li>: null}
                </ul>
            </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TeamMemberPage;
