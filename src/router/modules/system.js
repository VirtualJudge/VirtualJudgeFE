import AdvancedIndex from "@/components/system/AdvancedIndex";
import ManageProblem from "@/components/system/problem/ManageProblem";
import AddProblem from "@/components/system/problem/AddOrUpdateProblem";
import UpdateProblem from "@/components/system/problem/AddOrUpdateProblem";
import ManageUserIndex from "@/components/system/user/Index"
import ManagePermissionIndex from "@/components/system/permission/Index"

export default [
    {
        path: '/system',
        name: 'system',
        component: AdvancedIndex,
        meta: {
            title: '系统设置'
        },
        children: [
            {
                path: 'manage_user',
                name: 'manage_user',
                component: ManageUserIndex,
                meta: {
                    title: 'pages.system.manage_user',
                    requireAdmin: true
                }
            },
            {
                path: 'manage_permission',
                name: 'manage_permission',
                component: ManagePermissionIndex,
                meta: {
                    title: 'pages.system.manage_permission',
                    requireAdmin: true
                }
            },
            {
                path: 'manage_problem',
                name: 'manage_problem',
                component: ManageProblem,
                meta: {
                    title: 'pages.system.manage_problem',
                    requireAdmin: true
                }
            },
            {
                path: 'add_problem',
                name: 'add_problem',
                component: AddProblem,
                meta: {
                    title: '新增题目',
                    requireAdmin: true
                }
            },
            {
                path: 'update_problem/:id',
                name: 'update_problem',
                component: UpdateProblem,
                meta: {
                    title: '更新题目',
                    requireAdmin: true
                }
            }
        ]
    },
]
