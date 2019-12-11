import { useRouter } from 'next/router'
import Layout from '../../components/MyLayout.js'
import fetch from "isomorphic-unfetch";

const getHobby = hobbies => {
  const router = useRouter();
  return hobbies.filter(hobby => hobby.id === parseInt(router.query.id))[0]
};

const Hobby = props => (
  <Layout>
    <title>Hobby</title>
    <h1>Hobby ID: {getHobby(props.hobbies).id}</h1>
    <p><strong>Description:</strong> {getHobby(props.hobbies).description}</p>
  </Layout>
);

Hobby.getInitialProps = async function() {

  const res = await fetch(`http://localhost:3000/data/data.json`);
  const data = await res.json();

  return {
    hobbies: data.hobbies
  };
};

export default Hobby;