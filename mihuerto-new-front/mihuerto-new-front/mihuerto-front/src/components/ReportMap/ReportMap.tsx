"use client";

import React, { memo, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { LatLngBoundsExpression } from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((module) => module.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((module) => module.TileLayer),
  { ssr: false },
);

const SVGOverlay = dynamic(
  () => import("react-leaflet").then((module) => module.SVGOverlay),
  { ssr: false },
);

const AlwaysOpenPopup = ({ children, position }: any) => {
  const map = useMap();

  useEffect(() => {
    const marker = L.marker(position).addTo(map);
    marker.bindPopup(children).openPopup();

    return () => {
      map.removeLayer(marker);
    };
  }, [map, position, children]);

  return null;
};

const ReportMap = memo(() => {
  const [coordinates, setCoordinates] = useState<any>(null);

  useEffect(() => {
    const fetchCoordinates = () => {
      const coords = { lat: -0.997855, lng: -80.766882 };
      setCoordinates(coords);
    };

    fetchCoordinates();

    return () => {};
  }, []);

  const initMarker = (ref: any) => {
    if (ref && ref.leafletElement) {
      ref.leafletElement.openPopup();
    }
  };

  const bounds = useState([-1.022355, -80.956629]);

  const bounds2 = useState<LatLngBoundsExpression>([
    [-0.949763, -80.893061],
    [-0.979859, -80.85483],
  ]);

  const bounds3 = useState<LatLngBoundsExpression>([
    [-0.919147, -80.836147],
    [-0.944747, -80.801721],
  ]);

  const bounds4 = useState<LatLngBoundsExpression>([
    [-1.022355, -80.956629],
    [-1.055171, -80.901858],
  ]);

  const bounds5 = useState<LatLngBoundsExpression>([
    [-1.022355, -80.956629],
    [-1.055171, -80.901858],
  ]);

  const bounds6 = useState<LatLngBoundsExpression>([
    [-1.022355, -80.956629],
    [-1.055171, -80.901858],
  ]);

  const bounds7 = useState<LatLngBoundsExpression>([
    [-1.022355, -80.956629],
    [-1.055171, -80.901858],
  ]);

  if (!coordinates) {
    return <div></div>;
  }

  return (
    // @ts-ignore
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: "600px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/*<AlwaysOpenPopup position={[coordinates.lat, coordinates.lng]}>*/}
      {/*  <div>My Popup Content</div>*/}
      {/*</AlwaysOpenPopup>*/}
      <Marker
        // @ts-ignore
        ref={initMarker}
        position={[coordinates.lat, coordinates.lng]}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <SVGOverlay
        attributes={{ stroke: "red" }}
        // @ts-ignore
        bounds={bounds}
      >
        <rect x="0" y="0" width="100%" height="100%" fill="blue" />
        <text x="5%" y="50%" stroke="white">
          San Lorenzo <br />
          (10 Cultivos)
        </text>
      </SVGOverlay>

      <SVGOverlay
        attributes={{ stroke: "red" }}
        // @ts-ignore
        bounds={bounds2}
      >
        <rect x="0" y="0" width="100%" height="100%" fill="blue" />
        <text x="5%" y="50%" stroke="white">
          Santa Marianita
        </text>
        <text x="5%" y="70%" stroke="white">
          (10 Cultivos)
        </text>
      </SVGOverlay>

      <SVGOverlay
        attributes={{ stroke: "red" }}
        // @ts-ignore
        bounds={bounds3}
      >
        <rect x="0" y="0" width="100%" height="100%" fill="blue" />
        <text x="5%" y="50%" stroke="white">
          San Mateo
        </text>
        <text x="5%" y="70%" stroke="white">
          (10 Cultivos)
        </text>
      </SVGOverlay>

      <SVGOverlay
        attributes={{ stroke: "red" }}
        // @ts-ignore
        bounds={bounds}
      >
        <rect x="0" y="0" width="100%" height="100%" fill="blue" />
        <text x="5%" y="50%" stroke="white">
          San Lorenzo <br />
          (10 Cultivos)
        </text>
      </SVGOverlay>
      <SVGOverlay
        attributes={{ stroke: "red" }}
        // @ts-ignore
        bounds={bounds}
      >
        <rect x="0" y="0" width="100%" height="100%" fill="blue" />
        <text x="5%" y="50%" stroke="white">
          San Lorenzo <br />
          (10 Cultivos)
        </text>
      </SVGOverlay>
      <SVGOverlay
        attributes={{ stroke: "red" }}
        // @ts-ignore
        bounds={bounds}
      >
        <rect x="0" y="0" width="100%" height="100%" fill="blue" />
        <text x="5%" y="50%" stroke="white">
          San Lorenzo <br />
          (10 Cultivos)
        </text>
      </SVGOverlay>
      <SVGOverlay
        attributes={{ stroke: "red" }}
        // @ts-ignore
        bounds={bounds}
      >
        <rect x="0" y="0" width="100%" height="100%" fill="blue" />
        <text x="5%" y="50%" stroke="white">
          San Lorenzo <br />
          (10 Cultivos)
        </text>
      </SVGOverlay>
    </MapContainer>
  );
});

export default ReportMap;
