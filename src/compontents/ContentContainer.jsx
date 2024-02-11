import { Link } from "react-router-dom";
import styles from "./ContentContainer.module.scss";
import Container from "react-bootstrap/Container";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const ContentContainer = (props) => {
  const [burgerOpen, setBurgerOpen] = useState("");

  const changeBurger = () => {
    if (burgerOpen === "open") setBurgerOpen("");
    else setBurgerOpen("open");
  };

  return (
    <>
      <nav className={styles.contentNavbar}>
        <Container>
          <div className={styles.navbarFlex}>
            <Link
              onClick={() => {
                window.scroll(0, 0);
              }}
              className={styles.navbarLogoHolder}
              to="/"
            >
              <img
                src={process.env.PUBLIC_URL + "/logos/logo_full.svg"}
                alt="logo"
              />
            </Link>
            <ul className={styles.navbarLinkHolder}>
              <li>
                <Link
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                  to="/o-nama"
                >
                  O nama
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                  to="/projekti"
                >
                  Projekti
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                  to="/blog"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                  to="/kontakt"
                >
                  Kontakt
                </Link>
              </li>
            </ul>

            <div className={styles.navbarBurger} onClick={changeBurger}>
              <div
                className={`${styles.menu} ${styles.btn1} ${styles[`${burgerOpen}`]}`}
                data-menu="1"
              >
                <div className={styles["icon-left"]}></div>
                <div className={styles["icon-right"]}></div>
              </div>
            </div>
          </div>
        </Container>
        <div className={`${styles.burgerContent} ${styles[`${burgerOpen}`]}`}>
          <ul>
            <li>
              <Link
                onClick={() => {
                  changeBurger();
                  window.scroll(0, 0);
                }}
                to="/o-nama"
              >
                O nama
              </Link>
            </li>

            <li>
              <Link
                onClick={() => {
                  changeBurger();
                  window.scroll(0, 0);
                }}
                to="/projekti"
              >
                Projekti
              </Link>
            </li>

            <li>
              <Link
                onClick={() => {
                  changeBurger();
                  window.scroll(0, 0);
                }}
                to="/blog"
              >
                Blog
              </Link>
            </li>

            <li>
              <Link
                onClick={changeBurger}
                to="/kontakt"
              >
                Kontakt
              </Link>
            </li>
          </ul>
          <div className={styles.burgerLogo} onClick={changeBurger}>
            <img
              src={`${process.env.PUBLIC_URL}/logos/logo_short.png`}
              alt="logo"
            />
          </div>
        </div>
      </nav>

      <div className={styles.contentBox}>{props.children}</div>

      <footer className={styles.footerContent}>
        <Container>
          <Row>
            <Col md={3} sm={6} xs={12}>
              <Link
                onClick={() => {
                  window.scroll(0, 0);
                }}
                className={styles.footerLogoHolder}
                to="/"
              >
                <img
                  src={process.env.PUBLIC_URL + "/logos/logo_short.png"}
                  alt="logo"
                />
              </Link>
            </Col>

            <Col md={3} sm={6} xs={12}>
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

              <ul>
                <li>
                  Statut - <a target='_blank' rel="noreferrer" href={process.env.PUBLIC_URL+'/downloadable/Statut.pdf'}>PDF</a>
                </li>
              </ul>
            </Col>

            <Col md={3} sm={6} xs={12}>
              <ul>
                <li>Bulevar Vuka Karadžića 108</li>
                <li>32102, Čačak, Srbija</li>
                <li>
                  <Link to='/kontakt'>kontakt@erudita.rs</Link>
                </li>
                <li>
                  <Link to='/kontakt'>+381 69 308 62 07</Link>
                </li>
              </ul>
            </Col>

            <Col md={3} sm={6} xs={12}>
              <h5>Pratite nas i na:</h5>
              <ul>
                <li>
                  <a href="https://www.instagram.com/udruzenje_erudita/">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/erudita.rs">Facebook</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/udruzenje-gradjana-erudita/">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/eruditaaa">Twitter</a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default ContentContainer;
