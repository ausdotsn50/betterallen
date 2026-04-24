import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Menu,
  ChevronDown,
  CheckCircle2,
  Thermometer,
  Clock,
} from 'lucide-react';
import { mainNavigation } from '../../data/navigation';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import { Text } from '../ui/Text';
import hotlinesData from '../../data/hotlines.json';
import { resolveLucideIcon } from '../../lib/utils';
import { toast } from 'sonner';

const CURRENCIES = ['USD', 'EUR', 'JPY', 'GBP', 'SGD'];
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  JPY: '¥',
  GBP: '£',
  SGD: '$',
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isScrolled, setIsScrolled] = useState(false);
  const [temperature, setTemperature] = useState(() => {
    try {
      return localStorage.getItem('weather_temp') || '28';
    } catch {
      return '28';
    }
  });
  const [lastWeatherFetchTime, setLastWeatherFetchTime] = useState<number>(
    () => {
      try {
        return parseInt(localStorage.getItem('weather_last_fetch') || '0', 10);
      } catch {
        return 0;
      }
    }
  );

  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    () => {
      try {
        const cached = localStorage.getItem('exchange_rates');
        return cached ? JSON.parse(cached) : {};
      } catch {
        return {};
      }
    }
  );
  const [lastRateFetchTime, setLastRateFetchTime] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('exchange_last_fetch') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [currentCurrencyIndex, setCurrentCurrencyIndex] = useState(0);
  const [shouldScrollHotlines, setShouldScrollHotlines] = useState(false);
  const hotlineViewportRef = useRef<HTMLDivElement | null>(null);
  const hotlineMeasureRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const location = useLocation();

  const fallbackCopyText = (text: string): boolean => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch {
      copied = false;
    }

    document.body.removeChild(textArea);
    return copied;
  };

  const copyHotlineNumber = async (number: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(number);
        toast.success('Hotline number copied');
        return;
      }

      if (fallbackCopyText(number)) {
        toast.success('Hotline number copied');
        return;
      }

      toast.error('Could not copy hotline number');
    } catch (error) {
      if (fallbackCopyText(number)) {
        toast.success('Hotline number copied');
      } else {
        console.error('Failed to copy hotline number:', error);
        toast.error('Could not copy hotline number');
      }
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=12.5006&longitude=124.2849&current=temperature_2m'
        );
        const data = await response.json();
        const temp = Math.round(data.current.temperature_2m);
        const tempStr = temp.toString();
        setTemperature(tempStr);
        const now = Date.now();
        setLastWeatherFetchTime(now);
        try {
          localStorage.setItem('weather_temp', tempStr);
          localStorage.setItem('weather_last_fetch', now.toString());
        } catch {
          console.warn('Failed to save to cache');
        }
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };

    // Check if an hour has passed since last fetch
    const now = Date.now();
    if (now - lastWeatherFetchTime >= 3600000) {
      fetchWeather();
    }
  }, [lastWeatherFetchTime]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const ratesObj: Record<string, number> = {};
        for (const currency of CURRENCIES) {
          const response = await fetch(
            `https://api.exchangerate-api.com/v4/latest/${currency}`
          );
          const data = await response.json();
          ratesObj[currency] = data.rates.PHP;
        }
        setExchangeRates(ratesObj);
        const now = Date.now();
        setLastRateFetchTime(now);
        try {
          localStorage.setItem('exchange_rates', JSON.stringify(ratesObj));
          localStorage.setItem('exchange_last_fetch', now.toString());
        } catch {
          console.warn('Failed to save rates to cache');
        }
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
    };

    // Check if a day has passed since last fetch (86400000 ms = 1 day)
    const now = Date.now();
    if (now - lastRateFetchTime >= 86400000) {
      fetchExchangeRates();
    }
  }, [lastRateFetchTime]);

  // Cycle through currencies every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentCurrencyIndex(prev => (prev + 1) % CURRENCIES.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if hotline items overflow the container to decide whether to animate
  useEffect(() => {
    const viewport = hotlineViewportRef.current;
    const measure = hotlineMeasureRef.current;
    if (!viewport || !measure) return;

    const checkOverflow = () => {
      setShouldScrollHotlines(measure.scrollWidth > viewport.clientWidth);
    };

    checkOverflow();

    const rafId = window.requestAnimationFrame(checkOverflow);
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  const isActivePage = (href: string): boolean => {
    return (
      location.pathname === href || location.pathname.startsWith(href + '/')
    );
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveMenu(null);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  const toggleSubmenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar with hotlines */}
      <div
        className={` bg-red-600  transition-all duration-200 overflow-hidden  ${
          isScrolled ? 'max-h-0' : 'max-h-10'
        }`}
      >
        <div className="mx-auto flex justify-end items-center h-10">
          <div className="slideshow w-full" ref={hotlineViewportRef}>
            {/* Measure the width of hotline items for scrolling effect */}
            <div className="slideshow-measure" ref={hotlineMeasureRef}>
              {hotlinesData.hotlines.map(hotline => {
                const Icon = resolveLucideIcon(hotline.icon);
                return (
                  <button
                    type="button"
                    key={`measure-${hotline.slug}`}
                    className="shrink-0 flex text-nowrap text-white text-sm bg-slate-200/20 px-2 py-1 rounded-md items-center gap-1"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{hotline.name}: </span>
                    <span className="font-mono">{hotline.number}</span>
                  </button>
                );
              })}
            </div>
            <div
              className={`slideshow-track ${
                shouldScrollHotlines ? 'is-animated' : 'is-static'
              }`}
            >
              {(shouldScrollHotlines
                ? [...hotlinesData.hotlines, ...hotlinesData.hotlines]
                : hotlinesData.hotlines
              ).map((hotline, idx) => {
                const Icon = resolveLucideIcon(hotline.icon);
                return (
                  <button
                    type="button"
                    key={`${hotline.slug}-${idx}`}
                    onClick={() => copyHotlineNumber(hotline.number)}
                    className="shrink-0 flex text-nowrap text-white text-sm hover:bg-slate-200/50 hover:-translate-y-0.5 transition-all bg-slate-200/20 px-2 py-1 rounded-md items-center gap-1"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{hotline.name}: </span>
                    <span className="font-mono">{hotline.number}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* currency exchange, temp, and date */}
      <div
        className={`bg-primary-800 transition-all duration-300 overflow-hidden ${
          isScrolled ? 'max-h-0' : 'max-h-14'
        }`}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-end text-white text-sm gap-4">
            <div key={currentCurrencyIndex} className="animate-fade-in">
              <Text size="xs">
                {(() => {
                  const currency = CURRENCIES[currentCurrencyIndex];
                  const rate = exchangeRates[currency] || '-';
                  const symbol = CURRENCY_SYMBOLS[currency];
                  return (
                    <>
                      {`${symbol}1 ${currency} = ₱${
                        typeof rate === 'number' ? rate.toFixed(2) : rate
                      }`}
                    </>
                  );
                })()}
              </Text>
            </div>

            <span className="inline text-gray-500 text-xs">|</span>
            <Text size="xs" className="flex items-center gap-1">
              <Thermometer className="h-4 w-4 inline" />{' '}
              <span className="font-extralight text-gray-400">Allen</span>{' '}
              {temperature}°C
            </Text>

            <span className="hidden sm:inline text-gray-500 text-xs">|</span>
            <Text
              size="xs"
              className="items-center gap-1 font-mono hidden sm:inline-flex"
            >
              <Clock className="h-3 w-3 inline" />{' '}
              {(() => {
                const dateStr = currentTime.toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  timeZone: 'Asia/Manila',
                });
                const timeStr = currentTime.toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                  timeZone: 'Asia/Manila',
                });
                return `${dateStr} · ${timeStr} PHT`;
              })()}
            </Text>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <CheckCircle2 className="h-12 w-12 mr-3" />
              {/* <img
                src="/ph-logo.webp"
                alt="Philippines Coat of Arms"
                className="h-12 w-12 mr-3"
              /> */}
              <div>
                <div className="text-black font-bold">
                  {import.meta.env.VITE_GOVERNMENT_NAME}
                </div>
                <div className="text-xs text-gray-800">
                  {t('site_description')}
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8 pr-24">
            {/* Main navigation items with dropdowns */}
            {mainNavigation.map(item => (
              <div key={item.label} className="relative group">
                <a
                  href={item.href}
                  className={`flex items-center font-medium transition-colors ${
                    isActivePage(item.href)
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  {t(`navbar.${item.label.replace(' ', '').toLowerCase()}`)}
                  {item.children && (
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-800 group-hover:text-primary-600 transition-colors" />
                  )}
                </a>
                {item.children && (
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      {item.children.map(child => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                          role="menuitem"
                        >
                          {t(
                            `services.${child.href.split('/').pop()}.category`,
                            { defaultValue: child.label }
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <LanguageSwitcher />

            {/* <Link
              to="/sitemap"
              className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Sitemap
            </Link> */}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-2 pt-2 pb-4 space-y-1 border-t border-gray-200 bg-white">
          {/* Main navigation items with mobile submenu */}
          {mainNavigation.map(item => (
            <div key={item.label}>
              <button
                onClick={() => toggleSubmenu(item.label)}
                className={`w-full flex justify-between items-center px-4 py-2 text-base font-medium transition-colors ${
                  isActivePage(item.href)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary-500'
                }`}
              >
                {t(`navbar.${item.label.toLowerCase()}`)}
                {item.children && (
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      activeMenu === item.label ? 'transform rotate-180' : ''
                    }`}
                  />
                )}
              </button>
              {/* Submenu for mobile */}
              {item.children && activeMenu === item.label && (
                <div className="pl-6 py-2 space-y-1 bg-gray-50">
                  {item.children.map(child => (
                    <Link
                      key={child.label}
                      to={child.href}
                      onClick={closeMenu}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-500"
                    >
                      {t(`services.${child.href.split('/').pop()}.category`, {
                        defaultValue: child.label,
                      })}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="px-4 py-3 border-t border-gray-200">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
