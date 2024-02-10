import { Link } from "react-router-dom";
import styles from "./BlogPage.module.scss";
import { Col, Row, Container } from "react-bootstrap";
import useHttpGet from "../Hooks/useHttpGet";
import { nameToPathFormat } from "../helpers/helpFunctions";

const BlogPage = () => {
  const fetchData = useHttpGet("blogs");

  return (
    <Container className={"containerFix"}>
      <h1 className={styles.blogHeading}>BLOG</h1>
      <Row className={styles.blogColumn}>
        {fetchData.data?.toReversed().map((data) => {
          return (
            <Col
              lg={4}
              md={12}
              sm={12}
              xs={12}
              key={data.id}
              className={styles.blogContent}
            >
              <Link
                className={styles.blogLogoHolder}
                onClick={() => {
                  window.scroll(0, 0);
                }}
                to={`/blog/${nameToPathFormat(data.title)}`}
              >
                  <img
                    decoding="async"
                    src={process.env.PUBLIC_URL + data.photo}
                    alt={data.title}
                  />
                <h3>{data.title}</h3>
                <p>{data.short_description}</p>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
export default BlogPage;
