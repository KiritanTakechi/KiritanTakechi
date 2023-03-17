//const accessToken = process.env.GITHUB_ACCESS_TOKEN;
const accessToken = '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';

fetch('https://api.github.com/user/repos', {
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})
    .then(response => response.json())
    .then(data => {
        const totalRepos = data.length;
        document.getElementById('total-repos').innerText = totalRepos;
    })
    .catch(error => console.error(error));

fetch('https://api.github.com/user/repos', {
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})
    .then(response => response.json())
    .then(data => {
        const languages = data.map(repo => repo.language);
        const mostUsedLanguage = getMostCommon(languages);
        document.getElementById('most-used-language').innerText = mostUsedLanguage;
    })
    .catch(error => console.error(error));

fetch('https://api.github.com/users/chatgpt/events', {
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})
    .then(response => response.json())
    .then(data => {
        const lastYear = new Date(Date.now() - 31536000000);
        const contributions = data.filter(event => new Date(event.created_at) > lastYear && event.type === 'PushEvent').length;
        document.getElementById('contributions').innerText = contributions;
    })
    .catch(error => console.error(error));

function getMostCommon(array) {
    const counts = {};
    let max = 0;
    let result = '';

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element) {
            if (counts[element]) {
                counts[element]++;
            } else {
                counts[element] = 1;
            }
            if (counts[element] > max) {
                max = counts[element];
                result = element;
            }
        }
    }

    return result;
}