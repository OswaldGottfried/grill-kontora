import {PHONE, ADDRESS} from 'constants/contacts';

import VK from './img/vk.svg';
import Instagram from './img/instagram.svg';
import s from './footer.module.scss';

const LINKS = [
  {type: 'vk', link: 'https://vk.com/grill_kontora', icon: <VK />},
  {type: 'instagram', link: 'https://www.instagram.com/grill_kontora/', icon: <Instagram />},
];

const Footer = (): JSX.Element => {
  return (
    <footer>
      <div className="inline-flex w-full justify-center items-center sm:flex-col">
        <ul className="flex flex-col mr-10 sm:mr-0">
          <li>{ADDRESS}</li>
          <li>Eжедневно с 10-23:00</li>
        </ul>
        <ul className="flex flex-col">
          <li>
            <a href={`tel:${PHONE.href}`}>{PHONE.value}</a>
          </li>
        </ul>
      </div>
      <ul className={s.links}>
        {LINKS.map(({type, link, icon}) => (
          <li key={link} className={s[type]}>
            <a
              href={link}
              aria-label={`${type} link`}
              className={s.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {icon}
            </a>
          </li>
        ))}
      </ul>
      <p className="w-full text-center text-base leading-8">
        &copy; {new Date().getUTCFullYear()} Гриль контора
      </p>
    </footer>
  );
};

export default Footer;
