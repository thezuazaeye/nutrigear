import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Limpia el DOM y el localStorage entre pruebas para que no se contaminen.
beforeEach(() => localStorage.clear())
afterEach(() => cleanup())
