import { Injectable } from '@angular/core'

import * as store from 'store'

@Injectable()
export class LocalStorageService {

  get tenantId() {
    return this.get('tenantId')
  }
  get organizerId() {
    return this.get('organizerId')
  }
  get userId(){
    return this.get('userId')
  }

  set(key: string, value: any) {
    store.set(key, value)
  }

  get(key: string, optionalDefaultValue?: any) {
    return store.get(key)
  }

  remove(key: string) {
    store.remove(key)
  }

  clear() {
    store.clearAll()
  }
}