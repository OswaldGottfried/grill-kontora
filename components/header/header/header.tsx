import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import {createRef, RefObject, useEffect} from 'react';

import {PHONE} from 'constants/contacts';

import s from './header.module.scss';

const CartIcon = dynamic(() => import('../cartIcon/cartIcon'), {ssr: false});

const Header = (): JSX.Element => {
  const ref: RefObject<HTMLElement> = createRef();

  const stickyHeader = () => {
    if (!ref.current) return;
    const offset = 20;

    if (window.pageYOffset - offset > ref.current.offsetHeight) {
      ref.current.classList.add(s.sticky);
      ref.current.classList.remove(s.static);
    } else {
      ref.current.classList.remove(s.sticky);
      ref.current.classList.add(s.static);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', stickyHeader);
    window.addEventListener('resize', stickyHeader);

    return () => {
      window.removeEventListener('scroll', stickyHeader);
      window.removeEventListener('resize', stickyHeader);
    };
  });

  return (
    <header ref={ref} className="w-full h-20">
      <nav className="h-full pr-20 sm:pr-0 items-center inline-flex w-full justify-between uppercase bg-transparent">
        <ul className="w-full inline-flex items-center justify-between">
          <li className="sm:ml-3 ml-auto mr-auto mb-3">
            <Link href="/">
              <h1 className="flex ml-12 sm:m-0 items-center hover:text-gray-400 transition-colors mt-2 mb-2 cursor-pointer">
                <Image src="/logo.png" alt="Гриль контора" width={205} height={65} />
              </h1>
            </Link>
          </li>
          <li className="ml-4 mr-4">
            <a href={`tel:${PHONE.href}`} aria-label={`заказ по телефону ${PHONE.href}`}>
              <svg
                width="30"
                height="30"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                strokeWidth="2"
              >
                <path d="m28.526 21.741v4.0808a2.7205 2.7205 0 0 1-2.9654 2.7205 26.919 26.919 0 0 1-11.739-4.176 26.525 26.525 0 0 1-8.1615-8.1615 26.919 26.919 0 0 1-4.176-11.793 2.7205 2.7205 0 0 1 2.7069-2.9654h4.0808a2.7205 2.7205 0 0 1 2.7205 2.3396 17.466 17.466 0 0 0 0.95218 3.8223 2.7205 2.7205 0 0 1-0.61212 2.8701l-1.7275 1.7275a21.764 21.764 0 0 0 8.1615 8.1615l1.7275-1.7275a2.7205 2.7205 0 0 1 2.8701-0.61212 17.466 17.466 0 0 0 3.8223 0.95218 2.7205 2.7205 0 0 1 2.3396 2.7613z" />
              </svg>
            </a>
          </li>
          {/* <li className="ml-8 sm:ml-4">
            <CartIcon />
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
