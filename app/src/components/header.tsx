import { ModeToggle } from './mode-toggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import paths from '@/routes/paths';
import { Menu } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

const url = import.meta.env.VITE_JSON_URL;

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const navigateOnClick = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );
  return (
    <header className="flex w-full bg-popover text-foreground items-center border-b border-border">
      <div className="flex justify-between max-w-[90%] w-full items-center mx-auto py-3 px-4">
        <div className="flex gap-4 items-center">
          <img
            src={`${url}/img/aiko.png`}
            alt="logo"
            className="w-12 sm:w-16"
          />
        </div>
        <nav className="hidden md:flex gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="cursor-pointer">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={() => navigateOnClick(paths.home)}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
        </nav>
        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-popover shadow-md">
          <nav className="flex flex-col items-center border">
            <div
              className="text-lg border-b w-full text-center flex justify-center cursor-pointer"
              onClick={() => navigateOnClick(paths.home)}
            >
              Home
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
