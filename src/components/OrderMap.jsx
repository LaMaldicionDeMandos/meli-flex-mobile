import React from "react";
import {chain, map} from "lodash";

const SHIPPING_MAP_ID = 'shipping_map';

const ORIGIN_MARKER_SVG = {
	path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
	fillColor: "blue",
	fillOpacity: 0.6,
	strokeWeight: 0,
	rotation: 0,
	scale: 0.7,
}
const CHECKED_MARKER_SVG = {
	path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
	fillColor: "blue",
	fillOpacity: 0.6,
	strokeWeight: 0,
	rotation: 0,
	scale: 2,
	anchor: {x: 15, y:30},
};

const OrderMap = ({order}) => {
	const initMap = () => {
		const origin = { lat: order.origin.latitude, lng: order.origin.longitude };
		const destinations = map(order.orders, or => {
			return {lat: or.shippingAddress.latitude, lng: or.shippingAddress.longitude};
		});

		const center = chain([origin]).concat(destinations).reduce((c, pos) => {
			c.lat+= pos.lat;
			c.lng+= pos.lng;
			return c;
		}, {lat: 0, lng: 0}).value();

		center.lat = center.lat/(destinations.length + 1);
		center.lng = center.lng/(destinations.length + 1);

		// The map, centered
		const googleMap = new window.google.maps.Map(
			document.getElementById(SHIPPING_MAP_ID),
			{
				zoom: 11,
				center: center,
				mapTypeControl: false,
			}
		);

		const originMarker = new window.google.maps.Marker({
			position: origin,
			map: googleMap,
			icon: ORIGIN_MARKER_SVG
		});

		const destinationMarkers = map(destinations, dest => new window.google.maps.Marker({
			position: dest,
			map: googleMap,
		}));
		const bounds = new window.google.maps.LatLngBounds();
		chain([origin]).concat(destinations)
			.each(pos => bounds.extend(pos)).value();

		googleMap.fitBounds(bounds);

	}

	if (order) initMap();

	return (
		<div style={{width: '100%', height: '100%'}} id={SHIPPING_MAP_ID}>
		</div>
	);
};

export default OrderMap;
