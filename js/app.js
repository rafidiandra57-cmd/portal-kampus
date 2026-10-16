/**
 * PORTAL KAMPUS FIKTIF - UNIVERSITAS CAKRAWALA NUSANTARA (UCN)
 * Logika Aplikasi Utama (Mahasiswa, Dosen, Admin)
 */

class CampusPortalApp {
  constructor() {
    this.STORAGE_KEY = 'ucn_portal_academic_data_v1';
    this.SESSION_KEY = 'ucn_portal_active_user_session';
    this.THEME_KEY = 'ucn_portal_theme_mode';

    this.data = null;
    this.currentUser = null;
    this.activeFilterAssignment = 'all';
    this.activeFilterGrading = 'all';
    this.activeFilterForum = 'all';
    this.activeDosenCourseFilter = 'all';

    this.init();
  }

  // =========================================================================
  // INITIALIZATION & STATE MANAGEMENT
  // =========================================================================

  init() {
    this.loadState();
    this.initTheme();
    this.bindEvents();

    // Pastikan ada sesi aktif. Jika belum ada, default ke Mahasiswa (Dimas Arya) untuk latihan langsung
    const savedUserId = localStorage.getItem(this.SESSION_KEY);
    if (savedUserId && this.getUserById(savedUserId)) {
      this.currentUser = this.getUserById(savedUserId);
      this.showApp();
    } else {
      // Default awal sesi ke Mahasiswa (Dimas Arya) agar langsung siap digunakan
      this.currentUser = this.getUserById('usr-mhs-1') || this.data.users[0];
      this.saveSession();
      this.showApp();
    }
  }

  loadState() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.data = JSON.parse(stored);
      } else {
        // Inisialisasi dari INITIAL_CAMPUS_DATA
        this.data = JSON.parse(JSON.stringify(window.INITIAL_CAMPUS_DATA));
        this.saveState();
      }
    } catch (e) {
      console.error('Gagal memuat data dari localStorage, mereset data:', e);
      this.data = JSON.parse(JSON.stringify(window.INITIAL_CAMPUS_DATA));
      this.saveState();
    }
  }

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Gagal menyimpan data ke localStorage:', e);
      this.showToast('Peringatan: Gagal menyimpan data lokal!', 'error');
    }
  }

  saveSession() {
    if (this.currentUser) {
      localStorage.setItem(this.SESSION_KEY, this.currentUser.id);
    } else {
      localStorage.removeItem(this.SESSION_KEY);
    }
  }

  resetAllData() {
    if (confirm('Apakah Anda yakin ingin mereset seluruh data portal kampus ke kondisi awal sintetis? Semua data tugas dan akun baru akan dikembalikan ke data default.')) {
      localStorage.removeItem(this.STORAGE_KEY);
      this.data = JSON.parse(JSON.stringify(window.INITIAL_CAMPUS_DATA));
      this.saveState();
      this.showToast('Data kampus berhasil direset ke kondisi awal!', 'success');
      this.refreshCurrentView();
    }
  }

  // =========================================================================
  // THEME MANAGEMENT (DARK / LIGHT)
  // =========================================================================

  initTheme() {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      this.updateThemeIcon(true);
    } else {
      document.body.classList.remove('light-mode');
      this.updateThemeIcon(false);
    }
  }

  toggleTheme() {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem(this.THEME_KEY, isLight ? 'light' : 'dark');
    this.updateThemeIcon(isLight);
    this.showToast(`Beralih ke mode ${isLight ? 'Terang' : 'Gelap'}`, 'info');
  }

  updateThemeIcon(isLight) {
    const iconContainer = document.getElementById('btn-toggle-theme');
    if (!iconContainer) return;
    if (isLight) {
      iconContainer.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    } else {
      iconContainer.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }

  // =========================================================================
  // AUTHENTICATION & ROLE SWITCHING
  // =========================================================================

  login(identifier, password) {
    const user = this.data.users.find(u => 
      (u.username.toLowerCase() === identifier.toLowerCase() ||
       u.email.toLowerCase() === identifier.toLowerCase() ||
       u.identifier.toLowerCase() === identifier.toLowerCase()) &&
      u.password === password
    );

    if (user) {
      if (user.status !== 'Aktif') {
        this.showToast('Akun Anda dinonaktifkan oleh Administrator!', 'error');
        return false;
      }
      this.currentUser = user;
      this.saveSession();
      this.showToast(`Selamat datang kembali, ${user.name}!`, 'success');
      this.showApp();
      return true;
    } else {
      this.showToast('NIM/NIP atau Kata Sandi salah. Silakan coba lagi.', 'error');
      return false;
    }
  }

  quickLogin(userId) {
    const user = this.getUserById(userId);
    if (user) {
      this.currentUser = user;
      this.saveSession();
      this.closeModal('modal-quick-switcher');
      this.showApp();
      this.showToast(`Beralih ke akun ${user.name} (${user.role.toUpperCase()})`, 'info');
    }
  }

  logout() {
    this.currentUser = null;
    this.saveSession();
    this.showLogin();
    this.showToast('Anda telah keluar dari sistem.', 'info');
  }

  showLogin() {
    document.getElementById('login-view').style.display = 'flex';
    document.getElementById('app-container').style.display = 'none';
  }

  showApp() {
    document.getElementById('login-view').style.display = 'none';
    document.getElementById('app-container').style.display = 'flex';
    this.setupRoleEnvironment();
  }

  setupRoleEnvironment() {
    if (!this.currentUser) return;

    // Update Sidebar User Profile
    const avatarEl = document.getElementById('sidebar-avatar');
    const nameEl = document.getElementById('sidebar-user-name');
    const idEl = document.getElementById('sidebar-user-id');
    const roleTagEl = document.getElementById('sidebar-role-tag');
    const roleDescEl = document.getElementById('sidebar-role-desc');

    if (avatarEl) {
      avatarEl.textContent = this.getInitials(this.currentUser.name);
      avatarEl.style.backgroundColor = this.currentUser.avatarBg || '#4f46e5';
    }
    if (nameEl) nameEl.textContent = this.currentUser.name;
    if (idEl) idEl.textContent = `${this.currentUser.role === 'mahasiswa' ? 'NIM' : (this.currentUser.role === 'dosen' ? 'NIP' : 'ID')}: ${this.currentUser.identifier}`;
    
    if (roleTagEl) {
      roleTagEl.textContent = this.currentUser.role;
      roleTagEl.className = `role-badge-tag role-${this.currentUser.role}`;
    }
    if (roleDescEl) {
      if (this.currentUser.role === 'mahasiswa') {
        roleDescEl.textContent = `${this.currentUser.department} - Smt ${this.currentUser.semester}`;
      } else if (this.currentUser.role === 'dosen') {
        roleDescEl.textContent = `Dosen: ${this.currentUser.expertise || this.currentUser.department}`;
      } else {
        roleDescEl.textContent = 'Administrator Sistem Kampus';
      }
    }

    // Toggle Sidebar Navigation based on Role
    document.getElementById('nav-group-mahasiswa').style.display = this.currentUser.role === 'mahasiswa' ? 'block' : 'none';
    document.getElementById('nav-group-dosen').style.display = this.currentUser.role === 'dosen' ? 'block' : 'none';
    document.getElementById('nav-group-admin').style.display = this.currentUser.role === 'admin' ? 'block' : 'none';

    // Update Badges
    this.updateNotificationBadges();

    // Route to default role view
    if (this.currentUser.role === 'mahasiswa') {
      this.switchView('view-mhs-dashboard');
    } else if (this.currentUser.role === 'dosen') {
      this.switchView('view-dosen-dashboard');
    } else if (this.currentUser.role === 'admin') {
      this.switchView('view-admin-dashboard');
    }
  }

  updateNotificationBadges() {
    if (!this.currentUser) return;

    if (this.currentUser.role === 'mahasiswa') {
      const studentCourses = this.currentUser.enrolledCourses || [];
      const pendingTasks = this.data.assignments.filter(a => {
        if (!studentCourses.includes(a.courseId)) return false;
        const sub = this.data.submissions.find(s => s.assignmentId === a.id && s.studentId === this.currentUser.id);
        return !sub;
      }).length;

      const badge = document.getElementById('badge-mhs-pending-tasks');
      if (badge) {
        badge.textContent = pendingTasks;
        badge.style.display = pendingTasks > 0 ? 'inline-block' : 'none';
      }
    } else if (this.currentUser.role === 'dosen') {
      const dosenCourses = this.currentUser.coursesTaught || [];
      const pendingEvals = this.data.submissions.filter(s => {
        const assign = this.data.assignments.find(a => a.id === s.assignmentId);
        return assign && dosenCourses.includes(assign.courseId) && s.status === 'submitted';
      }).length;

      const badge = document.getElementById('badge-dosen-pending-eval');
      if (badge) {
        badge.textContent = pendingEvals;
        badge.style.display = pendingEvals > 0 ? 'inline-block' : 'none';
      }
    }
  }

  // =========================================================================
  // VIEW SWITCHING
  // =========================================================================

  switchView(viewId) {
    // Hide all views
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));

    // Show target view
    const target = document.getElementById(viewId);
    if (target) {
      target.classList.add('active');
    }

    // Update active nav button
    document.querySelectorAll('.nav-item-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewId);
    });

    // Update breadcrumb
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    if (breadcrumbCurrent) {
      const viewNames = {
        'view-mhs-dashboard': 'Dashboard Mahasiswa',
        'view-mhs-grades': 'Kartu Hasil Studi & Nilai',
        'view-mhs-assignments': 'Tugas & Praktikum Kuliah',
        'view-dosen-dashboard': 'Beranda Dosen Pengampu',
        'view-dosen-grading': 'Penilaian Tugas Mahasiswa',
        'view-dosen-classes': 'Kelas & Mahasiswa Bimbingan',
        'view-admin-dashboard': 'Statistik & Pusat Kontrol Admin',
        'view-admin-users': 'Kelola Akun Pengguna (CRUD)',
        'view-admin-courses': 'Kurikulum & Mata Kuliah',
        'view-forum': 'Forum Diskusi Kampus'
      };
      breadcrumbCurrent.textContent = viewNames[viewId] || 'Portal';
    }

    // Render contents for that view
    this.renderViewData(viewId);

    // Close mobile sidebar if open
    document.getElementById('app-sidebar').classList.remove('mobile-open');
  }

  refreshCurrentView() {
    const activeSec = document.querySelector('.view-section.active');
    if (activeSec) {
      this.renderViewData(activeSec.id);
    }
    this.updateNotificationBadges();
  }

  renderViewData(viewId) {
    switch (viewId) {
      case 'view-mhs-dashboard':
        this.renderMahasiswaDashboard();
        break;
      case 'view-mhs-grades':
        this.renderMahasiswaGrades();
        break;
      case 'view-mhs-assignments':
        this.renderMahasiswaAssignments();
        break;
      case 'view-dosen-dashboard':
        this.renderDosenDashboard();
        break;
      case 'view-dosen-grading':
        this.renderDosenGrading();
        break;
      case 'view-dosen-classes':
        this.renderDosenClasses();
        break;
      case 'view-admin-dashboard':
        this.renderAdminDashboard();
        break;
      case 'view-admin-users':
        this.renderAdminUsersList();
        break;
      case 'view-admin-courses':
        this.renderAdminCourses();
        break;
      case 'view-forum':
        this.renderForum();
        break;
    }
  }

  // =========================================================================
  // VIEW RENDERERS: MAHASISWA
  // =========================================================================

  renderMahasiswaDashboard() {
    if (!this.currentUser) return;
    const user = this.currentUser;

    const greeting = document.getElementById('mhs-greeting-text');
    const subGreeting = document.getElementById('mhs-sub-greeting');
    if (greeting) greeting.textContent = `Selamat Datang, ${user.name}`;
    if (subGreeting) subGreeting.textContent = `NIM: ${user.identifier} \u2022 Program Studi ${user.department} \u2022 Semester ${user.semester}`;

    // Calculate dynamic GPA & Credits
    const myGrades = this.data.grades.filter(g => g.studentId === user.id);
    const dynamicGPA = this.calculateGPA(myGrades);
    const dynamicCredits = this.calculateTotalCredits(user);

    const gpaEl = document.getElementById('mhs-stat-gpa');
    const creditsEl = document.getElementById('mhs-stat-credits');
    const coursesEl = document.getElementById('mhs-stat-courses');
    const advisorEl = document.getElementById('mhs-stat-advisor');
    const urgentEl = document.getElementById('mhs-stat-urgent-tasks');

    if (gpaEl) gpaEl.textContent = dynamicGPA.toFixed(2);
    if (creditsEl) creditsEl.textContent = `${dynamicCredits} SKS`;
    if (coursesEl) coursesEl.textContent = `${(user.enrolledCourses || []).length} Kelas`;
    if (advisorEl) advisorEl.textContent = `Dosen PA: ${user.academicAdvisor || 'Biro Akademik'}`;

    // Count pending urgent tasks
    const enrolled = user.enrolledCourses || [];
    const pendingCount = this.data.assignments.filter(a => {
      if (!enrolled.includes(a.courseId)) return false;
      const sub = this.data.submissions.find(s => s.assignmentId === a.id && s.studentId === user.id);
      return !sub;
    }).length;
    if (urgentEl) urgentEl.textContent = `${pendingCount} Tugas`;

    // Render Course List
    const courseListEl = document.getElementById('mhs-dashboard-courses-list');
    if (courseListEl) {
      if (enrolled.length === 0) {
        courseListEl.innerHTML = `<p style="color: var(--text-muted); padding: 1rem;">Belum ada mata kuliah yang diambil semester ini.</p>`;
      } else {
        courseListEl.innerHTML = enrolled.map(cId => {
          const c = this.getCourseById(cId);
          if (!c) return '';
          const grade = myGrades.find(g => g.courseId === c.id);
          return `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.9rem; border-bottom: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; gap: 0.85rem;">
                <div style="width: 10px; height: 38px; border-radius: 4px; background: ${c.color || '#4f46e5'};"></div>
                <div>
                  <div style="font-weight: 700; font-size: 0.95rem;">${c.name}</div>
                  <div style="font-size: 0.78rem; color: var(--text-muted);">
                    ${c.code} \u2022 ${c.credits} SKS \u2022 ${c.lecturerName}
                  </div>
                  <div style="font-size: 0.74rem; color: var(--text-subtle); margin-top: 2px;">
                    Jadwal: ${c.schedule}
                  </div>
                </div>
              </div>
              <div style="text-align: right;">
                ${grade ? `
                  <div class="grade-badge grade-${grade.letterGrade.charAt(0)}" title="Nilai Akhir: ${grade.totalScore}">${grade.letterGrade}</div>
                  <div style="font-size: 0.7rem; color: #34d399; margin-top: 2px;">${grade.status}</div>
                ` : `
                  <span class="badge badge-info">Berjalan</span>
                `}
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Render Announcements
    const annListEl = document.getElementById('campus-announcements-list');
    if (annListEl) {
      annListEl.innerHTML = this.data.announcements.map(ann => `
        <div style="padding: 0.85rem 0; border-bottom: 1px solid var(--border-subtle);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem;">
            <span class="badge badge-info" style="font-size: 0.65rem;">${ann.category}</span>
            <span style="font-size: 0.72rem; color: var(--text-subtle);">${ann.date}</span>
          </div>
          <h4 style="font-size: 0.88rem; font-weight: 700; margin-bottom: 0.25rem;">${ann.title}</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">${ann.content}</p>
          <div style="font-size: 0.72rem; color: var(--text-subtle); margin-top: 0.35rem;">Sumber: ${ann.author}</div>
        </div>
      `).join('');
    }
  }

  renderMahasiswaGrades() {
    if (!this.currentUser) return;
    const user = this.currentUser;

    const nameEl = document.getElementById('khs-student-name');
    const metaEl = document.getElementById('khs-student-meta');
    if (nameEl) nameEl.textContent = user.name;
    if (metaEl) metaEl.textContent = `NIM: ${user.identifier} \u2022 Program Studi ${user.department} \u2022 Semester ${user.semester} \u2022 Dosen Pembimbing: ${user.academicAdvisor || 'Dr. Ir. Budi Hartono, M.Sc.'}`;

    const myGrades = this.data.grades.filter(g => g.studentId === user.id);
    const tbody = document.getElementById('tbody-mhs-grades');
    if (!tbody) return;

    if (myGrades.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 2rem; color: var(--text-muted);">Belum ada rekapitulasi nilai resmi untuk semester ini.</td></tr>`;
      return;
    }

    let totalWeightPoints = 0;
    let totalCredits = 0;

    tbody.innerHTML = myGrades.map(g => {
      const course = this.getCourseById(g.courseId);
      const credits = course ? course.credits : 3;
      totalCredits += credits;
      totalWeightPoints += (g.gradePoint * credits);

      return `
        <tr>
          <td><code style="color: #38bdf8; font-weight: 700;">${course ? course.code : 'MK-000'}</code></td>
          <td>
            <div style="font-weight: 700;">${course ? course.name : 'Mata Kuliah'}</div>
            <div style="font-size: 0.75rem; color: var(--text-subtle);">${course ? course.lecturerName : '-'}</div>
          </td>
          <td style="text-align: center; font-weight: 700;">${credits} SKS</td>
          <td style="text-align: center;">${g.assignmentScore !== null ? g.assignmentScore : '-'}</td>
          <td style="text-align: center;">${g.midtermScore !== null ? g.midtermScore : '-'}</td>
          <td style="text-align: center;">${g.finalScore !== null ? g.finalScore : '-'}</td>
          <td style="text-align: center; font-weight: 800; color: #38bdf8;">${g.totalScore !== null ? g.totalScore : '-'}</td>
          <td style="text-align: center;">
            <div class="grade-badge grade-${g.letterGrade ? g.letterGrade.charAt(0) : 'A'}">${g.letterGrade || '-'}</div>
          </td>
          <td style="text-align: center;">
            <span class="badge ${g.status === 'Lulus' ? 'badge-success' : 'badge-danger'}">${g.status || 'Lulus'}</span>
          </td>
        </tr>
      `;
    }).join('');

    const ips = totalCredits > 0 ? (totalWeightPoints / totalCredits) : 0;
    const ipsEl = document.getElementById('khs-ips-val');
    const ipkEl = document.getElementById('khs-ipk-val');
    if (ipsEl) ipsEl.textContent = ips.toFixed(2);
    if (ipkEl) ipkEl.textContent = ips.toFixed(2);
  }

  renderMahasiswaAssignments() {
    if (!this.currentUser) return;
    const user = this.currentUser;
    const enrolled = user.enrolledCourses || [];

    // Filter assignments that belong to courses student is enrolled in
    const relevantAssignments = this.data.assignments.filter(a => enrolled.includes(a.courseId));
    const container = document.getElementById('mhs-assignments-container');
    if (!container) return;

    // Calculate count badges
    let countAll = relevantAssignments.length;
    let countPending = 0;
    let countSubmitted = 0;
    let countGraded = 0;

    relevantAssignments.forEach(a => {
      const sub = this.data.submissions.find(s => s.assignmentId === a.id && s.studentId === user.id);
      if (!sub) countPending++;
      else if (sub.status === 'submitted') countSubmitted++;
      else if (sub.status === 'graded') countGraded++;
    });

    document.getElementById('count-all-tasks').textContent = countAll;
    document.getElementById('count-pending-tasks').textContent = countPending;
    document.getElementById('count-waiting-tasks').textContent = countSubmitted;
    document.getElementById('count-graded-tasks').textContent = countGraded;

    // Filter assignments based on active tab
    const filtered = relevantAssignments.filter(a => {
      const sub = this.data.submissions.find(s => s.assignmentId === a.id && s.studentId === user.id);
      if (this.activeFilterAssignment === 'pending') return !sub;
      if (this.activeFilterAssignment === 'submitted') return sub && sub.status === 'submitted';
      if (this.activeFilterAssignment === 'graded') return sub && sub.status === 'graded';
      return true; // 'all'
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 3rem 1.5rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🎉</div>
          <h3>Tidak ada tugas dalam kategori ini</h3>
          <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.25rem;">Semua tugas pada filter ini telah terselesaikan atau belum diterbitkan dosen.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(a => {
      const course = this.getCourseById(a.courseId);
      const sub = this.data.submissions.find(s => s.assignmentId === a.id && s.studentId === user.id);

      return `
        <div class="assignment-card">
          <div class="assignment-card-header">
            <div>
              <div class="assignment-course-tag">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${course ? course.color : '#4f46e5'};"></span>
                ${course ? course.name : 'Mata Kuliah'} (${course ? course.code : ''})
              </div>
              <h3 class="assignment-title">${a.title}</h3>
            </div>
            <div>
              ${!sub ? `
                <span class="badge badge-warning">Belum Dikumpulkan</span>
              ` : (sub.status === 'graded' ? `
                <span class="badge badge-success">Sudah Dinilai</span>
              ` : `
                <span class="badge badge-info">Menunggu Penilaian</span>
              `)}
            </div>
          </div>

          <p class="assignment-desc">${a.description}</p>

          <div class="assignment-meta-bar">
            <div class="assignment-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
              <span>Batas Waktu: <strong>${a.deadline} WIB</strong></span>
            </div>
            <div class="assignment-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <span>Format Berkas: <code>${a.allowedFileTypes}</code> (Maks. ${a.maxFileSizeMb}MB)</span>
            </div>
            <div class="assignment-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span>Dosen: ${course ? course.lecturerName : '-'}</span>
            </div>
          </div>

          ${sub ? `
            <div class="submission-result-box">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                  <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-subtle); font-weight: 700;">Berkas yang Telah Anda Unggah:</div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <strong style="color: #38bdf8;">${sub.fileName}</strong>
                    <span style="font-size: 0.75rem; color: var(--text-subtle);">(${sub.fileSize}) \u2022 Diunggah: ${sub.submittedAt} WIB</span>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.35rem; font-style: italic;">
                    Catatan Pengumpulan: "${sub.notes || '-'}"
                  </p>
                </div>

                ${sub.status === 'graded' ? `
                  <div style="display: flex; align-items: center; gap: 0.75rem; background: rgba(16, 185, 129, 0.1); padding: 0.5rem 0.85rem; border-radius: var(--radius-md); border: 1px solid rgba(16, 185, 129, 0.3);">
                    <div>
                      <div style="font-size: 0.7rem; color: var(--text-subtle); text-transform: uppercase; font-weight: 700;">Nilai Dosen</div>
                      <div style="font-size: 1.4rem; font-weight: 800; color: #34d399;">${sub.grade} / 100</div>
                    </div>
                    <div class="grade-badge grade-${sub.letterGrade ? sub.letterGrade.charAt(0) : 'A'}">${sub.letterGrade}</div>
                  </div>
                ` : `
                  <span class="badge badge-info">Sedang Ditinjau Dosen</span>
                `}
              </div>

              ${sub.feedback ? `
                <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px dashed var(--border-subtle);">
                  <div style="font-size: 0.75rem; color: #a78bfa; font-weight: 700; display: flex; align-items: center; gap: 0.35rem;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    Umpan Balik Dosen (${this.getUserName(sub.gradedBy)}):
                  </div>
                  <p style="font-size: 0.85rem; color: var(--text-main); margin-top: 0.25rem;">"${sub.feedback}"</p>
                </div>
              ` : ''}
            </div>
          ` : `
            <div style="display: flex; justify-content: flex-end; margin-top: 0.5rem;">
              <button type="button" class="btn btn-primary btn-sm" onclick="app.openSubmitTaskModal('${a.id}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Unggah Berkas Tugas Sekarang
              </button>
            </div>
          `}
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // VIEW RENDERERS: DOSEN (MEMBERI NILAI)
  // =========================================================================

  renderDosenDashboard() {
    if (!this.currentUser) return;
    const dosen = this.currentUser;
    const courses = dosen.coursesTaught || [];

    const greeting = document.getElementById('dosen-greeting-text');
    const subGreeting = document.getElementById('dosen-sub-greeting');
    if (greeting) greeting.textContent = `Selamat Datang, ${dosen.name}`;
    if (subGreeting) subGreeting.textContent = `NIP: ${dosen.identifier} \u2022 Bidang Keahlian: ${dosen.expertise || 'Teknologi Informasi'} \u2022 Fakultas Ilmu Komputer`;

    // Filter submissions for this dosen's courses
    const allDosenSubs = this.data.submissions.filter(s => {
      const assign = this.data.assignments.find(a => a.id === s.assignmentId);
      return assign && courses.includes(assign.courseId);
    });

    const pendingSubs = allDosenSubs.filter(s => s.status === 'submitted');
    const gradedSubs = allDosenSubs.filter(s => s.status === 'graded');

    // Count distinct students enrolled in dosen's courses
    const enrolledStudents = this.data.users.filter(u => 
      u.role === 'mahasiswa' && (u.enrolledCourses || []).some(c => courses.includes(c))
    );

    document.getElementById('dosen-stat-courses').textContent = `${courses.length} MK`;
    document.getElementById('dosen-stat-pending').textContent = `${pendingSubs.length} Tugas`;
    document.getElementById('dosen-stat-graded').textContent = `${gradedSubs.length} Tugas`;
    document.getElementById('dosen-stat-students').textContent = `${enrolledStudents.length} Mahasiswa`;

    // Render Recent Submissions Table
    const tbody = document.getElementById('tbody-dosen-recent-submissions');
    if (!tbody) return;

    if (allDosenSubs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">Belum ada submisi tugas dari mahasiswa.</td></tr>`;
      return;
    }

    tbody.innerHTML = allDosenSubs.slice(0, 5).map(sub => {
      const student = this.getUserById(sub.studentId);
      const assign = this.data.assignments.find(a => a.id === sub.assignmentId);

      return `
        <tr>
          <td style="font-size: 0.78rem; color: var(--text-muted);">${sub.submittedAt} WIB</td>
          <td>
            <div style="font-weight: 700;">${student ? student.name : 'Mahasiswa'}</div>
            <div style="font-size: 0.75rem; color: var(--text-subtle); font-family: 'JetBrains Mono';">${student ? student.identifier : '-'}</div>
          </td>
          <td style="font-weight: 600;">${assign ? assign.title : 'Tugas'}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 0.35rem; color: #38bdf8; font-size: 0.82rem;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <span>${sub.fileName}</span>
            </div>
          </td>
          <td>
            ${sub.status === 'graded' ? `
              <span class="badge badge-success">Nilai: ${sub.grade} (${sub.letterGrade})</span>
            ` : `
              <span class="badge badge-warning">Perlu Dinilai</span>
            `}
          </td>
          <td style="text-align: right;">
            <button type="button" class="btn ${sub.status === 'graded' ? 'btn-secondary' : 'btn-emerald'} btn-sm" onclick="app.openGradeModal('${sub.id}')">
              ${sub.status === 'graded' ? 'Ubah Nilai' : 'Beri Nilai &rarr;'}
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  renderDosenGrading() {
    if (!this.currentUser) return;
    const dosen = this.currentUser;
    const courses = dosen.coursesTaught || [];

    // Populate Course Select Filter
    const selectCourse = document.getElementById('filter-dosen-course');
    if (selectCourse) {
      selectCourse.innerHTML = `
        <option value="all">Semua Mata Kuliah Diampu (${courses.length})</option>
        ${courses.map(cId => {
          const c = this.getCourseById(cId);
          return `<option value="${cId}" ${this.activeDosenCourseFilter === cId ? 'selected' : ''}>${c ? c.name : cId}</option>`;
        }).join('')}
      `;
    }

    // Filter submissions for this dosen's courses
    let submissions = this.data.submissions.filter(s => {
      const assign = this.data.assignments.find(a => a.id === s.assignmentId);
      if (!assign || !courses.includes(assign.courseId)) return false;
      if (this.activeDosenCourseFilter !== 'all' && assign.courseId !== this.activeDosenCourseFilter) return false;
      if (this.activeFilterGrading === 'pending') return s.status === 'submitted';
      if (this.activeFilterGrading === 'graded') return s.status === 'graded';
      return true;
    });

    const tbody = document.getElementById('tbody-dosen-grading');
    if (!tbody) return;

    if (submissions.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">Tidak ada pengumpulan tugas mahasiswa pada filter ini.</td></tr>`;
      return;
    }

    tbody.innerHTML = submissions.map(sub => {
      const student = this.getUserById(sub.studentId);
      const assign = this.data.assignments.find(a => a.id === sub.assignmentId);
      const course = assign ? this.getCourseById(assign.courseId) : null;

      return `
        <tr>
          <td>
            <div style="font-weight: 700;">${student ? student.name : 'Mahasiswa'}</div>
            <div style="font-size: 0.75rem; color: var(--text-subtle); font-family: 'JetBrains Mono';">NIM: ${student ? student.identifier : '-'} \u2022 ${student ? student.classGroup || 'Reguler' : ''}</div>
          </td>
          <td>
            <div style="font-weight: 600; font-size: 0.88rem;">${assign ? assign.title : 'Tugas'}</div>
            <div style="font-size: 0.75rem; color: #a78bfa;">${course ? course.name : ''}</div>
          </td>
          <td style="font-size: 0.78rem; color: var(--text-muted);">${sub.submittedAt} WIB</td>
          <td>
            <div style="display: flex; align-items: center; gap: 0.4rem; color: #38bdf8; font-weight: 600; font-size: 0.82rem;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <span>${sub.fileName}</span>
              <span style="color: var(--text-subtle); font-size: 0.7rem;">(${sub.fileSize})</span>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 3px; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${sub.notes || ''}">
              Catatan: ${sub.notes || '-'}
            </div>
          </td>
          <td>
            ${sub.status === 'graded' ? `
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 1.15rem; font-weight: 800; color: #34d399;">${sub.grade}</span>
                <span class="grade-badge grade-${sub.letterGrade ? sub.letterGrade.charAt(0) : 'A'}" style="width: 28px; height: 28px; font-size: 0.85rem;">${sub.letterGrade}</span>
              </div>
            ` : `
              <span class="badge badge-warning">Belum Dinilai</span>
            `}
          </td>
          <td style="max-width: 220px;">
            <div style="font-size: 0.78rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${sub.feedback || 'Belum ada umpan balik'}">
              ${sub.feedback ? `"${sub.feedback}"` : '<span style="color: var(--text-subtle); font-style: italic;">Belum ada umpan balik</span>'}
            </div>
          </td>
          <td style="text-align: right;">
            <button type="button" class="btn ${sub.status === 'graded' ? 'btn-secondary' : 'btn-emerald'} btn-sm" onclick="app.openGradeModal('${sub.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              <span>${sub.status === 'graded' ? 'Edit Nilai' : 'Beri Nilai'}</span>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  renderDosenClasses() {
    if (!this.currentUser) return;
    const dosen = this.currentUser;
    const courses = (dosen.coursesTaught || []).map(cId => this.getCourseById(cId)).filter(Boolean);
    const container = document.getElementById('dosen-classes-container');
    if (!container) return;

    if (courses.length === 0) {
      container.innerHTML = `<p style="color: var(--text-muted); padding: 1rem;">Tidak ada kelas aktif yang diampu.</p>`;
      return;
    }

    container.innerHTML = courses.map(c => {
      // Find students taking this course
      const studentsInCourse = this.data.users.filter(u => 
        u.role === 'mahasiswa' && (u.enrolledCourses || []).includes(c.id)
      );

      return `
        <div class="card" style="margin-bottom: 2rem;">
          <div class="card-header">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="badge badge-info">${c.code}</span>
                <span style="font-size: 0.85rem; color: var(--text-muted);">${c.credits} SKS</span>
              </div>
              <h2 class="card-title" style="margin-top: 0.35rem;">${c.name}</h2>
              <div style="font-size: 0.8rem; color: var(--text-subtle);">${c.schedule}</div>
            </div>
            <div>
              <span class="badge badge-success">${studentsInCourse.length} Mahasiswa Terdaftar</span>
            </div>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>NIM</th>
                  <th>Nama Mahasiswa</th>
                  <th>Program Studi</th>
                  <th>Kelas</th>
                  <th style="text-align: center;">Tugas</th>
                  <th style="text-align: center;">UTS</th>
                  <th style="text-align: center;">UAS</th>
                  <th style="text-align: center;">Nilai Akhir</th>
                  <th style="text-align: center;">Huruf</th>
                  <th style="text-align: center;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${studentsInCourse.map(mhs => {
                  const gr = this.data.grades.find(g => g.studentId === mhs.id && g.courseId === c.id);
                  return `
                    <tr>
                      <td><code style="font-weight: 700; color: #38bdf8;">${mhs.identifier}</code></td>
                      <td style="font-weight: 600;">${mhs.name}</td>
                      <td>${mhs.department}</td>
                      <td>${mhs.classGroup || 'TI-5A'}</td>
                      <td style="text-align: center;">${gr ? gr.assignmentScore : '-'}</td>
                      <td style="text-align: center;">${gr ? gr.midtermScore : '-'}</td>
                      <td style="text-align: center;">${gr ? gr.finalScore : '-'}</td>
                      <td style="text-align: center; font-weight: 800; color: #38bdf8;">${gr ? gr.totalScore : '-'}</td>
                      <td style="text-align: center;">
                        ${gr ? `<div class="grade-badge grade-${gr.letterGrade.charAt(0)}" style="width:28px;height:28px;font-size:0.85rem;">${gr.letterGrade}</div>` : '-'}
                      </td>
                      <td style="text-align: center;">
                        ${gr ? `<span class="badge ${gr.status === 'Lulus' ? 'badge-success' : 'badge-danger'}">${gr.status}</span>` : '-'}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // VIEW RENDERERS: ADMIN (MANAJEMEN AKUN)
  // =========================================================================

  renderAdminDashboard() {
    const totalMhs = this.data.users.filter(u => u.role === 'mahasiswa').length;
    const totalDosen = this.data.users.filter(u => u.role === 'dosen').length;
    const totalCourses = this.data.courses.length;
    const totalSubs = this.data.submissions.length;

    document.getElementById('admin-stat-mhs-count').textContent = totalMhs;
    document.getElementById('admin-stat-dosen-count').textContent = totalDosen;
    document.getElementById('admin-stat-courses-count').textContent = totalCourses;
    document.getElementById('admin-stat-submissions-count').textContent = `${totalSubs} Berkas`;

    const tbody = document.getElementById('tbody-admin-quick-users');
    if (!tbody) return;

    tbody.innerHTML = this.data.users.slice(0, 6).map(u => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <div class="user-avatar-circle" style="width: 30px; height: 30px; font-size: 0.75rem; background: ${u.avatarBg || '#4f46e5'};">
              ${this.getInitials(u.name)}
            </div>
            <div>
              <div style="font-weight: 700; font-size: 0.88rem;">${u.name}</div>
              <div style="font-size: 0.72rem; color: var(--text-subtle);">@${u.username}</div>
            </div>
          </div>
        </td>
        <td>
          <span class="role-badge-tag role-${u.role}">${u.role}</span>
        </td>
        <td><code style="font-family: 'JetBrains Mono'; color: #38bdf8;">${u.identifier}</code></td>
        <td style="font-size: 0.82rem; color: var(--text-muted);">${u.email}</td>
        <td style="font-size: 0.82rem;">${u.department}</td>
        <td>
          <span class="badge ${u.status === 'Aktif' ? 'badge-success' : 'badge-danger'}">${u.status}</span>
        </td>
      </tr>
    `).join('');
  }

  renderAdminUsersList() {
    const searchVal = (document.getElementById('admin-user-search')?.value || '').toLowerCase().trim();
    const roleFilter = document.getElementById('admin-role-filter')?.value || 'all';

    const filteredUsers = this.data.users.filter(u => {
      const matchRole = roleFilter === 'all' || u.role === roleFilter;
      const matchSearch = !searchVal || 
        u.name.toLowerCase().includes(searchVal) ||
        u.identifier.toLowerCase().includes(searchVal) ||
        u.email.toLowerCase().includes(searchVal) ||
        u.department.toLowerCase().includes(searchVal);
      return matchRole && matchSearch;
    });

    const countEl = document.getElementById('admin-filtered-count');
    if (countEl) countEl.textContent = filteredUsers.length;

    const tbody = document.getElementById('tbody-admin-users-list');
    if (!tbody) return;

    if (filteredUsers.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">Tidak ada akun pengguna yang sesuai dengan kriteria pencarian.</td></tr>`;
      return;
    }

    tbody.innerHTML = filteredUsers.map(u => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div class="user-avatar-circle" style="width: 36px; height: 36px; font-size: 0.85rem; background: ${u.avatarBg || '#4f46e5'};">
              ${this.getInitials(u.name)}
            </div>
            <div>
              <div style="font-weight: 700;">${u.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-subtle);">Username: <code>${u.username}</code></div>
            </div>
          </div>
        </td>
        <td>
          <span class="role-badge-tag role-${u.role}">${u.role}</span>
        </td>
        <td>
          <code style="font-family: 'JetBrains Mono'; font-weight: 700; color: #38bdf8;">${u.identifier}</code>
        </td>
        <td style="font-size: 0.82rem; color: var(--text-muted);">${u.email}</td>
        <td>
          <div style="font-size: 0.85rem;">${u.department}</div>
          ${u.role === 'mahasiswa' ? `<div style="font-size: 0.72rem; color: var(--text-subtle);">Semester ${u.semester} \u2022 IPK: ${u.gpa || '-'}</div>` : ''}
        </td>
        <td>
          <span class="badge ${u.status === 'Aktif' ? 'badge-success' : 'badge-danger'}">${u.status}</span>
        </td>
        <td style="text-align: right;">
          <div style="display: inline-flex; gap: 0.35rem;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="app.openEditUserModal('${u.id}')" title="Edit Akun">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="app.resetPassword('${u.id}')" title="Reset Password">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </button>
            <button type="button" class="btn btn-danger btn-sm" onclick="app.deleteUser('${u.id}')" title="Hapus Akun">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  renderAdminCourses() {
    const grid = document.getElementById('admin-courses-grid');
    if (!grid) return;

    grid.innerHTML = this.data.courses.map(c => {
      const lecturer = this.getUserById(c.lecturerId);
      const studentCount = this.data.users.filter(u => u.role === 'mahasiswa' && (u.enrolledCourses || []).includes(c.id)).length;
      const tasksCount = this.data.assignments.filter(a => a.courseId === c.id).length;

      return `
        <div class="card" style="border-top: 4px solid ${c.color || '#4f46e5'};">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span class="badge badge-info">${c.code}</span>
            <span style="font-weight: 700; color: #34d399;">${c.credits} SKS</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 800; margin: 0.5rem 0 0.25rem 0;">${c.name}</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">${c.schedule}</p>
          
          <div style="padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.78rem;">
            <div>Dosen: <strong>${lecturer ? lecturer.name : c.lecturerName}</strong></div>
            <div style="color: var(--text-subtle);">Jumlah Mahasiswa: <strong>${studentCount} Peserta</strong></div>
            <div style="color: var(--text-subtle);">Tugas Aktif: <strong>${tasksCount} Penugasan</strong></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // VIEW RENDERERS: FORUM DISKUSI (BERDISKUSI)
  // =========================================================================

  renderForum() {
    const container = document.getElementById('forum-threads-container');
    if (!container) return;

    const filtered = this.data.discussions.filter(t => {
      if (this.activeFilterForum === 'all') return true;
      return t.category.toLowerCase().includes(this.activeFilterForum.toLowerCase());
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 3rem 1.5rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">💬</div>
          <h3>Belum ada topik diskusi dalam kategori ini</h3>
          <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.25rem;">Jadilah yang pertama untuk membuka diskusi atau bertanya pada dosen.</p>
          <button type="button" class="btn btn-primary btn-sm" style="margin-top: 1rem;" onclick="app.openNewThreadModal()">Buat Topik Baru</button>
        </div>
      `;
      return;
    }

    const currentUserId = this.currentUser ? this.currentUser.id : null;

    container.innerHTML = filtered.map(t => {
      const isLiked = currentUserId && (t.likedBy || []).includes(currentUserId);
      const likesCount = t.likes || 0;

      return `
        <div class="forum-thread-card" id="thread-${t.id}">
          <div class="thread-author-bar">
            <div class="thread-author-avatar" style="background: ${t.authorAvatarBg || '#4f46e5'};">
              ${this.getInitials(t.authorName)}
            </div>
            <div class="thread-author-meta">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <h4>${t.authorName}</h4>
                <span class="role-badge-tag role-${t.authorRole}" style="font-size: 0.62rem; padding: 0.1rem 0.45rem;">${t.authorRole}</span>
              </div>
              <div class="thread-time">${t.createdAt} \u2022 Kategori: <span style="color: #38bdf8;">${t.category}</span></div>
            </div>
          </div>

          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.45rem;">${t.title}</h3>
          <p class="thread-content">${t.content}</p>

          <div class="thread-actions">
            <button type="button" class="like-btn ${isLiked ? 'liked' : ''}" onclick="app.toggleLikeThread('${t.id}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <span>${likesCount} Disukai</span>
            </button>
            <div style="font-size: 0.82rem; color: var(--text-subtle);">
              ${(t.replies || []).length} Balasan
            </div>
          </div>

          <!-- Replies Tree -->
          <div class="replies-container">
            ${(t.replies || []).map(r => `
              <div class="reply-item ${r.isVerifiedAnswer ? 'verified-by-dosen' : ''}">
                ${r.isVerifiedAnswer ? `<div class="verified-pill">&check; Jawaban Terverifikasi Dosen</div>` : ''}
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
                  <div class="user-avatar-circle" style="width: 24px; height: 24px; font-size: 0.7rem; background: ${r.authorAvatarBg || '#0284c7'};">
                    ${this.getInitials(r.authorName)}
                  </div>
                  <strong style="font-size: 0.82rem;">${r.authorName}</strong>
                  <span class="role-badge-tag role-${r.authorRole}" style="font-size: 0.6rem; padding: 0.1rem 0.4rem;">${r.authorRole}</span>
                  <span style="font-size: 0.7rem; color: var(--text-subtle); margin-left: auto;">${r.createdAt}</span>
                </div>
                <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.5;">${r.content}</p>
              </div>
            `).join('')}

            <!-- Reply Input Box -->
            <form onsubmit="app.submitReply(event, '${t.id}')" style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
              <input type="text" class="form-control" id="reply-input-${t.id}" placeholder="Tuliskan balasan atau pertanyaan lanjutan..." required style="font-size: 0.84rem;">
              <button type="submit" class="btn btn-primary btn-sm" style="flex-shrink: 0;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Balas
              </button>
            </form>
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // ACTIONS & HANDLERS: MAHASISWA TUGAS
  // =========================================================================

  openSubmitTaskModal(assignmentId) {
    const assignment = this.data.assignments.find(a => a.id === assignmentId);
    if (!assignment) return;
    const course = this.getCourseById(assignment.courseId);

    document.getElementById('submit-assignment-id').value = assignment.id;
    document.getElementById('modal-submit-course-name').textContent = course ? `${course.name} (${course.code})` : 'Mata Kuliah';
    document.getElementById('modal-submit-task-name').textContent = assignment.title;
    document.getElementById('modal-submit-deadline').textContent = `Batas Pengumpulan: ${assignment.deadline} WIB`;
    document.getElementById('dropzone-file-label').textContent = 'Klik untuk memilih berkas dari komputer';
    document.getElementById('submit-student-notes').value = '';
    document.getElementById('submit-file-input').value = '';

    this.openModal('modal-submit-task');
  }

  handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
      document.getElementById('dropzone-file-label').innerHTML = `
        <span style="color: #38bdf8; font-weight: 700;">${file.name}</span>
        <span style="font-size: 0.75rem; color: var(--text-subtle);">(${(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
      `;
    }
  }

  handleTaskSubmission(e) {
    e.preventDefault();
    if (!this.currentUser) return;

    const assignmentId = document.getElementById('submit-assignment-id').value;
    const notes = document.getElementById('submit-student-notes').value.trim();
    const fileInput = document.getElementById('submit-file-input');

    let fileName = `Tugas_${this.currentUser.name.replace(/\s+/g, '')}_${this.currentUser.identifier}.pdf`;
    let fileSize = '3.5 MB';

    if (fileInput.files && fileInput.files[0]) {
      fileName = fileInput.files[0].name;
      fileSize = `${(fileInput.files[0].size / (1024 * 1024)).toFixed(1)} MB`;
    }

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const submittedAt = `${dateStr} ${timeStr}`;

    // Create new submission record
    const newSubmission = {
      id: `SUB-${Date.now().toString().slice(-4)}`,
      assignmentId: assignmentId,
      studentId: this.currentUser.id,
      submittedAt: submittedAt,
      fileName: fileName,
      fileSize: fileSize,
      notes: notes,
      fileUrl: '#mock-file-download',
      status: 'submitted',
      grade: null,
      letterGrade: null,
      feedback: null,
      gradedBy: null,
      gradedAt: null
    };

    // Remove any previous submission if exists and push new
    this.data.submissions = this.data.submissions.filter(s => !(s.assignmentId === assignmentId && s.studentId === this.currentUser.id));
    this.data.submissions.push(newSubmission);

    this.saveState();
    this.closeModal('modal-submit-task');
    this.showToast('Tugas Anda berhasil diunggah! Menunggu evaluasi dosen.', 'success');
    this.refreshCurrentView();
  }

  // =========================================================================
  // ACTIONS & HANDLERS: DOSEN PENILAIAN
  // =========================================================================

  openGradeModal(submissionId) {
    const sub = this.data.submissions.find(s => s.id === submissionId);
    if (!sub) return;

    const student = this.getUserById(sub.studentId);
    const assign = this.data.assignments.find(a => a.id === sub.assignmentId);

    document.getElementById('grade-submission-id').value = sub.id;
    document.getElementById('grade-student-name').textContent = student ? student.name : 'Mahasiswa';
    document.getElementById('grade-student-id').textContent = `NIM: ${student ? student.identifier : '-'} \u2022 ${student ? student.department : ''}`;
    document.getElementById('grade-task-title-badge').textContent = assign ? assign.title : 'Tugas Kuliah';
    document.getElementById('grade-file-name').textContent = sub.fileName;
    document.getElementById('grade-file-size').textContent = `(${sub.fileSize})`;
    document.getElementById('grade-student-notes').textContent = sub.notes ? `"${sub.notes}"` : 'Tidak ada catatan mahasiswa.';

    document.getElementById('grade-score-input').value = sub.grade !== null ? sub.grade : '';
    document.getElementById('grade-feedback-input').value = sub.feedback || '';

    this.calculateLetterGradePreview();
    this.openModal('modal-grade-submission');
  }

  calculateLetterGradePreview() {
    const scoreVal = parseFloat(document.getElementById('grade-score-input').value);
    const previewEl = document.getElementById('grade-letter-preview');
    if (isNaN(scoreVal)) {
      previewEl.textContent = '-';
      return;
    }

    const { letter, color } = this.scoreToLetter(scoreVal);
    previewEl.textContent = letter;
    previewEl.style.color = color;
  }

  handleGradeSubmission(e) {
    e.preventDefault();
    if (!this.currentUser) return;

    const subId = document.getElementById('grade-submission-id').value;
    const score = parseFloat(document.getElementById('grade-score-input').value);
    const feedback = document.getElementById('grade-feedback-input').value.trim();

    if (isNaN(score) || score < 0 || score > 100) {
      this.showToast('Skor harus berada di antara 0 hingga 100!', 'warning');
      return;
    }

    const sub = this.data.submissions.find(s => s.id === subId);
    if (!sub) return;

    const { letter, point } = this.scoreToLetter(score);

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Update submission
    sub.status = 'graded';
    sub.grade = score;
    sub.letterGrade = letter;
    sub.feedback = feedback;
    sub.gradedBy = this.currentUser.id;
    sub.gradedAt = `${dateStr} ${timeStr}`;

    // Sinkronisasi otomatis ke tabel Kartu Hasil Studi (KHS / Transkrip Nilai)
    const assign = this.data.assignments.find(a => a.id === sub.assignmentId);
    if (assign) {
      let gradeRecord = this.data.grades.find(g => g.studentId === sub.studentId && g.courseId === assign.courseId);
      if (!gradeRecord) {
        // Buat record nilai baru
        gradeRecord = {
          id: `GRD-${Date.now().toString().slice(-4)}`,
          studentId: sub.studentId,
          courseId: assign.courseId,
          assignmentScore: score,
          midtermScore: 80, // Nilai proyeksi
          finalScore: 82,   // Nilai proyeksi
          totalScore: Math.round((score * 0.3) + (80 * 0.3) + (82 * 0.4)),
          letterGrade: letter,
          gradePoint: point,
          semester: '5',
          status: score >= 55 ? 'Lulus' : 'Tidak Lulus',
          updatedBy: this.currentUser.id,
          updatedAt: `${dateStr} ${timeStr}`
        };
        this.data.grades.push(gradeRecord);
      } else {
        // Perbarui komponen nilai tugas
        gradeRecord.assignmentScore = score;
        const total = (score * 0.3) + ((gradeRecord.midtermScore || 80) * 0.3) + ((gradeRecord.finalScore || 80) * 0.4);
        gradeRecord.totalScore = parseFloat(total.toFixed(1));
        const finalLetter = this.scoreToLetter(gradeRecord.totalScore);
        gradeRecord.letterGrade = finalLetter.letter;
        gradeRecord.gradePoint = finalLetter.point;
        gradeRecord.status = gradeRecord.totalScore >= 55 ? 'Lulus' : 'Tidak Lulus';
        gradeRecord.updatedBy = this.currentUser.id;
        gradeRecord.updatedAt = `${dateStr} ${timeStr}`;
      }
    }

    this.saveState();
    this.closeModal('modal-grade-submission');
    this.showToast(`Nilai ${score} (${letter}) dan umpan balik berhasil disimpan!`, 'success');
    this.refreshCurrentView();
  }

  // =========================================================================
  // ACTIONS & HANDLERS: ADMIN (MANAJEMEN AKUN)
  // =========================================================================

  openAddUserModal() {
    document.getElementById('modal-manage-user-title').textContent = 'Tambah Akun Pengguna Baru';
    document.getElementById('manage-user-id').value = '';
    document.getElementById('manage-user-role').value = 'mahasiswa';
    document.getElementById('manage-user-role').disabled = false;
    document.getElementById('manage-user-identifier').value = '';
    document.getElementById('manage-user-identifier').disabled = false;
    document.getElementById('manage-user-name').value = '';
    document.getElementById('manage-user-email').value = '';
    document.getElementById('manage-user-department').value = 'Teknik Informatika';
    document.getElementById('manage-user-semester').value = '1';
    document.getElementById('manage-user-gpa').value = '3.50';
    document.getElementById('manage-user-password').value = 'password123';

    this.handleRoleChangeInUserModal();
    this.openModal('modal-manage-user');
  }

  openEditUserModal(userId) {
    const user = this.getUserById(userId);
    if (!user) return;

    document.getElementById('modal-manage-user-title').textContent = `Edit Akun: ${user.name}`;
    document.getElementById('manage-user-id').value = user.id;
    document.getElementById('manage-user-role').value = user.role;
    document.getElementById('manage-user-role').disabled = true; // Tidak bisa ubah peran saat edit
    document.getElementById('manage-user-identifier').value = user.identifier;
    document.getElementById('manage-user-identifier').disabled = true; // Identitas tetap unik
    document.getElementById('manage-user-name').value = user.name;
    document.getElementById('manage-user-email').value = user.email;
    document.getElementById('manage-user-department').value = user.department;
    document.getElementById('manage-user-semester').value = user.semester || 1;
    document.getElementById('manage-user-gpa').value = user.gpa || 3.5;
    document.getElementById('manage-user-password').value = user.password;

    this.handleRoleChangeInUserModal();
    this.openModal('modal-manage-user');
  }

  handleRoleChangeInUserModal() {
    const role = document.getElementById('manage-user-role').value;
    const labelId = document.getElementById('label-user-identifier');
    const inputId = document.getElementById('manage-user-identifier');
    const mhsFields = document.getElementById('user-mhs-specific-fields');

    if (role === 'mahasiswa') {
      labelId.textContent = 'NIM (Nomor Induk Mahasiswa - Wajib Unik)';
      inputId.placeholder = 'Contoh: 2201010999';
      mhsFields.style.display = 'grid';
    } else if (role === 'dosen') {
      labelId.textContent = 'NIP (Nomor Induk Pegawai - Wajib Unik)';
      inputId.placeholder = 'Contoh: 198501012010121004';
      mhsFields.style.display = 'none';
    } else {
      labelId.textContent = 'ID Petugas / Administrator (Wajib Unik)';
      inputId.placeholder = 'Contoh: ADM-9003401';
      mhsFields.style.display = 'none';
    }
  }

  handleManageUserSubmit(e) {
    e.preventDefault();
    const editId = document.getElementById('manage-user-id').value;
    const role = document.getElementById('manage-user-role').value;
    const identifier = document.getElementById('manage-user-identifier').value.trim();
    const name = document.getElementById('manage-user-name').value.trim();
    const email = document.getElementById('manage-user-email').value.trim().toLowerCase();
    const department = document.getElementById('manage-user-department').value.trim();
    const password = document.getElementById('manage-user-password').value.trim() || 'password123';
    const semester = parseInt(document.getElementById('manage-user-semester').value) || 1;
    const gpa = parseFloat(document.getElementById('manage-user-gpa').value) || 3.5;

    // VALIDASI KETAT: Seluruh akun dan datanya sintetis (*Tidak boleh sama)
    const existingByIdentifier = this.data.users.find(u => u.identifier.toLowerCase() === identifier.toLowerCase() && u.id !== editId);
    if (existingByIdentifier) {
      this.showToast(`Error: ${role === 'mahasiswa' ? 'NIM' : 'NIP/ID'} "${identifier}" sudah digunakan oleh ${existingByIdentifier.name}! Seluruh identitas wajib unik.`, 'error');
      return;
    }

    const existingByEmail = this.data.users.find(u => u.email.toLowerCase() === email && u.id !== editId);
    if (existingByEmail) {
      this.showToast(`Error: Alamat email "${email}" sudah terdaftar untuk pengguna lain! Email wajib unik.`, 'error');
      return;
    }

    if (editId) {
      // UPDATE EXISTING USER
      const user = this.getUserById(editId);
      if (!user) return;

      user.name = name;
      user.email = email;
      user.department = department;
      user.password = password;
      if (user.role === 'mahasiswa') {
        user.semester = semester;
        user.gpa = gpa;
      }

      this.saveState();
      this.closeModal('modal-manage-user');
      this.showToast(`Data akun "${name}" berhasil diperbarui!`, 'success');
      this.refreshCurrentView();
    } else {
      // CREATE NEW USER
      const cleanUsername = name.toLowerCase().replace(/[^a-z0-9]/g, '.').slice(0, 15);
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');

      const newUser = {
        id: `usr-${role}-${Date.now().toString().slice(-4)}`,
        role: role,
        username: `${cleanUsername}`,
        password: password,
        name: name,
        identifier: identifier,
        email: email,
        department: department,
        status: 'Aktif',
        avatarBg: randomColor,
        joinedDate: new Date().toISOString().slice(0, 10)
      };

      if (role === 'mahasiswa') {
        newUser.semester = semester;
        newUser.gpa = gpa;
        newUser.totalCredits = semester * 20;
        newUser.classGroup = `${department.slice(0, 2).toUpperCase()}-${semester}A`;
        newUser.academicAdvisor = 'Dr. Ir. Budi Hartono, M.Sc.';
        newUser.enrolledCourses = ['MK-CS-301', 'MK-PW-302']; // Default enroll ke 2 kelas
      } else if (role === 'dosen') {
        newUser.expertise = department;
        newUser.coursesTaught = ['MK-CS-301'];
      }

      this.data.users.push(newUser);
      this.saveState();
      this.closeModal('modal-manage-user');
      this.showToast(`Akun baru ${name} (${identifier}) berhasil didaftarkan!`, 'success');
      this.refreshCurrentView();
    }
  }

  deleteUser(userId) {
    const user = this.getUserById(userId);
    if (!user) return;

    if (this.currentUser && this.currentUser.id === userId) {
      this.showToast('Anda tidak dapat menghapus akun Anda sendiri saat sedang masuk!', 'warning');
      return;
    }

    if (confirm(`Apakah Anda yakin ingin menghapus akun "${user.name}" (${user.identifier}) secara permanen dari sistem?`)) {
      this.data.users = this.data.users.filter(u => u.id !== userId);
      // Clean up relations
      this.data.submissions = this.data.submissions.filter(s => s.studentId !== userId);
      this.data.grades = this.data.grades.filter(g => g.studentId !== userId);

      this.saveState();
      this.showToast(`Akun ${user.name} berhasil dihapus.`, 'info');
      this.refreshCurrentView();
    }
  }

  resetPassword(userId) {
    const user = this.getUserById(userId);
    if (!user) return;

    const newPass = `cakrawala${Math.floor(100 + Math.random() * 900)}!`;
    user.password = newPass;
    this.saveState();
    alert(`Kata sandi akun ${user.name} (${user.identifier}) berhasil direset!\n\nKata sandi baru: ${newPass}`);
    this.showToast(`Kata sandi akun ${user.name} telah direset.`, 'success');
  }

  exportUsersJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data.users, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Data_Akun_Pengguna_UCN_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.showToast('Data akun pengguna berhasil diekspor ke format JSON!', 'success');
  }

  // =========================================================================
  // ACTIONS & HANDLERS: FORUM DISKUSI
  // =========================================================================

  openNewThreadModal() {
    document.getElementById('thread-title-input').value = '';
    document.getElementById('thread-content-input').value = '';
    this.openModal('modal-new-thread');
  }

  handleNewThreadSubmit(e) {
    e.preventDefault();
    if (!this.currentUser) return;

    const category = document.getElementById('thread-category-input').value;
    const title = document.getElementById('thread-title-input').value.trim();
    const content = document.getElementById('thread-content-input').value.trim();

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newThread = {
      id: `FORUM-${Date.now().toString().slice(-4)}`,
      title: title,
      category: category,
      courseId: 'MK-GEN',
      authorId: this.currentUser.id,
      authorName: this.currentUser.name,
      authorRole: this.currentUser.role,
      authorAvatarBg: this.currentUser.avatarBg || '#4f46e5',
      createdAt: `${dateStr} ${timeStr}`,
      content: content,
      likes: 1,
      likedBy: [this.currentUser.id],
      replies: []
    };

    this.data.discussions.unshift(newThread);
    this.saveState();
    this.closeModal('modal-new-thread');
    this.showToast('Topik diskusi baru berhasil dipublikasikan!', 'success');
    this.renderForum();
  }

  submitReply(e, threadId) {
    e.preventDefault();
    if (!this.currentUser) return;

    const input = document.getElementById(`reply-input-${threadId}`);
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    const thread = this.data.discussions.find(t => t.id === threadId);
    if (!thread) return;

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newReply = {
      id: `REP-${Date.now().toString().slice(-4)}`,
      authorId: this.currentUser.id,
      authorName: this.currentUser.name,
      authorRole: this.currentUser.role,
      authorAvatarBg: this.currentUser.avatarBg || '#4f46e5',
      createdAt: `${dateStr} ${timeStr}`,
      content: text,
      likes: 0,
      isVerifiedAnswer: this.currentUser.role === 'dosen' // Verifikasi otomatis bila dosen
    };

    if (!thread.replies) thread.replies = [];
    thread.replies.push(newReply);

    this.saveState();
    input.value = '';
    this.showToast('Tanggapan Anda terkirim di forum!', 'success');
    this.renderForum();
  }

  toggleLikeThread(threadId) {
    if (!this.currentUser) return;
    const thread = this.data.discussions.find(t => t.id === threadId);
    if (!thread) return;

    if (!thread.likedBy) thread.likedBy = [];
    const idx = thread.likedBy.indexOf(this.currentUser.id);

    if (idx >= 0) {
      thread.likedBy.splice(idx, 1);
      thread.likes = Math.max(0, (thread.likes || 1) - 1);
    } else {
      thread.likedBy.push(this.currentUser.id);
      thread.likes = (thread.likes || 0) + 1;
    }

    this.saveState();
    this.renderForum();
  }

  // =========================================================================
  // MODAL & UI HELPERS
  // =========================================================================

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
    }
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `
      <span style="font-size: 1.1rem;">${icon}</span>
      <div style="flex: 1; font-size: 0.88rem; font-weight: 500;">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  openQuickRoleSwitcherModal() {
    const grid = document.getElementById('quick-switcher-grid');
    if (!grid) return;

    // Render list of synthetic accounts for quick switching
    grid.innerHTML = this.data.users.map(u => {
      const isCurrent = this.currentUser && this.currentUser.id === u.id;
      return `
        <div class="demo-account-chip" style="${isCurrent ? 'border-color: var(--primary); background: rgba(79, 70, 229, 0.15);' : ''}" onclick="app.quickLogin('${u.id}')">
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <div class="user-avatar-circle" style="width: 32px; height: 32px; font-size: 0.75rem; background: ${u.avatarBg || '#4f46e5'};">
              ${this.getInitials(u.name)}
            </div>
            <div>
              <strong style="color: ${u.role === 'mahasiswa' ? '#38bdf8' : (u.role === 'dosen' ? '#a78bfa' : '#fb7185')}; font-size: 0.85rem;">
                ${u.name} ${isCurrent ? '(Sedang Aktif)' : ''}
              </strong>
              <div style="font-size: 0.7rem; color: var(--text-subtle);">
                ${u.role.toUpperCase()} \u2022 ID: ${u.identifier} \u2022 ${u.department}
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" style="font-size: 0.72rem;">
            ${isCurrent ? 'Aktif' : 'Pilih &rarr;'}
          </button>
        </div>
      `;
    }).join('');

    this.openModal('modal-quick-switcher');
  }

  // =========================================================================
  // UTILITY METHODS
  // =========================================================================

  getUserById(id) {
    return this.data.users.find(u => u.id === id);
  }

  getUserName(id) {
    const u = this.getUserById(id);
    return u ? u.name : 'Dosen Pengampu';
  }

  getCourseById(courseId) {
    return this.data.courses.find(c => c.id === courseId);
  }

  getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  calculateGPA(grades) {
    if (!grades || grades.length === 0) return 3.75;
    let totalPts = 0;
    let count = 0;
    grades.forEach(g => {
      if (g.gradePoint !== null && !isNaN(g.gradePoint)) {
        totalPts += g.gradePoint;
        count++;
      }
    });
    return count > 0 ? (totalPts / count) : 3.75;
  }

  calculateTotalCredits(user) {
    if (!user) return 96;
    if (user.totalCredits) return user.totalCredits;
    return (user.semester || 5) * 19;
  }

  scoreToLetter(score) {
    if (score >= 85) return { letter: 'A', point: 4.0, color: '#34d399' };
    if (score >= 80) return { letter: 'A-', point: 3.7, color: '#34d399' };
    if (score >= 75) return { letter: 'B+', point: 3.3, color: '#38bdf8' };
    if (score >= 70) return { letter: 'B', point: 3.0, color: '#38bdf8' };
    if (score >= 65) return { letter: 'B-', point: 2.7, color: '#fbbf24' };
    if (score >= 60) return { letter: 'C+', point: 2.3, color: '#fbbf24' };
    if (score >= 55) return { letter: 'C', point: 2.0, color: '#fbbf24' };
    if (score >= 45) return { letter: 'D', point: 1.0, color: '#fb7185' };
    return { letter: 'E', point: 0.0, color: '#f43f5e' };
  }

  // =========================================================================
  // EVENT BINDINGS
  // =========================================================================

  bindEvents() {
    // Login form submit
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        this.login(username, password);
      });
    }

    // Logout button
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logout());
    }

    // Theme toggle button
    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Reset data button
    const resetBtn = document.getElementById('btn-reset-data');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetAllData());
    }

    // Quick role switcher button
    const quickSwitchBtn = document.getElementById('btn-quick-switch');
    if (quickSwitchBtn) {
      quickSwitchBtn.addEventListener('click', () => this.openQuickRoleSwitcherModal());
    }

    // Mobile sidebar toggle
    const openSidebarBtn = document.getElementById('btn-open-sidebar');
    const closeSidebarBtn = document.getElementById('btn-close-sidebar');
    const sidebar = document.getElementById('app-sidebar');

    if (openSidebarBtn && sidebar) {
      openSidebarBtn.addEventListener('click', () => sidebar.classList.add('mobile-open'));
    }
    if (closeSidebarBtn && sidebar) {
      closeSidebarBtn.addEventListener('click', () => sidebar.classList.remove('mobile-open'));
    }

    // Sidebar navigation clicks
    document.querySelectorAll('.nav-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const viewId = btn.getAttribute('data-view');
        if (viewId) this.switchView(viewId);
      });
    });

    // Student Assignment filter clicks
    const taskFilters = document.querySelectorAll('#filter-assignment-status button');
    taskFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        taskFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilterAssignment = btn.getAttribute('data-filter');
        this.renderMahasiswaAssignments();
      });
    });

    // Dosen Grading course filter
    const dosenCourseSelect = document.getElementById('filter-dosen-course');
    if (dosenCourseSelect) {
      dosenCourseSelect.addEventListener('change', (e) => {
        this.activeDosenCourseFilter = e.target.value;
        this.renderDosenGrading();
      });
    }

    // Dosen Grading status filter
    const gradingFilters = document.querySelectorAll('#filter-grading-status button');
    gradingFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        gradingFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilterGrading = btn.getAttribute('data-filter');
        this.renderDosenGrading();
      });
    });

    // Admin user search & filter
    const adminSearch = document.getElementById('admin-user-search');
    const adminRoleFilter = document.getElementById('admin-role-filter');
    if (adminSearch) {
      adminSearch.addEventListener('input', () => this.renderAdminUsersList());
    }
    if (adminRoleFilter) {
      adminRoleFilter.addEventListener('change', () => this.renderAdminUsersList());
    }

    // Forum category filter
    const forumFilters = document.querySelectorAll('#filter-forum-category button');
    forumFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        forumFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilterForum = btn.getAttribute('data-cat');
        this.renderForum();
      });
    });

    // Form Submissions
    const submitTaskForm = document.getElementById('form-submit-task');
    if (submitTaskForm) {
      submitTaskForm.addEventListener('submit', (e) => this.handleTaskSubmission(e));
    }

    const gradeForm = document.getElementById('form-grade-submission');
    if (gradeForm) {
      gradeForm.addEventListener('submit', (e) => this.handleGradeSubmission(e));
    }

    const manageUserForm = document.getElementById('form-manage-user');
    if (manageUserForm) {
      manageUserForm.addEventListener('submit', (e) => this.handleManageUserSubmit(e));
    }

    const newThreadForm = document.getElementById('form-new-thread');
    if (newThreadForm) {
      newThreadForm.addEventListener('submit', (e) => this.handleNewThreadSubmit(e));
    }

    // Close modal on click outside modal-box
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('active');
        }
      });
    });
  }
}

// Inisialisasi Aplikasi ke window global
window.addEventListener('DOMContentLoaded', () => {
  window.app = new CampusPortalApp();
});
