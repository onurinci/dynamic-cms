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
            },
            {
                path: '/contentmanager/singleType/:id',
                name: 'SingleManager',
                component: () => import('@/views/ContentManager/SingleManager.vue')
            },
            {
                path: '/contentmanager/collectionType/:id',
                name: 'CollectionManager',
                component: () => import('@/views/ContentManager/CollectionManager.vue')
            },
            {
                path: '/media/library',
                name: 'MediaLibrary',
                component: () => import('@/views/MediaLibrary/MediaLibrary.vue')
            }
        ]
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;
