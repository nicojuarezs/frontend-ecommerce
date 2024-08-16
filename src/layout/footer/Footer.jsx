import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp, faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-row">
                    <div className="footer-links">
                        <h4>Atención al Cliente</h4>
                        <ul>
                            <li className="li-atencion2">Lunes a Viernes de 9 a 20 hs / Sábado de 9 a 17 hs</li>
                            <br />
                            <li><a className="li-text" href="https://gmail.com"><FontAwesomeIcon icon={faEnvelope} /> Contacto</a></li>
                            <li><a className="li-text" href="https://whatsapp.com"><FontAwesomeIcon icon={faWhatsapp} /> Whatsapp</a></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <img className="footer-logo" src="https://png.pngtree.com/png-vector/20230801/ourmid/pngtree-adidas-shoe-with-green-and-red-sneakers-with-sunglasses-vector-png-image_6828988.png" alt="Logo oficial" />
                        <p className="li-atencion">NJ Shoes</p>
                    </div>
                    <div className="social-link">
                        <a href="https://facebook.com"><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="https://instagram.com"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="https://twitter.com"><FontAwesomeIcon icon={faTwitter} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
