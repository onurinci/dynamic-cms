import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        name: 'layout',
        path: '/',
        component: () => import('@/components/Layout/Main.vue'),
        children: [
            {
                path: '/',
                name: 'Dashboard',
                component: () => import('@/views/Dashboard.vue')
            },
            {
                path: '/contentBuilder',
                name: 'ContentBuilder',
                component: () => import('@/views/ContentBuilder/Index.vue')
            },
            {
                path: '/contentBuilder/:id',
                name: 'ContentBuilderEdit',
                component: () => import('@/views/ContentBuilder/Edit.vue')
            },
            {
                path: '/contentmanager/singleType/:id/:locale',
                name: 'SingleManager',
                component: () => import('@/views/ContentManager/SingleManager.vue')
            },
            {
                path: '/contentmanager/collectionType/:id/:locale',
                name: 'CollectionManager',
                component: () => import('@/views/ContentManager/CollectionManager.vue')
            },
            {
                path: '/contentmanager/collectionType/:id/:locale/new',
                name: 'NewCollection',
                component: () => import('@/views/ContentManager/Collection/New.vue')
            },
            {
                path: '/mediaLibrary',
                name: 'MediaLibrary',
                component: () => import('@/views/MediaLibrary/Index.vue')
            },
            {
                path: '/settings/internationalization',
                name: 'Internationalization',
                component: () => import('@/views/Settings/Internationalization.vue')
            }
        ]
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;
