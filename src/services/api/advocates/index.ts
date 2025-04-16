import http from '../../../lib/http'
import { Advocate } from '@/types/types'
import { apiRoutes } from '../apiRoutes'


type AdvocatesProps = {
    searchTerm?: string
}
const advocates = {
    loadAll: async (queryParams?: AdvocatesProps) => http.get(apiRoutes.advocates, queryParams),
    updateAdvocate: async (id: string, payload: Partial<Advocate>) => http.patch(`${apiRoutes.advocates}/${id}`, payload),
    fetchAdvocate: async (id: string) => http.get(`${apiRoutes.advocates}/${id}`),

}

export default advocates