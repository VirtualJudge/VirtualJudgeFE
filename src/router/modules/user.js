import CannotLogin from "../../components/user/CannotLogin";
import Register from "../../components/user/Register";
import RegisterStep1 from "../../components/user/RegisterStep1";
import RegisterStep2 from "../../components/user/RegisterStep2";
import RegisterStep3 from "../../components/user/RegisterStep3";

export default [
    {
        path: '/cannot_login',
        name: 'cannot_login',
        component: CannotLogin,
        meta: {
            title: '无法登陆？'
        }
    }, {
        path: '/register/',
        name: 'register',
        component: Register,
        meta: {
            title: '注册'
        },

        children: [
            {
                path: 'step1',
                component: RegisterStep1,
                meta: {
                    title: '注册步骤1'
                }
            },
            {
                path: 'step2',
                component: RegisterStep2,
                meta: {
                    title: '注册步骤2'
                }

            },
            {
                path: 'step3',
                component: RegisterStep3,
                meta: {
                    title: '注册步骤3'
                }
            }
        ]
    }
]
