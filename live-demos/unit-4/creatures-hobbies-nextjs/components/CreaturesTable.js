import Link from "next/link";
import Layout from "./MyLayout";
import CreaturesTableRow from "./CreaturesTableRow";



const CreaturesTable = props => {

    let {
        hobbies = [],
        creatures = []
    } = props;

    return (
        <section>
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
                    {creatures.map(creature => (
                        <CreaturesTableRow creature={creature} hobbies={hobbies} />
                    ))}
                </tbody>
            </table>

            <style global jsx>{`
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
        </section>

    );
};

export default CreaturesTable;