import CannotLogin from "../../components/user/CannotLogin";
import Register from "../../components/user/Register";
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
        path: '/register/',
        name: 'register',
        component: Register,
        meta: {
            title: '注册'
        }
    }
]
