import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./layout/shell/shell').then(m => m.Shell),

        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./features/home/pages/home/home').then((m) => m.Home)
            },
            {
                path: 'places',
                loadComponent: () =>
                    import('./features/places/pages/places/places').then((m) => m.Places)
            },
            {
                path: 'planner',
                loadComponent: () =>
                    import('./features/planner/pages/planner/planner').then((m) => m.Planner)
            },
            {
                path: 'chat',
                loadComponent: () =>
                    import('./features/chat/pages/chat/chat').then((m) => m.Chat)
            },
            {
                path: 'profile',
                loadComponent: () =>
                    import('./features/profile/pages/profile/profile').then((m) => m.Profile)
            }
        ]
    }
];
