import deleteWhite from '../../public/delete_white.svg'

export default function DeleteWhite() {
    return (
        <img src={deleteWhite} alt="delete_white" className="w-5 h-5 transition-transform transform scale-100 hover:scale-110"/>
    )
}