import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import CreaturesTable from "../components/CreaturesTable";



const Creatures = props => {
  console.log(props);
  return (
    <Layout>
      <title>Creatures</title>

      <h1>Creatures</h1>

      <CreaturesTable creatures={props.creatures} hobbies={props.hobbies} />

    </Layout>
  );
};

Creatures.getInitialProps = async function() {
  const res = await fetch(`http://localhost:3000/data/data.json`);
  return await res.json();
};

export default Creatures;