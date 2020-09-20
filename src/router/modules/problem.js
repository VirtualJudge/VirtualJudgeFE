import ProblemList from "@/components/problem/list/ProblemList";
import ProblemDetail from "@/components/problem/detail/ProblemDetail";

export default [
    {
        path: '/problem',
        name: 'problems',
        component: ProblemList,
        meta: {
            title: '题目列表'
        }
    },
    {
        path: '/problem/:id',
        name: 'problem',
        component: ProblemDetail,
        meta: {
            title: '题目详情'
        }
    }
]
