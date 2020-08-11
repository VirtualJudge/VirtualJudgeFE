import Index from "../../components/index/Index";
import SubmissionList from "../../components/submission/SubmissionList";

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
        component: SubmissionList,
        meta: {
            title: '提交列表'
        }
    }
]
