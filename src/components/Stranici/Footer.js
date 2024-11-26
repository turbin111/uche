import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const defaultState = {
    center: [55.71753, 37.62551],
    zoom: 16,
  };

  return (
    <footer className={styles.footer}>

      <div className={styles.contact}>
        <h2>Contact</h2>
      </div>

      <div className={styles.cards}>
        <div className={styles.info}>

          <div className={styles.cardRow}>
            <div className={styles.phone}>
              <h3 className={styles._7_499}>+7 (499) 350-66-04</h3>
              <p className={styles.phone2}>Phone</p>
            </div>

            <div className={styles.address}>
              <h3 className={styles.dubininskaya}>
                Dubininskaya Ulitsa, 96, Moscow, Russia, 115093
              </h3>
              <p className={styles.address2}>Address</p>
            </div>
          </div>

    
          <div className={styles.cardRow}>
            <div className={styles.workingHours}>
              <h3 className={styles._24_hours}>24 hours a day</h3>
              <p className={styles.workingHours2}>Working Hours</p>
            </div>

            <div className={styles.socials}>
              <h3>Social Media</h3>
              <div className={styles.frame}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>


        <div className={styles.map}>
          <YMaps>
            <Map defaultState={defaultState} width="100%" height="350px">
              <Placemark geometry={defaultState.center} />
            </Map>
          </YMaps>
        </div>
      </div>

      <div className={styles.footerContent}>
        <p>&copy; 2024 Garden Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
