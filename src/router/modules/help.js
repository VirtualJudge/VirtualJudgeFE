import Help from "@/components/help/Help";
import Compiler from "@/components/help/Compiler";

export default [
    {
        path: '/help',
        name: 'help',
        component: Help,
        meta: {
            title: 'title.help'
        }
    }, {
        path: '/compiler',
        name: 'compiler',
        component: Compiler,
        meta: {
            title: 'title.compiler'
        }
    }
]
