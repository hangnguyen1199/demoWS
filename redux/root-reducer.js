import App from '@spo/redux/app/reducer';
import Cart from '@spo/redux/cart/reducer';
import Order from '@spo/redux/order/reducer';
import Home from '@spo/redux/home/reducer';
import ItemDetail from '@spo/redux/item-detail/reducer';
import OrderDetail from '@spo/redux/order-detail/reducer';
import ProductListWatched from '@spo/redux/product-list-watched/reducer';
import LanguageSwitcher from '@spo/redux/language-switcher/reducer';
import SearchItem from '@spo/redux/search-item/reducer';
import SearchShop from '@spo/redux/search-shop/reducer';
import SignIn from '@spo/redux/sign-in/reducer';
import SignUp from '@spo/redux/sign-up/reducer';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Common from './common/reducer';
import UserLogged from './user-logged/reducer';
import Wishlist from './wishlist/reducer';
import Notification from './notification/reducer';
import Regulation from './regulation/reducer';
import NewsReducer from './news/reducer';
import HelpCenterReducer from './help-center/reducer';
import RecruitmentReducer from './recruitment/reducer';
import PromotionReducer from './promotion/reducer';
import LocationReducer from './location/reducer';
import AuthReducer from './auth/reducer';
import MasterReducer from './master/reducer';
import AccountReducer from './account/reducer';
import MyReviewsReducer from './my-reviews/reducer';
import MailBoxReducer from './mail-box/reducer';
import WalletReducer from './wallet/reducer';
import MenuSearchReducer from './top-search-menu/reducer';
import FaqReducer from './faq/reducer';
import RewardReducer from './reward/reducer';
import ProductListTypeReducer from './product-list/reducer';
import TrackingOrderReducer from './tracking-order/reducer'

const rootReducer = combineReducers({
    App,
    form: formReducer,
    LanguageSwitcher,
    Home,
    ItemDetail,
    ProductListWatched,
    Cart,
    Order,
    Wishlist,
    Common,
    UserLogged,
    SearchItem,
    Notification,
    SearchShop,
    SignIn,
    SignUp,
    formReducer,
    Regulation,
    News: NewsReducer,
    HelpCenter: HelpCenterReducer,
    Recruitment: RecruitmentReducer,
    Promotion: PromotionReducer,
    Location: LocationReducer,
    Auth: AuthReducer,
    Master: MasterReducer,
    Account: AccountReducer,
    MyReviews: MyReviewsReducer,
    OrderDetail,
    MailBox: MailBoxReducer,
    Wallet: WalletReducer,
    MenuSearch: MenuSearchReducer,
    Faq: FaqReducer,
    Reward: RewardReducer,
    ProductListType: ProductListTypeReducer,
    TrackingOrder: TrackingOrderReducer,
})

export default rootReducer
