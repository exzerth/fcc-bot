import { useRef } from "react";
import { useRouter } from "next/router";
import { User } from "fpl-ts";

const NewTeamForm = () => {
  // use of useRef to capture input value
  const fplIdRef = useRef();

  // use of useRouter from next/router to redirect this page to the Homepage
  const router = useRouter();

  // implementation of newMealHandler function
  const newTeamHandler = async (event) => {
    event.preventDefault();

    const fplId = Number(fplIdRef.current.value);

    const user = new User(fplId);

    const details = await user.getDetails();
    //const history = await user.gwHistory();
    console.log(`Details: ${details}`);
    //console.log(`History: ${history}`);

    // store team data in an object

    const teamData = {
      FplId: details.id,
      ManagerName: `${details.player_first_name} ${details.player_last_name}`,
      TeamName: details.name,
      Played: "",
      Win: "",
      Draw: "",
      Lose: "",
      Points: "",
      TotalScore: "",
    };

    /* const teamData = {
      "Fpl Id": details.id,
      "Manager Name": `${details.player_first_name} ${details.player_last_name}`,
      "Team Name": details.name,
      "Gameweek Points": history[history.length - 1].points,
      "Transfer Cost": history[history.length - 1].event_transfers_cost,
      "Bench Points": history[history.length - 1].points_on_bench,
      "Match Points":
        history[history.length - 1].points -
        history[history.length - 1].event_transfers_cost,
    }; */

    // use of Fetch API to make a request to the new-meal api and get back a response
    const response = await fetch("/api/reg", {
      method: "POST",
      body: JSON.stringify(teamData),
      headers: {
        "content-Type": "application/json",
      },
    });

    // parses JSON response into native JavaScript objects
    const data = await response.json();

    console.log(data);

    // redirects this page to the Homepage
    router.replace("/");
  };

  const INPUT_STYLE =
    "my-2 p-2 border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none w-full h-10 rounded-md";

  return (
    <div className="flex-col px-12 py-12 max-w-3xl mx-auto shadow-xl rounded-2xl">
      <h1 className="font-light text-4xl">Add a new Team </h1>
      <form onSubmit={newTeamHandler}>
        <input
          type="text"
          placeholder="FPL ID"
          required
          ref={fplIdRef}
          className={INPUT_STYLE}
        />

        <button
          type="submit"
          className="bg-yellow-500 text-gray-800 font-medium text-xl inline-flex  w-full items-center px-4 py-4 rounded-xl"
        >
          Add Now
        </button>
      </form>
    </div>
  );
};

export default NewTeamForm;
