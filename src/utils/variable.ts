export const getApiKey = () => {
    return localStorage.getItem('apiKey')
}
export const setApiKey = (key: string) => {
    localStorage.setItem('apiKey', key)
}