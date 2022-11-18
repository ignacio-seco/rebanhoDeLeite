import { useParams } from "react-router-dom"

function AnimalDetail(){
    const { _id } = useParams()
    
    return(
        <div>This is where the animal details will be</div>
    )
}

export default AnimalDetail