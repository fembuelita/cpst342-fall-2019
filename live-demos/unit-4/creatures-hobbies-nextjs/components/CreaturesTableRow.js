import Link from "next/link";

const hobbyIdToDesc = (hobbyId, hobbiesArr) => {
    return hobbiesArr.filter(hobby => {
        return hobby.id === hobbyId;
    })[0];
};

const CreaturesTableRow = props => {
    let { creature } = props;
    return (
        <tr key={creature.id}>
            <td>{creature.id}</td>
            <td>{creature.name}</td>
            <td>{creature.age}</td>
            <td>
                <ul>
                    {creature.hobbies.map(hobbyId =>
                        <li>
                            <Link href="/h/[id]" as={`/h/${hobbyId}`}>
                                <a>{hobbyIdToDesc(hobbyId, props.hobbies).description}</a>
                            </Link>
                        </li>
                    )}
                </ul>
            </td>
        </tr>
    );
};

export default CreaturesTableRow;