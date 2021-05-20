
import React, { useState , useEffect} from "react";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from "react-google-maps";




const UsersMap = () => {

    const [data, setData] = React.useState({

        error: '',
        data: [],
        temp: [],
        error: null,
        search: null,
        array: [],
        userData: [
          {lat:33.886917 , lng: 9.537499, weight: 5},
          {lat:34.886917 , lng: 10.537499, weight: 2},
          {lat:35.886917 , lng: 11.537499, weight: 1},
          {lat:36.886917 , lng: 12.537499, weight: 6},
          {lat:37.886917 , lng: 13.537499, weight: 3},
        ]


      });
      const getData = async () => {
        const url = `https://api.foodealzapi.com/users`;
        await fetch(url)
          .then(res => res.json())
          .then(res => {
            console.log(" le resultat est :",res);

            setData({
              ...data,
              data: res,
              
            });

          })

          .catch(error => {
            setData({
              ...data,
              error: 'Error Loading content',
            })
          })
      };

      console.log("les users sont :", data.data);
      useEffect(() => {
        getData()
      }, [])




      const Map = ()  =>{

        const [selectedUser, setSelectedUser] = useState(null);

            return (
            <GoogleMap  defaultZoom={10} defaultCenter={{lat:33.886917 , lng:9.537499 }} >
                {data.userData.map((user) => (
                    <HeatmapLayer key={user.weight} data= {{lat:user.lat , lng:user.lng}} options={{radius : 20 }} onClick={() => {
                      setSelectedUser(user);
                     }} />
                ))}
               
                 </GoogleMap>
            );
        }

        const WrappedMap = withScriptjs(withGoogleMap(Map));

    return(
        <div style={{width: '100vw' , height: '100vh'}}>
            <WrappedMap 
             googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=visualization,drawing,places&key=${`AIzaSyD1lN2ArTGGjhdZrR1JI5bXj58JU9V5iUE`} `} 
             loadingElement= {<div style={{height: "100%"}} />}
             containerElement= {<div style={{height: "100%"}} />}
             mapElement= {<div style={{height: "100%"}} />}
            />
        </div>

    )

}

export default UsersMap;