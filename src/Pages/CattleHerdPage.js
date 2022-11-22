import CattleList from "../Components/CattleList/CattleList";

export default function CattleHerdPage({ cattle, getCattle }) {
    const linkToDetails = (element) =>{
        return `./${element}`
    }
    return (
        <CattleList cattle={cattle} getCattle={getCattle} linkToDetails={ linkToDetails }/>
    );
}