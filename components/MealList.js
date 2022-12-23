import MealItem from "./MealItem";
const MealList = (props) => {
  return (
    <div className="flex flex-wrap">
      {props.teams.map((team) => (
        <MealItem team={team} key={team.id} />
      ))}
    </div>
  );
};
export default MealList;
