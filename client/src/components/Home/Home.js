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
    <Page>
      <Intro>
        <Eyebrow><span /> A place for your little big moments</Eyebrow>
        <Title>Life, collected.</Title>
        <IntroCopy>Save the stories, snapshots, and people you never want to forget.</IntroCopy>
      </Intro>
      <Workspace>
        <Collection>
          <SectionHeading>
            <div>
              <SectionEyebrow>THE ALBUM</SectionEyebrow>
              <h2>Your memories</h2>
            </div>
            <span className="collection-note">A collection of moments</span>
          </SectionHeading>
          <Posts setCurrentId={setCurrentId} />
        </Collection>
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </Workspace>
    </Page>
  );
}
export default Home;

const Page = styled.main`
  width: min(1440px, 100%);
  margin: 0 auto;
  padding: clamp(2.8rem, 7vw, 6.25rem) clamp(1rem, 4vw, 3.5rem) 5rem;
`;
const Intro = styled.header`
  max-width: 780px;
  margin: 0 auto clamp(2.5rem, 5vw, 4.2rem);
  text-align: center;
  animation: rise-in 650ms both;
`;
const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0 0 0.8rem;
  color: var(--green);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  & span { width: 7px; height: 7px; border-radius: 50%; background: var(--coral); }
`;
const Title = styled.h1`
  margin: 0;
  color: var(--ink);
  font-family: "Playfair Display", serif;
  font-size: clamp(3.3rem, 7vw, 5.7rem);
  font-weight: 500;
  line-height: 1.02;
`;
const IntroCopy = styled.p`
  max-width: 440px;
  margin: 1rem auto 0;
  color: #687972;
  font-size: 1.02rem;
  line-height: 1.7;
`;
const Workspace = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 365px);
  align-items: start;
  gap: clamp(1.5rem, 3vw, 3rem);
  @media (max-width: 850px) { grid-template-columns: 1fr; }
`;
const Collection = styled.section`
  min-width: 0;
  @media (max-width: 850px) { display: contents; }
`;
const SectionHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
  margin-bottom: 1.2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(166, 185, 171, 0.65);
  & h2 { margin: 0.3rem 0 0; font-family: "Playfair Display", serif; font-size: 1.65rem; font-weight: 600; }
  & .collection-note { color: var(--muted); font-size: 0.78rem; }
  @media (max-width: 520px) { align-items: start; flex-direction: column; gap: 0.5rem; }
`;
const SectionEyebrow = styled.span`
  color: #8b9a8f;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.13em;
`;
