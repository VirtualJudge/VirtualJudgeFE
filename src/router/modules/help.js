import Help from "@/components/help/Help";
import Compiler from "@/components/help/Compiler";

export default [
    {
        path: '/help',
        name: 'help',
        component: Help,
        meta: {
            title: '帮助'
        }
    }, {
        path: '/compiler',
        name: 'compiler',
        component: Compiler,
        meta: {
            title: '编译器'
        }
    }
]
