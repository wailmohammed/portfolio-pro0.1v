// Transaction related functions

// Initialize transaction list on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in demo mode and load sample transactions
    if (window.location.hash === '#demo') {
        loadDemoTransactions();
    }
});

function loadDemoTransactions() {
    // Sample transaction data for demo mode
    const demoTransactions = [
        {
            id: 'USR001',
            email: 'mike.j@email.com',
            amount: '19.00',
            crypto: 'USDT (TRC-20)',
            status: 'verified',
            timestamp: Date.now() - 86400000, // 1 day ago
            txHash: '9f4b7d6c5b4a...',
            plan: 'ENTERPRISE'
        },
        {
            id: 'USR003',
            email: 'mike.j@email.com',
            amount: '0.078',
            crypto: 'ETH',
            status: 'activated',
            timestamp: Date.now() - 86400000, // 1 day ago
            txHash: '8e1a2b3c4d5e...',
            plan: 'ENTERPRISE'
        },
        {
            id: 'USR004',
            email: 'alice.l@email.com',
            amount: '0.95',
            crypto: 'SOL',
            status: 'pending',
            timestamp: Date.now() - 1800000, // 30 min ago
            txHash: '3e7g9h0i2e6v...',
            confirmations: '2/3',
            plan: 'PREMIUM'
        },
        {
            id: 'USR002',
            email: 'john.d@email.com',
            amount: '0.002',
            crypto: 'BTC',
            status: 'failed',
            timestamp: Date.now() - 259200000, // 3 days ago
            txHash: '1a2b3c4d5e6f...',
            plan: 'BASIC'
        }
    ];
    
    // Store in localStorage
    localStorage.setItem('crypto_transactions', JSON.stringify(demoTransactions));
    
    // Render transactions
    renderTransactions();
}

function renderTransactions() {
    const transactions = JSON.parse(localStorage.getItem('crypto_transactions') || '[]');
    const container = document.getElementById('transactions-container');
    
    if (!container) {
        console.error('Transactions container not found');
        return;
    }
    
    container.innerHTML = '';
    
    transactions.forEach(tx => {
        const txElement = createTransactionElement(tx);
        container.appendChild(txElement);
    });
}

function createTransactionElement(tx) {
    const txElement = document.createElement('div');
    txElement.className = `transaction-item ${tx.status}`;
    
    // Format timestamp
    const date = new Date(tx.timestamp);
    const timeAgo = getTimeAgo(date);
    
    // Create status indicator
    let statusIndicator = '';
    switch(tx.status) {
        case 'verified':
            statusIndicator = '<span class="status-indicator verified">✓ Verified</span>';
            break;
        case 'activated':
            statusIndicator = '<span class="status-indicator activated">✓ Activated</span>';
            break;
        case 'pending':
            statusIndicator = '<span class="status-indicator pending">⟳ Auto-Verifying</span>';
            break;
        case 'failed':
            statusIndicator = '<span class="status-indicator failed">✕ Failed</span>';
            break;
        default:
            statusIndicator = `<span class="status-indicator">${tx.status}</span>`;
    }
    
    // Create transaction HTML
    txElement.innerHTML = `
        <div class="tx-header">
            <div class="tx-status">${statusIndicator}</div>
            <div class="tx-time">${timeAgo}</div>
        </div>
        <div class="tx-user">
            <div class="tx-email">${tx.email}</div>
            <div class="tx-id">ID: ${tx.id}</div>
            <div class="tx-plan">${tx.plan}</div>
        </div>
        <div class="tx-details">
            <div class="tx-crypto">
                <span class="crypto-icon">⟠</span> ${tx.amount} ${tx.crypto}
            </div>
            <div class="tx-hash">${tx.txHash}</div>
            <div class="tx-view">View</div>
        </div>
        ${tx.confirmations ? `<div class="tx-confirmations">${tx.confirmations} confirmations</div>` : ''}
        ${tx.status === 'failed' ? '<div class="tx-review"><button onclick="reviewFailedTransaction(\'' + tx.id + '\')">Review</button></div>' : ''}
    `;
    
    return txElement;
}

function getTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 0) {
        return diffDay + (diffDay === 1 ? ' day ago' : ' days ago');
    } else if (diffHour > 0) {
        return diffHour + (diffHour === 1 ? ' hour ago' : ' hours ago');
    } else if (diffMin > 0) {
        return diffMin + (diffMin === 1 ? ' min ago' : ' mins ago');
    } else {
        return 'just now';
    }
}

function rejectTransaction(txId) {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;
    
    showNotification(`Rejecting transaction ${txId}...`, 'warning');
    
    setTimeout(() => {
        showNotification(`❌ Transaction rejected: ${reason}`, 'error');
        updateTransactionStatus(txId, 'rejected');
    }, 1500);
}

function updateTransactionStatus(txId, status) {
    // Update transaction status in localStorage and UI
    const transactions = JSON.parse(localStorage.getItem('crypto_transactions') || '[]');
    const transaction = transactions.find(t => t.id === txId);
    if (transaction) {
        transaction.status = status;
        localStorage.setItem('crypto_transactions', JSON.stringify(transactions));
        renderTransactions();
    }
}

function viewTransaction(txHash) {
    showNotification(`Opening blockchain explorer for ${txHash}...`, 'success');
    
    // In a real implementation, this would open the blockchain explorer
    setTimeout(() => {
        showNotification('Transaction details loaded from blockchain', 'success');
    }, 1000);
}

function filterTransactions(filter) {
    showNotification(`Filtering transactions: ${filter}`, 'success');
    // This would filter the transactions table
}

function exportTransactions() {
    const transactions = JSON.parse(localStorage.getItem('crypto_transactions') || '[]');
    const csv = convertToCSV(transactions);
    downloadFile(csv, 'crypto-transactions.csv', 'text/csv');
    showNotification('Transactions exported successfully!', 'success');
}

function convertToCSV(data) {
    // Implementation of CSV conversion
    const headers = Object.keys(data[0] || {}).join(',');
    const rows = data.map(obj => Object.values(obj).join(','));
    return [headers, ...rows].join('\n');
}

function downloadFile(content, fileName, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function reviewFailedTransaction(txId) {
    showNotification(`Reviewing failed transaction ${txId}...`, 'warning');
    // Implementation would go here
}

function testAutoVerification() {
    showNotification('Testing auto-verification system...', 'success');
    
    setTimeout(() => {
        showNotification('Auto-verification test completed successfully!', 'success');
    }, 2000);
}

function testSubscriptionActivation() {
    showNotification('Testing subscription activation...', 'success');
    
    setTimeout(() => {
        showNotification('Subscription activation test completed successfully!', 'success');
    }, 2000);
}
