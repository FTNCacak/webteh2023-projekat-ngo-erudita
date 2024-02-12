import { Link } from 'react-router-dom';
import styles from './PageNotFound.module.scss'
import { Container } from 'react-bootstrap';





const PageNotFound = () => {
    return (
        <Container className={'containerFix '+styles.pageNF}>
            <h1>
                <span className={styles.forOufor}>404</span> Stranica nije pronađena!
            </h1>
            <h4>
                Vratite se na početnu stranu klikom <Link to='/'>ovde!</Link>
            </h4>
        </Container>
    );
}


export default PageNotFound;