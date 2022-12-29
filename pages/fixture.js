import clientPromise from "../lib/mongodb";

const Fixture = ({ chunks }) => {
  return (
    <div className="w-full container mx-auto">
      <div className="grid justify-center grid-cols-2">
        <div className="1">
          <div className="mt-[30px]">Matchday 1</div>
          {chunks.map((group, index) => (
            <div key={index}>
              <p>
                {group[4].team1} vs {group[4].team2}
              </p>
              <p>
                {group[7].team1} vs {group[7].team2}
              </p>
            </div>
          ))}
        </div>
        <div className="2">
          <div className="mt-[30px]">Matchday 2</div>
          {chunks.map((group, index) => (
            <div key={index}>
              <p>
                {group[1].team1} vs {group[1].team2}
              </p>
              <p>
                {group[11].team1} vs {group[11].team2}
              </p>
            </div>
          ))}
        </div>
        <div className="3">
          <div className="mt-[30px]">Matchday 3</div>
          {chunks.map((group, index) => (
            <div key={index}>
              <p>
                {group[2].team1} vs {group[2].team2}
              </p>
              <p>
                {group[8].team1} vs {group[8].team2}
              </p>
            </div>
          ))}
        </div>
        <div className="4">
          <div className="mt-[30px]">Matchday 4</div>
          {chunks.map((group, index) => (
            <div key={index}>
              <p>
                {group[3].team1} vs {group[3].team2}
              </p>
              <p>
                {group[9].team1} vs {group[9].team2}
              </p>
            </div>
          ))}
        </div>
        <div className="5">
          <div className="mt-[30px]">Matchday 5</div>
          {chunks.map((group, index) => (
            <div key={index}>
              <p>
                {group[0].team1} vs {group[0].team2}
              </p>
              <p>
                {group[10].team1} vs {group[10].team2}
              </p>
            </div>
          ))}
        </div>
        <div className="6">
          <div className="mt-[30px]">Matchday 6</div>
          {chunks.map((group, index) => (
            <div key={index}>
              <p>
                {group[6].team1} vs {group[6].team2}
              </p>
              <p>
                {group[5].team1} vs {group[5].team2}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("fpldata");
    const groups = await db.collection("SortedMatchups").find({}).toArray();

    const flattenedsortedmatchups = groups.flatMap((matchs) => {
      return matchs.group;
    });

    const chunks = [];
    for (let i = 0; i < flattenedsortedmatchups.length; i += 12) {
      chunks.push(flattenedsortedmatchups.slice(i, i + 12));
    }
    return {
      props: { chunks: JSON.parse(JSON.stringify(chunks)) },
    };
  } catch (error) {
    console.error(error);
  }
}

export default Fixture;
