/* import Head from 'next/head'
import styles from '../styles/Home.module.css' */
import clientPromise from "../lib/mongodb";
import Link from "next/link";

const HomePage = ({ teams }) => {
  return (
    <>
      <div className="container w-[500px] mx-auto flex flex-col justify-center items-center mt-[50px] border-2 rounded-[5px]">
        <div className="font-semibold text-2xl pb-2">REGISTERED TEAMS</div>
        {teams.map((team) => (
          <div className="self-start py-2" key={team["Fpl Id"]}>
            <div>
              <span className="font-medium">Team Name: </span>
              {team["Team Name"]}{" "}
            </div>
            <div>
              <span className="font-medium">Manager Name: </span>
              {team["Manager Name"]}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-[20px] text-[blue]">
        <Link href="/reg">Register here</Link>
      </div>
    </>
  );
};

export async function getStaticProps() {
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

  /* return {
    props: {
      mealList: teams.map((team) => ({
        id: team._id.toString(),
        name: team.name,
        image: team.image_path,
        dish: team.dishes,
        chef: team.chef,
      })),
    },
  }; */
}

export default HomePage;
