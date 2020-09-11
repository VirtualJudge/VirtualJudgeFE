import Index from "../../components/index/Index";
import NotFound from "@/components/NotFound";

export default [
    {
        path: '/',
        name: 'index',
        component: Index,
        meta: {
            title: 'title.index'
        }
    },
    {
        path: '*',
        name: 'default',
        component: NotFound,
        meta: {
            title: 'title.page_not_found'
        }
    }
]
