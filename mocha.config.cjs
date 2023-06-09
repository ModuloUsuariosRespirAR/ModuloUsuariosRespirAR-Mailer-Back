module.exports = {
    extension: ['js'],
    require: ['@babel/register'],
    recursive: true,
    timeout: 3000,
    reporter: 'spec',
    spec: './tests'
};
