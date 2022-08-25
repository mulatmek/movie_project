import {useMemo} from "react";
import {GoogleMap,useLoadScript,Marker} from "@react-google-maps/api"
const Contact = () => {
  const {isLoaded} = useLoadScript({googleMapsApiKey:"AIzaSyBhknKa5zlSLBrrVpiopBytfblhWUGIs50",
  });
  if(!isLoaded) return <div>Loading ...</div>
  return (
    <body className="contact-page">
      <div className="contact-us">
      <h3>get in touch with us</h3>
      <h3 >come visit in our current location </h3>
      </div>
      <Map/>
      <a  href="mailto:stav3434@gmail.com">
    <button type="button" class="btn btn-dark btn-lg btn-info"> Contact US</button>
        </a>
    </body>
  );
};
function Map(){
  const center =useMemo(()=>({lat:31.97086045879205, lng:  34.77252162276107}),[]);
  return <GoogleMap zoom={10} center ={{lat:31.97086045879205,lng: 34.77252162276107}} mapContainerClassName="map-container">
    <Marker position ={center}/>
  </GoogleMap>
}
export default Contact;
