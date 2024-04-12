import dynamic from 'next/dynamic';
import Head from "next/head";
import { Fragment, useEffect, ReactNode } from "react";
import ImageView from "../components/popup/ImageView";
import VideoPopup from "../components/popup/VideoPopup";
import { dataBgImg, holdSection, imgToSVG } from "../utilits";
import Footer from "./Footer";
import Header from "./Header";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import PreLoader from "./PreLoader";
import ScrollTop from "./ScrollTop";
import Searchbox from "./Searchbox";
import SearchButton from "./SearchButton";
import Social from "./Social";
import WalletPopUp from "./WalletPopUp";


interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
}
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false, // Disable server-side rendering
});


const Layout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
  useEffect(() => {
    holdSection();
    imgToSVG();
    dataBgImg();
  }, []);
  return (
    <Fragment>
      <Head>
        <title>LilCooties | {pageTitle}</title>
      </Head>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <Spline scene="https://prod.spline.design/iGBbknGNcK4TPwua/scene.splinecode" />
      </div>
      <ImageView />
      <VideoPopup />
      <PreLoader />
      {/* !Preloader */}
      {/* Left Navigation */}
      <Navigation />
      {/* !Left Navigation */}
      {/* Searchbox Popup */}
      <Searchbox />
      {/* !Searchbox Popup */}
      {/* Wallet Popup */}
     
      {/* !Wallet Popup */}
      {/* Main */}
      <div className="metaportal_fn_main">
        {/* Mobile Navigation */}
        <MobileNavigation />
        {/* !Mobile Navigation */}
        {/* Header */}
        <Header />
        {/* !Header */}
        {/* Content */}
        <div className="metaportal_fn_content">
          {children}
          {/* Footer */}
          <Footer />
          {/* !Footer */}
        </div>
        {/* !Content */}
        {/* Social */}
        <Social />
        {/* !Social */}
        {/* Totop */}
        <ScrollTop />
        {/* /Totop */}
        {/* Search Button */}
        <SearchButton />
        {/* !Search Button */}
      </div>
    </Fragment>
  );
};
export default Layout;
