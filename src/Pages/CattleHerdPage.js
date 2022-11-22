import CattleList from "../Components/CattleList/CattleList";

export default function CattleHerdPage({ cattle, getCattle }) {
    return (
        <CattleList cattle={cattle} getCattle={getCattle} />
    );
}