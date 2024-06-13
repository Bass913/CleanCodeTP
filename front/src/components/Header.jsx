
export default function Header() {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">flashCard</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Mes fiches</a></li>
                    <li><a>Créer une fiche</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Connexion</a>
            </div>
        </div>
    )
}
