import {useState} from 'react';
export default function Player({name,symbol}){
    const [isEditing, setIsEditing] = useState(false);
    function handleEditClick(){
        !isEditing ? setIsEditing(true) : setIsEditing(false);
    }
    return(
        <li>
            <span className="player">
            {!isEditing && <span className="player-name">{name}</span>}
            {isEditing && <input type="text" placeholder='name'/>}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>Edit</button>
        </li>
    )
}