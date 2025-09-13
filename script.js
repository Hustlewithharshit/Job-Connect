 // Sample job data
        const jobsData = [
            {
                id: 1,
                title: "Senior Frontend Developer",
                company: "TechCorp Inc.",
                location: "San Francisco, CA",
                type: "full-time",
                experience: "senior",
                salary: "$120,000 - $150,000",
                salaryNum: 135000,
                posted: "2 days ago",
                description: "We're looking for an experienced frontend developer to join our dynamic team. You'll be working on cutting-edge web applications using React, TypeScript, and modern development tools.",
                tags: ["React", "TypeScript", "JavaScript", "CSS", "Git"],
                companySize: "medium",
                remote: false,
                companyInfo: {
                    employees: "200-500",
                    industry: "Technology",
                    founded: "2015",
                    description: "TechCorp is a leading software development company specializing in enterprise solutions."
                }
            },
            {
                id: 2,
                title: "Product Manager",
                company: "InnovateLabs",
                location: "Remote",
                type: "full-time",
                experience: "mid",
                salary: "$90,000 - $110,000",
                salaryNum: 100000,
                posted: "1 week ago",
                description: "Join our product team to drive innovation and growth. You'll be responsible for product strategy, roadmap planning, and cross-functional collaboration.",
                tags: ["Product Strategy", "Agile", "Analytics", "User Research"],
                companySize: "startup",
                remote: true,
                companyInfo: {
                    employees: "50-100",
                    industry: "Software",
                    founded: "2020",
                    description: "InnovateLabs builds next-generation productivity tools for modern teams."
                }
            },
            {
                id: 3,
                title: "UX/UI Designer",
                company: "DesignStudio Pro",
                location: "New York, NY",
                type: "full-time",
                experience: "mid",
                salary: "$70,000 - $90,000",
                salaryNum: 80000,
                posted: "3 days ago",
                description: "Create exceptional user experiences and beautiful interfaces. Work with product teams to design intuitive and engaging digital products.",
                tags: ["Figma", "Sketch", "Prototyping", "User Research", "Design Systems"],
                companySize: "medium",
                remote: false,
                companyInfo: {
                    employees: "100-200",
                    industry: "Design",
                    founded: "2018",
                    description: "DesignStudio Pro is a creative agency focused on digital product design and branding."
                }
            },
            {
                id: 4,
                title: "Data Scientist",
                company: "DataTech Solutions",
                location: "Boston, MA",
                type: "full-time",
                experience: "senior",
                salary: "$130,000 - $160,000",
                salaryNum: 145000,
                posted: "5 days ago",
                description: "Analyze complex datasets to drive business insights. Build machine learning models and work with stakeholders to solve challenging problems.",
                tags: ["Python", "Machine Learning", "SQL", "Statistics", "TensorFlow"],
                companySize: "large",
                remote: false,
                companyInfo: {
                    employees: "1000+",
                    industry: "Analytics",
                    founded: "2012",
                    description: "DataTech Solutions provides advanced analytics and AI solutions for enterprise clients."
                }
            },
            {
                id: 5,
                title: "DevOps Engineer",
                company: "CloudFirst",
                location: "Seattle, WA",
                type: "full-time",
                experience: "mid",
                salary: "$100,000 - $125,000",
                salaryNum: 112500,
                posted: "1 day ago",
                description: "Manage cloud infrastructure and deployment pipelines. Ensure scalability, reliability, and security of our platform.",
                tags: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
                companySize: "medium",
                remote: true,
                companyInfo: {
                    employees: "300-500",
                    industry: "Cloud Computing",
                    founded: "2017",
                    description: "CloudFirst specializes in cloud migration and infrastructure automation services."
                }
            },
            {
                id: 6,
                title: "Marketing Specialist",
                company: "GrowthHackers",
                location: "Austin, TX",
                type: "full-time",
                experience: "entry",
                salary: "$50,000 - $65,000",
                salaryNum: 57500,
                posted: "4 days ago",
                description: "Drive user acquisition and engagement through creative marketing campaigns. Work with cross-functional teams to grow our user base.",
                tags: ["Digital Marketing", "SEO", "Content Marketing", "Analytics", "Social Media"],
                companySize: "startup",
                remote: false,
                companyInfo: {
                    employees: "20-50",
                    industry: "Marketing",
                    founded: "2021",
                    description: "GrowthHackers is a digital marketing agency focused on startup growth strategies."
                }
            }
        ];

        let filteredJobs = [...jobsData];
        let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        let appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');

        function renderJobs(jobs) {
            const jobsList = document.getElementById('jobsList');
            const resultsCount = document.getElementById('resultsCount');
            
            resultsCount.textContent = `Showing ${jobs.length} of ${jobsData.length} jobs`;

            if (jobs.length === 0) {
                jobsList.innerHTML = `
                    <div class="no-results">
                        <h3>No jobs found</h3>
                        <p>Try adjusting your filters or search terms</p>
                    </div>
                `;
                return;
            }

            jobsList.innerHTML = jobs.map(job => `
                <div class="job-card" data-job-id="${job.id}">
                    <div class="job-header">
                        <div style="display: flex; align-items: flex-start;">
                            <div class="company-logo">
                                ${job.company.charAt(0)}
                            </div>
                            <div class="job-info">
                                <h3 class="job-title" onclick="showJobDetail(${job.id})">${job.title}</h3>
                                <div class="company-name" onclick="showCompanyProfile('${job.company}')">${job.company}</div>
                                <div class="job-meta">
                                    <span>📍 ${job.location}</span>
                                    <span>💼 ${job.type}</span>
                                    <span>⭐ ${job.experience}</span>
                                </div>
                            </div>
                        </div>
                        <div class="job-actions">
                            <button class="save-btn ${savedJobs.includes(job.id) ? 'saved' : ''}" 
                                    onclick="toggleSaveJob(${job.id})" 
                                    title="Save Job">
                                ${savedJobs.includes(job.id) ? '❤️' : '🤍'}
                            </button>
                            <button class="apply-btn" onclick="applyToJob(${job.id})">
                                ${appliedJobs.includes(job.id) ? 'Applied ✓' : 'Apply Now'}
                            </button>
                        </div>
                    </div>
                    <p class="job-description">${job.description}</p>
                    <div class="job-tags">
                        ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="job-footer">
                        <div class="salary">${job.salary}</div>
                        <div class="posted-date">${job.posted}</div>
                    </div>
                </div>
            `).join('');
        }

        function showJobDetail(jobId) {
            const job = jobsData.find(j => j.id === jobId);
            if (!job) return;

            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 2rem;">
                    <div class="company-logo" style="margin-right: 1rem;">
                        ${job.company.charAt(0)}
                    </div>
                    <div>
                        <h2>${job.title}</h2>
                        <div class="company-name" onclick="showCompanyProfile('${job.company}')" style="cursor: pointer;">${job.company}</div>
                        <div class="job-meta" style="margin-top: 0.5rem;">
                            <span>📍 ${job.location}</span>
                            <span>💼 ${job.type}</span>
                            <span>⭐ ${job.experience}</span>
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <div class="salary" style="font-size: 1.5rem; margin-bottom: 1rem;">${job.salary}</div>
                    <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                        <button class="apply-btn" onclick="applyToJob(${job.id})" style="padding: 1rem 2rem; font-size: 1rem;">
                            ${appliedJobs.includes(job.id) ? 'Applied ✓' : 'Apply Now'}
                        </button>
                        <button class="save-btn ${savedJobs.includes(job.id) ? 'saved' : ''}" 
                                onclick="toggleSaveJob(${job.id})" 
                                style="padding: 1rem; font-size: 1.2rem;">
                            ${savedJobs.includes(job.id) ? '❤️ Saved' : '🤍 Save Job'}
                        </button>
                    </div>
                </div>

                <div class="tabs">
                    <button class="tab active" onclick="switchTab(event, 'job-description')">Job Description</button>
                    <button class="tab" onclick="switchTab(event, 'company-info')">Company Info</button>
                </div>

                <div id="job-description" class="tab-content">
                    <h3 style="margin-bottom: 1rem;">About this role</h3>
                    <p style="line-height: 1.8; margin-bottom: 1.5rem;">${job.description}</p>
                    
                    <h3 style="margin-bottom: 1rem;">Required Skills</h3>
                    <div class="job-tags" style="margin-bottom: 1.5rem;">
                        ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
                    </div>
                    
                    <h3 style="margin-bottom: 1rem;">Job Details</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                        <div><strong>Employment Type:</strong> ${job.type}</div>
                        <div><strong>Experience Level:</strong> ${job.experience}</div>
                        <div><strong>Location:</strong> ${job.location}</div>
                        <div><strong>Posted:</strong> ${job.posted}</div>
                    </div>
                </div>

                <div id="company-info" class="tab-content" style="display: none;">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <div class="company-logo" style="width: 80px; height: 80px; margin: 0 auto 1rem; font-size: 1.5rem;">
                            ${job.company.charAt(0)}
                        </div>
                        <h3>${job.company}</h3>
                        <p style="color: #64748b;">${job.companyInfo.industry} • ${job.companyInfo.employees} employees</p>
                    </div>
                    
                    <h3 style="margin-bottom: 1rem;">About ${job.company}</h3>
                    <p style="line-height: 1.8; margin-bottom: 1.5rem;">${job.companyInfo.description}</p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div><strong>Founded:</strong> ${job.companyInfo.founded}</div>
                        <div><strong>Industry:</strong> ${job.companyInfo.industry}</div>
                        <div><strong>Company Size:</strong> ${job.companyInfo.employees}</div>
                        <div><strong>Type:</strong> Private Company</div>
                    </div>
                </div>
            `;

            document.getElementById('jobModal').classList.add('show');
        }

        function showCompanyProfile(companyName) {
            const job = jobsData.find(j => j.company === companyName);
            if (!job) return;

            const companyJobs = jobsData.filter(j => j.company === companyName);
            const modalContent = document.getElementById('companyModalContent');
            
            modalContent.innerHTML = `
                <div class="company-profile">
                    <div class="company-logo">
                        ${companyName.charAt(0)}
                    </div>
                    <h2>${companyName}</h2>
                    <div class="company-meta">
                        ${job.companyInfo.industry} • ${job.companyInfo.employees} employees • Founded ${job.companyInfo.founded}
                    </div>
                </div>

                <div class="tabs">
                    <button class="tab active" onclick="switchCompanyTab(event, 'about')">About</button>
                    <button class="tab" onclick="switchCompanyTab(event, 'jobs')">Open Positions (${companyJobs.length})</button>
                </div>

                <div id="about" class="tab-content">
                    <h3 style="margin-bottom: 1rem;">About ${companyName}</h3>
                    <p style="line-height: 1.8; margin-bottom: 2rem;">${job.companyInfo.description}</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div style="padding: 1rem; background: #f8fafc; border-radius: 8px;">
                            <strong>Industry</strong><br>
                            ${job.companyInfo.industry}
                        </div>
                        <div style="padding: 1rem; background: #f8fafc; border-radius: 8px;">
                            <strong>Company Size</strong><br>
                            ${job.companyInfo.employees} employees
                        </div>
                        <div style="padding: 1rem; background: #f8fafc; border-radius: 8px;">
                            <strong>Founded</strong><br>
                            ${job.companyInfo.founded}
                        </div>
                        <div style="padding: 1rem; background: #f8fafc; border-radius: 8px;">
                            <strong>Headquarters</strong><br>
                            ${job.location.split(',')[0]}
                        </div>
                    </div>
                </div>

                <div id="jobs" class="tab-content" style="display: none;">
                    <h3 style="margin-bottom: 1rem;">Open Positions at ${companyName}</h3>
                    ${companyJobs.map(job => `
                        <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; cursor: pointer;" 
                             onclick="closeCompanyModal(); showJobDetail(${job.id});">
                            <div style="display: flex; justify-content: space-between; align-items: start;">
                                <div>
                                    <h4 style="color: #2563eb; margin-bottom: 0.5rem;">${job.title}</h4>
                                    <div style="color: #64748b; font-size: 0.9rem;">
                                        📍 ${job.location} • 💼 ${job.type} • ⭐ ${job.experience}
                                    </div>
                                </div>
                                <div style="text-align: right;">
                                    <div style="font-weight: 600; color: #059669;">${job.salary}</div>
                                    <div style="font-size: 0.8rem; color: #64748b;">${job.posted}</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            document.getElementById('companyModal').classList.add('show');
        }

        function switchTab(event, tabName) {
            // Remove active class from all tabs and contents
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
            
            // Add active class to clicked tab and show content
            event.target.classList.add('active');
            document.getElementById(tabName).style.display = 'block';
        }

        function switchCompanyTab(event, tabName) {
            // Remove active class from all tabs and contents
            document.querySelectorAll('#companyModal .tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('#companyModal .tab-content').forEach(content => content.style.display = 'none');
            
            // Add active class to clicked tab and show content
            event.target.classList.add('active');
            document.getElementById(tabName).style.display = 'block';
        }

        function closeModal() {
            document.getElementById('jobModal').classList.remove('show');
        }

        function closeCompanyModal() {
            document.getElementById('companyModal').classList.remove('show');
        }

        function toggleSaveJob(jobId) {
            if (savedJobs.includes(jobId)) {
                savedJobs = savedJobs.filter(id => id !== jobId);
            } else {
                savedJobs.push(jobId);
            }
            localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
            renderJobs(filteredJobs);
        }

        function applyToJob(jobId) {
            if (!appliedJobs.includes(jobId)) {
                appliedJobs.push(jobId);
                localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
                alert('Application submitted successfully!');
                renderJobs(filteredJobs);
            } else {
                alert('You have already applied to this job!');
            }
        }

        function searchJobs(event) {
            event.preventDefault();
            applyFilters();
        }

        function applyFilters() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const location = document.getElementById('locationFilter').value.toLowerCase();
            const experience = document.getElementById('experienceFilter').value;
            const minSalary = parseInt(document.getElementById('minSalary').value) || 0;
            const maxSalary = parseInt(document.getElementById('maxSalary').value) || Infinity;
            
            const jobTypes = Array.from(document.querySelectorAll('.job-type-filter:checked')).map(cb => cb.value);
            const companySizes = Array.from(document.querySelectorAll('.company-size-filter:checked')).map(cb => cb.value);

            filteredJobs = jobsData.filter(job => {
                const matchesSearch = !searchTerm || 
                    job.title.toLowerCase().includes(searchTerm) ||
                    job.company.toLowerCase().includes(searchTerm) ||
                    job.tags.some(tag => tag.toLowerCase().includes(searchTerm));
                
                const matchesLocation = !location || 
                    job.location.toLowerCase().includes(location) ||
                    (location === 'remote' && job.remote);
                
                const matchesExperience = !experience || job.experience === experience;
                const matchesSalary = job.salaryNum >= minSalary && job.salaryNum <= maxSalary;
                const matchesJobType = jobTypes.length === 0 || jobTypes.includes(job.type) || (jobTypes.includes('remote') && job.remote);
                const matchesCompanySize = companySizes.length === 0 || companySizes.includes(job.companySize);

                return matchesSearch && matchesLocation && matchesExperience && matchesSalary && matchesJobType && matchesCompanySize;
            });

            sortJobs();
        }

        function sortJobs() {
            const sortBy = document.getElementById('sortSelect').value;
            
            filteredJobs.sort((a, b) => {
                switch (sortBy) {
                    case 'date':
                        return new Date(b.posted) - new Date(a.posted);
                    case 'salary-high':
                        return b.salaryNum - a.salaryNum;
                    case 'salary-low':
                        return a.salaryNum - b.salaryNum;
                    default:
                        return 0; // relevance - keep original order
                }
            });

            renderJobs(filteredJobs);
        }

        function clearAllFilters() {
            document.getElementById('searchInput').value = '';
            document.getElementById('locationFilter').value = '';
            document.getElementById('experienceFilter').value = '';
            document.getElementById('minSalary').value = '';
            document.getElementById('maxSalary').value = '';
            
            document.querySelectorAll('.job-type-filter').forEach(cb => cb.checked = false);
            document.querySelectorAll('.company-size-filter').forEach(cb => cb.checked = false);
            
            filteredJobs = [...jobsData];
            renderJobs(filteredJobs);
        }

        function showSavedJobs() {
            const savedJobsList = jobsData.filter(job => savedJobs.includes(job.id));
            filteredJobs = savedJobsList;
            renderJobs(filteredJobs);
            
            // Update nav
            document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
            document.querySelector('.nav-links a[onclick="showSavedJobs()"]').classList.add('active');
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            renderJobs(filteredJobs);
            
            // Add event listeners for filters
            document.getElementById('locationFilter').addEventListener('input', applyFilters);
            document.getElementById('experienceFilter').addEventListener('change', applyFilters);
            document.getElementById('minSalary').addEventListener('input', applyFilters);
            document.getElementById('maxSalary').addEventListener('input', applyFilters);
            
            document.querySelectorAll('.job-type-filter, .company-size-filter').forEach(checkbox => {
                checkbox.addEventListener('change', applyFilters);
            });
            
            // Close modals when clicking outside
            document.getElementById('jobModal').addEventListener('click', function(e) {
                if (e.target === this) closeModal();
            });
            
            document.getElementById('companyModal').addEventListener('click', function(e) {
                if (e.target === this) closeCompanyModal();
            });
        });