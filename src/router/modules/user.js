import CannotLogin from "../../components/user/CannotLogin";
import Register from "../../components/user/Register";
import SelfIndex from "../../components/user/self/SelfIndex";
import AdvancedIndex from "@/components/user/advanced/AdvancedIndex";
import UserInfo from "@/components/user/UserInfo";
import UpdateInfo from "@/components/user/self/UpdateInfo";
import ChangePassword from "@/components/user/self/ChangePassword";
import ChangeEmail from "@/components/user/self/ChangeEmail";
import ManageProblem from "@/components/user/advanced/problem/ManageProblem";
import AddProblem from "@/components/user/advanced/problem/AddProblem";

export default [
    {
        path: '/cannot_login',
        name: 'cannot_login',
        component: CannotLogin,
        meta: {
            title: '无法登陆？'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: '注册'
        }
    },
    {
        path: '/self',
        name: 'self',
        component: SelfIndex,
        meta: {
            title: '个人设置'
        },
        children: [
            {
                path: 'update_info',
                name: 'update_info',
                component: UpdateInfo
            },
            {
                path: 'change_password',
                name: 'change_password',
                component: ChangePassword
            },
            {
                path: 'change_email',
                name: 'change_email',
                component: ChangeEmail
            }
        ]
    }, {
        path: '/system',
        name: 'system',
        component: AdvancedIndex,
        meta: {
            title: '系统设置'
        },
        children: [
            {
                path: 'manage_problem',
                name: 'manage_problem',
                component: ManageProblem
            },
            {
                path: 'add_problem',
                name: 'add_problem',
                component: AddProblem
            }
        ]
    }, {
        path: '/user/:id',
        name: 'user',
        component: UserInfo,
        meta: {
            title: '个人信息'
        }
    }
]
