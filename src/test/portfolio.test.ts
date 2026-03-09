import { describe, it, expect } from 'vitest'
import { skills, projects, socialLinks, experiences, photos, musicTracks } from './portfolio'

describe('Portfolio Data', () => {
  describe('skills', () => {
    it('has valid skill objects', () => {
      expect(skills.length).toBeGreaterThan(0)
      skills.forEach(skill => {
        expect(skill).toHaveProperty('name')
        expect(skill).toHaveProperty('icon')
        expect(skill).toHaveProperty('category')
        expect(skill).toHaveProperty('proficiency')
        expect(skill.proficiency).toBeGreaterThanOrEqual(0)
        expect(skill.proficiency).toBeLessThanOrEqual(100)
      })
    })
  })

  describe('projects', () => {
    it('has valid project objects', () => {
      expect(projects.length).toBeGreaterThan(0)
      projects.forEach(project => {
        expect(project).toHaveProperty('id')
        expect(project).toHaveProperty('title')
        expect(project).toHaveProperty('description')
        expect(project).toHaveProperty('image')
        expect(project).toHaveProperty('tags')
        expect(Array.isArray(project.tags)).toBe(true)
      })
    })
  })

  describe('socialLinks', () => {
    it('has valid social link objects', () => {
      expect(socialLinks.length).toBeGreaterThan(0)
      socialLinks.forEach(link => {
        expect(link).toHaveProperty('name')
        expect(link).toHaveProperty('url')
        expect(link).toHaveProperty('icon')
      })
    })
  })

  describe('experiences', () => {
    it('has valid experience objects', () => {
      expect(experiences.length).toBeGreaterThan(0)
      experiences.forEach(exp => {
        expect(exp).toHaveProperty('id')
        expect(exp).toHaveProperty('company')
        expect(exp).toHaveProperty('jobTitle')
        expect(exp).toHaveProperty('startDate')
        expect(exp).toHaveProperty('technologies')
        expect(Array.isArray(exp.technologies)).toBe(true)
      })
    })
  })

  describe('photos', () => {
    it('has valid photo objects', () => {
      expect(photos.length).toBeGreaterThan(0)
      photos.forEach(photo => {
        expect(photo).toHaveProperty('id')
        expect(photo).toHaveProperty('title')
        expect(photo).toHaveProperty('description')
        expect(photo).toHaveProperty('image')
      })
    })
  })

  describe('musicTracks', () => {
    it('has valid music track objects', () => {
      expect(musicTracks.length).toBeGreaterThan(0)
      musicTracks.forEach(track => {
        expect(track).toHaveProperty('id')
        expect(track).toHaveProperty('title')
        expect(track).toHaveProperty('artist')
        expect(track).toHaveProperty('src')
      })
    })
  })
})
