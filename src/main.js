import './sass/main.scss'

async function loadComponent(selector, path) {
  const element = document.querySelector(selector)
  if (!element) return

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}${path}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const html = await response.text()
    element.innerHTML = html
  } catch (error) {
    console.error(`Error loading ${path}:`, error)
  }
}

async function initLayout() {
  await loadComponent('[data-header]', 'src/components/header.html')
  await loadComponent('[data-footer]', 'src/components/footer.html')

  setActiveNavLink()
  initHeaderInteractions()
}

function setActiveNavLink() {
  const currentPath = window.location.pathname

  const navLinks = document.querySelectorAll('header nav a')

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname

    if (linkPath === currentPath) {
      link.classList.add('active')
      link.removeAttribute('href')
    }
  })
}

function initHeaderInteractions() {
  const toggle = document.querySelector('.nav-toggle')
  const nav = document.querySelector('.site-nav')
  const overlay = document.querySelector('.nav-overlay')

  if (!toggle || !nav) return

  function openMenu() {
    nav.classList.add('is-open')
    toggle.classList.add('is-active')
    toggle.setAttribute('aria-expanded', true)
    document.body.classList.add('menu-open')

    // Enfocar primer enlace
    const firstLink = nav.querySelector('a')
    if (firstLink) firstLink.focus()
  }

  function closeMenu() {
    nav.classList.remove('is-open')
    toggle.classList.remove('is-active')
    toggle.setAttribute('aria-expanded', false)
    document.body.classList.remove('menu-open')

    // Devolver foco al botón
    toggle.focus()
  }

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('is-open')
    isOpen ? closeMenu() : openMenu()
  })

  if (overlay) {
    overlay.addEventListener('click', closeMenu)
  }

  // Cierre con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu()
    }
  })
}

document.addEventListener('DOMContentLoaded', initLayout)