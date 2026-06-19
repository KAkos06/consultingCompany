import { fetchGlobal } from "@/lib/payload";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const mainMenu = await fetchGlobal('main-menu');
  
  // Format the CMS data to match what NavbarClient expects
  const menuItems = mainMenu?.menuItems || [];
  const ctaButton = mainMenu?.ctaButton || {
    label: "Kapcsolat",
    link: null,
    icon: "Mail"
  };

  const formattedItems = menuItems.map(item => {
    if (item.type === 'mega') {
      return {
        type: 'mega',
        title: item.title,
        items: (item.megaItems || []).map(megaItem => ({
          title: megaItem.title,
          desc: megaItem.description,
          icon: megaItem.icon,
          // CMS relation handling: if page is an object with slug
          to: megaItem.link?.slug ? `/${megaItem.link.slug}` : '#'
        }))
      };
    } else {
      return {
        type: 'link',
        title: item.title,
        to: item.link?.slug ? `/${item.link.slug}` : '#'
      };
    }
  });

  return (
    <NavbarClient 
      items={formattedItems} 
      ctaButton={{
        label: ctaButton.label,
        to: ctaButton.link?.slug ? `/${ctaButton.link.slug}` : '#',
        icon: ctaButton.icon
      }} 
    />
  );
}
