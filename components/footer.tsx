import {PHONE, ADDRESS} from 'constants/contacts';

const Footer = (): JSX.Element => {
  return (
    <footer className="inline-flex w-full justify-center items-center bg-black text-gray-100 ">
      <ul className="flex flex-col mr-10">
        <li>{ADDRESS}</li>
        <li>Eжедневно с 10-23:00</li>
      </ul>
      <ul className="flex flex-col">
        <li>
          <a href={`tel:${PHONE.href}`}>{PHONE.value}</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
