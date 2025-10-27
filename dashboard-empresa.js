// script-dashboard.js

class NexusDashboard {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'page-home';
        this.featuredInterns = [];
        this.allInterns = [];
        this.recentPosts = [];
        this.myPosts = [];
        this.savedInterns = new Set();
        this.notifications = [];
        
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.loadUserData();
            this.loadSampleData();
            this.setupEventListeners();
            this.setupNavigation();
            this.setupSearch();
            this.setupForms();
            this.setupNotifications();
            this.renderCurrentPage();
            
            console.log('🚀 NEXUS Dashboard inicializado com sucesso!');
        });
    }

    // Carregar dados do usuário
    loadUserData() {
        this.currentUser = {
            id: 1,
            name: 'Tech Solutions LTDA',
            email: 'contato@techsolutions.com',
            phone: '(11) 99999-9999',
            sector: 'Tecnologia',
            plan: 'premium',
            joinDate: '2024-01-15',
            description: 'Somos uma empresa de tecnologia focada em soluções inovadoras...',
            avatar: 'TS'
        };

        this.updateUserProfile();
    }

    // Carregar dados de exemplo
    loadSampleData() {
        this.featuredInterns = [
            {
                id: 1,
                name: "Ana Carolina",
                initials: "AC",
                course: "Ciência da Computação - USP",
                skills: ["React", "Node.js", "Python", "TypeScript", "MongoDB"],
                rating: 4.8,
                projects: 12,
                location: "São Paulo, SP",
                availability: "Integral",
                salary: "R$ 2.000 - R$ 2.500",
                bio: "Desenvolvedora full-stack com experiência em React e Node.js. Apaixonada por resolver problemas complexos.",
                contact: "ana.carolina@email.com"
            },
            {
                id: 2,
                name: "Pedro Henrique",
                initials: "PH",
                course: "Engenharia de Software - UNICAMP",
                skills: ["Java", "Spring Boot", "AWS", "Docker", "MySQL"],
                rating: 4.9,
                projects: 8,
                location: "Campinas, SP",
                availability: "Meio período",
                salary: "R$ 1.800 - R$ 2.200",
                bio: "Especialista em desenvolvimento backend com Java. Experiência em arquitetura de microserviços.",
                contact: "pedro.henrique@email.com"
            },
            {
                id: 3,
                name: "Julia Santos",
                initials: "JS",
                course: "Design Digital - UFRJ",
                skills: ["Figma", "UI/UX", "Adobe XD", "Prototipagem", "Design System"],
                rating: 4.7,
                projects: 15,
                location: "Rio de Janeiro, RJ",
                availability: "Integral",
                salary: "R$ 1.900 - R$ 2.400",
                bio: "Designer UX/UI com foco em experiência do usuário. Criativa e detalhista.",
                contact: "julia.santos@email.com"
            }
        ];

        this.allInterns = [
            ...this.featuredInterns,
            {
                id: 4,
                name: "Lucas Oliveira",
                initials: "LO",
                course: "Análise de Sistemas - UFMG",
                skills: ["React Native", "Firebase", "JavaScript", "MongoDB", "Git"],
                rating: 4.6,
                projects: 10,
                location: "Belo Horizonte, MG",
                availability: "Meio período",
                salary: "R$ 1.700 - R$ 2.100",
                bio: "Desenvolvedor mobile com React Native. Experiência em aplicações escaláveis.",
                contact: "lucas.oliveira@email.com"
            },
            {
                id: 5,
                name: "Mariana Costa",
                initials: "MC",
                course: "Sistemas de Informação - UFPR",
                skills: ["Python", "Django", "PostgreSQL", "Docker", "Linux"],
                rating: 4.8,
                projects: 9,
                location: "Curitiba, PR",
                availability: "Integral",
                salary: "R$ 2.100 - R$ 2.600",
                bio: "Desenvolvedora Python com foco em backend. Conhecimento em DevOps e infraestrutura.",
                contact: "mariana.costa@email.com"
            },
            {
                id: 6,
                name: "Rafael Silva",
                initials: "RS",
                course: "Engenharia da Computação - UFRGS",
                skills: ["C++", "Arduino", "IoT", "Python", "Embedded Systems"],
                rating: 4.5,
                projects: 7,
                location: "Porto Alegre, RS",
                availability: "Integral",
                salary: "R$ 2.200 - R$ 2.700",
                bio: "Engenheiro com especialização em sistemas embarcados e IoT. Proativo e analítico.",
                contact: "rafael.silva@email.com"
            }
        ];

        this.recentPosts = [
            {
                id: 1,
                title: "Nova Vaga: Desenvolvedor Front-end Júnior",
                date: "2 horas atrás",
                content: "Estamos buscando um desenvolvedor front-end júnior com experiência em React e TypeScript. Requisitos: HTML5, CSS3, JavaScript avançado.",
                type: "vaga",
                views: 124,
                applications: 8,
                status: "active"
            },
            {
                id: 2,
                title: "Workshop de Carreira em Tecnologia",
                date: "1 dia atrás",
                content: "Participe do nosso workshop gratuito sobre desenvolvimento de carreira em tecnologia. Inscrições abertas!",
                type: "evento",
                views: 89,
                registrations: 23,
                status: "active"
            }
        ];

        this.myPosts = [
            {
                id: 1,
                title: "Desenvolvedor Front-end Júnior",
                date: "Publicado há 2 horas",
                candidates: 8,
                status: "active",
                type: "vaga",
                skills: ["React", "JavaScript", "CSS", "HTML5"],
                salary: "R$ 2.000 - R$ 2.500"
            },
            {
                id: 2,
                title: "Estágio em DevOps",
                date: "Publicado há 3 dias",
                candidates: 12,
                status: "active",
                type: "vaga",
                skills: ["Docker", "AWS", "Linux", "Python"],
                salary: "R$ 1.800 - R$ 2.200"
            },
            {
                id: 3,
                title: "Designer UX/UI Pleno",
                date: "Publicado há 1 semana",
                candidates: 5,
                status: "closed",
                type: "vaga",
                skills: ["Figma", "UI/UX", "Prototipagem"],
                salary: "R$ 3.500 - R$ 4.500"
            }
        ];

        // Carregar salvos do localStorage
        this.loadSavedInterns();
    }

    // Configurar event listeners
    setupEventListeners() {
        // Botão de destaque
        document.getElementById('highlightBtn')?.addEventListener('click', () => {
            this.handleHighlight();
        });

        // Links "Ver todos"
        document.getElementById('seeAllInterns')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showPage('page-interns');
        });

        document.getElementById('seeAllPosts')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showPage('page-posts');
        });

        // Delegation de eventos para ações dinâmicas
        document.addEventListener('click', (e) => {
            this.handleDynamicActions(e);
        });

        // Busca em tempo real
        this.setupRealTimeSearch();
    }

    // Configurar navegação
    setupNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = item.getAttribute('data-page');
                this.showPage(pageId);
            });
        });
    }

    // Configurar busca
    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            let searchTimeout;
            
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.filterInterns(e.target.value, 'featured');
                }, 300);
            });
        }
    }

    // Busca em tempo real para todas as páginas
    setupRealTimeSearch() {
        // Busca na página de estagiários
        const internSearch = document.querySelector('#page-interns .search-input');
        if (internSearch) {
            internSearch.addEventListener('input', (e) => {
                this.filterInterns(e.target.value, 'all');
            });
        }

        // Busca na página de publicações
        const postSearch = document.querySelector('#page-posts .search-input');
        if (postSearch) {
            postSearch.addEventListener('input', (e) => {
                this.filterPosts(e.target.value);
            });
        }
    }

    // Configurar formulários
    setupForms() {
        // Formulário de criação de vaga
        const jobForm = document.getElementById('createJobForm');
        if (jobForm) {
            jobForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleCreateJob(jobForm);
            });
        }

        // Formulário de perfil
        const profileForm = document.querySelector('#page-profile form');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleProfileUpdate(profileForm);
            });
        }
    }

    // Configurar sistema de notificações
    setupNotifications() {
        // Simular notificações periódicas
        setInterval(() => {
            this.checkNewNotifications();
        }, 30000); // A cada 30 segundos
    }

    // Mostrar página
    showPage(pageId) {
        // Esconder todas as páginas
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Mostrar página selecionada
        document.getElementById(pageId).classList.add('active');
        this.currentPage = pageId;
        
        // Atualizar navegação
        this.updateNavigation(pageId);
        
        // Atualizar título
        this.updatePageTitle(pageId);
        
        // Renderizar conteúdo específico
        this.renderPageContent(pageId);
    }

    // Atualizar navegação
    updateNavigation(pageId) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === pageId) {
                item.classList.add('active');
            }
        });
    }

    // Atualizar título da página
    updatePageTitle(pageId) {
        const titles = {
            'page-home': { 
                title: 'Painel Empresarial', 
                subtitle: 'Encontre os melhores talentos' 
            },
            'page-interns': { 
                title: 'Estagiários', 
                subtitle: 'Encontre talentos promissores' 
            },
            'page-create': { 
                title: 'Criar Vaga', 
                subtitle: 'Publique novas oportunidades' 
            },
            'page-posts': { 
                title: 'Minhas Publicações', 
                subtitle: 'Gerencie suas vagas' 
            },
            'page-profile': { 
                title: 'Meu Perfil', 
                subtitle: 'Gerencie sua conta' 
            }
        };
        
        const pageInfo = titles[pageId] || titles['page-home'];
        document.getElementById('pageTitle').textContent = pageInfo.title;
        document.getElementById('pageSubtitle').textContent = pageInfo.subtitle;
    }

    // Renderizar conteúdo da página atual
    renderCurrentPage() {
        this.renderPageContent(this.currentPage);
    }

    // Renderizar conteúdo específico da página
    renderPageContent(pageId) {
        switch (pageId) {
            case 'page-home':
                this.renderHomePage();
                break;
            case 'page-interns':
                this.renderInternsPage();
                break;
            case 'page-posts':
                this.renderPostsPage();
                break;
            case 'page-profile':
                this.renderProfilePage();
                break;
        }
    }

    // Renderizar página inicial
    renderHomePage() {
        this.renderFeaturedInterns();
        this.renderRecentPosts();
        this.updateMetrics();
    }

    // Renderizar estagiários em destaque
    renderFeaturedInterns() {
        const internsGrid = document.getElementById('internsGrid');
        if (internsGrid) {
            internsGrid.innerHTML = this.featuredInterns
                .map(intern => this.createInternCard(intern, true))
                .join('');
        }
    }

    // Renderizar todos os estagiários
    renderInternsPage() {
        const allInternsGrid = document.getElementById('allInternsGrid');
        if (allInternsGrid) {
            allInternsGrid.innerHTML = this.allInterns
                .map(intern => this.createInternCard(intern, false))
                .join('');
        }
    }

    // Renderizar publicações
    renderPostsPage() {
        this.renderMyPosts();
    }

    // Renderizar perfil
    renderProfilePage() {
        // Já é preenchido pelo updateUserProfile
    }

    // Renderizar posts recentes
    renderRecentPosts() {
        const postsList = document.getElementById('postsList');
        if (postsList) {
            postsList.innerHTML = this.recentPosts
                .map(post => this.createPostItem(post))
                .join('');
        }
    }

    // Renderizar minhas publicações
    renderMyPosts() {
        const myPostsList = document.getElementById('myPostsList');
        if (myPostsList) {
            if (this.myPosts.length === 0) {
                myPostsList.innerHTML = this.createEmptyState(
                    'Nenhuma publicação',
                    'Comece criando sua primeira vaga!',
                    '📋'
                );
            } else {
                myPostsList.innerHTML = this.myPosts
                    .map(post => this.createMyPostItem(post))
                    .join('');
            }
        }
    }

    // Atualizar métricas
    updateMetrics() {
        const metrics = {
            activeJobs: this.myPosts.filter(post => post.status === 'active').length,
            candidates: this.myPosts.reduce((acc, post) => acc + post.candidates, 0),
            views: Math.floor(Math.random() * 500) + 1200
        };

        document.querySelectorAll('.metric-value').forEach((element, index) => {
            const values = Object.values(metrics);
            if (values[index]) {
                this.animateValue(element, 0, values[index], 1000);
            }
        });
    }

    // Atualizar perfil do usuário
    updateUserProfile() {
        if (!this.currentUser) return;

        const profileAvatar = document.querySelector('.profile-avatar');
        const profileInfo = document.querySelector('.profile-info');
        
        if (profileAvatar) {
            profileAvatar.textContent = this.currentUser.avatar;
        }
        
        if (profileInfo) {
            profileInfo.innerHTML = `
                <h2>${this.currentUser.name}</h2>
                <p>${this.currentUser.email}</p>
                <p>Plano: ${this.currentUser.plan}</p>
            `;
        }

        // Preencher formulário de perfil
        this.fillProfileForm();
    }

    // Preencher formulário de perfil
    fillProfileForm() {
        const form = document.querySelector('#page-profile form');
        if (!form || !this.currentUser) return;

        form.querySelector('input[type="text"]').value = this.currentUser.name;
        form.querySelector('input[type="email"]').value = this.currentUser.email;
        form.querySelector('input[type="tel"]').value = this.currentUser.phone;
        form.querySelector('select').value = this.currentUser.sector;
        form.querySelector('textarea').value = this.currentUser.description;
    }

    // Criar card de estagiário
    createInternCard(intern, isFeatured = false) {
        const isSaved = this.savedInterns.has(intern.id);
        
        return `
            <div class="intern-card" data-intern-id="${intern.id}">
                <div class="intern-header">
                    <div class="intern-avatar">${intern.initials}</div>
                    <div class="intern-info">
                        <div class="intern-name">${intern.name}</div>
                        <div class="intern-course">${intern.course}</div>
                        <div class="intern-location">
                            📍 ${intern.location} • ${intern.availability}
                        </div>
                    </div>
                </div>
                <div class="intern-skills">
                    ${intern.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <div class="intern-stats">
                    <span>⭐ ${intern.rating}/5.0</span>
                    <span>📁 ${intern.projects} projetos</span>
                    <span>💰 ${intern.salary}</span>
                </div>
                <div class="intern-actions">
                    <button class="action-btn" data-action="view-cv">
                        👁️ Ver CV
                    </button>
                    <button class="action-btn primary" data-action="contact">
                        💬 Contatar
                    </button>
                    <button class="action-btn ${isSaved ? 'danger' : ''}" data-action="save">
                        ${isSaved ? '✅ Salvo' : '💾 Salvar'}
                    </button>
                </div>
            </div>
        `;
    }

    // Criar item de post
    createPostItem(post) {
        return `
            <div class="post-item" data-post-id="${post.id}">
                <div class="post-header">
                    <div class="post-title">
                        ${post.type === 'vaga' ? '📋' : '🎯'} 
                        ${post.title}
                    </div>
                    <div class="post-date">${post.date}</div>
                </div>
                <div class="post-content">${post.content}</div>
                <div class="post-stats">
                    <span>👀 ${post.views} visualizações</span>
                    <span>
                        ${post.type === 'vaga' ? '📄' : '👥'} 
                        ${post.type === 'vaga' ? post.applications + ' candidaturas' : post.registrations + ' inscrições'}
                    </span>
                    <span class="status-badge status-${post.status}">
                        ${post.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                </div>
            </div>
        `;
    }

    // Criar item de minha publicação
    createMyPostItem(post) {
        return `
            <div class="intern-card" data-post-id="${post.id}">
                <div class="intern-header">
                    <div class="intern-info">
                        <div class="intern-name">${post.title}</div>
                        <div class="intern-course">
                            ${post.date} • ${post.candidates} candidatos
                        </div>
                    </div>
                </div>
                <div class="intern-skills">
                    ${post.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <div class="intern-stats">
                    <span>💰 ${post.salary}</span>
                    <span class="status-badge status-${post.status}">
                        ${post.status === 'active' ? 'Ativa' : 'Encerrada'}
                    </span>
                </div>
                <div class="intern-actions">
                    <button class="action-btn" data-action="edit-post">
                        ✏️ Editar
                    </button>
                    <button class="action-btn primary" data-action="view-candidates">
                        👥 Candidatos (${post.candidates})
                    </button>
                    <button class="action-btn ${post.status === 'active' ? 'danger' : 'secondary'}" 
                            data-action="${post.status === 'active' ? 'close-post' : 'reopen-post'}">
                        ${post.status === 'active' ? '❌ Encerrar' : '🔄 Reabrir'}
                    </button>
                </div>
            </div>
        `;
    }

    // Criar estado vazio
    createEmptyState(title, message, icon = '📋') {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">${icon}</div>
                <h3>${title}</h3>
                <p>${message}</p>
            </div>
        `;
    }

    // Filtrar estagiários
    filterInterns(searchTerm, type = 'featured') {
        const interns = type === 'featured' ? this.featuredInterns : this.allInterns;
        const gridId = type === 'featured' ? 'internsGrid' : 'allInternsGrid';
        
        if (!searchTerm.trim()) {
            document.getElementById(gridId).innerHTML = interns
                .map(intern => this.createInternCard(intern, type === 'featured'))
                .join('');
            return;
        }

        const term = searchTerm.toLowerCase();
        const filteredInterns = interns.filter(intern => 
            intern.name.toLowerCase().includes(term) ||
            intern.course.toLowerCase().includes(term) ||
            intern.skills.some(skill => skill.toLowerCase().includes(term)) ||
            intern.location.toLowerCase().includes(term)
        );

        const grid = document.getElementById(gridId);
        if (filteredInterns.length === 0) {
            grid.innerHTML = this.createEmptyState(
                'Nenhum estagiário encontrado',
                'Tente ajustar os termos da sua busca',
                '🔍'
            );
        } else {
            grid.innerHTML = filteredInterns
                .map(intern => this.createInternCard(intern, type === 'featured'))
                .join('');
        }
    }

    // Filtrar publicações
    filterPosts(searchTerm) {
        if (!searchTerm.trim()) {
            this.renderMyPosts();
            return;
        }

        const term = searchTerm.toLowerCase();
        const filteredPosts = this.myPosts.filter(post => 
            post.title.toLowerCase().includes(term) ||
            post.skills.some(skill => skill.toLowerCase().includes(term))
        );

        const myPostsList = document.getElementById('myPostsList');
        if (filteredPosts.length === 0) {
            myPostsList.innerHTML = this.createEmptyState(
                'Nenhuma publicação encontrada',
                'Tente ajustar os termos da sua busca',
                '🔍'
            );
        } else {
            myPostsList.innerHTML = filteredPosts
                .map(post => this.createMyPostItem(post))
                .join('');
        }
    }

    // Handlers de ações
    handleDynamicActions(e) {
        const button = e.target.closest('.action-btn');
        if (!button) return;

        const action = button.getAttribute('data-action');
        const card = button.closest('[data-intern-id], [data-post-id]');

        if (card) {
            const id = card.getAttribute('data-intern-id') || card.getAttribute('data-post-id');
            
            switch (action) {
                case 'view-cv':
                    this.viewCV(parseInt(id));
                    break;
                case 'contact':
                    this.contactIntern(parseInt(id));
                    break;
                case 'save':
                    this.toggleSaveIntern(parseInt(id), button);
                    break;
                case 'edit-post':
                    this.editPost(parseInt(id));
                    break;
                case 'view-candidates':
                    this.viewCandidates(parseInt(id));
                    break;
                case 'close-post':
                case 'reopen-post':
                    this.togglePostStatus(parseInt(id), button);
                    break;
            }
        }
    }

    // Handlers específicos
    handleHighlight() {
        this.showNotification('Recurso de destaque ativado! Sua empresa terá maior visibilidade por 7 dias.', 'success');
    }

    async handleCreateJob(form) {
        const formData = new FormData(form);
        const jobData = {
            title: formData.get('title') || form.querySelector('input[type="text"]').value,
            description: formData.get('description') || form.querySelector('textarea').value,
            skills: (formData.get('skills') || form.querySelector('input[placeholder*="Habilidades"]').value)
                .split(',').map(skill => skill.trim()),
            type: formData.get('type') || form.querySelector('select').value,
            salary: formData.get('salary') || form.querySelector('input[placeholder*="Salário"]').value
        };

        // Validação
        if (!jobData.title || !jobData.description) {
            this.showNotification('Preencha todos os campos obrigatórios!', 'error');
            return;
        }

        // Simular criação da vaga
        this.showNotification('Criando vaga...', 'info');
        
        await this.delay(1500); // Simular API call

        const newPost = {
            id: Date.now(),
            title: jobData.title,
            date: 'Agora mesmo',
            candidates: 0,
            status: 'active',
            type: 'vaga',
            skills: jobData.skills,
            salary: jobData.salary
        };

        this.myPosts.unshift(newPost);
        form.reset();
        
        this.showNotification('Vaga publicada com sucesso!', 'success');
        this.showPage('page-posts');
    }

    async handleProfileUpdate(form) {
        const formData = {
            name: form.querySelector('input[type="text"]').value,
            email: form.querySelector('input[type="email"]').value,
            phone: form.querySelector('input[type="tel"]').value,
            sector: form.querySelector('select').value,
            description: form.querySelector('textarea').value
        };

        this.showNotification('Atualizando perfil...', 'info');
        
        await this.delay(1000); // Simular API call

        Object.assign(this.currentUser, formData);
        this.updateUserProfile();
        
        this.showNotification('Perfil atualizado com sucesso!', 'success');
    }

    // Ações dos estagiários
    viewCV(internId) {
        const intern = this.allInterns.find(i => i.id === internId);
        if (intern) {
            this.showNotification(`Abrindo CV de ${intern.name}...`, 'info');
            // Em produção, abriria um modal ou nova página
            setTimeout(() => {
                alert(`CV de ${intern.name}\n\n${intern.bio}\n\nContato: ${intern.contact}`);
            }, 500);
        }
    }

    contactIntern(internId) {
        const intern = this.allInterns.find(i => i.id === internId);
        if (intern) {
            this.showNotification(`Iniciando conversa com ${intern.name}...`, 'info');
            // Em produção, abriria um chat
            setTimeout(() => {
                alert(`Chat iniciado com ${intern.name}\n\nEmail: ${intern.contact}`);
            }, 500);
        }
    }

    toggleSaveIntern(internId, button) {
        if (this.savedInterns.has(internId)) {
            this.savedInterns.delete(internId);
            button.textContent = '💾 Salvar';
            button.classList.remove('danger');
            this.showNotification('Estagiário removido dos salvos', 'info');
        } else {
            this.savedInterns.add(internId);
            button.textContent = '✅ Salvo';
            button.classList.add('danger');
            this.showNotification('Estagiário salvo com sucesso!', 'success');
        }
        this.saveToLocalStorage();
    }

    // Ações das publicações
    editPost(postId) {
        const post = this.myPosts.find(p => p.id === postId);
        if (post) {
            this.showNotification(`Editando vaga: ${post.title}`, 'info');
            // Em produção, abriria um formulário de edição
        }
    }

    viewCandidates(postId) {
        const post = this.myPosts.find(p => p.id === postId);
        if (post) {
            this.showNotification(`Abrindo lista de candidatos para: ${post.title}`, 'info');
            // Em produção, abriria uma página de candidatos
        }
    }

    togglePostStatus(postId, button) {
        const post = this.myPosts.find(p => p.id === postId);
        if (post) {
            const wasActive = post.status === 'active';
            post.status = wasActive ? 'closed' : 'active';
            
            if (wasActive) {
                button.textContent = '🔄 Reabrir';
                button.classList.remove('danger');
                this.showNotification('Vaga encerrada com sucesso!', 'success');
            } else {
                button.textContent = '❌ Encerrar';
                button.classList.add('danger');
                this.showNotification('Vaga reaberta com sucesso!', 'success');
            }
            
            this.renderMyPosts();
        }
    }

    // Sistema de notificações
    checkNewNotifications() {
        // 10% de chance de nova notificação
        if (Math.random() < 0.1) {
            const notifications = [
                'Nova candidatura recebida!',
                'Um estagiário visualizou seu perfil!',
                'Lembrete: Workshop amanhã às 14h',
                'Seu destaque expira em 2 dias'
            ];
            
            const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
            this.showNotification(randomNotification, 'info');
        }
    }

    showNotification(message, type = 'info') {
        // Remover notificação anterior
        const existingNotification = document.querySelector('.nexus-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `nexus-notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">×</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Configurar fechamento
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });

        // Remover automaticamente
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // LocalStorage
    saveToLocalStorage() {
        localStorage.setItem('nexus_saved_interns', JSON.stringify([...this.savedInterns]));
    }

    loadSavedInterns() {
        const saved = localStorage.getItem('nexus_saved_interns');
        if (saved) {
            this.savedInterns = new Set(JSON.parse(saved));
        }
    }

    // Utilitários
    animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            if (end >= 1000) {
                element.textContent = (value / 1000).toFixed(1) + 'k';
            } else {
                element.textContent = value;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Métodos públicos para debug
    getStats() {
        return {
            totalInterns: this.allInterns.length,
            activePosts: this.myPosts.filter(p => p.status === 'active').length,
            savedInterns: this.savedInterns.size,
            user: this.currentUser
        };
    }
}

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', () => {
    window.nexusApp = new NexusDashboard();
});

// Adicionar animações CSS para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nexus-notification {
        animation: slideInRight 0.3s ease-out;
    }
    
    .nexus-notification.hiding {
        animation: slideOutRight 0.3s ease-in;
    }
`;
document.head.appendChild(style);

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NexusDashboard;
}