import './Footer.css';
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import logo from '../assets/logo.svg';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <div className="contact-item">
                        <div className="contact-line">
                            <FaPhoneAlt  />
                            <span>0748 131 343</span>
                        </div>
                        <div className="contact-line">
                            <FaEnvelope  />
                            <a href="mailto:contact@vylumode.com">contact@vylumode.com</a>
                        </div>
                    </div>
                </div>

                <div className="footer-center">
                    <img
                        className="logo"
                        src={logo}
                       alt="logo"
                    />
                </div>


                <div className="footer-right">
                    <a href="https://facebook.com" target="_blank" className="social-icon facebook">
                        <FaFacebookF />
                    </a>
                    <a href="https://instagram.com" target="_blank" className="social-icon instagram">
                        <FaInstagram />
                    </a>
                    <a href="https://tiktok.com" target="_blank" className="social-icon tiktok">
                        <FaTiktok />
                    </a>

            </div>

            </div>

            <div className="footer-bottom">
                <p>© 2025 Vylu Mode. Toate drepturile sunt rezervate</p>
            </div>

        </footer>
    );
}
