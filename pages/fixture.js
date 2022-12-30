import clientPromise from "../lib/mongodb";

const Fixture = ({ fixtures }) => {
  return (
    <div className="w-full container mx-auto">
      <div className="grid justify-center grid-cols-2">
        <div className="mt-3">
          <div className="text-xl">Matchday One</div>
          {fixtures.map((fixture) => (
            <>
              <div>
                {fixture.matchOne.home.one} vs {fixture.matchOne.away.one}
              </div>
              <div>
                {fixture.matchOne.home.two} vs {fixture.matchOne.away.two}
              </div>
            </>
          ))}
        </div>
        <div className="mt-3">
          <div className="text-xl">Matchday Two</div>
          {fixtures.map((fixture) => (
            <>
              <div>
                {fixture.matchTwo.home.one} vs {fixture.matchTwo.away.one}
              </div>
              <div>
                {fixture.matchTwo.home.two} vs {fixture.matchTwo.away.two}
              </div>
            </>
          ))}
        </div>
        <div className="mt-3">
          <div className="text-xl">Matchday Three</div>
          {fixtures.map((fixture) => (
            <>
              <div>
                {fixture.matchThree.home.one} vs {fixture.matchThree.away.one}
              </div>
              <div>
                {fixture.matchThree.home.two} vs {fixture.matchThree.away.two}
              </div>
            </>
          ))}
        </div>
        <div className="mt-3">
          <div className="text-xl">Matchday Four</div>
          {fixtures.map((fixture) => (
            <>
              <div>
                {fixture.matchFour.home.one} vs {fixture.matchFour.away.one}
              </div>
              <div>
                {fixture.matchFour.home.two} vs {fixture.matchFour.away.two}
              </div>
            </>
          ))}
        </div>
        <div className="mt-3">
          <div className="text-xl">Matchday Five</div>
          {fixtures.map((fixture) => (
            <>
              <div>
                {fixture.matchFive.home.one} vs {fixture.matchFive.away.one}
              </div>
              <div>
                {fixture.matchFive.home.two} vs {fixture.matchFive.away.two}
              </div>
            </>
          ))}
        </div>
        <div className="mt-3">
          <div className="text-xl">Matchday Six</div>
          {fixtures.map((fixture) => (
            <>
              <div>
                {fixture.matchSix.home.one} vs {fixture.matchSix.away.one}
              </div>
              <div>
                {fixture.matchSix.home.two} vs {fixture.matchSix.away.two}
              </div>
            </>
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
    const fixtures = await db.collection("Fixtures").find({}).toArray();

    return {
      props: {
        fixtures: fixtures[0].fixtures,
      },
    };
  } catch (error) {
    console.error(error);
  }
}

export default Fixture;
