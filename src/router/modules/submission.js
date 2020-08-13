import SubmissionList from "@/components/submission/SubmissionList";
import SubmissionDetail from "@/components/submission/SubmissionDetail";

export default [
    {
        path: '/submission',
        name: 'submissionList',
        component: SubmissionList,
        meta: {
            title: '提交列表'
        }
    },
    {
        path: '/submission/:id',
        name: 'submissionDetail',
        component: SubmissionDetail,
        meta: {
            title: '提交详情'
        }
    }
]
