import {PHONE, ADDRESS} from 'contants/contacts';

const Footer = () => {
  return (
    <footer className="inline-flex w-full justify-center items-center">
      <ul className="flex flex-col mr-10">
        <li>{ADDRESS}</li>
        <li>Eжедневно с 10-23:00</li>
      </ul>
      <ul className="flex flex-col">
        <li>
          <a href={PHONE.href}>{PHONE.value}</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
