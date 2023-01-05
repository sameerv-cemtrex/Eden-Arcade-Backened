import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";


const Layout = ({ children }) => {
    return(
        <>       
         <div id="wrapper">
           <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                      <Header/>
                       { children }
                    </div>
                <Footer/>
                </div>
         </div>   
        </>
    )
}

export default Layout;