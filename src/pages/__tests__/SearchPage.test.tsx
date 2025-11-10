import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { SearchPage } from '../SearchPage'
import type { Anime } from '../../types/anime'

// --- Mock hooks (define mocks INSIDE factory) ---
vi.mock('../../hooks/useAppDispatch', () => {
  const mockDispatch = vi.fn()
  const mockUseAppSelector = vi.fn()

  // Return the same shape as the real module, plus extra for testing
  return {
    useAppDispatch: () => mockDispatch,
    useAppSelector: mockUseAppSelector,
    // Export these for test access
    __mocks: { mockDispatch, mockUseAppSelector },
  }
})

// --- Mock store actions ---
vi.mock('../../store/animeSlice', () => ({
  searchAnimeThunk: vi.fn(),
  setSearchQuery: vi.fn(),
  clearError: vi.fn(),
}))

// --- Mock components ---
vi.mock('../../components/AnimeCard', () => ({
  AnimeCard: ({ anime }: { anime: Anime }) => (
    <div data-testid="anime-card">{anime.title}</div>
  ),
}))
vi.mock('../../components/Skeleton', () => ({
  AnimeCardSkeleton: () => <div data-testid="skeleton"></div>,
}))
vi.mock('../../components/EmptyState', () => ({
  EmptyState: ({ type }: { type: string }) => (
    <div data-testid="empty-state">{type}</div>
  ),
}))
vi.mock('../../components/ErrorMessage', () => ({
  ErrorMessage: ({ message }: { message: string }) => (
    <div data-testid="error">{message}</div>
  ),
}))

// --- Import after mocks so Vitest can intercept properly ---
import * as hookModule from '../../hooks/useAppDispatch'

// Type for the mocked module
type MockedHookModule = typeof hookModule & {
  __mocks: {
    mockDispatch: ReturnType<typeof vi.fn>
    mockUseAppSelector: ReturnType<typeof vi.fn>
  }
}

describe('<SearchPage />', () => {
  let mockUseAppSelector: ReturnType<typeof vi.fn>
  let mockDispatch: ReturnType<typeof vi.fn>

  beforeEach(() => {
    const mocked = hookModule as MockedHookModule
    mockDispatch = mocked.__mocks.mockDispatch
    mockUseAppSelector = mocked.__mocks.mockUseAppSelector

    mockDispatch.mockClear()
    mockUseAppSelector.mockClear()
  })

  it('renders initial empty state', () => {
    mockUseAppSelector.mockReturnValue({
      searchResults: [],
      loading: false,
      error: null,
      currentPage: 1,
      hasNextPage: false,
      searchQuery: '',
    })

    render(<SearchPage />)
    expect(screen.getByTestId('empty-state')).toHaveTextContent('initial')
  })

  it('updates search input value', () => {
    mockUseAppSelector.mockReturnValue({
      searchResults: [],
      loading: false,
      error: null,
      currentPage: 1,
      hasNextPage: false,
      searchQuery: '',
    })

    render(<SearchPage />)
    const input = screen.getByPlaceholderText(/search anime by title/i)
    fireEvent.change(input, { target: { value: 'Naruto' } })
    expect(input).toHaveValue('Naruto')
  })

  it('renders search results', () => {
    const mockAnime: Anime = {
      mal_id: 20,
      url: 'https://myanimelist.net/anime/20/Naruto',
      images: {
        jpg: {
          image_url: 'https://example.com/naruto.jpg',
          small_image_url: 'https://example.com/naruto-small.jpg',
          large_image_url: 'https://example.com/naruto-large.jpg',
        },
        webp: {
          image_url: 'https://example.com/naruto.webp',
          small_image_url: 'https://example.com/naruto-small.webp',
          large_image_url: 'https://example.com/naruto-large.webp',
        },
      },
      trailer: { youtube_id: null, url: null, embed_url: null },
      approved: true,
      titles: [{ type: 'Default', title: 'Naruto' }],
      title: 'Naruto',
      title_english: 'Naruto',
      title_japanese: 'ナルト',
      type: 'TV',
      source: 'Manga',
      episodes: 220,
      status: 'Finished Airing',
      airing: false,
      aired: { from: '2002-10-03T00:00:00Z', to: '2007-02-08T00:00:00Z', string: 'Oct 3, 2002 to Feb 8, 2007' },
      duration: '23 min per ep',
      rating: 'PG-13',
      score: 8.26,
      scored_by: 1620000,
      rank: 288,
      popularity: 6,
      members: 2500000,
      favorites: 150000,
      synopsis: 'Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village\'s leader and strongest ninja.',
      background: null,
      season: 'fall',
      year: 2002,
      broadcast: { day: 'Wednesdays', time: '19:30', timezone: 'Asia/Tokyo', string: 'Wednesdays at 19:30 (JST)' },
      producers: [{ mal_id: 4, name: 'Pierrot' }],
      licensors: [{ mal_id: 1, name: 'Viz Media' }],
      studios: [{ mal_id: 4, name: 'Pierrot' }],
      genres: [
        { mal_id: 1, name: 'Action' },
        { mal_id: 2, name: 'Adventure' },
        { mal_id: 10, name: 'Fantasy' },
      ],
      themes: [{ mal_id: 17, name: 'Martial Arts' }],
      demographics: [{ mal_id: 27, name: 'Shounen' }],
    }

    mockUseAppSelector.mockReturnValue({
      searchResults: [mockAnime],
      loading: false,
      error: null,
      currentPage: 1,
      hasNextPage: false,
      searchQuery: 'Naruto',
    })

    render(<SearchPage />)
    expect(screen.getByTestId('anime-card')).toHaveTextContent('Naruto')
  })

  it('renders error message', () => {
    mockUseAppSelector.mockReturnValue({
      searchResults: [],
      loading: false,
      error: 'An error occurred',
      currentPage: 1,
      hasNextPage: false,
      searchQuery: 'Naruto',
    })

    render(<SearchPage />)
    expect(screen.getByTestId('error')).toHaveTextContent('An error occurred')
  })
})
