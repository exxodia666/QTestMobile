export default interface TestComponentTypes{
    id: string
    name: string
    count_questions: number
    selectTest: (id: string, name: string) => void
}