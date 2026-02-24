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
}

document.addEventListener('DOMContentLoaded', initLayout)