import queryString from 'query-string';

interface ApiResponse extends Response {
    data?: any
}

type API_HTTP = {
    delete: (path: string) => Promise<any>
    get: (path: string, queryParams?: any) => Promise<any>
    patch: (path: string, params: Record<string, any>) => Promise<any>
    post: (path: string, params: Record<string, any>) => Promise<any>
}

const handleApiResponse = async (response: ApiResponse) => {
    const responseBody = await response.json()

    return responseBody.data
}

const BASE_REQUEST_OPTIONS = {
    headers: {
        'Content-Type': 'application/json',
    },
}

const del = async (path: string) => {
    const response = await fetch(path, {
        ...BASE_REQUEST_OPTIONS,
        method: 'DELETE',
    })

    return handleApiResponse(response)
}

const get = async (path: string, queryParams = {}) => {
    const fullPath = Object.keys(queryParams).length
        ? `${path}?${queryString.stringify(queryParams)}`
        : path

    const response = await fetch(fullPath, {
        ...BASE_REQUEST_OPTIONS,
        method: 'GET',
    })

    return handleApiResponse(response)
}

const patch = async (path: string, params: Record<string, any>) => {
    const response = await fetch(path, {
        ...BASE_REQUEST_OPTIONS,
        method: 'PATCH',
        body: JSON.stringify(params),
    })

    return handleApiResponse(response)
}

const post = async (path: string, params: Record<string, any>) => {
    const response = await fetch(path, {
        ...BASE_REQUEST_OPTIONS,
        method: 'POST',
        body: JSON.stringify(params),
    })

    return handleApiResponse(response)
}

const http: API_HTTP = {
    delete: del,
    get,
    patch,
    post,
}

export default http