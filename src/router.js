import { createWebHistory, createRouter } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ContactView from '@/views/ContactView.vue';
import SignInView from '@/views/SignInView.vue';
import SignUpView from '@/views/SignUpView.vue';
import SignOutView from '@/views/SignOutView.vue';
import CollectionsView from '@/views/CollectionsView.vue';
import CollectionDetailView from '@/views/CollectionDetailView.vue';
import CardsView from '@/views/CardsView.vue';
import CardDetailView from '@/views/CardDetailView.vue';
import MyCardsView from "@/views/MyCardsView";
import MyCardDetailView from "@/views/MyCardDetailView";

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView,
    },
    {
        path: '/contact',
        name: 'ContactView',
        component: ContactView,
    },
    {
        path: '/signin',
        name: 'SignInView',
        component: SignInView,
    },
    {
        path: '/signup',
        name: 'SignUpView',
        component: SignUpView,
    },
    {
        path: '/signout',
        name: 'SignOutView',
        component: SignOutView,
    },
    {
        path: '/collections',
        name: 'CollectionsView',
        component: CollectionsView,
    },
    {
        path: '/collections/:id',
        name: 'CollectionView',
        component: CollectionDetailView,
    },
    {
        path: '/cards',
        name: 'CardsView',
        component: CardsView,
    },
    {
        path: '/cards/:id',
        name: 'CardDetailView',
        component: CardDetailView,
    },
    {
        path: '/my/cards',
        name: 'MyCardsView',
        component: MyCardsView,
    },
    {
        path: '/my/cards/:id',
        name: 'MyCardView',
        component: MyCardDetailView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
