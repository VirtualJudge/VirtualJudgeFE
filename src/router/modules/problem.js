import ProblemList from "@/components/problem/list/ProblemList";
import ProblemDetail from "@/components/problem/detail/ProblemDetail";

export default [
    {
        path: '/problem',
        name: 'problems',
        component: ProblemList,
        meta: {
            title: 'title.problem_list'
        }
    },
    {
        path: '/problem/:id',
        name: 'problem',
        component: ProblemDetail,
        meta: {
            title: 'title.problem_detail'
        }
    }
]
