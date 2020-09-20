import CannotLogin from "../../components/user/CannotLogin";
import Register from "../../components/user/Register";
import SelfIndex from "../../components/user/self/SelfIndex";
import UserInfo from "@/components/user/UserInfo";
import UpdateInfo from "@/components/user/self/UpdateInfo";
import ChangePassword from "@/components/user/self/ChangePassword";
import ChangeEmail from "@/components/user/self/ChangeEmail";
import RankIndex from "@/components/rank/RankIndex";

export default [
    {
        path: '/rank',
        name: 'rank',
        component: RankIndex,
        meta: {
            title: '排行'
        }
    },
    {
        path: '/cannot_login',
        name: 'cannot_login',
        component: CannotLogin,
        meta: {
            title: '无法登录'
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
    },
    {
        path: '/user/:id',
        name: 'user',
        component: UserInfo,
        meta: {
            title: '个人信息'
        }
    }
]
