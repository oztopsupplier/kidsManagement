 // Switch between login/register tabs
        function switchTab(tab) {
            // Update tab styles
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            
            if (tab === 'login') {
                document.querySelector('.auth-tab:nth-child(1)').classList.add('active');
                document.getElementById('login-form').classList.add('active');
            } else {
                document.querySelector('.auth-tab:nth-child(2)').classList.add('active');
                document.getElementById('register-form').classList.add('active');
            }
        }
        
        // Select role
        function selectRole(role) {
            // Update UI selected state
            document.querySelectorAll('.role-option').forEach(opt => opt.classList.remove('selected'));
            document.querySelector(`.role-option[onclick="selectRole('${role}')"]`).classList.add('selected');
            
            // Update radio selected state
            document.getElementById(`role-${role}`).checked = true;
        }
        
        // Validate password length
        function validatePassword() {
            const password = document.getElementById('register-password').value;
            const lengthIcon = document.getElementById('length-icon');
            const lengthText = document.getElementById('length-text');
            
            if (password.length >= 6) {
                lengthIcon.className = 'fas fa-check-circle requirement-met';
                lengthIcon.style.color = '#4CAF50';
                lengthText.style.color = '#4CAF50';
                lengthText.innerHTML = '✓ At least 6 characters';
                return true;
            } else {
                lengthIcon.className = 'fas fa-times-circle requirement-not-met';
                lengthIcon.style.color = '#f44336';
                lengthText.style.color = '#666';
                lengthText.innerHTML = 'At least 6 characters';
                return false;
            }
        }
        
        // Check password match
        function checkPasswordMatch() {
            const password = document.getElementById('register-password').value;
            const confirm = document.getElementById('register-confirm').value;
            const matchIcon = document.getElementById('match-icon');
            const matchText = document.getElementById('match-text');
            
            if (password && confirm && password === confirm) {
                matchIcon.className = 'fas fa-check-circle requirement-met';
                matchIcon.style.color = '#4CAF50';
                matchText.style.color = '#4CAF50';
                matchText.innerHTML = '✓ Passwords match';
                return true;
            } else if (confirm) {
                matchIcon.className = 'fas fa-times-circle requirement-not-met';
                matchIcon.style.color = '#f44336';
                matchText.style.color = '#666';
                matchText.innerHTML = 'Passwords must match';
                return false;
            } else {
                matchIcon.className = 'fas fa-circle requirement-not-met';
                matchIcon.style.color = '#999';
                matchText.style.color = '#666';
                matchText.innerHTML = 'Passwords must match';
                return false;
            }
        }
        
        // Simulate login
        function login() {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (!email || !password) {
                alert('Please enter both email and password');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate successful login
            showNotification('Sign in successful! Redirecting to dashboard...', 'success');
            
            // Simulate API call delay
            setTimeout(() => {
                // Randomly simulate parent or child role
                const role = Math.random() > 0.5 ? 'parent' : 'child';
                if (role === 'parent') {
                    window.location.href = 'parent-dashboard.html';
                } else {
                    window.location.href = 'child-dashboard.html';
                }
            }, 1000);
        }
        
        // Simulate registration
        function register() {
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirm = document.getElementById('register-confirm').value;
            const role = document.querySelector('input[name="role"]:checked');
            
            // Validation
            if (!name || !email || !password || !confirm || !role) {
                alert('Please fill in all required fields and select a role');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            if (!validatePassword()) {
                alert('Password must be at least 6 characters long');
                return;
            }
            
            if (!checkPasswordMatch()) {
                alert('Passwords do not match');
                return;
            }
            
            // Simulate successful registration
            showNotification(`Account created successfully! Welcome to KindLink, ${name}!`, 'success');
            
            // Simulate API call delay
            setTimeout(() => {
                // Automatically switch to login tab
                switchTab('login');
                // Pre-fill email field
                document.getElementById('login-email').value = email;
            }, 1500);
        }
        
        // Show forgot password modal
        function showForgotPassword() {
            const email = prompt('Please enter your email address to reset your password:');
            if (email) {
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(email)) {
                    showNotification('Password reset instructions have been sent to your email.', 'info');
                } else {
                    alert('Please enter a valid email address');
                }
            }
        }
        
        // Show notification
        function showNotification(message, type) {
            // Create notification element
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
                color: white;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                font-weight: 600;
                animation: slideIn 0.3s ease-out;
            `;
            
            // Add keyframes for animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            
            notification.textContent = message;
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-out forwards';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
        
        // Switch to Chinese version
        function switchToChinese() {
            showNotification('Switching to Chinese version...', 'info');
            setTimeout(() => {
                // In a real app, this would redirect to the Chinese version
                // For demo, we'll just show a message
                alert('This would redirect to the Chinese version in a real application.');
            }, 500);
        }
        
        // Initialize: default select parent role
        window.onload = function() {
            selectRole('parent');
            
            // Demo credentials for easy testing
            document.getElementById('login-email').value = 'demo@KindLink.com';
            document.getElementById('login-password').value = 'demo123';
        };