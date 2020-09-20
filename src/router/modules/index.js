import Index from "../../components/index/Index";
import NotFound from "@/components/NotFound";

export default [
    {
        path: '/',
        name: 'index',
        component: Index,
        meta: {
            title: '首页'
        }
    },
    {
        path: '*',
        name: 'default',
        component: NotFound,
        meta: {
            title: '404'
        }
    }
]
