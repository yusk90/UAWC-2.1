({
    appDir: '../js',
    mainConfigFile: '../js/common.js',
    dir: '../dist/js',
    modules: [
        {
            name: 'common',
            include: ['jquery',
                      'underscore',
                      'backbone',
                      'localstorage',
                      'helpers',
                      'BaseView',
                      'UserModel',
                      'UsersCollection',
                      'users'
            ]
        },
        {
            name: 'index-script',
            include: ['app/index-init'],
            exclude: ['common']
        },
        {
            name: 'signin-script',
            include: ['app/signin-init'],
            exclude: ['common']
        },
        {
            name: 'theme-script',
            include: ['app/theme-init'],
            exclude: ['common']
        },
        {
            name: 'constructor-script',
            include: ['app/constructor-init'],
            exclude: ['common']
        }
    ]
})
