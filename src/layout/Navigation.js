import Link from "next/link";
import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { navigationToggle } from "../redux/actions/siteSettings";
const Navigation = ({ navigation, navigationToggle }) => {
  const [subMenu, setSubMenu] = useState(null);
  return (
    <Fragment>
      <div
        onClick={() => navigationToggle(false)}
        className={`metaportal_fn_leftnav_closer ${navigation ? "active" : ""}`}
      />
      <div className={`metaportal_fn_leftnav ${navigation ? "active" : ""}`}>
        <a
          href="#"
          className="fn__closer"
          onClick={() => navigationToggle(false)}
        >
          <span />
        </a>
        <div className="navbox">
          <div className="list_holder">
            <ul className="metaportal_fn_items">
              <li>
                <div className="item">
                  <a
                    href="https://sparklesnft.com/"
                    target="_blank"
                    rel="noreferrer"
                  />
                  <span className="icon">
                    <img src="/img/market/sparkles.png" alt="" />
                  </span>
                  <span className="text">Sparkles</span>
                </div>
              </li>
              <li>
                <div className="item">
                  <a
                    href="https://discord.gg/h8ZtAm4JXj"
                    target="_blank"
                    rel="noreferrer"
                  />
                  <span className="icon">
                    <img src="/img/market/discord.png" alt="" />
                  </span>
                  <span className="text">Discord</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="nav_holder">
            {/* For JS */}
            <span className="icon">
              <img src="/svg/down.svg" alt="" className="fn__svg" />
            </span>
            {/* For JS */}
            <ul
              style={{
                transform: `translateX(${subMenu !== null ? "-100" : "0"}%)`,
              }}
            >
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSubMenu("home");
                  }}
                  className={`${subMenu == "home" ? "active" : ""}`}
                >
                  <span className="creative_link">
                    Home
                    <img src="/svg/down.svg" alt="" className="fn__svg" />
                  </span>
                </a>
                <ul className="sub-menu">
                  <li>
                    <a
                      href="#"
                      className="prev"
                      onClick={() => setSubMenu(null)}
                    >
                      <span className="creative_link">
                        <img src="/svg/down.svg" alt="" className="fn__svg" />
                        Home
                      </span>
                    </a>
                  </li>

                  <li>
                    <Link href="/">
                      <a onClick={() => navigationToggle(false)}>
                        <span className="creative_link">#1 3D Carousel</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/nft/1">
                  <a onClick={() => navigationToggle(false)}>
                    <span className="creative_link">Mint Page</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/collection">
                  <a onClick={() => navigationToggle(false)}>
                    <span className="creative_link">Collection</span>
                  </a>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSubMenu("pages");
                  }}
                  className={`${subMenu == "pages" ? "active" : ""}`}
                >
                  <span className="creative_link">
                    Staking
                    <img src="/svg/down.svg" alt="" className="fn__svg" />
                  </span>
                </a>
                <ul className="sub-menu">
                  <li>
                    <a
                      href="#"
                      className="prev"
                      onClick={() => setSubMenu(null)}
                    >
                      <span className="creative_link">
                        <img src="/svg/down.svg" alt="" className="fn__svg" />
                        Staking
                      </span>
                    </a>
                  </li>
                  <li>
                    <Link href="/404">
                      <a onClick={() => navigationToggle(false)}>
                        <span className="creative_link">LilStakes</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/protected">
                      <a onClick={() => navigationToggle(false)}>
                        <span className="creative_link">V1 Stakes</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/no-results">
                      <a onClick={() => navigationToggle(false)}>
                        <span className="creative_link">v2 Stakes</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies">
                      <a onClick={() => navigationToggle(false)}>
                        <span className="creative_link">CASH Brew</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/policy">
                      <a onClick={() => navigationToggle(false)}>
                        <span className="creative_link">COOT Brew</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-conditions">
                      <a onClick={() => navigationToggle(false)}>
                        <span className="creative_link">
                          Terms &amp; Conditions
                        </span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/blog">
                  <a onClick={() => navigationToggle(false)}>
                    <span className="creative_link">Blog</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog-single">
                  <a onClick={() => navigationToggle(false)}>
                    <span className="creative_link">Rankings</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="info_holder">
            <div className="copyright">
              <p>
                Copyright 2024 - Designed &amp; Developed by{" "}
                <a
                  href="https://cootie.finance"
                  target="_blank"
                  rel="noreferrer"
                >
                  The Cooties
                </a>
              </p>
            </div>
            <div className="social_icons">
              <ul>
                <li>
                  <a href="#">
                    <img
                      src="/svg/social/twitter-1.svg"
                      alt=""
                      className="fn__svg"
                    />
                  </a>
                </li>
                
                
                
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  navigation: state.site.navigation,
});
export default connect(mapStateToProps, { navigationToggle })(Navigation);
