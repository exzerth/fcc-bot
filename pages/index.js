/* Homepage
cuyrrently displays the registered teams */
import clientPromise from "../lib/mongodb";
import Link from "next/link";

const HomePage = ({ teams }) => {
  return (
    <>
      <div className="container w-[500px] mx-auto flex flex-col justify-center items-center mt-[50px] border-2 rounded-[5px]">
        <div className="font-semibold text-2xl pb-2">REGISTERED TEAMS</div>
        {teams.map((team) => (
          <div className="self-start py-2" key={team.FplId}>
            <div>
              <span className="font-medium">Team Name: </span>
              {team.TeamName}{" "}
            </div>
            <div>
              <span className="font-medium">Manager Name: </span>
              {team.ManagerName}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-[20px] text-[blue]">
        <Link href="/register">Register here</Link>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("fpldata");

    const teams = await db.collection("Teams").find({}).toArray();

    return {
      props: { teams: JSON.parse(JSON.stringify(teams)) },
    };
  } catch (error) {
    console.error(error);
  }
}

export default HomePage;
