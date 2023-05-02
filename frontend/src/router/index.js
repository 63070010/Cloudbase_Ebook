import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegiSter from '../views/Register-Ebook.vue'
import LogIn from '../views/Login-Ebook.vue'
import Profile_user from '../views/Profile_user.vue'
import DetailsBook from '../views/DetailsBook.vue'
import Cart_Book from '../views/Cart_Book.vue'
import DetailPromotion from '../views/DetailPromotion.vue'
import SearchBook from '../views/SearchBook.vue'
import FavoriteBook from '../views/Favorite_Book.vue'
import Bookshelf from '../views/Bookshelf.vue'
import MyCommendinBook from '../views/MyCommendInBook.vue'
import ItemsPoint from '../views/ItemsPoint.vue'
import UploadBook from '../views/UploadBook.vue'
import Readbook from '../views/ReadBook.vue'
import QrCodeWithCheck from '../views/QRCode.vue'
import EventAllPromotion from '../views/EventAllPromotionBook.vue'
import Admin_AddEvent from '../views/Admin_AddEvent.vue'
import Admin_AddItem from '../views/Admin_AddItem.vue'
import Admin_Monthly from '../views/Admin_Monthly.vue'
import QRCodeForMonthly from '../views/QRCodeMontlyPage.vue'
import MyBook from '../views/MyBookPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',

    component: RegiSter
  }
  ,
  {
    path: '/login',
    name: 'login',

    component: LogIn
  },
  {
    path: '/Profile_user/:id',
    name: 'Profile_user',

    component: Profile_user
  },
  {
    path: '/DetailsBook/:id',
    name: 'DetailsBook',

    component: DetailsBook
  },
  {
    path: '/Cart_Book',
    name: 'Cart_Book',

    component: Cart_Book
  },
  {
    path: '/DetailPromotion/:id',
    name: 'DetailPromotion',

    component: DetailPromotion
  }
  ,
  {
    path: '/SearchBook/:id',
    name: 'SearchBook',

    component: SearchBook
  }
  ,


  {
    path: '/FavoriteBook',
    name: 'FavoriteBook',

    component: FavoriteBook
  },
  {
    path: '/Bookshelf',
    name: 'BookshelfComponent',

    component: Bookshelf
  },
  {
    path: '/MyCommendinBook',
    name: 'MyCommendinBook',

    component: MyCommendinBook
  },
  {
    path: '/ItemsPoint',
    name: 'ItemsPoint',

    component: ItemsPoint
  }
  ,
  {
    path: '/UploadBook',
    name: 'UploadBook',

    component: UploadBook
  }
  ,
  {
    path: '/Readbook/:book_id',
    name: 'Readbook',

    component: Readbook
  }
  ,
  {
    path: '/QrCodeWithCheck',
    name: 'QrCodeWithCheck',

    component: QrCodeWithCheck
  }
  ,
  {
    path: '/EventAllPromotion/:id',
    name: 'EventAllPromotion',

    component: EventAllPromotion
  }
  ,
  {
    path: '/Admin_AddEvent',
    name: 'Admin_AddEvent',

    component: Admin_AddEvent
  }
  ,
  {
    path: '/Admin_AddItem',
    name: 'Admin_AddItem',

    component: Admin_AddItem
  }
  ,
  {
    path: '/Admin_Monthly',
    name: 'Admin_Monthly',

    component: Admin_Monthly
  }
  ,
  {
    path: '/QRCodeForMonthly',
    name: 'QRCodeForMonthly',

    component: QRCodeForMonthly
  }
  ,
  {
    path: '/Mybook',
    name: 'MyBook',

    component: MyBook
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
