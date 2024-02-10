import { useEffect, useState } from "react";
import { nameToPathFormat } from "../helpers/helpFunctions";
import styles from "./TeamMemberPage.module.scss";
import { useParams } from "react-router";
import useHttpGet from "../Hooks/useHttpGet";
import { Container } from "react-bootstrap";

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
  return(
    <Container className="containerFix"> 
        <div>
            aaaaaa
            {selectedData?.first_name}
        </div>
    
    </Container>
  );
};

export default TeamMemberPage;
