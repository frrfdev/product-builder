'use client';

import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

type Props = {};

export const Navbar = (props: Props) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/category" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Categorias</NavigationMenuLink>
          </Link>
          <Link href="/product" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Produtos</NavigationMenuLink>
          </Link>
          <Link href="/recipe" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Receitas</NavigationMenuLink>
          </Link>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
