// Javascript code 

        // Recent Message Data :-----------
 
        const messages = [
        { 
            id: 1,
            text: "Hey, how are you doing today?", 
            sender: "Hitendra Kumar Dewangan", 
            time: "10:30 AM", 
            date: "Today",
            avatar: "HD"
        },
        { 
            id: 2,
            text: "Adishwar, can you send me the report by EOD?", 
            sender: "Rohit Kumar Sah", 
            time: "2:45 PM",
            date: "Yesterday", 
            avatar: "RS"
        },
        { 
            id: 3,
            text: "I'm working on the chat search engine project. The UI is coming along nicely!", 
            sender: "You", 
            date: "Yesterday", 
            time: "11:20 AM",
            avatar: "ME",
            isYou: true
        },
        { 
            id: 4,
            text: "Can you send me the latest chat history file? I need it for testing.", 
            sender: "Ankit Kumar", 
            date: "May 10", 
            time: "4:15 PM",
            avatar: "AK"
        },
        { 
            id: 5,
            text: "Don't forget the team meeting at 3 PM in Conference Room B.", 
            sender: "Sandeep Kumar", 
            date: "May 9", 
            time: "9:00 AM",
            avatar: "SK"
        },
        { 
            id: 6,
            text: "Let's catch up over a call later! I have some ideas to discuss.", 
            sender: "Rayyan Hussain", 
            date: "May 8", 
            time: "5:30 PM",
            avatar: "RH"
        },
        { 
            id: 7,
            text: "The weather today is really nice! Perfect for a lunch outside.", 
            sender: "Ankit Kumar", 
            date: "May 8", 
            time: "12:15 PM",
            avatar: "AK"
        },
        { 
            id: 8,
            text: "Did you check out the new movie that released last weekend?", 
            sender: "Anuj Kumar", 
            date: "May 7", 
            time: "7:45 PM",
            avatar: "AK"
        },
        { 
            id: 9,
            text: "Working on the inverted index implementation now. Should improve search performance significantly.", 
            sender: "You", 
            date: "May 6", 
            time: "3:10 PM",
            avatar: "ME",
            isYou: true
        },
        { 
            id: 10,
            text: "Let's meet at the cafeteria in 10 mins. Need to discuss the project timeline.", 
            sender: "Raj Kumar", 
            date: "May 5", 
            time: "1:50 PM",
            avatar: "RK"
        },
        { 
            id: 11,
            text: "Search functionality is almost complete! Just need to polish the UI.", 
            sender: "You", 
            date: "May 4", 
            time: "6:30 PM",
            avatar: "ME",
            isYou: true
        }
        ];

        function normalText(text) {
    return text.toLowerCase();
}
// Function to highlight search matches in messages
function highlightMatch(message, query) {
    if (!query) return message;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()[\]\\]/g, '\\$&')})`, 'gi');
    return message.replace(regex, '<span class="highlight">$1</span>');
}

function handleSearch() {
    const query = normalText(document.getElementById('searchInput').value.trim());
    const results = document.getElementById('results');
    const count = document.getElementById('resultsCount');

    // Add loading animation
    results.innerHTML = `
        <div class="py-y text-center">
            <div class="spinner-border text-primary mb-3" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="">Searching Messages....</p>
        </div>        
    `;
    
    setTimeout(() => {
        if (!query) {
            count.innerHTML = '0 results';
            results.innerHTML = `
            <div class="text-center no-results mt-5 pt-4">
                <i class="bi bi-search-heart"></i>
                <p class="mt-3 text-muted">Enter a search term to find messages</p>
            </div>
            `;
            return;
        }

        // Filter messages based on the search query
        const matches = messages.filter(msg => normalText(msg.text).includes(query));
        count.innerHTML = `${matches.length} result${matches.length !== 1 ? 's' : ''}`;

        if (matches.length === 0) {
            results.innerHTML = `
                <div class="text-center no-results mt-5 pt-4 animate__animated animate__fadeIn">
                    <i class="bi bi-x-circle"></i>
                    <h5 class="mt-3">No messages found</h5>
                    <p class="text-muted">Try different keywords or check your spelling</p>
                </div>
            `;
        } else {
            results.innerHTML = matches.map(msg => `
                <div class="message-card animate__animated animate__fadeIn">
                    <div class="message-meta">
                        <div class="d-flex align-items-center">
                            <div class="user-avatar" style="${msg.isYou ? 'background-color: #e0f2fe; color: #0369a1;' : ''}">
                                ${msg.avatar}
                             </div>
                            <div>
                                <strong>${msg.sender}</strong>
                                <div class="text-muted small">${msg.time} · ${msg.date}</div>
                            </div>
                        </div>
                    </div>
                    <div class="message-content">${highlightMatch(msg.text, query)}</div>
                </div>
            `).join('');
        }
    }, 600);
}
    // Function to render recent messages
    function renderRecentMessages() {
        const container = document.getElementById('chatMessages');
        // Simulate Loading delay
       setTimeout(() => {
        container.innerHTML = messages.slice().reverse().map(msg => `
        <div class="message-card px-3 py-2 mx-2 my-2">
            <div class="d-flex align-items-center mb-2">
                <div class="user-avatar" style="${msg.isYou ? 'background-color: #e0f2fe; color: #0369a1;' : ''}">
                ${msg.avatar}
            </div>
            <div class="ms-2">
                <strong>${msg.sender}</strong>
                <span class="text-muted small ms-2">${msg.date}</span>
            </div>
        </div>
    <div class="message-content">${msg.text.length > 60 ? msg.text.substring(0, 60) + '...' : msg.text}</div>
    </div>
      `).join('');
    }, 800);
    
    document.getElementById('messageCount').innerText = messages.length;
  }

  // Debounce search function
    let searchTimer;
        function debounceSearch() {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(handleSearch, 500);
        }

    document.getElementById('searchButton').addEventListener('click', handleSearch);
    document.getElementById('searchInput').addEventListener('input', debounceSearch);
    document.getElementById('searchInput').addEventListener('keypress', e => {
        if (e.key === 'Enter') handleSearch();
    });

  // Initialize
    renderRecentMessages();
  
  // Focus search input on page load
    document.getElementById('searchInput').focus();
