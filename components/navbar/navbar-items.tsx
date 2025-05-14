export interface NavItemType {
  id: string
  title: string
  href: string
  children?: NavItemType[]
  featured?: boolean
  comingSoon?: boolean
  icon?: string
}

export const navItems: NavItemType[] = [
  {
    id: "home",
    title: "Home",
    href: "/",
    icon: "home",
  },
  {
    id: "about",
    title: "About Us",
    href: "/about#company-profile",
    icon: "info",

    // children: [
    //   {
    //     id: "company-profile",
    //     title: "Who We Are",
    //     href: "/about#company-profile",
    //   },
    //   {
    //     id: "vision-values",
    //     title: "Our Vision Mission and Values",
    //     href: "/about/vision-values",
    //   },
    //   {
    //     id: "journey",
    //     title: "Our Journey",
    //     href: "/journey",
    //   },
    //   {
    //     id: "afghan-operations",
    //     title: "Afghan Operations",
    //     href: "/about/afghan-operations",
    //   }
    // ],
  },

  {
    id: "services",
    title: "What We Offer/Our Services",
    href: "#",
    icon: "layers",
    children: [
      {
        id: "retail-services",
        title: "Key Offerings",
        href: "/services/retail",
        children: [
          {
            id: "retail-audit",
            title: "Retail Audit Studies",
            href: "/services/retail-audit-studies",
          },
          {
            id: "retail-census",
            title: "Retail Census",
            href: "/services/retail-census",
          },
          {
            id: "Merchandizing Audits",
            title: "Merchandizing Audits",
            href: "/services/merchandizing-audits",
          },
          {
            id: "Trade Margin Studies",
            title: "Trade Margin Studies",
            href: "/services/trade-margin-studies",
          },
          {
            id: "Asset Utilization Tracking",
            title: "Asset Utilization Tracking",
            href: "/services/asset-utilization-tracking",
          },
        ],
      },
      {
        id: "Transforming Market Performance",
        title: "Transforming Market Performance",
        href: "/services/transforming-market-perfomance",
      },
    ],
  },
  // {
  //   id: "capabilities",
  //   title: "Capabilities",
  //   href: "/capabilities",
  //   icon: "zap",
  //   children: [
  //     {
  //       id: "operational",
  //       title: "Our Operational Capabilities",
  //       href: "/capabilities/operational",
  //     },
  //     {
  //       id: "capi-modules",
  //       title: "CAPI Modules",
  //       href: "/capabilities/capi",
  //       children: [
  //         {
  //           id: "capi-module-1",
  //           title: "In-House CAPI Module I",
  //           href: "/capabilities/capi-module-1",
  //         },
  //         {
  //           id: "capi-module-2",
  //           title: "In-House CAPI Module II",
  //           href: "/capabilities/capi-module-2",
  //         },
  //       ],
  //     },
  //     {
  //       id: "coming-soon",
  //       title: "Coming Soon",
  //       href: "/capabilities/coming-soon",
  //       comingSoon: true,
  //     },
  //   ],
  // },
  {
    id: "Leadership",
    title: "Leadership",
    href: "/why-access/leadership",
    icon: "award",
  },
  {
    id: "Why Access Retail?",
    title: "Why Access Retail?",
    href: "/why-access/success-story",
    icon: "careers",
  },

  // {
  //   id: "Life @ Access Retail",
  //   title: "Life @ Access Retail",
  //   href: "/why-access/life-in-access",
  //   icon: "zap",
  // },
  // {
  //   id: "Careers",
  //   title: "Careers",
  //   href: "/why-access/career",
  //   icon: "briefcase",

  // },
]
