// Pages
import {
  // AppBar,
  // Autocomplete,
  // Avatars,
  // BackendError,
  // Badges,
  // Blank,
  // ButtonNavigation,
  // Buttons,
  // Calendar,
  Partners,
  Offres,
  Users,
  Transactions,
  Menu,
  Deals,
  Billing,
  // TestValide,
  // TestCSV,
  PartnersCSV,
  // OffresCSV,
  MenuCSV,
  // DealsCSV,
  PartnersMaps,
  UsersMap,
  // Cards,
  // Charts,
  // Chat,
  // Chips,
  // Detail,
  // Dialogs,
  // Dividers,
  // Drawers,
  // Editor,
  // ExpansionPanels,
  // Google,
  GridList,
  Home,
  PasswordReset,
  AddAdmin,
  Selects,
  Signin,
  
} from './pages';

import AppsIcon from '@material-ui/icons/Apps';

import BookmarkIcon from '@material-ui/icons/Bookmark';
import EqualizerIcon from '@material-ui/icons/Equalizer';
// Icons
import ExploreIcon from '@material-ui/icons/Explore';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import FastfoodIcon from '@material-ui/icons/Fastfood';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import FaceIcon from '@material-ui/icons/Face';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import NavigationIcon from '@material-ui/icons/Navigation';
import PagesIcon from '@material-ui/icons/Pages';
import PersonIcon from '@material-ui/icons/Person';
import PhotoIcon from '@material-ui/icons/Photo';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import Dashboard from './containers/Dashboard';

export default {
  items: [
    {
      path: '/Dashbord',
      name: 'Acceuil',
      type: 'link',
      icon: ExploreIcon,
      component: Home
    },
    
    {
      path: '/maps',
      name: 'Maps',
      type: 'submenu',
      icon: NavigationIcon,
      children: [
        {
          path: '/PartnersMaps',
          name: 'Partners Maps',
          component: PartnersMaps
        },
        {
          path: '/UsersMap',
          name: 'Users Map',
          component: UsersMap
        }
      ]
    },

    // {
    //   path: '/valide',
    //   name: 'testValide',
    //   type: 'submenu',
    //   icon: NavigationIcon,
    //   children: [
    //     {
    //       path: '/testValide',
    //       name: 'test valide',
    //       component: TestValide
    //     },
        
    //   ]
    // },
    {
      path: '/Partners',
      name: 'Partenaires',
      type: 'submenu',
      icon: PermIdentityIcon,
      children: [
        {
          path: '/Partners',
          name: 'Partenaire',
          component: Partners
        },
        {
          path: '/PartnersCSV',
          name: 'Partenaires (CSV)',
          component: PartnersCSV
        },
        // {
        //   path: '/leaflet',
        //   name: 'Leaflet',
        //   component: Leaflet
        // }
      ]
    },
    {
      path: '/Offres',
      name: 'Offres actives',
      type: 'submenu',
      icon: FastfoodIcon,
      children: [
        {
          path: '/Offres',
          name: 'Offres actives',
          component: Offres
        },
        // {
        //   path: '/OffresCSV',
        //   name: 'Offres actives (CSV)',
        //   component: OffresCSV
        // },
        // {
        //   path: '/leaflet',
        //   name: 'Leaflet',
        //   component: Leaflet
        // }
      ]
    },
    {
      path: '/Deals',
      name: 'Offres',
      type: 'submenu',
      icon: FastfoodIcon,
      children: [
        {
          path: '/Deals',
          name: 'Offres',
          component: Deals
        },
        // {
        //   path: '/DealsCSV',
        //   name: 'Offres (CSV)',
        //   component: DealsCSV
        // },
       
      ]
    },
    {
      path: '/Users',
      name: 'Utilisateurs',
      type: 'submenu',
      icon: AddToHomeScreenIcon,
      children: [
        {
          path: '/Users',
          name: 'Utilisateurs',
          component: Users
        },
        // {
        //   path: '/leaflet',
        //   name: 'Leaflet',
        //   component: Leaflet
        // }
      ]
    },

    {
      path: '/Admin',
      name: 'Administrateurs',
      type: 'submenu',
      icon: SupervisorAccountIcon,
      children: [
        {
          path: '/AddAdmin',
          name: 'Add Admin',
          component: AddAdmin
        },
        
      ]
    },

    {
      path: '/Transactions',
      name: 'Transactions',
      type: 'submenu',
      icon: CompareArrowsIcon,
      children: [
        {
          path: '/Transactions',
          name: 'Transactions',
          component: Transactions
        },
        // {
        //   path: '/leaflet',
        //   name: 'Leaflet',
        //   component: Leaflet
        // }
      ]
    },
    {
      path: '/Menu',
      name: 'Menu',
      type: 'submenu',
      icon: AddShoppingCartIcon,
      children: [
        {
          path: '/Menu',
          name: 'Menu',
          component: Menu
        },
        {
          path: '/Menucsv',
          name: 'Menu (CSV)',
          component: MenuCSV
        },
        // {
        //   path: '/leaflet',
        //   name: 'Leaflet',
        //   component: Leaflet
        // }
      ]
    },
    {
      path: '/Billing',
      name: 'Payement',
      type: 'submenu',
      icon: MonetizationOnIcon,
      children: [
        {
          path: '/Billing',
          name: 'Payement',
          component: Billing
        },
        // {
        //   path: '/leaflet',
        //   name: 'Leaflet',
        //   component: Leaflet
        // }
      ]
    },
    // {
    //   path: '/TestCSV',
    //   name: 'TestCSV',
    //   type: 'submenu',
    //   icon: CompareArrowsIcon,
    //   children: [
    //     {
    //       path: '/TestCSV',
    //       name: 'TestCSV',
    //       component: TestCSV
    //     },
    //     // {
    //     //   path: '/leaflet',
    //     //   name: 'Leaflet',
    //     //   component: Leaflet
    //     // }
    //   ]
    // },
    // {
    //   path: '/pages',
    //   name: 'Pages',
    //   type: 'submenu',
    //   icon: PagesIcon,
    //   children: [
    //     // {
    //     //   path: '/invoice',
    //     //   name: 'Invoice',
    //     //   component: Invoice
    //     // },
    //     // {
    //     //   path: '/timeline',
    //     //   name: 'Timeline',
    //     //   component: TimelinePage
    //     // },
    //     // {
    //     //   path: '/blank',
    //     //   name: 'Blank',
    //     //   component: Blank
    //     // },
    //     // {
    //     //   path: '/pricing',
    //     //   name: 'Pricing',
    //     //   component: PricingPage
    //     // }
    //   ]
    // },
    {
      name: 'Authentication',
      type: 'submenu',
      icon: PersonIcon,
      children: [
        {
          path: '/signin',
          name: 'Signin',
          component: Signin
        },
        // {
        //   path: '/signup',
        //   name: 'Signup',
        //   component: Signup
        // },
        {
          path: '/forgot',
          name: 'Forgot',
          component: PasswordReset
        },
        // {
        //   path: '/lockscreen',
        //   name: 'Lockscreen',
        //   component: Lockscreen
        // }
      ]
    },
    // {
    //   name: 'Error',
    //   type: 'submenu',
    //   icon: FaceIcon,
    //   children: [
    //     // {
    //     //   path: '/404',
    //     //   name: '404',
    //     //   component: NotFound
    //     // },
    //     // {
    //     //   path: '/500',
    //     //   name: 'Error',
    //     //   component: BackendError
    //     // }
    //   ]
    // },
    // {
    //   path: 'https://iamnyasha.github.io/react-primer-docs/',
    //   name: 'Documentation',
    //   type: 'external',
    //   icon: LocalLibraryIcon
    // },
    // {
    //   path: 'https://primer.fusepx.com',
    //   name: 'Get Angular Version',
    //   type: 'external',
    //   icon: BookmarkIcon
    // }
  ]
};
