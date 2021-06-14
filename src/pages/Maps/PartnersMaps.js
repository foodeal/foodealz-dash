
import React, { useState , useEffect} from "react";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from "react-google-maps";
import config from '../config.json';



const PartnersMaps = () => {

    const [data, setData] = React.useState({

        error: '',
        data: [],
        temp: [],
        error: null,
        search: null,
        array: [],


      });
      const getData = async () => {
        const url = `${config.URL}/restaurants`;
        await fetch(url)
          .then(res => res.json())
          .then(res => {
            console.log(" le resultat est :",res);

            setData({
              ...data,
              data: res,
              temp: res,
            });

          })

          .catch(error => {
            setData({
              ...data,
              error: 'Error Loading content',
            })
          })
      };

      console.log("les partenaires sont :", data.data);
      useEffect(() => {
        getData()
      }, [])




      const Map = ()  =>{

        const [selectedPartner, setSelectedPartner] = useState(null);

            return (
            <GoogleMap  defaultZoom={10} defaultCenter={{lat:33.886917 , lng:9.537499 }} >
                {data.data.map((partner) => (

                    <Marker key={partner.restaurant_id} position= {{lat:partner.latitude , lng:partner.longitude}} onClick={() => {
                      setSelectedPartner(partner);

                     }} />
                ))}
                {selectedPartner && (
                  <InfoWindow
                  position= {{lat:selectedPartner.latitude , lng:selectedPartner.longitude}}
                  onCloseClick={() => {
                    setSelectedPartner(null);
                  }}
                  >
                    <div> 
                      <h2>{selectedPartner.name}</h2>
                      <p>{selectedPartner.description}</p>
                    </div>
                  </InfoWindow>
                )}
                 </GoogleMap>
            );
        }

        const WrappedMap = withScriptjs(withGoogleMap(Map));

    return(
        <div style={{width: '100vw' , height: '100vh'}}>
            <WrappedMap 
             googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${`AIzaSyD1lN2ArTGGjhdZrR1JI5bXj58JU9V5iUE`}`} 
             loadingElement= {<div style={{height: "100%"}} />}
             containerElement= {<div style={{height: "100%"}} />}
             mapElement= {<div style={{height: "100%"}} />}
            />
        </div>

    )

}

export default PartnersMaps;