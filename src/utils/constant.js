export const PROBLEM_PUBLIC_TYPE = [
    {
        name: '允许提交和查看',
        short: 'r-x',
        iconType: 'md-checkmark-circle',
        color: '#19be6b'
    },
    {
        name: '允许查看',
        short: 'r--',
        iconType: 'md-alert',
        color: '#ff9900'
    },
    {
        name: '不允许查看和提交',
        short: '---',
        iconType: 'md-close-circle',
        color: '#ed4014'
    }
]


export const PROBLEM_SUBMIT_LANGUAGES = {
    'a': {info: '选择语言，默认全部', disabled: true},
    'c': {
        info: 'C (GCC 9.3.0)',
        short: 'C',
        withVersion: 'GCC 9.3.0',
        disabled: false
    },
    'cpp': {
        info: 'C++ (G++ 9.3.0)',
        short: 'C++',
        withVersion: 'G++ 9.3.0',
        disabled: false
    },
    'java': {
        info: 'Java (OpenJDK 14.0.1)',
        short: 'Java',
        withVersion: 'OpenJDK 14.0.1',
        disabled: false
    },
    'python': {
        info: 'Python (Python 3.8.2)',
        short: 'Python',
        withVersion: 'Python 3.8.2',
        disabled: false
    },
    'go': {
        info: 'Go (Go 1.13.8)',
        short: 'Go',
        withVersion: 'Go 1.13.8',
        disabled: false
    },
    'kotlin': {
        info: 'Kotlin (Kotlin 1.4.10)',
        short: 'Kotlin',
        withVersion: 'Kotlin 1.4.10',
        disabled: false
    }
}
export const SUBMISSION_VERDICTS = {
    'A': {info: '选择状态，默认全部'},
    'P': {info: 'Pending', color: 'default'},
    'R': {info: 'Running', color: 'green'},
    'AC': {info: 'Accepted', color: 'success'},
    'PE': {info: 'Presentation Error', color: 'warning'},
    'TLE': {info: 'Time Limit Exceeded', color: '#FFA2D3'},
    'MLE': {info: 'Memory Limit Exceeded', color: '#FFA2D3'},
    'WA': {info: 'Wrong Answer', color: '#FFA2D3'},
    'RE': {info: 'Runtime Error', color: '#FFA2D3'},
    'OLE': {info: 'Output Limit Exceeded', color: '#FFA2D3'},
    'CE': {info: 'Compile Error', color: 'warning'},
    'SE': {info: 'System Error', color: '#FFA2D3'},
    // 判题机正在同步测试数据的标志
    'SYNC': {info: 'Compiler Data Syncing', color: 'primary'}
}
export const STORAGE_PROFILE_KEY = '_profile'
export const PERMISSIONS = {
    MANAGE_PROBLEM: 'problem.manage_problem',
    MANAGE_USER: 'problem.manage_user'
}
export const VALID_SCHOOLS = {
    'WUST': '武汉科技大学',
    'OTHER': '其他'
}
export const STORAGE = {
    PROBLEM_LANGUAGE_KEY: '_problem_language_key'
}
export const SITE_INFO = {
    default: "OJ",
    short: "OJ"
}
