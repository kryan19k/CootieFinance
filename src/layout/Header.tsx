import Link from "next/link";
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { navigationToggle } from "../redux/actions/siteSettings";
import { stickyNav } from "../utilits";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = ({ navigationToggle }: PropsFromRedux) => {
  useEffect(() => {
    stickyNav();
  }, []);

  // State to manage which dropdown is visible
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Function to toggle dropdown visibility
  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header id="header">
      <div className="header" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', border: '2px purple', borderRadius: '2px', height: '120px'}}>
        <div className="header_in">
          <div className="trigger_logo">
            <div className="trigger" onClick={() => navigationToggle(true)}>
              <span />
            </div>
            <div className="logo">
              <Link href="/">
                <a>
                  <img src="/img/logo.png" alt="" />
                </a>
              </Link>
            </div>
          </div>
          <div className="nav" style={{ opacity: 1 }}>
            <ul>
              <li>
                <Link href="/nft-single">
                  <a className="creative_link">Mint</a>
                </Link>
              </li>
              <li>
                <Link href="/#about">
                  <a className="creative_link">Rankings</a>
                </Link>
              </li>
              <li>
                <Link href="/#collection">
                  <a className="creative_link">Collection</a>
                </Link>
              </li>
              <li>
                <div className="dropdown">
                  <a onClick={() => toggleDropdown('staking')} className="creative_link">Staking</a>
                  {openDropdown === 'staking' && (
                    <ul className="dropdown-content"style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', border: '2px purple', borderRadius: '2px',}}>
                      <li><Link href="/stake-info"><a>LilStakes</a></Link></li>
                      <li><Link href="/how-to-stake"><a>V1</a></Link></li>
                      <li><Link href="/how-to-stake"><a>V2</a></Link></li>
                    </ul>
                  )}
                </div>
              </li>
              <li>
                <Link href="/#collection">
                  <a className="creative_link">Collection</a>
                </Link>
              </li>
              <li>
                <div className="dropdown">
                  <a onClick={() => toggleDropdown('nftbrews')} className="creative_link">NFTBrews</a>
                  {openDropdown === 'nftbrews' && (
                    <ul className="dropdown-content"style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', border: '2px purple', borderRadius: '2px',}}>
                      <li><Link href="/brews-events"><a>CootBrew</a></Link></li>
                      <li><Link href="/brews-partners"><a>CashBrew</a></Link></li>
                    </ul>
                  )}
                </div>
              </li>
            </ul>
          </div>
          <div className="wallet">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  navigationToggle,
};

// Set up the connector
const connector = connect(mapStateToProps, mapDispatchToProps);

// This will derive the Props type from Redux
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);
