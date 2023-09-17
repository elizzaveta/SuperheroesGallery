import {AppRouterType} from "../types/AppRouter.type";
import SuperheroDetailsPage from "../pages/superhero-details/SuperheroDetailsPage";
import CreateSuperhero from "../pages/create-superhero/CreateSuperhero";
import EditSuperhero from "../pages/edit-superhero/EditSuperhero";
import SuperheroesGalleryPage from "../pages/superheroes-gallery/SuperheroesGalleryPage";

export const appRouter: AppRouterType[] = [
    {
        path: '/',
        component: <SuperheroesGalleryPage/>
    },
    {
        path: 'details/:id',
        component: <SuperheroDetailsPage/>
    },
    {
        path: 'new-superhero',
        component: <CreateSuperhero/>
    },
    {
        path: '/edit/:id',
        component: <EditSuperhero/>
    }
]