// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const loginBtn = document.querySelector('.login-btn');
    const profileBtns = document.querySelectorAll('.profile-btn');
    const createAccountLink = document.querySelector('.create-account');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const formGroups = document.querySelectorAll('.form-group');

    // Estados da aplicação
    let isLoading = false;

    // Função para simular loading
    function setLoading(state) {
        isLoading = state;
        if (state) {
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;
        } else {
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
        }
    }

    // Função para validar email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Função para validar formulário
    function validateForm() {
        let isValid = true;
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Reset erros anteriores
        clearErrors();

        // Validar email
        if (!email) {
            showError(emailInput, 'Email é obrigatório');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailInput, 'Email inválido');
            isValid = false;
        }

        // Validar senha
        if (!password) {
            showError(passwordInput, 'Senha é obrigatória');
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordInput, 'Senha deve ter pelo menos 6 caracteres');
            isValid = false;
        }

        return isValid;
    }

    // Função para mostrar erro
    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        
        // Criar ou atualizar mensagem de erro
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    // Função para limpar erros
    function clearErrors() {
        formGroups.forEach(group => {
            group.classList.remove('error');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    }

    // Função para simular login
    async function simulateLogin(email, password) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulação de resposta da API
                const success = email === 'luxvus@nexups.com' && password === '123456';
                resolve(success);
            }, 2000);
        });
    }

    // Função para animação de clique
    function animateClick(element) {
        element.style.transform = 'scale(0.98)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);
    }

    // Event Listener para o botão de login
    loginBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        
        if (isLoading) return;
        
        animateClick(this);

        // Validar formulário
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Simular chamada à API
            const loginSuccess = await simulateLogin(email, password);

            if (loginSuccess) {
                // Login bem-sucedido
                showNotification('Login realizado com sucesso!', 'success');
                
                // Redirecionar após sucesso
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
            } else {
                // Login falhou
                showNotification('Email ou senha incorretos', 'error');
                setLoading(false);
            }

        } catch (error) {
            console.error('Erro no login:', error);
            showNotification('Erro ao fazer login. Tente novamente.', 'error');
            setLoading(false);
        }
    });

    // Event Listeners para os botões de perfil
    profileBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (isLoading) return;
            
            animateClick(this);
            const profileType = this.textContent;
            
            // Preencher automaticamente baseado no tipo de perfil
            if (profileType === 'Perfil Empresa') {
                emailInput.value = 'empresa@nexus.com';
                passwordInput.value = 'empresa123';
            } else if (profileType === 'Perfil Estudante') {
                emailInput.value = 'estudante@nexus.com';
                passwordInput.value = 'estudante123';
            }
            
            // Focar no campo de senha após preenchimento automático
            passwordInput.focus();
            
            showNotification(`Perfil ${profileType} selecionado`, 'info');
        });
    });

    // Event Listener para criar conta
    createAccountLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (isLoading) return;
        
        animateClick(this);
        showNotification('Redirecionando para cadastro...', 'info');
        
        // Simular redirecionamento
        setTimeout(() => {
            window.location.href = '/cadastro';
        }, 1000);
    });

    // Event Listeners para validação em tempo real
    emailInput.addEventListener('input', function() {
        if (this.value.trim()) {
            clearErrors();
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.value.trim()) {
            clearErrors();
        }
    });

    // Event Listeners para melhorar UX
    emailInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    emailInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });

    passwordInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    passwordInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });

    // Permitir login com Enter
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !isLoading) {
            loginBtn.click();
        }
    });

    // Sistema de notificações
    function showNotification(message, type = 'info') {
        // Remover notificação anterior se existir
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Estilos da notificação
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            animation: 'slideIn 0.3s ease-out',
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        });

        // Cores baseadas no tipo
        const colors = {
            success: '#10b981',
            error: '#ff4f5a',
            info: '#3b82f6',
            warning: '#f59e0b'
        };

        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Remover automaticamente após 4 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 4000);
    }

    // Adicionar estilos de animação para notificações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification {
            font-family: 'Poppins', sans-serif;
        }
    `;
    document.head.appendChild(style);

    // Função para toggle de visibilidade da senha (extra)
    function togglePasswordVisibility() {
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.innerHTML = '👁️';
        toggleBtn.style.background = 'none';
        toggleBtn.style.border = 'none';
        toggleBtn.style.position = 'absolute';
        toggleBtn.style.right = '10px';
        toggleBtn.style.top = '50%';
        toggleBtn.style.transform = 'translateY(-50%)';
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.style.color = '#b0b0b0';
        
        passwordInput.parentElement.style.position = 'relative';
        passwordInput.parentElement.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.innerHTML = '🔒';
            } else {
                passwordInput.type = 'password';
                this.innerHTML = '👁️';
            }
        });
    }

    // Inicializar funcionalidades extras
    togglePasswordVisibility();

    // Debug helper (remover em produção)
    console.log('NEXUS Login System initialized');
    console.log('Demo credentials:');
    console.log('Email: luxvus@nexups.com | Senha: 123456');
    console.log('Ou use os botões de perfil para preenchimento automático');
});

// Funções utilitárias globais (opcional)
window.NEXUS = {
    version: '1.0.0',
    environment: 'development',
    
    // Função para verificar status do servidor
    checkServerStatus: async function() {
        try {
            const response = await fetch('/api/health');
            return response.ok;
        } catch (error) {
            return false;
        }
    },
    
    // Função para limpar formulário
    clearForm: function() {
        document.querySelector('input[type="email"]').value = '';
        document.querySelector('input[type="password"]').value = '';
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => error.textContent = '');
    }
};