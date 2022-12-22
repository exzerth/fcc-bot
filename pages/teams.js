import clientPromise from "../lib/mongodb";

export default function Movies({ teams }) {
  return (
    <div>
      <h1>Registered Teams</h1>
      {teams.map((team) => (
        <div>
          <h3>{team["Team Name"]}</h3>
          <p>{team["Manager Name"]}</p>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("fpldata");

    const teams = await db.collection("Teams").find({}).toArray();

    return {
      props: { teams: JSON.parse(JSON.stringify(teams)) },
    };
  } catch (e) {
    console.error(e);
  }
}
