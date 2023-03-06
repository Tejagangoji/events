import { Footerpage } from "../footer/footerpage"
import { Headerpage } from "../header/headerpage"

export const Mainlayout = ({ children }) => {
    return (
        <>
            <Headerpage />
            {children}
            <Footerpage />
        </>
    )
}