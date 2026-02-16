'use client'

import { visionTool } from '@sanity/vision'
// 1. Import buildLegacyTheme
import { defineConfig, buildLegacyTheme } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

// 2. Define your theme using the helper
const myTheme = buildLegacyTheme({
  '--white': '#fff',
  '--black': '#1a1a1a',
  '--brand-primary': '#f6edf6', // This will affect your primary brand color
  '--component-bg': '#f6edf6', // This changes the background of the main editing area
  '--default-button-primary-color': '#f6edf6',
})

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  // 3. Pass the built theme here
  theme: myTheme,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})