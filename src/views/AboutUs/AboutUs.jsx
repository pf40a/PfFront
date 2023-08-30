import styles from './AboutUs.module.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapIcon from '/logo.jpeg';

const AboutUs = () => {
  const latitude = 7.098899;
  const longitude = -73.132826;

  const position = [latitude, longitude];
  const markerIcon = L.icon({
    iconUrl: mapIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className={styles['about-us']}>
      <h1 className={styles['heading']}>About Us - Oasis Hotel</h1>
      <p className={styles['text']}>Welcome to Oasis Hotel! We are dedicated to providing a memorable and relaxing experience for our guests.</p>
      <p className={styles['text']}>Our Mission:</p>
      <ul className={styles['mission-list']}>
        <li className={styles['mission-item']}>Deliver exceptional hospitality and service</li>
        <li className={styles['mission-item']}>Offer luxurious and comfortable accommodations</li>
        <li className={styles['mission-item']}>Create an oasis of tranquility for our guests</li>
      </ul>
      <p className={styles['text']}>Whether you are traveling for business or leisure, Oasis Hotel is the perfect destination for your stay.</p>
      <p className={styles['text']}>Contact us for reservations and inquiries. We look forward to serving you!</p>

      <div className={styles['map-container']}>
        <MapContainer center={position} zoom={13} style={{ width: '100%', height: '400px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={markerIcon} />
        </MapContainer>
      </div>
    </div>
  );
};

export default AboutUs;
