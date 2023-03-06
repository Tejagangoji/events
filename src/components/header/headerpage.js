import Link from "next/link"

export const Headerpage = () => {
    return (
        <header>
            <div className="logo"><Link href="/">Logo</Link></div>
            <div className="nav">
                <nav>
                    <ul className="navlist">
                        <li className="navitem">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="navitem">
                            <Link href="/events">Events</Link>
                        </li>
                        <li className="navitem">
                            <Link href="/aboutus">About us</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}