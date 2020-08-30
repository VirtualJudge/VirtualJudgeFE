import SubmissionList from "@/components/submission/SubmissionList";
import SubmissionDetail from "@/components/submission/SubmissionDetail";

export default [
    {
        path: '/submission',
        name: 'submissionList',
        component: SubmissionList,
        meta: {
            title: 'title.submission_list'
        }
    },
    {
        path: '/submission/:id',
        name: 'submissionDetail',
        component: SubmissionDetail,
        meta: {
            title: 'title.submission_detail'
        }
    }
]
