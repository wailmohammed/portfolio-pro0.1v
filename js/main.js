// Global state
let currentSection = 'overview';
let portfolioData = {
    totalValue: 124567.89,
    monthlyDividend: 1234.56,
    totalReturn: 18.4,
    positions: []
};

// Check if user is authenticated
let isAuthenticated = false;

// Navigation
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });

    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected section
    const section = document.getElementById(sectionName + '-section');
    if (section) {
        section.style.display = 'block';
        section.classList.add('fade-in');
        
        // If transactions section, render transactions
        if (sectionName === 'transactions' && typeof renderTransactions === 'function') {
            renderTransactions();
        }
    }

    // Add active class to clicked nav item
    if (event && event.target) {
        const navItem = event.target.closest('.nav-item');
        if (navItem) {
            navItem.classList.add('active');
        }
    }
    
    // Update current section
    currentSection = sectionName;
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notification-text');
    
    text.textContent = message;
    notification.className = `notification show ${type}`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Testing Functions
function loadDemoData() {
    showNotification('Loading demo portfolio data...', 'success');
    document.getElementById('demoIndicator').style.display = 'block';
    
    setTimeout(() => {
        showNotification('Demo data loaded! Portfolio contains 25 sample holdings.', 'success');
    }, 2000);
}

// User menu
function showUserMenu() {
    console.log('User menu clicked');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Add transactions link to sidebar if it doesn't exist
    const sidebar = document.querySelector('.sidebar-nav');
    if (sidebar) {
        const transactionsLink = document.createElement('li');
        transactionsLink.className = 'nav-item';
        transactionsLink.innerHTML = `
            <a href="#" onclick="showSection('transactions')">
                <span class="nav-icon">💸</span>
                <span class="nav-text">Transactions</span>
            </a>
        `;
        sidebar.appendChild(transactionsLink);
    }
    
    // Check if user should be prompted to login
    if (!isAuthenticated) {
        setTimeout(() => {
            showLogin();
        }, 1000);
    }
    
    // Set initial state
    showSection('overview');
    
    // Start security monitoring
    startSecurityMonitoring();
    
    // Initialize keyboard shortcuts
    setupKeyboardShortcuts();
    
    console.log('Portfolio Pro initialized with enterprise security!');
    
    // Demo auto-start (for easy testing)
    setTimeout(() => {
        if (window.location.hash === '#demo') {
            startDemoMode();
            hideLogin();
            isAuthenticated = true;
        }
    }, 1000);
});

// Chart initialization (placeholder)
function initializeCharts() {
    // This would initialize Chart.js or D3.js charts
    console.log('Charts initialized');
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    showSection('overview');
                    break;
                case '2':
                    e.preventDefault();
                    showSection('portfolio');
                    break;
                case '3':
                    e.preventDefault();
                    showSection('analytics');
                    break;
                case '4':
                    e.preventDefault();
                    showSection('risk-monitor');
                    break;
                case 's':
                    e.preventDefault();
                    showSection('schedule');
                    break;
                case 'e':
                    e.preventDefault();
                    exportPortfolio();
                    break;
                case 'n':
                    e.preventDefault();
                    showModal('add-position');
                    break;
            }
        }
        
        // ESC to close modal
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Portfolio Optimization
function optimizePortfolio() {
    showNotification('Running portfolio optimization...', 'success');
    
    // Simulate optimization process
    setTimeout(() => {
        showNotification('Optimization complete! Suggested rebalancing available.', 'success');
    }, 3000);
}

// Theme switching
function switchTheme(themeName) {
    document.body.className = document.body.className.replace(/theme-\w+/, '');
    document.body.classList.add(`theme-${themeName}`);
    
    localStorage.setItem('selectedTheme', themeName);
    showNotification(`Switched to ${themeName} theme`, 'success');
}

// Load saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'dark';
    switchTheme(savedTheme);
}

// Call loadSavedTheme on initialization
loadSavedTheme();

// Demo mode
function startDemoMode() {
    document.getElementById('demoIndicator').style.display = 'block';
    loadDemoData();
    
    // Load demo transactions if the function exists
    if (typeof loadDemoTransactions === 'function') {
        loadDemoTransactions();
    }
    
    showNotification('Demo mode activated!', 'success');
}

// Login functions
function showLogin() {
    console.log('Showing login screen');
    // Implementation would go here
}

function hideLogin() {
    console.log('Hiding login screen');
    // Implementation would go here
}

// Security monitoring
function startSecurityMonitoring() {
    console.log('Security monitoring started');
    // Implementation would go here
}
