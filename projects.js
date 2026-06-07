const GITHUB_USERNAME = 'LWVader';
const featuredProjects = ['Resume', 'Ecommerce-Website-build', 'About-Me-HTML'];

async function fetchGitHubProjects() {
    const container = document.getElementById('projects-container');
    const button = document.getElementById('load-projects-btn');
    
    
    container.innerHTML = '<p>Loading projects...</p>';
    button.disabled = true; 
    button.innerText = 'Loading...';
    
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        const filteredRepos = repos.filter(repo => featuredProjects.includes(repo.name));
        
        container.innerHTML = '';
        
        filteredRepos.forEach((repo, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = `proj${index + 1}`; 
            
            projectCard.innerHTML = `
                <h3>${repo.name}</h3>
                <a href="${repo.html_url}" target="_blank">GitHub Repository</a>
                <p>${repo.description || 'No description provided.'}</p>
            `;
            
            container.appendChild(projectCard);
        });

        
        button.style.display = 'none';

    } catch (error) {
        console.error('Error fetching projects:', error);
        container.innerHTML = `<p>Failed to load projects. You can view them directly on <a href="https://github.com/LWVader" target="_blank">GitHub</a>.</p>`;
        
       
        button.disabled = false;
        button.innerText = 'Retry Loading Projects';
    }
}


document.getElementById('load-projects-btn').addEventListener('click', fetchGitHubProjects);