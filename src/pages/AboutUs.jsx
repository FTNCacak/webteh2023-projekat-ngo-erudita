import { Link } from "react-router-dom";
import styles from "./AboutUs.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import useHttpGet from "../Hooks/useHttpGet";
import { nameToPathFormat } from "../helpers/helpFunctions";

const AboutUs = () => {
  const fetchData = useHttpGet("team");

  return (
    <Container className={"containerFix"}>
      <div className={styles.aboutUsPage}>
        <div className={styles.aboutUsHeader}>
          <h1>Ko smo mi?</h1>
          <h5>
            Udruženje građana „Erudita“ osnovalo je sedam mladih ljudi sa
            dugogodišnjim iskustvom u omladinskom aktivizmu, neformalnom
            obrazovanju i vršnjačkoj edukaciji. Primarni cilj udruženja jeste
            upravo edukacija i podsticanje mladih da kroz neforalno obrazovanje
            i omladinski aktivizam razvijaju svoje veštine, kompetencije i
            znanja. Neki od ostalih ciljeva jesu podizanje ekološke svesti,
            razvijanje demokratskih vrednosti društva, kao i promocija aktivnog
            građanstva i ljudskih prava, prava mladih, decentralizacije i
            razvoja lokalne zajednice.
          </h5>
        </div>
        <Row className={styles.pictureColumn}>
          {fetchData.data?.map((data) => {
            return (
              <Col lg={3} md={4} key={data.id}>
                <div className={styles.teamPictures}>
                  <Link
                    className={styles.imgLogoHolder}
                    onClick={() => {
                      window.scroll(0, 0);
                    }}
                    to={`/tim/${nameToPathFormat(
                      data.first_name
                    )}-${nameToPathFormat(data.last_name)}`}
                  >
                    <img
                      decoding="async"
                      width="300"
                      height="300"
                      src={process.env.PUBLIC_URL + data.photo}
                      alt={data.first_name}
                    />
                    <h3>
                      {data.first_name} {data.last_name}
                    </h3>
                    <h5>{data.title}</h5>
                  </Link>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </Container>
  );
};
export default AboutUs;
