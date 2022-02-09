var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/ktotam1/ktotam1.github.io', // Update to point to your repository  
        user: {
            name: 'ktotam1', // update to use your name
            email: 'anithacan01@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)