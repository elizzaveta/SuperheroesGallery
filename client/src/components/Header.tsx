import React from 'react';
import styles from '../assets/css/components/Header.module.css'
import commonStyles from '../assets/css/CommonStyles.module.css'
import logoImage from '../assets/images/ninja.png'

function Header() {
    return (
        <header className={commonStyles.container}>
                <div className={styles.titleDiv}>
                    <img src={logoImage} alt='superhero icon' className={styles.icon}/>
                    <h2><a href='/'>Superheroes Gallery</a></h2>
                </div>
        </header>
    );
}

export default Header;