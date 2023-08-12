import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getPosts } from "../../actions/posts";
import Posts from "../../components/Posts/Posts";
import Form from "../../components/Form/Form";
function Home() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <ContainerI>
      <ContainerII>
        <GridI>
          <Posts setCurrentId={setCurrentId} />
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </GridI>
      </ContainerII>
    </ContainerI>
  );
}
export default Home;

const ContainerI = styled.div`
  /* padding: 1rem; */
`;
const ContainerII = styled.div``;
const GridI = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;
