export const PRODUCT_CATEGORIES = [
  {
    label:"Vêtements pour femmes",
    value: 'Vêtements_pour_femmes' ,
    featured: [
      {
        name: 'Robes',
        href: `/products?category=ui_kits`,
        imageSrc: '/nav/robes.jpg',
      },
      {
        name: 'Manteaux',
        href: '/products?category=ui_kits&sort=desc',
        imageSrc: '/nav/mantau.jpg',
      },
      {
        name: 'Vestes',
        href: '/products?category=ui_kits',
        imageSrc: '/nav/onlmilan-coat-otw.jpg',
      },
    ],
  },
  {
    label: 'Accessoires de mode',
    value: 'Accessoires_de_mode',
    featured: [
      {
        name: 'Chapeaux',
        href: `/products?category=icons`,
        imageSrc: '/nav/chapeau.jpg',
      },
      {
        name: 'Lunettes de soleil',
        href: '/products?category=icons&sort=desc',
        imageSrc: '/nav/luntetts.jpg',
      },
      {
        name: 'Portefeuilles',
        href: '/products?category=icons',
        imageSrc: '/nav/portefeuilles-pachamama.jpg',
      },
    ],
    
  },
  {
    label: 'Vêtements pour hommes',
    value: 'vetements_hommes',
    featured: [
      {
        name: 'T-shirts',
        href: `/products?category=vetements_hommes`,
        imageSrc: '/nav/tshirt.jpg',
      },
      {
        name: 'Jeans',
        href: '/products?category=vetements_hommes&sort=desc',
        imageSrc: '/nav/jeans.jpg',
      },
      {
        name: 'Sweats à capuche',
        href: '/products?category=vetements_hommes',
        imageSrc: '/nav/capp.jpg',
      }, 
  ]
},
]
