document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.iconbar-horizontal');
    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px) translateX(-50%)';

    setTimeout(() => {
        header.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0) translateX(-50%)';
    }, 100);

    const homeButton = document.getElementById('home-btn');
    const downloadButton = document.getElementById('download-btn');
    const allButtons = document.querySelectorAll('.iconbar-horizontal .nav-item');
    const downloadsSection = document.getElementById('downloads-section');

    allButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.18) translateY(-2px)';
            button.style.boxShadow = '0 8px 20px #ff444499';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1) translateY(0)';
            button.style.boxShadow = '0 1.2px 6px #0007';
        });

        if (button.id === 'home-btn') {
            button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        else if (button.id === 'download-btn') {
            button.addEventListener('click', () => {
                if (downloadsSection) {
                    window.scrollTo({
                        top: downloadsSection.offsetTop - header.offsetHeight - 20,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Blog Loading Logic
    const blogContainer = document.getElementById('blog-container');
    if (blogContainer) {
        fetch('posts/posts.json')
            .then(response => response.json())
            .then(posts => {
                blogContainer.innerHTML = ''; // Clear loading message
                posts.forEach(post => {
                    const postElement = document.createElement('article');
                    postElement.className = 'blog-post';
                    
                    const titleElement = document.createElement('h2');
                    titleElement.textContent = post.title;
                    postElement.appendChild(titleElement);

                    const dateElement = document.createElement('p');
                    dateElement.className = 'post-date';
                    dateElement.textContent = post.date;
                    postElement.appendChild(dateElement);

                    const contentElement = document.createElement('div');
                    contentElement.className = 'post-content';
                    postElement.appendChild(contentElement);

                    fetch(`posts/${post.filename}`)
                        .then(res => res.text())
                        .then(markdown => {
                            if (typeof marked !== 'undefined') {
                                contentElement.innerHTML = marked.parse(markdown);
                            } else {
                                contentElement.textContent = markdown;
                            }
                        });

                    blogContainer.appendChild(postElement);
                });
            })
            .catch(err => {
                console.error('Error loading posts:', err);
                blogContainer.innerHTML = '<p>Error al cargar los artículos.</p>';
            });
    }
});