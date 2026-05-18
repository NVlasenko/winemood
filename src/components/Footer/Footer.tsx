import './Footer.scss';

const discoveryLinks = [
  'Find Inspiration',
  'Search by Region',
  'Food Pairing Guide',
  'Wine Map Explorer',
  'Vintage Collections',
];

const resourceLinks = [
  'Sommelier Blog',
  'Grape Variety Guides',
  'Tasting Library',
  'Community Picks',
];

const socialLinks = [
  'Instagram',
  'LinkedIn',
  'Twitter / X',
];

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__top">
            <h2 className="footer__logo">
              Vinoteca
            </h2>

            <div className="footer__content">
              <div className="footer__column">
                <h3 className="footer__title">Discovery</h3>

                <div className="footer__links">
                  {discoveryLinks.map(link => (
                    <a key={link} href="/" className="footer__link">
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              <div className="footer__column">
                <h3 className="footer__title">Resources</h3>

                <div className="footer__links">
                  {resourceLinks.map(link => (
                    <a key={link} href="/" className="footer__link">
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              <div className="footer__column">
                <h3 className="footer__title">Social</h3>

                <div className="footer__links">
                  {socialLinks.map(link => (
                    <a key={link} href="/" className="footer__link">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="footer__divider" />

          <div className="footer__bottom">
            <p className="footer__copyright">
              Online wine store | All rights reserved
            </p>

            <p className="footer__privacy">
              Privacy & Cookie Policies
            </p>
          </div>
        </div>
      </div>

      <h2 className="footer__background-text">
        Vinoteca
      </h2>
    </footer>
  );
};