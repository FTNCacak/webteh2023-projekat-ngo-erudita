import styles from './ContactPage.module.scss';
import { Col, Row } from "react-bootstrap";
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ContactPage = () => {
    
    return(
        <>  
            <div className={styles.contactHeader}>
                <h1>KONTAKT</h1>
                <h5>Pišite nam ili nas posetite &#128515;</h5>
            </div>
            <div className={styles.contactLinks}> 
                    <ul>
                        <li>
                        <a href="https://www.instagram.com/udruzenje_erudita/">Instagram
                        </a>
                        </li>
                        <li>
                        <a href="https://www.facebook.com/erudita.rs">Facebook</a>
                        </li>
                        <li>
                        <a href="https://www.linkedin.com/company/udruzenje-gradjana-erudita/">LinkedIn</a>
                        </li>
                        <li>
                        <a href="https://twitter.com/eruditaaa">Twitter</a>
                        </li>
                    </ul>
            </div>
            <hr />
            <br />

        <div className={styles.contactContent}>
            <Row>
                <Col md={3} sm={6} xs={12} >
                    <ul>
                        <h3>Kontakt</h3>
                        <li>Bulevar Vuka Karadžića 108</li>
                        <li>32102, Čačak</li>
                        <li>Srbija</li>
                        <li>
                        <li className={styles.boldCharacters}>&#9993; kontakt@erudita.rs</li>
                        </li>
                        <li>
                        <li>&#9742; +381 69 308 62 07</li>
                        </li>
                    </ul>
                
                    <ul>
                        <li>
                        <strong>PIB:</strong> 112421762
                        </li>
                        <li>
                        <strong>MB:</strong> 28320876
                        </li>
                        <li>
                        <strong>TR:</strong> 340-11029152-47
                        </li>
                    </ul>

                    <h5>Društvene mreže:</h5>
                    <div className={styles.drustveneMreze}>
                        <a href="https://www.instagram.com/udruzenje_erudita/">
                            <div className={styles.instagram}>
                                <div className={styles.logo}>
                                    <div className={styles.logo_border}></div>
                                    <div className={styles.logo_circle}></div>
                                    <div className={styles.logo_light}></div>
                                </div>
                            </div>
                        </a>
                    </div>

                </Col>
                <Col>
                <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2875.714269350735!2d20.325463412490823!3d43.88247133745033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47577225e33a9a3f%3A0xa935cea18898d725!2z0JHRg9C70LXQstCw0YAg0JLRg9C60LAg0JrQsNGA0LDRn9C40ZvQsCAxMDgsINCn0LDRh9Cw0Lo!5e0!3m2!1ssr!2srs!4v1707321724222!5m2!1ssr!2srs'
                    className='w-100'
                    height='500'
                    loading='lazy'>
                    </iframe>
                </Col>
            </Row>
            </div>
            <br />
        </>
    );
}


export default ContactPage;