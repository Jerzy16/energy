import { Routes } from "@angular/router";

export default [
    {
        path: '',
        loadComponent: () => import('../shared/ui/layout/layout.component').then(m => m.LayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
            }
        ]
    }
] as Routes