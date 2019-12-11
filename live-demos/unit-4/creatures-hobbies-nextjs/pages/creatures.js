import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const hobbyIdToDesc = (hobbyId, hobbiesArr) => {
  return hobbiesArr.filter(hobby => {
    return hobby.id === hobbyId;
  })[0];
};

const Creatures = props => {
  console.log(props);
  return (
    <Layout>
      <title>Creatures</title>

      <h1>Creatures</h1>

      <table id="creatures-table">
        <thead>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Hobby</th>
        </tr>
        </thead>
        <tbody id="creatures-data">
        {props.creatures.map(creature => (
          <tr key={creature.id}>
            <td>{creature.id}</td>
            <td>{creature.name}</td>
            <td>{creature.age}</td>
            <td>
                <ul>
                  {creature.hobbies.map(hobbyId =>
                    <li>
                      <Link href="/h/[id]" as={`/h/${hobbyId}`}>
                        <a target={`_blank`}>{hobbyIdToDesc(hobbyId, props.hobbies).description}</a>
                      </Link>
                    </li>
                  )}
                </ul>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      <style jsx>{`
          .hidden {
            display: none;
          }
      
            table {
            border: 1px solid #333;
            border-collapse: collapse;
          }
      
            thead tr {
            background: #0000FF;
            color: #fff;
          }
            thead tr th {
            border-color: #fff;
          }
      
            tr  {
            border: 1px dotted #999;
            border-collapse: collapse;
          }
      
            table tr:nth-child(even) {
            background: #efefef;
            color: #000;
          }
      
            tr th,
            tr td {
            border-right: 1px solid #999;
            padding: .5rem;
          }
            tr td:last-child {
            border-right: 0;
          }
        `}</style>
    </Layout>
  );
};

Creatures.getInitialProps = async function() {
  const res = await fetch(`http://localhost:3000/data/data.json`);
  return await res.json();
};

export default Creatures;