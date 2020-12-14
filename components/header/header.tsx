import Link from 'next/link';
import Image from 'next/image';
import {PHONE} from 'constants/contacts';

import CartIcon from './cartIcon/cartIcon';

const Header = (): JSX.Element => (
  <header className="absolute top-0 w-full">
    <nav className="h-full pr-10 sm:pr-8 items-center inline-flex w-full justify-between uppercase bg-transparent">
      <ul className="w-full inline-flex items-center justify-between">
        <li className="ml-4 mr-auto">
          <Link href="/">
            <h1 className="flex items-center hover:text-gray-400 transition-colors mt-2 mb-2 cursor-pointer">
              <Image src="/logo.png" alt="Гриль контора" width={205} height={65} />
            </h1>
          </Link>
        </li>
        <li className="sm:hidden">
          <a href={`tel:${PHONE.href}`}>{PHONE.value}</a>
        </li>
        <li className="hidden sm:block ml-4">
          <a href={`tel:${PHONE.href}`} aria-label="заказ по телефону">
            <svg
              width="30"
              height="30"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="2"
            >
              <path d="m28.526 21.741v4.0808a2.7205 2.7205 0 0 1-2.9654 2.7205 26.919 26.919 0 0 1-11.739-4.176 26.525 26.525 0 0 1-8.1615-8.1615 26.919 26.919 0 0 1-4.176-11.793 2.7205 2.7205 0 0 1 2.7069-2.9654h4.0808a2.7205 2.7205 0 0 1 2.7205 2.3396 17.466 17.466 0 0 0 0.95218 3.8223 2.7205 2.7205 0 0 1-0.61212 2.8701l-1.7275 1.7275a21.764 21.764 0 0 0 8.1615 8.1615l1.7275-1.7275a2.7205 2.7205 0 0 1 2.8701-0.61212 17.466 17.466 0 0 0 3.8223 0.95218 2.7205 2.7205 0 0 1 2.3396 2.7613z" />
            </svg>
          </a>
        </li>
        <li className="ml-8 sm:ml-4">
          <CartIcon />
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
