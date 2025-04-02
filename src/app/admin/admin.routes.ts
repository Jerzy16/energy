import { Routes } from "@angular/router";

export default [
    {
        path: '',
        loadComponent: () => import('../shared/ui/layout/layout.component').then(m => m.LayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
              path: 'admin/user',
              loadComponent: () => import('./user/user.component').then(m => m.UserComponent)
          }
        ]
    }
] as Routes
