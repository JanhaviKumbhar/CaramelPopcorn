// Caramel Popcorn — Sample seed data for the dashboard preview.
// Mirrors the schema we use in the Chrome extension (chrome.storage.local).

export const SAVE_TYPES = {
  cant_stop_thinking: { label: "Can't Stop Thinking", emoji: '❤️', class: 'cp-st-cant' },
  fomo:               { label: 'FOMO',                emoji: '🍿', class: 'cp-st-fomo' },
  manifesting:        { label: 'Manifesting',         emoji: '✨', class: 'cp-st-manifest' },
  just_browsing:      { label: 'Just Browsing',       emoji: '🤷', class: 'cp-st-browse' },
};

export const CATEGORY_TREE = {
  Beauty: {
    Makeup: ['Lipstick', 'Foundation', 'Blush', 'Concealer', 'Mascara'],
    Skincare: ['Cleanser', 'Serum', 'Moisturizer', 'Sunscreen', 'Lip Mask'],
  },
  Fashion: {
    Dresses: [], Tops: [], Shirts: [], Jeans: [], Pants: [], Skirts: [],
    Shoes: ['Sneakers', 'Heels', 'Flats', 'Boots'],
    Bags: ['Tote', 'Shoulder Bag', 'Crossbody', 'Mini'],
    Accessories: ['Earrings', 'Necklace', 'Rings', 'Sunglasses'],
  },
};

// Curated unsplash/pexels image pool (warm, premium)
const IMG = {
  blush:       'https://images.pexels.com/photos/1470165/pexels-photo-1470165.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  skincare:    'https://images.unsplash.com/photo-1667266543254-505cf5b16ec4?crop=entropy&cs=srgb&fm=jpg&w=900&q=80',
  outfit:      'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=900&q=80',
  bag:         'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=900&q=80',
  rack:        'https://images.pexels.com/photos/9218397/pexels-photo-9218397.jpeg?auto=compress&cs=tinysrgb&w=900',
  blazer:      'https://images.pexels.com/photos/7202800/pexels-photo-7202800.jpeg?auto=compress&cs=tinysrgb&w=900',
  lipstick:    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=900&q=80',
  perfume:     'https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&q=80',
  sneakers:    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=900&q=80',
  heels:       'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&q=80',
  dress:       'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900&q=80',
  tote:        'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=900&q=80',
  serum:       'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=80',
  jewelry:     'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80',
  oldmoney:    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80',
  coquette:    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=80',
};

const nowMinus = (d) => new Date(Date.now() - d*24*60*60*1000).toISOString();

export const SAMPLE_ITEMS = [
  {
    id: 'p1', type: 'product', title: 'Soft Pinch Liquid Blush', brand: 'Rare Beauty',
    category: 'Beauty', subcategory: 'Blush', image: IMG.blush, price: 2400, currency: 'INR',
    website: 'Sephora', url: 'https://www.sephora.com/', source: 'shopping',
    saveType: 'cant_stop_thinking', favorite: true, tags: ['cream-blush','viral','dewy'],
    notes: 'Recommended by Sarah', status: 'wishlist', dateSaved: nowMinus(1), collection: 'Date Night'
  },
  {
    id: 'p2', type: 'product', title: 'Lip Sleeping Mask Berry', brand: 'Laneige',
    category: 'Beauty', subcategory: 'Lip Mask', image: IMG.lipstick, price: 1900, currency: 'INR',
    website: 'Nykaa', url: 'https://www.nykaa.com/', source: 'shopping',
    saveType: 'manifesting', favorite: false, tags: ['k-beauty','overnight'],
    notes: 'Wait for sale', status: 'wishlist', dateSaved: nowMinus(2),
  },
  {
    id: 'p3', type: 'product', title: 'Pillow Talk Lipstick', brand: 'Charlotte Tilbury',
    category: 'Beauty', subcategory: 'Lipstick', image: IMG.lipstick, price: 3800, currency: 'INR',
    website: 'Tira', url: 'https://www.tirabeauty.com/', source: 'shopping',
    saveType: 'fomo', favorite: true, tags: ['nude','everyday'],
    notes: '', status: 'wishlist', dateSaved: nowMinus(3),
  },
  {
    id: 'p4', type: 'product', title: 'Peptide Lip Tint', brand: 'Rhode',
    category: 'Beauty', subcategory: 'Lip Mask', image: IMG.serum, price: 1600, currency: 'INR',
    website: 'rhodeskin.com', url: 'https://www.rhodeskin.com/', source: 'shopping',
    saveType: 'manifesting', favorite: false, tags: ['hailey','glossy'],
    notes: 'Restock when available in India', status: 'wishlist', dateSaved: nowMinus(5),
  },
  {
    id: 'p5', type: 'product', title: 'Tabby 26 Shoulder Bag', brand: 'Coach',
    category: 'Fashion', subcategory: 'Shoulder Bag', image: IMG.bag, price: 39500, currency: 'INR',
    website: 'Coach', url: 'https://india.coach.com/', source: 'shopping',
    saveType: 'manifesting', favorite: true, tags: ['leather','iconic'],
    notes: 'Buy after Salary', status: 'wishlist', dateSaved: nowMinus(7), collection: 'Old Money',
  },
  {
    id: 'p6', type: 'product', title: 'Cyme Mini Bag', brand: 'Polène',
    category: 'Fashion', subcategory: 'Mini', image: IMG.tote, price: 48000, currency: 'INR',
    website: 'polene-paris.com', url: 'https://en.polene-paris.com/', source: 'shopping',
    saveType: 'cant_stop_thinking', favorite: true, tags: ['minimal','french'],
    notes: 'Birthday gift idea', status: 'wishlist', dateSaved: nowMinus(9), collection: 'Old Money',
  },
  {
    id: 'p7', type: 'product', title: 'Linen Oversized Shirt', brand: 'Zara',
    category: 'Fashion', subcategory: 'Shirts', image: IMG.outfit, price: 3290, currency: 'INR',
    website: 'Zara', url: 'https://www.zara.com/in/', source: 'shopping',
    saveType: 'just_browsing', favorite: false, tags: ['linen','summer'],
    notes: 'Need before Goa', status: 'wishlist', dateSaved: nowMinus(11), collection: 'Vacation',
  },
  {
    id: 'p8', type: 'product', title: 'Samba OG Sneakers', brand: 'Adidas',
    category: 'Fashion', subcategory: 'Sneakers', image: IMG.sneakers, price: 9999, currency: 'INR',
    website: 'AJIO', url: 'https://www.ajio.com/', source: 'shopping',
    saveType: 'fomo', favorite: false, tags: ['retro','everyday'],
    notes: '', status: 'wishlist', dateSaved: nowMinus(13),
  },
  {
    id: 'p9', type: 'product', title: 'Air Force 1 \'07', brand: 'Nike',
    category: 'Fashion', subcategory: 'Sneakers', image: IMG.sneakers, price: 8295, currency: 'INR',
    website: 'Nike', url: 'https://www.nike.com/in/', source: 'shopping',
    saveType: 'just_browsing', favorite: false, tags: ['classic','white'],
    notes: '', status: 'wishlist', dateSaved: nowMinus(14),
  },
  {
    id: 'p10', type: 'product', title: 'Knot Detail Tote', brand: 'COS',
    category: 'Fashion', subcategory: 'Tote', image: IMG.tote, price: 13900, currency: 'INR',
    website: 'COS', url: 'https://www.cosstores.com/', source: 'shopping',
    saveType: 'manifesting', favorite: false, tags: ['minimal','workwear'],
    notes: 'Good for office', status: 'wishlist', dateSaved: nowMinus(16), collection: 'Office Wear',
  },
  {
    id: 'i1', type: 'inspiration', title: 'Cozy office aesthetic', brand: '', creator: '@minimaliste',
    category: 'Fashion', subcategory: 'Outfit', image: IMG.blazer, source: 'pinterest',
    url: 'https://pinterest.com/pin/1', saveType: 'cant_stop_thinking', favorite: false,
    tags: ['old-money','blazer'], notes: '', status: 'inspiration', dateSaved: nowMinus(4),
  },
  {
    id: 'i2', type: 'inspiration', title: 'Glowy summer makeup', brand: '', creator: '@beautybyjules',
    category: 'Beauty', subcategory: 'Look', image: IMG.skincare, source: 'instagram',
    url: 'https://instagram.com/reel/abc', saveType: 'fomo', favorite: true,
    tags: ['dewy','minimal-makeup'], notes: 'Try this for the wedding', status: 'inspiration', dateSaved: nowMinus(2),
  },
  // Looks
  {
    id: 'l1', type: 'look', title: 'Soft Old Money Brunch', brand: '', creator: '@theclosetdiaries',
    image: IMG.oldmoney, source: 'pinterest', url: 'https://pinterest.com/pin/look1',
    saveType: 'cant_stop_thinking', favorite: true, tags: ['old-money','brunch'],
    aesthetic: 'Old Money', occasion: 'Brunch', dominantColors: ['#E8DFD8','#8C6239','#FCFAF8'],
    items: [
      { kind: 'Top',       label: 'Cream silk blouse',  color: '#FCFAF8' },
      { kind: 'Bottom',    label: 'Pleated camel pants', color: '#C47C47' },
      { kind: 'Footwear',  label: 'Beige slingbacks',    color: '#E8DFD8' },
      { kind: 'Bag',       label: 'Polène Cyme Mini',    color: '#8C6239' },
      { kind: 'Accessory', label: 'Gold huggies',        color: '#D4AF37' },
    ],
    notes: 'Outfit for Sunday brunch', status: 'inspiration', dateSaved: nowMinus(1),
  },
  {
    id: 'l2', type: 'look', title: 'Clean Girl Coffee Run', brand: '', creator: '@matildadjerf',
    image: IMG.outfit, source: 'instagram', url: 'https://instagram.com/reel/l2',
    saveType: 'fomo', favorite: false, tags: ['clean-girl','minimal'],
    aesthetic: 'Clean Girl', occasion: 'Coffee Run', dominantColors: ['#FFFFFF','#2B1E16','#99857A'],
    items: [
      { kind: 'Top',       label: 'White tank',          color: '#FFFFFF' },
      { kind: 'Bottom',    label: 'Wide-leg denim',      color: '#7AA7C7' },
      { kind: 'Footwear',  label: 'Adidas Samba',        color: '#FCFAF8' },
      { kind: 'Bag',       label: 'Mini crossbody',      color: '#2B1E16' },
      { kind: 'Accessory', label: 'Claw clip',           color: '#5C4033' },
    ],
    notes: '', status: 'inspiration', dateSaved: nowMinus(6),
  },
  {
    id: 'l3', type: 'look', title: 'Coquette Date Night', brand: '', creator: '@sabrinacarpenter',
    image: IMG.coquette, source: 'instagram', url: 'https://instagram.com/reel/l3',
    saveType: 'manifesting', favorite: true, tags: ['coquette','bow'],
    aesthetic: 'Coquette', occasion: 'Date Night', dominantColors: ['#FCEAEA','#B33F40','#FFFFFF'],
    items: [
      { kind: 'Top',       label: 'Bow-tie blouse',      color: '#FCEAEA' },
      { kind: 'Bottom',    label: 'Mini skirt',          color: '#FFFFFF' },
      { kind: 'Footwear',  label: 'Mary Janes',          color: '#2B1E16' },
      { kind: 'Bag',       label: 'Satin clutch',        color: '#B33F40' },
      { kind: 'Accessory', label: 'Pearl bracelet',      color: '#F4E3D7' },
    ],
    notes: 'Anniversary dinner outfit', status: 'inspiration', dateSaved: nowMinus(3),
  },
];

export const SAMPLE_COLLECTIONS = [
  { id: 'c1', name: 'Vacation',     cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80', items: 8  },
  { id: 'c2', name: 'Wedding Guest',cover: IMG.dress,   items: 5  },
  { id: 'c3', name: 'Office Wear',  cover: IMG.blazer,  items: 12 },
  { id: 'c4', name: 'Old Money',    cover: IMG.oldmoney,items: 9  },
  { id: 'c5', name: 'Date Night',   cover: IMG.coquette,items: 6  },
  { id: 'c6', name: 'Minimalist',   cover: IMG.rack,    items: 14 },
  { id: 'c7', name: 'Under ₹2000',  cover: IMG.serum,   items: 11 },
  { id: 'c8', name: 'Summer',       cover: IMG.outfit,  items: 7  },
];

export const SAMPLE_REMINDERS = [
  { id: 'r1', itemId: 'p2', label: 'Wait for Sale',     date: nowMinus(-7),  emoji: '🏷️' },
  { id: 'r2', itemId: 'p5', label: 'Buy after Salary',  date: nowMinus(-12), emoji: '💸' },
  { id: 'r3', itemId: 'p7', label: 'Vacation Shopping', date: nowMinus(-18), emoji: '🌴' },
];

export const AESTHETICS = ['Old Money', 'Clean Girl', 'Coquette', 'Minimalist', 'Streetwear', 'Y2K', 'Indie Sleaze'];
export const OCCASIONS  = ['Office', 'Brunch', 'Vacation', 'Wedding', 'Party', 'Date Night', 'Coffee Run'];

export const SUPPORTED_SITES = [
  { name: 'Amazon',  domain: 'amazon.in' },
  { name: 'Nykaa',   domain: 'nykaa.com' },
  { name: 'Myntra',  domain: 'myntra.com' },
  { name: 'AJIO',    domain: 'ajio.com' },
  { name: 'Zara',    domain: 'zara.com' },
  { name: 'H&M',     domain: 'hm.com' },
  { name: 'Sephora', domain: 'sephora.com' },
  { name: 'Tira',    domain: 'tirabeauty.com' },
  { name: 'Pinterest', domain: 'pinterest.com' },
  { name: 'Instagram', domain: 'instagram.com' },
  { name: 'YouTube',   domain: 'youtube.com' },
];
