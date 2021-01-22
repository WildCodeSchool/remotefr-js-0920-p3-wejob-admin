import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../asset/css/Header.module.css';

function Header() {
  return (
    <header>
      <div>
        <div className={styles.innerWrap}>
          <div className={styles.headerLeftSection}>
            <div className="header-logo-image">
              <a
                href="http://www.we-job.com/"
                className={styles.logoLink}
                rel="home"
              >
                <img
                  width="200"
                  height="120"
                  src="http://www.we-job.com/wp-content/uploads/2017/07/cropped-WeJob_logo-1.png"
                  className={styles.imgLogo}
                  alt="WeJOB"
                />
              </a>
            </div>
          </div>
          <div className={styles.headerRightSection}>
            <nav className={styles.mainNav}>
              <ul className={styles.menu}>
                <li className={styles.menuItem}>
                  <Link to="/ChangePassword" className={styles.link}>
                    Modifier mon mot de passe
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
