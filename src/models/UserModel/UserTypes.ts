export type result = {
    quiz_name: string
    rating: number
    pass_date: Date
}

interface User {
    id: string
    name: string
    key: string
    results?: result[]
    errors?: Error[]
    status?: string | number | null
    authUser?: (newName: string) => void
    loadFromAsync?: () => void
    fetchResults?: () => void
    clearResults?: () => void
    logoutUser?: () => void
}

export default User;