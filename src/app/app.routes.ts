import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
    {
        path: 'category/:id',
        component: ProductListComponent
    },
    {
        path: 'category',
        component: ProductListComponent
    },
    {
        path: 'products',
        component: ProductListComponent
    },
    {
        path: '',
        redirectTo: '/products',
        pathMatch: "full"
    },
    {
        path: 'search/:keyword',
        component: ProductListComponent
    },
    {
        path: 'product/:id',
        component: ProductDetailsComponent
    },
    {
        path: 'cart-details',
        component: CartDetailsComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: '**',
        redirectTo: '/products'
    },
    

];
