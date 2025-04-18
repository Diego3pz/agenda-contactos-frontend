import deleteBlack from '../../public/delete_black.svg'

export default function DeleteBlack() {
    return (
        <img src={deleteBlack} alt="delete_black" className="w-5 h-5 transition-transform transform scale-100 hover:scale-110"/>
    )
}