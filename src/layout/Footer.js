import Link from "next/link";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer">
          <div className="left_part">
            <p>
              Copyright 2024 — Developed by{" "}
              <a
                href="https://cootie.finance"
                target="_blank"
                rel="noreferrer"
              >
                The Cooties
              </a>
            </p>
          </div>
          <div className="right_part">
            <ul>
              <li>
                <Link href="/policy">
                  <a className="creative_link">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/cookies">
                  <a className="creative_link">Cookies</a>
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions">
                  <a className="creative_link">Terms &amp; Conditions</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
