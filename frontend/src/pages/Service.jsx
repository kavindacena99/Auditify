import Navbar from "../components/Navbar";
import OurServices from "../components/OurServices";

function Service(){
    return(
        <div>
            <Navbar />
            <section className="py-20 bg-white text-center">
                <OurServices />
            </section>
        </div>
    );
}

export default Service;