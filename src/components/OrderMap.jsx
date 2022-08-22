import React from "react";
import {chain, map, reduce, concat} from "lodash";

const SHIPPING_MAP_ID = 'shipping_map';
const PIN_SVG = "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z";

const ORIGIN_MARKER_SVG = {
	path: PIN_SVG,
	fillColor: "blue",
	fillOpacity: 0.6,
	strokeWeight: 0,
	rotation: 0,
	scale: 0.7,
	labelOrigin: {x: 0, y: -30}
}

const DESTINATION_MARKER_SVG = {
	path: PIN_SVG,
	fillColor: "red",
	fillOpacity: 0.6,
	strokeWeight: 0,
	rotation: 0,
	scale: 0.7,
	labelOrigin: {x: 0, y: -30}
}

const DESTINATION_MARKER_CHECKED_SVG = {
	path: PIN_SVG,
	fillColor: "green",
	fillOpacity: 0.6,
	strokeWeight: 0,
	rotation: 0,
	scale: 0.7,
	labelOrigin: {x: 0, y: -30}
}

const SELF_MARKER_SVG = {
	path: PIN_SVG,
	fillColor: "blue",
	fillOpacity: 0.6,
	strokeWeight: 0,
	rotation: 0,
	scale: 0.7,
	labelOrigin: {x: 0, y: -30}
};

const SELF_MARKER_ICON_LABEL = {
	text: "\ue9f9", // codepoint from https://fonts.google.com/icons
		fontFamily: "Material Icons",
	color: "#ffffff",
	fontSize: "18px",
};

const ORIGIN_MARKER_ICON_LABEL = {
	text: "\uea12", // codepoint from https://fonts.google.com/icons
	fontFamily: "Material Icons",
	color: "#ffffff",
	fontSize: "18px",
};

const DESTINATION_MARKER_ICON_LABEL = {
	text: "\uea44", // codepoint from https://fonts.google.com/icons
	fontFamily: "Material Icons",
	color: "#ffffff",
	fontSize: "18px",
};

const DESTINATION_MARKER_CHECKED_ICON_LABEL = {
	text: "\ue877", // codepoint from https://fonts.google.com/icons
	fontFamily: "Material Icons",
	color: "#ffffff",
	fontSize: "18px",
};

const OrderMap = ({order}) => {
	const getCurrentLocation = () => {
		return new Promise((resolve, reject) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const pos = {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						};
						resolve(pos);
					}
				);
			} else {
				reject();
			}
		});
	}

	const calculateCenter = (positions) => {
		const center = reduce(positions, (c, pos) => {
			c.lat+= pos.lat;
			c.lng+= pos.lng;
			return c;
		}, {lat: 0, lng: 0});

		center.lat = center.lat/(positions.length);
		center.lng = center.lng/(positions.length);

		return center;
	}

	const createSelfMarker = (pos, gmap) => {
		return new window.google.maps.Marker({
			position: pos,
			map: gmap,
			icon: SELF_MARKER_SVG,
			label: SELF_MARKER_ICON_LABEL
		});
	}

	const createOriginMarker = (pos, gmap) => {
		return new window.google.maps.Marker({
			position: pos,
			map: gmap,
			icon: ORIGIN_MARKER_SVG,
			label: ORIGIN_MARKER_ICON_LABEL
		});
	}

	const createDestinationMarker = (pos, gmap) => {
		if (pos.status === 'ready_to_ship') {
			return new window.google.maps.Marker({
				position: pos,
				map: gmap,
				icon: DESTINATION_MARKER_SVG,
				label: DESTINATION_MARKER_ICON_LABEL
			});
		} else {
			return createDestinationCheckedMarker(pos, gmap);
		}

	}

	const createDestinationCheckedMarker = (pos, gmap) => {
		return new window.google.maps.Marker({
			position: pos,
			map: gmap,
			icon: DESTINATION_MARKER_CHECKED_SVG,
			label: DESTINATION_MARKER_CHECKED_ICON_LABEL
		});
	}

	const initMap = async () => {
		const origin = { lat: order.origin.latitude, lng: order.origin.longitude };
		const destinations = map(order.orders, or => {
			return {lat: or.shippingAddress.latitude, lng: or.shippingAddress.longitude, status: or.shippingStatus};
		});


		const center = calculateCenter(concat([origin], destinations));

		// The map, centered
		const gmap = new window.google.maps.Map(
			document.getElementById(SHIPPING_MAP_ID),
			{
				zoom: 11,
				center: center,
				mapTypeControl: false,
			}
		);

		const originMarker = createOriginMarker(origin, gmap);
		const destinationMarkers = map(destinations, (destination) => createDestinationMarker(destination, gmap));

		const bounds = new window.google.maps.LatLngBounds();
		chain([origin]).concat(destinations).each(pos => bounds.extend(pos)).value();

		gmap.fitBounds(bounds);

		const self = await getCurrentLocation();
		const selfMarker = createSelfMarker(self, gmap);
		const bounds2 = new window.google.maps.LatLngBounds();
		chain([self, origin]).concat(destinations).each(pos => bounds2.extend(pos)).value();
		gmap.fitBounds(bounds2);
	}

	if (order) initMap();

	return (
		<div style={{width: '100%', height: '100%'}} id={SHIPPING_MAP_ID}>
		</div>
	);
};

export default OrderMap;
