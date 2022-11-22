import CattleList from "../Components/CattleList/CattleList";

export default function CattleShedPage({ cattle, getCattle }) {
    const cowFilter = cow => {
        return cow.noCurral === true;
    }
    
    return (
        <CattleList cattle={cattle} getCattle={getCattle} cowFilterFn={ cowFilter } />
    );
}