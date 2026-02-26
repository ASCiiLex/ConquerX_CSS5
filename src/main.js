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
  const header = document.querySelector('.header')
  const toggle = document.querySelector('.header__toggle')
  const nav = document.querySelector('.header__nav')
  const overlay = document.querySelector('.header__overlay')

  if (!header || !toggle || !nav) return

  function openMenu() {
    header.classList.add('header--open')
    toggle.setAttribute('aria-expanded', true)
    document.body.classList.add('menu-open')

    const firstLink = nav.querySelector('a')
    if (firstLink) firstLink.focus()
  }

  function closeMenu() {
    header.classList.remove('header--open')
    toggle.setAttribute('aria-expanded', false)
    document.body.classList.remove('menu-open')
    toggle.focus()
  }

  toggle.addEventListener('click', () => {
    const isOpen = header.classList.contains('header--open')
    isOpen ? closeMenu() : openMenu()
  })

  if (overlay) {
    overlay.addEventListener('click', closeMenu)
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('header--open')) {
      closeMenu()
    }
  })
}

document.addEventListener('DOMContentLoaded', initLayout)