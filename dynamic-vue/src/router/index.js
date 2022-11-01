import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        name: 'layout',
        path: '/',
        component: () => import('@/components/Layout/MainPage.vue'),
        children: [
            {
                path: '/',
                name: 'ContentBuilder',
                component: () => import('@/views/ContentBuilder.vue')
            }
        ]
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;
