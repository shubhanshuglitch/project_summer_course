import './Footer.css'

export default function Footer() {
    return (
        <footer className="pv-footer">
            <div className="footer-top">
                <div className="footer-logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg" alt="Prime Video" />
                </div>
                <div className="footer-social">
                    <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
                    <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg></a>
                    <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /></svg></a>
                </div>
            </div>
            <div className="footer-links">
                <div className="footer-column">
                    <h3>Get to Know Us</h3>
                    <ul><li><a href="#">About Prime Video</a></li><li><a href="#">Channels</a></li><li><a href="#">Advertising</a></li><li><a href="#">Devices</a></li></ul>
                </div>
                <div className="footer-column">
                    <h3>Make Money</h3>
                    <ul><li><a href="#">Prime Video Direct</a></li><li><a href="#">Creator Hub</a></li><li><a href="#">Affiliate Program</a></li><li><a href="#">Advertise</a></li></ul>
                </div>
                <div className="footer-column">
                    <h3>Let Us Help</h3>
                    <ul><li><a href="#">Your Account</a></li><li><a href="#">Your Watchlist</a></li><li><a href="#">Recommendations</a></li><li><a href="#">Help Center</a></li></ul>
                </div>
                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <ul><li><a href="#">Parental Controls</a></li><li><a href="#">Supported Devices</a></li><li><a href="#">Activate Device</a></li><li><a href="#">Gift Cards</a></li></ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 1996–2025 Amazon.com, Inc. or its affiliates</p>
                <div className="footer-bottom-links"><a href="#">Terms of Use</a><a href="#">Privacy</a><a href="#">Cookies</a></div>
            </div>
        </footer>
    )
}
