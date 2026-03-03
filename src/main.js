import './sass/main.scss'

function setActiveNavLink() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const currentPath = window.location.pathname.replace(base, '')

  const navLinks = document.querySelectorAll('header nav a')

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname.replace(base, '')

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
  }

  function closeMenu() {
    header.classList.remove('header--open')
    toggle.setAttribute('aria-expanded', false)
    document.body.classList.remove('menu-open')
  }

  toggle.addEventListener('click', () => {
    header.classList.contains('header--open') ? closeMenu() : openMenu()
  })

  if (overlay) overlay.addEventListener('click', closeMenu)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu()
  })
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink()
  initHeaderInteractions()
})