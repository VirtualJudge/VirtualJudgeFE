import Index from "../../components/index/Index";
import Submission from "../../components/submission/Submission";

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
        path: '/submission',
        name: 'submission',
        component: Submission,
        meta: {
            title: '提交列表'
        }
    }
]
