import {useMemo} from "react";
import {GoogleMap,useLoadScript,Marker} from "@react-google-maps/api"
const Contact = () => {
  const {isLoaded} = useLoadScript({googleMapsApiKey:process.env.PUBLIC_GOOGLE_API_KEY,
  });
  if(!isLoaded) return <div>Loading ...</div>
  return (
    <body className="contact-page">
      <h3 className="contact-us">get in touch with us</h3>
      <Map/>
      <a  href="mailto:stav3434@gmail.com">
    <button type="button" class="btn btn-dark btn-lg btn-info"> Contact US</button>
        </a>
    </body>
  );
};
function Map(){
  const center =useMemo(()=>({lat:32.32102,lng: 34.85537}),[]);
  return <GoogleMap zoom={10} center ={{lat:32.32102,lng: 34.85537}} mapContainerClassName="map-container">
    <Marker position ={center}/>
  </GoogleMap>
}
export default Contact;
