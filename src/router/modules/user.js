import CannotLogin from "../../components/user/CannotLogin";
import Register from "../../components/user/Register";
import SelfIndex from "../../components/user/SelfIndex";
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
    },{
        path: '/self',
        name: 'self',
        component: SelfIndex,
        meta:{
            title: '个人设置'
        }
    }
]
