import { Link } from "react-router-dom";
import styles from "./AboutUs.module.scss";
import { Col, Row } from "react-bootstrap";

const AboutUs = () => {
return(
   
        <div className={styles.aboutUsPage}>
            <div className={styles.aboutUsHeader}>
                <h1>Ko smo mi?</h1>
                <h5>Udruženje građana „Erudita“ osnovalo je sedam mladih ljudi sa dugogodišnjim iskustvom u omladinskom aktivizmu, neformalnom obrazovanju i vršnjačkoj edukaciji. Primarni cilj udruženja jeste upravo edukacija i podsticanje mladih da kroz neforalno obrazovanje i omladinski aktivizam razvijaju svoje veštine, kompetencije i znanja. Neki od ostalih ciljeva jesu podizanje ekološke svesti, razvijanje demokratskih vrednosti društva, kao i promocija aktivnog građanstva i ljudskih prava, prava mladih, decentralizacije i razvoja lokalne zajednice.</h5>
            </div>
            <Row className={styles.pictureColumn}>
                <Col>
                    <div className={styles.teamPictures}>
                        <Link className={styles.imgLogoHolder} to="./david-sujdovic">
                            <img
                                decoding="async" 
                                width="300" 
                                height="300"
                                src={process.env.PUBLIC_URL + "/imgs/team/David-Sujdovic.jpg"}
                                alt="David Sujdovic"
                                sizes="(max-width: 300px) 100vw, 300px"
                            />  
                            <h3>David Šujdović</h3>
                            <h5>Predsednik upravnog odbora</h5>
                        </Link>
                    </div>
                </Col>
                <Col>
                    <div className={styles.teamPictures}>
                        <img
                            decoding="async" 
                            width="300" 
                            height="300"
                            src={process.env.PUBLIC_URL + "/imgs/team/David-Sujdovic.jpg"}
                            alt="Jovana Jevremović"
                            sizes="(max-width: 300px) 100vw, 300px"
                        /> 
                        <h3>Jovana Jevremović</h3>
                        <h5>Potpredsednica upravnog odbora</h5> 
                    </div>
                </Col>
                <Col>
                    <div className={styles.teamPictures}>
                        <img
                            decoding="async" 
                            width="300" 
                            height="300"
                            src="https://www.erudita.rs/wp-content/uploads/2021/10/Ivana-DJokovic-300x300.jpg"
                            /*src={process.env.PUBLIC_URL + "/imgs/team/David-Sujdovic.jpg"}*/
                            alt="Ivana Đoković"
                            sizes="(max-width: 300px) 100vw, 300px"
                        />
                        <h3>Ivana Đoković</h3>
                        <h5>Programska koordinatorka za omladinsku politiku</h5>   
                    </div>
                </Col>
                <Col>
                    <div className={styles.teamPictures}>
                        <img
                            decoding="async" 
                            width="300" 
                            height="300"
                            src="https://www.erudita.rs/wp-content/uploads/2023/09/Katarina-Babic-300x300.png"
                            /*src={process.env.PUBLIC_URL + "/imgs/team/David-Sujdovic.jpg"}*/
                            alt="Katarina Babić"
                            sizes="(max-width: 300px) 100vw, 300px"
                        />  
                    </div>
                    <h3>Katarina Babić</h3>
                    <h5>Projektna koordinatorka</h5>  
                </Col>
                <Col>
                    <div className={styles.teamPictures}>
                        <img
                            decoding="async" 
                            width="300" 
                            height="300"
                            src="https://www.erudita.rs/wp-content/uploads/2021/10/IMG-20211009-WA0020-300x300.jpg"
                            /*src={process.env.PUBLIC_URL + "/imgs/team/David-Sujdovic.jpg"}*/
                            alt="Milena Vukadinović"
                            sizes="(max-width: 300px) 100vw, 300px"
                        />  
                    </div>
                    <h3>Milena Vukadinović</h3>
                    <h5>Koordinatorka za volontere</h5>  
                </Col>
                <Col>
                    <div className={styles.teamPictures}>
                        <img
                            decoding="async" 
                            width="300" 
                            height="300"
                            src="https://www.erudita.rs/wp-content/uploads/2021/10/Aleksandra-Pandurovic-1-300x300.jpg"
                            /*src={process.env.PUBLIC_URL + "/imgs/team/David-Sujdovic.jpg"}*/
                            alt="Aleksandra Pandurović"
                            sizes="(max-width: 300px) 100vw, 300px"
                        />  
                    </div>
                    <h3>Aleksandra Pandurović</h3>
                    <h5>Koordinatorka za operativne poslove</h5>  
                </Col>
                <Col>
                    <div className={styles.teamPictures}>
                        <img
                            decoding="async" 
                            width="300" 
                            height="300"
                            src="https://www.erudita.rs/wp-content/uploads/2023/09/Elena-Perunicic-300x300.png"
                            /*src={process.env.PUBLIC_URL + "/imgs/team/David-Sujdovic.jpg"}*/
                            alt="Elena Peruničić"
                            sizes="(max-width: 300px) 100vw, 300px"
                        />  
                    </div>
                    <h3>Elena Peruničić</h3>
                    <h5>Projektna asistentkinja</h5>  
                </Col>

                <Col>   
                </Col>
            </Row>
        </div>
   
    );
};
export default AboutUs;