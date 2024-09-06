export default function TabButton({children, onSelect}){
    return(
       <li onClick={onSelect}><button>{children}</button></li>
    )
}