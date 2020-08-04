import CannotLogin from "../../components/user/CannotLogin";
import Register from "../../components/user/Register";
import Index from "../../components/user/basic/Index";
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
        path: '/user',
        name: 'user',
        component: Index,
        meta:{
            title: '个人设置'
        }
    }
]
