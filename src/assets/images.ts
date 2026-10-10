import bootaFront from './images/boota_lehenga_front_1790759695046.jpg';
import bootaBack from './images/boota_lehenga_back_1790759709314.jpg';
import bootaDetail from './images/boota_lehenga_detail_1790759719634.jpg';
import bootaFlatlay from './images/boota_lehenga_flatlay_1790759731593.jpg';

// Hero images (Desktop + separate 4:5 Mobile framing)
import heroFestiveDesktop from './images/boota_hero_festive_1790870894193.jpg';
import heroFestiveMobile from './images/hero_festive_mob_1790870909729.jpg';
import heroLuxeDesktop from './images/luxe_hero_desktop_1790873147833.jpg';
import heroLuxeMobile from './images/luxe_hero_mobile_1790873173856.jpg';
import heroDesiDesktop from './images/desi_hero_desktop_1790873160673.jpg';
import heroDesiMobile from './images/desi_hero_mobile_1790873185863.jpg';

// Shop by Age
import ageBaby from './images/age_baby_boota_1790870978164.jpg';
import ageToddler from './images/age_toddler_boota_1790870991601.jpg';
import ageKids from './images/age_kids_boota_1790871004337.jpg';

// Brand Story
import brandStory from './images/brand_story_boota_1790871016915.jpg';

// Brand Logo & Cart Icon
import bootaLogo from './images/boota_logo_maroon.png';
import bootaLogoWhite from './images/boota_logo_white.png';
import cartIconImg from './images/cart icon.jpg';

// Products
import productSharara from './images/product_sharara_1790871036019.jpg';
import productBandhani from './images/product_bandhani_1790871056729.jpg';
import productPattu from './images/product_pattu_1790871069515.jpg';

export { bootaLogo, bootaLogoWhite, cartIconImg };

export const productImages = {
  front: bootaFront,
  back: bootaBack,
  detail: bootaDetail,
  flatlay: bootaFlatlay,
  sharara: productSharara,
  bandhani: productBandhani,
  pattu: productPattu,
};

export const heroSlidesData = [
  {
    id: 'festive-royale',
    desktopImg: heroFestiveDesktop,
    mobileImg: heroFestiveMobile,
    tag: 'Festive Heritage Edition',
    headline: 'Rooted in Tradition, Tailored for Wonder',
    subline: 'Hand-finished pure silk lehengas with soft mulmul linings, crafted for pure celebration.',
    cta: 'Explore The Festive Edit',
    category: 'GIRL',
  },
  {
    id: 'luxe-sibling',
    desktopImg: heroLuxeDesktop,
    mobileImg: heroLuxeMobile,
    tag: 'Boota Luxe Wedding Edit',
    headline: 'The Grand Occasion Edit',
    subline: 'Festive collection',
    cta: 'Discover Boota Luxe',
    category: 'COLLECTION',
  },
  {
    id: 'desi-sunshine',
    desktopImg: heroDesiDesktop,
    mobileImg: heroDesiMobile,
    tag: 'Boota Desi Play Edition',
    headline: 'Pure Cotton Chanderi & Angrakhas',
    subline: 'Gentle on delicate skin, designed for twirls, laughter, and effortless playtime.',
    cta: 'Shop Boota Desi',
    category: 'COLLECTION',
  },
];

export const ageTilesData = [
  {
    id: 'baby',
    title: 'Baby',
    ageRange: '0–12 months',
    subtitle: 'Ultra-soft mulmul & gentle seam finishes',
    image: ageBaby,
    tag: '0-12M',
  },
  {
    id: 'toddler',
    title: 'Toddler',
    ageRange: '1–3 years',
    subtitle: 'Elasticated waists & twirl-friendly silhouettes',
    image: ageToddler,
    tag: '1-3Y',
  },
  {
    id: 'kids',
    title: 'Kids',
    ageRange: '3+ years',
    subtitle: 'Regal silk lehengas & festive celebrations',
    image: ageKids,
    tag: '3Y+',
  },
];

export const brandStoryImage = brandStory;
export {
  ageBaby,
  ageToddler,
  ageKids,
  heroFestiveDesktop,
  heroFestiveMobile,
  heroDesiDesktop,
  heroDesiMobile,
  heroLuxeDesktop,
  heroLuxeMobile,
};
