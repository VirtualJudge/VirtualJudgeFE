export const PROBLEM_PUBLIC_TYPE = [
    {
        name: '允许提交和查看',
        short: 'r-x'
    },
    {
        name: '允许查看',
        short: 'r--'
    },
    {
        name: '不允许查看和提交',
        short: '---'
    }
]


export const PROBLEM_SUBMIT_LANGUAGES = {
    'c': {info: 'C (GCC 9.3.0)', short: 'C', withVersion: 'GCC 9.3.0'},
    'cpp': {info: 'C++ (G++ 9.3.0)', short: 'C++', withVersion: 'G++ 9.3.0'},
    'java': {info: 'Java (OpenJDK 14.0.1)', short: 'Java', withVersion: 'OpenJDK 14.0.1'},
    'python': {info: 'Python (Python 3.8.2)', short: 'Python', withVersion: 'Python 3.8.2'},
    'go': {info: 'Go (Go 1.13.8)', short: 'Go', withVersion: 'Go 1.13.8'}
}
export const SUBMISSION_VERDICTS = {
    'A': {info: 'All'},
    'P': {info: 'Pending', color: 'default'},
    'R': {info: 'Running', color: 'green'},
    'AC': {info: 'Accepted', color: 'success'},
    'PE': {info: 'Presentation Error', color: 'warning'},
    'TLE': {info: 'Time Limit Exceeded', color: 'error'},
    'MLE': {info: 'Memory Limit Exceeded', color: 'error'},
    'WA': {info: 'Wrong Answer', color: 'error'},
    'RE': {info: 'Runtime Error', color: 'error'},
    'OLE': {info: 'Output Limit Exceeded', color: 'error'},
    'CE': {info: 'Compile Error', color: 'warning'},
    'SE': {info: 'System Error', color: 'error'}
}
export const LANGUAGE_FILTER = [
    {
        label: 'GCC 9.3.0',
        value: 'c'
    },
    {
        label: 'G++ 9.3.0',
        value: 'cpp'
    },
    {
        label: 'Java (OpenJDK 14.0.1)',
        value: 'java'
    },
    {
        label: 'Python (Python 3.8.2)',
        value: 'python'
    },
    {
        label: 'Go (Go 1.13.8)',
        value: 'go'
    },

]
export const VERDICT_FILTER = [
    {
        label: 'Pending',
        value: 'P'
    },
    {
        label: 'Running',
        value: 'R'
    },
    {
        label: 'Accepted',
        value: 'AC'
    },
    {
        label: 'Presentation Error',
        value: 'PE'
    },
    {
        label: 'Time Limit Exceeded',
        value: 'TLE'
    },
    {
        label: 'Memory Limit Exceeded',
        value: 'MLE'
    },
    {
        label: 'Wrong Answer',
        value: 'WA'
    },
    {
        label: 'Runtime Error',
        value: 'RE'
    },
    {
        label: 'Output Limit Exceeded',
        value: 'OLE'
    },
    {
        label: 'Presentation Error',
        value: 'CE'
    },
    {
        label: 'Presentation Error',
        value: 'SE'
    },
]
export const ACCEPT_LOCALES = {
    'CN': {
        moment: 'zh-cn',
        lang: 'zh-hans',
        countryFlag: 'chn',
        updateMessage: '语言切换为中文'
    },
    'UK': {
        moment: 'en',
        lang: 'en',
        countryFlag: 'gbr',
        updateMessage: 'Language change to English'
    }
}
export const DEFAULT_LOCALE = 'UK'
export const STORAGE_LOCALE_KEY = '_locale'
export const STORAGE_PROFILE_KEY = '_profile'
export const PERMISSIONS = {
    MANAGE_PROBLEM: 'problem.manage_problem',
    MANAGE_USER: 'problem.manage_user'
}
