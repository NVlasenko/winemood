import {
  discoveryLinks,
  resourceLinks,
  socialLinks,
} from "../../data/footerLinks";
import "./Footer.scss";

const footerColumns = [
  {
    title: "Discovery",
    links: discoveryLinks,
  },
  {
    title: "Resources",
    links: resourceLinks,
  },
  {
    title: "Social",
    links: socialLinks,
  },
];

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__top">
            <h2 className="footer__logo">Vinoteca</h2>

            <div className="footer__content">
              {footerColumns.map((column) => (
                <div className="footer__column" key={column.title}>
                  <h3 className="footer__title">{column.title}</h3>

                  <div className="footer__links">
                    {column.links.map((link) => (
                      <a key={link} href="/" className="footer__link">
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="footer__divider" />

          <div className="footer__bottom">
            <p className="footer__copyright">
              Online wine store | All rights reserved
            </p>

            <a href="/" className="footer__privacy">
              Privacy & Cookie Policies
            </a>
          </div>
        </div>
      </div>

      <div className="footer__background-wrap">
      <h2 className="footer__background-text" aria-hidden="true">
        Vinoteca
      </h2>
    </div>
    </footer>
  );
};
