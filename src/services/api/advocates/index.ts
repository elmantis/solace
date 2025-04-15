import http from '../../http'
import { Advocate } from '@/types/types'
import { apiRoutes } from '../apiRoutes'


type AdvocatesProps = {
    searchTerm?: string
}
const advocates = {
    loadAll: async (queryParams?: AdvocatesProps) => http.get(apiRoutes.advocates, queryParams),
    // createUser: async (payload: Advocate) => http.post(apiRoutes.users.index, payload),
}

export default advocates