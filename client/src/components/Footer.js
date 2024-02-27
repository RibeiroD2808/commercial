import { FaDumpster } from "react-icons/fa"
import '../style/footer.css';

function Footer(){

    const displayContent = (
        <div id="footer">
            
            <p>THIS IS A FOOTER</p>
            <div id="footerBottom">
                <p>© 20xx-20xx Name - All Rights Reserved</p>
            </div>
        </div>
    )

    return displayContent;
}

export default Footer;