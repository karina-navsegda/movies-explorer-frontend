import Footer from "../footer/Footer";
import Header from "../header/Header";
import AboutMe from "./aboutMe/AboutMe";
import AboutProject from "./aboutProject/AboutProject";
import Portfolio from "./portfolio/Portfolio";
import Promo from "./promo/Promo";
import Techs from "./techs/Techs";

 function Main({isLogged}) {
    return (
        <>
        <Header isLogged={isLogged}/>
        <main className="main">
            <Promo/>
            
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Portfolio/>
        </main>
        <Footer/>
        </>
    )
 }

 export default Main;