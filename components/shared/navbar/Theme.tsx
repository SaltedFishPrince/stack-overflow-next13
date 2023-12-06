'use client';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from '@/components/ui/menubar';
import { themes } from '@/constants/themes';
import { useTheme } from '@/context/theme-provider';
import Image from 'next/image';
const SunIcon = () => {
  return (
    <Image
      className='active-theme'
      src='/assets/icons/sun.svg'
      width={20}
      height={20}
      alt='sun' />
  );
};

const MoonIcon = () => {
  return (
    <Image
      className='active-theme'
      src='/assets/icons/moon.svg'
      width={20}
      height={20}
      alt='moon' />
  );
};

const Theme = () => {
  const { themeValue, setThemeMode } = useTheme();
  const { mode, theme } = themeValue;
  return (
    <Menubar className='relative border-none bg-transparent shadow-none'>
      <MenubarMenu>
        <MenubarTrigger
          className='
          focus:bg-light-900 data-[state=open]:bg-light-900
          dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200
          '>
          {theme === 'dark' ? <MoonIcon/> : <SunIcon/>}
        </MenubarTrigger>
        <MenubarContent
          className='absolute right-[0px] mt-3 min-w-[120px]
          rounded border py-2 dark:border-dark-400 dark:bg-dark-300'
        >
          {themes.map(({ label, value, icon }) => {
            return (
              <MenubarItem
                className='flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400'
                key={value}
                onClick={() => {
                  setThemeMode(value);
                }}
              >
                <Image
                  src={icon}
                  alt={label}
                  width={16}
                  height={16}
                  className={`${mode === value && 'active-theme'}`}
                />
                <p
                  className={`body-semibold text-light-500
                  ${mode === value ? 'text-primary-500' : 'text-dark100_light900'}`}>
                  {label}
                </p>
              </MenubarItem>
            );
          })}

        </MenubarContent>
      </MenubarMenu>
    </Menubar>

  );
};

export default Theme;