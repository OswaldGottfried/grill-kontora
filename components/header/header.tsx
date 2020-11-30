import Link from 'next/link';
import Image from 'next/image';
import {PHONE} from 'constants/contacts';
import DarkModeToggle from './darkModeToggle/darkModeToggle';

const Header = (): JSX.Element => (
  <header>
    <nav className="h-full pr-10 items-center inline-flex w-full justify-between uppercase  text-gray-100 bg-black">
      <DarkModeToggle />
      <ul className="w-full inline-flex items-center justify-between">
        <li className="ml-auto mr-auto">
          <Link href="/">
            <h1 className="flex items-center hover:text-gray-400 transition-colors mt-2 mb-2 cursor-pointer">
              <Image src="/logo.png" alt="Гриль контора" width={205} height={65} />
            </h1>
          </Link>
        </li>
        <li className="sm:hidden">
          <a href={`tel:${PHONE.href}`}>{PHONE.value}</a>
        </li>
        <li className="ml-8">
          <Link href="/cart">Cart link</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
