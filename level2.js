document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bg-music');
    const gameOverlay = document.getElementById('game-overlay');
    const startGameBtn = document.getElementById('start-game');
    const mapItems = document.querySelectorAll('.map-item');
    const scrollModal = document.getElementById('scroll-modal');
    const scrollText = document.getElementById('scroll-text');
    const closeScrollBtn = document.querySelector('.close-scroll');
    const proceedToPuzzleBtn = document.getElementById('proceed-to-puzzle');
    const progressTracker = document.createElement('div'); // Progress Tracker
    const memoryStories = {
        'jade-pendant': {
            title: "The Jade Pendant",
            content: "A delicate jade pendant, worn by time. Once a symbol of royal privilege, now a fragment of a forgotten past. Its intricate carvings tell of a prince's solitary journey, etched with memories of love and loss."
        },
        'scroll-fragment': {
            title: "The Forgotten Scroll",
            content: "Fragments of an ancient text, barely legible. Whispers of a kingdom lost to time, of a celestial prince stripped of everything but his unbreakable spirit. Each torn edge holds a secret waiting to be understood."
        },
        'silver-ornament': {
            title: "The Silver Ornament",
            content: "A silver hair ornament, tarnished by centuries. Its delicate craftsmanship speaks of refined beauty, now a silent witness to immortal sorrow. Each bend and curve tells a story of endurance beyond mortal comprehension."
        }
    };

    const collectedItems = new Set(); // Track collected items
    const totalItems = Object.keys(memoryStories).length;

    // Setup progress tracker
    progressTracker.id = 'progress-tracker';
    progressTracker.style.position = 'fixed';
    progressTracker.style.top = '20px';
    progressTracker.style.left = '20px';
    progressTracker.style.color = 'var(--tgcf-gold)';
    progressTracker.style.fontSize = '1.2rem';
    document.body.appendChild(progressTracker);
    progressTracker.textContent = `Memories Collected: 0/${totalItems}`;

    // Start Game
    startGameBtn.addEventListener('click', () => {
        gameOverlay.style.display = 'none';
        bgMusic.play();
    });

    // Handle item collection
    mapItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemKey = item.dataset.item;

            // Prevent duplicate collection
            if (collectedItems.has(itemKey)) return;

            // Mark as collected
            item.classList.add('collected');
            collectedItems.add(itemKey);

            // Update progress tracker
            progressTracker.textContent = `Memories Collected: ${collectedItems.size}/${totalItems}`;

            // Update the collected item tracker UI
            const trackerItem = document.getElementById(`item-${itemKey}`);
            trackerItem.classList.add('active');

            // Show scroll modal
            scrollText.innerHTML = `
                <h2>${memoryStories[itemKey].title}</h2>
                <p>${memoryStories[itemKey].content}</p>
            `;
            scrollModal.style.display = 'block';

            // Check if all items are collected
            if (collectedItems.size === totalItems) {
                setTimeout(() => {
                    alert("You've collected all the memories! Prepare for a surprise.");
                    proceedToPuzzleBtn.style.display = 'block';
                    window.location.href = 'final.html';  // Show puzzle button
                }, 1000);
            }
        });
    });

    // Close scroll modal
    closeScrollBtn.addEventListener('click', () => {
        scrollModal.style.display = 'none';
    });

    // Proceed to puzzle (final step of the level)
    // proceedToPuzzleBtn.addEventListener('click', () => {
    //     alert('Prepare for the next journey.');
    //     window.location.href = 'crown-puzzle.html'; // Load the puzzle page
    // });

    // Optional: Logic for Next Level Button
    const nextLevelButton = document.getElementById('next-level-button');
    if (nextLevelButton) {
        nextLevelButton.addEventListener('click', () => {
            if (collectedItems.size === totalItems) {
                alert('Level Complete! Prepare for the next journey.');
                window.location.href = 'crown-puzzle.html'; // Redirect to the next level
            } else {
                alert('You need to collect all items to proceed!');
            }
        });
    }
});
