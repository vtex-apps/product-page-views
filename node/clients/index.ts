import { IOClients } from '@vtex/api'

import ProductViews from './productViews'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get productViews() {
    return this.getOrSet('productViews', ProductViews)
  }
}
