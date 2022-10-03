import {ClientsConfig, Service, ServiceContext, method, LRUCache, RecorderState} from '@vtex/api'

import { Clients } from './clients'
import { processViews } from './middlewares/processViews'

const TIMEOUT_MS = 5000
const memoryCache = new LRUCache<string, any>({ max: 5000 })

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache
    }
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {}
}

export default new Service({
  clients,
  routes: {
    processViews: method({
      POST: processViews
    })
  },
})
