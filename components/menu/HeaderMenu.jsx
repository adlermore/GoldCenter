import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import { HeaderLinks } from '@/utils/routes';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import IconArrowBottom from '@/public/icons/IconArrowBottom';
import IconArrowRight from '@/public/icons/IconArrowRight';

function HeaderMenu({ isScrolled }) {

  const t = useTranslations();

  const pathname = usePathname();
  const [activeMainLink, setActiveMainLink] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeSubSubmenu, setActiveSubSubmenu] = useState(null);

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const handleMainLinkHover = (index) => {
    if (!isMobile) {
      clearTimeout(timeoutRef.current);
      setActiveMainLink(index);
    }
  };

  const handleMenuLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setActiveMainLink(null);
      }, 300);
    }
  };

  // Mobile Click Handlers
  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
    setActiveSubmenu(openSubmenu === index ? null : index);
    setActiveSubSubmenu(null); // Reset sub-submenu when submenu is toggled
  };

  const toggleSubSubmenu = (index) => {
    setActiveSubSubmenu(activeSubSubmenu === index ? null : index);
  };

  const isSubSublinkActive = (sublink) => {
    if (!sublink.subSublinks) return false;
    return sublink.subSublinks.some((subSublink) => pathname === subSublink.href);
  };

  return (
    <div className={`${isScrolled && 'isScrolled'} mobile_container font-light relative flex items-center gap-45 `}>
      {HeaderLinks.map((link, i) => (
        <div
          key={i}
          className={`relative main_link ${activeSubmenu === i ? 'active_submenu' : ''}`}
          onMouseEnter={!isMobile ? () => handleMainLinkHover(i) : undefined}
          onMouseLeave={!isMobile ? handleMenuLeave : undefined}
        >
          <Link
            href={`/categoryInner?category=${link.to}`}
            className={`${pathname === `/categoryInner?category=${link.to}` && ' pointer-events-none'} tablet:w-[calc(100%-16px)] laptop:text-[16px] flex justify-center items-center gap-[20px] laptop:text-center laptop:w-[350px] whitespace-nowrap laptop:font-bold laptop:text-black laptopHorizontal:text-sm text-white text-base `}
            onClick={(e) => {
              if (isMobile && link.subMenu) {
                e.preventDefault();
                toggleSubmenu(i);
              }
            }}

          >
            {t(link.title)}
            <span className='laptop:block hidden'>
              <IconArrowRight />
            </span>
          </Link>
          {isMobile || (activeMainLink === i && !isMobile) || (openSubmenu === i && isMobile) ? (
            <div className="sublinks">
              {link.subMenu && link.subMenu.map((sublink, j) => (
                <div
                  key={j}
                  className={`sublink-container ${isSubSublinkActive(sublink) || activeSubSubmenu === j ? 'active' : ''}`}

                >
                  <Link href={`/productListing?subcategory=${sublink.to.split('/')[1]}&type=${sublink.to.split('/')[0]}`} className="sublink"
                    onClick={(e) => {
                      if (isMobile && sublink.submenu) {
                        e.preventDefault();
                        toggleSubSubmenu(j);
                      }
                    }}
                  >
                    {t(sublink.title)}
                  </Link>
                  {sublink.submenu && (
                    <div className="sub-sublinks">
                      {sublink.submenu.map((subSublink, k) => (
                        <Link
                          key={k}
                          // href={subSublink.to}
                          href={`/productListing?subcategory=${subSublink.to.split('/')[1]}&type=${subSublink.to.split('/')[0]}`}
                          className="sub-sublink"
                        >
                          {t(subSublink.title)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}

    </div>
  );
}

export default HeaderMenu;
