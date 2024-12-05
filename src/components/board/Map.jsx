import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// React.memo로 감싸서 불필요한 리렌더링을 방지
const Map = React.memo(({ latitude, longitude }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const center = {
    lat: latitude,
    lng: longitude,
  };

  const [placeInfo, setPlaceInfo] = useState([]);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  // 이전 latitude와 longitude 값을 저장하는 ref
  const prevCenterRef = useRef({ lat: latitude, lng: longitude });

  useEffect(() => {
    if (latitude && longitude) {
      // latitude와 longitude가 존재할 때만 실행
      const fetchData = async () => {
        setLoading(true);

        if (window.google && window.google.maps && window.google.maps.places) {
          try {
            const service = new window.google.maps.places.PlacesService(
              document.createElement("div")
            );
            const request = {
              location: center,
              radius: 500,
              type: "stadium",
            };

            service.nearbySearch(request, (results, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setPlaceInfo(results);
              } else {
                console.error("Nearby search failed: ", status);
              }
            });

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: center }, (results, status) => {
              if (status === "OK" && results[0]) {
                setAddress(results[0].formatted_address);
              } else {
                console.error("Geocode failed: ", status);
              }
            });
          } catch (error) {
            console.error("Error fetching data: ", error);
          } finally {
            setLoading(false);
          }
        } else {
          console.error("Google Maps API not loaded.");
          setLoading(false);
        }
      };

      if (
        prevCenterRef.current.lat !== latitude ||
        prevCenterRef.current.lng !== longitude
      ) {
        fetchData();
      }

      prevCenterRef.current = { lat: latitude, lng: longitude };
    }
  }, [latitude, longitude]); // 의존성 배열에 latitude와 longitude 추가

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {/* 로딩 상태 표시 */}
        {loading && <div>Loading...</div>}

        {/* 주소 표시 */}
        {address && (
          <div className="address-info">
            <h3>주소: {address}</h3>
          </div>
        )}

        {/* 중심 마커 표시 - 추가된 부분 */}
        <Marker position={center} title="Center Point" />

        {/* 해당 스타디움 마크 표시 */}
        {!loading &&
          placeInfo.length > 0 &&
          placeInfo.map((place, index) => (
            <Marker
              key={place.place_id || index}
              position={place.geometry.location}
            />
          ))}

        {/* 장소 정보 표시 */}
        {!loading && placeInfo.length > 0 && (
          <div className="place-info">
            {placeInfo.map((place, index) => (
              <div key={place.place_id || index}>
                <h3>{place.name}</h3>
                <p>{place.vicinity}</p>
              </div>
            ))}
          </div>
        )}
      </GoogleMap>
    </LoadScript>
  );
});

const containerStyle = {
  maxWidth: "1000px",
  width: "100%",
  height: "100%",
  minHeight: "150px",
};

export default Map;
