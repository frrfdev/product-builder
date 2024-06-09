'use client';

import React from 'react';
import Link from 'next/link';
import FireuxLogo from './fireux-logo';
import { usePathname } from 'next/navigation';

type Props = {};

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  const path = usePathname();

  const isActive = path === href;

  return (
    <div className="w-full">
      <Link href={href} legacyBehavior passHref className="w-full">
        <div
          className="py-2 font-bold text-gray-400 px-2 rounded-md hover:bg-frx-blue-800 w-full data-[active='true']:bg-white data-[active='true']:text-frx-red-900 border-r-[0.5rem] border-transparent data-[active='true']:border-frx-red-900 cursor-pointer"
          data-active={isActive}
        >
          {children}
        </div>
      </Link>
    </div>
  );
};

export const Navbar = (props: Props) => {
  return (
    <div className="h-full items-start bg-frx-blue-900/80 rounded-md py-4">
      <div className="flex flex-col w-[200px] items-start gap-2">
        <div className="px-4 shadow-md pb-4 w-full">
          <FireuxLogo></FireuxLogo>
        </div>

        <div className="flex flex-col items-start gap-2 p-2 w-full">
          <NavLink href="/dashboard">Home</NavLink>
          <NavLink href="/category">Categorias</NavLink>
          <NavLink href="/product">Produtos</NavLink>
          <NavLink href="/recipe">Receitas</NavLink>
        </div>
      </div>
    </div>
  );
};
