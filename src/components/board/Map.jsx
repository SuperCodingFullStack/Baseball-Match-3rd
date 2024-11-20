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
    // 이전 값과 현재 값이 다를 때만 실행
    if (
      prevCenterRef.current.lat !== latitude ||
      prevCenterRef.current.lng !== longitude
    ) {
      setLoading(true); // 로딩 시작

      // 구글 맵 API 요청
      const timer = setTimeout(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
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
              setLoading(false); // 로딩 종료
            } else {
              setLoading(false); // 오류 발생 시 로딩 종료
              console.error("Nearby search failed: ", status);
            }
          });
        } else {
          console.error("Google Maps API not loaded.");
          setLoading(false); // API 로드 안 됐을 때 로딩 종료
        }
      }, 1000); // 1000ms 지연 후 호출 (디바운스 효과)

      return () => clearTimeout(timer); // 클린업
    }
  }, [latitude, longitude]); // 의존성 배열에 latitude와 longitude 추가

  // 주소 검색
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.Geocoder) {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ location: center }, (results, status) => {
        if (status === "OK" && results[0]) {
          setAddress(results[0].formatted_address);
        } else {
          console.error("Geocode failed: ", status);
        }
      });
    } else {
      console.error("Google Maps API not loaded.");
    }
  }, [latitude, longitude]); // `latitude`와 `longitude`가 변경될 때마다 실행

  // 이전 center 값을 갱신
  useEffect(() => {
    prevCenterRef.current = { lat: latitude, lng: longitude };
  }, [latitude, longitude]);

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {/* 로딩 상태 표시 */}
        {loading && <div>Loading...</div>}

        {/* 마커표시확인 */}
        {/* <Marker position={center} /> */}

        {/* 주소 표시 */}
        {address && (
          <div className="address-info">
            <h3>주소: {address}</h3>
          </div>
        )}

        {/* 해당 스타디움 마크 표시 */}
        {!loading &&
          placeInfo.length > 0 &&
          placeInfo.map((place, index) => (
            <Marker key={index} position={place.geometry.location} />
          ))}

        {/* 장소 정보 표시 */}
        {!loading && placeInfo.length > 0 && (
          <div className="place-info">
            {placeInfo.map((place, index) => (
              <div key={index}>
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
  height: "auto",
  minHeight: "150px",
};

export default Map;
