
import React, { useState, useEffect } from "react";
// import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import L from 'leaflet';
import "leaflet.heat";
// import HeatmapOverlay from 'react-map-gl-heatmap-overlay';





const UsersMap = () => {
	useEffect(() => {
		var map = L.map("map").setView([33.886917, 9.537499], 10);

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
		const addressPoints = [
			            { lat: 33.886917, lng: 9.537499, val: 5 },
			            { lat: 34.886917, lng: 10.537499, val: 2 },
			            { lat: 35.886917, lng: 11.537499, val: 1 },
			            { lat: 36.886917, lng: 12.537499, val: 6 },
			            { lat: 37.886917, lng: 13.537499, val: 3 },
			        ];
		const points = addressPoints
			? addressPoints.map((p) => {
				return [p["lat"], p["lng"]];
			})
			: [];
			console.log(points);

		L.heatLayer(points).addTo(map);
	}, []);

	return <div id="map" style={{ height: "100vh" }}></div>;
}

    // const [data, setData] = React.useState({

    //     error: '',
    //     data: [],
    //     cfg: {
    //         "radius":2,
    //         "maxOpacity": 8,
    //         "scaleRadius": true,
    //         "useLocalExtrema": true,
    //         latField: 'lat',
    //         lngField:'lng',
    //         valueField: "val"
    //     },
    //     layers: [],
    //     baseLayer: "",
    //     heatmapLayer: "",
    //     testData: {
    //         max: 8,
    //         userData: [
    //             { lat: 33.886917, lng: 9.537499, val: 5 },
    //             { lat: 34.886917, lng: 10.537499, val: 2 },
    //             { lat: 35.886917, lng: 11.537499, val: 1 },
    //             { lat: 36.886917, lng: 12.537499, val: 6 },
    //             { lat: 37.886917, lng: 13.537499, val: 3 },
    //         ]

    //     }





    // });

    // const Layer = () => {
    //     setData({
    //         ...data,
    //         baseLayer : L.tileLayer(
    //             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //             attribution: '...',
    //             maxZoom: 18
    //         }
    //         )

    //       })

    // };

    // const heatLayer =() => {

    //     setData({
    //         ...data,
    //         heatmapLayer: new HeatmapOverlay(data.cfg),
    //         layers:[data.baseLayer,heatmapLayer]

    //       });

    // }
    // useEffect(() => {
    //     Layer(),
    //     heatLayer()
    //   }, [])

    //   const test =() => {
    //       data.heatmapLayer.setData(data.testData.userData)
    //   };

    // const Map = () => {

    //     // const [selectedPartner, setSelectedPartner] = useState(null);

    //     return (

    //         <GoogleMap defaultZoom={10} defaultCenter={{ lat: 33.886917, lng: 9.537499 }} layers={data.layers} >
    //             {Layer()}
    //             {test()}
    //             </GoogleMap>


    //     );
    // }

    // const WrappedMap = withScriptjs(withGoogleMap(Map));

    // return (
    //     <div style={{ width: '100vw', height: '100vh' }}>
    //         <WrappedMap
    //             googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${`AIzaSyD1lN2ArTGGjhdZrR1JI5bXj58JU9V5iUE`}`}
    //             loadingElement={<div style={{ height: "100%" }} />}
    //             containerElement={<div style={{ height: "100%" }} />}
    //             mapElement={<div style={{ height: "100%" }} />}
    //         />

    //     </div>

    // )


export default UsersMap;




